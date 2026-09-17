import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the model tab. */
export const model: SettingsLocaleTable = {
	tabs: { model: "Modelo" },
	groups: {
		model: {
			Thinking: "Raciocínio",
			Sampling: "Amostragem",
			Prompt: "Prompt",
			"Retry & Fallback": "Retentativa e Fallback",
			Advisor: "Advisor",
			Prewalk: "Prewalk",
			Vision: "Visão",
		},
	},
	paths: {
		"advisor.enabled": {
			label: "Ativar Advisor",
			description:
				"Pareia um segundo modelo (atribuído ao papel 'advisor') que revisa cada turno passivamente e injeta notas.",
		},
		"prewalk.enabled": {
			label: "Ativar Prewalk",
			description:
				"Começa no modelo ativo e depois troca para um modelo rápido/barato (por padrão o papel 'smol') na primeira edição/escrita depois que a lista de todos do aviso de plano existir — o modelo forte planeja, registra os todos e inicia a implementação antes de repassar o trabalho. Pode ser sobrescrito por sessão com --prewalk / --no-prewalk.",
		},
		"advisor.syncBacklog": {
			label: "Backlog de Sincronização do Advisor",
			description:
				"Pausa o agente principal por até 30 segundos se o advisor ficar atrasado nesta quantidade de turnos. O valor off desativa as esperas de recuperação.",
		},
		"advisor.immuneTurns": {
			label: "Turnos Imunes do Advisor",
			description:
				"Depois que uma ressalva ou um bloqueio do advisor interromper, encaminha as ressalvas/bloqueios seguintes sem interromper por esta quantidade de turnos principais.",
		},
		"advisor.maxNotesPerUpdate": {
			label: "Máximo de Notas do Advisor por Atualização",
			description:
				"Máximo de notas de aconselhamento sem bloqueio aceitas por atualização do prompt do advisor (1–32; a interface oferece atalhos de 1 a 5). Bloqueios são exceção.",
		},
		modelRoleStorage: {
			label: "Armazenamento dos Papéis de Modelo",
			description: "Onde as atribuições de papéis do seletor de modelos são salvas",
		},
		"images.describeForTextModels": {
			label: "Descrever Imagens para Modelos de Texto",
			description:
				"Quando uma imagem é anexada a um modelo sem suporte a visão, salva em local:// e injeta uma descrição feita por um modelo com visão em vez de descartá-la",
		},
		"images.urls.enabled": {
			label: "Servir Imagens como URLs",
			description:
				"Publica as imagens enviadas pela cadeia de backends configurada e manda URLs curtas para provedores que buscam URLs, em vez de base64 embutido. Volta automaticamente ao modo embutido quando todos os backends ou a busca de um provedor falham",
		},
		"images.urls.backends": {
			label: "Backends de URL de Imagem",
			description: "Destinos, em ordem, tentados ao publicar imagens para acesso do provedor",
		},
		"images.urls.command": {
			label: "Comando de Upload de Imagem",
			description:
				"Template de argv para o backend command; {file} é o caminho da imagem, {mime}/{ext} são opcionais. A última URL impressa no stdout é usada (ex.: pasta -b -f {file})",
		},
		"images.urls.publicBaseUrl": {
			label: "Base Pública da URL de Imagem",
			description:
				"URL base acessível externamente que fica à frente do servidor de blobs (obrigatória para ssh, opcional para direct)",
		},
		"images.urls.ttlHours": {
			label: "Tempo de Vida da URL de Imagem (horas)",
			description:
				"Janela de disponibilidade das URLs de imagem hospedadas localmente, contada desde a última vez que uma conversa as enviou; retomar uma conversa reinicia a janela no mesmo link. 0 mantém os links ativos enquanto o broker estiver em execução",
		},
		"images.urls.bindHost": {
			label: "Host de Bind da URL de Imagem",
			description: "Host em que o servidor de blobs escuta; loopback para túneis, 0.0.0.0 para serviço direto",
		},
		"images.urls.sshTarget": {
			label: "Destino SSH da URL de Imagem",
			description: "Destino user@host do redirecionamento reverso por ssh",
		},
		"images.urls.sshRemotePort": {
			label: "Porta Remota SSH da URL de Imagem",
			description: "Porta remota de escuta do redirecionamento reverso ssh para a qual o seu servidor web faz proxy",
		},
		defaultThinkingLevel: {
			label: "Nível de Raciocínio",
			description: "Profundidade do raciocínio em modelos com suporte a raciocínio",
		},
		hideThinkingBlock: {
			label: "Ocultar Blocos de Raciocínio",
			description: "Oculta os blocos de raciocínio nas respostas do assistente",
		},
		proseOnlyThinking: {
			label: "Raciocínio Apenas em Prosa",
			description: "Omite os blocos de código dos resumos de raciocínio e os substitui por reticências",
		},
		omitThinking: {
			label: "Omitir resumos de Raciocínio",
			description:
				"Instrui os provedores upstream a omitir completamente os resumos de raciocínio das respostas (quando houver suporte)",
		},
		externalThinking: {
			label: "Raciocínio Externo",
			description:
				"Rascunho privado; não é mostrado ao usuário. Desativa o raciocínio suportado de GPT, Claude e Gemini",
			warning:
				"Por sua conta e risco: provedores já classificaram esse formato de requisição como abuso, podendo haver sanções em nível de conta",
		},
		"model.loopGuard.enabled": {
			label: "Proteção contra Loop",
			description: "Ativa a detecção automática de loop no stream de raciocínio e de prosa do modelo",
		},
		"model.loopGuard.checkAssistantContent": {
			label: "Proteção contra Loop na Prosa",
			description: "Aplica a proteção contra loop às mensagens em prosa do assistente, além dos logs de raciocínio",
		},
		"model.loopGuard.toolCallReminder": {
			label: "Lembrete de Chamada de Ferramenta da Proteção contra Loop",
			description:
				"Quando um stream de raciocínio do Gemini emite muitos cabeçalhos de planejamento consecutivos sem chamar uma ferramenta, interrompe e injeta um lembrete para fazer uma chamada de ferramenta (requer a Proteção contra Loop)",
		},
		"model.toolCallLoopGuard.enabled": {
			label: "Proteção contra Loop de Chamadas de Ferramenta",
			description:
				"Detecta chamadas de ferramenta idênticas consecutivas entre turnos e injeta uma correção de rumo",
		},
		"model.toolCallLoopGuard.threshold": {
			label: "Limite do Loop de Chamadas de Ferramenta",
			description:
				"Quantidade de chamadas de ferramenta idênticas consecutivas necessária antes de injetar a correção de rumo",
		},
		"model.toolCallLoopGuard.exemptTools": {
			label: "Ferramentas Isentas do Loop de Chamadas",
			description:
				"Nomes de ferramenta que podem se repetir consecutivamente sem acionar a proteção contra loop entre turnos",
		},
		inlineToolDescriptors: {
			label: "Descritores de Ferramenta Embutidos",
			description:
				"Renderiza os descritores completos das ferramentas no prompt do sistema e remove as descrições de nível superior/aninhadas dos schemas de ferramenta do provedor, para que o texto do descritor seja enviado uma única vez. Auto ativa isso para modelos Gemini e desativa nos demais",
		},
		includeModelInPrompt: {
			label: "Incluir o Modelo no Prompt",
			description:
				"Expõe o identificador do modelo ativo no prompt do sistema para que o agente saiba qual modelo ele é",
		},
		includeWorkspaceTree: {
			label: "Incluir a Árvore do Workspace",
			description:
				"Renderiza a árvore de diretórios do workspace no prompt do sistema. ATENÇÃO: isso pode invalidar o cache de prompt entre sessões quando arquivos são modificados.",
		},
		skillful: {
			label: "Listar Skills no Prompt",
			description:
				"Lista as skills disponíveis no prompt do sistema; desative para economizar contexto e alterne por sessão com /skillful",
		},
		personality: {
			label: "Personalidade",
			description: "Estilo de comunicação renderizado no bloco de personalidade do prompt do sistema",
		},
		temperature: {
			label: "Temperatura",
			description: "Temperatura de amostragem (0 = determinístico, 1 = criativo, -1 = padrão do provedor)",
		},
		topP: {
			label: "Top P",
			description: "Corte da amostragem por núcleo (0-1, -1 = padrão do provedor)",
		},
		topK: {
			label: "Top K",
			description: "Amostra entre os K tokens mais prováveis (-1 = padrão do provedor)",
		},
		minP: {
			label: "Min P",
			description: "Limite mínimo de probabilidade (0-1, -1 = padrão do provedor)",
		},
		presencePenalty: {
			label: "Penalidade de Presença",
			description: "Penalidade por introduzir tokens já presentes (-1 = padrão do provedor)",
		},
		repetitionPenalty: {
			label: "Penalidade de Repetição",
			description: "Penalidade por tokens repetidos (-1 = padrão do provedor)",
		},
		textVerbosity: {
			label: "Verbosidade do Texto",
			description: "Verbosidade das respostas de OpenAI Responses e Codex (low, medium ou high)",
		},
		"tier.openai": {
			label: "Nível de Serviço — OpenAI",
			description:
				"Nível de processamento para requisições OpenAI / OpenAI-Codex e para modelos da família OpenAI roteados via OpenRouter (none = omitir). Enviado como `service_tier`.",
		},
		"tier.anthropic": {
			label: "Nível de Serviço — Anthropic",
			description:
				'Nível de processamento para requisições Claude. `priority` ativa o modo rápido (`speed: "fast"`) em modelos Anthropic diretos com suporte; é ignorado no Claude via Bedrock/Vertex e via OpenRouter.',
		},
		"tier.google": {
			label: "Nível de Serviço — Google",
			description:
				"Nível de processamento para requisições Gemini (Google AI Studio + Vertex) e para modelos da família Google roteados via OpenRouter (none = omitir). Enviado como o campo `serviceTier` de nível superior.",
		},
		"tier.subagent": {
			label: "Nível de Serviço — Subagente",
			description:
				"Nível de serviço para os subagentes de task/eval criados. Inherit = acompanha os níveis por família ativos do agente principal (segue /fast); escolha um valor para aplicá-lo à família a que o modelo do subagente pertence.",
		},
		"tier.advisor": {
			label: "Nível de Serviço — Advisor",
			description:
				"Nível de serviço do modelo advisor. None = processamento padrão; Inherit = acompanha os níveis por família ativos do agente principal; escolha um valor para aplicá-lo à família do modelo advisor.",
		},
		"retry.maxRetries": {
			label: "Número de Retentativas",
			description: "Número máximo de retentativas em erros de API",
		},
		"retry.maxDelayMs": {
			label: "Espera Máxima entre Retentativas",
			description:
				"Espera máxima entre retentativas, em ms. Quando o provedor pede para esperar mais do que isso e nenhum fallback de credencial ou de modelo funciona, a requisição falha de imediato em vez de dormir (ex.: janelas de rate limit de 3 horas da Anthropic). 0 desativa o teto — para deixar a sessão retomar automaticamente depois dos resets de cota informados pelo provedor.",
		},
		"retry.waitForUsageReset": {
			label: "Esperar o Reset de Uso",
			description:
				"Quando um provedor informa esgotamento do limite de uso com horário de reset (janelas de cota de 5 horas ou semanais em qualquer provedor), dorme até o reset em vez de falhar de imediato ao passar de retry.maxDelayMs. As esperas podem ser abortadas (Esc), mas também travam subagentes, então deixe desativado em execuções sem supervisão.",
		},
		"retry.modelFallback": {
			label: "Fallback de Modelo na Retentativa",
			description: "Permite que a recuperação por retentativa troque para os modelos de fallback configurados",
		},
		"retry.usageAwareFallback": {
			label: "Fallback Ciente do Uso",
			description:
				"Usa relatórios confiáveis de cota de planos de código para preferir contas do mesmo provedor e, depois, os modelos de fallback configurados, antes de bater em um limite de uso rígido. Chaves de API comuns configuradas ficam de fora.",
		},
		"retry.usageReservePct": {
			label: "Margem de Reserva",
			description:
				"Considera um modelo de plano de código próximo do limite abaixo desta porcentagem restante. Uso desconhecido ou não mapeado mantém o modelo principal.",
		},
		"retry.usageReservePolicy": {
			label: "Política de Reserva",
			description:
				"O que fazer quando todas as contas de plano de código do mesmo provedor estão dentro da margem de reserva.",
		},
		"retry.fallbackChains": {
			label: "Cadeias de Fallback da Retentativa",
			description:
				'Objeto JSON que mapeia papéis de modelo, seletores de modelo ("provider/model-id") ou curingas de provedor ("provider/*") para seletores de fallback ordenados, ex.: {"default":["openai/gpt-4o-mini"],"google-antigravity/*":["google/*","google-vertex/*"]}. Chaves orientadas a modelo valem sempre que aquele modelo/provedor está ativo, independentemente do papel; uma entrada "provider/*" mantém o id do modelo que falhou e troca o provedor. Um curinga com prefixo de id ("openrouter/google/*") reaplica o prefixo ao id puro do modelo que falhou (google-antigravity/gemini-x -> openrouter/google/gemini-x) e, usado como chave, casa apenas com os ids daquele provedor sob o prefixo. Uma entrada de fallback pode levar um sufixo explícito de raciocínio ("provider/model:low", ":high", ":max", ":off"); uma entrada sem sufixo herda o esforço do turno que falhou, e entradas "provider/*" sempre herdam.',
		},
		"retry.fallbackRevertPolicy": {
			label: "Política de Retorno do Fallback",
			description: "Quando voltar ao modelo principal depois de um fallback",
		},
		"providers.anthropic.serverSideFallback": {
			label: "Fallback no Servidor da Anthropic (Fable 5)",
			description:
				"Quando uma requisição Claude Fable 5 / Mythos 5 é bloqueada pelo classificador de segurança da Anthropic, repete no Claude Opus 4.8 do lado do servidor (beta `server-side-fallback-2026-06-01` da Anthropic). É opcional — deixar desativado preserva, em todas as requisições, o comportamento anterior ao fallback.",
		},
		"providers.autoThinkingModel": {
			label: "Modelo do Raciocínio Auto",
			description:
				"Classificador de dificuldade para o nível de raciocínio `auto`: online (o papel TINY de /models, senão smol) por padrão, ou um modelo local no dispositivo",
		},
		"providers.autoThinkingMaxEffort": {
			label: "Teto do Raciocínio Auto",
			description:
				"Maior esforço que o classificador `auto` pode resolver. `xhigh` mantém o classificador um nível abaixo do topo, então só um `ultrathink` explícito alcança `max`; `max` deixa um turno julgado excepcional pelo classificador cobrar o nível mais alto nos modelos que o expõem.",
		},
	},
	options: {
		"advisor.immuneTurns": {
			"0": { label: "0 turnos", description: "Permite que toda ressalva/bloqueio interrompa." },
			"1": { label: "1 turno" },
			"2": { label: "2 turnos" },
			"3": { label: "3 turnos", description: "Padrão." },
			"4": { label: "4 turnos" },
			"5": { label: "5 turnos" },
		},
		"advisor.maxNotesPerUpdate": {
			"1": { label: "1 nota", description: "Anti-inundação (estrito)." },
			"2": { label: "2 notas" },
			"3": { label: "3 notas" },
			"4": { label: "4 notas", description: "Padrão." },
			"5": { label: "5 notas" },
		},
		modelRoleStorage: {
			global: {
				label: "Global",
				description: "Salva os modelos dos papéis na configuração do perfil ativo (comportamento atual)",
			},
			project: {
				label: "Por projeto",
				description:
					"Salva os modelos dos papéis do projeto em .omp/config.yml; papéis ausentes no projeto usam os padrões globais",
			},
		},
		"images.urls.backends": {
			imgur: {
				label: "Imgur",
				description: "Os uploads exigem um token de acesso ou um client ID do Imgur.",
			},
			imageshack: { label: "ImageShack", description: "A API exige uma assinatura paga." },
			flickr: { label: "Flickr", description: "hospedagem de imagens" },
			chevereto: { label: "Chevereto", description: "auto-hospedado" },
			vgyme: { label: "vgy.me", description: "hospedagem de imagens" },
			dropbox: { label: "Dropbox", description: "arquivos em nuvem" },
			ftp: { label: "FTP / FTPS / SFTP", description: "transferência de arquivos" },
			onedrive: { label: "OneDrive", description: "arquivos em nuvem" },
			"google-drive": { label: "Google Drive", description: "arquivos em nuvem" },
			puush: {
				label: "endpoint compatível com puush",
				description: "O serviço público foi encerrado; é necessário um endpoint substituto.",
			},
			box: { label: "Box", description: "arquivos em nuvem" },
			"amazon-s3": { label: "Amazon S3", description: "s3" },
			"google-cloud-storage": {
				label: "Google Cloud Storage",
				description: "armazenamento de objetos",
			},
			"azure-storage": { label: "Azure Blob Storage", description: "armazenamento de objetos" },
			"backblaze-b2": {
				label: "Backblaze B2",
				description: "Configure chaves de aplicação nativas do B2 ou chaves de acesso compatíveis com S3.",
			},
			owncloud: { label: "ownCloud / Nextcloud", description: "webdav" },
			mediafire: {
				label: "endpoint compatível com MediaFire",
				description: "A API pública está obsoleta; é necessário um endpoint substituto.",
			},
			sendspace: {
				label: "endpoint compatível com SendSpace",
				description: "A API pública de descoberta está obsoleta; é necessário um endpoint substituto.",
			},
			localhostr: {
				label: "endpoint compatível com Hostr",
				description: "O serviço público está fora do ar; é necessário um endpoint substituto.",
			},
			lambda: {
				label: "endpoint compatível com Lambda",
				description: "O serviço público está fora do ar; é necessário um endpoint substituto.",
			},
			pomf: { label: "Pomf", description: "pomf" },
			uguu: {
				label: "Uguu",
				description: "Os uploads públicos expiram após aproximadamente três horas.",
			},
			seafile: { label: "Seafile", description: "arquivos em nuvem" },
			"s-ul": { label: "s-ul", description: "hospedagem de arquivos" },
			lobfile: {
				label: "endpoint compatível com LobFile",
				description: "O serviço público está fora do ar; é necessário um endpoint substituto.",
			},
			"transfer-sh": {
				label: "endpoint compatível com transfer.sh",
				description:
					"O endpoint público foi encerrado e está bloqueado; é necessário um substituto auto-hospedado.",
			},
			plik: { label: "Plik", description: "auto-hospedado" },
			"shared-folder": { label: "Pasta compartilhada", description: "sistema de arquivos" },
			catbox: { label: "Catbox", description: "hospedagem anônima" },
			litterbox: { label: "Litterbox", description: "Os uploads são temporários." },
			"0x0": {
				label: "0x0.st",
				description: "Os uploads públicos expiram após um período de retenção definido pelo tamanho do arquivo.",
			},
			tmpfiles: { label: "tmpfiles.org", description: "Os uploads públicos são temporários." },
			discord: { label: "Discord", description: "mensageria" },
			"provider-files": {
				label: "Arquivos do provedor do modelo",
				description: "As referências de arquivo do provedor são locais à API, não URLs públicas de imagem.",
			},
			direct: { label: "URL pública direta", description: "serviço local" },
			cloudflared: { label: "Túnel rápido do Cloudflare", description: "túnel" },
			ngrok: { label: "ngrok", description: "túnel" },
			tailscale: { label: "Tailscale Funnel", description: "túnel" },
			ssh: { label: "Túnel reverso SSH", description: "túnel" },
			command: { label: "Comando de upload", description: "comando externo" },
			"localhost-run": { label: "localhost.run", description: "túnel" },
			pinggy: { label: "Pinggy", description: "túnel" },
			devtunnel: {
				label: "Microsoft dev tunnel",
				description: "A CLI devtunnel precisa estar autenticada localmente.",
			},
			zrok: { label: "zrok", description: "O ambiente zrok local precisa estar habilitado." },
			bore: { label: "bore", description: "túnel" },
			"named-cloudflared": { label: "Túnel nomeado do Cloudflare", description: "túnel" },
			r2: { label: "Cloudflare R2", description: "s3" },
			tigris: { label: "Tigris", description: "s3" },
			minio: { label: "MinIO", description: "s3" },
			garage: { label: "Garage", description: "s3" },
		},
		defaultThinkingLevel: {
			auto: { label: "auto", description: "Detecta automaticamente por prompt" },
			minimal: { label: "min", description: "Raciocínio muito breve (~1k tokens)" },
			low: { label: "low", description: "Raciocínio leve (~2k tokens)" },
			medium: { label: "medium", description: "Raciocínio moderado (~8k tokens)" },
			high: { label: "high", description: "Raciocínio profundo (~16k tokens)" },
			xhigh: { label: "xhigh", description: "Raciocínio estendido (~32k tokens)" },
			max: { label: "max", description: "Máximo de raciocínio que o modelo suporta" },
		},
		inlineToolDescriptors: {
			auto: {
				label: "Auto",
				description: "Embute os descritores para modelos Gemini; nos demais, mantém nos schemas de ferramenta",
			},
			on: { label: "Ativado", description: "Sempre embute os descritores no prompt do sistema" },
			off: {
				label: "Desativado",
				description: "Mantém os descritores apenas nos schemas de ferramenta do provedor",
			},
		},
		personality: {
			default: {
				label: "Padrão",
				description: "Engenheiro conciso e baseado em evidências; respostas densas e orientadas a ação",
			},
			friendly: {
				label: "Amigável",
				description: "Colaborador acolhedor e encorajador, focado em ritmo e ânimo",
			},
			pragmatic: {
				label: "Pragmático",
				description: "Engenheiro direto e eficiente, focado em clareza e rigor",
			},
			none: { label: "Nenhuma", description: "Omite completamente o bloco de personalidade" },
		},
		temperature: {
			"-1": { label: "Padrão", description: "Usa o padrão do provedor" },
			"0": { label: "0", description: "Determinístico" },
			"0.2": { label: "0.2", description: "Focado" },
			"0.5": { label: "0.5", description: "Equilibrado" },
			"0.7": { label: "0.7", description: "Criativo" },
			"1": { label: "1", description: "Variedade máxima" },
		},
		topP: {
			"-1": { label: "Padrão", description: "Usa o padrão do provedor" },
			"0.1": { label: "0.1", description: "Muito focado" },
			"0.3": { label: "0.3", description: "Focado" },
			"0.5": { label: "0.5", description: "Equilibrado" },
			"0.9": { label: "0.9", description: "Amplo" },
			"1": { label: "1", description: "Sem filtragem por núcleo" },
		},
		topK: {
			"-1": { label: "Padrão", description: "Usa o padrão do provedor" },
			"1": { label: "1", description: "Token mais provável (greedy)" },
			"20": { label: "20", description: "Focado" },
			"40": { label: "40", description: "Equilibrado" },
			"100": { label: "100", description: "Amplo" },
		},
		minP: {
			"-1": { label: "Padrão", description: "Usa o padrão do provedor" },
			"0.01": { label: "0.01", description: "Muito permissivo" },
			"0.05": { label: "0.05", description: "Equilibrado" },
			"0.1": { label: "0.1", description: "Restritivo" },
		},
		presencePenalty: {
			"-1": { label: "Padrão", description: "Usa o padrão do provedor" },
			"0": { label: "0", description: "Sem penalidade" },
			"0.5": { label: "0.5", description: "Novidade leve" },
			"1": { label: "1", description: "Incentiva a novidade" },
			"2": { label: "2", description: "Novidade forte" },
		},
		repetitionPenalty: {
			"-1": { label: "Padrão", description: "Usa o padrão do provedor" },
			"0.8": { label: "0.8", description: "Permite repetição" },
			"1": { label: "1", description: "Sem penalidade" },
			"1.1": { label: "1.1", description: "Penalidade leve" },
			"1.2": { label: "1.2", description: "Equilibrado" },
			"1.5": { label: "1.5", description: "Penalidade forte" },
		},
		textVerbosity: {
			low: { label: "Baixa", description: "Prefere respostas concisas" },
			medium: { label: "Média", description: "Equilibra concisão e detalhe (padrão)" },
			high: { label: "Alta", description: "Prefere respostas detalhadas" },
		},
		"tier.openai": {
			none: { label: "Nenhum", description: "Omite service_tier (processamento padrão)" },
			auto: { label: "Auto", description: "Seleção de nível padrão do provedor" },
			default: { label: "Padrão", description: "Processamento com prioridade padrão" },
			flex: { label: "Flex", description: "Custo menor, latência maior quando disponível" },
			scale: { label: "Scale", description: "Créditos do Scale Tier quando disponíveis" },
			priority: { label: "Prioritário", description: "Mais rápido, custo maior (requisição premium)" },
		},
		"tier.anthropic": {
			none: { label: "Nenhum", description: "Processamento padrão" },
			priority: {
				label: "Prioritário",
				description:
					'Modo rápido (`speed: "fast"`) em modelos Claude diretos com suporte; ignorado em Bedrock/Vertex',
			},
		},
		"tier.google": {
			none: { label: "Nenhum", description: "Processamento padrão" },
			flex: {
				label: "Flex",
				description: "Custo menor, latência maior (Gemini API + Vertex)",
			},
			priority: {
				label: "Prioritário",
				description: "Mais rápido, mais confiável (Gemini API + Vertex)",
			},
		},
		"tier.subagent": {
			inherit: {
				label: "Herdar",
				description: "Acompanha os níveis por família ativos do agente principal",
			},
			none: { label: "Nenhum", description: "Processamento padrão" },
			auto: {
				label: "Auto",
				description: "Seleção de nível padrão do provedor (família OpenAI)",
			},
			default: {
				label: "Padrão",
				description: "Processamento com prioridade padrão (família OpenAI)",
			},
			flex: {
				label: "Flex",
				description: "Nível de capacidade flexível (famílias OpenAI/Google)",
			},
			scale: { label: "Scale", description: "Créditos do Scale Tier (família OpenAI)" },
			priority: {
				label: "Prioritário",
				description: "Prioridade em toda família suportada do modelo criado",
			},
		},
		"tier.advisor": {
			inherit: {
				label: "Herdar",
				description: "Acompanha os níveis por família ativos do agente principal",
			},
			none: { label: "Nenhum", description: "Processamento padrão" },
			auto: {
				label: "Auto",
				description: "Seleção de nível padrão do provedor (família OpenAI)",
			},
			default: {
				label: "Padrão",
				description: "Processamento com prioridade padrão (família OpenAI)",
			},
			flex: {
				label: "Flex",
				description: "Nível de capacidade flexível (famílias OpenAI/Google)",
			},
			scale: { label: "Scale", description: "Créditos do Scale Tier (família OpenAI)" },
			priority: {
				label: "Prioritário",
				description: "Prioridade em toda família suportada do modelo criado",
			},
		},
		"retry.maxRetries": {
			"1": { label: "1 retentativa" },
			"2": { label: "2 retentativas" },
			"3": { label: "3 retentativas" },
			"5": { label: "5 retentativas" },
			"10": { label: "10 retentativas" },
		},
		"retry.usageReservePct": {
			"5": { label: "5%", description: "Age apenas quando estiver quase esgotado" },
			"10": { label: "10%", description: "Margem de segurança equilibrada" },
			"15": { label: "15%", description: "Conservador" },
			"20": { label: "20%", description: "Proteção antecipada" },
			"25": { label: "25%", description: "Muito conservador" },
		},
		"retry.usageReservePolicy": {
			confirm: {
				label: "Confirmar interativamente",
				description:
					"Mantém as sessões interativas no modelo principal até haver confirmação; agentes em background fazem fallback automático",
			},
			auto: {
				label: "Fallback automático",
				description: "Sempre seleciona o próximo fallback configurado elegível",
			},
			"fail-closed": {
				label: "Falhar fechado",
				description: "Não gasta a cota de reserva nem seleciona um fallback",
			},
		},
		"retry.fallbackRevertPolicy": {
			"cooldown-expiry": {
				label: "Fim do cooldown",
				description: "Volta ao modelo principal quando a janela de supressão dele terminar",
			},
			never: {
				label: "Nunca",
				description: "Permanece no modelo de fallback até ser alterado manualmente",
			},
		},
		"providers.autoThinkingModel": {
			online: {
				label: "Online (papel TINY, senão @smol)",
				description:
					"Classifica a dificuldade do prompt online com o modelo do papel TINY (defina um em /models) ou @smol; sem download local nem inferência no dispositivo.",
			},
			"qwen3-1.7b": {
				label: "Qwen3 1.7B",
				description:
					"Somente MLX (providers.tinyModelDevice=mlx): o onnxruntime-node não consegue executar as atualizações de cache de RotaryEmbedding deste export ONNX.",
			},
			"llama3.2:3b": {
				label: "Llama 3.2 3B",
				description:
					"Opção maior do Llama 3.2 para tarefas locais de memória/classificação; potencial de mais qualidade com maior custo de disco/RAM/latência.",
			},
			"gemma-3-1b": {
				label: "Gemma 3 1B",
				description:
					"Melhor consolidação/deduplicação; pegada mais leve, mas deixa escapar conversa informal durante a extração.",
			},
			"qwen2.5-1.5b": {
				label: "Qwen2.5 1.5B",
				description: "Melhor granularidade de extração (fatos atômicos); consolidação mais fraca.",
			},
			"lfm2-1.2b": {
				label: "LFM2 1.2B",
				description: "Carregamento mais rápido; bom em tudo, com rótulos de extração um pouco mais ruidosos.",
			},
		},
		"providers.autoThinkingMaxEffort": {
			xhigh: { label: "xhigh", description: "O classificador para em xhigh (padrão)" },
			max: {
				label: "max",
				description: "O classificador pode resolver max quando o modelo suportar",
			},
		},
	},
};
