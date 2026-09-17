import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the interaction tab. */
export const interaction: SettingsLocaleTable = {
	tabs: { interaction: "Interação" },
	groups: {
		interaction: {
			Input: "Entrada",
			Approvals: "Aprovações",
			Notifications: "Notificações",
			Speech: "Voz",
			Collab: "Collab",
			"Magic Keywords": "Palavras Mágicas",
			"Startup & Updates": "Inicialização e Atualizações",
			Power: "Energia",
			Agent: "Agente",
			Git: "Git",
		},
	},
	paths: {
		autoResume: {
			label: "Retomar Automaticamente",
			description: "Retoma automaticamente a sessão mais recente do diretório atual",
		},
		"power.sleepPrevention": {
			label: "Prevenção de Suspensão",
			description:
				"Impede que o sistema entre em suspensão durante sessões ativas. Cada nível é cumulativo — ele soma as flags de todos os níveis anteriores.",
		},
		"git.enabled": {
			label: "Ativar Integração com Git",
			description: "Mostra branch, status e informações de PR do git na TUI e observa os metadados do repositório.",
		},
		steeringMode: {
			label: "Modo de Direcionamento",
			description: "Como processar as mensagens na fila enquanto o agente trabalha",
		},
		followUpMode: {
			label: "Modo de Acompanhamento",
			description: "Como esvaziar as mensagens de acompanhamento depois que um turno termina",
		},
		interruptMode: {
			label: "Modo de Interrupção",
			description: "Quando as mensagens de direcionamento interrompem a execução de ferramentas",
		},
		"tui.vimMode": {
			label: "Modo de Edição Vim",
			description:
				"Edição modal do prompt. Escape sai do modo Insert; o modo Normal tem hjkl, 0, $, ^, w, b, e, gg, G, contadores, x/D/C, dd/yy, p e u; os operadores aceitam movimentos ou objetos de texto (diw, ca(, dap); v/V iniciam uma seleção Visual que y copia e d apaga",
		},
		"tui.vimModeDisplay": {
			label: "Indicador de Modo do Vim",
			description: "Como o modo atual do Vim aparece na barra de status",
		},
		"loop.mode": {
			label: "Modo do Loop",
			description: "O que acontece entre as iterações de /loop antes de reenviar o prompt",
		},
		"loop.conditionTimeoutMs": {
			label: "Timeout da Condição do Loop (ms)",
			description:
				"Espera máxima por um comando de condição `/loop --while` / `--until` antes de considerá-lo quebrado e parar o loop. Use 0 para esperar indefinidamente",
		},
		"composer.recallClearedDrafts": {
			label: "Recuperar Rascunhos Descartados",
			description:
				"Mantém os rascunhos limpos com Ctrl+C no histórico local de Cima/Baixo até a saída; desativar afeta apenas as limpezas futuras",
		},
		doubleEscapeAction: {
			label: "Ação do Escape Duplo",
			description:
				"O que acontece ao pressionar Escape duas vezes com o editor vazio: abrir o seletor de retorno da transcrição, abrir a árvore de sessões ou nada",
		},
		treeFilterMode: {
			label: "Filtro da Árvore de Sessões",
			description: "Modo de filtro padrão ao abrir a árvore de sessões",
		},
		autocompleteMaxVisible: {
			label: "Itens do Autocompletar",
			description: "Máximo de itens visíveis na lista de autocompletar (3-20)",
		},
		"spelling.typoDetection": {
			label: "Detecção de Erros de Digitação (macOS)",
			description: "Marca as palavras com erro no prompt usando os dicionários ativos do macOS",
		},
		"spelling.autocomplete": {
			label: "Autocompletar de Palavras (macOS)",
			description: "Mostra as sugestões de palavras do dicionário do macOS como dicas em linha aceitas com Tab",
		},
		"spelling.autocorrect": {
			label: "Correção Automática (macOS)",
			description: "Aplica as correções ortográficas confiáveis do macOS depois de palavras completas",
		},
		emojiAutocomplete: {
			label: "Autocompletar de Emojis",
			description: "Sugere emojis a partir de atalhos `:name:` e expande emoticons de texto como `:D` ou `:-)`",
		},
		"paste.largeMenuThreshold": {
			label: "Menu de Colagem Grande",
			description:
				"Quando uma colagem atinge esta quantidade de linhas, oferece um menu para envolvê-la em um bloco de código, envolvê-la em tags XML ou salvá-la em um arquivo. 0 desativa o menu (colagens grandes continuam recolhidas em um marcador [Paste]).",
		},
		"startup.quiet": {
			label: "Inicialização Silenciosa",
			description: "Pula a tela de boas-vindas e as mensagens de status da inicialização",
		},
		"startup.showSplash": {
			label: "Mostrar Splash de Inicialização",
			description:
				"Mostra a tela de abertura animada completa na inicialização interativa normal, sem reexecutar a configuração. A Inicialização Silenciosa continua suprimindo essa tela.",
		},
		"startup.setupWizard": {
			label: "Assistente de Configuração",
			description: "Mostra as etapas de integração recém-adicionadas uma vez por versão da configuração",
		},
		"startup.checkUpdate": {
			label: "Verificar Atualizações",
			description: "Verifica atualizações do omp na inicialização",
		},
		"update.channel": {
			label: "Canal de Atualização",
			description: "Canal de atualização usado pelo omp update e pela verificação de atualização na inicialização",
		},
		"marketplace.autoUpdate": {
			label: "Atualização Automática do Marketplace",
			description: "Verifica atualizações de plugin na inicialização",
		},
		"startup.changelogMode": {
			label: "Changelog na Inicialização",
			description: "Escolha se as notas de atualização começam como resumo, em detalhe completo, ou ficam ocultas",
		},
		"magicKeywords.enabled": {
			label: "Palavras Mágicas",
			description: "Ativa os avisos ocultos para as palavras-chave isoladas ultrathink, orchestrate e workflowz",
		},
		"magicKeywords.ultrathink": {
			label: "Palavra-Chave Ultrathink",
			description:
				"Permite que um ultrathink isolado solicite o máximo de raciocínio automático e anexe seu aviso oculto",
		},
		"magicKeywords.orchestrate": {
			label: "Palavra-Chave Orchestrate",
			description: "Permite que um orchestrate isolado anexe seu aviso oculto de orquestração multiagente",
		},
		"magicKeywords.workflow": {
			label: "Palavra-Chave Workflow",
			description: "Permite que um workflowz isolado anexe seu aviso oculto de workflow de eval",
		},
		"completion.notify": {
			label: "Notificação de Conclusão",
			description: "Notifica quando o agente termina um turno",
		},
		"error.notify": {
			label: "Notificação de Erro",
			description: "Notifica quando o agente para com um erro",
		},
		"ask.timeout": {
			label: "Timeout do Ask",
			description:
				"Seleciona automaticamente a opção recomendada do ask depois desta quantidade de segundos (0 desativa)",
		},
		"ask.notify": {
			label: "Notificação do Ask",
			description: "Notifica quando a ferramenta ask está esperando uma resposta",
		},
		"recap.enabled": {
			label: "Resumo em Inatividade",
			description: "Gera um resumo breve por LLM da situação atual depois que o terminal fica inativo",
		},
		"recap.idleSeconds": {
			label: "Atraso do Resumo em Inatividade",
			description: "Segundos de inatividade a esperar antes de mostrar o resumo",
		},
		"collab.relayUrl": {
			label: "URL do Relay",
			description: "Relay usado pelo /collab (wss://host[:port])",
		},
		"collab.webUrl": {
			label: "URL da Interface Web",
			description:
				"Interface de navegador usada pelos links do /collab; vazio deriva de collab.relayUrl; http:// explícito funciona apenas em localhost",
		},
		"collab.displayName": {
			label: "Nome de Exibição",
			description: "Nome mostrado aos outros participantes do collab (padrão: nome de usuário do sistema)",
		},
		"collab.autoStart": {
			label: "Início Automático",
			description:
				"Hospeda toda sessão interativa via collab.relayUrl assim que ela começa e a publica no registro local (omp collab list); as salas rotacionam ao trocar de sessão",
		},
		"share.serverUrl": {
			label: "Servidor de Compartilhamento",
			description:
				"Base de visualização/upload usada pelo /share (upload de blob criptografado + visualizador; os links são <base>/<id>#<key>)",
		},
		"share.store": {
			label: "Destino do Compartilhamento",
			description: "Para onde o /share envia o blob criptografado da sessão",
		},
		"share.redactSecrets": {
			label: "Ocultar Segredos no Compartilhamento",
			description:
				"Executa o ofuscador de segredos nos snapshots do /share antes do upload (usa a configuração secrets.*)",
		},
		"stt.enabled": {
			label: "Voz para Texto",
			description: "Ativa a entrada de voz para texto pelo microfone",
		},
		"stt.modelName": {
			label: "Modelo de Voz",
			description:
				"Modelo de voz local, no dispositivo. O Parakeet TDT v3 (sherpa-onnx) é o padrão e estado da arte; os níveis Whisper base/small/large-v3-turbo (transformers.js) trocam tamanho por cobertura multilíngue. Baixado no primeiro uso.",
		},
		"stt.submitTrigger": {
			label: "Gatilho de Envio da Voz para Texto",
			description:
				"Escolha quando o ditado por voz envia automaticamente: Nunca, Ao soltar (2+ palavras), Ao soltar com frase completa, ou Quando eu disser submit.",
		},
		"tools.approval": {
			label: "Políticas de Aprovação de Ferramentas",
			description:
				"Políticas de aprovação por ferramenta. Defina 'allow' para aprovar automaticamente, 'prompt' para exigir confirmação ou 'deny' para bloquear. As exceções são respeitadas em todos os modos de aprovação.",
		},
		"tools.approvalMode": {
			label: "Aprovação de Ferramentas",
			description:
				"Comportamento padrão de aprovação das chamadas de ferramenta. 'Sempre perguntar' aprova automaticamente apenas as ferramentas somente leitura. 'Escrita' aprova automaticamente as ferramentas de leitura e de escrita no workspace. 'Yolo' aprova automaticamente todos os níveis; a política do usuário ainda pode perguntar ou bloquear.",
		},
		"features.unexpectedStopDetection": {
			label: "Paradas Inesperadas",
			description:
				"Recupera automaticamente quando o assistente para sem mensagem visível. O modo Inteligente também classifica as paradas apenas com texto usando um modelo pequeno.",
		},
	},
	options: {
		"power.sleepPrevention": {
			off: { label: "Desativado", description: "Não impede nenhuma suspensão" },
			idle: {
				label: "Impedir Suspensão por Inatividade",
				description: "Mantém o sistema acordado enquanto uma sessão estiver aberta (macOS `caffeinate -i`)",
			},
			display: {
				label: "Impedir Suspensão da Tela",
				description: "Também evita que a tela entre em suspensão por inatividade (macOS `caffeinate -i -d`)",
			},
			system: {
				label: "Impedir Suspensão do Sistema",
				description:
					"Também bloqueia toda suspensão do sistema na tomada e declara o usuário ativo (macOS `caffeinate -i -d -s -u`)",
			},
		},
		"tui.vimModeDisplay": {
			text: { label: "Texto", description: "Nome completo do modo — NORMAL, INSERT, VISUAL, V-LINE" },
			icon: { label: "Ícone", description: "Um único glifo compacto por modo" },
			none: { label: "Oculto", description: "Não mostra o modo na barra de status" },
		},
		"loop.mode": {
			prompt: {
				label: "Prompt",
				description: "Reenvia o prompt como mensagem de acompanhamento (comportamento atual)",
			},
			compact: {
				label: "Compactar",
				description: "Compacta o contexto da sessão e depois reenvia o prompt",
			},
			reset: { label: "Reiniciar", description: "Inicia uma nova sessão e depois reenvia o prompt" },
		},
		"loop.conditionTimeoutMs": {
			"0": { label: "Ilimitado" },
			"10000": { label: "10 segundos" },
			"30000": { label: "30 segundos" },
			"120000": { label: "2 minutos" },
		},
		autocompleteMaxVisible: {
			"3": { label: "3 itens" },
			"5": { label: "5 itens" },
			"7": { label: "7 itens" },
			"10": { label: "10 itens" },
			"15": { label: "15 itens" },
			"20": { label: "20 itens" },
		},
		"paste.largeMenuThreshold": {
			"0": { label: "Desativado" },
			"100": { label: "100 linhas" },
			"250": { label: "250 linhas" },
			"500": { label: "500 linhas" },
			"1000": { label: "1000 linhas" },
		},
		"update.channel": {
			stable: { label: "Estável" },
			canary: { label: "Canary" },
		},
		"marketplace.autoUpdate": {
			off: { label: "Desativado", description: "Não verifica atualizações de plugin" },
			notify: {
				label: "Notificar",
				description: "Verifica na inicialização e notifica quando há atualizações disponíveis",
			},
			auto: {
				label: "Auto",
				description: "Verifica na inicialização e instala as atualizações automaticamente",
			},
		},
		"startup.changelogMode": {
			summary: {
				label: "Resumo",
				description: "Mostra a contagem de releases e de mudanças com uma dica de /changelog",
			},
			expanded: {
				label: "Expandido",
				description: "Mostra as notas das releases recentes por completo",
			},
			hidden: { label: "Oculto", description: "Não mostra as notas de release na inicialização" },
		},
		"ask.timeout": {
			"0": { label: "Desativado" },
			"15": { label: "15 segundos" },
			"30": { label: "30 segundos" },
			"60": { label: "60 segundos" },
			"120": { label: "120 segundos" },
		},
		"recap.idleSeconds": {
			"60": { label: "1 minuto" },
			"120": { label: "2 minutos" },
			"240": { label: "4 minutos" },
			"300": { label: "5 minutos" },
			"600": { label: "10 minutos" },
		},
		"collab.autoStart": {
			off: { label: "Desativado", description: "Compartilha apenas quando o /collab é executado" },
			view: {
				label: "Visualização",
				description:
					"Hospeda automaticamente; o registro distribui links apenas de visualização (omp collab link --view)",
			},
			control: {
				label: "Controle",
				description:
					"Hospeda automaticamente; o registro distribui links de controle que podem enviar prompts à sessão",
			},
		},
		"share.store": {
			blob: {
				label: "Blob Criptografado",
				description:
					"Envia para o servidor de compartilhamento (não precisa de conta no GitHub; evita os limites de taxa da API de gists)",
			},
			gist: {
				label: "GitHub Gist",
				description:
					"Envia para um gist secreto (precisa do gh autenticado), com fallback para o servidor de compartilhamento",
			},
		},
		"stt.modelName": {
			fast: {
				label: "Rápido (Whisper base)",
				description:
					"Whisper base, multilíngue. O menor e mais rápido; menor precisão. Ideal para máquinas com poucos recursos.",
			},
			balanced: {
				label: "Equilibrado (Whisper small)",
				description: "Whisper small, multilíngue. Mais preciso que o Rápido e ainda leve em CPU/RAM.",
			},
			turbo: {
				label: "Turbo (Whisper large-v3)",
				description:
					"Whisper large-v3-turbo, 99 idiomas. Maior cobertura de idiomas; download grande e mais lento.",
			},
			parakeet: {
				label: "Parakeet TDT v3 (SoTA)",
				description:
					"NVIDIA Parakeet TDT 0.6B v3, 25 idiomas. Líder do Open ASR Leaderboard — melhor precisão e decodificação muito mais rápida. Padrão.",
			},
		},
		"stt.submitTrigger": {
			never: {
				label: "Nunca",
				description: "Nunca envia automaticamente; insere o ditado e permanece no editor.",
			},
			release: {
				label: "Ao soltar",
				description: "Envia ao soltar se a fala tiver 2 ou mais palavras, para evitar envios acidentais.",
			},
			"release-complete": {
				label: "Ao soltar com frase completa",
				description: "Envia ao soltar se a fala terminar com pontuação final de frase (. ? ! etc.).",
			},
			"say-submit": {
				label: "Quando eu disser submit",
				description:
					"Envia se a fala terminar com uma palavra que contenha 'submit' (a palavra é removida antes do envio).",
			},
		},
		"tools.approvalMode": {
			"always-ask": {
				label: "Sempre perguntar",
				description:
					"Aprova automaticamente as ferramentas somente leitura; exige confirmação para as ferramentas de escrita e de execução.",
			},
			write: {
				label: "Escrita",
				description:
					"Aprova automaticamente as ferramentas somente leitura e de escrita; exige confirmação para ferramentas de execução como bash, eval, browser e task.",
			},
			yolo: {
				label: "Yolo",
				description:
					"Aprova automaticamente as ferramentas de leitura, escrita e execução. A política do usuário ainda pode exigir confirmação ou bloquear chamadas.",
			},
		},
		"features.unexpectedStopDetection": {
			none: { label: "Nenhum", description: "Desativado" },
			mechanical: {
				label: "Mecânico",
				description:
					"Repete as paradas sem mensagem visível do assistente; as chamadas de ferramenta ficam de fora (padrão)",
			},
			smart: {
				label: "Inteligente",
				description: "Mecânico + classificação por modelo pequeno das paradas apenas com texto",
			},
		},
	},
};
