import { canonicalKeyId, type Keybinding, type KeybindingDefinitions } from "@oh-my-pi/pi-tui";
import {
	type AppKeybinding,
	formatKeyHints,
	KEYBINDINGS,
	type KeybindingsManager,
	keyHintPlatform,
	modifierLabel,
} from "../../config/keybindings";
import { EN_US, t, type TranslationKey } from "../../i18n";

export interface HotkeysMarkdownBindings {
	keybindings: Pick<KeybindingsManager, "getDisplayString" | "getKeys" | "matchesCanonical">;
}

/** Widened view of the registry: descriptions are looked up by a runtime id, not a literal. */
const DEFINITIONS: KeybindingDefinitions = KEYBINDINGS;

function appKey(bindings: HotkeysMarkdownBindings, action: AppKeybinding): string {
	return bindings.keybindings.getDisplayString(action) || t("common.disabled");
}

/**
 * Localized description for a keybinding action.
 *
 * `hotkeys.key.<actionId>` wins when this package translates the action;
 * otherwise the English description the keybinding registry ships with is used,
 * so an action id this table does not cover still renders its row. The
 * translations live here rather than in `KEYBINDINGS`/`TUI_KEYBINDINGS` to keep
 * the dependency one-way: the coding agent knows pi-tui, never the reverse.
 *
 * The cast is guarded by the `in` check — a key the table lacks never reaches `t`.
 */
export function describeKeybinding(action: Keybinding): string {
	const key = `hotkeys.key.${action}` as TranslationKey;
	if (key in EN_US) return t(key);
	return DEFINITIONS[action]?.description ?? action;
}

/** One `| key | action |` row for an action, both cells resolved from the active language. */
function appRow(bindings: HotkeysMarkdownBindings, action: AppKeybinding): string {
	return `| \`${appKey(bindings, action)}\` | ${describeKeybinding(action)} |`;
}

export function buildHotkeysMarkdown(bindings: HotkeysMarkdownBindings): string {
	const platform = keyHintPlatform();
	const isMac = platform === "darwin";
	const alt = modifierLabel("alt", platform);
	const cmd = modifierLabel("super", platform);
	// CustomEditor tests the chord that was actually pressed, so exit keys split by role: a key
	// that also carries tui.editor.deleteCharForward (the readline `^D` overlap) forward-deletes
	// while the prompt holds a draft, any other exit key quits immediately. Mixed bindings such as
	// `["ctrl+d", "ctrl+q"]` therefore get one row per behavior instead of a single row claiming
	// both keys delete.
	const exitKeys = bindings.keybindings.getKeys("app.exit");
	const deletingExitKeys = exitKeys.filter(key =>
		bindings.keybindings.matchesCanonical(canonicalKeyId(key), "tui.editor.deleteCharForward"),
	);
	const quittingExitKeys = exitKeys.filter(
		key => !bindings.keybindings.matchesCanonical(canonicalKeyId(key), "tui.editor.deleteCharForward"),
	);
	const exitRows: string[] = [];
	if (deletingExitKeys.length > 0) {
		exitRows.push(`| \`${formatKeyHints(deletingExitKeys)}\` | ${t("hotkeys.row.exitOrDeleteForward")} |`);
	}
	// An unbound exit action still gets its row, mirroring the `Disabled` hint every other row uses.
	if (quittingExitKeys.length > 0 || deletingExitKeys.length === 0) {
		exitRows.push(`| \`${formatKeyHints(quittingExitKeys) || t("common.disabled")}\` | ${t("hotkeys.row.exit")} |`);
	}
	const header = `| ${t("hotkeys.columnKey")} | ${t("hotkeys.columnAction")} |`;
	const hubKeys = `\`${appKey(bindings, "app.agents.hub")}\` / \`${appKey(bindings, "app.session.observe")}\``;
	const hubGesture = t("hotkeys.doubleTapEmptyEditor", { key: "`←`" });
	return [
		t("hotkeys.sectionNavigation"),
		header,
		"|-----|--------|",
		`| \`${t("hotkeys.row.arrowKeys")}\` | ${t("hotkeys.row.moveCursorOrHistory")} |`,
		`| \`${alt}+Left/Right\` | ${t("hotkeys.row.moveByWord")} |`,
		isMac
			? `| \`Ctrl+A\` / \`Home\` / \`${cmd}+Left\` | ${t("hotkeys.row.lineStart")} |`
			: `| \`Ctrl+A\` / \`Home\` | ${t("hotkeys.row.lineStart")} |`,
		isMac
			? `| \`Ctrl+E\` / \`End\` / \`${cmd}+Right\` | ${t("hotkeys.row.lineEnd")} |`
			: `| \`Ctrl+E\` / \`End\` | ${t("hotkeys.row.lineEnd")} |`,
		"",
		t("hotkeys.sectionEditing"),
		header,
		"|-----|--------|",
		`| \`Enter\` | ${t("hotkeys.row.sendMessage")} |`,
		`| \`Shift+Enter\` / \`${alt}+Enter\` | ${t("hotkeys.row.newLine")} |`,
		`| \`Ctrl+W\` / \`${alt}+Backspace\` | ${t("hotkeys.row.deleteWordBackwards")} |`,
		`| \`Ctrl+U\` | ${t("hotkeys.row.deleteToLineStart")} |`,
		`| \`Ctrl+K\` | ${t("hotkeys.row.deleteToLineEnd")} |`,
		appRow(bindings, "app.clipboard.copyLine"),
		appRow(bindings, "app.clipboard.copyPrompt"),
		"",
		t("hotkeys.sectionOther"),
		header,
		"|-----|--------|",
		`| \`Tab\` | ${t("hotkeys.row.tabCompletion")} |`,
		appRow(bindings, "app.interrupt"),
		appRow(bindings, "app.clear"),
		...exitRows,
		appRow(bindings, "app.suspend"),
		appRow(bindings, "app.display.reset"),
		appRow(bindings, "app.thinking.cycle"),
		appRow(bindings, "app.model.cycleForward"),
		appRow(bindings, "app.model.cycleBackward"),
		appRow(bindings, "app.model.selectTemporary"),
		appRow(bindings, "app.model.select"),
		appRow(bindings, "app.plan.toggle"),
		appRow(bindings, "app.history.search"),
		appRow(bindings, "app.tools.expand"),
		appRow(bindings, "app.tools.toggleVisibility"),
		appRow(bindings, "app.thinking.toggle"),
		appRow(bindings, "app.editor.external"),
		appRow(bindings, "app.retry"),
		appRow(bindings, "app.clipboard.pasteImage"),
		`| ${t("hotkeys.hold")} \`Space\` | ${t("hotkeys.row.speechToText")} |`,
		appRow(bindings, "app.live.toggle"),
		`| ${hubKeys} / ${hubGesture} | ${describeKeybinding("app.agents.hub")} |`,
		`| \`#<number>\` | ${t("hotkeys.row.githubReference")} |`,
		`| \`#\` / \`#<text>\` | ${t("hotkeys.row.promptActions")} |`,
		`| \`/\` | ${t("hotkeys.row.slashCommands")} |`,
		`| \`!\` | ${t("hotkeys.row.bash")} |`,
		`| \`!!\` | ${t("hotkeys.row.bashNoContext")} |`,
		`| \`$\` | ${t("hotkeys.row.python")} |`,
		`| \`$$\` | ${t("hotkeys.row.pythonNoContext")} |`,
	].join("\n");
}
