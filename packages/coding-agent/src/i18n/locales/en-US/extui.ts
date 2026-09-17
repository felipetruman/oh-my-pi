/**
 * Extension UI controller status, warning and error surfaces
 * (`modes/controllers/extension-ui-controller.ts`).
 *
 * Extension paths, tool names and the raw error text they carry are data and
 * are interpolated verbatim. The `ASK_OTHER_OPTION` / `ASK_CHAT_OPTION` /
 * `ASK_NEXT_OPTION` sentinels in that controller stay English and have no keys
 * here — see the comment above them.
 */
export const extui = {
	// ── Usage-aware coding-plan fallback confirmation ─────────────────────
	// `{from}` and `{to}` are account/plan identifiers and stay verbatim.
	// `Choose No` names the dialog's own `common.no` button.
	"extUi.reserve.marginReached": "inside the configured reserve margin",
	"extUi.reserve.message": "{from} has {reserve}. Switch to {to}? Choose No to keep using the current plan.",
	"extUi.reserve.remaining": "{percent}% remaining",
	"extUi.reserve.title": "Coding-plan reserve reached",

	// ── Session-flow status lines ─────────────────────────────────────────
	// `New session started` reuses `command.sessionFlow.newStarted` and
	// `Navigated to selected point` reuses `nav.tree.navigated`.
	"extUi.status.branched": "Branched to new session",
	"extUi.status.reloaded": "Reloaded session",

	// ── Errors surfaced in the chat ───────────────────────────────────────
	// `sendMessage` / `sendUserMessage` are extension API method names.
	"extUi.error.extension": 'Extension "{path}" error: {error}',
	"extUi.error.sendMessage": "Extension sendMessage failed: {error}",
	"extUi.error.sendUserMessage": "Extension sendUserMessage failed: {error}",
	"extUi.error.tool": 'Tool "{name}" error: {error}',

	// ── Widgets and ask-dialog chrome ─────────────────────────────────────
	"extUi.ask.draftGuardHint": "Finish or clear the current prompt to answer",
	"extUi.widget.truncated": "... (widget truncated)",
} as const;
