import type { TranslationTable } from "../../keys";

/** Superfícies de status, aviso e erro do controlador de UI de extensões. */
export const extui: TranslationTable = {
	// ── Confirmação de fallback por reserva do plano de código ────────────
	// `Não` acompanha o botão `common.no` do próprio diálogo.
	"extUi.reserve.marginReached": "dentro da margem de reserva configurada",
	"extUi.reserve.message": "{from} está {reserve}. Trocar para {to}? Escolha Não para continuar no plano atual.",
	"extUi.reserve.remaining": "com {percent}% restante",
	"extUi.reserve.title": "Reserva do plano de código atingida",

	// ── Status do fluxo de sessão ─────────────────────────────────────────
	"extUi.status.branched": "Ramificou para uma nova sessão",
	"extUi.status.reloaded": "Sessão recarregada",

	// ── Erros exibidos no chat ────────────────────────────────────────────
	// `sendMessage` e `sendUserMessage` são nomes de métodos da API.
	"extUi.error.extension": 'Erro na extensão "{path}": {error}',
	"extUi.error.sendMessage": "Falha no sendMessage da extensão: {error}",
	"extUi.error.sendUserMessage": "Falha no sendUserMessage da extensão: {error}",
	"extUi.error.tool": 'Erro na ferramenta "{name}": {error}',

	// ── Widgets e chrome do diálogo de perguntas ──────────────────────────
	"extUi.ask.draftGuardHint": "Termine ou limpe o prompt atual para responder",
	"extUi.widget.truncated": "... (widget truncado)",
};
