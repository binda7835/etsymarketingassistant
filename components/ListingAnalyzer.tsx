import React, { useState } from 'react';
import { analyzeEtsyListings } from '../services/geminiServiceBackend';
import { GroundedContent } from '../types';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';
import AdBanner from './common/AdBanner';

const ListingAnalyzer: React.FC = () => {
  const [idea, setIdea] = useState('Boho digital planners for Goodnotes');
  const [analysis, setAnalysis] = useState<GroundedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea) return;
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeEtsyListings(idea);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis({ text: 'Failed to generate analysis. Please try again.', sources: [] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Analyze an Etsy Niche</h2>
      <p className="text-gray-400 mb-6">Validate your product ideas with a competitive analysis grounded in real-time Google Search data to find opportunities in your niche.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="idea" className="block text-sm font-medium text-gray-300 mb-2">
            Product Idea or Niche
          </label>
          <input
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., retro groovy clipart, dark academia digital stickers"
          />
        </div>
        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 text-xs rounded p-3 mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <strong>Disclaimer:</strong> This tool creates a realistic **simulation** of Etsy listings for strategic analysis, informed by **live Google Search data** to ensure insights are current.
        </div>
        <button
          type="submit"
          disabled={isLoading || !idea}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Analyzing...' : <><i className="fas fa-chart-line"></i> Analyze a Niche</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {analysis && (
        <>
            <GeneratedContent content={analysis.text} />
            {analysis.sources && analysis.sources.length > 0 && (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Sources from Google Search</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.sources.map((source, index) => (
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
            <AdBanner />
        </>
      )}
    </div>
  );
};

export default ListingAnalyzer;
