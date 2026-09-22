import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { resetSettingsForTest, Settings, settings } from "@oh-my-pi/pi-coding-agent/config/settings";
import { SETTING_TABS } from "@oh-my-pi/pi-coding-agent/config/settings-schema";
import {
	EN_US,
	getLocale,
	PT_BR,
	resetLocaleForTest,
	setLocale,
	t,
	translate,
} from "@oh-my-pi/pi-coding-agent/i18n";
import { SettingsSelectorComponent } from "@oh-my-pi/pi-coding-agent/modes/components/settings-selector";
import { initTheme } from "@oh-my-pi/pi-coding-agent/modes/theme/theme";
import { getProjectAgentDir, TempDir } from "@oh-my-pi/pi-utils";
import { YAML } from "bun";
import { beginSettingsTest, restoreSettingsTestState, type SettingsTestState } from "./helpers/settings-test-state";

describe("settings localization & display formatting", () => {
	let settingsState: SettingsTestState | undefined;
	let tempDir: TempDir;
	let agentDir: string;
	let projectDir: string;

	beforeEach(async () => {
		await initTheme();
		settingsState = beginSettingsTest();
		tempDir = TempDir.createSync("@pi-i18n-display-test-");
		agentDir = tempDir.join("agent");
		projectDir = tempDir.join("project");
		fs.mkdirSync(agentDir, { recursive: true });
		fs.mkdirSync(getProjectAgentDir(projectDir), { recursive: true });
		await Settings.init({ cwd: projectDir, agentDir });
	});

	afterEach(async () => {
		resetLocaleForTest();
		restoreSettingsTestState(settingsState);
		resetSettingsForTest();
		await tempDir?.remove();
	});

	it("1. renders boolean true in pt-BR as 'Ativado'", () => {
		setLocale("pt-BR");
		settings.set("colorBlindMode", true);

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{ onChange: () => {}, onCancel: () => {} },
		);

		const rendered = Bun.stripANSI(selector.render(120).join("\n"));
		const line = rendered.split("\n").find(l => l.includes("Modo Daltônico"));
		expect(line).toBeDefined();
		expect(line).toContain("Ativado");
		expect(line).not.toContain("true");
	});

	it("2. renders boolean false in pt-BR as 'Desativado'", () => {
		setLocale("pt-BR");
		settings.set("colorBlindMode", false);

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{ onChange: () => {}, onCancel: () => {} },
		);

		const rendered = Bun.stripANSI(selector.render(120).join("\n"));
		const line = rendered.split("\n").find(l => l.includes("Modo Daltônico"));
		expect(line).toBeDefined();
		expect(line).toContain("Desativado");
		expect(line).not.toContain("false");
	});

	it("3. preserves native boolean type for raw boolean values in store and events", () => {
		setLocale("pt-BR");
		const changes: Array<{ path: string; val: unknown }> = [];

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{
				onChange: (path, val) => changes.push({ path, val }),
				onCancel: () => {},
			},
		);

		// Navigate to Color-Blind Mode (4th setting in Theme section)
		selector.handleInput("\x1b[B");
		selector.handleInput("\x1b[B");
		selector.handleInput("\x1b[B");

		// Toggle with space
		selector.handleInput(" ");
		expect(settings.get("colorBlindMode")).toBe(true);
		expect(typeof settings.get("colorBlindMode")).toBe("boolean");
		expect(changes).toEqual([{ path: "colorBlindMode", val: true }]);

		// Toggle back
		selector.handleInput(" ");
		expect(settings.get("colorBlindMode")).toBe(false);
		expect(typeof settings.get("colorBlindMode")).toBe("boolean");
		expect(changes[1]).toEqual({ path: "colorBlindMode", val: false });
	});

	it("4. localizes enum display without modifying the raw internal value", () => {
		setLocale("pt-BR");
		const changes: Array<{ path: string; val: unknown }> = [];

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{
				onChange: (path, val) => changes.push({ path, val }),
				onCancel: () => {},
			},
		);

		// Switch to interaction tab where steeringMode is first item
		selector.handleInput("\x1b[C"); // Model
		selector.handleInput("\x1b[C"); // Interaction

		expect(settings.get("steeringMode")).toBe("one-at-a-time");

		// Cycle with space
		selector.handleInput(" ");
		expect(settings.get("steeringMode")).toBe("all");
		expect(typeof settings.get("steeringMode")).toBe("string");
		expect(changes).toEqual([{ path: "steeringMode", val: "all" }]);

		// Cycle back
		selector.handleInput(" ");
		expect(settings.get("steeringMode")).toBe("one-at-a-time");
		expect(typeof settings.get("steeringMode")).toBe("string");
		expect(changes[1]).toEqual({ path: "steeringMode", val: "one-at-a-time" });
	});

	it("5. preserves expected behavior and true/false text in en-US locale", () => {
		setLocale("en-US");
		settings.set("colorBlindMode", false);

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{ onChange: () => {}, onCancel: () => {} },
		);

		const rendered = Bun.stripANSI(selector.render(120).join("\n"));
		const line = rendered.split("\n").find(l => l.includes("Color-Blind Mode"));
		expect(line).toBeDefined();
		expect(line).toContain("false");
		expect(line).not.toContain("Disabled");
		expect(line).not.toContain("Desativado");
	});

	it("6. guarantees 100% key parity between EN_US and PT_BR translation tables", () => {
		const enKeys = Object.keys(EN_US).sort();
		const ptKeys = Object.keys(PT_BR).sort();
		expect(ptKeys).toEqual(enKeys);
	});

	it("7. safely falls back to English when an unsupported locale is requested", () => {
		setLocale("unsupported-lang" as never);
		expect(getLocale()).toBe("en-US");
		expect(t("settings.boolean.true")).toBe("true");
		expect(t("settings.boolean.false")).toBe("false");
	});

	it("8. formats submenus with localized labels on the outer list row", () => {
		setLocale("pt-BR");
		settings.set("statusLine.preset", "default");

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{ onChange: () => {}, onCancel: () => {} },
		);

		const rendered = Bun.stripANSI(selector.render(120).join("\n"));
		const line = rendered.split("\n").find(l => l.includes("Preset da Barra de Status"));
		expect(line).toBeDefined();
		expect(line).toContain("Padrão");
		expect(line).not.toContain("default");
	});

	it("9. renders clean layout without line overflow across standard dimensions", () => {
		setLocale("pt-BR");

		const selector = new SettingsSelectorComponent(
			{ availableThinkingLevels: [], availableThemes: ["dark"], providers: [], cwd: process.cwd() },
			{ onChange: () => {}, onCancel: () => {} },
		);

		for (const [w, h] of [
			[100, 30],
			[120, 40],
			[140, 40],
			[160, 50],
		]) {
			const lines = selector.render(w);
			for (const line of lines) {
				const visualW = Bun.stringWidth(line);
				expect(visualW).toBeLessThanOrEqual(w);
			}
		}
	});

	it("10. never writes translated labels into the persisted config file", async () => {
		setLocale("pt-BR");
		settings.set("colorBlindMode", true);
		settings.set("statusLine.preset", "default");
		await settings.flush();

		const configText = await Bun.file(path.join(agentDir, "config.yml")).text();
		const saved = YAML.parse(configText);
		expect(saved && typeof saved === "object").toBe(true);
		const config = saved as Record<string, unknown>;
		expect(config.colorBlindMode).toBe(true);
		expect(config.colorBlindMode).not.toBe("Ativado");
		const statusLine = config.statusLine as Record<string, unknown> | undefined;
		expect(statusLine?.preset).toBe("default");
		expect(statusLine?.preset).not.toBe("Padrão");
	});
});
