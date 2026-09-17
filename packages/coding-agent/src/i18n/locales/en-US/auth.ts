/** Provider sign-in and sign-out dialogs, OAuth picker, usage reset, model-role display text. Filled by the auth migration task. */
export const auth = {
	// ── Shared account chrome ─────────────────────────────────────────────
	// Leading space is load-bearing: the tag is appended straight after the
	// account label.
	"auth.account.activeTag": " (active)",

	// ── Provider picker (`/login`, `/logout`) ─────────────────────────────
	"auth.oauth.checking": "checking",
	"auth.oauth.emptyLogin": "No OAuth providers available",
	"auth.oauth.emptyLogout": "No stored provider credentials to log out",
	"auth.oauth.invalid": "invalid",
	"auth.oauth.loggedIn": "logged in",
	"auth.oauth.loginTitle": "Select provider to login",
	"auth.oauth.logoutTitle": "Select provider to logout",
	"auth.oauth.noMatches": "No matching providers",
	"auth.oauth.searchPrefix": "Search: {query}",
	"auth.oauth.typeToSearch": "Type to search",
	"auth.oauth.unavailable": "Provider unavailable in this environment.",
	// Fuzzy-match fodder, never rendered: extra words let a reader find a row
	// by the status the list shows rather than by the provider id.
	"auth.oauth.searchKeywords.authenticated": "logged in authenticated",
	"auth.oauth.searchKeywords.unavailable": "unavailable",

	// ── Login dialog (OAuth flow) ─────────────────────────────────────────
	"auth.login.cancelled": "Login cancelled",
	"auth.login.clickHint": "Ctrl+click to open",
	"auth.login.clickHintMac": "Cmd+click to open",
	"auth.login.escapeOrEnter": "(Escape to cancel, Enter to submit)",
	"auth.login.escapeToCancel": "(Escape to cancel)",
	"auth.login.localShortcut": "Local shortcut (this machine only): {url}",
	"auth.login.placeholderExample": "e.g., {value}",
	"auth.login.title": "Login to {provider}",

	// ── Account picker (`/logout <provider>`) ─────────────────────────────
	"auth.logout.accountTitle": "Select {provider} account to log out",
	"auth.logout.empty": "No stored accounts to log out",
	"auth.logout.footerHint": "↑/↓ select · ↵ log out account · Esc cancel",

	// ── Saved rate-limit resets (`/usage reset`) ──────────────────────────
	"auth.resetUsage.confirmHint": "Press Enter again to spend 1 reset for {label}, Esc to cancel",
	"auth.resetUsage.empty": "No Codex accounts with saved resets",
	"auth.resetUsage.footerHint": "↑/↓ select · ↵ spend a reset · Esc cancel",
	"auth.resetUsage.noneAvailable": "That account has no saved resets to spend.",
	"auth.resetUsage.savedCountOne": "1 saved reset",
	"auth.resetUsage.savedCountOther": "{count} saved resets",
	"auth.resetUsage.title": "Spend a saved rate-limit reset",
} as const;
