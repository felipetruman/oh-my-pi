import type { TranslationKey, TranslationTable } from "./keys";
import { EN_US } from "./locales/en-US";
import { PT_BR } from "./locales/pt-BR";
import { getLocale, type LocaleId } from "./locale";

const TABLES: Record<LocaleId, TranslationTable> = {
	"en-US": EN_US,
	"pt-BR": PT_BR,
};

/** Hoisted so lookup never compiles a pattern; `replace` resets `lastIndex` itself. */
const PLACEHOLDER = /\{([A-Za-z0-9_]+)\}/g;

/**
 * Substitute `{name}` placeholders. A placeholder with no matching variable is
 * left verbatim, so a missing variable degrades visibly instead of printing
 * "undefined" or silently dropping context.
 */
export function interpolate(template: string, vars?: Readonly<Record<string, string | number>>): string {
	if (!vars) return template;
	return template.replace(PLACEHOLDER, (match, name: string) => {
		const value = vars[name];
		return value === undefined ? match : String(value);
	});
}

/** Resolve `key` in `locale`, falling back to en-US and then to the key itself. */
export function translate(
	locale: LocaleId,
	key: TranslationKey,
	vars?: Readonly<Record<string, string | number>>,
): string {
	const text = TABLES[locale][key] ?? EN_US[key] ?? key;
	return interpolate(text, vars);
}

/** Resolve `key` in the active interface language. */
export function t(key: TranslationKey, vars?: Readonly<Record<string, string | number>>): string {
	return translate(getLocale(), key, vars);
}
