import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model = 'gemini-2.5-flash', useSearch = false, responseType = 'text', responseSchema = null } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const config = {};
    
    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    if (responseType === 'json' && responseSchema) {
      config.responseMimeType = 'application/json';
      config.responseSchema = responseSchema;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: Object.keys(config).length > 0 ? config : undefined
    });

    const result = {
      text: response.text,
    };

    if (useSearch && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      result.sources = response.candidates[0].groundingMetadata.groundingChunks;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to generate content',
      details: error.message 
    });
  }
}
