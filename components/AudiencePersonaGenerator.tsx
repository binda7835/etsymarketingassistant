import React, { useState } from 'react';
import { generateAudiencePersonas } from '../services/geminiServiceBackend';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const AudiencePersonaGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState('crafters, DIY moms, small business owners, teachers');
  const [personas, setPersonas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords) return;
    setIsLoading(true);
    setPersonas('');
    try {
      const result = await generateAudiencePersonas(keywords);
      setPersonas(result);
    } catch (error) {
      console.error(error);
      setPersonas('Failed to create personas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Create Audience Personas</h2>
      <p className="text-gray-400 mb-6">Enter keywords that describe your ideal customers to develop detailed personas.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
            Target Audience Keywords
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., crafters, small business owners, teachers"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Creating...' : <><i className="fas fa-users"></i> Create Personas</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {personas && <GeneratedContent content={personas} />}
    </div>
  );
};

export default AudiencePersonaGenerator;
