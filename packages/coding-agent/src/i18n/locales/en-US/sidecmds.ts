/**
 * Side commands: `/btw`, `/tan`, `/todo` and `/ssh`.
 *
 * Command names and verbs, flag names (`--host`, `--scope`), scope identifiers
 * (`project`/`user`), todo status identifiers (`in_progress`), env var names and
 * file paths are the invocation surface: they stay verbatim inside the sentences
 * that frame them.
 */
export const sidecmds = {
	// ── `/btw` ────────────────────────────────────────────────────────────
	"btw.actionInProgress": "A /btw action is in progress. Please wait.",
	"btw.branchInProgress": "/btw branch is in progress",
	"btw.branchUnavailable": "/btw branch unavailable: {reason}",
	"btw.cannotBranch": "Cannot branch /btw: {error}",
	"btw.cannotOpenHistory": "Cannot open /btw history: {error}",
	"btw.copiedAnswer": "Copied /btw answer to clipboard",
	"btw.historySaveFailed": "Could not save /btw history: {error}",
	"btw.historySaveStopped":
		"BTW history could not be saved: {error}. The session operation was stopped; retry after fixing storage. Unsaved answers remain in /btw.",
	"btw.historySaving":
		"BTW history is still being saved. The session operation was stopped; retry when storage responds.",
	"btw.noModel": "No active model available for /btw.",
	"btw.questionRunning": "A /btw question is still running. Open /btw to view it or cancel it first.",
	"btw.sessionChangedWhileOpening": "The session changed while opening BTW history.",
	"btw.sideConversationUnavailable": "This side conversation is unavailable or still running.",
	"btw.waitBeforeMoving": "Wait for the current /btw answer to finish or cancel it before moving.",

	// ── `/btw` branch blockers, interpolated into `btw.branchUnavailable` ──
	"btw.reason.branchInProgress": "a branch is already in progress",
	"btw.reason.multiTurnHistory": "multi-turn side conversations remain in BTW history",
	"btw.reason.noBranchPoint": "the session has no branch point",
	"btw.reason.notReady": "the answer is not ready",
	"btw.reason.sessionChanged": "the session changed since /btw started",
	"btw.reason.sessionOperation": "a session operation is in progress",
	"btw.reason.turnRunning": "a turn is still running",
	"btw.reason.unavailable": "the answer is unavailable",

	// ── `/tan` ────────────────────────────────────────────────────────────
	"tan.backgroundJobsDisabled": "Background jobs are disabled; enable async jobs to use /tan.",
	"tan.dispatched": "Dispatched background tan {jobId}",
	"tan.noModel": "No active model available for /tan.",
	"tan.requiresPersistedSession": "/tan requires a persisted session.",
	"tan.usage": "Usage: /tan <work>",

	// ── `/todo` usage block ───────────────────────────────────────────────
	"todo.usage.append": "Append a task; phase fuzzy-matched or auto-created",
	"todo.usage.collapse": "Restore the bounded HUD preview",
	"todo.usage.copy": "Copy todos as Markdown to clipboard",
	"todo.usage.done": "Mark task/phase/all completed",
	"todo.usage.drop": "Mark task/phase/all abandoned",
	"todo.usage.edit": "Open todos in $EDITOR",
	"todo.usage.expand": "Show every phase and task in the HUD",
	"todo.usage.export": "Write todos to file (default: TODO.md)",
	"todo.usage.header": "Usage: /todo <verb> [args]",
	"todo.usage.import": "Replace todos from file (default: TODO.md)",
	"todo.usage.rm": "Remove task/phase/all",
	"todo.usage.show": "Show current todos",
	"todo.usage.start": "Mark task in_progress (fuzzy content match)",

	// ── `/todo` counts, composed into the two summary lines below ─────────
	// English keeps the plural-agnostic "(s)" form in both branches; other
	// languages inflect. The count drives the choice at the call site.
	"todo.phaseCountOne": "{count} phase(s)",
	"todo.phaseCountOther": "{count} phase(s)",
	"todo.taskCountOne": "{count} task(s)",
	"todo.taskCountOther": "{count} task(s)",

	// ── `/todo` results ───────────────────────────────────────────────────
	"todo.appendUsage": "Usage: /todo append [<phase>] <task...>",
	"todo.appended": "Appended to {phase}: {task}",
	"todo.clearedAll": "Cleared all todos.",
	"todo.copied": "Copied todos as Markdown to clipboard.",
	"todo.editorNoSave": "Editor exited without saving; todos unchanged.",
	"todo.empty": "No todos. Use /todo append <task> to start one.",
	"todo.exportFailed": "Failed to write todos: {error}",
	"todo.exported": "Wrote todos to {path}",
	"todo.imported": "Imported {phases}, {tasks} from {path}.",
	"todo.markedAbandoned": "Marked abandoned: {task}",
	"todo.markedAllAbandoned": "Marked all tasks abandoned.",
	"todo.markedAllCompleted": "Marked all tasks completed.",
	"todo.markedCompleted": "Marked completed: {task}",
	"todo.markedPhaseAbandoned": "Marked phase {phase} abandoned.",
	"todo.markedPhaseCompleted": "Marked phase {phase} completed.",
	"todo.noTaskMatched": 'No task matched "{query}". Use /todo to list current tasks.',
	"todo.noTaskOrPhaseMatched": 'No task or phase matched "{query}".',
	"todo.noneToCopy": "No todos to copy.",
	"todo.noneToExport": "No todos to export.",
	"todo.parseFileFailed": "Could not parse {path}:",
	"todo.parseMarkdownFailed": "Could not parse Markdown:",
	"todo.readFailed": "Failed to read todos: {error}",
	"todo.removed": "Removed: {task}",
	"todo.removedPhase": "Removed phase: {phase}",
	"todo.startUsage": "Usage: /todo start <task>",
	"todo.started": "Started: {task}",
	"todo.unknownVerb": 'Unknown /todo verb "{verb}".',
	"todo.updatedFromEditor": "Todos updated from editor: {phases}, {tasks}.",

	// ── `/ssh help` ───────────────────────────────────────────────────────
	"ssh.help.intro": "Manage SSH host configurations for remote command execution.",
	"ssh.help.list": "List all configured SSH hosts",
	"ssh.help.remove": "Remove an SSH host (default: project)",
	"ssh.help.title": "SSH Host Management",

	// ── `/ssh` argument parsing ───────────────────────────────────────────
	"ssh.errHostNameRequired": "Host name required. Usage: {usage}",
	"ssh.errHostRequired": "--host is required. Usage: {usage}",
	"ssh.errInvalidPort": "Invalid --port value. Must be an integer between 1 and 65535.",
	"ssh.errMissingDescValue": "Missing value for --desc.",
	"ssh.errMissingHostValue": "Missing value for --host.",
	"ssh.errMissingKeyValue": "Missing value for --key.",
	"ssh.errMissingPortValue": "Missing value for --port.",
	"ssh.errMissingUserValue": "Missing value for --user.",
	"ssh.errUnknownSubcommand": "Unknown subcommand: {subcommand}. Type /ssh help for usage.",
	"ssh.usage": "Usage: {usage}",

	// ── `/ssh add` ────────────────────────────────────────────────────────
	"ssh.addedHost": 'Added SSH host "{name}" to {scope} config',
	"ssh.errAddFailed": "Failed to add host: {error}",
	"ssh.runListHint": "Run {command} to see all configured hosts.",
	"ssh.tipRemoveFirst": "Tip: Use {command} first, or choose a different name.",

	// ── `/ssh list` ───────────────────────────────────────────────────────
	"ssh.errListFailed": "Failed to list hosts: {error}",
	"ssh.listDiscovered": "Discovered",
	"ssh.listEmpty": "No SSH hosts configured.",
	"ssh.listEmptyHint": "Use {command} to add a host.",
	"ssh.listTitle": "Configured SSH Hosts",

	// ── `/ssh remove` ─────────────────────────────────────────────────────
	"ssh.errHostNotFoundInScope": 'Host "{name}" not found in {scope} config.',
	"ssh.errRemoveFailed": "Failed to remove host: {error}",
	"ssh.removedHost": 'Removed SSH host "{name}" from {scope} config',
} as const;
