import { completeSimple, retryTransientCompletion } from "@oh-my-pi/pi-ai";
import { logger, prompt } from "@oh-my-pi/pi-utils";
import type { ModelRegistry } from "../config/model-registry";
import type { Settings } from "../config/settings";
import translationSystemPrompt from "../prompts/system/thinking-translation.md" with { type: "text" };
import { collectOnlineTinyCandidates } from "../tiny/online-candidates";

const TRANSLATION_SYSTEM_PROMPT = prompt.render(translationSystemPrompt);
const TRANSLATION_MAX_TOKENS = 16_384;

export interface ThinkingTranslationOptions {
	registry: ModelRegistry;
	settings: Settings;
	sessionId: string;
	credentialSourceSessionId: string;
	metadataResolver: (provider: string) => Record<string, unknown> | undefined;
	signal?: AbortSignal;
}

/** Usa a mesma resolução de roles, credenciais e retry dos títulos, sem alterar a conversa. */
export async function translateThinkingText(
	text: string,
	locale: string,
	options: ThinkingTranslationOptions,
): Promise<string | null> {
	if (locale !== "pt-BR") return text;
	const { registry, settings, sessionId, credentialSourceSessionId, metadataResolver, signal } = options;
	if (signal?.aborted) return null;
	const candidates = collectOnlineTinyCandidates(["smol"], settings, registry.getAvailable());

	for (const { model } of candidates) {
		if (signal?.aborted) return null;
		try {
			if (credentialSourceSessionId !== sessionId) {
				const credential = registry.authStorage.oauth
					.accounts(model.provider, credentialSourceSessionId)
					.find(account => account.active);
				if (credential) registry.authStorage.sessions.pin(model.provider, sessionId, credential.credentialId);
			}
			if (!(await registry.getApiKey(model, sessionId, { signal }))) continue;
			if (signal?.aborted) return null;
			const metadata = metadataResolver(model.provider);
			const response = await retryTransientCompletion(
				() =>
					completeSimple(
						model,
						{
							systemPrompt: [TRANSLATION_SYSTEM_PROMPT],
							messages: [{ role: "user", content: text, timestamp: Date.now() }],
						},
						{
							apiKey: registry.resolver(model, sessionId),
							sessionId,
							maxTokens: Math.min(TRANSLATION_MAX_TOKENS, model.maxTokens ?? TRANSLATION_MAX_TOKENS),
							disableReasoning: true,
							temperature: 0,
							toolChoice: "none",
							metadata,
							signal,
						},
					),
				{ signal, provider: model.provider },
			);
			if (signal?.aborted || response.stopReason === "aborted") return null;
			// Saídas truncadas ou chamadas de ferramenta não são traduções completas.
			if (response.stopReason !== "stop") continue;
			let translated = "";
			for (const content of response.content) {
				if (content.type === "text") translated += content.text;
			}
			if (translated.trim()) return translated;
		} catch {
			if (signal?.aborted) return null;
			logger.debug("thinking-translation: tentativa indisponível", { provider: model.provider, model: model.id });
		} finally {
			registry.authStorage.sessions.release(model.provider, sessionId);
		}
	}
	return null;
}
