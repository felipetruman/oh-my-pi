import { LRUCache } from "@oh-my-pi/pi-utils/lru";

export type ThinkingTranslationState =
	| { readonly status: "pending" }
	| { readonly status: "translated"; readonly text: string }
	| { readonly status: "failed" };

export type ThinkingTranslationExecutor = (text: string, locale: string, signal: AbortSignal) => Promise<string | null>;

type SettledTranslation = Exclude<ThinkingTranslationState, { status: "pending" }>;

interface PendingTranslation {
	controller: AbortController;
	listeners: Set<() => void>;
	keepAlive: boolean;
}

interface QueuedTranslation {
	key: string;
	text: string;
	locale: string;
	job: PendingTranslation;
}

const PENDING: ThinkingTranslationState = { status: "pending" };
const MAX_CONCURRENT_TRANSLATIONS = 2;

function translationKey(text: string, locale: string): string {
	return `${locale.length}:${locale}${text}`;
}

/** Projeção por sessão: nunca modifica nem persiste o conteúdo original. */
export class ThinkingDisplayTranslator {
	readonly #cache = new LRUCache<string, SettledTranslation>({ max: 128 });
	// Jobs ficam separados do LRU para manter a deduplicação mesmo sob pressão de cache.
	#pending = new Map<string, PendingTranslation>();
	#queue: QueuedTranslation[] = [];
	#active = 0;

	constructor(private readonly executor: ThinkingTranslationExecutor) {}

	/** Consulta síncrona, sem iniciar inferência. */
	get(text: string, locale: string): ThinkingTranslationState | undefined {
		const key = translationKey(text, locale);
		return this.#pending.has(key) ? PENDING : this.#cache.get(key);
	}

	/** Agenda fora de render(); o mesmo listener recebe uma única notificação por job. */
	schedule(text: string, locale: string, onSettled?: () => void): ThinkingTranslationState {
		const key = translationKey(text, locale);
		const pending = this.#pending.get(key);
		if (pending) {
			if (onSettled) pending.listeners.add(onSettled);
			else pending.keepAlive = true;
			return PENDING;
		}
		const cached = this.#cache.get(key);
		if (cached) return cached;

		const job: PendingTranslation = {
			controller: new AbortController(),
			listeners: new Set(onSettled ? [onSettled] : []),
			keepAlive: !onSettled,
		};
		this.#pending.set(key, job);
		this.#queue.push({ key, text, locale, job });
		this.#pump();
		return PENDING;
	}

	/** Remove um consumidor descartado e cancela trabalho sem outros interessados. */
	unsubscribe(listener: () => void): void {
		for (const [key, job] of this.#pending) {
			job.listeners.delete(listener);
			if (job.keepAlive || job.listeners.size > 0) continue;
			this.#pending.delete(key);
			job.controller.abort();
		}
	}

	invalidate(text: string, locale: string): void {
		const key = translationKey(text, locale);
		this.#cache.delete(key);
		const job = this.#pending.get(key);
		if (!job) return;
		this.#pending.delete(key);
		job.listeners.clear();
		job.controller.abort();
	}

	/** Cancela a geração anterior sem permitir que conclusões tardias repovoem o cache. */
	clear(): void {
		this.#cache.clear();
		this.#queue = [];
		const pending = this.#pending;
		this.#pending = new Map();
		for (const job of pending.values()) {
			job.listeners.clear();
			job.controller.abort();
		}
	}

	#pump(): void {
		while (this.#active < MAX_CONCURRENT_TRANSLATIONS) {
			const next = this.#queue.shift();
			if (!next) return;
			if (this.#pending.get(next.key) !== next.job) continue;
			this.#active++;
			void this.#translate(next.key, next.text, next.locale, next.job).finally(() => {
				this.#active--;
				this.#pump();
			});
		}
	}

	async #translate(key: string, text: string, locale: string, job: PendingTranslation): Promise<void> {
		// Adia até executores síncronos defeituosos e permite cancelar antes da chamada.
		await Promise.resolve();
		if (job.controller.signal.aborted) return;
		let state: SettledTranslation;
		try {
			const translated = await this.executor(text, locale, job.controller.signal);
			state = translated?.trim() ? { status: "translated", text: translated } : { status: "failed" };
		} catch {
			state = { status: "failed" };
		}
		if (this.#pending.get(key) !== job) return;
		this.#pending.delete(key);
		this.#cache.set(key, state);
		for (const listener of job.listeners) {
			try {
				listener();
			} catch {
				// Uma projeção descartada não deve impedir a atualização das demais.
			}
		}
		job.listeners.clear();
	}
}
