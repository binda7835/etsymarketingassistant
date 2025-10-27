
import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
        <span className="text-xs text-gray-500 mb-2 block">Advertisement</span>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-gray-400">
                <h4 className="font-bold text-white">Want to Boost Your Etsy Sales?</h4>
                <p className="text-sm">Promote your shop with targeted ads and reach millions of new buyers.</p>
            </div>
            <a 
                href="#" 
                onClick={(e) => e.preventDefault()} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 text-sm whitespace-nowrap"
            >
                Learn More
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
