import { removeWithRetries } from "@oh-my-pi/pi-utils";
/**
 * Large-paste menu: when a paste reaches the configured `paste.largeMenuThreshold` line count,
 * the editor's `onLargePaste` hook routes through `InputController.handleLargePaste`, which offers
 * to attach the text as an `<attachment>` block, save it to a `local://` file, or paste it inline.
 * Below the threshold (or when disabled) the editor keeps its default collapse-to-`[Paste]`-marker behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { resetLocaleForTest, setLocale } from "@oh-my-pi/pi-coding-agent/i18n";
import { CustomEditor } from "@oh-my-pi/pi-coding-agent/modes/components/custom-editor";
import { InputController } from "@oh-my-pi/pi-coding-agent/modes/controllers/input-controller";
import { getEditorTheme } from "@oh-my-pi/pi-coding-agent/modes/theme/theme";
import type { InteractiveModeContext } from "@oh-my-pi/pi-coding-agent/modes/types";

function createContext(options?: {
	threshold?: number;
	/** Position of the option to pick. The stub answers with whatever label the
	 *  controller offered at that index, exactly as the real selector does, so a
	 *  test stays valid in any interface language. */
	choiceIndex?: number;
	artifactsDir?: string;
	editor?: InteractiveModeContext["editor"];
}) {
	const insertTextAttachment = vi.fn();
	const insertText = vi.fn();
	const pasteText = vi.fn();
	const requestRender = vi.fn();
	const showStatus = vi.fn();
	const showError = vi.fn();
	const showHookSelector = vi.fn(async (_title: string, selectOptions: unknown, _dialog?: unknown) => {
		if (options?.choiceIndex === undefined) return undefined;
		const offered = selectOptions as ReadonlyArray<string | { label: string }>;
		const picked = offered[options.choiceIndex];
		if (picked === undefined) throw new Error(`no option at index ${options.choiceIndex}`);
		return typeof picked === "string" ? picked : picked.label;
	});
	const ctx = {
		editor:
			options?.editor ??
			({ insertTextAttachment, insertText, pasteText } as unknown as InteractiveModeContext["editor"]),
		ui: { requestRender } as unknown as InteractiveModeContext["ui"],
		settings: { get: () => options?.threshold ?? 100 } as unknown as InteractiveModeContext["settings"],
		sessionManager: {
			getCwd: () => process.cwd(),
			getArtifactsDir: () => options?.artifactsDir ?? null,
			getSessionId: () => "test-session",
		} as unknown as InteractiveModeContext["sessionManager"],
		showHookSelector: showHookSelector as unknown as InteractiveModeContext["showHookSelector"],
		showStatus,
		showError,
	} as unknown as InteractiveModeContext;
	const controller = new InputController(ctx);
	return {
		controller,
		spies: { insertTextAttachment, insertText, pasteText, requestRender, showStatus, showError, showHookSelector },
	};
}

afterEach(() => {
	vi.restoreAllMocks();
	resetLocaleForTest();
});

/** Menu positions, in the order `presentLargePasteMenu` offers them. */
const WRAPPED_BLOCK = 0;
const LOCAL_FILE = 1;
const INLINE = 2;

describe("InputController.handleLargePaste gate", () => {
	it("declines and skips the menu below the threshold", () => {
		const { controller, spies } = createContext({ threshold: 100 });
		const menu = vi.spyOn(controller, "presentLargePasteMenu").mockResolvedValue();

		expect(controller.handleLargePaste("x", 50)).toBe(true);
		expect(menu).not.toHaveBeenCalled();
		expect(spies.insertTextAttachment).toHaveBeenCalledWith("x");
	});

	it("declines when disabled (threshold 0), even for a huge paste", () => {
		const { controller, spies } = createContext({ threshold: 0 });
		const menu = vi.spyOn(controller, "presentLargePasteMenu").mockResolvedValue();

		expect(controller.handleLargePaste("x", 5000)).toBe(true);
		expect(menu).not.toHaveBeenCalled();
		expect(spies.insertTextAttachment).toHaveBeenCalledWith("x");
	});

	it("intercepts and presents the menu at the threshold", () => {
		const { controller, spies } = createContext({ threshold: 100 });
		const menu = vi.spyOn(controller, "presentLargePasteMenu").mockResolvedValue();

		expect(controller.handleLargePaste("payload", 100)).toBe(true);
		expect(menu).toHaveBeenCalledWith("payload", 100);
		expect(spies.insertTextAttachment).not.toHaveBeenCalled();
	});

	// The submit key shares the paste's terminal read (automation, batched
	// reads). Opening the menu would leave the composer idle with the Enter
	// consumed by the menu, so the paste is staged synchronously and the queued
	// Enter submits it — under both keyboard encodings of Enter.
	for (const [label, enter] of [
		["legacy \\r", "\r"],
		["kitty CSI-u", "\x1b[13u"],
	] as const) {
		it(`stages and submits a threshold-sized paste when Enter (${label}) shares the burst`, () => {
			const editor = new CustomEditor(getEditorTheme());
			const { controller, spies } = createContext({ threshold: 100, editor });
			editor.onLargePaste = (text, lineCount, options) => controller.handleLargePaste(text, lineCount, options);
			const submitted = vi.fn();
			editor.onSubmit = submitted;
			const payload = Array.from({ length: 100 }, (_, index) => `line ${index + 1}`).join("\n");

			editor.handleInput(`\x1b[200~${payload}\x1b[201~${enter}`);

			expect(spies.showHookSelector).not.toHaveBeenCalled();
			expect(submitted).toHaveBeenCalledWith(payload);
		});
	}

	it("still presents the menu when a non-submit key shares the burst", () => {
		const editor = new CustomEditor(getEditorTheme());
		const { controller, spies } = createContext({ threshold: 100, editor });
		editor.onLargePaste = (text, lineCount, options) => controller.handleLargePaste(text, lineCount, options);
		const submitted = vi.fn();
		editor.onSubmit = submitted;
		const payload = Array.from({ length: 100 }, (_, index) => `line ${index + 1}`).join("\n");

		editor.handleInput(`\x1b[200~${payload}\x1b[201~x`);

		expect(spies.showHookSelector).toHaveBeenCalledTimes(1);
		expect(submitted).not.toHaveBeenCalled();
		expect(editor.getText()).toBe("x");
	});
});

/**
 * The selector resolves to the *label* the user picked, so a caller that compares
 * that label to an English literal silently falls through in any other language.
 * Running the same positions under both interface languages is the guard: a
 * literal comparison reaching `presentLargePasteMenu` makes these fail loudly.
 */
describe.each(["en-US", "pt-BR"] as const)("InputController.presentLargePasteMenu actions (%s)", locale => {
	beforeEach(() => {
		setLocale(locale);
	});

	it("wraps the paste in attachment XML collapsed to a marker", async () => {
		const { controller, spies } = createContext({ choiceIndex: WRAPPED_BLOCK });

		await controller.presentLargePasteMenu("payload", 1);

		expect(spies.insertTextAttachment).toHaveBeenCalledWith("payload", "<attachment>\npayload\n</attachment>");
	});

	it("recalls and submits the wrapped expansion rather than only the chip preview", async () => {
		const editor = new CustomEditor(getEditorTheme());
		const { controller } = createContext({ choiceIndex: WRAPPED_BLOCK, editor });
		await controller.presentLargePasteMenu("line one\nline two", 2);
		editor.clearDraftForRecall();
		editor.addToHistory("intervening prompt");
		editor.handleInput("\x1b[A");
		editor.handleInput("\x1b[A");
		const submitted = vi.fn();
		editor.onSubmit = submitted;
		editor.handleInput("\r");
		expect(submitted).toHaveBeenCalledWith("<attachment>\nline one\nline two\n</attachment>");
	});

	it("pastes inline when explicitly selected", async () => {
		const { controller, spies } = createContext({ choiceIndex: INLINE });

		await controller.presentLargePasteMenu("payload", 1);

		expect(spies.insertTextAttachment).toHaveBeenCalledWith("payload");
	});

	it("pastes inline when the menu is cancelled, so the content is not lost", async () => {
		const { controller, spies } = createContext({});

		await controller.presentLargePasteMenu("payload", 1);

		expect(spies.insertTextAttachment).toHaveBeenCalledWith("payload");
	});

	it("carries the paste's line count into the menu title", async () => {
		const { controller, spies } = createContext({});

		await controller.presentLargePasteMenu("payload", 123);

		// The count is interpolated, not the wording: the title is translated copy.
		expect(spies.showHookSelector.mock.calls[0][0]).toContain("123");
	});
});

describe("InputController.presentLargePasteMenu file attachment", () => {
	let dir: string | undefined;

	afterEach(async () => {
		if (dir) await removeWithRetries(dir);
		dir = undefined;
	});

	it("saves the paste to local:// and inserts a clean local://paste reference", async () => {
		dir = await fs.mkdtemp(path.join(os.tmpdir(), "omp-paste-test-"));
		const { controller, spies } = createContext({ choiceIndex: LOCAL_FILE, artifactsDir: dir });

		await controller.presentLargePasteMenu("line one\nline two", 2);

		expect(spies.insertText).toHaveBeenCalledWith("local://paste-1.md ");
		expect(spies.insertTextAttachment).not.toHaveBeenCalled();
		// resolveLocalRoot maps an artifacts dir to "<dir>/local"; the reference resolves there.
		const saved = await Bun.file(path.join(dir, "local", "paste-1.md")).text();
		expect(saved).toBe("line one\nline two");
	});

	it("does not overwrite an existing paste file", async () => {
		dir = await fs.mkdtemp(path.join(os.tmpdir(), "omp-paste-test-"));
		await Bun.write(path.join(dir, "local", "paste-1.md"), "previous");
		const { controller, spies } = createContext({ choiceIndex: LOCAL_FILE, artifactsDir: dir });

		await controller.presentLargePasteMenu("fresh", 1);

		expect(spies.insertText).toHaveBeenCalledWith("local://paste-2.md ");
		expect(await Bun.file(path.join(dir, "local", "paste-1.md")).text()).toBe("previous");
		expect(await Bun.file(path.join(dir, "local", "paste-2.md")).text()).toBe("fresh");
	});

	it("recalls a paste-file reference without deleting or overwriting its content", async () => {
		dir = await fs.mkdtemp(path.join(os.tmpdir(), "omp-paste-recall-"));
		const editor = new CustomEditor(getEditorTheme());
		const { controller } = createContext({ choiceIndex: LOCAL_FILE, artifactsDir: dir, editor });
		await controller.presentLargePasteMenu("first file\nsecond line", 2);
		editor.clearDraftForRecall();
		await controller.presentLargePasteMenu("another paste", 1);
		editor.clearDraftForRecall();
		editor.handleInput("\x1b[A");
		editor.handleInput("\x1b[A");
		const submitted = vi.fn();
		editor.onSubmit = submitted;
		editor.handleInput("\r");
		expect(submitted).toHaveBeenCalledWith("local://paste-1.md");
		expect(await Bun.file(path.join(dir, "local", "paste-1.md")).text()).toBe("first file\nsecond line");
		expect(await Bun.file(path.join(dir, "local", "paste-2.md")).text()).toBe("another paste");
	});
});
