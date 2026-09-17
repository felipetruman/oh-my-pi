import type { SettingsLocaleTable } from "../types";
import { appearance } from "./appearance";
import { model } from "./model";
import { interaction } from "./interaction";
import { context } from "./context";
import { memory } from "./memory";
import { files } from "./files";
import { shell } from "./shell";
import { tools } from "./tools";
import { tasks } from "./tasks";
import { providers } from "./providers";

const PARTS: readonly SettingsLocaleTable[] = [
	appearance,
	model,
	interaction,
	context,
	memory,
	files,
	shell,
	tools,
	tasks,
	providers,
];

/** Merge the per-tab tables once, at module load, so lookup stays a plain property read. */
function merge(parts: readonly SettingsLocaleTable[]): SettingsLocaleTable {
	const merged: SettingsLocaleTable = { tabs: {}, groups: {}, paths: {}, options: {} };
	for (const part of parts) {
		Object.assign(merged.tabs as object, part.tabs);
		Object.assign(merged.groups as object, part.groups);
		Object.assign(merged.paths as object, part.paths);
		Object.assign(merged.options as object, part.options);
	}
	return merged;
}

export const PT_BR_SETTINGS: SettingsLocaleTable = merge(PARTS);
