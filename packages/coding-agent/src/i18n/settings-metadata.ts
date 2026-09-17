import { type SettingPath, type SettingTab, TAB_METADATA } from "../config/settings-schema";
import { getLocale, type LocaleId } from "./locale";
import { PT_BR_SETTINGS } from "./locales/settings-metadata/pt-BR";
import type { SettingOptionOverrides, SettingsLocaleTable } from "./locales/settings-metadata/types";

/**
 * Settings labels are localized against the schema rather than against a
 * duplicated English table: `SETTINGS_SCHEMA` already carries the canonical
 * English text for all 377 entries, and copying it here would be weight that
 * silently drifts out of sync. en-US therefore has no table at all, which also
 * makes English output byte-identical to the pre-i18n renderer.
 */
const TABLES: Partial<Record<LocaleId, SettingsLocaleTable>> = {
	"pt-BR": PT_BR_SETTINGS,
};

function activeTable(): SettingsLocaleTable | undefined {
	return TABLES[getLocale()];
}

export function localizedTabLabel(tab: SettingTab): string {
	return activeTable()?.tabs?.[tab] ?? TAB_METADATA[tab].label;
}

export function localizedGroupLabel(tab: SettingTab, group: string): string {
	return activeTable()?.groups?.[tab]?.[group] ?? group;
}

export function localizedSettingText(
	path: SettingPath,
	field: "label" | "description" | "warning",
	fallback: string,
): string {
	return activeTable()?.paths?.[path]?.[field] ?? fallback;
}

/**
 * Overrides for one setting's choice list, or `undefined` when the active
 * language has none. Callers use the `undefined` case to hand back the schema's
 * own option array unchanged instead of rebuilding it.
 */
export function settingOptionOverrides(path: SettingPath): SettingOptionOverrides | undefined {
	return activeTable()?.options?.[path];
}

export function localizedOptionText(
	path: SettingPath,
	value: string,
	field: "label" | "description",
	fallback: string,
): string {
	return settingOptionOverrides(path)?.[value]?.[field] ?? fallback;
}
