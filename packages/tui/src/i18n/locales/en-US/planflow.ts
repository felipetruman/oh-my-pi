/**
 * Plan-review and goal-mode menus driven from interactive-mode, plus the
 * runtime notices that mode controller prints above the editor (loop/vibe
 * banners, cwd switch, persistence, LSP startup, teardown).
 */
export const planflow = {
	// ── Plan review overlay (`/plan`, plan approval) ──────────────────────
	"planFlow.review.title": "Plan mode - next step",
	"planFlow.option.approveExecute": "Approve and execute",
	"planFlow.option.approveCompact": "Approve and compact context",
	"planFlow.option.keepContext": "Approve and keep context",
	"planFlow.option.keepContextUsage": "Approve and keep context (~{tokens} / {contextWindow})",
	"planFlow.option.refine": "Refine plan",
	"planFlow.option.saveAndQuit": "Save and quit",
	"planFlow.slider.continueWith": "continue with",
	"planFlow.error.planFileNotFound": "Plan file not found at {path}",
	"planFlow.error.invalidSavePath": "Invalid plan save path: {error}",
	"planFlow.error.saveToPathFailed": "Failed to save plan to {path}: {error}",
	"planFlow.error.savedButExitFailed": "Saved plan to {path}, but could not exit plan mode: {error}",
	"planFlow.error.savedButNewSessionFailed": "Saved plan to {path}, but could not start a new session: {error}",
	"planFlow.error.saveFailed": "Failed to save plan: {error}",
	"planFlow.error.finalizeFailed": "Failed to finalize approved plan: {error}",
	"planFlow.error.refineFailed": "Failed to refine plan: {error}",
	"planFlow.warn.copyFailed": "Failed to copy plan to clipboard: {error}",
	"planFlow.warn.autosaveFailed": "Failed to autosave plan: {detail}",
	"planFlow.warn.compactionCancelled":
		"Plan approved, but compaction was cancelled — execution not dispatched. Submit a turn to continue.",
	"planFlow.warn.planModelFailed": "Failed to switch to plan model for plan mode: {error}",
	"planFlow.warn.executionModelFailed": "Could not switch to the {role} model: {error}",

	// ── Goal mode menu and details (`/goal`) ──────────────────────────────
	"goal.menu.title": "Goal: {summary} ({status})",
	"goal.menu.titlePaused": "Goal paused: {summary}",
	"goal.menu.showDetails": "Show details",
	"goal.menu.adjustBudget": "Adjust budget…",
	"goal.menu.pause": "Pause",
	"goal.menu.resume": "Resume",
	"goal.menu.drop": "Drop",
	"goal.budgetPrompt": "Goal budget (number, `off`, or empty to cancel)",
	"goal.details.objective": "Objective: {objective}",
	"goal.details.status": "Status: {status}{paused}",
	"goal.details.tokens": "Tokens: {usage}",
	"goal.details.timeSpent": "Time spent: {duration}",
	"goal.details.budgetUsage": "{used} / {total} ({left} left)",
	"goal.details.budgetNone": "{used} (no budget)",

	// ── Loop mode banner (`/loop`) ────────────────────────────────────────
	// The three suffixes are optional and arrive pre-composed; each is "" when
	// the corresponding loop option was not set.
	"hud.status.loopEnabled":
		"Loop mode enabled.{limit}{remaining}{condition} {tail} Esc cancels the current iteration; /loop again to disable.",
	"hud.status.loopLimitedTo": " Limited to {limit}.",
	"hud.status.loopContinuing": " Continuing {condition}.",
	"hud.status.loopRepeatingPrompt": "Repeating it after each turn.",
	"hud.status.loopRepeatNextPrompt": "Your next prompt will repeat after each turn.",

	// ── Vibe mode banner (`/vibe`) ────────────────────────────────────────
	"hud.status.vibeEnabled":
		"Vibe mode enabled. You direct fast/good worker sessions; toolset is read + optional parent Todo + vibe tools.",

	// ── Workspace, session and runtime notices ────────────────────────────
	"hud.status.cwdChangeFailed": "Cannot change working directory to {path}: {error}",
	"hud.status.cwdSwitchAndRestoreFailed":
		"Failed to switch to {path} ({error}), and restoring the previous workspace failed: {restoreError}",
	"hud.status.persistenceFailed":
		"Session persistence failed: {detail}. Unsaved entries remain in memory; persistence will retry on the next entry.",
	"hud.status.modelSwitchAfterStreamFailed": "Failed to switch model after streaming: {error}",
	"hud.status.lspStartupFailed": "LSP startup failed: {error}. It will retry lazily on write.",
	"hud.status.lspStartupFailedFor": "LSP startup failed for {names}{detail}. It will retry lazily on write.",
	"hud.status.shutdownFailed": "Shutdown failed: {error}",
	"hud.status.teardownFailedClose": "Could not close session: {detail}",
	"hud.status.teardownFailedRestart": "Could not restart session: {detail}",
	"hud.status.teardownForceQuitHint": "Press Ctrl+C again to exit without saving the session log.",

	// ── `/btw` branch result (companion to sidecmds' btw.cannotBranch) ────
	"btw.branchedTo": "Branched /btw to {name}",
	"btw.branched": "Branched /btw",
} as const;
