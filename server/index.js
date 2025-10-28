const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const HF_API_KEY = process.env.HF_API_KEY || process.env.HUGGINGFACE_API_KEY;

app.get('/', (req, res) => res.send('Etsy Marketing Assistant AI Proxy'));

// Generic AI proxy endpoint. Frontend will POST { model, prompt }
app.post('/api/ai', async (req, res) => {
  try {
    if (!HF_API_KEY) {
      return res.status(500).json({ error: 'HF_API_KEY not configured on server' });
    }

    const { model, prompt } = req.body || {};
    if (!model || !prompt) {
      return res.status(400).json({ error: 'model and prompt required' });
    }

    const url = `https://api-inference.huggingface.co/models/${model}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.json({ result: data });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: String(err) });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`AI proxy running on port ${port}`));
