# DriveSync

Google Drive/Photos → local hard disk backup.

## Structure

- `webapp/` — Next.js app deployed on Vercel (dashboard + media browser)
- `agent/agent.py` — Python daemon running on your PC (downloads files to hard drive)

## Quick Start

### 1. Deploy Vercel app

```bash
cd webapp
npx vercel --prod
```

Set environment variables in Vercel:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
- `NEXTAUTH_URL`
- `AGENT_SECRET` (shared secret with agent)

### 2. Run PC agent

```bash
pip install google-auth google-auth-oauthlib google-api-python-client requests
python agent/agent.py --setup
python agent/agent.py --run-once
python agent/agent.py --daemon
```

### 3. Use

1. Open Vercel URL and login with Google
2. Click **Start Backup**
3. Browse photos in **Media** tab
4 Download individual files directly to your drive
