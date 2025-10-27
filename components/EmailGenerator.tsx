import React, { useState } from 'react';
import { generateEmailCampaign } from '../services/geminiService';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const EmailGenerator: React.FC = () => {
  const [persona, setPersona] = useState('');
  const [etsyUrl, setEtsyUrl] = useState('https://yourshop.etsy.com');
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona || !etsyUrl) return;
    setIsLoading(true);
    setEmailContent('');
    try {
      const result = await generateEmailCampaign(persona, etsyUrl);
      setEmailContent(result);
    } catch (error) {
      console.error(error);
      setEmailContent('Failed to generate email content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Craft Email Campaigns</h2>
      <p className="text-gray-400 mb-6">Paste in a customer persona (you can generate one in the "Define Your Audience" tool) to create a tailored email campaign.</p>

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
            placeholder="Paste the persona details here..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="etsyUrl" className="block text-sm font-medium text-gray-300 mb-2">
            Your Etsy Store URL
          </label>
          <input
            type="text"
            id="etsyUrl"
            value={etsyUrl}
            onChange={(e) => setEtsyUrl(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="https://yourshop.etsy.com"
          />
        </div>
        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 text-xs rounded p-3 mb-4">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            <strong>Important:</strong> Only send marketing emails to people who have explicitly given you permission to contact them (opted-in). Email scraping and sending unsolicited emails are illegal under laws like CAN-SPAM and GDPR. Respect privacy.
        </div>
        <button
          type="submit"
          disabled={isLoading || !persona}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Generating...' : <><i className="fas fa-magic"></i> Generate Email Content</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {emailContent && <GeneratedContent content={emailContent} />}
    </div>
  );
};

export default EmailGenerator;