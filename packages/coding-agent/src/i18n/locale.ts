import { logger } from "@oh-my-pi/pi-utils";

/** Interface languages omp can render. */
export type LocaleId = "en-US" | "pt-BR";

/** Canonical language. Also the fallback for any key a translation omits. */
export const DEFAULT_LOCALE: LocaleId = "en-US";

export const SUPPORTED_LOCALES: readonly LocaleId[] = ["en-US", "pt-BR"];

/**
 * Endonyms shown in the language picker. Deliberately identical in every
 * language: a reader looking for their own language recognizes its own name.
 */
export const LOCALE_LABELS: Record<LocaleId, string> = {
	"en-US": "English",
	"pt-BR": "Portugu\u00eas (Brasil)",
};

export function isLocaleId(value: unknown): value is LocaleId {
	return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Where the selected language comes from. Kept as an injected shape so this
 * module stays free of the settings graph: the welcome box and the composer
 * render before Settings exists, and importing it here would drag that whole
 * graph into the startup prepaint.
 */
export interface LocaleSource {
	/** Current stored value; anything unrecognized resolves to {@link DEFAULT_LOCALE}. */
	read(): string | undefined;
	/** Report later changes to the stored value. */
	subscribe(onChange: (next: string | undefined) => void): void;
}

let currentLocale: LocaleId = DEFAULT_LOCALE;
let sourceBound = false;
const localeListeners = new Set<(locale: LocaleId) => void>();

/** Observe language changes. Returns an unsubscribe function. */
export function onLocaleChange(listener: (locale: LocaleId) => void): () => void {
	localeListeners.add(listener);
	return () => {
		localeListeners.delete(listener);
	};
}

/**
 * Select the interface language. Anything that is not a supported id — including
 * `undefined` and values from an older or newer config — resolves to
 * {@link DEFAULT_LOCALE} rather than throwing, so a bad stored value can never
 * break rendering.
 */
export function setLocale(value: string | undefined): void {
	const next = isLocaleId(value) ? value : DEFAULT_LOCALE;
	if (next === currentLocale) return;
	currentLocale = next;
	for (const listener of Array.from(localeListeners)) {
		try {
			listener(next);
		} catch (error) {
			logger.warn("i18n: locale listener failed", { error: String(error) });
		}
	}
}

/** Adopt `source` as the authority for the selected language. Idempotent. */
export function bindLocaleSource(source: LocaleSource): void {
	if (sourceBound) return;
	sourceBound = true;
	setLocale(source.read());
	source.subscribe(setLocale);
}

/** The active interface language. */
export function getLocale(): LocaleId {
	return currentLocale;
}

/** Test seam: forget the selected language and the bound source. */
export function resetLocaleForTest(): void {
	currentLocale = DEFAULT_LOCALE;
	sourceBound = false;
}
