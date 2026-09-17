import type { TranslationTable } from "../../keys";

/** Selector controller, tree selector, branch/BTW history, move overlay, session account picker. */
export const navigation: TranslationTable = {
	// ── Advisor config overlay (`/advisor configure`) ─────────────────────
	"nav.advisor.savedNone": "WATCHDOG.yml de {scope} salvo. Execute /advisor on para ativar os advisors configurados.",
	"nav.advisor.savedOne": "WATCHDOG.yml de {scope} salvo — 1 advisor ativo.",
	"nav.advisor.savedOther": "WATCHDOG.yml de {scope} salvo — {count} advisors ativos.",

	// ── Settings side effects (`/settings`) ───────────────────────────────
	"nav.settings.externalThinkingFailed": "Falha ao aplicar o raciocínio externo: {error}",
	"nav.settings.memoryBackendFailed": "Falha ao aplicar o backend de memória: {error}",
	"nav.settings.mermaidFailed": "Falha ao aplicar a renderização Mermaid: {error}",
	"nav.settings.personalityFailed": "Falha ao aplicar a personalidade: {error}",
	"nav.settings.themeFailed": 'Falha ao carregar o tema "{theme}": {error}\nVoltou para o tema escuro.',
	"nav.settings.xdevDocsFailed": "Falha ao aplicar a configuração de docs xd:// no prompt: {error}",

	// ── Model roles and session-only switches ─────────────────────────────
	// Em português o escopo vem depois do substantivo, então `{scope}` carrega
	// o espaço à esquerda e é posicionado após o papel/nome.
	"nav.model.cycleCleared": "Ciclo de troca rápida limpo",
	"nav.model.cycleSet": "Ciclo de troca rápida: {order}",
	"nav.model.defaultSet": "Modelo padrão: {selector}",
	"nav.model.defaultSetScoped": "Modelo padrão{scope}: {selector}",
	"nav.model.fallbacksCleared": "Fallbacks de {role} limpos",
	"nav.model.fallbacksSet": "Fallbacks de {role}: {chain}",
	"nav.model.roleAssigned": "Modelo de {role}{scope}: {selector}",
	"nav.model.roleCleared": "Papel {role}{scope} limpo — a seleção automática se aplica",
	"nav.model.scopeGlobal": " global",
	"nav.model.scopeProject": " do projeto",
	"nav.model.sessionOnly": "Modelo só para esta sessão: {selector}. Use {key} ou /model para papéis.",
	"nav.model.taskSessionOnly": "Modelo dos subagentes Task (só nesta sessão): {selector}. Use /agents para persistir.",

	// ── Plugin marketplace selector (`/plugin`) ───────────────────────────
	"nav.plugin.installFailed": "Falha na instalação: {error}",
	"nav.plugin.installed": "{plugin} instalado de {marketplace}",
	"nav.plugin.installing": "Instalando {plugin} de {marketplace}...",
	"nav.plugin.uninstallFailed": "Falha na desinstalação: {error}",
	"nav.plugin.uninstalled": "{plugin} desinstalado",
	"nav.plugin.uninstalling": "Desinstalando {plugin}...",

	// ── Rewind selector (esc-esc) ─────────────────────────────────────────
	"nav.rewind.alreadyHere": "Você já está neste ponto",
	"nav.rewind.cancelled": "Navegação cancelada",
	"nav.rewind.done": "Retrocedeu para o ponto selecionado",
	"nav.rewind.noMessages": "Nenhuma mensagem para ramificar",

	// ── Copy selector ─────────────────────────────────────────────────────
	"nav.copy.copied": "{label} copiado para a área de transferência",
	"nav.copy.nothingInItem": "Nada para copiar neste item",
	"nav.copy.nothingYet": "Nada para copiar ainda.",
	"nav.copy.opening": "Abrindo {label}: {href}",

	// ── Re-answering a past `ask` from the tree ───────────────────────────
	// `Chat about this` é o rótulo reservado que a ferramenta ask compara.
	"nav.ask.chatRedirectUnavailable":
		"Chat about this não está disponível ao responder novamente pela árvore — escolha uma opção ou digite uma resposta personalizada.",
	"nav.ask.reanswerCancelled": "Nova resposta cancelada",
	"nav.ask.uiNotReady": "A interface da ferramenta ask não está pronta",

	// ── Branch summary prompt (`/tree`) ───────────────────────────────────
	"nav.summary.cancelled": "Resumo do branch cancelado",
	"nav.summary.customTitle": "Instruções personalizadas de resumo",
	"nav.summary.optionCustom": "Resumir com prompt personalizado",
	"nav.summary.optionNone": "Sem resumo",
	"nav.summary.optionSummarize": "Resumir",
	"nav.summary.running": "Resumindo o branch... (esc para cancelar)",
	"nav.summary.title": "Resumir o branch?",

	// ── Session picker, resume and delete ─────────────────────────────────
	"nav.session.deleteBody": "Isto apaga a sessão atual permanentemente.\nVocê voltará para o seletor de sessões.",
	"nav.session.deleteCancelled": "Exclusão cancelada",
	"nav.session.deleteFailed": "Falha ao excluir a sessão: {error}",
	"nav.session.deleteTitle": "Excluir Sessão",
	"nav.session.deleted": "Sessão excluída",
	"nav.session.foreignEmpty": "Nenhuma sessão do {source} encontrada",
	"nav.session.foreignListFailed": "Falha ao listar as sessões do {source}: {error}",
	"nav.session.foreignPersistFailed": "Falha ao salvar a sessão do {source}",
	"nav.session.foreignUnavailable": "A sessão do {source} selecionada não está mais disponível",
	"nav.session.importTitle": "Importar Sessão do {source}",
	"nav.session.noFileToDelete": "Nenhum arquivo de sessão para excluir (sessão em memória)",
	"nav.session.notSaved": "A sessão ainda não foi salva",
	"nav.session.resumed": "Sessão retomada",
	"nav.session.resumedIn": "Sessão retomada em {path}",
	"nav.session.settingsFlushFailed": "Falha ao salvar as configurações pendentes: {error}",

	// ── Provider login (`/login`) ─────────────────────────────────────────
	"nav.login.asAccount": " como {account}",
	"nav.login.credentialsSaved": "Credenciais salvas em {path}",
	"nav.login.failed": "Falha ao entrar: {error}",
	"nav.login.manualPrompt": "Cole o código de autorização (ou a URL de redirecionamento completa) e pressione Enter:",
	"nav.login.starting": "Entrando em {provider}…",
	"nav.login.success": "Entrou em {provider}{account} com sucesso",

	// ── Provider logout (`/logout`) ───────────────────────────────────────
	"nav.logout.credentialRemoved": "Credencial removida de {path}",
	"nav.logout.currentSourceSuffix": " A autenticação atual vem de {source}; remova essa origem para sair.",
	"nav.logout.failed": "Falha ao sair: {error}",
	"nav.logout.loadFailed": "Não foi possível carregar as credenciais salvas: {error}",
	"nav.logout.noCredentials": "Saída ignorada: nenhuma credencial salva para {provider}.{suffix}",
	"nav.logout.noProviders":
		"Nenhuma credencial de provedor salva para remover. Remova a autenticação de env ou config na origem.",
	"nav.logout.skippedAccount": "Saída ignorada: {account} não está mais salva para {provider}.",
	"nav.logout.stillAuthenticated": "{provider} ainda está autenticado via {source}",
	"nav.logout.success": "{account} saiu de {provider} com sucesso",

	// ── Session account pin (`/session pin`) ──────────────────────────────
	"nav.account.activeForSession": "ativa nesta sessão",
	"nav.account.pinTitle": "Selecione uma conta {provider} para esta sessão",
	"nav.pin.loadFailed": "Não foi possível carregar as contas do provedor: {error}",
	"nav.pin.loadingAccounts": "Carregando contas do provedor…",
	"nav.pin.noAccounts": "Nenhuma conta OAuth salva para {provider}. Use /login para adicionar uma.",
	"nav.pin.noAccountsWithSource": "Nenhuma conta OAuth salva para {provider}. A autenticação atual vem de {source}.",
	"nav.pin.pinned": "{account} fixada nesta sessão para {provider}.",
	"nav.pin.selectModelFirst": "Selecione um modelo antes de fixar uma conta de provedor.",
	"nav.pin.streaming": "Não é possível fixar uma conta enquanto a sessão está em streaming.",
	"nav.pin.unavailable": "{account} não está mais disponível para fixar.",

	// ── Saved rate-limit resets (`/reset-usage`) ──────────────────────────
	"nav.reset.checking": "Verificando resets de limite salvos…",
	"nav.reset.failed": "Falha no reset de {account}: {error}",
	"nav.reset.loadFailed": "Não foi possível carregar os resets salvos: {error}",
	"nav.reset.noAccounts": "Nenhuma conta Codex encontrada. Use /login para adicionar uma.",
	"nav.reset.noneAvailable": "Nenhum reset de limite salvo disponível para usar agora.",
	"nav.reset.noneReachable": "Nenhum reset salvo disponível — algumas contas não responderam (tente /login).",
	"nav.reset.spending": "Usando 1 reset salvo de {account}…",

	// ── Session tree overlay (`/tree`) ────────────────────────────────────
	"nav.tree.emptyClearSearch": "Pressione Backspace para limpar a busca",
	"nav.tree.emptyFiltered": "{count} entradas ocultas pelo filtro atual {filter}",
	"nav.tree.emptyNoEntries": "Nenhuma entrada encontrada",
	"nav.tree.emptyNoMatch": 'Nenhuma entrada corresponde à busca "{query}"',
	"nav.tree.emptyWidenFilter": "Pressione Alt+A para ver tudo, Alt+D para o padrão",
	"nav.tree.filterAll": " [tudo]",
	"nav.tree.filterDefault": "[padrão]",
	"nav.tree.filterLabeled": " [rotuladas]",
	"nav.tree.filterNoTools": " [sem ferramentas]",
	"nav.tree.filterUser": " [usuário]",
	"nav.tree.help":
		"Enter: trocar. Alt+↑/↓: turno anterior/seguinte. PgUp/PgDn (←/→): página. Home/End: primeiro/último item. Shift+Enter: resumir e trocar. Shift+L: rótulo. Ctrl+O: filtro. Alt+D/T/U/L/A: filtro. Digite para buscar",
	"nav.tree.labelHint": "enter: salvar  esc: cancelar",
	"nav.tree.labelPrompt": "Rótulo (vazio para remover):",
	"nav.tree.navigated": "Navegou para o ponto selecionado",
	"nav.tree.rowAborted": "(abortada)",
	"nav.tree.rowLabelCleared": "(limpo)",
	"nav.tree.rowNoContent": "(sem conteúdo)",
	"nav.tree.rowTierDefault": "(padrão)",
	"nav.tree.sessionEmpty": "Nenhuma entrada na sessão",
	"nav.tree.title": "Árvore da Sessão",

	// ── BTW side-question history (`/btw`) ────────────────────────────────
	"nav.btw.answer": "Resposta",
	"nav.btw.copiedDetail": "✓ Copiado para a área de transferência",
	"nav.btw.copiedHint": "✓ copiado · c para copiar de novo",
	"nav.btw.detailsPane": "Detalhes",
	"nav.btw.emptyDetail": "Nenhuma pergunta paralela ainda. Use /btw QUESTION para começar.",
	"nav.btw.emptyList": "Nenhuma pergunta paralela ainda.\n\nUse /btw QUESTION para começar.",
	"nav.btw.followUpBusy": "Uma requisição BTW está ocupada. Tente de novo quando ela terminar.",
	"nav.btw.followUpEmpty": "Digite uma pergunta de acompanhamento.",
	"nav.btw.followUpFailed":
		"Não foi possível iniciar o acompanhamento. Seu rascunho foi mantido; Enter para tentar de novo.",
	"nav.btw.followUpNotStarted":
		"O acompanhamento não foi iniciado. Seu rascunho foi mantido; Enter para tentar de novo.",
	"nav.btw.followUpPrompt": "Acompanhar: ",
	"nav.btw.followUpStarting": "Iniciando acompanhamento…",
	"nav.btw.hintClose": "fechar",
	"nav.btw.hintCopy": "copiar",
	"nav.btw.hintCopyAnswer": "copiar resposta",
	"nav.btw.hintFollowUp": "acompanhar",
	"nav.btw.hintScroll": "rolar",
	"nav.btw.hintSend": "enviar",
	"nav.btw.hintStarting": "iniciando…",
	"nav.btw.hintSwitchPane": "trocar painel",
	"nav.btw.historyPane": "Histórico ({count})",
	"nav.btw.noAnswerText": "Sem texto de resposta.",
	"nav.btw.notResumed": "Não retomada nesta visão.",
	"nav.btw.question": "Pergunta",
	"nav.btw.statusCancelled": "Cancelada",
	"nav.btw.statusComplete": "Concluída",
	"nav.btw.statusError": "Erro",
	"nav.btw.statusInterrupted": "Interrompida",
	"nav.btw.statusRunning": "Em execução",
	"nav.btw.title": "Histórico BTW",
	"nav.btw.topic": "Tópico: {question}",
	"nav.btw.waiting": "Aguardando resposta…",

	// ── `/move` overlay ───────────────────────────────────────────────────
	"nav.move.footerHint": "Digite para filtrar · ↑↓ navegar · Tab aceitar · Enter confirmar · Esc cancelar",
	"nav.move.noMatches": "Nenhum diretório correspondente",
	"nav.move.pathLabel": "Caminho: ",
	"nav.move.pathPlaceholder": "Digite o caminho de um diretório…",
	"nav.move.title": "Mover para o diretório",
};
