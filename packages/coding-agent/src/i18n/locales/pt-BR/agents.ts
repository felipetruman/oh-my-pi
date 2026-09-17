import type { TranslationTable } from "../../keys";

/** Filled by the agents migration task. */
export const agents: TranslationTable = {
	// ── Agent transcript viewer (fullscreen) ──────────────────────────────
	"agentView.title": "Hub de Agentes",
	"agentView.header.ofParent": "de {parent}",
	"agentView.status.aborted": "abortado",
	"agentView.status.idle": "ocioso",
	"agentView.status.parked": "estacionado",
	"agentView.status.running": "executando",
	"agentView.footer.hintReadOnly": "Esc:fechar  {expandKey}:expandir  j/k:rolar  g/G:início/fim",
	"agentView.footer.hintSendable":
		"Enter:enviar  Esc:fechar  {expandKey}:expandir  entrada vazia → j/k:rolar  g/G:início/fim",
	"agentView.placeholder.loadingRemote": "Carregando transcrição do host…",
	"agentView.placeholder.noMessages": "Nenhuma mensagem ainda.",
	"agentView.placeholder.noSessionFile": "Nenhum arquivo de sessão disponível ainda.",
	"agentView.placeholder.remoteUnavailable": "A transcrição fica no host — indisponível.",

	// ── Agent Hub roster metrics ──────────────────────────────────────────
	// As células de métrica têm largura fixa (8–13 colunas), por isso as
	// unidades ficam abreviadas como no inglês.
	"agentView.metric.duration": "{duration} duração",
	"agentView.metric.durationActive": "{duration} ativo",
	"agentView.metric.durationSpan": "{duration} total",
	"agentView.metric.requests": "{count} req",
	"agentView.metric.timeNone": "tempo —",
	"agentView.metric.tokens": "{count} tok",
	"agentView.metric.tools": "{count} ferr.",

	// ── Advisor transcript card ───────────────────────────────────────────
	"agentView.advisor.blockersOne": "{count} bloqueador",
	"agentView.advisor.blockersOther": "{count} bloqueadores",
	"agentView.advisor.moreNotesOne": "… +{count} nota restante",
	"agentView.advisor.moreNotesOther": "… +{count} notas restantes",
	"agentView.advisor.notesOne": "{count} nota",
	"agentView.advisor.notesOther": "{count} notas",
};
