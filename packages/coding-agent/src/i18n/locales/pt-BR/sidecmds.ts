import type { TranslationTable } from "../../keys";

/** Comandos laterais: `/btw`, `/tan`, `/todo` e `/ssh`. */
export const sidecmds: TranslationTable = {
	// ── `/btw` ────────────────────────────────────────────────────────────
	"btw.actionInProgress": "Uma ação do /btw está em andamento. Aguarde.",
	"btw.branchInProgress": "A ramificação do /btw está em andamento",
	"btw.branchUnavailable": "Ramificação do /btw indisponível: {reason}",
	"btw.cannotBranch": "Não foi possível ramificar o /btw: {error}",
	"btw.cannotOpenHistory": "Não foi possível abrir o histórico do /btw: {error}",
	"btw.copiedAnswer": "Resposta do /btw copiada para a área de transferência",
	"btw.historySaveFailed": "Não foi possível salvar o histórico do /btw: {error}",
	"btw.historySaveStopped":
		"Não foi possível salvar o histórico do BTW: {error}. A operação de sessão foi interrompida; tente novamente após resolver o armazenamento. As respostas não salvas continuam no /btw.",
	"btw.historySaving":
		"O histórico do BTW ainda está sendo salvo. A operação de sessão foi interrompida; tente novamente quando o armazenamento responder.",
	"btw.noModel": "Nenhum modelo ativo disponível para o /btw.",
	"btw.questionRunning": "Uma pergunta do /btw ainda está em execução. Abra o /btw para vê-la ou cancele-a primeiro.",
	"btw.sessionChangedWhileOpening": "A sessão mudou durante a abertura do histórico do BTW.",
	"btw.sideConversationUnavailable": "Esta conversa paralela está indisponível ou ainda em execução.",
	"btw.waitBeforeMoving": "Aguarde a resposta atual do /btw terminar ou cancele-a antes de mover.",

	// ── Impedimentos de ramificação do `/btw` ─────────────────────────────
	"btw.reason.branchInProgress": "já há uma ramificação em andamento",
	"btw.reason.multiTurnHistory": "conversas paralelas de várias mensagens permanecem no histórico do BTW",
	"btw.reason.noBranchPoint": "a sessão não tem ponto de ramificação",
	"btw.reason.notReady": "a resposta não está pronta",
	"btw.reason.sessionChanged": "a sessão mudou desde que o /btw começou",
	"btw.reason.sessionOperation": "há uma operação de sessão em andamento",
	"btw.reason.turnRunning": "um turno ainda está em execução",
	"btw.reason.unavailable": "a resposta está indisponível",

	// ── `/tan` ────────────────────────────────────────────────────────────
	"tan.backgroundJobsDisabled": "Os jobs em background estão desativados; ative os jobs assíncronos para usar o /tan.",
	"tan.dispatched": "Tan em background despachado: {jobId}",
	"tan.noModel": "Nenhum modelo ativo disponível para o /tan.",
	"tan.requiresPersistedSession": "O /tan exige uma sessão persistida.",
	"tan.usage": "Uso: /tan <work>",

	// ── Bloco de uso do `/todo` ───────────────────────────────────────────
	"todo.usage.append": "Acrescenta uma tarefa; fase por correspondência aproximada ou criada automaticamente",
	"todo.usage.collapse": "Restaura a pré-visualização limitada do HUD",
	"todo.usage.copy": "Copia os todos como Markdown para a área de transferência",
	"todo.usage.done": "Marca tarefa/fase/tudo como concluído",
	"todo.usage.drop": "Marca tarefa/fase/tudo como descartado",
	"todo.usage.edit": "Abre os todos no $EDITOR",
	"todo.usage.expand": "Mostra todas as fases e tarefas no HUD",
	"todo.usage.export": "Grava os todos em arquivo (padrão: TODO.md)",
	"todo.usage.header": "Uso: /todo <verb> [args]",
	"todo.usage.import": "Substitui os todos a partir de um arquivo (padrão: TODO.md)",
	"todo.usage.rm": "Remove tarefa/fase/tudo",
	"todo.usage.show": "Mostra os todos atuais",
	"todo.usage.start": "Marca a tarefa como in_progress (correspondência aproximada do conteúdo)",

	// ── Contagens do `/todo` ──────────────────────────────────────────────
	"todo.phaseCountOne": "{count} fase",
	"todo.phaseCountOther": "{count} fases",
	"todo.taskCountOne": "{count} tarefa",
	"todo.taskCountOther": "{count} tarefas",

	// ── Resultados do `/todo` ─────────────────────────────────────────────
	"todo.appendUsage": "Uso: /todo append [<phase>] <task...>",
	"todo.appended": "Acrescentado em {phase}: {task}",
	"todo.clearedAll": "Lista de todos limpa.",
	"todo.copied": "Todos copiados como Markdown para a área de transferência.",
	"todo.editorNoSave": "O editor saiu sem salvar; os todos não foram alterados.",
	"todo.empty": "Nenhum todo. Use /todo append <task> para criar um.",
	"todo.exportFailed": "Falha ao gravar os todos: {error}",
	"todo.exported": "Todos gravados em {path}",
	"todo.imported": "Importado de {path}: {phases}, {tasks}.",
	"todo.markedAbandoned": "Marcado como descartado: {task}",
	"todo.markedAllAbandoned": "Todas as tarefas foram marcadas como descartadas.",
	"todo.markedAllCompleted": "Todas as tarefas foram marcadas como concluídas.",
	"todo.markedCompleted": "Marcado como concluído: {task}",
	"todo.markedPhaseAbandoned": "Fase {phase} marcada como descartada.",
	"todo.markedPhaseCompleted": "Fase {phase} marcada como concluída.",
	"todo.noTaskMatched": 'Nenhuma tarefa corresponde a "{query}". Use /todo para listar as tarefas atuais.',
	"todo.noTaskOrPhaseMatched": 'Nenhuma tarefa ou fase corresponde a "{query}".',
	"todo.noneToCopy": "Nenhum todo para copiar.",
	"todo.noneToExport": "Nenhum todo para exportar.",
	"todo.parseFileFailed": "Não foi possível interpretar {path}:",
	"todo.parseMarkdownFailed": "Não foi possível interpretar o Markdown:",
	"todo.readFailed": "Falha ao ler os todos: {error}",
	"todo.removed": "Removido: {task}",
	"todo.removedPhase": "Fase removida: {phase}",
	"todo.startUsage": "Uso: /todo start <task>",
	"todo.started": "Iniciado: {task}",
	"todo.unknownVerb": 'Verbo do /todo desconhecido: "{verb}".',
	"todo.updatedFromEditor": "Todos atualizados pelo editor: {phases}, {tasks}.",

	// ── `/ssh help` ───────────────────────────────────────────────────────
	"ssh.help.intro": "Gerencie configurações de hosts SSH para executar comandos remotos.",
	"ssh.help.list": "Lista todos os hosts SSH configurados",
	"ssh.help.remove": "Remove um host SSH (padrão: project)",
	"ssh.help.title": "Gerenciamento de Hosts SSH",

	// ── Leitura dos argumentos do `/ssh` ──────────────────────────────────
	"ssh.errHostNameRequired": "Nome do host obrigatório. Uso: {usage}",
	"ssh.errHostRequired": "--host é obrigatório. Uso: {usage}",
	"ssh.errInvalidPort": "Valor inválido para --port. Deve ser um inteiro entre 1 e 65535.",
	"ssh.errMissingDescValue": "Valor ausente para --desc.",
	"ssh.errMissingHostValue": "Valor ausente para --host.",
	"ssh.errMissingKeyValue": "Valor ausente para --key.",
	"ssh.errMissingPortValue": "Valor ausente para --port.",
	"ssh.errMissingUserValue": "Valor ausente para --user.",
	"ssh.errUnknownSubcommand": "Subcomando desconhecido: {subcommand}. Digite /ssh help para ver o uso.",
	"ssh.usage": "Uso: {usage}",

	// ── `/ssh add` ────────────────────────────────────────────────────────
	"ssh.addedHost": 'Host SSH "{name}" adicionado à configuração {scope}',
	"ssh.errAddFailed": "Falha ao adicionar o host: {error}",
	"ssh.runListHint": "Execute {command} para ver todos os hosts configurados.",
	"ssh.tipRemoveFirst": "Dica: use {command} primeiro ou escolha outro nome.",

	// ── `/ssh list` ───────────────────────────────────────────────────────
	"ssh.errListFailed": "Falha ao listar os hosts: {error}",
	"ssh.listDiscovered": "Descobertos",
	"ssh.listEmpty": "Nenhum host SSH configurado.",
	"ssh.listEmptyHint": "Use {command} para adicionar um host.",
	"ssh.listTitle": "Hosts SSH configurados",

	// ── `/ssh remove` ─────────────────────────────────────────────────────
	"ssh.errHostNotFoundInScope": 'Host "{name}" não encontrado na configuração {scope}.',
	"ssh.errRemoveFailed": "Falha ao remover o host: {error}",
	"ssh.removedHost": 'Host SSH "{name}" removido da configuração {scope}',
};
