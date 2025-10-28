import React from 'react';
import { PageView } from '../types';

interface HeaderProps {
    navigateToPage: (page: PageView) => void;
    currentPage: PageView;
}

const Header: React.FC<HeaderProps> = ({ navigateToPage, currentPage }) => {
  const navLinkClasses = (page: PageView) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        currentPage === page 
        ? 'bg-orange-600 text-white' 
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
    
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            onClick={() => navigateToPage(PageView.HOME)} 
            className="flex items-center gap-3 cursor-pointer"
          >
            <i className="fas fa-store text-2xl text-orange-500"></i>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              Etsy Marketing Assistant
            </span>
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage(PageView.HOME); }} className={navLinkClasses(PageView.HOME)}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage(PageView.TOOLS); }} className={navLinkClasses(PageView.TOOLS)}>Tools</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage(PageView.BLOG); }} className={navLinkClasses(PageView.BLOG)}>Blog</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage(PageView.ABOUT); }} className={navLinkClasses(PageView.ABOUT)}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage(PageView.CONTACT); }} className={navLinkClasses(PageView.CONTACT)}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;