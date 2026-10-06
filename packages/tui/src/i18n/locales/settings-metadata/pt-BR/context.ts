import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the context tab. */
export const context: SettingsLocaleTable = {
	tabs: { context: "Contexto" },
	groups: {
		context: {
			General: "Geral",
			Compaction: "Compactação",
			"Rules (TTSR)": "Regras (TTSR)",
			Experimental: "Experimental",
		},
	},
	paths: {
		"workspace.additionalDirectories": {
			label: "Diretórios Extras do Workspace",
			description:
				"Diretórios de workspace extras adicionados a toda sessão como raízes adicionais (workspace multi-raiz). Gerenciados em tempo real via /add-dir e /remove-dir. Os caminhos são resolvidos em relação ao cwd; caminhos absolutos são recomendados. O agente é informado de que essas raízes existem e pode usar read/grep/glob nelas.",
		},
		"contextPromotion.enabled": {
			label: "Promoção Automática de Contexto",
			description: "Promove para um modelo de contexto maior quando o contexto estoura, em vez de compactar",
		},
		extendedContext: {
			label: "Contexto Estendido",
			description:
				"Usa janelas de contexto maiores onde houver suporte; pode ter custo premium. Desativado mantém as janelas padrão ou de preço normal",
		},
		"compaction.enabled": {
			label: "Compactação Automática",
			description: "Compacta o contexto automaticamente quando ele fica grande demais",
		},
		"compaction.experimentalContextManagement": {
			label: "Janelas de contexto com notas (experimental)",
			description:
				"Mantém notas persistentes e histórico bruto pesquisável entre janelas de contexto. Reinicie para atualizar as ferramentas disponíveis.",
		},
		"compaction.midTurnEnabled": {
			label: "Compactação no Meio do Turno",
			description:
				"Verifica os limites em fronteiras seguras do loop de ferramentas no meio do turno, antes da próxima requisição ao provedor",
		},
		"compaction.methodOrder": {
			label: "Ordem dos Métodos de Compactação",
			description:
				"Ordem de fallback preferida para a manutenção automática de contexto; métodos indisponíveis ou que falharem avançam para a próxima opção",
		},
		"compaction.thresholdPercent": {
			label: "Limite de Compactação",
			description:
				"Limite percentual para a manutenção de contexto; use Padrão para o comportamento antigo baseado em reserva",
		},
		"compaction.thresholdTokens": {
			label: "Limite de Tokens para Compactação",
			description: "Limite fixo de tokens para a manutenção de contexto; se definido, prevalece sobre o percentual",
		},
		"compaction.handoffSaveToDisk": {
			label: "Salvar Documentos de Handoff",
			description: "Salva os documentos de handoff gerados em arquivos markdown para o fluxo de handoff automático",
		},
		"compaction.remoteStreamingV2Enabled": {
			label: "Compactação Remota V2",
			description: "Usa a compactação em stream da API Responses para modelos de compactação remota compatíveis",
		},
		"compaction.asyncEnabled": {
			label: "Compactação Assíncrona",
			description:
				"Resume especulativamente em segundo plano quando o contexto se aproxima do limite de compactação e encaixa o resultado pronto quando o limite é atingido",
		},
		"compaction.idleEnabled": {
			label: "Compactação em Ociosidade",
			description: "Compacta o contexto durante a ociosidade quando a contagem de tokens passa do limite",
		},
		"compaction.idleThresholdTokens": {
			label: "Limite da Compactação em Ociosidade",
			description: "Contagem de tokens acima da qual a compactação em ociosidade dispara",
		},
		"compaction.idleTimeoutSeconds": {
			label: "Espera da Compactação em Ociosidade",
			description: "Segundos de ociosidade a aguardar antes de compactar",
		},
		"compaction.supersedeReads": {
			label: "Substituir Leituras Obsoletas",
			description:
				"Remove resultados de leitura antigos quando o mesmo arquivo é lido de novo (respeita o cache, roda a cada turno)",
		},
		"compaction.dropUseless": {
			label: "Elidir Resultados Sem Novidade",
			description:
				"Remove resultados de ferramenta marcados como contextualmente inúteis (sem correspondências, esperas que expiraram) depois de consumidos (respeita o cache)",
		},
		"snapcompact.systemPrompt": {
			label: "Prompt de Sistema do Snapcompact",
			description:
				"Experimental: renderiza o texto selecionado do prompt de sistema como imagem(ns) PNG densa(s) e anexa à primeira mensagem do usuário (apenas modelos com visão). Economiza tokens; perde o cache de prompt do texto convertido em imagem.",
		},
		"snapcompact.toolResults": {
			label: "Resultados de Ferramenta do Snapcompact",
			description:
				"Experimental: renderiza resultados grandes de ferramenta do histórico como imagem(ns) PNG densa(s) em vez de texto (apenas modelos com visão). Economiza tokens na saída acumulada de leitura/busca.",
		},
		"tools.format": {
			label: "Modo de Chamada de Ferramentas",
			description:
				"Controla como as ferramentas são expostas ao modelo. Auto usa as chamadas de ferramenta nativas do provedor, a menos que o modelo escolhido esteja marcado como sem suporte, e então recorre ao dialeto próprio GLM. Nativo força as ferramentas nativas do provedor; os outros valores forçam o dialeto próprio indicado. Vale a partir do início da sessão.",
		},
		"snapcompact.shape": {
			label: "Formato do Snapcompact",
			description:
				"Formato de quadro com que o snapcompact imprime o texto (arquivo de compactação e imagens inline). Auto escolhe um formato ajustado ao modelo atual.",
		},
		"branchSummary.enabled": {
			label: "Resumos de Branch",
			description: "Pergunta se deve resumir ao sair de um branch",
		},
		"ttsr.enabled": {
			label: "TTSR",
			description:
				"Interrompe o agente no meio do stream quando a saída casa com os padrões das regras (Time-Traveling Stream Rules)",
		},
		"ttsr.contextMode": {
			label: "Modo de Contexto do TTSR",
			description: "O que fazer com a saída parcial quando o TTSR dispara",
		},
		"ttsr.interruptMode": {
			label: "Modo de Interrupção do TTSR",
			description: "Quando interromper no meio do stream em vez de injetar um aviso depois de concluir",
		},
		"ttsr.repeatMode": {
			label: "Modo de Repetição do TTSR",
			description: "Como as regras podem repetir: uma vez por sessão ou após um intervalo de mensagens",
		},
		"ttsr.repeatGap": {
			label: "Intervalo de Repetição do TTSR",
			description: "Mensagens antes de uma regra poder disparar de novo",
		},
		"ttsr.builtinRules": {
			label: "Regras Internas",
			description:
				"Carrega as regras padrão que vêm com o agente (sobrescreva individualmente com ttsr.disabledRules)",
		},
		"ttsr.disabledRules": {
			label: "Regras Desativadas",
			description: "Nomes de regras a ignorar por completo (vale para as padrão inclusas e para as suas próprias)",
		},
	},
	options: {
		"compaction.methodOrder": {
			remote: {
				label: "Compactação no servidor",
				description:
					"Usa a compactação nativa de servidor do provedor (OpenAI Responses compact, Anthropic compaction beta) quando a rota ativa tem suporte",
			},
			snapcompact: {
				label: "Snapcompact",
				description:
					"Arquiva o histórico em imagens bitmap densas que o modelo de visão ativo relê; sem chamada de LLM",
			},
			handoff: {
				label: "Handoff",
				description: "Gera um documento de handoff e continua a partir dele como resumo da compactação",
			},
			soft: {
				label: "Compactação suave",
				description: "Resume no lugar com um modelo de compactação, sem usar a compactação no servidor",
			},
			shake: {
				label: "Shake",
				description: "Descarta no lugar conteúdo pesado recuperável, sem chamada de LLM",
			},
		},
		"compaction.thresholdPercent": {
			default: { label: "Padrão", description: "Limite antigo baseado em reserva" },
			"10": { label: "10%", description: "Manutenção extremamente antecipada" },
			"20": { label: "20%", description: "Manutenção muito antecipada" },
			"30": { label: "30%", description: "Manutenção antecipada" },
			"40": { label: "40%", description: "Manutenção moderadamente antecipada" },
			"50": { label: "50%", description: "Metade do caminho" },
			"60": { label: "60%", description: "Uso moderado de contexto" },
			"70": { label: "70%", description: "Equilibrado" },
			"75": { label: "75%", description: "Levemente agressivo" },
			"80": { label: "80%", description: "Limite típico" },
			"85": { label: "85%", description: "Uso agressivo de contexto" },
			"90": { label: "90%", description: "Muito agressivo" },
			"95": { label: "95%", description: "Perto do limite de contexto" },
		},
		"compaction.thresholdTokens": {
			default: { label: "Padrão", description: "Usa o limite baseado em percentual" },
			"25000": { label: "25K tokens", description: "1/8 de uma janela de 200K" },
			"50000": { label: "50K tokens", description: "1/4 de uma janela de 200K" },
			"100000": { label: "100K tokens", description: "1/2 de uma janela de 200K" },
			"150000": { label: "150K tokens", description: "3/4 de uma janela de 200K" },
			"200000": { label: "200K tokens", description: "Janela de contexto padrão completa" },
			"300000": { label: "300K tokens", description: "Janela de contexto grande" },
			"500000": { label: "500K tokens", description: "Janela de contexto muito grande" },
		},
		"compaction.idleThresholdTokens": {
			"100000": { label: "100K tokens" },
			"200000": { label: "200K tokens" },
			"300000": { label: "300K tokens" },
			"400000": { label: "400K tokens" },
			"500000": { label: "500K tokens" },
			"600000": { label: "600K tokens" },
			"700000": { label: "700K tokens" },
			"800000": { label: "800K tokens" },
			"900000": { label: "900K tokens" },
		},
		"compaction.idleTimeoutSeconds": {
			"60": { label: "1 minuto" },
			"120": { label: "2 minutos" },
			"300": { label: "5 minutos" },
			"600": { label: "10 minutos" },
			"1800": { label: "30 minutos" },
			"3600": { label: "1 hora" },
		},
		"snapcompact.systemPrompt": {
			none: { label: "Nenhum", description: "Mantém o prompt de sistema como texto." },
			"agents-md": {
				label: "AGENTS.md",
				description:
					"Move para imagens apenas as instruções dos arquivos de contexto carregados, quando isso economizar tokens.",
			},
			all: {
				label: "Tudo",
				description: "Move todo o prompt de sistema para imagens, quando isso economizar tokens.",
			},
		},
		"tools.format": {
			auto: {
				label: "Auto",
				description: "Usa chamadas de ferramenta nativas, a menos que o modelo não tenha suporte conhecido.",
			},
			native: { label: "Nativo", description: "Usa as chamadas de ferramenta nativas do provedor." },
			glm: { label: "GLM", description: "Usa chamadas de ferramenta embutidas no texto, no estilo GLM." },
			hermes: { label: "Hermes", description: "Usa chamadas de ferramenta embutidas no texto, no estilo Hermes." },
			kimi: { label: "Kimi", description: "Usa chamadas de ferramenta embutidas no texto, no estilo Kimi." },
			xml: { label: "XML", description: "Usa chamadas de ferramenta genéricas em XML embutidas no texto." },
			anthropic: {
				label: "Anthropic",
				description: "Usa chamadas de ferramenta embutidas no texto, no estilo Anthropic.",
			},
			deepseek: {
				label: "DeepSeek",
				description: "Usa chamadas de ferramenta embutidas no texto, no estilo DeepSeek.",
			},
			harmony: {
				label: "Harmony",
				description: "Usa chamadas de ferramenta embutidas no texto, no estilo Harmony.",
			},
			qwen3: { label: "Qwen3", description: "Usa o dialeto próprio do Qwen3." },
			gemini: { label: "Gemini", description: "Usa o dialeto próprio do Gemini." },
			gemma: { label: "Gemma", description: "Usa o dialeto próprio do Gemma." },
			minimax: { label: "MiniMax", description: "Usa o dialeto próprio do MiniMax." },
		},
		"snapcompact.shape": {
			auto: {
				label: "Auto",
				description: "Escolhe um formato ajustado ao modelo atual, recorrendo à família do provedor dele.",
			},
			"8x8r-bw": {
				label: "8x8 repetido, preto",
				description:
					"célula quadrada unscii, tinta preta, cada linha impressa duas vezes com a cópia sobre uma faixa de destaque clara.",
			},
			"8x8r-sent": {
				label: "8x8 repetido, cores por frase",
				description: "Grade repetida com a tinta alternando seis cores nos limites das frases.",
			},
			"8x8u-bw": {
				label: "8x8, preto",
				description: "Célula quadrada unscii simples, linhas impressas uma única vez, tinta preta.",
			},
			"8x8u-sent": {
				label: "8x8, cores por frase",
				description: "Célula quadrada unscii simples com tinta colorida por frase.",
			},
			"6x6u-bw": {
				label: "6x6 denso, preto",
				description: "unscii comprimido em 6x6 — a célula legível mais densa, com menos quadros — em tinta preta.",
			},
			"6x6u-sent": {
				label: "6x6 denso, cores por frase",
				description: "A célula mais densa com tinta colorida por frase.",
			},
			"5x8-bw": {
				label: "5x8 antigo, preto",
				description: "Glifos 5x8 originais do X.org no quadro de 2576px, tinta preta.",
			},
			"5x8-sent": {
				label: "5x8 antigo, cores por frase",
				description: "O formato original do snapcompact (sessões anteriores à tabela de formatos usavam este).",
			},
			"6x12-dim": {
				label: "6x12, stopwords atenuadas",
				description: "Glifos 6x12 do X.org, tinta preta, palavras funcionais atenuadas em cinza.",
			},
			"8x13-bw": { label: "8x13, preto", description: "Glifos 8x13 do X.org, tinta preta." },
			"8on16-bw": {
				label: "8x13 com passo de 16px, preto",
				description: "Glifos 8x13 em célula 8x16 (entrelinha extra), tinta preta.",
			},
			"8on22-bw": {
				label: "8x13 com passo de 22px (entrelinha), preto",
				description:
					"Glifos 8x13 em célula 8x22 — espaçamento extra entre linhas para as fileiras não se apertarem. Padrão para OpenAI/Google.",
			},
			"11on16-bw": {
				label: "8x13 com avanço de 11px (espaçamento), preto",
				description:
					"Glifos 8x13 em célula 11x16 — espaçamento extra entre letras para os caracteres não se fundirem. Padrão para Anthropic.",
			},
			"silver16-bw": {
				label: "Silver 16, CJK",
				description: "Fonte TrueType Silver embutida em grade de 16px para texto CJK e outros não latinos.",
			},
			"doc-8on16-bw": {
				label: "Doc 8on16, preto",
				description: "Duas colunas de jornal com quebra de linha, glifos 8x13 em passo de 16px, tinta preta.",
			},
			"doc-8on16-sent": {
				label: "Doc 8on16, cores por frase",
				description: "Layout de documento em duas colunas com tinta colorida por frase.",
			},
			"doc-8on16-sent-dim": {
				label: "Doc 8on16, cores por frase + stopwords atenuadas",
				description:
					"Layout de documento em duas colunas, tinta colorida por frase, palavras funcionais atenuadas em cinza.",
			},
		},
		"ttsr.interruptMode": {
			always: { label: "always", description: "Interrompe em streams de prosa e de ferramenta" },
			"prose-only": { label: "prose-only", description: "Interrompe só quando casa com resposta/raciocínio" },
			"tool-only": {
				label: "tool-only",
				description: "Interrompe só quando casa com argumentos de chamada de ferramenta",
			},
			never: { label: "never", description: "Nunca interrompe; injeta um aviso depois de concluir" },
		},
		"ttsr.repeatGap": {
			"5": { label: "5 mensagens" },
			"10": { label: "10 mensagens" },
			"15": { label: "15 mensagens" },
			"20": { label: "20 mensagens" },
			"30": { label: "30 mensagens" },
		},
	},
};
