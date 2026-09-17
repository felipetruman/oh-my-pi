import type { SettingPath, SettingTab } from "../../../config/settings-schema";

/** Localized text for one setting's choice list, keyed by the choice's machine value. */
export type SettingOptionOverrides = Readonly<Record<string, { label?: string; description?: string }>>;

/**
 * Per-language overrides for settings-panel metadata. Keyed by the real tab ids
 * and setting paths, so a stale key fails to compile rather than silently
 * rendering English. Anything absent falls back to the English text already in
 * `SETTINGS_SCHEMA`.
 */
export interface SettingsLocaleTable {
	tabs?: Partial<Record<SettingTab, string>>;
	/** Section heading overrides, keyed by the English section name from `TAB_GROUPS`. */
	groups?: Partial<Record<SettingTab, Readonly<Record<string, string>>>>;
	paths?: Partial<Record<SettingPath, { label?: string; description?: string; warning?: string }>>;
	/** Keyed by setting path, then by the choice's machine value. */
	options?: Partial<Record<SettingPath, SettingOptionOverrides>>;
}
