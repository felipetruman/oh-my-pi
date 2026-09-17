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

/** Canonical language table. Merged once, at module load. */
export const EN_US = {
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
} as const;
