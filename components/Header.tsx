import React from 'react';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div onClick={onHomeClick} className="flex items-center gap-3 cursor-pointer">
          <i className="fas fa-store text-3xl text-orange-500"></i>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Etsy Marketing Assistant
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;