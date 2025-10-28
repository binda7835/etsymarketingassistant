import React, { useState } from 'react';
import { findAudienceOnline } from '../services/geminiServiceBackend';
import { GroundedContent } from '../types';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const AudienceFinder: React.FC = () => {
  const [keywords, setKeywords] = useState('halloween craft influencers on instagram, spooky sublimation designs for etsy, reddit crafting communities');
  const [result, setResult] = useState<GroundedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords) return;
    setIsLoading(true);
    setResult(null);
    try {
      const response = await findAudienceOnline(keywords);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult({ text: 'Failed to find audience communities. Please try again.', sources: [] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Discover Your Audience Online</h2>
      <p className="text-gray-400 mb-6">Find Instagram accounts, Reddit communities, and blogs where your target customers are active. This tool uses Google Search to find relevant places to engage with your audience.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
            Describe Your Audience or Product
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., instagram crafters, spooky t-shirt designers, DIY halloween decor on reddit"
          />
        </div>
        <div className="bg-blue-900/50 border border-blue-700 text-blue-300 text-xs rounded p-3 mb-4">
          <i className="fas fa-info-circle mr-2"></i>
          <strong>Ethical Marketing Tip:</strong> Use this list to learn and engage. Build relationships by providing value, not by spamming. Always respect community rules.
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Searching...' : <><i className="fas fa-search-location"></i> Discover Communities</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {result && (
        <>
          <GeneratedContent content={result.text} />
          {result.sources && result.sources.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Sources from Google Search</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.sources.map((source, index) => (
                  source.web?.uri && (
                    <a
                      key={index}
                      href={source.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 hover:border-orange-500 transition-colors duration-300 block"
                    >
                      <p className="font-semibold text-orange-400 truncate">{source.web.title}</p>
                      <p className="text-xs text-gray-400 truncate">{source.web.uri}</p>
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudienceFinder;
