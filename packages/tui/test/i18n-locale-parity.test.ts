import { describe, expect, it } from "bun:test";
import { EN_US } from "../src/i18n/locales/en-US";
import { PT_BR } from "../src/i18n/locales/pt-BR";

const placeholders = (text: string): string[] => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();

describe("pt-BR locale parity with en-US", () => {
	it("has no key that en-US lacks", () => {
		const extra = Object.keys(PT_BR).filter(key => !(key in EN_US));
		expect(extra).toEqual([]);
	});

	it("translates every en-US key", () => {
		const missing = Object.keys(EN_US).filter(key => !(key in PT_BR));
		expect(missing).toEqual([]);
	});

	it("keeps the same {placeholders} as en-US in every translated string", () => {
		const mismatched = Object.entries(PT_BR)
			.filter(([key, text]) => text !== undefined && key in EN_US)
			.filter(([key, text]) => {
				const english = (EN_US as Record<string, string>)[key];
				return placeholders(english).join() !== placeholders(text as string).join();
			})
			.map(([key]) => key);
		expect(mismatched).toEqual([]);
	});
});
