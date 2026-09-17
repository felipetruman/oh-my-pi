import * as path from "node:path";
import { CONFIG_DIR_NAME, prompt } from "@oh-my-pi/pi-utils";
import { invalidate as invalidateCapabilityCache } from "../../capability";
import type { Rule } from "../../capability/rule";
import { t } from "../../i18n";
import omfgUserPrompt from "../../prompts/system/omfg-user.md" with { type: "text" };
import { shortenPath } from "../../tools/render-utils";
import { OmfgPanelComponent } from "../components/omfg-panel";
import type { InteractiveModeContext } from "../types";
import {
	buildOmfgRuleForPath,
	extractGeneratedRuleJson,
	type OmfgRuleSourceLevel,
	type ParsedGeneratedRule,
	parseGeneratedRule,
	validateParsedRuleAgainstAssistantHistory,
} from "./omfg-rule";

interface OmfgRequest {
	component: OmfgPanelComponent;
	abortController: AbortController;
	complaint: string;
}

interface OmfgCandidate extends ParsedGeneratedRule {
	validated: boolean;
}

interface GenerateCandidateOptions {
	initialFeedback?: string;
	previousRule?: string;
}

type SaveCandidateResult = { kind: "saved" | "aborted" | "rejected" } | { kind: "amend"; feedback: string };

const MAX_ATTEMPTS = 3;

export class OmfgController {
	#activeRequest: OmfgRequest | undefined;

	constructor(private readonly ctx: InteractiveModeContext) {}

	hasActiveRequest(): boolean {
		return this.#activeRequest !== undefined;
	}

	handleEscape(): boolean {
		if (!this.#activeRequest) return false;
		this.#closeActiveRequest({ abort: this.#activeRequest.abortController.signal.aborted === false });
		return true;
	}

	dispose(): void {
		this.#closeActiveRequest({ abort: true });
	}

	async start(complaint: string): Promise<void> {
		const trimmedComplaint = complaint.trim();
		if (!trimmedComplaint) {
			this.ctx.showStatus(t("command.omfg.usage"));
			return;
		}

		const model = this.ctx.session.model;
		if (!model) {
			this.ctx.showError(t("command.omfg.noModel"));
			return;
		}

		this.#closeActiveRequest({ abort: true });

		const request: OmfgRequest = {
			component: new OmfgPanelComponent({ complaint: trimmedComplaint, tui: this.ctx.ui }),
			abortController: new AbortController(),
			complaint: trimmedComplaint,
		};
		this.ctx.omfgContainer.clear();
		this.ctx.omfgContainer.addChild(request.component);
		this.ctx.ui.requestRender();
		this.#activeRequest = request;
		void this.#runRequest(request);
	}

	async #runRequest(request: OmfgRequest): Promise<void> {
		try {
			let candidate = await this.#generateCandidate(request);
			for (;;) {
				if (!this.#isActiveRequest(request)) return;
				if (!candidate) {
					request.component.markError(t("command.omfg.invalidRule"));
					return;
				}

				if (!candidate.validated) {
					request.component.setStatus("confirming", t("command.omfg.unconfirmedStatus"));
					const shouldSave = await this.ctx.showHookConfirm(
						t("command.omfg.validationTitle"),
						t("command.omfg.validationMessage"),
					);
					if (!this.#isActiveRequest(request)) return;
					if (!shouldSave) {
						request.component.markRejected();
						return;
					}
				}

				const saveResult = await this.#saveCandidate(request, candidate);
				if (!this.#isActiveRequest(request)) return;
				if (saveResult.kind !== "amend") {
					return;
				}

				candidate = await this.#generateCandidate(request, {
					initialFeedback: `User requested this amendment before saving:\n${saveResult.feedback}`,
					previousRule: candidate.fileContent,
				});
			}
		} catch (error) {
			if (!this.#isActiveRequest(request)) {
				return;
			}
			if (request.abortController.signal.aborted) {
				request.component.markAborted();
				return;
			}
			request.component.markError(error instanceof Error ? error.message : String(error));
		}
	}

	async #generateCandidate(
		request: OmfgRequest,
		options: GenerateCandidateOptions = {},
	): Promise<OmfgCandidate | undefined> {
		const failedAttempts = options.initialFeedback ? [options.initialFeedback] : [];
		let previousRule = options.previousRule;
		let lastCandidate: ParsedGeneratedRule | undefined;

		for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
			if (this.#shouldStop(request)) return undefined;
			request.component.setRule("");
			request.component.setStatus("generating", t("command.omfg.attemptGenerating", { attempt, max: MAX_ATTEMPTS }));
			const promptText = prompt.render(omfgUserPrompt, {
				complaint: request.complaint,
				feedback: failedAttempts.length > 0 ? failedAttempts.join("\n\n") : undefined,
				previousRule,
			});
			const { replyText } = await this.ctx.session.runEphemeralTurn({
				promptText,
				dedupeReply: false,
				onTextDelta: delta => {
					if (this.#isActiveRequest(request)) {
						request.component.appendDraft(delta);
					}
				},
				signal: request.abortController.signal,
			});
			if (this.#shouldStop(request)) return undefined;

			const parsed = parseGeneratedRule(replyText);
			if ("error" in parsed) {
				const failedRule = extractGeneratedRuleJson(replyText) ?? replyText.trim();
				failedAttempts.push(
					`Attempt ${attempt} failed: invalid rule (${parsed.error}).\nFailed candidate:\n${failedRule}`,
				);
				previousRule = failedRule;
				request.component.setStatus(
					"validating",
					t("command.omfg.attemptDetail", { attempt, max: MAX_ATTEMPTS, detail: parsed.error }),
				);
				continue;
			}

			request.component.setRule(parsed.fileContent);
			request.component.setStatus("validating", t("command.omfg.attemptValidating", { attempt, max: MAX_ATTEMPTS }));
			const validated = validateParsedRuleAgainstAssistantHistory(parsed, this.ctx.session.messages);
			if (validated.repairedCondition) {
				request.component.setRule(validated.candidate.fileContent);
			}
			if (validated.validation.matched) {
				return { ...validated.candidate, validated: true };
			}

			lastCandidate = validated.candidate;
			const failure =
				validated.validation.feedback ?? "The rule condition did not match any earlier assistant output.";
			failedAttempts.push(
				`Attempt ${attempt} failed validation:\n${failure}\nFailed candidate:\n${validated.candidate.fileContent}`,
			);
			previousRule = validated.candidate.fileContent;
		}

		return lastCandidate ? { ...lastCandidate, validated: false } : undefined;
	}

	async #saveCandidate(request: OmfgRequest, candidate: OmfgCandidate): Promise<SaveCandidateResult> {
		if (this.#shouldStop(request)) return { kind: "aborted" };

		for (;;) {
			request.component.setStatus("saving", t("command.omfg.saveStatus"));
			const projectOption = t("command.omfg.saveProject");
			const globalOption = t("command.omfg.saveGlobal");
			const amendOption = t("command.omfg.saveAmend");
			const location = await this.ctx.showHookSelector(t("command.omfg.saveTitle"), [
				projectOption,
				globalOption,
				amendOption,
			]);
			if (!this.#isActiveRequest(request)) return { kind: "aborted" };
			if (!location) {
				request.component.markAborted();
				this.#closeActiveRequest({ abort: false });
				return { kind: "aborted" };
			}

			if (location === amendOption) {
				request.component.setStatus("confirming", t("command.omfg.amendStatus"));
				const amendment = await this.ctx.showHookInput(
					t("command.omfg.amendTitle"),
					t("command.omfg.amendPlaceholder"),
				);
				if (!this.#isActiveRequest(request)) return { kind: "aborted" };
				const feedback = amendment?.trim();
				if (!feedback) continue;
				return { kind: "amend", feedback };
			}

			const target = this.#resolveTarget(location === globalOption, candidate.rule.name);
			if (await Bun.file(target.filePath).exists()) {
				const shouldOverwrite = await this.ctx.showHookConfirm(
					t("command.omfg.overwriteTitle"),
					t("command.omfg.overwriteMessage", { path: shortenPath(target.filePath) }),
				);
				if (!this.#isActiveRequest(request)) return { kind: "aborted" };
				if (!shouldOverwrite) {
					request.component.markRejected();
					return { kind: "rejected" };
				}
			}

			request.component.setStatus("saving", t("command.omfg.saving", { name: candidate.rule.name }));
			await Bun.write(target.filePath, candidate.fileContent);
			// Drop the cached directory snapshot the discovery layer reads, so the next
			// session-scoped rebuild's rule rediscovery observes this new file instead of
			// a stale listing that would make `replaceTtsrRules` evict the live rule
			// registered below (issue #10940 review). Invalidating the file clears its
			// parent (rules dir); invalidating that dir clears its parent (the config dir)
			// so a first-ever rule in a freshly created `.omp/rules` is still discovered.
			invalidateCapabilityCache(target.filePath);
			invalidateCapabilityCache(path.dirname(target.filePath));
			if (!this.#isActiveRequest(request)) return { kind: "aborted" };

			const savedRule = buildOmfgRuleForPath(
				candidate.rule.name,
				candidate.fileContent,
				target.filePath,
				target.level,
			);
			this.#registerLive(savedRule);
			request.component.markSaved(shortenPath(target.filePath));
			return { kind: "saved" };
		}
	}

	/** `global` selects the user-level rules dir; the selector's own label comparison stays at the call site. */
	#resolveTarget(global: boolean, ruleName: string): { filePath: string; level: OmfgRuleSourceLevel } {
		if (global) {
			return {
				filePath: path.join(this.ctx.settings.getAgentDir(), "rules", `${ruleName}.md`),
				level: "user",
			};
		}
		return {
			filePath: path.join(this.ctx.sessionManager.getCwd(), CONFIG_DIR_NAME, "rules", `${ruleName}.md`),
			level: "project",
		};
	}

	#registerLive(rule: Rule): void {
		this.ctx.session.ttsrManager?.addRule(rule);
	}

	#closeActiveRequest(options: { abort: boolean }): void {
		const request = this.#activeRequest;
		if (!request) return;
		this.#activeRequest = undefined;
		if (options.abort) {
			request.abortController.abort();
		}
		request.component.close();
		this.ctx.omfgContainer.clear();
		this.ctx.ui.requestRender();
	}

	#isActiveRequest(request: OmfgRequest): boolean {
		return this.#activeRequest === request;
	}

	#shouldStop(request: OmfgRequest): boolean {
		return !this.#isActiveRequest(request) || request.abortController.signal.aborted;
	}
}
