import type { TranslationTable } from "../../keys";
import { common } from "./common";
import { settings } from "./settings";
import { hud } from "./hud";
import { selectors } from "./selectors";
import { commands } from "./commands";
import { navigation } from "./navigation";
import { auth } from "./auth";
import { agents } from "./agents";
import { extensions } from "./extensions";
import { mcp } from "./mcp";
import { planflow } from "./planflow";
import { sidecmds } from "./sidecmds";
import { extui } from "./extui";

/** Brazilian Portuguese table. Merged once, at module load. Keys it omits fall back to en-US. */
export const PT_BR: TranslationTable = {
	...common,
	...settings,
	...hud,
	...selectors,
	...commands,
	...navigation,
	...auth,
	...agents,
	...extensions,
	...mcp,
	...planflow,
	...sidecmds,
	...extui,
};
