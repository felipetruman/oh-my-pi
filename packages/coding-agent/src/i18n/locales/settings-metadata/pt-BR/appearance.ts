import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the appearance tab. */
export const appearance: SettingsLocaleTable = {
	tabs: { appearance: "Aparência" },
	groups: {
		appearance: {
			Theme: "Tema",
			Composer: "Composer",
			"Status Line": "Barra de Status",
			Display: "Exibição",
			Images: "Imagens",
		},
	},
	paths: {
		"theme.dark": {
			label: "Tema Escuro",
			description: "Tema usado quando o terminal tem fundo escuro",
		},
		"theme.light": {
			label: "Tema Claro",
			description: "Tema usado quando o terminal tem fundo claro",
		},
		symbolPreset: {
			label: "Conjunto de Símbolos",
			description: "Conjunto de glifos para ícones e símbolos (Unicode, Nerd Font ou ASCII)",
		},
		colorBlindMode: {
			label: "Modo Daltônico",
			description: "Usa azul em vez de verde para adições no diff",
		},
		"composer.shape": {
			label: "Forma do Composer",
			description: "Layout visual do editor de entrada e da barra de status",
		},
		"statusLine.preset": {
			label: "Preset da Barra de Status",
			description: "Configurações prontas da barra de status",
		},
		"statusLine.separator": {
			label: "Separador da Barra de Status",
			description: "Estilo dos separadores entre segmentos",
		},
		"statusLine.contextLine": {
			label: "Linha Reativa ao Contexto",
			description:
				"Como a linha entre os segmentos da esquerda e da direita reflete o uso do contexto (apenas no composer em caixa)",
		},
		"statusLine.sessionAccent": {
			label: "Destaque da Sessão",
			description: "Usa a cor do nome da sessão na borda do editor e no vão da barra de status",
		},
		"statusLine.transparent": {
			label: "Barra de Status Transparente",
			description:
				"Usa o fundo padrão do terminal na barra de status em vez do `statusLineBg` do tema. As pontas Powerline são descartadas porque precisam de um preenchimento contrastante para emendar com o terminal ao redor.",
		},
		"statusLine.compactThinkingLevel": {
			label: "Nível de Raciocínio Compacto",
			description:
				"Mostra o nível de raciocínio como um único ícone no nome do modelo, em vez de um sufixo ` · <level>` separado.",
		},
		"statusLine.showHookStatus": {
			label: "Mostrar Status do Hook",
			description: "Exibe mensagens de status do hook abaixo da barra de status",
		},
		"terminal.showImages": {
			label: "Mostrar Imagens Embutidas",
			description: "Renderiza imagens embutidas no terminal",
		},
		"images.autoResize": {
			label: "Redimensionar Imagens Automaticamente",
			description:
				"Redimensiona imagens grandes para no máximo 2000x2000 para melhor compatibilidade com os modelos",
		},
		"images.blockImages": {
			label: "Bloquear Imagens",
			description: "Impede que imagens sejam enviadas aos provedores de LLM",
		},
		"display.locale": {
			label: "Idioma da Interface",
			description: "Idioma usado pela interface de terminal do OMP",
		},
		"tui.resizeScrollback": {
			label: "Scrollback no Redimensionamento",
			description:
				"Como um redimensionamento concluído do terminal atualiza as linhas da transcrição retidas no scrollback do terminal",
		},
		"terminal.showProgress": {
			label: "Progresso Nativo do Terminal",
			description:
				"Emite progresso indeterminado OSC 9;4 enquanto o agente ou a manutenção de contexto está em execução",
		},
		"tui.textSizing": {
			label: "Títulos Grandes (Kitty)",
			description:
				"Renderiza títulos H1 do Markdown em escala 2x usando o protocolo OSC 66 de dimensionamento de texto do Kitty. Só tem efeito em terminais Kitty; é ignorado nos demais. Desativado por padrão.",
		},
		"tui.renderMermaid": {
			label: "Renderizar Diagramas Mermaid",
			description: "Renderiza blocos de código Mermaid como diagramas ASCII",
		},
		"tui.reactions": {
			label: "Reações do Agente",
			description: "Convida o agente a reagir à sua mensagem com um emoji no balão dele",
		},
		"tui.codexResetFireworks": {
			label: "Fogos de Artifício do Reset do Codex",
			description:
				"Celebra resets semanais de uso do Codex fora de hora e novos resets guardados com um overlay de fogos de artifício no terço superior, que permanece até você pressionar Escape",
		},
		"tui.titleState": {
			label: "Estado de Execução no Título do Terminal",
			description:
				"Mostra o estado de execução do agente no separador do título do terminal — um spinner animado enquanto trabalha (um ':' estático no WSL), '>' quando é a sua vez e '!' quando o agente está esperando por você",
		},
		"tui.titleSpinner": {
			label: "Spinner do Título do Terminal",
			description:
				"Conjunto de glifos do spinner de estado de trabalho no título do terminal — varredura braille, lua preenchendo, ciclo de ponto único ou linha compatível com ASCII",
		},
		"tui.hyperlinks": {
			label: "Hyperlinks do Terminal",
			description:
				"Envolve caminhos e URLs em hyperlinks OSC 8 para abrir com clique nativo do terminal (auto: detecta suporte; off: nunca; always: sempre)",
		},
		"tui.mouse": {
			label: "Foco por Clique do Mouse",
			description:
				"Captura cliques do mouse na sessão principal para que cartões de subagentes ativos e linhas do HUD recebam foco ao clicar, com destaque ao passar o cursor. Enquanto ativado, a seleção nativa de texto passa a ser Shift+arrastar e a rolagem passa a ser Shift+roda",
		},
		"tui.tight": {
			label: "Layout Compacto",
			description: "Remove o espaçamento horizontal de 1 caractere à esquerda e à direita da saída do terminal",
		},
		"display.shimmer": {
			label: "Shimmer",
			description: "Estilo de animação das mensagens de trabalho/carregamento",
		},
		"display.pinnedAgents": {
			label: "Agentes Fixados",
			description:
				"Lista fixa de atalhos para agentes ativos acima do editor (off oculta; collapsed mostra algumas linhas com um expansor; full lista todos)",
		},
		"display.smoothStreaming": {
			label: "Stream Suave",
			description:
				"Revela o texto do assistente e a entrada de ferramentas em stream de forma suave conforme os trechos chegam",
		},
		"display.hideToolActivity": {
			label: "Ocultar Atividade de Ferramentas",
			description: "Oculta da transcrição as chamadas de ferramenta iniciadas pelo modelo e seus resultados",
		},
		"display.showTokenUsage": {
			label: "Mostrar Uso de Tokens",
			description: "Mostra o uso de tokens por turno nas mensagens do assistente",
		},
		"display.showTurnTime": {
			label: "Mostrar Tempo do Turno",
			description:
				"Mostra o tempo total do prompt até a entrega final (incluindo chamadas de ferramenta) nas linhas de uso das mensagens do assistente",
		},
		"display.cacheMissMarker": {
			label: "Marcador de Cache Perdido",
			description: "Mostra um divisor após um turno do assistente cuja requisição perdeu o cache do prompt",
		},
		"display.collapseCompacted": {
			label: "Recolher Histórico Compactado",
			description:
				"Recolhe o histórico anterior à compactação atrás do divisor de resumo na transcrição ao vivo; desative para manter a transcrição completa em linha, com divisores em cada ponto de compactação",
		},
		showHardwareCursor: {
			label: "Mostrar Cursor de Hardware",
			description: "Mostra o cursor do terminal para suporte a IME",
		},
		"tui.imeSafeCursor": {
			label: "Layout de Prompt Seguro para IME",
			description:
				"Move a borda inferior do prompt para uma linha separada, para que a pré-edição do IME do macOS não a desloque",
		},
		"task.showResolvedModelBadge": {
			label: "Mostrar Selo do Modelo Resolvido",
			description: "Exibe o ID real do modelo usado por cada subagente na barra de status do widget de tarefas",
		},
	},
	options: {
		symbolPreset: {
			unicode: { label: "Unicode", description: "Conjunto padrão de símbolos" },
			nerd: { label: "Nerd Font", description: "Requer uma Nerd Font" },
			ascii: { label: "ASCII", description: "Compatibilidade máxima" },
		},
		"statusLine.preset": {
			default: { label: "Padrão", description: "Modelo, caminho, git, contexto, tokens, custo" },
			minimal: { label: "Mínimo", description: "Apenas caminho e git" },
			compact: { label: "Compacto", description: "Modelo, git, custo, contexto" },
			full: { label: "Completo", description: "Todos os segmentos, incluindo o horário" },
			nerd: { label: "Nerd", description: "Máximo de informação com ícones Nerd Font" },
			ascii: { label: "ASCII", description: "Sem caracteres especiais" },
			custom: { label: "Personalizado", description: "Segmentos definidos pelo usuário" },
		},
		"statusLine.separator": {
			powerline: { label: "Powerline", description: "Setas sólidas (Nerd Font)" },
			"powerline-thin": { label: "Chevron fino", description: "Setas finas (Nerd Font)" },
			slash: { label: "Barra", description: "Barras inclinadas" },
			pipe: { label: "Pipe", description: "Barras verticais" },
			block: { label: "Bloco", description: "Blocos sólidos" },
			none: { label: "Nenhum", description: "Apenas espaço" },
			ascii: { label: "ASCII", description: "Sinais de maior que" },
		},
		"statusLine.contextLine": {
			off: {
				label: "Desativado",
				description: "Linha de destaque sólida, sem indicação de contexto",
			},
			percentage: {
				label: "Porcentagem",
				description: "Parte usada na cor de destaque, o restante esmaecido",
			},
			annotated: {
				label: "Anotada",
				description: "Porcentagem mais marcas nos limites de compactação especulativa e automática",
			},
			embedded: {
				label: "Embutida",
				description: "Linha anotada com a porcentagem e a janela de contexto embutidas no medidor",
			},
		},
		"tui.resizeScrollback": {
			append: {
				label: "Anexar",
				description: "Reexibe a transcrição na nova largura abaixo do histórico retido",
			},
			rebuild: {
				label: "Reconstruir",
				description: "Apaga todo o scrollback do terminal e reexibe uma única transcrição na largura atual",
			},
			preserve: {
				label: "Preservar",
				description: "Redesenha apenas a área visível e mantém o histórico quebrado na largura antiga",
			},
		},
		"tui.titleSpinner": {
			braille: { label: "Braille", description: "Varredura clássica ⠋⠙⠹ (padrão)" },
			pulse: { label: "Pulso", description: "Lua preenchendo ○◑● e depois esvaziando" },
			dots: { label: "Pontos", description: "Pontos braille únicos em ciclo" },
			line: { label: "Linha", description: "ASCII - \\ | / para fontes sem cobertura braille" },
		},
		"display.shimmer": {
			classic: { label: "Clássico", description: "Onda cosseno suave varrendo o texto" },
			kitt: {
				label: "Scanner KITT",
				description: "Luz vermelha do Knight Rider de 1982 indo e voltando",
			},
			disabled: { label: "Desativado", description: "Sem animação; texto estático e esmaecido" },
		},
		"display.pinnedAgents": {
			off: { label: "Desativado", description: "Oculta a lista fixa de atalhos" },
			collapsed: { label: "Recolhida", description: "Mostra algumas linhas com um expansor" },
			full: { label: "Completa", description: "Sempre lista todos os agentes ativos" },
		},
	},
};
