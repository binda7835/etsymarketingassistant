
import React from 'react';

interface CardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-6 flex flex-col items-start cursor-pointer group hover:bg-orange-900/40 border border-gray-700 hover:border-orange-500 transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="bg-orange-500/20 text-orange-400 rounded-lg p-3 mb-4">
        <i className={`fas ${icon} fa-2x w-8 h-8 flex items-center justify-center`}></i>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 flex-grow">{description}</p>
      <span className="mt-4 text-orange-400 font-semibold group-hover:underline">
        Get Started <i className="fas fa-arrow-right ml-1"></i>
      </span>
    </div>
  );
};

export default Card;
