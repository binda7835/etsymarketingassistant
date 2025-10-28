import React from 'react';
import { PageView } from '../../types';

interface HomeProps {
    navigateToPage: (page: PageView) => void;
}

const Home: React.FC<HomeProps> = ({ navigateToPage }) => {
    const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigateToPage(PageView.TOOLS);
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="text-center py-20">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                    Grow Your Etsy Shop, <br />
                    <span className="text-orange-500">Smarter & Faster</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                    Welcome to the Etsy Marketing Assistant, your all-in-one toolkit for market research, content creation, and strategy. Stop guessing and start growing with powerful, easy-to-use tools designed for digital creators.
                </p>
                <a 
                    href="#"
                    onClick={handleCTAClick}
                    className="mt-10 inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                    Explore the Tools <i className="fas fa-arrow-right ml-2"></i>
                </a>
            </div>

            {/* Features Section */}
            <div className="py-20">
                <div className="text-center mb-12">
                     <h2 className="text-4xl font-bold text-white">Everything You Need to Succeed</h2>
                     <p className="mt-3 text-gray-400 max-w-2xl mx-auto">From brainstorming your next bestseller to crafting the perfect marketing message, we've got you covered.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    <div className="bg-gray-800/50 p-8 rounded-lg">
                        <i className="fas fa-search-dollar text-4xl text-orange-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Market Research</h3>
                        <p className="text-gray-400">Analyze niche trends, discover popular keywords, and see what top sellers are doing to find your unique market opportunity.</p>
                    </div>
                     <div className="bg-gray-800/50 p-8 rounded-lg">
                        <i className="fas fa-magic text-4xl text-orange-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Content Creation</h3>
                        <p className="text-gray-400">Plan social media content, draft email campaigns, and create A/B tests for your listings to find out what resonates with buyers.</p>
                    </div>
                     <div className="bg-gray-800/50 p-8 rounded-lg">
                        <i className="fas fa-lightbulb text-4xl text-orange-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Product Strategy</h3>
                        <p className="text-gray-400">Brainstorm your next digital product, create a step-by-step marketing plan, and connect with your ideal audience online.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
