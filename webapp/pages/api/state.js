let agentState = { status: "idle", last_run: null, total_files: 0, total_size_mb: 0, skipped: 0, errors: 0, current_file: "", progress: 0, log_tail: [], agent_online: false, last_heartbeat: null };
export default function handler(req, res) {
  if (req.method === "POST") {
    if (req.headers["x-agent-secret"] !== process.env.AGENT_SECRET) return res.status(403).json({ error: "Forbidden" });
    agentState = { ...req.body, agent_online: true, last_heartbeat: new Date().toISOString() };
    return res.status(200).json({ ok: true });
  }
  if (req.method === "GET") {
    const hb = agentState.last_heartbeat ? new Date(agentState.last_heartbeat) : null;
    const isOnline = hb ? Date.now() - hb.getTime() < 120000 : false;
    return res.status(200).json({ ...agentState, agent_online: isOnline });
  }
  res.status(405).end();
}
