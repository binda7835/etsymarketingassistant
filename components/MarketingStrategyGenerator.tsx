import React, { useState } from 'react';
import { generateMarketingStrategy } from '../services/geminiServiceFree';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const MarketingStrategyGenerator: React.FC = () => {
  const [productInfo, setProductInfo] = useState('A collection of cute and spooky Halloween PNGs for digital crafting, sublimation, and DIY projects. Sold on Etsy.');
  const [strategy, setStrategy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInfo) return;
    setIsLoading(true);
    setStrategy('');
    try {
      const result = await generateMarketingStrategy(productInfo);
      setStrategy(result);
    } catch (error) {
      console.error(error);
      setStrategy('Failed to create a marketing plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Create Your Marketing Plan</h2>
      <p className="text-gray-400 mb-6">Describe your product, and this assistant will outline a 30-day plan to help you build a community and drive sales on Instagram, Reddit, and via email.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="productInfo" className="block text-sm font-medium text-gray-300 mb-2">
            Product & Audience Description
          </label>
          <textarea
            id="productInfo"
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            rows={4}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., A collection of retro-style Halloween PNGs for t-shirts..."
          />
        </div>
        <div className="bg-green-900/50 border border-green-700 text-green-300 text-xs rounded p-3 mb-4">
            <i className="fas fa-lightbulb mr-2"></i>
            <strong>Pro Tip:</strong> The best marketing doesn't feel like marketing. Focus on being helpful and authentic, and the sales will follow.
        </div>
        <button
          type="submit"
          disabled={isLoading || !productInfo}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Creating Plan...' : <><i className="fas fa-bullseye"></i> Create My Plan</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {strategy && <GeneratedContent content={strategy} />}
    </div>
  );
};

export default MarketingStrategyGenerator;
