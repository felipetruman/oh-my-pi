import type { TranslationTable } from "../../keys";

/** Filled by the auth migration task. */
export const auth: TranslationTable = {
	// ── Shared account chrome ─────────────────────────────────────────────
	"auth.account.activeTag": " (ativa)",

	// ── Provider picker (`/login`, `/logout`) ─────────────────────────────
	"auth.oauth.checking": "verificando",
	"auth.oauth.emptyLogin": "Nenhum provedor OAuth disponível",
	"auth.oauth.emptyLogout": "Nenhuma credencial de provedor salva para sair",
	"auth.oauth.invalid": "inválida",
	"auth.oauth.loggedIn": "conectado",
	"auth.oauth.loginTitle": "Selecione o provedor para entrar",
	"auth.oauth.logoutTitle": "Selecione o provedor para sair",
	"auth.oauth.noMatches": "Nenhum provedor correspondente",
	"auth.oauth.searchPrefix": "Buscar: {query}",
	"auth.oauth.typeToSearch": "Digite para buscar",
	"auth.oauth.unavailable": "Provedor indisponível neste ambiente.",
	// Mantém os termos em inglês junto dos traduzidos: a lista nunca mostra
	// este texto, então as duas grafias apenas ampliam o que a busca encontra.
	"auth.oauth.searchKeywords.authenticated": "conectado autenticado logged in authenticated",
	"auth.oauth.searchKeywords.unavailable": "indisponível unavailable",

	// ── Login dialog (OAuth flow) ─────────────────────────────────────────
	"auth.login.cancelled": "Login cancelado",
	"auth.login.clickHint": "Ctrl+clique para abrir",
	"auth.login.clickHintMac": "Cmd+clique para abrir",
	"auth.login.escapeOrEnter": "(Escape para cancelar, Enter para enviar)",
	"auth.login.escapeToCancel": "(Escape para cancelar)",
	"auth.login.localShortcut": "Atalho local (apenas nesta máquina): {url}",
	"auth.login.placeholderExample": "ex.: {value}",
	"auth.login.title": "Entrar em {provider}",

	// ── Account picker (`/logout <provider>`) ─────────────────────────────
	"auth.logout.accountTitle": "Selecione a conta {provider} para sair",
	"auth.logout.empty": "Nenhuma conta salva para sair",
	"auth.logout.footerHint": "↑/↓ selecionar · ↵ sair da conta · Esc cancelar",

	// ── Saved rate-limit resets (`/usage reset`) ──────────────────────────
	"auth.resetUsage.confirmHint": "Pressione Enter novamente para usar 1 reset de {label}, Esc para cancelar",
	"auth.resetUsage.empty": "Nenhuma conta Codex com resets salvos",
	"auth.resetUsage.footerHint": "↑/↓ selecionar · ↵ usar um reset · Esc cancelar",
	"auth.resetUsage.noneAvailable": "Essa conta não tem resets salvos para usar.",
	"auth.resetUsage.savedCountOne": "1 reset salvo",
	"auth.resetUsage.savedCountOther": "{count} resets salvos",
	"auth.resetUsage.title": "Usar um reset de limite de uso salvo",
};
