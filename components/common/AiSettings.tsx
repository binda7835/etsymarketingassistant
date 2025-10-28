import React, { useEffect, useState } from 'react';

const AiSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    try {
      const current = localStorage.getItem('PUBLIC_AI_URL') || '';
      setUrl(current);
    } catch {}
  }, []);

  const save = () => {
    try {
      localStorage.setItem('PUBLIC_AI_URL', url.trim());
      setSaved('Saved! Your AI endpoint will be used immediately.');
      setTimeout(() => setOpen(false), 600);
      // Soft reload so existing components pick up the setting
      setTimeout(() => location.reload(), 800);
    } catch (e) {
      setSaved('Could not save in this browser.');
    }
  };

  const clearUrl = () => {
    try {
      localStorage.removeItem('PUBLIC_AI_URL');
      setUrl('');
      setSaved('Cleared. The app will use the proxy (if any) or show a config message.');
      setTimeout(() => location.reload(), 600);
    } catch {}
  };

  return (
    <>
      {/* Floating settings button */}
      <button
        aria-label="AI Settings"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-lg w-12 h-12 flex items-center justify-center"
        onClick={() => setOpen(true)}
        title="AI Settings"
      >
        <i className="fas fa-robot"></i>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-lg bg-gray-900 border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">AI Settings</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Paste a public, tokenless Hugging Face Space API URL. The site will use this for AI instead of Gemini.
            </p>
            <input
              className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://huggingface.co/spaces/USER/SPACE/api/predict"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            {saved && <p className="text-green-400 text-sm mt-2">{saved}</p>}
            <div className="flex gap-3 mt-4">
              <button onClick={save} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded">
                Save & Reload
              </button>
              <button onClick={clearUrl} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">
                Clear
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Tip: Make sure the Space accepts anonymous requests and has CORS enabled.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AiSettings;
