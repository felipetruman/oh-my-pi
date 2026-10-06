/** Agent transcript viewer, Agent Hub renderer, advisor messages. Filled by the agents migration task. */
export const agents = {
	// ── Agent transcript viewer (fullscreen) ──────────────────────────────
	"agentView.title": "Agent Hub",
	"agentView.header.ofParent": "of {parent}",
	"agentView.status.aborted": "aborted",
	"agentView.status.idle": "idle",
	"agentView.status.parked": "parked",
	"agentView.status.running": "running",
	"agentView.footer.hintReadOnly": "Esc:close  {expandKey}:expand  j/k:scroll  g/G:top/bottom",
	"agentView.footer.hintSendable":
		"Enter:send  Esc:close  {expandKey}:expand  empty input → j/k:scroll  g/G:top/bottom",
	"agentView.placeholder.loadingRemote": "Loading transcript from host…",
	"agentView.placeholder.noMessages": "No messages yet.",
	"agentView.placeholder.noSessionFile": "No session file available yet.",
	"agentView.placeholder.remoteUnavailable": "Transcript lives on the host — not available.",

	// ── Agent Hub roster metrics ──────────────────────────────────────────
	"agentView.metric.duration": "{duration} duration",
	"agentView.metric.durationActive": "{duration} active",
	"agentView.metric.durationSpan": "{duration} span",
	"agentView.metric.requests": "{count} req",
	"agentView.metric.timeNone": "time —",
	"agentView.metric.tokens": "{count} tok",
	"agentView.metric.tools": "{count} tools",

	// ── Advisor transcript card ───────────────────────────────────────────
	"agentView.advisor.blockersOne": "{count} blocker",
	"agentView.advisor.blockersOther": "{count} blockers",
	"agentView.advisor.moreNotesOne": "… +{count} more note",
	"agentView.advisor.moreNotesOther": "… +{count} more notes",
	"agentView.advisor.notesOne": "{count} note",
	"agentView.advisor.notesOther": "{count} notes",
} as const;
