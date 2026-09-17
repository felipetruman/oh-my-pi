import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the tools tab. */
export const tools: SettingsLocaleTable = {
	tabs: { tools: "Ferramentas" },
	groups: {
		tools: {
			"Available Tools": "Ferramentas Disponíveis",
			Todos: "Tarefas (Todos)",
			"Grep & Browser": "Grep e Navegador",
			Computer: "Computador",
			GitHub: "GitHub",
			"Output Limits": "Limites de Saída",
			Execution: "Execução",
			"Discovery & MCP": "Descoberta e MCP",
			Extensions: "Extensões",
			Developer: "Desenvolvedor",
		},
	},
	paths: {
		"tools.artifactSpillThreshold": {
			label: "Limite para Salvar como Artefato (KB)",
			description: "Saída de ferramenta acima desse tamanho é salva como artefato; a parte final fica inline",
		},
		"tools.artifactTailBytes": {
			label: "Tamanho do Final do Artefato (KB)",
			description: "Quantidade de conteúdo final mantida inline quando a saída vira artefato",
		},
		"tools.artifactHeadBytes": {
			label: "Tamanho do Início do Artefato (KB)",
			description:
				"Quantidade de conteúdo inicial mantida inline junto com o final quando a saída vira artefato (elisão do meio). 0 desativa — mantém só o final.",
		},
		"tools.outputMaxColumns": {
			label: "Limite de Colunas da Saída",
			description:
				"Limite de bytes por linha para saídas de ferramenta em stream (bash, python, js eval) e para o `read`. Linhas mais largas são truncadas com elipse; os bytes restantes até a próxima quebra de linha são descartados. 0 desativa.",
		},
		"tools.artifactTailLines": {
			label: "Linhas do Final do Artefato",
			description: "Máximo de linhas de conteúdo final mantidas inline quando a saída vira artefato",
		},
		"todo.enabled": {
			label: "Tarefas (Todos)",
			description: "Ativa a ferramenta todo para acompanhamento de tarefas",
		},
		"todo.reminders": {
			label: "Lembretes de Tarefas",
			description: "Lembra o agente de concluir as tarefas pendentes antes de parar",
		},
		"todo.remindersMax": {
			label: "Limite de Lembretes de Tarefas",
			description: "Número máximo de lembretes de tarefas antes de desistir",
		},
		"todo.eager": {
			label: "Criar Tarefas Automaticamente",
			description:
				"Com que intensidade incentivar a criação automática da lista de tarefas após a primeira mensagem",
		},
		"glob.enabled": {
			label: "Glob",
			description: "Ativa a ferramenta glob para busca de arquivos por padrão glob",
		},
		"grep.enabled": {
			label: "Grep",
			description: "Ativa a ferramenta grep para busca de conteúdo por regex",
		},
		"grep.contextBefore": {
			label: "Contexto Grep Antes",
			description: "Linhas de contexto antes de cada ocorrência do grep",
		},
		"grep.contextAfter": {
			label: "Contexto Grep Depois",
			description: "Linhas de contexto depois de cada ocorrência do grep",
		},
		"astGrep.enabled": {
			label: "AST Grep",
			description: "Ativa a ferramenta ast_grep para busca estrutural na AST",
		},
		"astEdit.enabled": {
			label: "AST Edit",
			description: "Ativa a ferramenta ast_edit para reescritas estruturais na AST",
		},
		"debug.enabled": {
			label: "Debug",
			description: "Ativa a ferramenta debug para depuração via DAP",
		},
		"launch.enabled": {
			label: "Launch",
			description:
				"Ativa a ferramenta launch para supervisionar processos compartilhados e de longa duração do projeto",
		},
		"speechgen.enabled": {
			label: "Geração de Voz",
			description:
				"Ativa a ferramenta tts para sintetizar arquivos de fala no dispositivo (Kokoro) ou via xAI Grok Voice",
		},
		"generate_image.enabled": {
			label: "Gerar Imagem",
			description:
				"Ativa a ferramenta generate_image (geração e edição de imagens a partir de texto). Exposta como dispositivo xd:// quando tools.xdev está ativado.",
		},
		"computer.enabled": {
			label: "Computador",
			description: "Ativa o prelúdio de eval scriptável do desktop local (screenshots, entrada, acessibilidade)",
		},
		"computer.display": {
			label: "Monitor do Computador",
			description: "Compor todos os monitores ou selecionar um id de monitor nativo",
		},
		"computer.maxWidth": {
			label: "Largura do Screenshot do Computador",
			description: "Largura máxima do screenshot composto, em pixels",
		},
		"computer.maxHeight": {
			label: "Altura do Screenshot do Computador",
			description: "Altura máxima do screenshot composto, em pixels",
		},
		"images.questionTimeoutMs": {
			label: "Timeout de Pergunta sobre Imagem",
			description:
				"Timeout por requisição da chamada ao modelo de visão que atende as perguntas de imagem ?q= do read, em milissegundos. Um provedor travado falha rápido com erro de timeout em vez de bloquear até o cancelamento manual. Defina 0 para desativar o timeout.",
		},
		"checkpoint.enabled": {
			label: "Checkpoint/Rewind",
			description: "Ativa as ferramentas checkpoint e rewind para criar checkpoints do contexto",
		},
		"fetch.enabled": {
			label: "Ler URLs",
			description: "Permite que a ferramenta read busque e processe URLs",
		},
		"vault.enabled": {
			label: "Vault do Obsidian",
			description:
				"Ativa a URL interna vault:// para ler e editar conteúdo do vault do Obsidian pela CLI do Obsidian. Quando desativado, a resolução de vault:// é recusada e a entrada vault:// é omitida do prompt de sistema.",
		},
		"github.enabled": {
			label: "GitHub CLI",
			description:
				"Ativa a ferramenta github (dispatch por op para fluxos de repositório, issue, pull request, diff, busca, checkout, push e monitoramento do Actions)",
		},
		"github.cache.enabled": {
			label: "Cache de Visualização do GitHub",
			description:
				"Guarda em cache a saída renderizada de issue/PR em ~/.omp/cache/github-cache.db, para que leituras repetidas saiam de graça",
		},
		"github.cache.softTtlSec": {
			label: "TTL Suave do Cache do GitHub",
			description:
				"Dentro dessa janela, as linhas de issue/PR em cache são retornadas direto (em segundos; padrão 5 minutos)",
		},
		"github.cache.hardTtlSec": {
			label: "TTL Rígido do Cache do GitHub",
			description:
				"Passado o TTL suave, a linha em cache é retornada e atualizada em background; passado o TTL rígido, ela é descartada (em segundos; padrão 7 dias)",
		},
		"web_search.enabled": {
			label: "Busca na Web",
			description: "Ativa a ferramenta web_search para resultados da web ao vivo",
		},
		"security.enabled": {
			label: "Segurança",
			description:
				"Ativa o planejamento e a execução de scans de segurança nativos do OMP e o namespace de recursos somente-leitura security://",
		},
		"ask.enabled": {
			label: "Ask",
			description: "Ativa a ferramenta ask para perguntas interativas ao usuário",
		},
		"browser.enabled": {
			label: "Navegador",
			description: "Ativa o prelúdio de eval do navegador para automação de Chromium por script (Puppeteer)",
		},
		"browser.cdpUrl": {
			label: "URL CDP do Navegador",
			description:
				"Endpoint HTTP padrão de descoberta CDP (por exemplo http://127.0.0.1:9222) ao qual se conectar em vez de abrir um navegador. app.cdp_url ou app.path explícitos na chamada da ferramenta têm precedência.",
		},
		"browser.relay": {
			label: "Relay do Navegador",
			description:
				"Controle suas próprias abas do Chrome pelo relay de navegador do omp. Instale a extensão uma vez (`omp browser-relay install`); o servidor de relay sobe sozinho quando o prelúdio do navegador precisa dele. Tem precedência sobre a URL CDP do Navegador; defina PI_BROWSER_RELAY=0 ou PI_BROWSER_RELAY=1 para sobrescrever.",
		},
		"browser.relayUrl": {
			label: "URL do Relay do Navegador",
			description: "Endpoint do relay de navegador do omp (padrão http://127.0.0.1:9224).",
		},
		"browser.headless": {
			label: "Navegador Headless",
			description: "Abre o navegador em modo headless (desative para exibir a interface do navegador)",
		},
		"browser.cmux": {
			label: "Navegador cmux",
			description:
				"Usa as superfícies WKWebView do cmux para automação de navegador quando há um socket do cmux disponível. Defina PI_BROWSER_CMUX=0 ou PI_BROWSER_CMUX=1 para sobrescrever.",
		},
		"browser.freezeOnTurnEnd": {
			label: "Congelar Abas do Navegador no Fim do Turno",
			description:
				"Congela as abas headless do navegador pertencentes ao OMP quando o turno termina, para que páginas animadas parem de consumir CPU/GPU enquanto estão ociosas. As abas descongelam sozinhas no próximo uso; passe persist:true no open para excluir uma aba disso.",
		},
		"browser.idleCloseSec": {
			label: "Timeout de Fechamento de Navegador Ocioso",
			description:
				"Fecha as abas headless do navegador pertencentes ao OMP que ficarem ociosas por mais do que esses segundos (0 = nunca; o descarte da sessão continua recolhendo). Vale só para abas headless abertas pelo OMP, nunca para navegadores de relay/CDP/spawn nem para abas de outras sessões.",
		},
		"browser.screenshotDir": {
			label: "Diretório de Screenshots",
			description:
				"Diretório onde salvar os screenshots. Se não definido, os screenshots vão para um arquivo temporário. Aceita ~. Exemplos: ~/Downloads, ~/Desktop, /sdcard/Download (Android)",
		},
		"tools.intentTracing": {
			label: "Rastreamento de Intenção",
			description: "Pede ao agente que descreva a intenção de cada chamada de ferramenta antes de executá-la",
		},
		"tools.abortOnFabricatedResult": {
			label: "Abortar em Resultado de Ferramenta Fabricado",
			description:
				"Com chamadas de ferramenta in-band, interrompe o modelo na hora em que ele começa a alucinar um resultado de ferramenta no meio do turno. Desative para deixar o modelo terminar a geração e descartar a continuação fabricada.",
		},
		"tools.speculativeExecution.enabled": {
			label: "Execução Especulativa Experimental",
			description:
				"Ativa a primeira fatia segura de descartar: leituras locais validadas por chamadas diretas de read e eval aninhado. Requisições de rede, completions de provedores e escritas reais no sistema de arquivos não fazem parte dessa base.",
		},
		"tools.speculativeExecution.maxInFlight": {
			label: "Concorrência da Execução Especulativa",
			description: "Número máximo de leituras locais validadas que podem rodar antes do despacho normal.",
		},
		"tools.maxTimeout": {
			label: "Timeout Máximo de Ferramenta",
			description: "Timeout máximo em segundos que o agente pode definir para qualquer ferramenta (0 = sem limite)",
		},
		"async.enabled": {
			label: "Execução Assíncrona",
			description: "Ativa comandos bash assíncronos e execução de tarefas em background",
		},
		"irc.timeoutMs": {
			label: "Timeout do IRC",
			description: "Timeout do hub send com await:true, em milissegundos; 0 desativa o timeout",
		},
		"tools.xdev": {
			label: "Ferramentas xd://",
			description:
				"Monta ferramentas pouco usadas (descobríveis) em URLs de dispositivo xd://, acionadas por read/write, em vez de enviar os schemas delas em toda requisição. Sessões cuja lista explícita de ferramentas concede read mas omite write montam os dispositivos por um transporte de write restrito a dispositivos (escritas no sistema de arquivos continuam rejeitadas). Desative para expor toda ferramenta ativada no nível superior.",
		},
		"tools.xdevDocs": {
			label: "Docs xd:// no Prompt",
			description:
				"Escolhe quais docs e schemas dos dispositivos montados são embutidos no prompt de sistema. Apenas Nativas mantém as ferramentas principais embutidas, enquanto as de MCP e de extensões ficam sob demanda.",
		},
		"tools.xdevInlineDevices": {
			label: "Dispositivos xd:// Embutidos",
			description:
				"Quando Docs xd:// no Prompt está em Apenas Nativas, embute os dispositivos dinâmicos cujos nomes casem com estes padrões glob (por exemplo mcp__context_mode_*). Apenas Catálogo ignora esta configuração.",
		},
		"mcp.enableProjectConfig": {
			label: "Configuração MCP do Projeto",
			description: "Carrega .mcp.json/mcp.json da raiz do projeto",
		},
		"mcp.renderMarkdownResults": {
			label: "Resultados MCP em Markdown",
			description: "Renderiza na transcrição, como Markdown, os resultados de texto MCP que não são JSON",
		},
		"mcp.notifications": {
			label: "Injeção de Atualizações MCP",
			description: "Injeta atualizações de recursos MCP na conversa do agente",
		},
		"mcp.notificationDebounceMs": {
			label: "Debounce de Notificações MCP",
			description:
				"Janela de debounce, em milissegundos, para atualizações de recursos MCP antes de injetá-las na conversa",
		},
		"tasks.todoClearDelay": {
			label: "Atraso para Limpar Tarefas",
			description: "Atraso antes de as tarefas concluídas ou abandonadas serem removidas do widget de tarefas",
		},
		"extensionHandlers.toolCallTimeoutMs": {
			label: "Timeout do Handler de Chamada de Ferramenta (ms)",
			description:
				"Timeout finito e positivo de trabalho ativo para handlers tool_call de extensões; valores inválidos usam 30000ms, e o tempo aguardando diálogos do OMP não conta",
		},
		"dev.autoqa": {
			label: "QA Automático",
			description:
				"Reporte automatizado de problemas em ferramentas (xd://report_issue). Ligado por padrão; o primeiro reporte pede consentimento, e negá-lo desativa o reporte até ser reativado explicitamente",
		},
		"dev.autoqaPush.endpoint": {
			label: "Endpoint de Envio do QA Automático",
			description:
				"URL completa que recebe os relatórios JSON do QA Automático (padrão https://qa.omp.sh/v1/grievances)",
		},
	},
	options: {
		"tools.artifactSpillThreshold": {
			"1": { label: "1 KB", description: "~250 tokens" },
			"2.5": { label: "2.5 KB", description: "~625 tokens" },
			"5": { label: "5 KB", description: "~1.25K tokens" },
			"10": { label: "10 KB", description: "~2.5K tokens" },
			"20": { label: "20 KB", description: "~5K tokens" },
			"30": { label: "30 KB", description: "~7.5K tokens" },
			"50": { label: "50 KB", description: "Padrão; ~12.5K tokens" },
			"75": { label: "75 KB", description: "~19K tokens" },
			"100": { label: "100 KB", description: "~25K tokens" },
			"200": { label: "200 KB", description: "~50K tokens" },
			"500": { label: "500 KB", description: "~125K tokens" },
			"1000": { label: "1 MB", description: "~250K tokens" },
		},
		"tools.artifactTailBytes": {
			"1": { label: "1 KB", description: "~250 tokens" },
			"2.5": { label: "2.5 KB", description: "~625 tokens" },
			"5": { label: "5 KB", description: "~1.25K tokens" },
			"10": { label: "10 KB", description: "~2.5K tokens" },
			"20": { label: "20 KB", description: "Padrão; ~5K tokens" },
			"50": { label: "50 KB", description: "~12.5K tokens" },
			"100": { label: "100 KB", description: "~25K tokens" },
			"200": { label: "200 KB", description: "~50K tokens" },
		},
		"tools.artifactHeadBytes": {
			"0": { label: "0 KB", description: "Desativado; truncagem só do final" },
			"1": { label: "1 KB", description: "~250 tokens" },
			"2.5": { label: "2.5 KB", description: "~625 tokens" },
			"5": { label: "5 KB", description: "~1.25K tokens" },
			"10": { label: "10 KB", description: "~2.5K tokens" },
			"20": { label: "20 KB", description: "Padrão; ~5K tokens" },
			"50": { label: "50 KB", description: "~12.5K tokens" },
			"100": { label: "100 KB", description: "~25K tokens" },
			"200": { label: "200 KB", description: "~50K tokens" },
		},
		"tools.outputMaxColumns": {
			"0": { label: "Desligado", description: "Sem limite por linha" },
			"256": { label: "256", description: "Restrito" },
			"512": { label: "512" },
			"768": { label: "768", description: "Padrão" },
			"1024": { label: "1024" },
			"2048": { label: "2048" },
			"4096": { label: "4096", description: "Folgado" },
		},
		"tools.artifactTailLines": {
			"50": { label: "50 linhas", description: "~250 tokens" },
			"100": { label: "100 linhas", description: "~500 tokens" },
			"250": { label: "250 linhas", description: "~1.25K tokens" },
			"500": { label: "500 linhas", description: "Padrão; ~2.5K tokens" },
			"1000": { label: "1000 linhas", description: "~5K tokens" },
			"2000": { label: "2000 linhas", description: "~10K tokens" },
			"5000": { label: "5000 linhas", description: "~25K tokens" },
		},
		"todo.remindersMax": {
			"1": { label: "1 lembrete" },
			"2": { label: "2 lembretes" },
			"3": { label: "3 lembretes" },
			"5": { label: "5 lembretes" },
		},
		"todo.eager": {
			default: { label: "Padrão", description: "O modelo decide; sem lista de tarefas automática" },
			preferred: {
				label: "Preferido",
				description: "Sugere uma lista de tarefas na primeira mensagem (lembrete, não obrigatório)",
			},
			always: { label: "Sempre", description: "Força uma lista de tarefas completa na primeira mensagem" },
		},
		"grep.contextBefore": {
			"0": { label: "0 linhas" },
			"1": { label: "1 linha" },
			"2": { label: "2 linhas" },
			"3": { label: "3 linhas" },
			"5": { label: "5 linhas" },
		},
		"grep.contextAfter": {
			"0": { label: "0 linhas" },
			"1": { label: "1 linha" },
			"2": { label: "2 linhas" },
			"3": { label: "3 linhas" },
			"5": { label: "5 linhas" },
			"10": { label: "10 linhas" },
		},
		"images.questionTimeoutMs": {
			"0": { label: "Desativado" },
			"60000": { label: "1 minuto" },
			"120000": { label: "2 minutos" },
			"180000": { label: "3 minutos" },
			"300000": { label: "5 minutos" },
		},
		"browser.idleCloseSec": {
			"0": { label: "Nunca" },
			"900": { label: "15 minutos" },
			"1800": { label: "30 minutos" },
			"3600": { label: "1 hora" },
		},
		"tools.speculativeExecution.maxInFlight": {
			"1": { label: "1 operação" },
			"2": { label: "2 operações" },
			"3": { label: "3 operações" },
			"4": { label: "4 operações" },
		},
		"tools.maxTimeout": {
			"0": { label: "Sem limite" },
			"30": { label: "30 segundos" },
			"60": { label: "60 segundos" },
			"120": { label: "120 segundos" },
			"300": { label: "5 minutos" },
			"600": { label: "10 minutos" },
		},
		"irc.timeoutMs": {
			"0": { label: "Desativado" },
			"30000": { label: "30 segundos" },
			"60000": { label: "1 minuto" },
			"120000": { label: "2 minutos" },
			"300000": { label: "5 minutos" },
		},
		"tools.xdevDocs": {
			inline: { label: "Todos os Dispositivos", description: "Embute docs e schemas de todo dispositivo montado." },
			builtins: {
				label: "Apenas Nativas",
				description: "Embute os docs nativos; busca os docs de MCP e de extensões sob demanda.",
			},
			catalog: { label: "Apenas Catálogo", description: "Lista todo dispositivo; busca todos os docs sob demanda." },
		},
		"tasks.todoClearDelay": {
			"0": { label: "Imediato" },
			"60": { label: "1 minuto", description: "Padrão" },
			"300": { label: "5 minutos" },
			"900": { label: "15 minutos" },
			"1800": { label: "30 minutos" },
			"3600": { label: "1 hora" },
			"-1": { label: "Nunca" },
		},
	},
};
