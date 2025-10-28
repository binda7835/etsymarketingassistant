import React from 'react';
import { PageView } from '../types';

interface FooterProps {
    navigateToPage: (page: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateToPage }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: PageView) => {
        e.preventDefault();
        navigateToPage(page);
    };

    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-bold text-white">Etsy Marketing Assistant</h3>
                        <p className="text-gray-400 text-sm mt-1">Your smart assistant for Etsy success.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-3">Quick Links</h4>
                        <div className="flex flex-col space-y-2">
                            <a href="#" onClick={(e) => handleNavClick(e, PageView.ABOUT)} className="text-gray-400 hover:text-white transition-colors">About</a>
                            <a href="#" onClick={(e) => handleNavClick(e, PageView.CONTACT)} className="text-gray-400 hover:text-white transition-colors">Contact</a>
                            <a href="#" onClick={(e) => handleNavClick(e, PageView.PRIVACY)} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-3">Follow Along</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="https://www.instagram.com/thedigitalatticstore/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors text-2xl">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://thedigitalatticstore.etsy.com" target="_blank" rel="noopener noreferrer" aria-label="Etsy" className="text-gray-400 hover:text-white transition-colors text-2xl">
                                <i className="fab fa-etsy"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Etsy Marketing Assistant. All Rights Reserved.</p>
                    <p className="text-xs mt-2">Disclaimer: This website provides marketing tools and content suggestions. Users are responsible for complying with all platform terms of service and applicable laws, including marketing and privacy regulations.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;