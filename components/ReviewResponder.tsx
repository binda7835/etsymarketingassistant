import React, { useState } from 'react';
import { generateReviewResponse } from '../services/geminiService';
import Spinner from './common/Spinner';
import GeneratedContent from './common/GeneratedContent';

const ReviewResponder: React.FC = () => {
  const [review, setReview] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;
    setIsLoading(true);
    setResponse('');
    try {
      const result = await generateReviewResponse(review);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse('Failed to generate a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Customer Review Responder</h2>
      <p className="text-gray-400 mb-6">Provide excellent customer service. Paste in a customer review to generate a professional, on-brand response in seconds.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-2">
            Customer's Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., 'I love these PNGs! They were so easy to use.' OR 'I had trouble downloading the files...'"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !review}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'Drafting...' : <><i className="fas fa-pen-fancy"></i> Generate Response</>}
        </button>
      </form>

      {isLoading && <Spinner />}
      {response && <GeneratedContent content={response} />}
    </div>
  );
};

export default ReviewResponder;