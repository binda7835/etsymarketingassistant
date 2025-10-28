import React, { useState, useRef, useEffect } from 'react';
import { callGeminiRaw } from '../../services/geminiService';
import Spinner from './Spinner';

type Provider = 'gemini' | 'huggingface' | 'custom' | 'public';

interface Settings {
  provider: Provider;
  hfToken?: string;
  hfModel?: string;
  customUrl?: string;
}

const cannedFallback = `I couldn't reach the public AI endpoint. Here are some quick tips you can try instead:\n\n- Try a different public Hugging Face Space URL (many Spaces expose /run/predict or /api/predict).\n- Ask simpler, shorter questions to reduce model load.\n- Provide an explicit prompt like: "Generate 3 Etsy product title ideas for Halloween PNGs".\n\nIf you'd like, paste a public Hugging Face Space URL above and select "Public Space" to try that Space.`;

const AiChatPublic: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ from: 'user' | 'ai'; text: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem('ai_settings');
      return raw ? JSON.parse(raw) : ({ provider: 'public', hfModel: 'gpt2' } as Settings);
    } catch (e) {
      return { provider: 'public', hfModel: 'gpt2' } as Settings;
    }
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const saveSettings = (next: Settings) => {
    setSettings(next);
    try {
      localStorage.setItem('ai_settings', JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  const tryPublicSpace = async (base: string, prompt: string): Promise<string> => {
    const baseClean = base.replace(/\/$/, '');
    const candidates = [
      baseClean,
      `${baseClean}/run/predict`,
      `${baseClean}/api/predict`,
      `${baseClean}/api/predict/`,
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [prompt] }),
        });
        if (!res.ok) continue;
        const j = await res.json();
        if (j == null) continue;
        if (j.data) {
          const d = j.data;
          if (Array.isArray(d)) return String(d[0]);
          return String(d);
        }
        if (j.outputs) {
          const o = j.outputs;
          if (Array.isArray(o)) return String(o[0]);
          return String(o);
        }
        if (j.generated_text) return String(j.generated_text);
        if (typeof j === 'string') return j;
        return JSON.stringify(j);
      } catch (e) {
        continue;
      }
    }
    throw new Error('No public endpoint responded');
  };

  const submitPrompt = async () => {
    const prompt = input.trim();
    if (!prompt) return;
    setMessages((m) => [...m, { from: 'user', text: prompt }]);
    setInput('');
    setLoading(true);

    try {
      let text = '';

      if (settings.provider === 'huggingface' && settings.hfToken) {
        const model = settings.hfModel || 'gpt2';
        const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${settings.hfToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: prompt }),
        });
        const j = await res.json();
        if (Array.isArray(j) && j[0]?.generated_text) text = j[0].generated_text;
        else if (j.generated_text) text = j.generated_text;
        else if (j.error) throw new Error(j.error);
        else if (typeof j === 'string') text = j;
        else text = JSON.stringify(j);
      } else if (settings.provider === 'custom' && settings.customUrl) {
        const res = await fetch(settings.customUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: prompt }),
        });
        const j = await res.json();
        if (j?.data) text = Array.isArray(j.data) ? String(j.data[0]) : String(j.data);
        else if (j?.generated_text) text = j.generated_text;
        else if (typeof j === 'string') text = j;
        else text = JSON.stringify(j);
      } else if (settings.provider === 'public' && settings.customUrl) {
        text = await tryPublicSpace(settings.customUrl, prompt);
      } else {
        const res = await callGeminiRaw(prompt);
        text = res.text;
      }

      let reveal = '';
      setMessages((m) => [...m, { from: 'ai', text: reveal }]);

      for (let i = 0; i < text.length; i++) {
        reveal += text[i];
        setMessages((m) => {
          const copy = [...m];
          const lastAiIndex = copy.map((c) => c.from).lastIndexOf('ai');
          if (lastAiIndex >= 0) copy[lastAiIndex] = { from: 'ai', text: reveal };
          return copy;
        });
        await new Promise((r) => setTimeout(r, 8));
      }
    } catch (err) {
      console.error('AI call failed', err);
      setMessages((m) => [...m, { from: 'ai', text: cannedFallback }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitPrompt();
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">Live AI Assistant</h3>
      <div className="border border-gray-800 rounded-lg p-4 bg-gray-800">
        <div className="mb-4">
          <label className="block text-sm text-gray-300 font-semibold mb-2">AI Provider</label>
          <div className="flex items-center gap-3">
            <select
              value={settings.provider}
              onChange={(e) => saveSettings({ ...settings, provider: e.target.value as Provider })}
              className="bg-gray-900 border border-gray-700 rounded-md p-2 text-sm"
            >
              <option value="gemini">Google Gemini (built-in)</option>
              <option value="huggingface">Hugging Face (use your token)</option>
              <option value="public">Public Space (no token)</option>
              <option value="custom">Custom Public Endpoint / Space</option>
            </select>

            {settings.provider === 'huggingface' && (
              <input
                placeholder="HF token (kept locally)"
                value={settings.hfToken || ''}
                onChange={(e) => saveSettings({ ...settings, hfToken: e.target.value })}
                className="bg-gray-900 border border-gray-700 rounded-md p-2 text-sm flex-grow"
              />
            )}

            {settings.provider === 'huggingface' && (
              <input
                placeholder="Model (e.g., gpt2 or google/flan-t5-small)"
                value={settings.hfModel || ''}
                onChange={(e) => saveSettings({ ...settings, hfModel: e.target.value })}
                className="bg-gray-900 border border-gray-700 rounded-md p-2 text-sm w-48"
              />
            )}

            {(settings.provider === 'custom' || settings.provider === 'public') && (
              <input
                placeholder="Public Space or endpoint URL (e.g., https://hf.space/... )"
                value={settings.customUrl || ''}
                onChange={(e) => saveSettings({ ...settings, customUrl: e.target.value })}
                className="bg-gray-900 border border-gray-700 rounded-md p-2 text-sm flex-grow"
              />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">Tip: For free access, enter a public Hugging Face Space or other public endpoint URL (many Spaces expose a /run/predict or /api/predict endpoint). This app will try common endpoints without requiring a token.</p>
        </div>

        <div ref={containerRef} className="max-h-72 overflow-auto space-y-3 mb-4">
          {messages.length === 0 && (
            <div className="text-gray-400">Ask the assistant anything about Etsy marketing, keywords, or product ideas.</div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`p-3 rounded-md ${m.from === 'user' ? 'bg-gray-700 text-white self-end' : 'bg-gray-900 text-gray-100'}`}>
              <div className="text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder="Type a question and press Enter to send..."
            className="flex-grow bg-gray-900 border border-gray-700 rounded-md p-2 text-sm resize-none"
          />
          <div className="flex-shrink-0">
            <button
              onClick={submitPrompt}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-md"
            >
              {loading ? <Spinner size="sm" /> : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatPublic;
