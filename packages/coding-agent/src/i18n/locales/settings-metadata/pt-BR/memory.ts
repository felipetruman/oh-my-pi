import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the memory tab. */
export const memory: SettingsLocaleTable = {
	tabs: { memory: "Memória" },
	groups: {
		memory: {
			General: "Geral",
			"Auto-Learn": "Aprendizado Automático",
			Mnemopi: "Mnemopi",
			Hindsight: "Hindsight",
			Sharpshooter: "Sharpshooter",
		},
	},
	paths: {
		"memory.backend": {
			label: "Backend de Memória",
			description: "Desativado, pipeline local de resumo, Mnemopi SQLite, memória remota Hindsight ou Sharpshooter",
		},
		"sharpshooter.model": {
			label: "Modelo do Sharpshooter",
			description: "Seletor de modelo para extração/consolidação; vazio = papel smol",
		},
		"autolearn.enabled": {
			label: "Aprendizado Automático (experimental)",
			description:
				"Depois que o agente para, incentiva ele a registrar lições na memória e criar/melhorar skills gerenciadas isoladas",
		},
		"autolearn.autoContinue": {
			label: "Registrar automaticamente ao parar",
			description:
				"Quando ativado, roda automaticamente um turno privado de registro ao parar (consome tokens extras). Quando desativado, resta apenas a orientação permanente de aprendizado automático.",
		},
		"mnemopi.dbPath": {
			label: "Caminho do Banco do Mnemopi",
			description: "Caminho opcional do banco SQLite. Por padrão, usa o diretório de memórias do agente.",
		},
		"mnemopi.bank": {
			label: "Banco do Mnemopi",
			description:
				"Nome base opcional do banco compartilhado. Os modos por projeto derivam dele os bancos locais do projeto.",
		},
		"mnemopi.scoping": {
			label: "Escopo do Mnemopi",
			description:
				"global = um banco compartilhado; per-project = banco isolado por cwd; per-project-tagged = escrita local do projeto com visibilidade global no recall",
		},
		"mnemopi.embeddingVariant": {
			label: "Variante de embedding",
			description:
				"Família do modelo local de embedding. en = modelo mais forte em inglês; multilingual = modelo multilíngue. Mudar isso reconstrói os embeddings de memória existentes na próxima inicialização.",
		},
		"mnemopi.autoRecall": {
			label: "Recall Automático do Mnemopi",
			description: "Traz memórias locais no primeiro turno de cada sessão",
		},
		"mnemopi.autoRetain": {
			label: "Retenção Automática do Mnemopi",
			description: "Retém turnos de conversa concluídos na memória local do Mnemopi",
		},
		"mnemopi.polyphonicRecall": {
			label: "Recall Polifônico do Mnemopi",
			description: "Ativa o recall de 4 vozes (vetor, grafo, fato, temporal) combinadas por reciprocal rank fusion",
		},
		"mnemopi.enhancedRecall": {
			label: "Recall Aprimorado do Mnemopi",
			description: "Ativa o cache em camadas de resultados para consultas de recall repetidas ou parecidas",
		},
		"mnemopi.proactiveLinking": {
			label: "Vinculação Proativa do Mnemopi",
			description:
				"Insere novas memórias no grafo episódico conforme são armazenadas, ligando-as a entidades e memórias relacionadas",
		},
		"mnemopi.noEmbeddings": {
			label: "Desativar Embeddings do Mnemopi",
			description: "Força o recall determinístico só por FTS, em vez de embeddings vetoriais",
		},
		"mnemopi.embeddingModel": {
			label: "Modelo de Embedding do Mnemopi",
			description:
				"Avançado: id explícito do modelo de embedding, que prevalece sobre a variante. Deixe vazio para usar mnemopi.embeddingVariant.",
		},
		"mnemopi.embeddingApiUrl": {
			label: "URL da API de Embedding do Mnemopi",
			description: "Endpoint de embedding compatível com OpenAI, opcional, repassado ao Mnemopi",
		},
		"mnemopi.embeddingApiKey": {
			label: "Chave de API de Embedding do Mnemopi",
			description: "Chave de API de embedding opcional repassada ao Mnemopi",
		},
		"mnemopi.llmMode": {
			label: "Modo de LLM do Mnemopi",
			description:
				"Não usar LLM, usar o modelo tiny online (o papel TINY de /models ou, na falta dele, @smol) ou um endpoint remoto compatível com OpenAI",
		},
		"mnemopi.llmBaseUrl": {
			label: "URL Base do LLM do Mnemopi",
			description: "Endpoint de LLM compatível com OpenAI, opcional, para o modo remoto do Mnemopi",
		},
		"mnemopi.llmApiKey": {
			label: "Chave de API do LLM do Mnemopi",
			description: "Chave de API de LLM opcional para o modo remoto do Mnemopi",
		},
		"mnemopi.llmModel": {
			label: "Modelo de LLM do Mnemopi",
			description: "Nome opcional do modelo de LLM para o modo remoto do Mnemopi",
		},
		"hindsight.apiUrl": {
			label: "URL da API do Hindsight",
			description: "URL do servidor Hindsight (Cloud ou auto-hospedado)",
		},
		"hindsight.apiToken": {
			label: "Token de API do Hindsight",
			description: "Token Bearer para servidores Hindsight autenticados",
		},
		"hindsight.bankId": {
			label: "ID do Banco do Hindsight",
			description: "Identificador do banco de memória (padrão: nome do projeto)",
		},
		"hindsight.scoping": {
			label: "Escopo do Hindsight",
			description:
				"global = um banco compartilhado; per-project = banco isolado por cwd; per-project-tagged = banco compartilhado com tags de projeto, então memórias globais e do projeto se mesclam no recall",
		},
		"hindsight.autoRecall": {
			label: "Recall Automático do Hindsight",
			description: "Traz memórias no primeiro turno de cada sessão",
		},
		"hindsight.autoRetain": {
			label: "Retenção Automática do Hindsight",
			description: "Retém a transcrição a cada N turnos e nos limites da sessão",
		},
		"hindsight.retainMode": {
			label: "Modo de Retenção do Hindsight",
			description: "full-session = faz upsert de um documento por sessão; last-turn = fatiado em pedaços",
		},
		"hindsight.mentalModelsEnabled": {
			label: "Modelos Mentais do Hindsight",
			description:
				"Carrega resumos curados de reflexão (modelos mentais) nas instruções de desenvolvedor na inicialização. Lê os modelos que já existem no banco — não escreve. Combine com hindsight.mentalModelAutoSeed para também criar automaticamente o conjunto inicial interno.",
		},
		"hindsight.mentalModelAutoSeed": {
			label: "Criação Automática de Modelos Mentais do Hindsight",
			description:
				"No início da sessão, cria os modelos mentais internos (project-conventions, project-decisions, user-preferences) que ainda não existem no banco.",
		},
		"providers.memoryModel": {
			label: "Modelo de Memória",
			description:
				"LLM do Mnemopi para extração e consolidação de fatos: por padrão online (o papel TINY de /models ou, na falta dele, smol/remoto), ou um modelo local no dispositivo",
		},
	},
	options: {
		"memory.backend": {
			off: { label: "Desativado", description: "Nenhum subsistema de memória roda" },
			local: { label: "Local", description: "Pipeline local de resumo de rollout (memory_summary.md)" },
			hindsight: { label: "Hindsight", description: "Serviço de memória remota Vectorize Hindsight" },
			mnemopi: {
				label: "Mnemopi",
				description: "Backend local SQLite de recall/retain com embeddings opcionais",
			},
			sharpshooter: {
				label: "Sharpshooter",
				description:
					"Arquivos de decisão do projeto (arquitetura/produto/estilo) com escrita condicionada a atrito, consolidados em segundo plano",
			},
		},
		"mnemopi.scoping": {
			global: { label: "Global", description: "Um único banco Mnemopi compartilhado por todos os projetos" },
			"per-project": {
				label: "Por projeto",
				description: "Banco Mnemopi local ao projeto, por nome base do cwd",
			},
			"per-project-tagged": {
				label: "Por projeto (com tag)",
				description:
					"Escreve num banco local do projeto, mas mescla no recall os resultados do projeto e do compartilhado",
			},
		},
		"mnemopi.embeddingVariant": {
			en: { label: "Inglês (bge-base-en-v1.5)", description: "BAAI/bge-base-en-v1.5 (768d), só inglês" },
			multilingual: {
				label: "Multilíngue (multilingual-e5-large)",
				description: "intfloat/multilingual-e5-large (1024d), recall entre idiomas",
			},
		},
		"mnemopi.llmMode": {
			none: { label: "Nenhum", description: "Desativa a extração do Mnemopi baseada em LLM" },
			smol: {
				label: "Online (tiny)",
				description: "Usa o modelo tiny online (o papel TINY de /models ou, na falta dele, @smol)",
			},
			remote: { label: "Remoto", description: "Usa as configurações de LLM remoto do Mnemopi abaixo" },
		},
		"hindsight.scoping": {
			global: { label: "Global", description: "Um único banco compartilhado — todo projeto vê as mesmas memórias" },
			"per-project": {
				label: "Por projeto",
				description: "Banco isolado por nome base do cwd — os projetos não veem as memórias uns dos outros",
			},
			"per-project-tagged": {
				label: "Por projeto (com tag)",
				description:
					"Banco compartilhado, com retenções marcadas com project:<cwd>. O recall traz juntas as memórias do projeto e as globais sem tag",
			},
		},
		"hindsight.retainMode": {
			"full-session": {
				label: "Sessão completa",
				description: "Faz upsert de um documento por sessão (recomendado)",
			},
			"last-turn": { label: "Último turno", description: "Retenção em pedaços fatiada pelos limites dos turnos" },
		},
		"providers.memoryModel": {
			online: {
				label: "Online (papel TINY ou @smol)",
				description:
					"Usa o modelo online: o papel TINY de /models quando definido, senão @smol. Sem download de modelo local nem inferência no dispositivo.",
			},
			"qwen3-1.7b": {
				label: "Qwen3 1.7B",
				description:
					"Só com MLX (providers.tinyModelDevice=mlx): o onnxruntime-node não consegue rodar as atualizações de cache do RotaryEmbedding deste export ONNX.",
			},
			"llama3.2:3b": {
				label: "Llama 3.2 3B",
				description:
					"Opção maior do Llama 3.2 para tarefas locais de memória/classificação; potencial de mais qualidade com custo maior de disco/RAM/latência.",
			},
			"gemma-3-1b": {
				label: "Gemma 3 1B",
				description:
					"Melhor consolidação/deduplicação; pegada mais leve, mas deixa passar conversa fiada na extração.",
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
	},
};
