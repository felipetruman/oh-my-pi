import { describe, expect, it, mock } from "bun:test";
import {
	ThinkingDisplayTranslator,
	type ThinkingTranslationState,
} from "@oh-my-pi/pi-coding-agent/utils/thinking-translation";

async function translate(
	translator: ThinkingDisplayTranslator,
	text: string,
	locale = "pt-BR",
): Promise<ThinkingTranslationState | undefined> {
	const settled = Promise.withResolvers<void>();
	translator.schedule(text, locale, settled.resolve);
	await settled.promise;
	return translator.get(text, locale);
}

describe("ThinkingDisplayTranslator", () => {
	it("consulta sem iniciar inferência", async () => {
		const executor = mock(async () => "Tradução");
		const translator = new ThinkingDisplayTranslator(executor);

		expect(translator.get("Original", "pt-BR")).toBeUndefined();
		expect(translator.get("Original", "pt-BR")).toBeUndefined();
		await Promise.resolve();

		expect(executor).not.toHaveBeenCalled();
	});

	it("deduplica o job pendente e avisa cada listener uma vez com o resultado disponível", async () => {
		const response = Promise.withResolvers<string>();
		const settled = Promise.withResolvers<void>();
		const executor = mock(() => response.promise);
		const translator = new ThinkingDisplayTranslator(executor);
		const observed: Array<ThinkingTranslationState | undefined> = [];
		const first = mock(() => observed.push(translator.get("Original", "pt-BR")));
		const second = mock(() => {
			observed.push(translator.get("Original", "pt-BR"));
			settled.resolve();
		});

		expect(translator.schedule("Original", "pt-BR", first)).toEqual({ status: "pending" });
		translator.schedule("Original", "pt-BR", first);
		translator.schedule("Original", "pt-BR", second);
		expect(executor).not.toHaveBeenCalled();
		await Promise.resolve();
		expect(executor).toHaveBeenCalledTimes(1);
		expect(translator.get("Original", "pt-BR")).toEqual({ status: "pending" });
		response.resolve("Texto traduzido");
		await settled.promise;

		expect(observed).toEqual([
			{ status: "translated", text: "Texto traduzido" },
			{ status: "translated", text: "Texto traduzido" },
		]);
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).toHaveBeenCalledTimes(1);
		expect(translator.schedule("Original", "pt-BR", second)).toEqual({
			status: "translated",
			text: "Texto traduzido",
		});
		expect(executor).toHaveBeenCalledTimes(1);
		expect(second).toHaveBeenCalledTimes(1);
	});

	it("separa textos e locales mesmo quando contêm o delimitador da chave", async () => {
		let calls = 0;
		const translator = new ThinkingDisplayTranslator(async () => `Tradução ${++calls}`);

		const results = await Promise.all([
			translate(translator, "BR:Original", "pt"),
			translate(translator, "Original", "pt:BR"),
			translate(translator, "Original", "pt-BR"),
			translate(translator, "Original ", "pt-BR"),
		]);

		expect(results).toEqual([
			{ status: "translated", text: "Tradução 1" },
			{ status: "translated", text: "Tradução 2" },
			{ status: "translated", text: "Tradução 3" },
			{ status: "translated", text: "Tradução 4" },
		]);
	});

	it("entrega o texto original ao executor sem aparar, escapar ou remover código", async () => {
		const original = "  Inspect `foo()`\n```ts\nconst π = '<thinking>';\n```\n\t";
		const executor = mock(async (_text: string) => "Inspecionar `foo()`");
		const translator = new ThinkingDisplayTranslator(executor);

		await translate(translator, original);

		expect(executor.mock.calls[0]?.[0]).toBe(original);
		expect(translator.get(original.trim(), "pt-BR")).toBeUndefined();
		expect(translator.get(original, "pt-BR")).toEqual({ status: "translated", text: "Inspecionar `foo()`" });
	});

	it("transforma rejeição em failed e não repete a falha a cada atualização", async () => {
		const executor = mock(async () => {
			throw new Error("Falha do provedor");
		});
		const translator = new ThinkingDisplayTranslator(executor);

		expect(await translate(translator, "Original")).toEqual({ status: "failed" });
		expect(translator.schedule("Original", "pt-BR")).toEqual({ status: "failed" });
		await Promise.resolve();

		expect(executor).toHaveBeenCalledTimes(1);
	});

	it("isola também exceções síncronas do executor", async () => {
		const translator = new ThinkingDisplayTranslator(() => {
			throw new Error("Falha síncrona");
		});

		expect(await translate(translator, "Original")).toEqual({ status: "failed" });
	});

	it.each([null, "", " \n\t"])("não apresenta saída vazia como tradução: %j", async result => {
		const translator = new ThinkingDisplayTranslator(async () => result);

		expect(await translate(translator, "Original")).toEqual({ status: "failed" });
	});

	it("a falha de um listener não impede os demais", async () => {
		const translator = new ThinkingDisplayTranslator(async () => "Traduzido");
		translator.schedule("Original", "pt-BR", () => {
			throw new Error("Componente descartado");
		});

		expect(await translate(translator, "Original")).toEqual({ status: "translated", text: "Traduzido" });
	});

	it("invalidate cancela a entrada pendente e ignora sua conclusão depois da substituta", async () => {
		const oldResponse = Promise.withResolvers<string>();
		const oldListener = mock(() => {});
		const executor = mock((_text: string, _locale: string, _signal: AbortSignal) => oldResponse.promise);
		const translator = new ThinkingDisplayTranslator(executor);
		translator.schedule("Original", "pt-BR", oldListener);
		await Promise.resolve();
		const oldSignal = executor.mock.calls[0]?.[2];

		translator.invalidate("Original", "pt-BR");
		expect(oldSignal?.aborted).toBe(true);
		expect(translator.get("Original", "pt-BR")).toBeUndefined();
		executor.mockImplementation(async () => "Tradução nova");
		await translate(translator, "Original");
		oldResponse.resolve("Tradução antiga");
		await oldResponse.promise;

		expect(oldListener).not.toHaveBeenCalled();
		expect(translator.get("Original", "pt-BR")).toEqual({ status: "translated", text: "Tradução nova" });
	});

	it("invalidate remove somente o resultado solicitado e permite repetir uma falha", async () => {
		const translator = new ThinkingDisplayTranslator(async text => (text === "Falha" ? null : "Traduzido"));
		await translate(translator, "Original");
		await translate(translator, "Falha");

		translator.invalidate("Falha", "pt-BR");

		expect(translator.get("Falha", "pt-BR")).toBeUndefined();
		expect(translator.get("Original", "pt-BR")).toEqual({ status: "translated", text: "Traduzido" });
	});

	it("clear cancela jobs, remove resultados e não repovoa a geração anterior", async () => {
		const oldResponse = Promise.withResolvers<string>();
		const executor = mock(async (_text: string, _locale: string, _signal: AbortSignal) => "Em cache");
		const translator = new ThinkingDisplayTranslator(executor);
		await translate(translator, "Em cache");
		executor.mockImplementation(() => oldResponse.promise);
		const oldListener = mock(() => {});
		translator.schedule("Pendente", "pt-BR", oldListener);
		await Promise.resolve();
		const oldSignal = executor.mock.calls[1]?.[2];

		translator.clear();
		expect(oldSignal?.aborted).toBe(true);
		expect(translator.get("Em cache", "pt-BR")).toBeUndefined();
		expect(translator.get("Pendente", "pt-BR")).toBeUndefined();
		oldResponse.resolve("Antigo");
		await oldResponse.promise;
		expect(translator.get("Pendente", "pt-BR")).toBeUndefined();
		expect(oldListener).not.toHaveBeenCalled();
		executor.mockImplementation(async () => "Nova geração");

		expect(await translate(translator, "Pendente")).toEqual({ status: "translated", text: "Nova geração" });
	});

	it("clear antes do próximo microtask evita até a chamada ao executor", async () => {
		const executor = mock(async () => "Traduzido");
		const translator = new ThinkingDisplayTranslator(executor);
		translator.schedule("Original", "pt-BR");

		translator.clear();
		await Promise.resolve();

		expect(executor).not.toHaveBeenCalled();
		expect(translator.get("Original", "pt-BR")).toBeUndefined();
	});

	it("mantém 128 resultados e expulsa o menos recentemente consultado", async () => {
		const translator = new ThinkingDisplayTranslator(async () => "Traduzido");
		const inputs = Array.from({ length: 128 }, (_, index) => `Texto ${index}`);
		await Promise.all(inputs.map(text => translate(translator, text)));
		expect(translator.get("Texto 0", "pt-BR")).toEqual({ status: "translated", text: "Traduzido" });

		await translate(translator, "Texto 128");

		expect(translator.get("Texto 1", "pt-BR")).toBeUndefined();
		expect(translator.get("Texto 0", "pt-BR")).toEqual({ status: "translated", text: "Traduzido" });
		expect(translator.get("Texto 128", "pt-BR")).toEqual({ status: "translated", text: "Traduzido" });
	});

	it("limita concorrência e não duplica jobs quando há mais entradas que o LRU", async () => {
		const response = Promise.withResolvers<string>();
		const executor = mock(() => response.promise);
		const translator = new ThinkingDisplayTranslator(executor);
		const pending = Array.from({ length: 129 }, (_, index) => translate(translator, `Texto ${index}`));
		await Promise.resolve();

		translator.schedule("Texto 0", "pt-BR");
		await Promise.resolve();

		expect(executor).toHaveBeenCalledTimes(2);
		expect(translator.get("Texto 0", "pt-BR")).toEqual({ status: "pending" });
		response.resolve("Traduzido");
		await Promise.all(pending);
		expect(executor).toHaveBeenCalledTimes(129);
	});

	it("cancela jobs sem consumidores antes de iniciar o restante da fila", async () => {
		const signals: AbortSignal[] = [];
		const executor = mock((_text: string, _locale: string, signal: AbortSignal) => {
			const deferred = Promise.withResolvers<string | null>();
			signals.push(signal);
			signal.addEventListener("abort", () => deferred.resolve(null), { once: true });
			return deferred.promise;
		});
		const translator = new ThinkingDisplayTranslator(executor);
		const listener = mock(() => {});
		for (const text of ["A", "B", "C"]) translator.schedule(text, "pt-BR", listener);
		await Promise.resolve();

		translator.unsubscribe(listener);
		await Bun.sleep(0);

		expect(executor).toHaveBeenCalledTimes(2);
		expect(signals.every(signal => signal.aborted)).toBe(true);
		expect(translator.get("A", "pt-BR")).toBeUndefined();
		expect(translator.get("B", "pt-BR")).toBeUndefined();
		expect(translator.get("C", "pt-BR")).toBeUndefined();
		expect(listener).not.toHaveBeenCalled();
	});
});
