import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { resetSettingsForTest, Settings } from "@oh-my-pi/pi-coding-agent/config/settings";
import {
	getEnumValues,
	getPathsForTab,
	getUi,
	SETTING_TABS,
	TAB_METADATA,
} from "@oh-my-pi/pi-coding-agent/config/settings-schema";
import {
	DEFAULT_LOCALE,
	EN_US,
	getLocale,
	interpolate,
	isLocaleId,
	onLocaleChange,
	PT_BR,
	resetLocaleForTest,
	setLocale,
	SUPPORTED_LOCALES,
	t,
	translate,
} from "@oh-my-pi/pi-coding-agent/i18n";
import {
	localizedGroupLabel,
	localizedOptionText,
	localizedSettingText,
	localizedTabLabel,
} from "@oh-my-pi/pi-coding-agent/i18n/settings-metadata";
import { getSettingsForTab } from "@oh-my-pi/pi-coding-agent/modes/components/settings-defs";
import { getProjectAgentDir, TempDir } from "@oh-my-pi/pi-utils";
import { YAML } from "bun";
import { beginSettingsTest, restoreSettingsTestState, type SettingsTestState } from "./helpers/settings-test-state";

/** Snapshot every rendered string the settings panel derives for a tab. */
function renderedTab(tab: (typeof SETTING_TABS)[number]): string[] {
	const rows: string[] = [localizedTabLabel(tab)];
	for (const def of getSettingsForTab(tab)) {
		rows.push(`${def.path}|${def.label}|${def.description}|${def.warning ?? ""}`);
		if (def.group) rows.push(`group:${localizedGroupLabel(tab, def.group)}`);
		if (def.type === "submenu" || def.type === "multiselect") {
			for (const option of def.options) rows.push(`opt:${option.value}|${option.label}|${option.description ?? ""}`);
		}
	}
	return rows;
}

describe("i18n", () => {
	afterEach(() => {
		resetLocaleForTest();
	});

	describe("lookup", () => {
		it("returns the canonical English text for an en-US key", () => {
			expect(translate("en-US", "settings.title")).toBe("Settings");
			expect(translate("en-US", "common.cancel")).toBe("Cancel");
		});

		it("returns translated text for a key pt-BR defines", () => {
			expect(translate("pt-BR", "settings.title")).toBe("Configurações");
			expect(translate("pt-BR", "common.cancel")).toBe("Cancelar");
		});

		it("resolves every key in every language, falling back to English where pt-BR is silent", () => {
			const keys = Object.keys(EN_US) as (keyof typeof EN_US)[];
			expect(keys.length).toBeGreaterThan(0);
			for (const key of keys) {
				for (const locale of SUPPORTED_LOCALES) {
					const rendered = translate(locale, key);
					// A gap must degrade to English, never to a marker or the raw key.
					expect(rendered).not.toBe(key);
					expect(rendered.length).toBeGreaterThan(0);
				}
				if (!(key in PT_BR)) expect(translate("pt-BR", key)).toBe(EN_US[key]);
			}
		});

		it("returns the key itself rather than undefined for an unknown key", () => {
			// Cast models a stale key surviving a refactor; the renderer must not print "undefined".
			const stale = "settings.removedKey" as keyof typeof EN_US;
			expect(translate("pt-BR", stale)).toBe("settings.removedKey");
		});
	});

	describe("interpolation", () => {
		it("substitutes named placeholders in both languages", () => {
			expect(translate("en-US", "settings.search.matchCountOther", { count: 7 })).toBe("7 matches");
			expect(translate("pt-BR", "settings.search.matchCountOther", { count: 7 })).toBe("7 resultados");
		});

		it("leaves a placeholder verbatim when its variable is absent", () => {
			expect(interpolate("waiting on {count} jobs", {})).toBe("waiting on {count} jobs");
			expect(interpolate("waiting on {count} jobs", { other: 1 })).toBe("waiting on {count} jobs");
		});

		it("substitutes a placeholder that repeats", () => {
			expect(interpolate("{n} of {n}", { n: 3 })).toBe("3 of 3");
		});
	});

	describe("locale selection", () => {
		it("starts at en-US", () => {
			expect(DEFAULT_LOCALE).toBe("en-US");
			expect(getLocale()).toBe("en-US");
		});

		it("resolves an unsupported value to en-US instead of throwing", () => {
			setLocale("pt-BR");
			expect(getLocale()).toBe("pt-BR");

			setLocale("klingon");
			expect(getLocale()).toBe("en-US");
			setLocale(undefined);
			expect(getLocale()).toBe("en-US");
			expect(isLocaleId("klingon")).toBe(false);
			expect(isLocaleId("pt-BR")).toBe(true);
		});

		it("notifies subscribers only on an actual change", () => {
			const seen: string[] = [];
			const unsubscribe = onLocaleChange(locale => seen.push(locale));
			setLocale("pt-BR");
			setLocale("pt-BR");
			setLocale("en-US");
			unsubscribe();
			setLocale("pt-BR");
			expect(seen).toEqual(["pt-BR", "en-US"]);
		});
	});

	describe("settings panel", () => {
		it("renders tab and section names in the active language", () => {
			setLocale("en-US");
			expect(localizedTabLabel("appearance")).toBe("Appearance");
			expect(localizedGroupLabel("appearance", "Display")).toBe("Display");

			setLocale("pt-BR");
			expect(localizedTabLabel("appearance")).toBe("Aparência");
			expect(localizedGroupLabel("appearance", "Display")).not.toBe("");
		});

		it("localizes the panel's own chrome, including the dynamic match count", () => {
			setLocale("pt-BR");
			expect(t("settings.hints.navTabs")).toBe("Tab para trocar de aba");
			expect(t("settings.hints.footer", { nav: t("settings.hints.navTabs") })).toContain("Tab para trocar de aba");
			expect(t("settings.search.matchCountOther", { count: 2 })).toBe("2 resultados");
			expect(t("settings.multiselect.hintToggle")).toContain("Esc para voltar");
		});

		it("keeps English output identical to the schema when en-US is selected", () => {
			setLocale("en-US");
			for (const tab of SETTING_TABS) {
				expect(localizedTabLabel(tab)).toBe(TAB_METADATA[tab].label);
				for (const path of getPathsForTab(tab)) {
					const ui = getUi(path);
					if (!ui) continue;
					expect(localizedSettingText(path, "label", ui.label)).toBe(ui.label);
					expect(localizedSettingText(path, "description", ui.description)).toBe(ui.description);
					if (ui.group) expect(localizedGroupLabel(tab, ui.group)).toBe(ui.group);
					if (Array.isArray(ui.options)) {
						for (const option of ui.options) {
							expect(localizedOptionText(path, option.value, "label", option.label)).toBe(option.label);
						}
					}
				}
			}
		});

		it("rebuilds cached definitions when the language changes", () => {
			setLocale("en-US");
			const english = renderedTab("appearance");
			setLocale("pt-BR");
			const portuguese = renderedTab("appearance");
			setLocale("en-US");
			const englishAgain = renderedTab("appearance");

			expect(englishAgain).toEqual(english);
			// The panel must actually repaint in the new language rather than
			// serving the definitions it cached for the previous one.
			expect(portuguese).not.toEqual(english);
		});
	});

	describe("presentation boundary", () => {
		it("keeps setting paths, tab ids and option values identical across languages", () => {
			setLocale("en-US");
			const englishIds = SETTING_TABS.flatMap(tab =>
				getSettingsForTab(tab).map(def => {
					const values =
						def.type === "submenu" || def.type === "multiselect"
							? def.options.map(option => option.value).join(",")
							: "";
					return `${def.tab}|${def.path}|${def.type}|${values}`;
				}),
			);

			setLocale("pt-BR");
			const portugueseIds = SETTING_TABS.flatMap(tab =>
				getSettingsForTab(tab).map(def => {
					const values =
						def.type === "submenu" || def.type === "multiselect"
							? def.options.map(option => option.value).join(",")
							: "";
					return `${def.tab}|${def.path}|${def.type}|${values}`;
				}),
			);

			expect(portugueseIds).toEqual(englishIds);
		});

		it("never translates the language names themselves", () => {
			for (const locale of SUPPORTED_LOCALES) {
				setLocale(locale);
				expect(localizedOptionText("display.locale", "en-US", "label", "English")).toBe("English");
				expect(localizedOptionText("display.locale", "pt-BR", "label", "Português (Brasil)")).toBe(
					"Português (Brasil)",
				);
			}
		});

		it("offers only the languages that have a shipped translation", () => {
			// The panel must not advertise a language whose translation has not
			// landed: the enum reserves the id, `ui.options` gates the offer.
			const def = getSettingsForTab("appearance").find(entry => entry.path === "display.locale");
			const offered = def?.type === "submenu" ? def.options.map(option => option.value) : [];
			expect(offered).toEqual(["en-US"]);

			// pt-BR stays resolvable and storable even while unoffered, so the
			// translation can be built and tested against this same runtime.
			expect(getEnumValues("display.locale")).toEqual(["en-US", "pt-BR"]);
			expect(SUPPORTED_LOCALES).toContain("pt-BR");
			setLocale("pt-BR");
			expect(getLocale()).toBe("pt-BR");
			expect(localizedTabLabel("appearance")).toBe("Aparência");
		});
	});
});

describe("display.locale persistence", () => {
	let settingsState: SettingsTestState | undefined;
	let tempDir: TempDir;
	let agentDir: string;
	let projectDir: string;

	beforeEach(() => {
		settingsState = beginSettingsTest();
		tempDir = TempDir.createSync("@pi-i18n-test-");
		agentDir = tempDir.join("agent");
		projectDir = tempDir.join("project");
		fs.mkdirSync(agentDir, { recursive: true });
		fs.mkdirSync(getProjectAgentDir(projectDir), { recursive: true });
	});

	afterEach(async () => {
		resetLocaleForTest();
		restoreSettingsTestState(settingsState);
		resetSettingsForTest();
		await tempDir?.remove();
	});

	it("defaults to en-US and round-trips the machine id through the config file", async () => {
		const settings = await Settings.init({ cwd: projectDir, agentDir });
		expect(settings.get("display.locale")).toBe("en-US");

		settings.set("display.locale", "pt-BR");
		await settings.flush();

		const saved = YAML.parse(await Bun.file(path.join(agentDir, "config.yml")).text()) as {
			display?: { locale?: string };
		};
		// The stored value is the machine id, never the translated display name.
		expect(saved.display?.locale).toBe("pt-BR");

		resetSettingsForTest();
		const reloaded = await Settings.init({ cwd: projectDir, agentDir });
		expect(reloaded.get("display.locale")).toBe("pt-BR");
	});
});
