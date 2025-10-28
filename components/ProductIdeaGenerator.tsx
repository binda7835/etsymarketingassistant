import React, { useState } from 'react';
import { generateNewProductIdeas } from '../services/geminiServiceFree';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const ProductIdeaGenerator: React.FC = () => {
  const [theme, setTheme] = useState('Cute Halloween');
  const [ideas, setIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme) return;
    setIsLoading(true);
    setIdeas('');
    try {
      const result = await generateNewProductIdeas(theme);
      setIdeas(result);
    } catch (error) {
      console.error(error);
      setIdeas('Failed to brainstorm product ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Brainstorm New Product Ideas</h2>
      <p className="text-gray-400 mb-6">Never run out of inspiration. Enter a theme or niche to discover a list of new digital products to create and sell.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-2">
            Theme or Niche
          </label>
          <input
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., Retro Groovy, Dark Academia, Cottagecore"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !theme}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Brainstorming...' : <><i className="fas fa-lightbulb"></i> Brainstorm Product Ideas</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {ideas && <GeneratedContent content={ideas} />}
    </div>
  );
};

export default ProductIdeaGenerator;
