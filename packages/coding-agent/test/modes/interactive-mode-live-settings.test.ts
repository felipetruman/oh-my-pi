import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "bun:test";
import * as path from "node:path";
import type { AssistantMessage } from "@oh-my-pi/pi-ai";
import { createAssistantMessageComponent } from "@oh-my-pi/pi-tui/prompt/interactive-context-helpers";
import { Agent } from "@oh-my-pi/pi-agent-core";
import { ModelRegistry } from "@oh-my-pi/pi-coding-agent/config/model-registry";
import { resetSettingsForTest, Settings } from "@oh-my-pi/pi-coding-agent/config/settings";
import { getLocale, resetLocaleForTest, t } from "@oh-my-pi/pi-coding-agent/i18n";
import { InteractiveMode } from "@oh-my-pi/pi-coding-agent/modes/interactive-mode";
import { AgentSession } from "@oh-my-pi/pi-coding-agent/session/agent-session";
import { AuthStorage } from "@oh-my-pi/pi-coding-agent/session/auth-storage";
import { SessionManager } from "@oh-my-pi/pi-coding-agent/session/session-manager";
import * as theme from "@oh-my-pi/pi-tui/theme";
import { TempDir } from "@oh-my-pi/pi-utils";

import {
	cfgDisplayLocale,
	cfgDisplayTranslateThinking,
	cfgStatusLineContextLine,
	cfgStatusLineLeftSegments,
	cfgSymbolPreset,
} from "@oh-my-pi/pi-coding-agent/modes/settings";
import { cfgHideThinkingBlock } from "@oh-my-pi/pi-coding-agent/session/settings";

const ORIGINAL = "Consider the original reasoning before answering.";
const TRANSLATED = "Considere o raciocínio original antes de responder.";
function thinkingMessage(
	content: AssistantMessage["content"] = [{ type: "thinking", thinking: ORIGINAL }],
): AssistantMessage {
	return {
		role: "assistant",
		content,
		api: "anthropic-messages",
		provider: "anthropic",
		model: "teste",
		usage: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			totalTokens: 0,
			cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
		},
		stopReason: "stop",
		timestamp: 0,
	};
}

describe("InteractiveMode live settings", () => {
	let tempDir: TempDir;
	let authStorage: AuthStorage;
	let session: AgentSession;
	let mode: InteractiveMode;
	let reportGlyphProtocol: (supported: boolean) => void;

	beforeAll(async () => {
		await theme.initTheme();
	});

	beforeEach(async () => {
		resetSettingsForTest();
		resetLocaleForTest();
		tempDir = TempDir.createSync("@pi-live-ui-settings-");
		const settings = await Settings.init({
			inMemory: true,
			cwd: tempDir.path(),
			overrides: { "startup.quiet": true, "statusLine.preset": "custom" },
		});
		authStorage = await AuthStorage.create(path.join(tempDir.path(), "testauth.db"));
		const modelRegistry = new ModelRegistry(authStorage);
		const model = modelRegistry.find("anthropic", "claude-sonnet-4-5");
		if (!model) throw new Error("Expected claude-sonnet-4-5 to exist in registry");
		session = new AgentSession({
			agent: new Agent({ initialState: { model, systemPrompt: ["Test"], tools: [], messages: [] } }),
			sessionManager: SessionManager.create(tempDir.path(), tempDir.path()),
			settings,
			modelRegistry,
		});
		mode = new InteractiveMode(session, "test");
		vi.spyOn(mode.ui.terminal, "onGlyphProtocolReport").mockImplementation(callback => {
			reportGlyphProtocol = callback;
		});
		await mode.init({ suppressWelcomeIntro: true });
	});

	afterEach(async () => {
		mode?.stop();
		await session?.dispose();
		authStorage?.close();
		tempDir?.removeSync();
		resetSettingsForTest();
		await theme.setSymbolPreset("unicode");
		vi.restoreAllMocks();
	});

	it("applies status-line and thinking-visibility changes made outside the settings panel", async () => {
		cfgStatusLineLeftSegments.set(session.settings, ["time", "model"]);
		cfgStatusLineContextLine.set(session.settings, "off");
		cfgHideThinkingBlock.set(session.settings, true);
		await Promise.resolve();

		const effective = mode.statusLine.getEffectiveSettingsForTest();
		expect(effective.leftSegments).toEqual(["time", "model"]);
		expect(effective.contextLine).toBe("off");
		expect(mode.hideThinkingBlock).toBe(true);
	});

	it("repaints locale changes and cancels display translations without changing session messages", async () => {
		const messages = structuredClone(session.agent.state.messages);
		const translator = mode.thinkingTranslator;
		const clear = vi.spyOn(translator, "clear");
		const rebuild = vi.spyOn(mode, "rebuildChatFromMessages");
		const resetDisplay = vi.spyOn(mode.ui, "resetDisplay");

		cfgDisplayLocale.set(session.settings, "pt-BR");
		await Promise.resolve();
		expect(getLocale()).toBe("pt-BR");
		expect(clear).toHaveBeenCalledTimes(1);
		expect(rebuild).toHaveBeenCalledTimes(1);
		expect(resetDisplay).toHaveBeenCalled();

		cfgDisplayTranslateThinking.set(session.settings, true);
		await Promise.resolve();
		expect(clear).toHaveBeenCalledTimes(2);
		expect(getLocale()).toBe("pt-BR");
		expect(session.agent.state.messages).toEqual(messages);
	});

	it("clears pending translations through live locale changes without translating streaming content", async () => {
		cfgDisplayLocale.set(session.settings, "pt-BR");
		cfgDisplayTranslateThinking.set(session.settings, true);
		cfgHideThinkingBlock.set(session.settings, false);
		await Promise.resolve();
		let resolve!: (text: string) => void;
		const promise = new Promise<string>(done => {
			resolve = done;
		});
		const executor = vi.spyOn(session, "translateThinkingForDisplay").mockReturnValue(promise);
		const source = thinkingMessage();
		mode.noteDisplayableThinkingContent(source);
		const original = structuredClone(source);
		const pending = createAssistantMessageComponent(mode, source);
		const streaming = createAssistantMessageComponent(mode);
		streaming.updateContent(source, { transient: true });
		mode.streamingComponent = streaming;
		mode.streamingMessage = source;
		mode.chatContainer.addChild(pending);
		mode.chatContainer.addChild(streaming);
		session.agent.state.isStreaming = true;
		const resetScrollback = vi.spyOn(mode.chatContainer, "resetStableEmission");
		await Promise.resolve();

		cfgDisplayLocale.set(session.settings, "en-US");
		await Promise.resolve();
		expect(streaming.render(120).join("\n")).toContain(ORIGINAL);
		expect(mode.thinkingTranslator.get(ORIGINAL, "pt-BR")).toBeUndefined();
		cfgDisplayLocale.set(session.settings, "pt-BR");
		cfgDisplayTranslateThinking.set(session.settings, false);
		await Promise.resolve();
		expect(streaming.render(120).join("\n")).toContain(ORIGINAL);
		resolve(TRANSLATED);
		await promise;
		expect(streaming.render(120).join("\n")).not.toContain(TRANSLATED);
		cfgDisplayTranslateThinking.set(session.settings, true);
		await Promise.resolve();
		expect(streaming.render(120).join("\n")).toContain(t("hud.thinking.translationPending"));
		expect(executor).toHaveBeenCalledTimes(1);
		expect(mode.chatContainer.children).toContain(streaming);
		expect(resetScrollback).toHaveBeenCalled();
		expect(source).toEqual(original);
		session.agent.state.isStreaming = false;
	});

	it("clears settled translations during streaming when live settings toggle translation", async () => {
		cfgDisplayLocale.set(session.settings, "pt-BR");
		cfgDisplayTranslateThinking.set(session.settings, true);
		cfgHideThinkingBlock.set(session.settings, false);
		await Promise.resolve();
		const executor = vi.spyOn(session, "translateThinkingForDisplay").mockResolvedValue(null);
		const source = thinkingMessage([
			{ type: "thinking", thinking: ORIGINAL },
			{ type: "text", text: "Resposta" },
		]);
		mode.noteDisplayableThinkingContent(source);
		const original = structuredClone(source);
		const target = createAssistantMessageComponent(mode);
		target.updateContent(source, { transient: true });
		mode.streamingComponent = target;
		mode.streamingMessage = source;
		mode.chatContainer.addChild(target);
		session.agent.state.isStreaming = true;
		await Bun.sleep(0);
		expect(executor).toHaveBeenCalledTimes(1);

		cfgDisplayTranslateThinking.set(session.settings, false);
		await Promise.resolve();
		cfgDisplayTranslateThinking.set(session.settings, true);
		await Promise.resolve();
		target.render(120);
		await Bun.sleep(0);
		expect(executor).toHaveBeenCalledTimes(2);
		expect(target.render(120).join("\n")).toContain(t("hud.thinking.translationFailed"));
		expect(mode.chatContainer.children).toContain(target);
		expect(source).toEqual(original);
		session.agent.state.isStreaming = false;
	});

	it("keeps an explicitly configured unicode status bar after Glyph Protocol confirmation", async () => {
		cfgSymbolPreset.set(session.settings, "unicode");
		await theme.setSymbolPreset("unicode");
		reportGlyphProtocol(true);
		expect(theme.getSymbolPresetOverride()).toBe("unicode");
		expect(theme.theme.getSymbolPreset()).toBe("unicode");
	});

	it("upgrades an unconfigured unicode status bar after Glyph Protocol confirmation", async () => {
		await theme.setSymbolPreset("unicode");
		reportGlyphProtocol(true);
		expect(theme.getSymbolPresetOverride()).toBe("nerd");
	});
});
