import React, { useState, useEffect } from 'react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSet, setIsSet] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSet(true);
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsSet(true);
      onApiKeySet(apiKey.trim());
    }
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsSet(false);
    onApiKeySet('');
  };

  if (isSet) {
    return (
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '6px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#155724', fontSize: '14px' }}>
            ✅ API Key is set
          </span>
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: 'transparent',
              border: '1px solid #155724',
              borderRadius: '4px',
              color: '#155724',
              cursor: 'pointer'
            }}
          >
            {showKey ? 'Hide' : 'Show'}
          </button>
          {showKey && (
            <code style={{ fontSize: '11px', color: '#155724' }}>
              {apiKey}
            </code>
          )}
        </div>
        <button
          onClick={handleClear}
          style={{
            padding: '6px 12px',
            fontSize: '13px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Key
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '6px',
      marginBottom: '20px'
    }}>
      <h4 style={{ marginTop: 0, color: '#856404' }}>⚠️ API Key Required</h4>
      <p style={{ fontSize: '14px', color: '#856404', marginBottom: '12px' }}>
        To use this tool, please enter your Gemini API key. Get one free at{' '}
        <a 
          href="https://aistudio.google.com/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#0066cc' }}
        >
          aistudio.google.com/apikey
        </a>
      </p>
      <p style={{ fontSize: '12px', color: '#856404', marginBottom: '12px' }}>
        Your API key is stored locally in your browser and never sent to our servers.
      </p>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key..."
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={handleSave}
          disabled={!apiKey.trim()}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: apiKey.trim() ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: apiKey.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          Save Key
        </button>
      </div>
    </div>
  );
};
