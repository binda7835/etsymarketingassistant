<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1PlPx9nOr8B0RwJZv4WAhpqapSVyOZHoV

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Using a public Hugging Face Space (Option A)

If you'd like the site to use a free, tokenless Hugging Face Space (or other public inference endpoint) for AI features, set the `VITE_PUBLIC_AI_URL` environment variable at build time. The app will try this public URL first for all AI calls, then fall back to a same-origin proxy (`/api/ai`) if present, and finally to Gemini as a last resort.

Steps:

1. Create a `.env` file in the project root (you can copy `.env.example`):

```bash
cp .env.example .env
# Edit .env and set VITE_PUBLIC_AI_URL to your public HF Space API URL
```

2. Example public URL formats (replace USER and SPACE):

- https://huggingface.co/spaces/USER/SPACE/api/predict
- https://hf.space/embed/USER/SPACE/+/api/predict

3. Rebuild the frontend so Vite embeds the value from `import.meta.env`:

```bash
npm run build
```

4. Deploy the built `dist/` to GitHub Pages (or your host). If you're using the existing `gh-pages` deploy script:

```bash
npm run deploy
```

Notes & Troubleshooting:

- The public Space must accept anonymous requests and allow CORS from your site. If you get CORS errors in the browser console, you may need a different Space or to deploy the included server proxy instead.
- If you don't set `VITE_PUBLIC_AI_URL`, the app will try `/api/ai` (proxy) then Gemini.
- For a stable production setup, consider deploying the server proxy (Option B) with a server-side HF API key.
