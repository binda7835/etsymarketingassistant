# Deploying to Vercel

This project is now configured to deploy to Vercel with a serverless backend.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/binda7835/etsymarketingassistant)

## Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. **Important:** Add your Gemini API Key as an environment variable in Vercel:
   - Go to your project settings on vercel.com
   - Navigate to "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your_api_key_here`
   - Redeploy

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add `etsymarketingassistant.me`
4. Follow DNS configuration instructions

## Environment Variables

Required:
- `GEMINI_API_KEY` - Your Google Gemini API key (get one at https://aistudio.google.com/apikey)

## Architecture

- Frontend: React + Vite (Static)
- Backend: Vercel Serverless Functions (`/api/gemini.js`)
- API calls go through the backend to keep your API key secure
