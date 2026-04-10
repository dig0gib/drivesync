// pages/api/command.js
let pendingCommand = null;
export default function handler(req, res) {
  const secret = req.headers["x-agent-secret"];
  if (secret !== process.env.AGENT_SECRET) return res.status(403).json({ error: "Forbidden" });
  if (req.method === "GET") {
    const cmd = pendingCommand; pendingCommand = null;
    return res.status(200).json({ command: cmd });
  }
  if (req.method === "POST") {
    const { command } = req.body;
    if (!["start", "stop"].includes(command)) return res.status(400).json({ error: "Invalid" });
    pendingCommand = command;
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
