import * as fs from "node:fs/promises";
import { t } from "../../i18n";
import {
	applyOpsToPhases,
	getLatestTodoPhasesFromEntries,
	markdownToPhases,
	phasesToMarkdown,
	resolveTodoMarkdownPath,
	type TodoItem,
	type TodoPhase,
	USER_TODO_EDIT_CUSTOM_TYPE,
} from "../../tools/todo";
import { copyToClipboard } from "../../utils/clipboard";
import { getEditorCommand, openInEditor } from "../../utils/external-editor";
import type { InteractiveModeContext } from "../types";

/** Resolved per call: a module-level `t()` would latch the language before settings load. */
function usageText(): string {
	return [
		t("todo.usage.header"),
		`  /todo                              ${t("todo.usage.show")}`,
		`  /todo edit                         ${t("todo.usage.edit")}`,
		`  /todo copy                         ${t("todo.usage.copy")}`,
		`  /todo expand                       ${t("todo.usage.expand")}`,
		`  /todo collapse                     ${t("todo.usage.collapse")}`,
		`  /todo export [<path>]              ${t("todo.usage.export")}`,
		`  /todo import [<path>]              ${t("todo.usage.import")}`,
		`  /todo append [<phase>] <task...>   ${t("todo.usage.append")}`,
		`  /todo start  <task>                ${t("todo.usage.start")}`,
		`  /todo done   [<task|phase>]        ${t("todo.usage.done")}`,
		`  /todo drop   [<task|phase>]        ${t("todo.usage.drop")}`,
		`  /todo rm     [<task|phase>]        ${t("todo.usage.rm")}`,
	].join("\n");
}

// =============================================================================
// Argument tokenizer (respects double-quoted strings)
// =============================================================================

function tokenize(input: string): string[] {
	const tokens: string[] = [];
	let cur = "";
	let inQuote = false;
	for (let i = 0; i < input.length; i++) {
		const ch = input[i];
		if (ch === "\\" && i + 1 < input.length) {
			cur += input[++i];
			continue;
		}
		if (ch === '"') {
			inQuote = !inQuote;
			continue;
		}
		if (!inQuote && /\s/.test(ch)) {
			if (cur) {
				tokens.push(cur);
				cur = "";
			}
			continue;
		}
		cur += ch;
	}
	if (cur) tokens.push(cur);
	return tokens;
}

// =============================================================================
// Name normalization
// =============================================================================

function titleCase(s: string): string {
	return s
		.split(/\s+/)
		.filter(Boolean)
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join(" ");
}

// =============================================================================
// Fuzzy matching
// =============================================================================

function findPhaseFuzzy(phases: TodoPhase[], query: string): TodoPhase | undefined {
	const q = query.trim().toLowerCase();
	if (!q) return undefined;
	// Exact name (case-insensitive)
	const byName = phases.find(p => p.name.toLowerCase() === q);
	if (byName) return byName;
	// Substring (prefer prefix match)
	const prefixMatches = phases.filter(p => p.name.toLowerCase().startsWith(q));
	if (prefixMatches.length === 1) return prefixMatches[0];
	const subMatches = phases.filter(p => p.name.toLowerCase().includes(q));
	if (subMatches.length === 1) return subMatches[0];
	return undefined;
}

function findTaskFuzzy(phases: TodoPhase[], query: string): { task: TodoItem; phase: TodoPhase } | undefined {
	const q = query.trim().toLowerCase();
	if (!q) return undefined;
	// Exact content (case-insensitive)
	for (const phase of phases) {
		for (const task of phase.tasks) {
			if (task.content.toLowerCase() === q) return { task, phase };
		}
	}
	const matches: Array<{ task: TodoItem; phase: TodoPhase }> = [];
	for (const phase of phases) {
		for (const task of phase.tasks) {
			if (task.content.toLowerCase().includes(q)) {
				matches.push({ task, phase });
			}
		}
	}
	if (matches.length === 1) return matches[0];
	// Prefer single in_progress/pending hit when ambiguous
	const active = matches.filter(m => m.task.status === "in_progress" || m.task.status === "pending");
	if (active.length === 1) return active[0];
	return undefined;
}

// =============================================================================
// Build system reminder
// =============================================================================

function buildSystemReminder(action: string, phases: TodoPhase[], removed = false): string {
	const md = phases.length === 0 ? "(empty)" : phasesToMarkdown(phases).trimEnd();
	const lines = ["<system-reminder>", `The user manually modified the todo list (${action}).`];
	if (removed) {
		lines.push(
			phases.length === 0
				? "The user intentionally cleared the todo list. Do NOT recreate or re-populate it unless the user explicitly asks; continue the current request without a todo list."
				: "The user intentionally removed the entries no longer shown below. Do NOT re-add them unless the user explicitly asks.",
		);
	}
	lines.push("Current todo list:", "", md, "</system-reminder>");
	return lines.join("\n");
}

export class TodoCommandController {
	constructor(private readonly ctx: InteractiveModeContext) {}

	/**
	 * True latest todo state for the user-facing /todo verbs. Reads from session
	 * entries or falls back to the active session state.
	 */
	#currentPhases(): TodoPhase[] {
		const fromEntries = getLatestTodoPhasesFromEntries(this.ctx.sessionManager.getBranch());
		if (fromEntries.length > 0) return fromEntries;
		return this.ctx.session.getTodoPhases();
	}

	async handleTodoCommand(args: string): Promise<void> {
		const trimmed = args.trim();
		if (!trimmed) {
			this.#showCurrent();
			return;
		}

		const spaceIdx = trimmed.search(/\s/);
		const verb = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase();
		const rest = spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1).trim();

		switch (verb) {
			case "expand":
				this.ctx.setTodoExpanded(true);
				return;
			case "collapse":
				if (this.ctx.todoExpanded) this.ctx.toggleTodoExpansion();
				return;
			case "edit":
				await this.#editInExternalEditor();
				return;
			case "copy":
				this.#copyMarkdown();
				return;
			case "export":
				await this.#exportToFile(rest);
				return;
			case "import":
				await this.#importFromFile(rest);
				return;
			case "help":
			case "?":
				this.ctx.showStatus(usageText());
				return;
			case "append":
				this.#append(rest);
				return;
			case "start":
				this.#start(rest);
				return;
			case "done":
				this.#mutateStatus(rest, "completed");
				return;
			case "drop":
				this.#mutateStatus(rest, "abandoned");
				return;
			case "rm":
				this.#remove(rest);
				return;
			default:
				this.ctx.showError(`${t("todo.unknownVerb", { verb })}\n${usageText()}`);
		}
	}

	#showCurrent(): void {
		const phases = this.#currentPhases();
		if (phases.length === 0) {
			this.ctx.showStatus(t("todo.empty"));
			return;
		}
		this.ctx.showStatus(phasesToMarkdown(phases).trimEnd());
	}

	#copyMarkdown(): void {
		const phases = this.#currentPhases();
		if (phases.length === 0) {
			this.ctx.showWarning(t("todo.noneToCopy"));
			return;
		}
		try {
			copyToClipboard(phasesToMarkdown(phases));
			this.ctx.showStatus(t("todo.copied"));
		} catch (error) {
			this.ctx.showError(error instanceof Error ? error.message : String(error));
		}
	}

	#resolveTodoPath(rest: string): string {
		return resolveTodoMarkdownPath(rest, this.ctx.sessionManager.getCwd());
	}

	async #exportToFile(rest: string): Promise<void> {
		const phases = this.#currentPhases();
		if (phases.length === 0) {
			this.ctx.showWarning(t("todo.noneToExport"));
			return;
		}
		try {
			const target = this.#resolveTodoPath(rest);
			await fs.writeFile(target, phasesToMarkdown(phases), "utf8");
			this.ctx.showStatus(t("todo.exported", { path: target }));
		} catch (error) {
			this.ctx.showError(t("todo.exportFailed", { error: error instanceof Error ? error.message : String(error) }));
		}
	}

	async #importFromFile(rest: string): Promise<void> {
		let source = "";
		let content: string;
		try {
			source = this.#resolveTodoPath(rest);
			content = await fs.readFile(source, "utf8");
		} catch (error) {
			this.ctx.showError(t("todo.readFailed", { error: error instanceof Error ? error.message : String(error) }));
			return;
		}
		const { phases, errors } = markdownToPhases(content);
		if (errors.length > 0) {
			this.ctx.showError(`${t("todo.parseFileFailed", { path: source })}\n  ${errors.join("\n  ")}`);
			return;
		}
		this.#commit(phases, `/todo import ${source}`);
		const phaseCount = phases.length;
		const taskCount = phases.reduce((sum, p) => sum + p.tasks.length, 0);
		const phaseLabel = t(phaseCount === 1 ? "todo.phaseCountOne" : "todo.phaseCountOther", { count: phaseCount });
		const taskLabel = t(taskCount === 1 ? "todo.taskCountOne" : "todo.taskCountOther", { count: taskCount });
		this.ctx.showStatus(t("todo.imported", { phases: phaseLabel, tasks: taskLabel, path: source }));
	}

	// ------------------------------------------------------------- append

	#append(rest: string): void {
		const tokens = tokenize(rest);
		if (tokens.length === 0) {
			this.ctx.showError(t("todo.appendUsage"));
			return;
		}

		const current = this.#currentPhases();
		let phaseName: string | undefined;
		let content: string;

		if (tokens.length === 1) {
			content = tokens[0];
		} else {
			phaseName = tokens[0];
			content = tokens.slice(1).join(" ");
		}

		const next = current.map(phase => ({ ...phase, tasks: phase.tasks.slice() }));
		let targetPhase: TodoPhase | undefined;

		if (phaseName) {
			targetPhase = findPhaseFuzzy(next, phaseName);
			if (!targetPhase) {
				targetPhase = { name: titleCase(phaseName), tasks: [] };
				next.push(targetPhase);
			}
		} else if (next.length > 0) {
			targetPhase = next[next.length - 1];
		} else {
			targetPhase = { name: "Todos", tasks: [] };
			next.push(targetPhase);
		}

		const finalContent = titleCaseSentence(content);
		targetPhase.tasks.push({
			content: finalContent,
			status: "pending",
		});

		this.#commit(next, `/todo append → ${targetPhase.name}`);
		this.ctx.showStatus(t("todo.appended", { phase: targetPhase.name, task: finalContent }));
	}

	// ------------------------------------------------------------- start / done / drop / rm

	#start(rest: string): void {
		if (!rest) {
			this.ctx.showError(t("todo.startUsage"));
			return;
		}
		const current = this.#currentPhases();
		const hit = findTaskFuzzy(current, rest);
		if (!hit) {
			this.ctx.showError(t("todo.noTaskMatched", { query: rest }));
			return;
		}
		const { phases, errors } = applyOpsToPhases(current, [{ op: "start", task: hit.task.content }]);
		if (errors.length > 0) {
			this.ctx.showError(errors.join("; "));
			return;
		}
		this.#commit(phases, `/todo start ${hit.task.content}`);
		this.ctx.showStatus(t("todo.started", { task: hit.task.content }));
	}

	#mutateStatus(rest: string, target: "completed" | "abandoned"): void {
		const op = target === "completed" ? "done" : "drop";
		const current = this.#currentPhases();
		const trimmed = rest.trim();
		if (!trimmed) {
			// no-arg: apply to all
			const { phases, errors } = applyOpsToPhases(current, [{ op }]);
			if (errors.length > 0) {
				this.ctx.showError(errors.join("; "));
				return;
			}
			this.#commit(phases, `/todo ${op} (all)`);
			this.ctx.showStatus(t(target === "completed" ? "todo.markedAllCompleted" : "todo.markedAllAbandoned"));
			return;
		}

		const taskHit = findTaskFuzzy(current, trimmed);
		if (taskHit) {
			const { phases, errors } = applyOpsToPhases(current, [{ op, task: taskHit.task.content }]);
			if (errors.length > 0) {
				this.ctx.showError(errors.join("; "));
				return;
			}
			this.#commit(phases, `/todo ${op} ${taskHit.task.content}`);
			const statusKey = target === "completed" ? "todo.markedCompleted" : "todo.markedAbandoned";
			this.ctx.showStatus(t(statusKey, { task: taskHit.task.content }));
			return;
		}

		const phaseHit = findPhaseFuzzy(current, trimmed);
		if (phaseHit) {
			const { phases, errors } = applyOpsToPhases(current, [{ op, phase: phaseHit.name }]);
			if (errors.length > 0) {
				this.ctx.showError(errors.join("; "));
				return;
			}
			this.#commit(phases, `/todo ${op} ${phaseHit.name}`);
			const statusKey = target === "completed" ? "todo.markedPhaseCompleted" : "todo.markedPhaseAbandoned";
			this.ctx.showStatus(t(statusKey, { phase: phaseHit.name }));
			return;
		}

		this.ctx.showError(t("todo.noTaskOrPhaseMatched", { query: trimmed }));
	}

	#remove(rest: string): void {
		const current = this.#currentPhases();
		const trimmed = rest.trim();
		if (!trimmed) {
			this.#commit([], "/todo rm (all)", { removed: true });
			this.ctx.showStatus(t("todo.clearedAll"));
			return;
		}
		const taskHit = findTaskFuzzy(current, trimmed);
		if (taskHit) {
			const { phases, errors } = applyOpsToPhases(current, [{ op: "rm", task: taskHit.task.content }]);
			if (errors.length > 0) {
				this.ctx.showError(errors.join("; "));
				return;
			}
			this.#commit(phases, `/todo rm ${taskHit.task.content}`, { removed: true });
			this.ctx.showStatus(t("todo.removed", { task: taskHit.task.content }));
			return;
		}
		const phaseHit = findPhaseFuzzy(current, trimmed);
		if (phaseHit) {
			const { phases, errors } = applyOpsToPhases(current, [{ op: "rm", phase: phaseHit.name }]);
			if (errors.length > 0) {
				this.ctx.showError(errors.join("; "));
				return;
			}
			this.#commit(phases, `/todo rm ${phaseHit.name}`, { removed: true });
			this.ctx.showStatus(t("todo.removedPhase", { phase: phaseHit.name }));
			return;
		}
		this.ctx.showError(t("todo.noTaskOrPhaseMatched", { query: trimmed }));
	}

	// ------------------------------------------------------------- editor

	async #editInExternalEditor(): Promise<void> {
		const editorCmd = getEditorCommand();
		if (!editorCmd) {
			this.ctx.showWarning(t("command.editor.notConfigured"));
			return;
		}

		const current = this.#currentPhases();
		const initialMarkdown =
			current.length > 0 ? phasesToMarkdown(current) : "# Todos\n- [ ] (replace this with your tasks)\n";

		this.ctx.ui.stop();
		try {
			const result = await openInEditor(editorCmd, initialMarkdown, { extension: ".todo.md" });
			if (result === null) {
				this.ctx.showWarning(t("todo.editorNoSave"));
				return;
			}
			const { phases: parsed, errors } = markdownToPhases(result);
			if (errors.length > 0) {
				this.ctx.showError(`${t("todo.parseMarkdownFailed")}\n  ${errors.join("\n  ")}`);
				return;
			}
			this.#commit(parsed, "/todo edit");
			const phaseCount = parsed.length;
			const taskCount = parsed.reduce((sum, p) => sum + p.tasks.length, 0);
			const phaseLabel = t(phaseCount === 1 ? "todo.phaseCountOne" : "todo.phaseCountOther", { count: phaseCount });
			const taskLabel = t(taskCount === 1 ? "todo.taskCountOne" : "todo.taskCountOther", { count: taskCount });
			this.ctx.showStatus(t("todo.updatedFromEditor", { phases: phaseLabel, tasks: taskLabel }));
		} catch (error) {
			this.ctx.showWarning(
				t("command.editor.openFailed", { error: error instanceof Error ? error.message : String(error) }),
			);
		} finally {
			this.ctx.ui.start();
			this.ctx.ui.requestRender();
		}
	}

	#commit(nextPhases: TodoPhase[], action: string, opts?: { removed?: boolean }): void {
		// Persist first so HUD visibility binds to the new canonical source.
		this.ctx.session.setTodoPhases(nextPhases);
		this.ctx.sessionManager.appendCustomEntry(USER_TODO_EDIT_CUSTOM_TYPE, { phases: nextPhases });
		this.ctx.setTodos(nextPhases);

		// 3. Inject system reminder so the agent learns about the change next turn.
		//    Removals carry explicit intent so the agent does not rebuild the
		//    cleared/removed items on its next turn (issue #5258).
		const reminderText = buildSystemReminder(action, nextPhases, opts?.removed ?? false);
		const message = {
			role: "developer" as const,
			content: [{ type: "text" as const, text: reminderText }],
			attribution: "user" as const,
			timestamp: Date.now(),
		};
		this.ctx.agent.appendMessage(message);
		this.ctx.sessionManager.appendMessage(message);
	}
}

/** Capitalize first letter only — keeps acronyms / casing in the rest of the sentence intact. */
function titleCaseSentence(s: string): string {
	const trimmed = s.trim();
	if (!trimmed) return trimmed;
	return trimmed[0].toUpperCase() + trimmed.slice(1);
}
