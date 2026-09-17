import type { SettingsLocaleTable } from "../types";

/** Brazilian Portuguese overrides for the shell tab. */
export const shell: SettingsLocaleTable = {
	tabs: { shell: "Shell" },
	groups: {
		shell: {
			Bash: "Bash",
			"Eval & Runtimes": "Eval e Runtimes",
		},
	},
	paths: {
		"bash.enabled": {
			label: "Bash",
			description: "Ativa a ferramenta bash para executar comandos de shell",
		},
		"bash.allowCompoundCommands": {
			label: "Permitir Comandos Compostos",
			description:
				"Avalia cadeias literais de && comando por comando; comandos sem correspondência seguem a política e o modo normais de aprovação do bash",
		},
		"bash.autoBackground.enabled": {
			label: "Bash em Segundo Plano Automático",
			description: "Move automaticamente comandos bash demorados para segundo plano e entrega o resultado depois",
		},
		"bash.patterns": {
			label: "Padrões de Aprovação do Bash",
			description:
				"Regras ordenadas de aprovação de comandos bash. Cada item tem os campos match e approval; só há suporte para curingas '*'.",
		},
		"bashInterceptor.enabled": {
			label: "Interceptador do Bash",
			description: "Bloqueia comandos de shell que têm ferramentas dedicadas",
		},
		"bash.direnv": {
			label: "Carregamento Automático do direnv",
			description:
				"Carrega automaticamente o `.envrc` do direnv/devenv do repositório na sessão bash, para que as ferramentas e variáveis de ambiente do devenv existam sem `direnv exec` manual. Respeita a lista de permissões do direnv: um `.envrc` sem `direnv allow` nunca é executado",
		},
		"bash.direnvLoadTimeoutMs": {
			label: "Timeout de Carregamento do direnv (ms)",
			description:
				"Espera máxima pelo primeiro `direnv export` (um shell devenv frio pode ser lento); no timeout, a sessão roda sem o ambiente do direnv",
		},
		"shellMinimizer.enabled": {
			label: "Minimizador de Saída do Shell",
			description: "Comprime saídas verbosas do shell (git, npm, cargo etc.) antes de devolvê-las ao agente",
		},
		"shellMinimizer.sourceOutlineLevel": {
			label: "Esboço de Código do Minimizador de Shell",
			description: "Modo de esboço para cat/read de arquivos de código: default ou aggressive",
		},
		"eval.py": {
			label: "Backend de Eval do Python",
			description: "Permite que a ferramenta eval despache células Python para o kernel IPython",
		},
		"eval.js": {
			label: "Backend de Eval do JavaScript",
			description: "Permite que a ferramenta eval despache células JavaScript para o runtime no próprio processo",
		},
		"eval.tools.enabled": {
			label: "Ferramentas Definidas no Eval",
			description:
				"Permite que células de eval definam ferramentas (@tool em Python, tool(fn) em JS) que os subagentes de task, agent() e workpool() podem chamar",
		},
		"eval.workpool.freshAgents": {
			label: "Agentes Novos no Workpool",
			description:
				"Cria um subagente novo para cada item do workpool, em vez de reutilizar workers ou agrupar itens da fila",
		},
		"eval.autoBackground.enabled": {
			label: "Eval em Segundo Plano Automático",
			description: "Move automaticamente células de eval demoradas para segundo plano e entrega o resultado depois",
		},
		"python.kernelMode": {
			label: "Modo do Kernel Python",
			description: "Mantém o kernel IPython vivo entre chamadas de eval ou começa um novo a cada vez",
		},
		"python.interpreter": {
			label: "Interpretador Python",
			description:
				"Caminho opcional para um executável Python específico. Quando definido, a descoberta automática do runtime Python é ignorada.",
		},
	},
};
