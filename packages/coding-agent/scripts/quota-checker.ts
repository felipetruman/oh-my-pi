import type { UsageLimit } from "../../ai/src/usage";
import { claudeUsageProvider } from "../../ai/src/usage/claude";

interface QuotaOutput {
	generatedAt: number;
	account: "claude1";
	provider: "anthropic";
	limits: Array<{
		id: string;
		label: string;
		status?: string;
		window?: {
			id: string;
			label: string;
			resetsAt?: number;
		};
		amount?: UsageLimit["amount"];
		scope: {
			modelId?: string;
			tier?: string;
			shared?: boolean;
		};
	}>;
}

function usagePercent(limit: UsageLimit): string {
	const usedFraction = limit.amount?.usedFraction;
	if (usedFraction !== undefined) {
		const used = Math.max(0, Math.min(1, usedFraction));
		return `${(used * 100).toFixed(1)}% usada · ${((1 - used) * 100).toFixed(1)}% restante`;
	}
	const used = limit.amount?.used;
	const maximum = limit.amount?.limit;
	if (used !== undefined && maximum !== undefined) {
		return `${used} de ${maximum} ${limit.amount?.unit ?? ""}`.trim();
	}
	return "uso indisponível";
}

function formatHuman(output: QuotaOutput): string {
	const lines = [`Quota Claude · ${output.account}`];
	for (const limit of output.limits) {
		const reset = limit.window?.resetsAt ? ` · reset ${new Date(limit.window.resetsAt).toISOString()}` : "";
		lines.push(`${limit.label}: ${usagePercent(limit as UsageLimit)}${reset}`);
	}
	return lines.join("\n");
}

function toSafeOutput(limits: UsageLimit[]): QuotaOutput {
	return {
		generatedAt: Date.now(),
		account: "claude1",
		provider: "anthropic",
		limits: limits.map(limit => ({
			id: limit.id,
			label: limit.label,
			status: limit.status,
			window: limit.window
				? {
						id: limit.window.id,
						label: limit.window.label,
						resetsAt: limit.window.resetsAt,
					}
				: undefined,
			amount: limit.amount,
			scope: {
				modelId: limit.scope.modelId,
				tier: limit.scope.tier,
				shared: limit.scope.shared,
			},
		})),
	};
}

function printHelp(): void {
	process.stdout.write("Uso: quota-checker [--json]\n");
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);
	if (args.includes("--help") || args.includes("-h")) {
		printHelp();
		return;
	}
	const unknown = args.filter(argument => argument !== "--json" && argument !== "-j");
	if (unknown.length > 0) {
		process.stderr.write(`quota-checker: opção desconhecida: ${unknown[0]}\n`);
		process.exitCode = 2;
		return;
	}

	const accessToken = process.env.ANTHROPIC_OAUTH_TOKEN;
	if (!accessToken) {
		process.stderr.write("quota-checker: ANTHROPIC_OAUTH_TOKEN não foi carregado\n");
		process.exitCode = 2;
		return;
	}

	let failureDetail: string | undefined;
	let failureStatus: number | undefined;
	let retryAfter: string | null = null;
	const logger = {
		debug() {},
		warn(message: string, metadata?: Record<string, unknown>) {
			if (failureDetail) return;
			const status = metadata?.status;
			failureDetail = typeof status === "number" ? `HTTP ${status}` : message;
		},
	};
	const fetchUsage: typeof fetch = Object.assign(
		async (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
			const url = new URL(String(input));
			if (url.pathname.endsWith("/usage") && url.search.length === 0) {
				url.searchParams.set("at_wall", "1");
				url.searchParams.set("skip_spend", "1");
			}
			const response = await fetch(url, init);
			if (!response.ok) {
				failureStatus = response.status;
				retryAfter = response.headers.get("retry-after");
				const payload = (await response
					.clone()
					.json()
					.catch(() => null)) as {
					error?: { message?: unknown; type?: unknown };
				} | null;
				const errorType = typeof payload?.error?.type === "string" ? payload.error.type : undefined;
				const errorMessage = typeof payload?.error?.message === "string" ? payload.error.message : undefined;
				const summary = [errorType, errorMessage]
					.filter((value): value is string => value !== undefined)
					.join(": ")
					.replace(/\s+/g, " ")
					.slice(0, 160);
				failureDetail = `HTTP ${response.status}${summary ? `: ${summary}` : ""}`;
			}
			return response;
		},
		{ preconnect: fetch.preconnect.bind(fetch) },
	);
	const signal = AbortSignal.timeout(15_000);
	const report = await claudeUsageProvider.fetchUsage(
		{
			provider: "anthropic",
			credential: { type: "oauth", accessToken },
			accountKey: "claude1",
			baseUrl: process.env.ANTHROPIC_BASE_URL,
			signal,
		},
		{ fetch: fetchUsage, logger },
	);
	if (!report || report.limits.length === 0) {
		if (failureStatus === 429) {
			const retry = retryAfter ? `; retry-after=${retryAfter}` : "";
			process.stderr.write(
				`quota-checker: consulta de quota limitada pela Anthropic (${failureDetail ?? "HTTP 429"}${retry})\n`,
			);
		} else {
			const detail = failureDetail ? ` (${failureDetail})` : "";
			process.stderr.write(
				`quota-checker: Anthropic não retornou dados de quota${detail}; verifique o token e tente novamente\n`,
			);
		}
		process.exitCode = 1;
		return;
	}

	const output = toSafeOutput(report.limits);
	if (args.includes("--json") || args.includes("-j")) {
		process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
		return;
	}
	process.stdout.write(`${formatHuman(output)}\n`);
}

await main().catch(() => {
	process.stderr.write("quota-checker: falha ao consultar a quota da Anthropic\n");
	process.exitCode = 1;
});
