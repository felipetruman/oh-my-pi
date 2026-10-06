import { describe, expect, it } from "bun:test";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { COMPOSER_DEFAULTS } from "@oh-my-pi/pi-tui/prompt/composer";
import { ComposerCache } from "@oh-my-pi/pi-tui/prompt/composer-cache";

describe("localized composer startup cache", () => {
	it("restores interface language for the next launch and a new project", async () => {
		const root = await fs.mkdtemp(path.join(os.tmpdir(), "omp-localized-composer-"));
		const dbPath = path.join(root, "composer.db");
		try {
			const writer = ComposerCache.open(dbPath);
			writer.writeUi(path.join(root, "project"), COMPOSER_DEFAULTS, {}, "pt-BR");
			writer.close();
			const reader = ComposerCache.open(dbPath);
			try {
				expect(reader.read(path.join(root, "project")).locale).toBe("pt-BR");
				expect(reader.read(path.join(root, "other")).locale).toBe("pt-BR");
			} finally {
				reader.close();
			}
		} finally {
			await fs.rm(root, { recursive: true, force: true });
		}
	});

	it("accepts caches written before the interface language was added", async () => {
		const root = await fs.mkdtemp(path.join(os.tmpdir(), "omp-legacy-composer-locale-"));
		const cache = ComposerCache.open(path.join(root, "composer.db"));
		try {
			cache.writeUi(root, COMPOSER_DEFAULTS, {});
			expect(cache.read(root).locale).toBeUndefined();
		} finally {
			cache.close();
			await fs.rm(root, { recursive: true, force: true });
		}
	});
});
