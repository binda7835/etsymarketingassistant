import React, { useState } from 'react';
import { generateViralVideoIdeas } from '../services/geminiService';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const ViralVideoGenerator: React.FC = () => {
  const [productInfo, setProductInfo] = useState('A collection of cute and spooky Halloween PNGs for digital crafting.');
  const [ideas, setIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInfo) return;
    setIsLoading(true);
    setIdeas('');
    try {
      const result = await generateViralVideoIdeas(productInfo);
      setIdeas(result);
    } catch (error) {
      console.error(error);
      setIdeas('Failed to create video ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Create Viral Video Ideas</h2>
      <p className="text-gray-400 mb-6">Create short-form video ideas for TikTok & Instagram Reels that will stop the scroll and grab attention.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="productInfo" className="block text-sm font-medium text-gray-300 mb-2">
            Product Description
          </label>
          <textarea
            id="productInfo"
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            rows={4}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., A set of retro-style PNGs for t-shirts..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !productInfo}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Creating...' : <><i className="fas fa-video"></i> Create Video Ideas</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {ideas && <GeneratedContent content={ideas} />}
    </div>
  );
};

export default ViralVideoGenerator;
