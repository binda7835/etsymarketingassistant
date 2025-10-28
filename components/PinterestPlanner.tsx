import React, { useState } from 'react';
import { generatePinterestPins } from '../services/geminiService';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const PinterestPlanner: React.FC = () => {
  const [productInfo, setProductInfo] = useState('A collection of cute and spooky Halloween PNGs for digital crafting, sublimation, and DIY projects. Sold on Etsy.');
  const [pins, setPins] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInfo) return;
    setIsLoading(true);
    setPins('');
    try {
      const result = await generatePinterestPins(productInfo);
      setPins(result);
    } catch (error) {
      console.error(error);
      setPins('Failed to plan Pinterest content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Plan Your Pinterest Content</h2>
      <p className="text-gray-400 mb-6">Describe your product to outline a list of strategic Pin ideas, complete with catchy titles, descriptions, and visual concepts to drive traffic from Pinterest to your store.</p>

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
        <button
          type="submit"
          disabled={isLoading || !productInfo}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Planning...' : <><i className="fab fa-pinterest"></i> Plan Pinterest Content</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {pins && <GeneratedContent content={pins} />}
    </div>
  );
};

export default PinterestPlanner;
