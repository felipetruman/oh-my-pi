import { afterEach, describe, expect, test, vi } from "bun:test";
import { ConfigurationError } from "@oh-my-pi/pi-ai/error";
import { discoverLoginAuthStorage } from "../src/cli/login-cli";
import * as sdk from "../src/sdk";
import type { Settings } from "../src/config/settings";
import type { AuthStorage } from "../src/session/auth-storage";

function policyMismatchError(): ConfigurationError {
	return new ConfigurationError("auth.accountPolicies[0].account matches no stored OAuth account for anthropic");
}

describe("discoverLoginAuthStorage", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("retries without account policies when selectors match no active credential", async () => {
		const storage = { close: () => {} } as unknown as AuthStorage;
		const spy = vi
			.spyOn(sdk, "discoverAuthStorage")
			.mockRejectedValueOnce(policyMismatchError())
			.mockResolvedValueOnce(storage);
		const settings = {} as Settings;
		await expect(discoverLoginAuthStorage(settings)).resolves.toBe(storage);
		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy.mock.calls[0]?.[1]).toEqual({ settings });
		expect(spy.mock.calls[1]?.[1]).toEqual({ settings, accountPolicies: [] });
	});

	test("rethrows discovery failures unrelated to account policies", async () => {
		vi.spyOn(sdk, "discoverAuthStorage").mockRejectedValueOnce(new Error("broker unreachable"));
		const settings = {} as Settings;
		await expect(discoverLoginAuthStorage(settings)).rejects.toThrow("broker unreachable");
	});
});
