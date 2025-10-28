import React, { useState } from 'react';
import { optimizeEtsyListing } from '../services/geminiServiceBackend';
import { EtsyOptimizationResult } from '../types';
import Spinner from './common/Spinner';

const EtsyOptimizer: React.FC = () => {
  const [description, setDescription] = useState('');
  const [optimizationResult, setOptimizationResult] = useState<EtsyOptimizationResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    setIsLoading(true);
    setOptimizationResult(null);
    setError('');
    try {
      const result = await optimizeEtsyListing(description);
      if (typeof result === 'string') {
        setError(result);
      } else {
        setOptimizationResult(result);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to optimize the description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content: string) => {
    let html = content.replace(/\n/g, '<br />');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/(\<li.*\>.*<\/li\>)/gim, '<ul>$1</ul>');
    html = html.replace(/<\/ul\>\n<ul\>/gim, '');
    return { __html: html };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Create an A/B Test for a Listing</h2>
      <p className="text-gray-400 mb-6">Develop two distinct, optimized versions of your listing. A/B test them on Etsy to discover which title and description converts more sales!</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Current Etsy Product Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., A set of 10 halloween PNGs. High quality."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !description}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Creating...' : <><i className="fas fa-rocket"></i> Create A/B Test</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 border border-red-700 p-4 rounded-lg">{error}</div>}
      
      {optimizationResult && (
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="flex border-b border-gray-700">
            <button 
              onClick={() => setActiveTab('A')}
              className={`flex-1 py-3 px-4 text-center font-bold transition-colors duration-300 ${activeTab === 'A' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Version A (Cute & Spooky)
            </button>
            <button 
              onClick={() => setActiveTab('B')}
              className={`flex-1 py-3 px-4 text-center font-bold transition-colors duration-300 ${activeTab === 'B' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Version B (Retro & Vintage)
            </button>
          </div>
          <div className="p-6">
            {activeTab === 'A' && (
              <div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">Title</h3>
                <p className="p-3 bg-gray-900 rounded-md text-gray-300 mb-4">{optimizationResult.versionA.title}</p>
                <h3 className="text-xl font-bold text-orange-400 mb-2">Description</h3>
                <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={renderContent(optimizationResult.versionA.description)} />
              </div>
            )}
            {activeTab === 'B' && (
              <div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">Title</h3>
                <p className="p-3 bg-gray-900 rounded-md text-gray-300 mb-4">{optimizationResult.versionB.title}</p>
                <h3 className="text-xl font-bold text-orange-400 mb-2">Description</h3>
                <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={renderContent(optimizationResult.versionB.description)} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EtsyOptimizer;
