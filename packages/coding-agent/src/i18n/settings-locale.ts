import type { Settings } from "../config/settings";
import { bindLocaleSource } from "./locale";

/**
 * Point the interface language at `display.locale` on `instance` and follow
 * later edits to it. Idempotent.
 *
 * Takes the instance rather than reaching for the global `settings` proxy: ACP
 * mode and the tests drive startup with an isolated Settings, and the proxy
 * throws when no global has been installed.
 *
 * Lives apart from `locale.ts` and stays out of the `i18n` barrel on purpose:
 * this is the only part of i18n that touches the settings graph, and the
 * startup prepaint renders the welcome box before that graph is loaded.
 */
export function initLocaleFromSettings(instance: Settings): void {
	bindLocaleSource({
		read: () => instance.get("display.locale"),
		subscribe: onChange => {
			instance.onEffectiveChange(path => {
				if (path === "display.locale") onChange(instance.get("display.locale"));
			});
		},
	});
}
