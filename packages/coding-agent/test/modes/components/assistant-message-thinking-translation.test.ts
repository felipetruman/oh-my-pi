import { createAgentHubRuntime } from "@oh-my-pi/pi-coding-agent/modes/agent-hub-runtime";
import { cfgDisplayTranslateThinking, cfgDisplaySmoothStreaming } from "@oh-my-pi/pi-coding-agent/modes/settings";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "bun:test";
import type { AssistantMessage } from "@oh-my-pi/pi-ai";
import { Settings } from "@oh-my-pi/pi-coding-agent/config/settings";
import { getLocale, setLocale, t } from "@oh-my-pi/pi-coding-agent/i18n";
import { IrcBus } from "@oh-my-pi/pi-coding-agent/irc/bus";
import { AgentHubOverlayComponent } from "@oh-my-pi/pi-tui/overlays/agent-hub";
import { AssistantMessageComponent } from "@oh-my-pi/pi-tui/chat/assistant-message";
import { ChatTranscriptBuilder } from "@oh-my-pi/pi-tui/chat/chat-transcript-builder";
import { TranscriptContainer } from "@oh-my-pi/pi-tui/chrome/transcript-container";
import { EventController } from "@oh-my-pi/pi-coding-agent/modes/controllers/event-controller";
import { InputController } from "@oh-my-pi/pi-coding-agent/modes/controllers/input-controller";
import { StreamingRevealController } from "@oh-my-pi/pi-coding-agent/modes/controllers/streaming-reveal";
import { SessionObserverRegistry } from "@oh-my-pi/pi-tui/overlays/session-observer-registry";
import { initTheme } from "@oh-my-pi/pi-tui/theme/theme";
import { createAssistantMessageComponent } from "@oh-my-pi/pi-tui/prompt/interactive-context-helpers";
import { UiHelpers } from "@oh-my-pi/pi-coding-agent/modes/utils/ui-helpers";
import { AgentRegistry } from "@oh-my-pi/pi-coding-agent/registry/agent-registry";
import type { AgentSessionEvent } from "@oh-my-pi/pi-coding-agent/session/agent-session";
import type { SessionMessageEntry } from "@oh-my-pi/pi-coding-agent/session/session-entries";
import { ThinkingDisplayTranslator } from "@oh-my-pi/pi-coding-agent/utils/thinking-translation";
import { type Component, Text, TUI } from "@oh-my-pi/pi-tui";
import { VirtualTerminal } from "../../../../tui/test/virtual-terminal";
import { createInteractiveModeContext } from "../../helpers/interactive-mode-context";
import { beginSettingsTest, restoreSettingsTestState, type SettingsTestState } from "../../helpers/settings-test-state";

const ORIGINAL = "Consider the original reasoning before answering.";
const TRANSLATED = "Considere o raciocínio original antes de responder.";
let settingsState: SettingsTestState | undefined;
let previousLocale = getLocale();
const disposables: Array<{ dispose(): void }> = [];

function message(content: AssistantMessage["content"] = [{ type: "thinking", thinking: ORIGINAL }]): AssistantMessage {
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

function deferredTranslation() {
	const pending = Promise.withResolvers<string>();
	const executor = vi.fn((_text: string, _locale: string, _signal: AbortSignal) => pending.promise);
	const translator = new ThinkingDisplayTranslator(executor);
	return { ...pending, executor, translator };
}

function component(
	translator: ThinkingDisplayTranslator | undefined,
	initial?: AssistantMessage,
	hidden = false,
	requestRender = vi.fn(),
): AssistantMessageComponent {
	const result = new AssistantMessageComponent(
		initial,
		hidden,
		requestRender,
		[],
		undefined,
		true,
		undefined,
		false,
		translator,
	);
	disposables.push(result);
	return result;
}

function render(target: Component): string {
	return Bun.stripANSI(target.render(100).join("\n"));
}

function entry(source: AssistantMessage): SessionMessageEntry {
	return { type: "message", id: "a1", parentId: null, timestamp: "2026-01-01T00:00:00.000Z", message: source };
}

beforeAll(async () => {
	await initTheme(false);
});

beforeEach(async () => {
	previousLocale = getLocale();
	settingsState = beginSettingsTest();
	await Settings.init({ inMemory: true });
	cfgDisplayTranslateThinking.override(Settings.instance, true);
	setLocale("pt-BR");
});

afterEach(() => {
	for (const disposable of disposables.splice(0)) disposable.dispose();
	vi.useRealTimers();
	restoreSettingsTestState(settingsState);
	settingsState = undefined;
	setLocale(previousLocale);
});

describe("projeção visual do raciocínio traduzido", () => {
	it("mostra placeholder desde thinking_start sem agendar inferência vazia", () => {
		const translation = deferredTranslation();
		const schedule = vi.spyOn(translation.translator, "schedule");
		const target = component(translation.translator);

		target.updateContent(message([{ type: "thinking", thinking: "" }]), { transient: true });

		expect(render(target)).toContain(t("hud.thinking.translationPending"));
		expect(schedule).not.toHaveBeenCalled();
		expect(translation.executor).not.toHaveBeenCalled();
	});
	it("mantém pending sem inglês, deduplica o job e redesenha a tradução sem alterar a mensagem", async () => {
		const translation = deferredTranslation();
		const requestRender = vi.fn();
		const source = message();
		const original = structuredClone(source);
		Object.freeze(source.content[0]);
		Object.freeze(source.content);
		Object.freeze(source);
		const target = component(translation.translator, source, false, requestRender);

		target.updateContent(source);
		expect(render(target)).toContain(t("hud.thinking.translationPending"));
		expect(render(target)).not.toContain(ORIGINAL);
		expect(target.isTranscriptBlockFinalized()).toBe(false);
		await Promise.resolve();
		expect(translation.executor).toHaveBeenCalledTimes(1);
		translation.resolve(TRANSLATED);
		await translation.promise;

		expect(requestRender).toHaveBeenCalledTimes(1);
		expect(render(target)).toContain(TRANSLATED);
		expect(render(target)).not.toContain(t("hud.thinking.translationPending"));
		expect(target.isTranscriptBlockFinalized()).toBe(true);
		expect(source).toEqual(original);
		expect(target.messagePersistenceKey()).toBe("assistant:0:anthropic:teste::stop");
		expect(render(target)).toBe(render(component(translation.translator, source)));
	});

	it("preserva o original em en-US mesmo com a opção ligada", () => {
		setLocale("en-US");
		const translation = deferredTranslation();
		const schedule = vi.spyOn(translation.translator, "schedule");

		expect(render(component(translation.translator, message()))).toContain(ORIGINAL);
		expect(schedule).not.toHaveBeenCalled();
	});

	it("preserva o original em pt-BR com a opção desligada", () => {
		cfgDisplayTranslateThinking.override(Settings.instance, false);
		const translation = deferredTranslation();
		const schedule = vi.spyOn(translation.translator, "schedule");

		expect(render(component(translation.translator, message()))).toContain(ORIGINAL);
		expect(schedule).not.toHaveBeenCalled();
	});

	it("corta blocos ocultos antes de solicitar tradução e reaplica Ctrl+T", async () => {
		const translation = deferredTranslation();
		const schedule = vi.spyOn(translation.translator, "schedule");
		const source = message([
			{ type: "thinking", thinking: ORIGINAL },
			{ type: "text", text: "Resposta pública" },
		]);
		const target = component(translation.translator, source, true);

		expect(render(target)).toContain("Resposta pública");
		expect(render(target)).not.toContain(ORIGINAL);
		expect(render(target)).not.toContain(t("hud.thinking.translationPending"));
		expect(schedule).not.toHaveBeenCalled();
		target.setHideThinkingBlock(false);
		await Promise.resolve();
		translation.resolve(TRANSLATED);
		await translation.promise;
		expect(render(target)).toContain(TRANSLATED);
		target.setHideThinkingBlock(true);
		expect(render(target)).not.toContain(TRANSLATED);
	});

	it("mostra Pensando no pulso oculto sem consultar o tradutor", async () => {
		const translation = deferredTranslation();
		const schedule = vi.spyOn(translation.translator, "schedule");
		const target = component(translation.translator, undefined, true);
		target.updateContent(message(), { transient: true });
		await Promise.resolve();

		expect(render(target)).toContain(t("hud.thinking.label"));
		expect(render(target)).not.toContain("Thinking");
		expect(render(target)).not.toContain(ORIGINAL);
		expect(schedule).not.toHaveBeenCalled();
		expect(translation.executor).not.toHaveBeenCalled();
	});

	it("formata proseOnly antes de traduzir sem reformatar a tradução retornada", async () => {
		const translation = deferredTranslation();
		const source = message([
			{ type: "thinking", thinking: "Consider this code.\n```ts\nconst privateCode = 42;\n```" },
		]);
		const target = component(translation.translator, source);
		await Promise.resolve();

		expect(translation.executor.mock.calls[0]?.[0]).toContain("Consider this code");
		expect(translation.executor.mock.calls[0]?.[0]).not.toContain("privateCode");
		translation.resolve("Texto traduzido.\n```\npreservar saída\n```");
		await translation.promise;
		expect(render(target)).toContain("preservar saída");
		expect(source.content[0]).toEqual({
			type: "thinking",
			thinking: "Consider this code.\n```ts\nconst privateCode = 42;\n```",
		});
	});

	it("mostra fallback em português ao falhar sem expor o original ou repetir inferência", async () => {
		const translation = deferredTranslation();
		const requestRender = vi.fn();
		const target = component(translation.translator, message(), false, requestRender);
		await Promise.resolve();
		translation.reject(new Error("falha de teste"));
		await translation.promise.catch(() => {});

		expect(render(target)).toContain(t("hud.thinking.translationFailed"));
		expect(render(target)).not.toContain(ORIGINAL);
		expect(requestRender).toHaveBeenCalledTimes(1);
		target.invalidate();
		expect(translation.executor).toHaveBeenCalledTimes(1);
		expect(target.isTranscriptBlockFinalized()).toBe(true);
	});

	it("mantém o fallback localizado quando não há tradutor disponível", () => {
		const target = component(undefined, message());
		expect(render(target)).toContain(t("hud.thinking.translationFailed"));
		expect(render(target)).not.toContain(ORIGINAL);
	});

	it("não revela deltas ingleses nem inicia inferência durante o smooth streaming", async () => {
		vi.useFakeTimers();
		const translation = deferredTranslation();
		const frames: string[] = [];
		const target = component(translation.translator);
		const controller = new StreamingRevealController({
			getSmoothStreaming: () => true,
			getHideThinkingBlock: () => false,
			getProseOnlyThinking: () => true,
			requestRender: () => frames.push(render(target)),
		});
		try {
			controller.begin(target, message(), false);
			frames.push(render(target));
			controller.setTarget(
				message([{ type: "thinking", thinking: `${ORIGINAL} Additional English reasoning.` }]),
				false,
			);
			vi.advanceTimersByTime(1500);
			await Promise.resolve();

			expect(frames.every(frame => frame.includes(t("hud.thinking.translationPending")))).toBe(true);
			expect(frames.some(frame => /Consider|Additional|English/.test(frame))).toBe(false);
			expect(translation.executor).not.toHaveBeenCalled();
			expect(target.getTranscriptStableRows()).toEqual([]);
		} finally {
			controller.stop();
		}
	});

	it("traduz thinking_end antes do próximo texto sem finalizar o transcript ou perder a fronteira no batching", async () => {
		vi.useFakeTimers();
		cfgDisplaySmoothStreaming.override(Settings.instance, true);
		const translation = deferredTranslation();
		let listener: ((event: AgentSessionEvent) => void) | undefined;
		const ctx = createInteractiveModeContext({
			thinkingTranslator: translation.translator,
			session: {
				isStreaming: true,
				subscribe: callback => {
					listener = callback;
					return () => {};
				},
			},
		});
		const controller = new EventController(ctx);
		disposables.push(controller);
		const source = message();
		Object.freeze(source.content[0]);
		Object.freeze(source.content);
		Object.freeze(source);
		const original = JSON.stringify(source);
		await controller.handleEvent({ type: "message_start", message: message([]) });
		const started = message([{ type: "thinking", thinking: "" }]);
		await controller.handleEvent({
			type: "message_update",
			message: started,
			assistantMessageEvent: { type: "thinking_start", contentIndex: 0, partial: started },
		});
		await controller.handleEvent({
			type: "message_update",
			message: source,
			assistantMessageEvent: { type: "thinking_delta", contentIndex: 0, delta: ORIGINAL, partial: source },
		});
		vi.advanceTimersByTime(40);
		const target = ctx.streamingComponent;
		if (!target) throw new Error("O evento inicial deve criar o componente");
		disposables.push(target);
		expect(render(target)).toContain(t("hud.thinking.translationPending"));
		expect(render(target)).not.toContain(ORIGINAL);
		expect(translation.executor).not.toHaveBeenCalled();

		controller.subscribeToAgent();
		if (!listener) throw new Error("O controller deve assinar os eventos da sessão");
		const boundary = listener({
			type: "message_update",
			message: source,
			assistantMessageEvent: { type: "thinking_end", contentIndex: 0, content: ORIGINAL, partial: source },
		});
		const textStarted = message([...source.content, { type: "text", text: "" }]);
		listener({
			type: "message_update",
			message: textStarted,
			assistantMessageEvent: { type: "text_start", contentIndex: 1, partial: textStarted },
		});
		await boundary;
		await Promise.resolve();
		expect(translation.executor).toHaveBeenCalledTimes(1);
		expect(target.isTranscriptBlockFinalized()).toBe(false);
		expect(target.getTranscriptStableRows()).toEqual([]);
		expect(ctx.chatContainer.peekFinalizedBatch(100, 1)).toBeUndefined();

		const textContinued = message([...source.content, { type: "text", text: "Texto público continua." }]);
		listener({
			type: "message_update",
			message: textContinued,
			assistantMessageEvent: {
				type: "text_delta",
				contentIndex: 1,
				delta: "Texto público continua.",
				partial: textContinued,
			},
		});
		vi.advanceTimersByTime(40);
		for (let i = 0; i < 12; i++) await Promise.resolve();
		vi.advanceTimersByTime(1500);
		expect(render(target)).toContain("Texto público continua.");
		expect(render(target)).toContain(t("hud.thinking.translationPending"));
		expect(render(target)).not.toContain(ORIGINAL);
		expect(translation.executor).toHaveBeenCalledTimes(1);
		expect(ctx.chatContainer.peekFinalizedBatch(100, 1)).toBeUndefined();

		translation.resolve(TRANSLATED);
		await translation.promise;
		expect(render(target)).toContain(TRANSLATED);
		expect(render(target)).toContain("Texto público continua.");
		expect(target.isTranscriptBlockFinalized()).toBe(false);
		expect(JSON.stringify(source)).toBe(original);
		expect(textContinued.content[0]).toEqual({ type: "thinking", thinking: ORIGINAL });
	});

	it("inicia a tradução pré-tool sem esperar message_end e nunca aposenta o placeholder", async () => {
		const translation = deferredTranslation();
		const target = component(translation.translator);
		const source = message([
			{ type: "thinking", thinking: `${ORIGINAL}\n\nAnother paragraph.` },
			{ type: "text", text: "Resposta pública" },
		]);
		const transcript = new TranscriptContainer();
		transcript.addChild(target);
		transcript.addChild(new Text("Ferramenta ainda executando…", 0, 0));
		target.updateContent(source, { transient: true });
		render(transcript);
		target.markTranscriptBlockFinalized();

		expect(target.getTranscriptStableRows()).toEqual([]);
		expect(target.isTranscriptBlockFinalized()).toBe(false);
		expect(transcript.peekFinalizedBatch(100, 1)).toBeUndefined();
		await Promise.resolve();
		expect(translation.executor).toHaveBeenCalledTimes(1);
		expect(render(target)).toContain(t("hud.thinking.translationPending"));
		expect(transcript.peekFinalizedBatch(100, 1)).toBeUndefined();
		translation.resolve(TRANSLATED);
		await translation.promise;

		const batch = transcript.peekFinalizedBatch(100, 1);
		expect(batch).toBeDefined();
		if (!batch) throw new Error("A tradução final deve poder ser aposentada");
		transcript.acknowledgeFinalizedBatch(batch.id);
		const rows = [...batch.rows, ...transcript.renderViewport(100, 10, { tick: 0, now: 0 })];
		const text = Bun.stripANSI(rows.join("\n"));
		expect(text.split(TRANSLATED)).toHaveLength(2);
		expect(text.split("Resposta pública")).toHaveLength(2);
		expect(text).not.toContain(ORIGINAL);
		expect(text).not.toContain(t("hud.thinking.translationPending"));
	});

	it("reutiliza tradução entre a fábrica live e histórico reconstruído", async () => {
		const translation = deferredTranslation();
		const source = message();
		const ctx = createInteractiveModeContext({ thinkingTranslator: translation.translator });
		const live = createAssistantMessageComponent(ctx, source);
		disposables.push(live);
		const requestRender = vi.fn();
		const builder = new ChatTranscriptBuilder({
			ui: new TUI(new VirtualTerminal(100, 24)),
			cwd: process.cwd(),
			thinkingTranslator: translation.translator,
			requestRender,
		});
		disposables.push(builder);
		builder.rebuild([entry(source)]);
		builder.rebuild([entry(source)]);
		await Promise.resolve();
		expect(translation.executor).toHaveBeenCalledTimes(1);
		translation.resolve(TRANSLATED);
		await translation.promise;

		expect(render(live)).toContain(TRANSLATED);
		expect(render(builder.container)).toContain(TRANSLATED);
		expect(requestRender).toHaveBeenCalledTimes(1);
		builder.rebuild([entry(source)]);
		expect(render(builder.container)).toContain(TRANSLATED);
		expect(translation.executor).toHaveBeenCalledTimes(1);
		expect(source.content[0]).toEqual({ type: "thinking", thinking: ORIGINAL });
	});

	it("traduz o replay de histórico e resume sem alterar a mensagem persistida", async () => {
		const translation = deferredTranslation();
		const source = message();
		const ctx = createInteractiveModeContext({ thinkingTranslator: translation.translator });
		const helpers = new UiHelpers(ctx);
		ctx.addMessageToChat = helpers.addMessageToChat.bind(helpers);
		const history = { messages: [source], models: {}, injectedTtsrRules: [], mode: "none" };

		await helpers.renderSessionContextIncrementally(history, {});
		expect(render(ctx.chatContainer)).toContain(t("hud.thinking.translationPending"));
		expect(render(ctx.chatContainer)).not.toContain(ORIGINAL);
		translation.resolve(TRANSLATED);
		await translation.promise;
		expect(render(ctx.chatContainer)).toContain(TRANSLATED);

		ctx.chatContainer.disposeChildren();
		helpers.renderSessionContext(history);
		expect(render(ctx.chatContainer)).toContain(TRANSLATED);
		expect(translation.executor).toHaveBeenCalledTimes(1);
		expect(source.content[0]).toEqual({ type: "thinking", thinking: ORIGINAL });
		ctx.chatContainer.disposeChildren();
	});

	it("compartilha o tradutor com o transcript de subagente aberto pelo Agent Hub", async () => {
		const translation = deferredTranslation();
		const live = component(translation.translator, message());
		const registry = new AgentRegistry();
		registry.register({
			id: "Main/filho",
			displayName: "filho",
			kind: "sub",
			parentId: "Main",
			session: null,
			status: "parked",
		});
		const ui = new TUI(new VirtualTerminal(100, 24));
		const showOverlay = vi.spyOn(ui, "showOverlay");
		const text = `${JSON.stringify(entry(message()))}\n`;
		const hub = new AgentHubOverlayComponent({
			...createAgentHubRuntime({ registry, irc: new IrcBus(registry) }),
			ui,
			registry,
			irc: new IrcBus(registry),
			observers: new SessionObserverRegistry(),
			hubKeys: [],
			onDone: () => {},
			requestRender: () => {},
			thinkingTranslator: translation.translator,
			remote: {
				chat: () => {},
				kill: () => {},
				revive: () => {},
				readTranscript: async (_id, fromByte) => ({ text: fromByte === 0 ? text : "", newSize: text.length }),
			},
		});
		disposables.push(hub);
		hub.openChat("Main/filho");
		await Promise.resolve();
		const viewer = showOverlay.mock.calls[0]?.[0];
		if (!viewer) throw new Error("O Agent Hub deve abrir o transcript do subagente");
		expect(render(viewer)).toContain(t("hud.thinking.translationPending"));
		translation.resolve(TRANSLATED);
		await translation.promise;

		expect(render(live)).toContain(TRANSLATED);
		expect(render(viewer)).toContain(TRANSLATED);
		expect(translation.executor).toHaveBeenCalledTimes(1);
	});

	it("Ctrl+T preserva o estado transitório em vez de traduzir o snapshot parcial", async () => {
		const translation = deferredTranslation();
		const source = message();
		const target = component(translation.translator, undefined, true);
		target.updateContent(source, { transient: true });
		const ctx = createInteractiveModeContext({
			hideThinkingBlock: true,
			hasDisplayableThinkingContent: true,
			thinkingTranslator: translation.translator,
			streamingComponent: target,
			streamingMessage: source,
			ui: { resetDisplay: vi.fn() },
		});
		ctx.chatContainer.addChild(target);
		new InputController(ctx).toggleThinkingBlockVisibility();
		await Promise.resolve();

		expect(render(target)).toContain(t("hud.thinking.translationPending"));
		expect(render(target)).not.toContain(ORIGINAL);
		expect(translation.executor).not.toHaveBeenCalled();
	});

	it("restaura thinking concluído antes de texto posterior mesmo sem replay de thinking_end", async () => {
		const translation = deferredTranslation();
		const source = message([
			{ type: "thinking", thinking: ORIGINAL },
			{ type: "text", text: "Resposta parcial" },
		]);
		const target = component(translation.translator);

		target.updateContent(source, { transient: true });
		await Promise.resolve();

		expect(translation.executor).toHaveBeenCalledTimes(1);
		translation.resolve(TRANSLATED);
		await translation.promise;
		expect(render(target)).toContain(TRANSLATED);
		expect(render(target)).not.toContain(t("hud.thinking.translationPending"));
	});

	it("mantém 129 resultados terminais no componente sem ciclo de re-tradução após evicção do LRU", async () => {
		const blocks: AssistantMessage["content"] = Array.from({ length: 129 }, (_, index) => ({
			type: "thinking" as const,
			thinking: `Thinking ${index}`,
		}));
		const source = message(blocks);
		const original = structuredClone(source);
		for (const block of source.content) Object.freeze(block);
		Object.freeze(source.content);
		Object.freeze(source);
		const overflow = Promise.withResolvers<string>();
		const executor = vi.fn((text: string) =>
			executor.mock.calls.length <= 129 ? Promise.resolve(`PT ${text}`) : overflow.promise,
		);
		const translator = new ThinkingDisplayTranslator(executor);

		try {
			const target = component(translator, source);
			await Bun.sleep(0);
			const output = render(target);

			expect(executor).toHaveBeenCalledTimes(129);
			expect(output).toContain("PT Thinking 0");
			expect(output).toContain("PT Thinking 128");
			expect(output).not.toContain(t("hud.thinking.translationPending"));
			expect(target.isTranscriptBlockFinalized()).toBe(true);
			expect(source).toEqual(original);
		} finally {
			translator.clear();
		}
	});
});
