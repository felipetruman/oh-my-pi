/**
 * Chrome of the settings panel itself. Per-setting labels are NOT here — those
 * stay in `SETTINGS_SCHEMA` and are overridden per language in
 * `locales/settings-metadata/`.
 */
export const settings = {
	"settings.hints.footer": "Enter/Space to change \u00b7 {nav} \u00b7 Type to search \u00b7 Esc to close",
	"settings.hints.navSections": "Tab to jump sections \u00b7 \u2190/\u2192 to switch tabs",
	"settings.hints.navTabs": "Tab to switch tabs",
	"settings.hints.plugins": "Tab to switch tabs \u00b7 Esc to close",
	"settings.hints.search": "Enter to change \u00b7 Tab to jump tabs \u00b7 Esc to exit search",
	"settings.hints.sectionFocused":
		"\u2191/\u2193 to jump sections \u00b7 Tab/Enter to settings \u00b7 \u2190/\u2192 to switch tabs \u00b7 Esc to close",
	"settings.multiselect.default": "default",
	"settings.multiselect.hintOrdered":
		"  Click to toggle \u00b7 drag selected items to reorder \u00b7 \u2190/\u2192 move \u00b7 1-9 place \u00b7 Esc to go back",
	"settings.multiselect.hintToggle": "  Click/Enter/Space to toggle \u00b7 Esc to go back",
	"settings.multiselect.none": "none",
	"settings.providerLimits.clearAll": "Clear all limits",
	"settings.providerLimits.clearAllDescription": "Make every provider unlimited",
	"settings.providerLimits.errorPositiveNumber": "Limit must be a positive number.",
	"settings.providerLimits.hintEdit": "  Enter to edit provider \u00b7 Esc to go back",
	"settings.providerLimits.help":
		"Select a provider, enter a positive number to cap concurrent LLM requests, or clear it for unlimited.",
	"settings.providerLimits.inputHelp":
		"Enter a positive number. Decimals round down. Clear the field to make this provider unlimited.",
	"settings.providerLimits.limit": "Limit: {value}",
	"settings.providerLimits.title": "Max In-Flight Requests",
	"settings.search.empty": "No matching settings",
	"settings.search.matchCountOne": "1 match",
	"settings.search.matchCountOther": "{count} matches",
	"settings.statusLine.previewNotAvailable": "(preview not available)",
	"settings.submenu.hintSelect": "  Enter to select \u00b7 Esc to go back",
	"settings.tabs.plugins": "Plugins",
	"settings.textInput.hint": "  Enter to save \u00b7 Esc to cancel \u00b7 Clear field to unset",
	"settings.title": "Settings",
} as const;
