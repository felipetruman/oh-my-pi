import { cfgDisplayTranslateThinking } from "@oh-my-pi/pi-coding-agent/modes/settings";
import { cfgRetryModelFallback, cfgRetryFallbackChains } from "@oh-my-pi/pi-coding-agent/session/settings";
import { cfgModelRoles } from "@oh-my-pi/pi-coding-agent/config/model-settings";
import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";
import { Agent } from "@oh-my-pi/pi-agent-core";
import * as ai from "@oh-my-pi/pi-ai";
import { createMockModel } from "@oh-my-pi/pi-ai/providers/mock";
import { ModelRegistry } from "@oh-my-pi/pi-coding-agent/config/model-registry";
import { Settings } from "@oh-my-pi/pi-coding-agent/config/settings";
import { AgentSession } from "@oh-my-pi/pi-coding-agent/session/agent-session";
import type { AuthStorage } from "@oh-my-pi/pi-coding-agent/session/auth-storage";
import { SessionManager } from "@oh-my-pi/pi-coding-agent/session/session-manager";
import {
	translateThinkingText,
	type ThinkingTranslationOptions,
} from "@oh-my-pi/pi-coding-agent/utils/thinking-translation-executor";
import { createAssistantMessage, createInMemoryAuthStorage } from "./helpers/agent-session-setup";
import { ValidationError } from "@oh-my-pi/pi-ai/error";

let storage: AuthStorage;
let registry: ModelRegistry;
let settings: Settings;
let model: ai.Model;
let options: ThinkingTranslationOptions;
let session: AgentSession | undefined;

function bundledModel(id: "claude-sonnet-4-5" | "claude-haiku-4-5"): ai.Model {
	return createMockModel({ id, provider: "anthropic" });
}

beforeEach(() => {
	storage = createInMemoryAuthStorage();
	storage.keys.setRuntime("anthropic", "test-key");
	settings = Settings.isolated({
		"compaction.enabled": false,
		"display.translateThinking": true,
		"retry.modelFallback": false,
	});
	model = bundledModel("claude-sonnet-4-5");
	cfgModelRoles.override(settings, { smol: `${model.provider}/${model.id}` });
	registry = new ModelRegistry(storage, undefined, {
		ignoreLocalModelConfig: true,
		cacheDbPath: ":memory:",
		settings,
	});
	vi.spyOn(registry, "getAvailable").mockReturnValue([model]);
	options = {
		registry,
		settings,
		sessionId: "translation-request",
		credentialSourceSessionId: "foreground-session",
		metadataResolver: () => undefined,
	};
});

afterEach(async () => {
	vi.restoreAllMocks();
	await session?.dispose();
	session = undefined;
	storage.close();
});

function createSession(messages: ai.AssistantMessage[] = []): AgentSession {
	const agent = new Agent({
		getApiKey: () => "test-key",
		initialState: { model, systemPrompt: ["Teste"], tools: [], messages },
		streamFn: createMockModel({ responses: [{ content: ["Concluído"] }] }).stream,
	});
	return new AgentSession({
		agent,
		sessionManager: SessionManager.inMemory(),
		settings,
		modelRegistry: registry,
		providerSessionId: "foreground-session",
	});
}

describe("executor de tradução do thinking", () => {
	it("prefere o role smol configurado mesmo quando tiny vem primeiro no catálogo", async () => {
		const tiny = bundledModel("claude-haiku-4-5");
		cfgModelRoles.override(settings, { smol: `${model.provider}/${model.id}`, tiny: `${tiny.provider}/${tiny.id}` });
		vi.spyOn(registry, "getAvailable").mockReturnValue([tiny, model]);
		vi.spyOn(ai, "completeSimple").mockImplementation(async selected =>
			createAssistantMessage(selected.id === model.id ? "Tradução pelo smol" : "Modelo incorreto"),
		);

		expect(await translateThinkingText("Inspect the code", "pt-BR", options)).toBe("Tradução pelo smol");
	});

	it("força a política genérica sem tools na completion isolada", async () => {
		const complete = vi.spyOn(ai, "completeSimple").mockResolvedValue(createAssistantMessage("Tradução segura"));

		expect(await translateThinkingText("Inspect the code", "pt-BR", options)).toBe("Tradução segura");
		expect(complete).toHaveBeenCalledTimes(1);
		expect(complete.mock.calls[0]?.[2]?.toolChoice).toBe("none");
		expect(complete.mock.calls[0]?.[1].tools).toBeUndefined();
	});

	it("libera a afinidade de credencial da sessão temporária", async () => {
		const release = vi.spyOn(storage.sessions, "release");
		vi.spyOn(ai, "completeSimple").mockResolvedValue(createAssistantMessage("Tradução"));

		await translateThinkingText("Original", "pt-BR", options);

		expect(release).toHaveBeenCalledWith(model.provider, options.sessionId);
	});

	it("propaga o abort para a resolução de credencial pendente", async () => {
		const controller = new AbortController();
		let credentialSignal: AbortSignal | undefined;
		vi.spyOn(registry, "getApiKey").mockImplementation(async (_model, _sessionId, credentialOptions) => {
			const deferred = Promise.withResolvers<void>();
			credentialSignal = credentialOptions?.signal;
			credentialOptions?.signal?.addEventListener("abort", () => deferred.resolve(), { once: true });
			await deferred.promise;
			return undefined;
		});
		const translation = translateThinkingText("Original", "pt-BR", { ...options, signal: controller.signal });

		await Promise.resolve();
		controller.abort();

		expect(await translation).toBeNull();
		expect(credentialSignal).toBe(controller.signal);
	});

	it("usa apenas o texto traduzido e não exibe o reasoning gerado pelo tradutor", async () => {
		const response = createAssistantMessage("");
		response.content = [
			{ type: "thinking", thinking: "Translator private analysis", thinkingSignature: "assinatura" },
			{ type: "text", text: "Inspecionar " },
			{ type: "text", text: "o código." },
		];
		vi.spyOn(ai, "completeSimple").mockResolvedValue(response);

		expect(await translateThinkingText("Inspect the code.", "pt-BR", options)).toBe("Inspecionar o código.");
	});

	it.each(["length", "toolUse", "error"] as const)(
		"recusa saída %s mesmo que contenha texto parcial",
		async stopReason => {
			const response = createAssistantMessage("Tradução incompleta");
			response.stopReason = stopReason;
			response.errorStatus = 400;
			response.errorMessage = "Invalid request";
			vi.spyOn(ai, "completeSimple").mockResolvedValue(response);

			expect(await translateThinkingText("Original", "pt-BR", options)).toBeNull();
		},
	);

	it("retorna null quando nenhum modelo está disponível", async () => {
		vi.spyOn(registry, "getAvailable").mockReturnValue([]);
		const complete = vi.spyOn(ai, "completeSimple");

		expect(await translateThinkingText("Original", "pt-BR", options)).toBeNull();
		expect(complete).not.toHaveBeenCalled();
	});

	it("retorna o original para en-US sem inferência", async () => {
		const complete = vi.spyOn(ai, "completeSimple");
		const original = "  Inspect `foo()`\n";

		expect(await translateThinkingText(original, "en-US", options)).toBe(original);
		expect(complete).not.toHaveBeenCalled();
	});

	it("cancela antes de consultar credenciais ou executar o modelo", async () => {
		const complete = vi.spyOn(ai, "completeSimple");
		const credentials = vi.spyOn(registry, "getApiKey");

		expect(await translateThinkingText("Original", "pt-BR", { ...options, signal: AbortSignal.abort() })).toBeNull();
		expect(complete).not.toHaveBeenCalled();
		expect(credentials).not.toHaveBeenCalled();
	});

	it("segue a cadeia oficial configurada quando a primeira resposta não é utilizável", async () => {
		const fallback = bundledModel("claude-haiku-4-5");
		cfgRetryModelFallback.override(settings, true);
		cfgRetryFallbackChains.override(settings, { smol: [`${fallback.provider}/${fallback.id}`] });
		vi.spyOn(registry, "getAvailable").mockReturnValue([model, fallback]);
		vi.spyOn(ai, "completeSimple").mockImplementation(async selected => {
			const response = createAssistantMessage(selected.id === fallback.id ? "Tradução recuperada" : "Parcial");
			if (selected.id === model.id) response.stopReason = "length";
			return response;
		});

		expect(await translateThinkingText("Original", "pt-BR", options)).toBe("Tradução recuperada");
	});

	it("não segue a cadeia configurada quando modelFallback está desligado", async () => {
		const fallback = bundledModel("claude-haiku-4-5");
		cfgRetryFallbackChains.override(settings, { smol: [`${fallback.provider}/${fallback.id}`] });
		vi.spyOn(registry, "getAvailable").mockReturnValue([model, fallback]);
		const complete = vi.spyOn(ai, "completeSimple").mockImplementation(async selected => {
			const response = createAssistantMessage(selected.id === fallback.id ? "Tradução recuperada" : "Parcial");
			if (selected.id === model.id) response.stopReason = "length";
			return response;
		});

		expect(await translateThinkingText("Original", "pt-BR", options)).toBeNull();
		expect(complete).toHaveBeenCalledTimes(1);
	});

	it("devolve null em vez de propagar uma exceção não transitória do provedor", async () => {
		vi.spyOn(ai, "completeSimple").mockRejectedValue(new ValidationError("Invalid request"));

		expect(await translateThinkingText("Original", "pt-BR", options)).toBeNull();
	});
});

describe("AgentSession.translateThinkingForDisplay", () => {
	it("não altera mensagens nem compartilha a identidade do foreground entre traduções concorrentes", async () => {
		const original = createAssistantMessage("");
		original.content = [
			Object.freeze({ type: "thinking" as const, thinking: "  Inspect `foo()`\n", thinkingSignature: "assinatura" }),
		];
		const before = structuredClone(original);
		session = createSession([original]);
		const requestIds: Array<string | undefined> = [];
		vi.spyOn(ai, "completeSimple").mockImplementation(async (_model, _context, requestOptions) => {
			requestIds.push(requestOptions?.sessionId);
			return createAssistantMessage("Inspecionar `foo()`");
		});

		const results = await Promise.all([
			session.translateThinkingForDisplay("  Inspect `foo()`\n", "pt-BR"),
			session.translateThinkingForDisplay("Inspect another file", "pt-BR"),
		]);

		expect(results).toEqual(["Inspecionar `foo()`", "Inspecionar `foo()`"]);
		expect(original).toEqual(before);
		expect(session.agent.state.messages).toEqual([before]);
		expect(requestIds[0]).toBeDefined();
		expect(requestIds[1]).toBeDefined();
		expect(requestIds[0]).not.toBe("foreground-session");
		expect(requestIds[1]).not.toBe("foreground-session");
		expect(requestIds[0]).not.toBe(requestIds[1]);
	});

	it("retorna o original sem chamada quando desligado ou com outro locale", async () => {
		session = createSession();
		const complete = vi.spyOn(ai, "completeSimple");
		const original = "  Original\n";
		cfgDisplayTranslateThinking.override(settings, false);

		expect(await session.translateThinkingForDisplay(original, "pt-BR")).toBe(original);
		cfgDisplayTranslateThinking.override(settings, true);
		expect(await session.translateThinkingForDisplay(original, "en-US")).toBe(original);
		expect(complete).not.toHaveBeenCalled();
	});

	it("o encerramento da sessão aborta a inferência e descarta uma resposta tardia", async () => {
		session = createSession();
		const started = Promise.withResolvers<void>();
		const response = Promise.withResolvers<ai.AssistantMessage>();
		let requestSignal: AbortSignal | undefined;
		vi.spyOn(ai, "completeSimple").mockImplementation((_model, _context, requestOptions) => {
			requestSignal = requestOptions?.signal;
			started.resolve();
			return response.promise;
		});

		const translation = session.translateThinkingForDisplay("Original", "pt-BR");
		await started.promise;
		session.beginDispose();
		response.resolve(createAssistantMessage("Tradução antiga"));

		expect(requestSignal?.aborted).toBe(true);
		expect(await translation).toBeNull();
	});
});
