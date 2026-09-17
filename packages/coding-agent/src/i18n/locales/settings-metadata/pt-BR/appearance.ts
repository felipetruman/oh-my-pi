import type { SettingsLocaleTable } from "../types";

/**
 * Brazilian Portuguese overrides for the appearance tab.
 *
 * Deliberately a slice, not the whole tab: it carries the tab name, the section
 * that hosts the language picker, and that setting's own row. That is the
 * smallest table that exercises every layer — tab label, group heading, and a
 * per-setting label/description resolved against the schema fallback. The rest
 * of the tab arrives with the pt-BR localization work.
 */
export const appearance: SettingsLocaleTable = {
	tabs: { appearance: "Aparência" },
	groups: {
		appearance: {
			Display: "Exibição",
		},
	},
	paths: {
		"display.locale": {
			label: "Idioma da Interface",
			description: "Idioma usado pela interface de terminal do OMP",
		},
	},
};
