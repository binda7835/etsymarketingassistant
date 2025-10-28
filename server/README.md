# AI Proxy (server)

This small Express server forwards frontend AI requests to Hugging Face Inference API using a server-side API key. Hosting this gives you a single HF API key that the browser doesn't need to know, and avoids CORS/401 issues.

## Quick start (local)

1. Install dependencies:

```bash
cd server
npm install
```

2. Start the server (locally for testing):

```bash
HF_API_KEY="your_hf_api_key" npm start
# or for dev with auto-reload
HF_API_KEY="your_hf_api_key" npm run dev
```

By default the server listens on port 8787.

## Deploy options

### Render (recommended for simplicity)

1. Create a new Web Service on Render. Choose "Web Service" and connect your GitHub repo.
2. Set the build command to `npm ci --only=production` and the start command to `node index.js` (or use the Dockerfile path if you prefer).
3. In Render *Environment* settings, add the secret `HF_API_KEY` with your Hugging Face API key.
4. Deploy. Once deployed, the frontend can call the proxy at `https://your-render-hostname/api/ai`.

The repository includes a GitHub Action that can trigger a Render deploy when you push to `main` if you provide `RENDER_API_KEY` and `RENDER_SERVICE_ID` in GitHub Secrets (see `.github/workflows/deploy-server.yml`).

### Railway / Heroku

You can also deploy the `server/` folder to Railway or Heroku. Make sure to set the `HF_API_KEY` env var in the chosen host's settings.

### Docker

The included `Dockerfile` can build a small image. Example (build locally):

```bash
docker build -t etsy-ai-proxy:latest server/
docker run -e HF_API_KEY="$HF_API_KEY" -p 8787:8787 etsy-ai-proxy:latest
```

## Endpoint

POST /api/ai

Body: `{ model: string, prompt: string }`

Returns `{ result: <huggingface-response> }` on success.

## Notes

- Keep your HF API key private. Do not commit it to the repository.
- If your frontend and proxy are on different domains, ensure CORS and CSP are configured appropriately.
