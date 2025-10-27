import React, { useState } from 'react';
import { generateContentCalendar } from '../services/geminiService';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const ContentCalendar: React.FC = () => {
  const [persona, setPersona] = useState('');
  const [calendar, setCalendar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona) return;
    setIsLoading(true);
    setCalendar('');
    try {
      const result = await generateContentCalendar(persona);
      setCalendar(result);
    } catch (error) {
      console.error(error);
      setCalendar('Failed to generate content calendar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Content Calendar</h2>
      <p className="text-gray-400 mb-6">Provide a persona to generate a full 7-day content plan for Instagram and Pinterest. Get daily ideas, captions, and hashtags to save you hours of work.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
         <div className="mb-4">
            <label htmlFor="persona" className="block text-sm font-medium text-gray-300 mb-2">
                Target Persona Description
            </label>
            <textarea
                id="persona"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                rows={6}
                className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Paste the persona details here (from the 'Define Your Audience' tool) to get a tailored content plan..."
            />
        </div>
        <div className="bg-blue-900/50 border border-blue-700 text-blue-300 text-xs rounded p-3 mb-4">
            <i className="fas fa-info-circle mr-2"></i>
            <strong>How to Use:</strong> After generating your plan, simply copy the text for each day and post it on the recommended platform. This keeps you in control and your accounts safe!
        </div>
        <button
          type="submit"
          disabled={isLoading || !persona}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Generating Calendar...' : <><i className="fas fa-calendar-alt"></i> Generate 7-Day Plan</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {calendar && <GeneratedContent content={calendar} />}
    </div>
  );
};

export default ContentCalendar;