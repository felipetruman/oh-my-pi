/** Visual-only translation service supplied by the host; original messages stay unchanged. */
export type ThinkingTranslationState =
	| { readonly status: "pending" }
	| { readonly status: "translated"; readonly text: string }
	| { readonly status: "failed" };
export interface ThinkingDisplayTranslator {
	get(text: string, locale: string): ThinkingTranslationState | undefined;
	schedule(text: string, locale: string, onSettled?: () => void): ThinkingTranslationState;
	unsubscribe(listener: () => void): void;
}
