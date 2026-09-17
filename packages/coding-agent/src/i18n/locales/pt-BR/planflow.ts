import type { TranslationTable } from "../../keys";

/**
 * Portuguese (Brazil) copy for the plan-review overlay, the goal-mode menu and
 * the runtime notices the interactive mode prints above the editor.
 */
export const planflow: TranslationTable = {
	// ── Plan review overlay (`/plan`, plan approval) ──────────────────────
	"planFlow.review.title": "Modo de plano - próximo passo",
	"planFlow.option.approveExecute": "Aprovar e executar",
	"planFlow.option.approveCompact": "Aprovar e compactar o contexto",
	"planFlow.option.keepContext": "Aprovar e manter o contexto",
	"planFlow.option.keepContextUsage": "Aprovar e manter o contexto (~{tokens} / {contextWindow})",
	"planFlow.option.refine": "Refinar o plano",
	"planFlow.option.saveAndQuit": "Salvar e sair",
	"planFlow.slider.continueWith": "continuar com",
	"planFlow.error.planFileNotFound": "Arquivo do plano não encontrado em {path}",
	"planFlow.error.invalidSavePath": "Caminho inválido para salvar o plano: {error}",
	"planFlow.error.saveToPathFailed": "Falha ao salvar o plano em {path}: {error}",
	"planFlow.error.savedButExitFailed": "Plano salvo em {path}, mas não foi possível sair do modo de plano: {error}",
	"planFlow.error.savedButNewSessionFailed":
		"Plano salvo em {path}, mas não foi possível iniciar uma nova sessão: {error}",
	"planFlow.error.saveFailed": "Falha ao salvar o plano: {error}",
	"planFlow.error.finalizeFailed": "Falha ao finalizar o plano aprovado: {error}",
	"planFlow.error.refineFailed": "Falha ao refinar o plano: {error}",
	"planFlow.warn.copyFailed": "Falha ao copiar o plano para a área de transferência: {error}",
	"planFlow.warn.autosaveFailed": "Falha ao salvar o plano automaticamente: {detail}",
	"planFlow.warn.compactionCancelled":
		"Plano aprovado, mas a compactação foi cancelada — execução não despachada. Envie um turno para continuar.",
	"planFlow.warn.planModelFailed": "Falha ao trocar para o modelo de plano do modo de plano: {error}",
	"planFlow.warn.executionModelFailed": "Não foi possível trocar para o modelo {role}: {error}",

	// ── Goal mode menu and details (`/goal`) ──────────────────────────────
	"goal.menu.title": "Meta: {summary} ({status})",
	"goal.menu.titlePaused": "Meta pausada: {summary}",
	"goal.menu.showDetails": "Ver detalhes",
	"goal.menu.adjustBudget": "Ajustar orçamento…",
	"goal.menu.pause": "Pausar",
	"goal.menu.resume": "Retomar",
	"goal.menu.drop": "Descartar",
	"goal.budgetPrompt": "Orçamento da meta (número, `off`, ou vazio para cancelar)",
	"goal.details.objective": "Objetivo: {objective}",
	"goal.details.status": "Status: {status}{paused}",
	"goal.details.tokens": "Tokens: {usage}",
	"goal.details.timeSpent": "Tempo gasto: {duration}",
	"goal.details.budgetUsage": "{used} / {total} ({left} restantes)",
	"goal.details.budgetNone": "{used} (sem orçamento)",

	// ── Loop mode banner (`/loop`) ────────────────────────────────────────
	"hud.status.loopEnabled":
		"Modo de loop ativado.{limit}{remaining}{condition} {tail} Esc cancela a iteração atual; /loop de novo para desativar.",
	"hud.status.loopLimitedTo": " Limitado a {limit}.",
	"hud.status.loopContinuing": " Continuando {condition}.",
	"hud.status.loopRepeatingPrompt": "Vai repeti-lo após cada turno.",
	"hud.status.loopRepeatNextPrompt": "O seu próximo prompt vai repetir após cada turno.",

	// ── Vibe mode banner (`/vibe`) ────────────────────────────────────────
	"hud.status.vibeEnabled":
		"Modo vibe ativado. Você conduz sessões de worker fast/good; o toolset é read + Todo do pai opcional + ferramentas vibe.",

	// ── Workspace, session and runtime notices ────────────────────────────
	"hud.status.cwdChangeFailed": "Não foi possível mudar o diretório de trabalho para {path}: {error}",
	"hud.status.cwdSwitchAndRestoreFailed":
		"Falha ao mudar para {path} ({error}), e a restauração do workspace anterior falhou: {restoreError}",
	"hud.status.persistenceFailed":
		"Falha na persistência da sessão: {detail}. As entradas não salvas permanecem em memória; a persistência tentará de novo na próxima entrada.",
	"hud.status.modelSwitchAfterStreamFailed": "Falha ao trocar de modelo após o streaming: {error}",
	"hud.status.lspStartupFailed": "Falha na inicialização do LSP: {error}. Vai tentar de novo na próxima escrita.",
	"hud.status.lspStartupFailedFor":
		"Falha na inicialização do LSP para {names}{detail}. Vai tentar de novo na próxima escrita.",
	"hud.status.shutdownFailed": "Falha ao encerrar: {error}",
	"hud.status.teardownFailedClose": "Não foi possível encerrar a sessão: {detail}",
	"hud.status.teardownFailedRestart": "Não foi possível reiniciar a sessão: {detail}",
	"hud.status.teardownForceQuitHint": "Pressione Ctrl+C de novo para sair sem salvar o log da sessão.",

	// ── `/btw` branch result (companion to sidecmds' btw.cannotBranch) ────
	"btw.branchedTo": "/btw ramificado para {name}",
	"btw.branched": "/btw ramificado",
};
