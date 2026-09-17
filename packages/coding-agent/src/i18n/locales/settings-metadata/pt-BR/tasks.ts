import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the tasks tab. */
export const tasks: SettingsLocaleTable = {
	tabs: { tasks: "Tarefas" },
	groups: {
		tasks: {
			Modes: "Modos",
			Subagents: "Subagentes",
			Isolation: "Isolamento",
			"Commands & Skills": "Comandos e Skills",
		},
	},
	paths: {
		"plan.enabled": {
			label: "Modo Plano",
			description: "Ativa o modo plano para exploração somente-leitura e planejamento antes da execução",
		},
		"plan.defaultOnStartup": {
			label: "Iniciar em Modo Plano",
			description: "Entra automaticamente no modo plano no começo de cada nova sessão",
		},
		"plan.autosave": {
			label: "Salvar Planos Automaticamente",
			description: "Salva em disco, automaticamente, os planos aprovados quando o modo plano termina",
		},
		"plan.autosaveDir": {
			label: "Diretório de Salvamento Automático",
			description:
				"Diretório dos planos salvos automaticamente. Aceita ~, caminhos absolutos e caminhos relativos ao cwd. Vazio usa <project>/.omp/plans/.",
		},
		"goal.enabled": {
			label: "Modo Objetivo",
			description: "Ativa o modo objetivo por sessão e a ferramenta oculta goal",
		},
		"goal.statusInFooter": {
			label: "Status do Objetivo no Rodapé",
			description: "Mostra o orçamento de tokens ao lado do indicador de objetivo na linha de status",
		},
		"goal.continuationModes": {
			label: "Modos de Continuação do Objetivo",
			description: "Modos de execução em que objetivos ativos podem continuar automaticamente entre turnos",
		},
		"title.refreshOnReplan": {
			label: "Atualizar Título ao Replanejar",
			description:
				"Atualiza os títulos de sessão gerados após replanejamentos na inicialização das tarefas, a menos que o título tenha sido definido pelo usuário",
		},
		"task.isolation.enabled": {
			label: "Isolar Subagentes",
			description: "Roda os subagentes em uma cópia isolada do checkout e integra as mudanças deles depois",
		},
		"isolation.backend": {
			label: "Backend de Isolamento",
			description: "Backend usado para o isolamento de subagentes e a clonagem de worktrees",
		},
		"worktree.clone": {
			label: "Clonar Checkout nas Worktrees",
			description:
				"Worktrees novas criadas por `github pr_checkout` e por `git worktree add` no bash começam como um clone copy-on-write do checkout atual, para que artefatos de build ignorados (node_modules, target) venham junto; cai para um checkout simples quando o sistema de arquivos não consegue clonar",
		},
		"worktree.cleanSource": {
			label: "Limpar Checkout de Origem no /wt",
			description:
				"Ao criar uma worktree com `/wt`, reverte as mudanças rastreadas e remove os arquivos não rastreados do checkout original depois de levá-los para a worktree",
		},
		"task.isolation.apply": {
			label: "Aplicar Mudanças Isoladas",
			description:
				"Aplica automaticamente ao checkout pai as mudanças de tarefas isoladas bem-sucedidas; desative para manter os artefatos de patch ou de branch",
		},
		"task.isolation.merge": {
			label: "Estratégia de Merge do Isolamento",
			description: "Como as mudanças de tarefas isoladas são integradas (aplicação de patch ou merge de branch)",
		},
		"task.isolation.commits": {
			label: "Estilo de Commit do Isolamento",
			description: "Estilo da mensagem de commit para mudanças em repos aninhados (genérico ou gerado por IA)",
		},
		"worktree.base": {
			label: "Diretório Base das Worktrees",
			description:
				"Diretório base das worktrees gerenciadas pelo agente — cópias de isolamento de tarefas, checkouts de PR do `github` e a limpeza do `omp worktree` ficam todos aqui. Sem valor, usa ~/.omp/wt. Precisa ser um caminho absoluto ou relativo a ~; caminhos relativos são ignorados. A variável de ambiente OMP_WORKTREE_DIR sobrescreve isso.",
		},
		"task.eager": {
			label: "Preferir Delegação de Tarefas",
			description: "Com que intensidade incentivar a delegação de trabalho para subagentes",
		},
		"task.batch": {
			label: "Chamadas de Tarefa em Lote",
			description:
				"Muda a ferramenta task para o formato em lote: uma chamada carrega { context, tasks[] } — um subagente por item, com agent opcional por item (o padrão é o agente da política de spawn da sessão), isolamento por item e um contexto compartilhado obrigatório, prefixado a toda atribuição. Com async.enabled=true, cada spawn roda como um agente independente em background, com o ciclo de vida normal de idle/parked; caso contrário a chamada bloqueia esperando os resultados combinados. Desative para voltar ao schema plano de spawn único.",
		},
		"task.enableEffort": {
			label: "Esforço por Tarefa",
			description:
				"Expõe o parâmetro opcional effort nos spawns de tarefa, permitindo que quem chama sobrescreva o nível de raciocínio de cada subagente",
		},
		"task.maxConcurrency": {
			label: "Máximo de Tarefas Simultâneas",
			description: "Número máximo de subagentes rodando ao mesmo tempo",
		},
		"task.enableLsp": {
			label: "LSP nos Subagentes",
			description:
				"Permite que os subagentes criados pela ferramenta task usem a ferramenta lsp. Desligado por padrão para manter os subagentes baratos; ative quando a delegação com LSP valer os tokens extras.",
		},
		"task.maxRecursionDepth": {
			label: "Recursão Máxima de Tarefas",
			description: "Quantos níveis de profundidade os subagentes podem criar os próprios subagentes",
		},
		"task.maxRuntimeMs": {
			label: "Tempo Máximo de Execução do Subagente",
			description:
				"Limite rígido de tempo real por subagente (ms). 0 desativa. Defesa em profundidade contra travamentos de stream do lado do provedor que escapam do watchdog da camada de inferência; dispara um abort normal do subagente com o motivo 'timed out'.",
		},
		"task.agentIdleTtlMs": {
			label: "TTL de Subagente Ocioso",
			description:
				"Quanto tempo um subagente ocioso fica vivo em memória antes de ser movido para disco no estado parked (ms). Agentes em parked são revividos automaticamente quando recebem mensagem ou são retomados. 0 mantém os agentes ociosos vivos até saírem.",
		},
		"task.softRequestBudget": {
			label: "Orçamento Suave de Requisições do Subagente",
			description:
				"Orçamento suave de requisições por subagente (requisições de assistente por execução). Ao cruzá-lo, um aviso de steering pedindo o encerramento é injetado (veja task.softRequestBudgetNotice); em 1,5x o orçamento a execução é interrompida à força e o agente precisa entregar os achados parciais. 0 desativa a proteção. Os agentes scout/sonic embutidos têm um orçamento interno menor, então um valor abaixo desse teto continua valendo para eles.",
		},
		"task.softRequestBudgetNotice": {
			label: "Aviso de Orçamento Suave de Requisições",
			description:
				"Injeta um aviso de steering quando um subagente cruza seu orçamento suave de requisições, pedindo que ele encerre antes da parada forçada em 1,5x.",
		},
		"task.maxEffort": {
			label: "Esforço Máximo por Spawn",
			description:
				"Esforço de raciocínio máximo permitido para a dica de effort por spawn da ferramenta task. Valores mais baixos impedem que quem chama escale subagentes acima desse teto; o padrão preserva toda a faixa do modelo.",
		},
		"task.prewalk": {
			label: "Prewalk da Tarefa Genérica",
			description:
				"Arma o prewalk para o subagente `task` genérico embutido: ele começa no modelo resolvido, planeja e inicia a implementação, e depois transfere para o papel 'smol' na primeira edição/escrita. Overrides por agente (task.agentPrewalk, configurado no hub /agents) e o frontmatter `prewalk` de agentes do usuário valem independentemente deste toggle.",
		},
		"skills.enableSkillCommands": {
			label: "Comandos de Skills",
			description: "Registra as skills como comandos /skill:name",
		},
		"commands.enableClaudeUser": {
			label: "Comandos de Usuário do Claude",
			description: "Carrega comandos de ~/.claude/commands/",
		},
		"commands.enableClaudeProject": {
			label: "Comandos de Projeto do Claude",
			description: "Carrega comandos de .claude/commands/",
		},
		"commands.enableOpencodeUser": {
			label: "Comandos de Usuário do OpenCode",
			description: "Carrega comandos de ~/.config/opencode/commands/",
		},
		"commands.enableOpencodeProject": {
			label: "Comandos de Projeto do OpenCode",
			description: "Carrega comandos de .opencode/commands/",
		},
	},
	options: {
		"isolation.backend": {
			auto: { label: "Auto", description: "Deixa o PAL escolher o melhor backend disponível" },
			apfs: { label: "APFS", description: "Reflink clonefile do macOS (APFS)" },
			btrfs: { label: "btrfs", description: "Snapshot de subvolume btrfs" },
			zfs: { label: "ZFS", description: "Snapshot + clone do ZFS" },
			reflink: { label: "Reflink", description: "Reflink por arquivo via FICLONE no Linux" },
			overlayfs: { label: "Overlayfs", description: "Overlay do kernel Linux (ou fallback fuse-overlayfs)" },
			projfs: { label: "ProjFS", description: "Windows Projected File System" },
			"block-clone": { label: "Block clone", description: "FSCTL_DUPLICATE_EXTENTS_TO_FILE do Windows (NTFS/ReFS)" },
			rcopy: { label: "Cópia recursiva", description: "git worktree quando disponível, senão cópia recursiva" },
		},
		"task.isolation.merge": {
			patch: { label: "Patch", description: "Combina os diffs e usa git apply" },
			branch: { label: "Branch", description: "Um commit por tarefa, merge com --no-ff" },
		},
		"task.isolation.commits": {
			generic: { label: "Genérico", description: "Mensagem de commit estática" },
			ai: { label: "IA", description: "Mensagem de commit gerada por IA a partir do diff" },
		},
		"task.eager": {
			default: {
				label: "Padrão",
				description: "Usa a política do modelo selecionado; alguns modelos exigem um pedido explícito de delegação",
			},
			preferred: { label: "Preferido", description: "Adiciona orientação de delegação ao prompt de sistema" },
			always: {
				label: "Sempre",
				description: "Orientação no prompt mais um lembrete de delegação no primeiro turno",
			},
		},
		"task.maxConcurrency": {
			"0": { label: "Ilimitado" },
			"1": { label: "1 tarefa" },
			"2": { label: "2 tarefas" },
			"4": { label: "4 tarefas" },
			"8": { label: "8 tarefas" },
			"16": { label: "16 tarefas" },
			"32": { label: "32 tarefas" },
			"64": { label: "64 tarefas" },
		},
		"task.maxRecursionDepth": {
			"-1": { label: "Ilimitado" },
			"0": { label: "Nenhum" },
			"1": { label: "Simples" },
			"2": { label: "Duplo" },
			"3": { label: "Triplo" },
		},
		"task.maxRuntimeMs": {
			"0": { label: "Ilimitado", description: "Padrão" },
			"300000": { label: "5 minutos" },
			"900000": { label: "15 minutos" },
			"1800000": { label: "30 minutos" },
			"3600000": { label: "1 hora" },
		},
		"task.softRequestBudget": {
			"0": { label: "Desativado" },
			"90": { label: "90 requisições" },
			"150": { label: "150 requisições" },
			"200": { label: "200 requisições", description: "Padrão" },
		},
		"task.maxEffort": {
			minimal: { label: "min", description: "Raciocínio muito breve (~1k tokens)" },
			low: { label: "low", description: "Raciocínio leve (~2k tokens)" },
			medium: { label: "medium", description: "Raciocínio moderado (~8k tokens)" },
			high: { label: "high", description: "Raciocínio profundo (~16k tokens)" },
			xhigh: { label: "xhigh", description: "Raciocínio estendido (~32k tokens)" },
			max: { label: "max", description: "O máximo de raciocínio que o modelo suporta" },
		},
	},
};
