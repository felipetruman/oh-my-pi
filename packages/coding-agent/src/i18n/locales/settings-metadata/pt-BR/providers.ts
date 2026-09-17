import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the providers tab. */
export const providers: SettingsLocaleTable = {
	tabs: { providers: "Provedores" },
	groups: {
		providers: {
			Services: "Serviços",
			Fireworks: "Fireworks",
			"Tiny Model": "Modelo Pequeno",
			Protocol: "Protocolo",
			Timeouts: "Timeouts",
			Privacy: "Privacidade",
		},
	},
	paths: {
		"providers.maxInFlightRequests": {
			label: "Máximo de Requisições Simultâneas",
			description:
				'Número máximo de requisições LLM simultâneas por id de provedor (por exemplo "openai" ou "anthropic"), compartilhado entre os processos locais do OMP que usam esta raiz de configuração. Provedores omitidos ficam sem limite.',
		},
		"providers.openai-codex.codeMode": {
			label: "Code Mode do Codex",
			description:
				"Roteia os modelos code_mode_only do Codex (GPT-5.6) pelo eval. As ferramentas diretas são eval, ask, todo, yield, think, checkpoint e rewind. Use células de eval para as outras ferramentas da sessão. Espelha o Code Mode do codex-rs. 'auto' segue a flag do catálogo de modelos.",
		},
		"providers.openai-codex.codeModeDirectTools": {
			label: "Ferramentas Diretas do Code Mode do Codex",
			description:
				"Ferramentas diretas extras para o Code Mode do Codex. As ferramentas diretas padrão são eval, ask, todo, yield, think, checkpoint e rewind.",
		},
		"secrets.enabled": {
			label: "Ocultar Segredos",
			description:
				"Obfusca os segredos configurados e censura tokens com formato de credencial antes de enviar aos provedores de IA",
		},
		"providers.ollama-cloud.maxConcurrency": {
			label: "Concorrência Máxima do Ollama Cloud",
			description:
				"Número máximo de execuções simultâneas de subagentes no Ollama Cloud por processo; 0 desativa o limite específico do provedor",
		},
		"providers.webSearchOrder": {
			label: "Ordem dos Provedores de Busca na Web",
			description:
				"Provedores priorizados para a ferramenta web_search; os provedores não listados mantêm a ordem padrão depois deles",
		},
		"providers.webSearchExclude": {
			label: "Provedores de Busca na Web Excluídos",
			description: "Provedores que o web_search nunca deve usar, nem como fallback",
		},
		"providers.webSearchTimeoutSeconds": {
			label: "Timeout da Busca na Web",
			description:
				"Timeout rígido do transporte de busca de cada provedor antes de o web_search passar para o próximo fallback, em segundos (máximo 300)",
		},
		"providers.webSearchGeminiModel": {
			label: "Modelo do Gemini para web_search",
			description: "ID do modelo para o grounding do Google Search via Gemini. O padrão é gemini-2.5-flash.",
		},
		"providers.antigravityEndpoint": {
			label: "Modo de Endpoint do Antigravity",
			description:
				"Estratégia de roteamento de endpoint para os provedores google-antigravity (chat, busca, imagem, descoberta)",
		},
		"providers.imageOrder": {
			label: "Ordem dos Provedores de Imagem",
			description:
				"Provedores priorizados para geração de imagem; os provedores não listados seguem o provedor ativo da sessão e a ordem embutida",
		},
		"providers.fireworksTier": {
			label: "Tier do Fireworks",
			description:
				'Caminho de atendimento das requisições ao Fireworks. Priority envia `service_tier: "priority"` para mais confiabilidade nos picos de tráfego, a um preço maior; Standard omite isso. Modelos Fast (`-fast`) ignoram esta opção — Fast é um caminho de atendimento próprio.',
		},
		"live.voice": {
			label: "Voz ao Vivo",
			description: "Voz usada nas sessões de voz em tempo real atendidas pelo Codex",
		},
		"providers.tts": {
			label: "Provedor de Text-to-Speech",
			description:
				"Backend da ferramenta tts: TTS neural local no dispositivo (Kokoro-82M), xAI Grok Voice ou fala da DeepInfra",
		},
		"tts.localModel": {
			label: "Modelo de TTS Local",
			description: "Modelo de TTS neural no dispositivo (Kokoro-82M) usado pelo backend de TTS local",
		},
		"tts.localVoice": {
			label: "Voz do TTS Local",
			description: "Voz do Kokoro usada pelo backend de TTS local (americana/britânica, feminina/masculina)",
		},
		"speech.enabled": {
			label: "Vocalização da Fala",
			description: "Fala em voz alta a saída do assistente pelos alto-falantes conforme ela é transmitida",
		},
		"speech.mode": {
			label: "Modo de Vocalização da Fala",
			description:
				"O que falar: all = mensagens do assistente + raciocínio; assistant = só as mensagens; yield = só a mensagem final no fim do turno",
		},
		"speech.enhanced": {
			label: "Reescrita Aprimorada da Fala",
			description:
				"Reescreve a saída do assistente como prosa falada natural com o modelo tiny/smol antes da síntese (descreve o código, remove links e markdown). Cai para uma limpeza mecânica em caso de falha",
		},
		"speech.voice": {
			label: "Voz da Vocalização da Fala",
			description: "Voz do Kokoro usada ao falar a saída do assistente em voz alta",
		},
		"providers.tinyModel": {
			label: "Modelo Pequeno",
			description:
				"Modelo dos títulos de sessão: online (o papel TINY de /models, senão @smol) por padrão, ou um modelo local no dispositivo",
		},
		"providers.tinyModelDevice": {
			label: "Dispositivo do Modelo Pequeno",
			description:
				"Backend de inferência para os modelos pequenos locais (títulos + memória): um execution provider do ONNX, ou `mlx` para baixar os pesos MLX e rodá-los pelo mlx-lm em Apple silicon. O padrão usa ONNX só em CPU. A variável de ambiente PI_TINY_DEVICE sobrescreve isso.",
		},
		"providers.tinyModelDtype": {
			label: "Precisão do Modelo Pequeno",
			description:
				"Quantização/precisão ONNX para os modelos pequenos locais. O padrão usa o dtype que vem com cada modelo (q4); precisão menor é mais rápida, maior é mais fiel. Ignorado pelo backend MLX (os repos dele já vêm quantizados em 4 bits). A variável de ambiente PI_TINY_DTYPE sobrescreve isso.",
		},
		"providers.unexpectedStopModel": {
			label: "Modelo de Parada Inesperada",
			description:
				"Classificador da detecção Smart de parada inesperada: online (o papel TINY de /models, senão smol) por padrão, ou um modelo local no dispositivo.",
		},
		"providers.kimiApiFormat": {
			label: "Formato de API do Kimi",
			description: "Formato de API do provedor Kimi Code (auto segue os metadados de modelo ao vivo)",
		},
		"providers.openaiWebsockets": {
			label: "WebSockets da OpenAI",
			description:
				"Política de websocket para os modelos OpenAI Codex (auto usa os padrões do modelo, on força, off desativa)",
		},
		"providers.cacheRetention": {
			label: "Retenção do Prompt Cache",
			description:
				"Retenção do prompt cache repassada aos provedores que a suportam (Anthropic, Bedrock, OpenRouter, OpenAI)",
		},
		"providers.streamFirstEventTimeoutSeconds": {
			label: "Timeout do Primeiro Evento do Stream",
			description:
				"Segundos de espera pelo primeiro evento do stream do modelo; -1 usa os padrões do provedor/ambiente, 0 desativa o watchdog",
		},
		"providers.streamIdleTimeoutSeconds": {
			label: "Timeout de Stream Ocioso",
			description:
				"Segundos que um stream do modelo pode ficar em silêncio entre eventos; -1 usa os padrões do provedor/ambiente, 0 desativa o watchdog",
		},
		"providers.openrouterVariant": {
			label: "Roteamento do OpenRouter",
			description:
				"Sufixo de variante de roteamento padrão anexado aos IDs de modelo do OpenRouter (ignorado quando o seletor já nomeia uma variante)",
		},
		"providers.fetch": {
			label: "Provedor de Fetch",
			description: "Prioridade dos backends de leitura para a ferramenta de fetch/read de URL",
		},
		"codexResets.autoRedeem": {
			label: "Resgate Automático de Resets Salvos do Codex",
			description:
				"Gasta automaticamente os resets de rate limit salvos do Codex: restaura uma conta bloqueada por uma janela de 5h ou semanal esgotada quando um turno está travado e nenhuma outra conta pode assumir, e aproveita créditos perto de expirar. unset pergunta antes do primeiro gasto, yes gasta sem perguntar e no desativa as duas verificações.",
		},
		"codexResets.minBlockedMinutes": {
			label: "Bloqueio Mínimo para o Resgate Automático do Codex",
			description:
				"Só faz o resgate automático quando o desbloqueio natural — o último reset entre as janelas de 5h/semanal esgotadas — está a pelo menos esses minutos de distância (não gaste um crédito escasso para economizar uma espera curta). Aumente (por exemplo 360) para ignorar bloqueios só de 5h.",
		},
		"codexResets.keepCredits": {
			label: "Reserva do Resgate Automático do Codex",
			description:
				"Nunca gasta automaticamente abaixo dessa quantidade de resets salvos (0 = o último crédito pode ser gasto automaticamente). Créditos perto de expirar são exceção — um crédito reservado que expira não preserva nada.",
		},
		"codexResets.salvageHorizonHours": {
			label: "Horizonte de Aproveitamento de Resets do Codex",
			description:
				"Gasta automaticamente um reset salvo do Codex quando ele expiraria dentro dessas horas e alguma das janelas de chat (5h ou semanal) tem uso relevante a restaurar (0 desativa o aproveitamento por expiração).",
		},
		"provider.appendOnlyContext": {
			label: "Contexto Append-Only",
			description:
				"Guarda em cache o prompt de sistema + as especificações das ferramentas e mantém um log de mensagens append-only, para que os prefix caches dos provedores (DeepSeek, Xiaomi/SGLang, Anthropic) acertem na taxa máxima. Auto ativa para os provedores conhecidos com prefix cache.",
		},
		"exa.enabled": {
			label: "Exa",
			description: "Ativa o provedor de busca na web Exa",
		},
		"exa.searchDelayMs": {
			label: "Atraso de Busca do Exa",
			description:
				"Atraso mínimo entre requisições de busca na web do Exa, em milissegundos; defina 0 para desativar o espaçamento",
		},
		"searxng.endpoint": {
			label: "Endpoint do SearXNG",
			description: "URL base de uma instância self-hosted do SearXNG usada para busca na web",
		},
	},
	options: {
		"providers.webSearchOrder": {
			perplexity: {
				label: "Perplexity",
				description: "Usa autenticação quando configurada; a seleção explícita cai para busca anônima",
			},
			gemini: {
				label: "Gemini",
				description:
					"Grounding do Google Search via Gemini (usa OAuth do google-gemini-cli ou do google-antigravity)",
			},
			anthropic: {
				label: "Anthropic",
				description: "Ferramenta web_search nativa do Claude (usa OAuth da Anthropic ou ANTHROPIC_API_KEY)",
			},
			codex: {
				label: "OpenAI",
				description: "web_search nativo da OpenAI (usa OAuth do ChatGPT via /login openai-codex)",
			},
			xai: {
				label: "xAI",
				description:
					"Busca na web do Grok pela Responses API da xAI (usa OAuth do SuperGrok/X Premium+ via /login xai-oauth, ou XAI_API_KEY)",
			},
			zai: { label: "Z.AI", description: "Chama o MCP webSearchPrime da Z.AI" },
			exa: { label: "Exa", description: "API via /login exa ou EXA_API_KEY; fallback explícito sem chave via MCP" },
			tinyfish: { label: "TinyFish", description: "Requer TINYFISH_API_KEY" },
			jina: { label: "Jina", description: "Requer JINA_API_KEY" },
			kagi: { label: "Kagi", description: "Requer KAGI_API_KEY e acesso ao beta da Kagi Search API" },
			tavily: { label: "Tavily", description: "Requer TAVILY_API_KEY" },
			firecrawl: {
				label: "Firecrawl",
				description: "Usa a API do Firecrawl quando FIRECRAWL_API_KEY está definida; cai para o modo sem chave",
			},
			brave: { label: "Brave", description: "Requer BRAVE_API_KEY" },
			kimi: {
				label: "Kimi",
				description:
					"Busca do Kimi Code (requer uma chave do Kimi Code Console via KIMI_SEARCH_API_KEY/MOONSHOT_SEARCH_API_KEY ou /login kimi-code; não MOONSHOT_API_KEY)",
			},
			parallel: {
				label: "Parallel",
				description: "API via /login parallel ou PARALLEL_API_KEY; fallback explícito sem chave via MCP",
			},
			synthetic: { label: "Synthetic", description: "Requer SYNTHETIC_API_KEY" },
			ollama: { label: "Ollama", description: "Requer OLLAMA_CLOUD_API_KEY" },
			searxng: { label: "SearXNG", description: "Requer SEARXNG_ENDPOINT ou searxng.endpoint" },
			startpage: {
				label: "Startpage",
				description:
					"Scrape sem credenciais dos resultados do Startpage (baseado no Google); pode cair em desafio anti-bot",
			},
			duckduckgo: {
				label: "DuckDuckGo",
				description:
					"Fallback sem credenciais de melhor esforço; pode cair em desafio anti-bot em IPs de datacenter ou de saída compartilhada",
			},
			ecosia: {
				label: "Ecosia",
				description: "Scrape sem credenciais, feito pelo navegador, dos resultados do Ecosia (baseado no Google)",
			},
			google: {
				label: "Google",
				description: "Fallback sem credenciais feito pelo navegador; mais lento e pode cair em desafio anti-bot",
			},
			mojeek: {
				label: "Mojeek",
				description: "Scrape sem credenciais, feito pelo navegador, do índice independente do Mojeek",
			},
			public: {
				label: "Web Pública",
				description:
					"Consulta em paralelo todos os motores sem credenciais e consolida os resultados sem duplicatas",
			},
		},
		"providers.webSearchExclude": {
			perplexity: {
				label: "Perplexity",
				description: "Usa autenticação quando configurada; a seleção explícita cai para busca anônima",
			},
			gemini: {
				label: "Gemini",
				description:
					"Grounding do Google Search via Gemini (usa OAuth do google-gemini-cli ou do google-antigravity)",
			},
			anthropic: {
				label: "Anthropic",
				description: "Ferramenta web_search nativa do Claude (usa OAuth da Anthropic ou ANTHROPIC_API_KEY)",
			},
			codex: {
				label: "OpenAI",
				description: "web_search nativo da OpenAI (usa OAuth do ChatGPT via /login openai-codex)",
			},
			xai: {
				label: "xAI",
				description:
					"Busca na web do Grok pela Responses API da xAI (usa OAuth do SuperGrok/X Premium+ via /login xai-oauth, ou XAI_API_KEY)",
			},
			zai: { label: "Z.AI", description: "Chama o MCP webSearchPrime da Z.AI" },
			exa: { label: "Exa", description: "API via /login exa ou EXA_API_KEY; fallback explícito sem chave via MCP" },
			tinyfish: { label: "TinyFish", description: "Requer TINYFISH_API_KEY" },
			jina: { label: "Jina", description: "Requer JINA_API_KEY" },
			kagi: { label: "Kagi", description: "Requer KAGI_API_KEY e acesso ao beta da Kagi Search API" },
			tavily: { label: "Tavily", description: "Requer TAVILY_API_KEY" },
			firecrawl: {
				label: "Firecrawl",
				description: "Usa a API do Firecrawl quando FIRECRAWL_API_KEY está definida; cai para o modo sem chave",
			},
			brave: { label: "Brave", description: "Requer BRAVE_API_KEY" },
			kimi: {
				label: "Kimi",
				description:
					"Busca do Kimi Code (requer uma chave do Kimi Code Console via KIMI_SEARCH_API_KEY/MOONSHOT_SEARCH_API_KEY ou /login kimi-code; não MOONSHOT_API_KEY)",
			},
			parallel: {
				label: "Parallel",
				description: "API via /login parallel ou PARALLEL_API_KEY; fallback explícito sem chave via MCP",
			},
			synthetic: { label: "Synthetic", description: "Requer SYNTHETIC_API_KEY" },
			ollama: { label: "Ollama", description: "Requer OLLAMA_CLOUD_API_KEY" },
			searxng: { label: "SearXNG", description: "Requer SEARXNG_ENDPOINT ou searxng.endpoint" },
			startpage: {
				label: "Startpage",
				description:
					"Scrape sem credenciais dos resultados do Startpage (baseado no Google); pode cair em desafio anti-bot",
			},
			duckduckgo: {
				label: "DuckDuckGo",
				description:
					"Fallback sem credenciais de melhor esforço; pode cair em desafio anti-bot em IPs de datacenter ou de saída compartilhada",
			},
			ecosia: {
				label: "Ecosia",
				description: "Scrape sem credenciais, feito pelo navegador, dos resultados do Ecosia (baseado no Google)",
			},
			google: {
				label: "Google",
				description: "Fallback sem credenciais feito pelo navegador; mais lento e pode cair em desafio anti-bot",
			},
			mojeek: {
				label: "Mojeek",
				description: "Scrape sem credenciais, feito pelo navegador, do índice independente do Mojeek",
			},
			public: {
				label: "Web Pública",
				description:
					"Consulta em paralelo todos os motores sem credenciais e consolida os resultados sem duplicatas",
			},
		},
		"providers.webSearchTimeoutSeconds": {
			"30": { label: "30 segundos" },
			"60": { label: "1 minuto" },
			"120": { label: "2 minutos" },
			"180": { label: "3 minutos" },
			"300": { label: "5 minutos" },
		},
		"providers.antigravityEndpoint": {
			auto: { label: "Auto", description: "Tenta o endpoint de produção e cai para o de sandbox em 5xx/429" },
			production: { label: "Apenas Produção", description: "Força apenas o endpoint de produção" },
			sandbox: { label: "Apenas Sandbox", description: "Força apenas o endpoint de sandbox" },
		},
		"providers.imageOrder": {
			openai: {
				label: "OpenAI",
				description: "OPENAI_API_KEY (gpt-image-2) ou o modelo GPT ativo; cai para uma assinatura Codex conectada",
			},
			"openai-codex": {
				label: "OpenAI Codex (ChatGPT)",
				description: "Usa uma assinatura Codex / ChatGPT conectada — sem precisar de OPENAI_API_KEY",
			},
			antigravity: { label: "Antigravity", description: "Requer OAuth do google-antigravity" },
			xai: { label: "xAI Grok Imagine", description: "Requer OAuth do xAI Grok ou XAI_API_KEY" },
			gemini: { label: "Gemini", description: "Requer GEMINI_API_KEY" },
			openrouter: { label: "OpenRouter", description: "Requer OPENROUTER_API_KEY" },
			deepinfra: { label: "DeepInfra", description: "Requer DEEPINFRA_API_KEY" },
		},
		"providers.fireworksTier": {
			standard: { label: "Standard", description: "Caminho de atendimento padrão (sem service_tier)" },
			priority: {
				label: "Priority",
				description: "Caminho de atendimento prioritário: mais confiabilidade, preço premium por token",
			},
		},
		"live.voice": {
			arbor: { label: "Arbor" },
			breeze: { label: "Breeze" },
			cove: { label: "Cove" },
			ember: { label: "Ember" },
			juniper: { label: "Juniper" },
			maple: { label: "Maple" },
			sol: { label: "Sol" },
			spruce: { label: "Spruce" },
			vale: { label: "Vale" },
		},
		"providers.tts": {
			auto: {
				label: "Auto",
				description: "Prefere o TTS local no dispositivo; roteia a saída .mp3 para a xAI quando há credenciais",
			},
			local: { label: "Local", description: "TTS neural no dispositivo (Kokoro-82M); a saída é WAV/PCM16" },
			xai: { label: "xAI Grok Voice", description: "Requer OAuth do xAI Grok ou XAI_API_KEY; MP3 ou WAV" },
			deepinfra: { label: "DeepInfra Speech", description: "Requer DEEPINFRA_API_KEY; MP3 ou WAV" },
		},
		"tts.localModel": {
			kokoro: {
				label: "Kokoro-82M",
				description: "TTS neural Kokoro-82M — qualidade de ponta no dispositivo, várias vozes, totalmente local",
			},
		},
		"tts.localVoice": {
			af_heart: { label: "Heart (feminina americana)" },
			af_bella: { label: "Bella (feminina americana)" },
			af_nicole: { label: "Nicole (feminina americana)" },
			af_aoede: { label: "Aoede (feminina americana)" },
			af_kore: { label: "Kore (feminina americana)" },
			af_sarah: { label: "Sarah (feminina americana)" },
			am_michael: { label: "Michael (masculina americana)" },
			am_fenrir: { label: "Fenrir (masculina americana)" },
			am_puck: { label: "Puck (masculina americana)" },
			bf_emma: { label: "Emma (feminina britânica)" },
			bm_george: { label: "George (masculina britânica)" },
			bm_fable: { label: "Fable (masculina britânica)" },
		},
		"speech.mode": {
			all: { label: "Tudo (mensagens + raciocínio)" },
			assistant: { label: "Mensagens do assistente" },
			yield: { label: "Apenas a mensagem final" },
		},
		"speech.voice": {
			af_heart: { label: "Heart (feminina americana)" },
			af_bella: { label: "Bella (feminina americana)" },
			af_nicole: { label: "Nicole (feminina americana)" },
			af_aoede: { label: "Aoede (feminina americana)" },
			af_kore: { label: "Kore (feminina americana)" },
			af_sarah: { label: "Sarah (feminina americana)" },
			am_michael: { label: "Michael (masculina americana)" },
			am_fenrir: { label: "Fenrir (masculina americana)" },
			am_puck: { label: "Puck (masculina americana)" },
			bf_emma: { label: "Emma (feminina britânica)" },
			bm_george: { label: "George (masculina britânica)" },
			bm_fable: { label: "Fable (masculina britânica)" },
		},
		"providers.tinyModel": {
			online: {
				label: "Online (papel TINY, senão @smol)",
				description:
					"Geração de título online: o papel de modelo TINY (defina um em /models) quando atribuído, senão o fallback online (papel commit, depois @smol). Sem download local nem inferência no dispositivo.",
			},
			"lfm2.5-230m": {
				label: "LFM2.5 230M",
				description: "Modelo local recomendado; a opção LFM2.5 mais rápida, cerca de 214 MB em cache.",
			},
			"lfm2.5-350m": {
				label: "LFM2.5 350M",
				description: "Opção LFM2.5 maior, cerca de 292 MB em cache; tende a produzir títulos mais secos.",
			},
			"falcon-h1-90m": {
				label: "Falcon H1 Tiny 90M",
				description: "A menor opção, cerca de 147 MB em cache; menos fiel em prompts complexos.",
			},
		},
		"providers.tinyModelDevice": {
			default: { label: "Padrão", description: "Inferência só em CPU" },
			gpu: { label: "GPU", description: "Provider acelerado (WebGPU/Metal, CUDA ou DirectML)" },
			cpu: { label: "CPU", description: "Inferência só em CPU" },
			mlx: { label: "MLX", description: "GPU de Apple silicon via mlx-lm (subprocesso Python; macOS arm64)" },
			metal: { label: "Metal", description: "Apelido para MLX" },
			webgpu: { label: "WebGPU", description: "Backend WebGPU/Metal" },
			cuda: { label: "CUDA", description: "NVIDIA CUDA (Linux x64)" },
			dml: { label: "DirectML", description: "Backend DirectML (Windows)" },
			coreml: { label: "CoreML", description: "Apple CoreML (opcional; pode falhar ao carregar)" },
			auto: { label: "Auto", description: "Deixa o ONNX Runtime escolher um provider" },
			wasm: { label: "WASM", description: "Backend WebAssembly" },
			webnn: { label: "WebNN", description: "Backend WebNN" },
			"webnn-gpu": { label: "WebNN GPU", description: "Dispositivo WebNN GPU" },
			"webnn-cpu": { label: "WebNN CPU", description: "Dispositivo WebNN CPU" },
			"webnn-npu": { label: "WebNN NPU", description: "Dispositivo WebNN NPU" },
		},
		"providers.tinyModelDtype": {
			default: { label: "Padrão", description: "O dtype que vem com cada modelo (atualmente q4)" },
			q4: { label: "q4", description: "Pesos de 4 bits; o menor e mais rápido" },
			q4f16: { label: "q4f16", description: "Pesos de 4 bits com ativações fp16" },
			q8: { label: "q8", description: "Quantização de 8 bits" },
			fp16: { label: "fp16", description: "Float de 16 bits; mais fiel, maior" },
			fp32: { label: "fp32", description: "Precisão total; o maior e mais lento" },
			int8: { label: "int8", description: "Inteiro de 8 bits com sinal" },
			uint8: { label: "uint8", description: "Inteiro de 8 bits sem sinal" },
			bnb4: { label: "bnb4", description: "bitsandbytes de 4 bits" },
			q2: { label: "q2", description: "Pesos de 2 bits" },
			q2f16: { label: "q2f16", description: "Pesos de 2 bits com ativações fp16" },
			q1: { label: "q1", description: "Pesos de 1 bit" },
			q1f16: { label: "q1f16", description: "Pesos de 1 bit com ativações fp16" },
			auto: { label: "Auto", description: "Deixa o transformers.js escolher por dispositivo" },
		},
		"providers.unexpectedStopModel": {
			online: {
				label: "Online (papel TINY, senão @smol)",
				description:
					"Usa o modelo online: o papel TINY de /models quando definido, senão @smol. Sem download de modelo local nem inferência no dispositivo.",
			},
			"qwen3-1.7b": {
				label: "Qwen3 1.7B",
				description:
					"Só com MLX (providers.tinyModelDevice=mlx): o onnxruntime-node não consegue rodar as atualizações do cache de RotaryEmbedding deste export ONNX.",
			},
			"llama3.2:3b": {
				label: "Llama 3.2 3B",
				description:
					"Opção maior do Llama 3.2 para tarefas locais de memória/classificação; potencial de qualidade maior, ao custo de mais disco/RAM/latência.",
			},
			"gemma-3-1b": {
				label: "Gemma 3 1B",
				description: "Melhor consolidação/dedup; pegada mais leve, mas deixa escapar conversa fiada na extração.",
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
		"providers.kimiApiFormat": {
			auto: { label: "Auto", description: "Usa o protocolo declarado pelo servidor do modelo" },
			openai: { label: "OpenAI", description: "api.kimi.com" },
			anthropic: { label: "Anthropic", description: "api.moonshot.ai" },
		},
		"providers.openaiWebsockets": {
			auto: { label: "Auto", description: "Usa o comportamento de websocket padrão do modelo/provedor" },
			off: { label: "Desligado", description: "Desativa websockets para os modelos OpenAI Codex" },
			on: { label: "Ligado", description: "Força websockets para os modelos OpenAI Codex" },
		},
		"providers.cacheRetention": {
			auto: {
				label: "Auto",
				description:
					"Padrão do provedor — sessões de assinantes com OAuth da Anthropic usam 1h por padrão, chaves de API usam 5m mantidos quentes por refreshes de keep-alive em ociosidade; PI_CACHE_RETENTION continua valendo",
			},
			short: {
				label: "Curta (5m)",
				description:
					"Escritas de cache mais baratas; a Anthropic mantém a entrada quente com refreshes de keep-alive limitados enquanto está ociosa",
			},
			long: {
				label: "Longa (1h)",
				description:
					"TTL de 1h onde o provedor suporta; escritas mais caras, sem requisições de refresh de keep-alive",
			},
			none: { label: "Desligado", description: "Desativa o prompt caching e o roteamento por afinidade de cache" },
		},
		"providers.streamFirstEventTimeoutSeconds": {
			"-1": { label: "Auto", description: "Usa os padrões do provedor e as variáveis de ambiente de timeout PI_*" },
			"0": { label: "Desligado", description: "Desativa o timeout de primeiro evento" },
			"300": { label: "5 minutos" },
			"600": { label: "10 minutos" },
			"1800": { label: "30 minutos" },
		},
		"providers.streamIdleTimeoutSeconds": {
			"-1": { label: "Auto", description: "Usa os padrões do provedor e as variáveis de ambiente de timeout PI_*" },
			"0": { label: "Desligado", description: "Desativa o timeout de ociosidade" },
			"300": { label: "5 minutos" },
			"600": { label: "10 minutos" },
			"1800": { label: "30 minutos" },
		},
		"providers.openrouterVariant": {
			default: { label: "Padrão", description: "Sem sufixo; usa o roteamento padrão do OpenRouter" },
			nitro: { label: ":nitro", description: "Prioriza throughput / menor latência" },
			floor: { label: ":floor", description: "Prioriza o provedor mais barato disponível" },
			online: { label: ":online", description: "Ativa o plugin de busca na web do OpenRouter" },
			exacto: {
				label: ":exacto",
				description: "Provedores de alta qualidade escolhidos a dedo (definido só para alguns modelos)",
			},
		},
		"providers.fetch": {
			auto: { label: "Auto", description: "Prioridade: native > trafilatura > lynx > parallel > firecrawl > jina" },
			native: { label: "Nativo", description: "Conversor HTML→Markdown em processo (sempre disponível)" },
			trafilatura: { label: "Trafilatura", description: "Instala automaticamente via uv/pip" },
			lynx: { label: "Lynx", description: "Requer o pacote de sistema lynx" },
			parallel: { label: "Parallel", description: "Requer PARALLEL_API_KEY" },
			firecrawl: { label: "Firecrawl", description: "Requer FIRECRAWL_API_KEY" },
			jina: { label: "Jina", description: "Usa o reader r.jina.ai (JINA_API_KEY opcional)" },
		},
		"codexResets.autoRedeem": {
			unset: {
				label: "Não definido",
				description: "Verifica a elegibilidade e pergunta antes de gastar o primeiro reset salvo.",
			},
			yes: { label: "Sim", description: "Gasta os resets salvos elegíveis sem perguntar." },
			no: { label: "Não", description: "Não executa a verificação de resgate automático de resets salvos." },
		},
		"provider.appendOnlyContext": {
			auto: { label: "Auto", description: "Ativa para os provedores conhecidos com prefix cache (recomendado)" },
			on: { label: "Ligado", description: "Sempre ativa o contexto append-only" },
			off: { label: "Desligado", description: "Desativa o contexto append-only" },
		},
	},
};
