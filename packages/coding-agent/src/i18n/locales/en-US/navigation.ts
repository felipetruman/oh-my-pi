/** Selector controller, tree selector, branch/BTW history, move overlay, session account picker. */
export const navigation = {
	// ── Advisor config overlay (`/advisor configure`) ─────────────────────
	// `{scope}` is the scope id (`project` / `user`) the overlay is editing.
	"nav.advisor.savedNone": "Saved {scope} WATCHDOG.yml. Run /advisor on to activate the configured advisors.",
	"nav.advisor.savedOne": "Saved {scope} WATCHDOG.yml — 1 advisor active.",
	"nav.advisor.savedOther": "Saved {scope} WATCHDOG.yml — {count} advisors active.",

	// ── Settings side effects (`/settings`) ───────────────────────────────
	"nav.settings.externalThinkingFailed": "Failed to apply external thinking: {error}",
	"nav.settings.memoryBackendFailed": "Failed to apply memory backend: {error}",
	"nav.settings.mermaidFailed": "Failed to apply Mermaid rendering setting: {error}",
	"nav.settings.personalityFailed": "Failed to apply personality: {error}",
	"nav.settings.themeFailed": 'Failed to load theme "{theme}": {error}\nFell back to dark theme.',
	"nav.settings.xdevDocsFailed": "Failed to apply xd:// prompt docs setting: {error}",

	// ── Model roles and session-only switches ─────────────────────────────
	// `nav.model.scope*` are prefixes in English and suffixes in languages that
	// place the qualifier after the noun, so each carries its own spacing and
	// the surrounding keys below place `{scope}` where that language needs it.
	"nav.model.cycleCleared": "Quick-switch cycle cleared",
	"nav.model.cycleSet": "Quick-switch cycle: {order}",
	"nav.model.defaultSet": "Default model: {selector}",
	"nav.model.defaultSetScoped": "{scope}default model: {selector}",
	"nav.model.fallbacksCleared": "{role} fallbacks cleared",
	"nav.model.fallbacksSet": "{role} fallbacks: {chain}",
	"nav.model.roleAssigned": "{scope}{role} model: {selector}",
	"nav.model.roleCleared": "{scope}{role} role cleared — auto-selection applies",
	"nav.model.scopeGlobal": "Global ",
	"nav.model.scopeProject": "Project ",
	"nav.model.sessionOnly": "Session-only model: {selector}. Use {key} or /model for roles.",
	"nav.model.taskSessionOnly": "Task subagent model (session-only): {selector}. Use /agents to persist.",

	// ── Plugin marketplace selector (`/plugin`) ───────────────────────────
	"nav.plugin.installFailed": "Install failed: {error}",
	"nav.plugin.installed": "Installed {plugin} from {marketplace}",
	"nav.plugin.installing": "Installing {plugin} from {marketplace}...",
	"nav.plugin.uninstallFailed": "Uninstall failed: {error}",
	"nav.plugin.uninstalled": "Uninstalled {plugin}",
	"nav.plugin.uninstalling": "Uninstalling {plugin}...",

	// ── Rewind selector (esc-esc) ─────────────────────────────────────────
	"nav.rewind.alreadyHere": "Already at this point",
	"nav.rewind.cancelled": "Navigation cancelled",
	"nav.rewind.done": "Rewound to selected point",
	"nav.rewind.noMessages": "No messages to branch from",

	// ── Copy selector ─────────────────────────────────────────────────────
	"nav.copy.copied": "Copied {label} to clipboard",
	"nav.copy.nothingInItem": "Nothing to copy in that item",
	"nav.copy.nothingYet": "Nothing to copy yet.",
	"nav.copy.opening": "Opening {label}: {href}",

	// ── Re-answering a past `ask` from the tree ───────────────────────────
	// `Chat about this` is a reserved option label the ask tool matches on, so
	// it stays verbatim inside the sentence.
	"nav.ask.chatRedirectUnavailable":
		"Chat about this isn't available when re-answering from the tree — pick an option or type a custom answer instead.",
	"nav.ask.reanswerCancelled": "Re-answer cancelled",
	"nav.ask.uiNotReady": "Ask tool UI is not ready",

	// ── Branch summary prompt (`/tree`) ───────────────────────────────────
	"nav.summary.cancelled": "Branch summarization cancelled",
	"nav.summary.customTitle": "Custom summarization instructions",
	"nav.summary.optionCustom": "Summarize with custom prompt",
	"nav.summary.optionNone": "No summary",
	"nav.summary.optionSummarize": "Summarize",
	"nav.summary.running": "Summarizing branch... (esc to cancel)",
	"nav.summary.title": "Summarize branch?",

	// ── Session picker, resume and delete ─────────────────────────────────
	"nav.session.deleteBody":
		"This will permanently delete the current session.\nYou will be returned to the session selector.",
	"nav.session.deleteCancelled": "Delete cancelled",
	"nav.session.deleteFailed": "Failed to delete session: {error}",
	"nav.session.deleteTitle": "Delete Session",
	"nav.session.deleted": "Session deleted",
	"nav.session.foreignEmpty": "No {source} sessions found",
	"nav.session.foreignListFailed": "Failed to list {source} sessions: {error}",
	"nav.session.foreignPersistFailed": "Failed to persist {source} session",
	"nav.session.foreignUnavailable": "Selected {source} session is no longer available",
	"nav.session.importTitle": "Import {source} Session",
	"nav.session.noFileToDelete": "No session file to delete (in-memory session)",
	"nav.session.notSaved": "Session has not been saved yet",
	"nav.session.resumed": "Resumed session",
	"nav.session.resumedIn": "Resumed session in {path}",
	"nav.session.settingsFlushFailed": "Failed to save pending settings: {error}",

	// ── Provider login (`/login`) ─────────────────────────────────────────
	"nav.login.asAccount": " as {account}",
	"nav.login.credentialsSaved": "Credentials saved to {path}",
	"nav.login.failed": "Login failed: {error}",
	"nav.login.manualPrompt": "Paste the authorization code (or full redirect URL), then press Enter:",
	"nav.login.starting": "Logging in to {provider}…",
	"nav.login.success": "Successfully logged in to {provider}{account}",

	// ── Provider logout (`/logout`) ───────────────────────────────────────
	"nav.logout.credentialRemoved": "Credential removed from {path}",
	"nav.logout.currentSourceSuffix": " Current auth comes from {source}; remove that source to log out.",
	"nav.logout.failed": "Logout failed: {error}",
	"nav.logout.loadFailed": "Could not load stored credentials: {error}",
	"nav.logout.noCredentials": "Logout skipped: no stored credentials for {provider}.{suffix}",
	"nav.logout.noProviders": "No stored provider credentials to log out. Remove env or config auth at its source.",
	"nav.logout.skippedAccount": "Logout skipped: {account} is no longer stored for {provider}.",
	"nav.logout.stillAuthenticated": "{provider} is still authenticated via {source}",
	"nav.logout.success": "Successfully logged out {account} from {provider}",

	// ── Session account pin (`/session pin`) ──────────────────────────────
	"nav.account.activeForSession": "active for this session",
	"nav.account.pinTitle": "Select a {provider} account for this session",
	"nav.pin.loadFailed": "Could not load provider accounts: {error}",
	"nav.pin.loadingAccounts": "Loading provider accounts…",
	"nav.pin.noAccounts": "No stored OAuth accounts for {provider}. Use /login to add one.",
	"nav.pin.noAccountsWithSource": "No stored OAuth accounts for {provider}. Current auth comes from {source}.",
	"nav.pin.pinned": "Pinned {account} to this session for {provider}.",
	"nav.pin.selectModelFirst": "Select a model before pinning a provider account.",
	"nav.pin.streaming": "Cannot pin an account while the session is streaming.",
	"nav.pin.unavailable": "{account} is no longer available to pin.",

	// ── Saved rate-limit resets (`/reset-usage`) ──────────────────────────
	"nav.reset.checking": "Checking saved rate-limit resets…",
	"nav.reset.failed": "Reset failed for {account}: {error}",
	"nav.reset.loadFailed": "Could not load saved resets: {error}",
	"nav.reset.noAccounts": "No Codex accounts found. Use /login to add one.",
	"nav.reset.noneAvailable": "No saved rate-limit resets available to spend right now.",
	"nav.reset.noneReachable": "No saved resets available — some accounts couldn't be reached (try /login).",
	"nav.reset.spending": "Spending 1 saved reset for {account}…",

	// ── Session tree overlay (`/tree`) ────────────────────────────────────
	// Row content (roles, entry-type markers, labels, timestamps) is session
	// data and stays verbatim; only the chrome below is translated. The
	// `nav.tree.filter*` chips keep their leading space — the caller trims it.
	"nav.tree.emptyClearSearch": "Press Backspace to clear the search",
	"nav.tree.emptyFiltered": "{count} entries hidden by the current filter {filter}",
	"nav.tree.emptyNoEntries": "No entries found",
	"nav.tree.emptyNoMatch": 'No entries match search "{query}"',
	"nav.tree.emptyWidenFilter": "Press Alt+A to show all, Alt+D for default",
	"nav.tree.filterAll": " [all]",
	"nav.tree.filterDefault": "[default]",
	"nav.tree.filterLabeled": " [labeled]",
	"nav.tree.filterNoTools": " [no-tools]",
	"nav.tree.filterUser": " [user]",
	"nav.tree.help":
		"Enter: switch. Alt+↑/↓: previous/next turn. PgUp/PgDn (←/→): page. Home/End: first/last item. Shift+Enter: summarize & switch. Shift+L: label. Ctrl+O: filter. Alt+D/T/U/L/A: filter. Type to search",
	"nav.tree.labelHint": "enter: save  esc: cancel",
	"nav.tree.labelPrompt": "Label (empty to remove):",
	"nav.tree.navigated": "Navigated to selected point",
	"nav.tree.rowAborted": "(aborted)",
	"nav.tree.rowLabelCleared": "(cleared)",
	"nav.tree.rowNoContent": "(no content)",
	"nav.tree.rowTierDefault": "(default)",
	"nav.tree.sessionEmpty": "No entries in session",
	"nav.tree.title": "Session Tree",

	// ── BTW side-question history (`/btw`) ────────────────────────────────
	// `/btw QUESTION` is the command's usage syntax and stays verbatim.
	"nav.btw.answer": "Answer",
	"nav.btw.copiedDetail": "✓ Copied to clipboard",
	"nav.btw.copiedHint": "✓ copied · c to copy again",
	"nav.btw.detailsPane": "Details",
	"nav.btw.emptyDetail": "No side questions yet. Use /btw QUESTION to start one.",
	"nav.btw.emptyList": "No side questions yet.\n\nUse /btw QUESTION to start one.",
	"nav.btw.followUpBusy": "A BTW request is busy. Try again when it finishes.",
	"nav.btw.followUpEmpty": "Enter a follow-up question.",
	"nav.btw.followUpFailed": "Could not start the follow-up. Your draft is kept; Enter to retry.",
	"nav.btw.followUpNotStarted": "Follow-up was not started. Your draft is kept; Enter to retry.",
	"nav.btw.followUpPrompt": "Follow up: ",
	"nav.btw.followUpStarting": "Starting follow-up…",
	"nav.btw.hintClose": "close",
	"nav.btw.hintCopy": "copy",
	"nav.btw.hintCopyAnswer": "copy answer",
	"nav.btw.hintFollowUp": "follow up",
	"nav.btw.hintScroll": "scroll",
	"nav.btw.hintSend": "send",
	"nav.btw.hintStarting": "starting…",
	"nav.btw.hintSwitchPane": "switch pane",
	"nav.btw.historyPane": "History ({count})",
	"nav.btw.noAnswerText": "No answer text.",
	"nav.btw.notResumed": "Not resumed in this view.",
	"nav.btw.question": "Question",
	"nav.btw.statusCancelled": "Cancelled",
	"nav.btw.statusComplete": "Complete",
	"nav.btw.statusError": "Error",
	"nav.btw.statusInterrupted": "Interrupted",
	"nav.btw.statusRunning": "Running",
	"nav.btw.title": "BTW history",
	"nav.btw.topic": "Topic: {question}",
	"nav.btw.waiting": "Waiting for response…",

	// ── `/move` overlay ───────────────────────────────────────────────────
	"nav.move.footerHint": "Type to filter · ↑↓ navigate · Tab accept · Enter confirm · Esc cancel",
	"nav.move.noMatches": "No matching directories",
	"nav.move.pathLabel": "Path: ",
	"nav.move.pathPlaceholder": "Type a directory path…",
	"nav.move.title": "Move to directory",
} as const;
