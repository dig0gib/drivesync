import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.accessToken) return res.status(401).json({ error: "Unauthorized" });
  const { pageToken, filter = "all" } = req.query;
  const body = { pageSize: 50 };
  if (pageToken) body.pageToken = pageToken;
  if (filter === "photos") body.filters = { mediaTypeFilter: { mediaTypes: ["PHOTO"] } };
  else if (filter === "videos") body.filters = { mediaTypeFilter: { mediaTypes: ["VIDEO"] } };
  try {
    const resp = await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
      method: "POST", headers: { Authorization: `Bearer ${session.accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!resp.ok) { const err = await resp.json(); return res.status(resp.status).json({ error: err }); }
    return res.status(200).json(await resp.json());
  } catch (e) { return res.status(500).json({ error: String(e) }); }
}
