/**
 * InspectorPanel — detail pane for the selected extension.
 *
 * One inspection grammar for every kind:
 * identity → runtime/enablement → description → origin →
 * kind-specific surface → contents → boring config.
 */
import * as os from "node:os";
import { type Component, visibleWidth, wrapTextWithAnsi } from "@oh-my-pi/pi-tui";
import { t } from "../../../i18n";
import { theme } from "../../../modes/theme/theme";
import { expandKeyHint, PREVIEW_LIMITS, replaceTabs, shortenPath } from "../../../tools/render-utils";
import {
	sanitizeDisplayField,
	sanitizeDisplayLine,
	sanitizeDisplayLineField,
	sanitizeDisplayText,
} from "./display-text";
import {
	commandInspectorData,
	contextInspectorData,
	enablementLabel,
	hookInspectorData,
	instructionInspectorData,
	liveToolsForExtension,
	promptInspectorData,
	ruleInspectorData,
	skillInspectorData,
	type ToolParamView,
	type ToolRuntimeSource,
	toolInspectorData,
	toolParamsFromSchema,
} from "./inspector-model";
import { snapshotToolRuntimeSource } from "./live-tool-session";
import {
	formatMcpHealthLabel,
	isDiscoveredMcpServer,
	type MCPConnectionHealth,
	type MCPRuntimeSource,
	snapshotMcpRuntime,
	visibleMcpTools,
} from "./mcp-runtime";
import { type Extension, type ExtensionState, isShadowedExtension } from "./types";

export type { ToolRuntimeSource };

interface KindView {
	title?: string;
	description?: string;
	/** MCP `initialize.instructions`. Rendered under description, not as a footer. */
	guidance?: string;
	runtimeLine?: string;
	runtimeExtra?: string[];
	surface: string[];
	contents: string[];
	preview?: { heading: string; text: string };
	config: string[];
}

const PREVIEW_LINE_BUDGET = PREVIEW_LIMITS.EXPANDED_LINES;
const MCP_TOOL_BUDGET = PREVIEW_LIMITS.COLLAPSED_ITEMS;
const MCP_INLINE_ARG_LIMIT = 3;
const MCP_INLINE_DESC_LINES = 3;

export class InspectorPanel implements Component {
	#extension: Extension | null = null;
	#extensionKey: string | null = null;
	#mcpSource: MCPRuntimeSource | undefined;
	#toolSource: ToolRuntimeSource | undefined;
	#toolFrame: ToolRuntimeSource | undefined;
	#expanded = false;
	#width = 72;
	#height = 0;

	setExtension(extension: Extension | null): void {
		const key = inspectorExtensionKey(extension);
		if (key !== this.#extensionKey) {
			this.#expanded = false;
			this.#extensionKey = key;
		}
		this.#extension = extension;
	}

	setMcpSource(source: MCPRuntimeSource | undefined): void {
		this.#mcpSource = source;
	}

	setToolSource(source: ToolRuntimeSource | undefined): void {
		this.#toolSource = source;
	}

	setHeight(height: number): void {
		this.#height = Number.isFinite(height) ? Math.max(0, Math.trunc(height)) : 0;
	}

	isExpanded(): boolean {
		return this.#expanded;
	}

	toggleExpanded(): boolean {
		this.#expanded = !this.#expanded;
		return this.#expanded;
	}

	invalidate(): void {}

	render(width: number): readonly string[] {
		if (!this.#extension) {
			return [theme.fg("muted", t("plugin.inspector.empty")), theme.fg("dim", t("plugin.inspector.emptyHint"))];
		}
		this.#width = width;
		this.#toolFrame = snapshotToolRuntimeSource(this.#toolSource);
		return this.#renderExtension(this.#extension, width);
	}

	#renderExtension(ext: Extension, width: number): string[] {
		const lines: string[] = [];
		const kind = this.#kindView(ext);

		this.#pushIdentity(lines, ext, kind.title);
		this.#pushRuntime(lines, ext, kind);
		this.#pushDescription(lines, kind.description, width);
		this.#pushGuidance(lines, kind.guidance, width);
		this.#pushOrigin(lines, ext, width);
		if (kind.surface.length > 0) lines.push(...kind.surface);
		if (kind.contents.length > 0) lines.push(...kind.contents);
		if (kind.preview) {
			lines.push(theme.fg("muted", kind.preview.heading));
			lines.push(this.#rule());
			const reserved = kind.config.length + 1;
			const remaining = this.#height > 0 ? Math.max(4, this.#height - lines.length - reserved) : PREVIEW_LINE_BUDGET;
			this.#pushPreview(lines, kind.preview.text, width, remaining);
			lines.push("");
		}
		if (kind.config.length > 0) lines.push(...kind.config);
		return lines;
	}

	#kindView(ext: Extension): KindView {
		switch (ext.kind) {
			case "mcp":
				return this.#mcpKind(ext);
			case "tool":
				return this.#toolKind(ext);
			case "rule":
				return this.#ruleKind(ext);
			case "skill":
				return this.#skillKind(ext);
			case "slash-command":
				return this.#commandKind(ext);
			case "hook":
				return this.#hookKind(ext);
			case "prompt":
				return this.#promptKind(ext);
			case "context-file":
				return this.#contextKind(ext);
			case "instruction":
				return this.#instructionKind(ext);
			default:
				return this.#fallbackKind(ext);
		}
	}

	#mcpKind(ext: Extension): KindView {
		const width = this.#width;
		const shadowed = isShadowedExtension(ext);
		const snap =
			isDiscoveredMcpServer(ext.raw) && !shadowed
				? snapshotMcpRuntime(ext.raw, this.#mcpSource, { enabled: ext.state !== "disabled" })
				: undefined;
		if (shadowed) {
			const config: string[] = [];
			if (isDiscoveredMcpServer(ext.raw) && ext.raw.command) {
				const command = shortenPath(ext.raw.command, os.homedir());
				this.#pushLabeled(config, t("plugin.inspector.labelCommand"), command, width, "success");
			}
			if (config.length > 0) config.push("");
			return { description: undefined, surface: [], contents: [], config };
		}
		const health: MCPConnectionHealth = snap?.health ?? "disconnected";
		const transport = snap?.transport ?? "stdio";
		const runtimeLine = `${this.#mcpHealthGlyph(health)} ${formatMcpHealthLabel(health)}     ${theme.fg("muted", transport)}`;
		const runtimeExtra: string[] = [];
		if (snap?.implementationName) {
			const version = snap.implementationVersion ? ` ${snap.implementationVersion}` : "";
			runtimeExtra.push(theme.fg("dim", `${snap.implementationName}${version}`));
			if (snap.websiteUrl) runtimeExtra.push(theme.fg("dim", snap.websiteUrl));
		}
		const surface: string[] = [];
		const contents: string[] = [];
		const config: string[] = [];

		if (snap && snap.tools.length > 0) {
			contents.push(theme.fg("muted", t("plugin.inspector.sectionTools")));
			contents.push(this.#rule());
			const { shown, hidden } = visibleMcpTools(snap.tools, this.#expanded ? snap.tools.length : MCP_TOOL_BUDGET);
			let collapsedArgs = false;
			for (const tool of shown) {
				contents.push(`  ${theme.fg("accent", tool.name)}`);
				if (tool.title && tool.title !== tool.name) {
					contents.push(`    ${theme.fg("muted", tool.title)}`);
				}
				if (tool.description) this.#pushWrapped(contents, tool.description, width, "    ");
				const params = toolParamsFromSchema(tool.parameters);
				const inline = this.#expanded || params.length <= MCP_INLINE_ARG_LIMIT;
				if (inline) {
					this.#pushParams(contents, params, width, "    ");
				} else if (params.length > 0) {
					collapsedArgs = true;
					contents.push(`    ${theme.fg("dim", t("plugin.inspector.argCount", { count: params.length }))}`);
				}
				contents.push("");
			}
			if (hidden > 0) {
				contents.push(this.#moreLine(hidden));
				contents.push("");
			} else if (collapsedArgs) {
				contents.push(theme.fg("dim", `  ${t("plugin.inspector.argsToExpand", { key: expandKeyHint() })}`));
				contents.push("");
			}
		}

		if (snap && snap.resources.length > 0) {
			contents.push(theme.fg("muted", t("plugin.inspector.sectionResources")));
			contents.push(this.#rule());
			const { shown, hidden } = visibleMcpTools(
				snap.resources,
				this.#expanded ? snap.resources.length : MCP_TOOL_BUDGET,
			);
			for (const resource of shown) {
				contents.push(`  ${theme.fg("accent", resource.name)}`);
			}
			if (hidden > 0) {
				contents.push(this.#moreLine(hidden));
			}
			contents.push("");
		}

		if (snap && snap.prompts.length > 0) {
			contents.push(theme.fg("muted", t("plugin.inspector.sectionPrompts")));
			contents.push(this.#rule());
			const { shown, hidden } = visibleMcpTools(
				snap.prompts,
				this.#expanded ? snap.prompts.length : MCP_TOOL_BUDGET,
			);
			for (const prompt of shown) {
				contents.push(`  ${theme.fg("accent", prompt.name)}`);
			}
			if (hidden > 0) {
				contents.push(this.#moreLine(hidden));
			}
			contents.push("");
		}

		if (snap?.command) {
			const command = shortenPath(snap.command, os.homedir());
			this.#pushLabeled(config, t("plugin.inspector.labelCommand"), command, width, "success");
		}
		if (snap?.url) this.#pushLabeled(config, t("plugin.inspector.labelUrl"), snap.url, width, "success");
		if (snap?.args && snap.args.length > 0) {
			this.#pushLabeled(config, t("plugin.inspector.labelArgs"), snap.args.join(" "), width, "dim");
		}
		if (snap && snap.envCount > 0) {
			const envs = t("plugin.inspector.envDefined", { count: snap.envCount });
			this.#pushLabeled(config, t("plugin.inspector.labelEnv"), envs, width, "dim");
		}
		if (config.length > 0) config.push("");

		return {
			title: snap?.title,
			description: snap?.description,
			guidance: snap?.instructions,
			runtimeLine,
			runtimeExtra,
			surface,
			contents,
			config,
		};
	}

	#toolKind(ext: Extension): KindView {
		const width = this.#width;
		const lives = liveToolsForExtension(ext, this.#toolFrame);
		const data = toolInspectorData(ext, lives);
		const surface: string[] = [];
		if (data.factory.length > 1) {
			surface.push(theme.fg("muted", t("plugin.inspector.sectionTools")));
			surface.push(this.#rule());
			let collapsedArgs = false;
			for (const tool of data.factory) {
				surface.push(`  ${theme.fg("accent", tool.name)}`);
				if (tool.label && tool.label !== tool.name) {
					surface.push(`    ${theme.fg("muted", tool.label)}`);
				}
				if (tool.description) this.#pushWrapped(surface, tool.description, width, "    ");
				const params = toolParamsFromSchema(tool.parameters);
				const inline = this.#expanded || params.length <= MCP_INLINE_ARG_LIMIT;
				if (inline) {
					this.#pushParams(surface, params, width, "    ");
				} else if (params.length > 0) {
					collapsedArgs = true;
					surface.push(`    ${theme.fg("dim", t("plugin.inspector.argCount", { count: params.length }))}`);
				}
				surface.push("");
			}
			if (collapsedArgs) {
				surface.push(theme.fg("dim", `  ${t("plugin.inspector.argsToExpand", { key: expandKeyHint() })}`));
				surface.push("");
			}
			return { description: data.description, surface, contents: [], config: [] };
		}
		if (lives.length === 0 && data.params.length === 0) {
			return { description: data.description, surface: [], contents: [], config: [] };
		}
		surface.push(theme.fg("muted", t("plugin.inspector.sectionArguments")));
		surface.push(this.#rule());
		this.#pushParams(surface, data.params, width, "  ");
		surface.push("");
		return {
			title: data.label,
			description: data.description,
			surface,
			contents: [],
			config: [],
		};
	}

	#ruleKind(ext: Extension): KindView {
		const width = this.#width;
		const data = ruleInspectorData(ext);
		const surface: string[] = [];
		surface.push(theme.fg("muted", t("plugin.inspector.sectionApplies")));
		surface.push(this.#rule());
		if (data.alwaysApply) surface.push(`  ${theme.fg("accent", t("plugin.state.always"))}`);
		if (data.globs) this.#pushLabeled(surface, "globs", data.globs.join(", "), width);
		if (data.condition) this.#pushLabeledList(surface, "condition", data.condition, width);
		if (data.astCondition) this.#pushLabeledList(surface, "ast", data.astCondition, width);
		if (data.scope) this.#pushLabeledList(surface, "scope", data.scope, width);
		if (data.agents) this.#pushLabeledList(surface, "agents", data.agents, width);
		if (data.interruptMode) this.#pushLabeled(surface, "interrupt", data.interruptMode, width, "dim");
		if (!data.alwaysApply && !data.globs && !data.condition && !data.astCondition && !data.agents) {
			surface.push(theme.fg("dim", `  ${t("plugin.inspector.noApplyConditions")}`));
		}
		surface.push("");
		return {
			description: data.description,
			surface,
			contents: [],
			preview: { heading: t("plugin.inspector.previewRule"), text: data.content },
			config: [],
		};
	}

	#skillKind(ext: Extension): KindView {
		const width = this.#width;
		const data = skillInspectorData(ext);
		const runtimeExtra: string[] = [];
		if (data.hidden) {
			this.#pushWrapped(
				runtimeExtra,
				`${theme.fg("warning", t("plugin.state.hidden"))}    ${t("plugin.inspector.skillHiddenNote")}`,
				width,
				"  ",
			);
			runtimeExtra.push(this.#rule());
		}
		const surface: string[] = [];
		if (data.alwaysApply) surface.push(`  ${theme.fg("accent", t("plugin.state.alwaysApply"))}`);
		if (data.globs) this.#pushLabeled(surface, "globs", data.globs.join(", "), width);
		if (surface.length > 0) surface.push("");
		return {
			description: data.description,
			runtimeExtra: runtimeExtra.length > 0 ? runtimeExtra : undefined,
			surface,
			contents: [],
			preview: { heading: t("plugin.inspector.previewInstruction"), text: data.content },
			config: [],
		};
	}

	#commandKind(ext: Extension): KindView {
		const data = commandInspectorData(ext);
		const surface: string[] = [];
		surface.push(theme.fg("muted", t("plugin.inspector.sectionInvocation")));
		surface.push(this.#rule());
		surface.push(`  ${theme.fg("accent", `/${sanitizeDisplayText(ext.name)}`)}`);
		if (data.argumentHint) this.#pushLabeled(surface, "hint", data.argumentHint, this.#width, "dim");
		if (data.usesArguments) surface.push(`  ${theme.fg("dim", t("plugin.inspector.acceptsArguments"))}`);
		surface.push("");
		return {
			description: data.description,
			surface,
			contents: [],
			preview: { heading: t("plugin.inspector.previewTemplate"), text: data.body },
			config: [],
		};
	}

	#hookKind(ext: Extension): KindView {
		const data = hookInspectorData(ext);
		const surface: string[] = [];
		surface.push(theme.fg("muted", t("plugin.inspector.sectionHook")));
		surface.push(this.#rule());
		if (data.hookType) this.#pushLabeled(surface, "when", data.hookType, this.#width);
		if (data.tool) this.#pushLabeled(surface, "tool", data.tool, this.#width);
		surface.push("");
		return { description: ext.description, surface, contents: [], config: [] };
	}

	#promptKind(ext: Extension): KindView {
		const data = promptInspectorData(ext);
		return {
			description: ext.description,
			surface: [],
			contents: [],
			preview: { heading: t("plugin.inspector.previewPrompt"), text: data.content },
			config: [],
		};
	}

	#contextKind(ext: Extension): KindView {
		const data = contextInspectorData(ext);
		return {
			description: ext.description,
			surface: [],
			contents: [],
			preview: { heading: t("plugin.inspector.previewPreview"), text: data.content },
			config: [],
		};
	}

	#instructionKind(ext: Extension): KindView {
		const data = instructionInspectorData(ext);
		const surface: string[] = [];
		if (data.applyTo) {
			surface.push(theme.fg("muted", t("plugin.inspector.sectionApplies")));
			surface.push(this.#rule());
			this.#pushLabeled(surface, "files", data.applyTo, this.#width);
			surface.push("");
		}
		return {
			description: ext.description,
			surface,
			contents: [],
			preview: { heading: t("plugin.inspector.previewInstruction"), text: data.content },
			config: [],
		};
	}

	#fallbackKind(ext: Extension): KindView {
		const surface: string[] = [];
		if (ext.trigger) {
			surface.push(theme.fg("muted", t("plugin.inspector.sectionTrigger")));
			surface.push(this.#rule());
			surface.push(`  ${theme.fg("accent", ext.trigger)}`);
			surface.push("");
		}
		return { description: ext.description, surface, contents: [], config: [] };
	}

	#pushIdentity(lines: string[], ext: Extension, title: string | undefined): void {
		const name = sanitizeDisplayLine(ext.displayName);
		lines.push(theme.bold(theme.fg("accent", name)));
		const cleanTitle = sanitizeDisplayLineField(title);
		if (cleanTitle && cleanTitle !== name) lines.push(theme.fg("muted", cleanTitle));
		lines.push("");
	}
	#pushRuntime(lines: string[], ext: Extension, kind: KindView): void {
		if (kind.runtimeLine) {
			lines.push(kind.runtimeLine);
			if (kind.runtimeExtra) lines.push(...kind.runtimeExtra);
			if (ext.state !== "active") {
				lines.push(`  ${this.#getStatusBadge(ext.state, ext.disabledReason, ext.shadowedBy)}`);
			}
			lines.push("");
			return;
		}
		lines.push(this.#getStatusBadge(ext.state, ext.disabledReason, ext.shadowedBy));
		if (kind.runtimeExtra) lines.push(...kind.runtimeExtra);
		lines.push("");
	}

	#pushDescription(lines: string[], description: string | undefined, width: number): void {
		this.#pushShortText(lines, description, width);
	}

	#pushGuidance(lines: string[], guidance: string | undefined, width: number): void {
		this.#pushShortText(lines, guidance, width);
	}

	#pushShortText(lines: string[], value: string | undefined, width: number): void {
		const text = sanitizeDisplayField(value);
		if (!text) return;
		const wrapped: string[] = [];
		for (const raw of sanitizeDisplayText(text).split("\n")) {
			const folded = wrapTextWithAnsi(replaceTabs(raw), Math.max(8, width));
			if (folded.length === 0) wrapped.push("");
			else wrapped.push(...folded);
		}
		if (this.#expanded || wrapped.length <= MCP_INLINE_DESC_LINES) {
			lines.push(...wrapped);
		} else {
			lines.push(...wrapped.slice(0, MCP_INLINE_DESC_LINES));
			lines.push(this.#moreLine(wrapped.length - MCP_INLINE_DESC_LINES));
		}
		lines.push("");
	}

	#pushOrigin(lines: string[], ext: Extension, width: number): void {
		lines.push(theme.fg("muted", t("plugin.inspector.origin")));
		const levelLabel =
			ext.source.level === "user"
				? t("plugin.inspector.levelUser")
				: ext.source.level === "project"
					? t("plugin.inspector.levelProject")
					: t("plugin.inspector.levelNative");
		const provider = sanitizeDisplayText(ext.source.providerName);
		const via = t("plugin.inspector.originVia", { provider, level: levelLabel });
		this.#pushWrapped(lines, theme.italic(via), width, "  ");
		this.#pushWrapped(lines, theme.fg("dim", sanitizeDisplayText(shortenPath(ext.path, os.homedir()))), width, "  ");
		lines.push("");
	}

	#pushLabeled(
		lines: string[],
		label: string,
		value: string,
		width: number,
		valueColor: "accent" | "dim" | "success" = "accent",
	): void {
		const prefix = `  ${label.padEnd(10)} `;
		const indent = " ".repeat(visibleWidth(prefix));
		const wrapped = wrapTextWithAnsi(
			theme.fg(valueColor, sanitizeDisplayText(value)),
			Math.max(8, width - indent.length),
		);
		lines.push(`${prefix}${wrapped[0] ?? ""}`);
		for (const extra of wrapped.slice(1)) {
			lines.push(`${indent}${extra}`);
		}
	}

	#pushLabeledList(lines: string[], label: string, items: string[], width: number): void {
		if (items.length === 1) {
			this.#pushLabeled(lines, label, items[0], width);
			return;
		}
		const cap = this.#expanded ? items.length : PREVIEW_LIMITS.COLLAPSED_LINES;
		const shown = items.slice(0, cap);
		const hidden = items.length - shown.length;
		const indent = "             ";
		if (hidden > 0) {
			this.#pushLabeled(lines, label, t("plugin.inspector.patternCount", { count: items.length }), width, "dim");
			for (const item of shown) this.#pushWrapped(lines, item, width, indent);
			lines.push(this.#moreLine(hidden, indent));
			return;
		}
		this.#pushLabeled(lines, label, shown[0] ?? "", width);
		for (const item of shown.slice(1)) this.#pushWrapped(lines, item, width, indent);
	}

	#pushParams(lines: string[], params: ToolParamView[], width: number, indent: string): void {
		if (params.length === 0) {
			lines.push(`${indent}${theme.fg("dim", t("plugin.inspector.noArguments"))}`);
			return;
		}
		for (const param of params) {
			const nameCol = theme.fg("accent", param.name.padEnd(12));
			const typeCol = theme.fg("muted", param.type.padEnd(10));
			const reqCol = param.required ? theme.fg("warning", param.flag) : theme.fg("dim", param.flag);
			lines.push(`${indent}${nameCol} ${typeCol} ${reqCol}`);
			if (param.description) this.#pushWrapped(lines, param.description, width, `${indent}  `);
		}
	}

	#pushPreview(lines: string[], text: string, width: number, budget: number): void {
		if (!text) {
			lines.push(theme.fg("dim", `  ${t("plugin.inspector.emptyPreview")}`));
			return;
		}
		const wrapped: string[] = [];
		for (const raw of sanitizeDisplayText(text).split("\n")) {
			const highlighted = this.#highlightMarkdown(raw);
			const folded = wrapTextWithAnsi(highlighted, Math.max(8, width - 1));
			if (folded.length === 0) wrapped.push("");
			else wrapped.push(...folded);
		}
		if (this.#expanded || wrapped.length <= budget) {
			lines.push(...wrapped);
			return;
		}
		const shownBudget = Math.max(1, budget - 1);
		lines.push(...wrapped.slice(0, shownBudget));
		lines.push(this.#moreLine(wrapped.length - shownBudget));
	}

	#highlightMarkdown(line: string): string {
		if (/^#{1,6}\s/.test(line)) return theme.bold(theme.fg("accent", line));
		if (line.startsWith("```")) return theme.fg("dim", line);
		if (/^[\s]*[-*+]\s/.test(line)) return line.replace(/^([\s]*[-*+]\s)/, theme.fg("accent", "$1"));
		if (/^[\s]*\d+\.\s/.test(line)) return line.replace(/^([\s]*\d+\.\s)/, theme.fg("accent", "$1"));
		return line;
	}

	#pushWrapped(lines: string[], text: string, width: number, indent = ""): void {
		const budget = Math.max(1, width - indent.length);
		const wrapped = wrapTextWithAnsi(replaceTabs(text), budget);
		for (const line of wrapped.length > 0 ? wrapped : [""]) {
			lines.push(`${indent}${line}`);
		}
	}

	/** `… N more (<key> to expand)` truncation footer, shared by every collapsed pane. */
	#moreLine(count: number, indent = "  "): string {
		return theme.fg("dim", `${indent}${t("plugin.inspector.moreToExpand", { count, key: expandKeyHint() })}`);
	}

	#rule(): string {
		return theme.fg("dim", "────────────────────────────────────────");
	}

	#mcpHealthGlyph(health: MCPConnectionHealth): string {
		switch (health) {
			case "connected":
				return theme.fg("success", theme.status.enabled);
			case "connecting":
				return theme.fg("muted", theme.status.running);
			case "disconnected":
				return theme.fg("dim", theme.status.shadowed);
			case "inactive":
				return theme.fg("warning", theme.status.disabled);
		}
	}

	#getStatusBadge(state: ExtensionState, reason?: string, shadowedBy?: string): string {
		switch (state) {
			case "active":
				return theme.fg("success", `${theme.status.enabled} ${enablementLabel(state)}`);
			case "disabled":
				return theme.fg("dim", `${theme.status.disabled} ${enablementLabel(state, reason)}`);
			case "shadowed":
				return theme.fg("warning", `${theme.status.shadowed} ${enablementLabel(state, reason, shadowedBy)}`);
		}
	}
}

function inspectorExtensionKey(extension: Extension | null): string | null {
	if (!extension) return null;
	return `${extension.kind}:${extension.id}:${extension.path}`;
}
