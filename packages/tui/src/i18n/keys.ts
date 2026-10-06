import { EN_US } from "./locales/en-US";

/**
 * Every key the interface may look up. Derived from the en-US table, which is
 * the canonical source: a key that does not exist in English does not exist.
 */
export type TranslationKey = keyof typeof EN_US;

/** Shape of a non-canonical language table. Translation is incremental, so every key is optional. */
export type TranslationTable = Partial<Record<TranslationKey, string>>;
