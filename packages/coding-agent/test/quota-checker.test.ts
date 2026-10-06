import { afterEach, describe, expect, it } from "bun:test";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

const quotaChecker = path.resolve(import.meta.dir, "../scripts/quota-checker");
const temporaryDirectories: string[] = [];

async function createHome(accountEnv: string): Promise<string> {
	const home = await fs.mkdtemp(path.join(os.tmpdir(), "quota-checker-"));
	temporaryDirectories.push(home);
	const accountDirectory = path.join(home, ".config", "omp", "accounts");
	await fs.mkdir(accountDirectory, { recursive: true });
	await fs.writeFile(path.join(accountDirectory, "claude1.env"), accountEnv, { mode: 0o600 });
	return home;
}

async function runChecker(home: string, baseUrl: string, ...args: string[]) {
	const env = { ...process.env };
	delete env.ANTHROPIC_OAUTH_TOKEN;
	const child = Bun.spawn([quotaChecker, ...args], {
		env: { ...env, ANTHROPIC_BASE_URL: baseUrl, HOME: home },
		stdin: "ignore",
		stdout: "pipe",
		stderr: "pipe",
	});
	const [exitCode, stdout, stderr] = await Promise.all([
		child.exited,
		new Response(child.stdout).text(),
		new Response(child.stderr).text(),
	]);
	return { exitCode, stderr, stdout };
}

afterEach(async () => {
	await Promise.all(
		temporaryDirectories.splice(0).map(directory => fs.rm(directory, { recursive: true, force: true })),
	);
});

describe("quota-checker", () => {
	it("fetches Claude quota without exposing the OAuth token", async () => {
		const secret = "sk-ant-oat01-test-secret";
		const home = await createHome(`ANTHROPIC_OAUTH_TOKEN=${secret}\n`);
		const authorizations: Array<string | null> = [];
		const server = Bun.serve({
			port: 0,
			fetch(request) {
				authorizations.push(request.headers.get("authorization"));
				const pathname = new URL(request.url).pathname;
				if (pathname.endsWith("/profile")) {
					return Response.json({ account: { uuid: "account-test", email_address: "hidden@example.com" } });
				}
				return Response.json({
					five_hour: { utilization: 35, resets_at: "2026-09-29T18:00:00Z" },
					seven_day: { utilization: 62, resets_at: "2026-10-04T00:00:00Z" },
				});
			},
		});

		try {
			const result = await runChecker(home, `http://127.0.0.1:${server.port}`, "--json");
			const output = JSON.parse(result.stdout) as {
				account: string;
				limits: Array<{ amount?: { usedFraction?: number } }>;
			};

			expect(result.exitCode).toBe(0);
			expect(result.stderr).toBe("");
			expect(output.account).toBe("claude1");
			expect(output.limits.map(limit => limit.amount?.usedFraction)).toEqual([0.35, 0.62]);
			expect(authorizations.length).toBeGreaterThan(0);
			expect(authorizations.every(header => header === `Bearer ${secret}`)).toBe(true);
			expect(result.stdout).not.toContain(secret);
			expect(result.stdout).not.toContain("hidden@example.com");
		} finally {
			server.stop(true);
		}
	});

	it("fails before the request when the OAuth token is absent", async () => {
		const home = await createHome("ANTHROPIC_API_KEY=not-used\n");
		const result = await runChecker(home, "http://127.0.0.1:1");

		expect(result.exitCode).toBe(2);
		expect(result.stdout).toBe("");
		expect(result.stderr).toContain("ANTHROPIC_OAUTH_TOKEN ausente");
		expect(result.stderr).not.toContain("not-used");
	});
});
