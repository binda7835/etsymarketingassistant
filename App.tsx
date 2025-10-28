import React, { useState, useCallback } from 'react';
import { AppView, PageView } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AudiencePersonaGenerator from './components/AudiencePersonaGenerator';
import EmailGenerator from './components/EmailGenerator';
import ContentCalendar from './components/ContentCalendar';
import EtsyOptimizer from './components/EtsyOptimizer';
import Footer from './components/Footer';
import AudienceFinder from './components/AudienceFinder';
import MarketingStrategyGenerator from './components/MarketingStrategyGenerator';
import PinterestPlanner from './components/PinterestPlanner';
import EtsyTrendSpotter from './components/EtsyTrendSpotter';
import ViralVideoGenerator from './components/ViralVideoGenerator';
import ProductIdeaGenerator from './components/ProductIdeaGenerator';
import ReviewResponder from './components/ReviewResponder';
import ListingAnalyzer from './components/ListingAnalyzer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Blog from './components/pages/Blog';
import Contact from './components/pages/Contact';
import Privacy from './components/pages/Privacy';
import AiSettings from './components/common/AiSettings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [currentTool, setCurrentTool] = useState<AppView>(AppView.DASHBOARD);

  const navigateToPage = useCallback((page: PageView) => {
    setCurrentPage(page);
    setCurrentTool(AppView.DASHBOARD); // Reset tool view when changing pages
    window.scrollTo(0, 0);
  }, []);

  const navigateToTool = useCallback((tool: AppView) => {
    setCurrentPage(PageView.TOOLS);
    setCurrentTool(tool);
    window.scrollTo(0, 0);
  }, []);

  const renderToolView = () => {
    switch (currentTool) {
      case AppView.AUDIENCE:
        return <AudiencePersonaGenerator />;
      case AppView.EMAIL:
        return <EmailGenerator />;
      case AppView.CONTENT_CALENDAR:
        return <ContentCalendar />;
      case AppView.ETSY:
        return <EtsyOptimizer />;
      case AppView.AUDIENCE_FINDER:
        return <AudienceFinder />;
      case AppView.STRATEGY:
        return <MarketingStrategyGenerator />;
      case AppView.PINTEREST:
        return <PinterestPlanner />;
      case AppView.ETSY_RESEARCH:
        return <EtsyTrendSpotter />;
      case AppView.VIRAL_VIDEO:
        return <ViralVideoGenerator />;
      case AppView.PRODUCT_IDEAS:
        return <ProductIdeaGenerator />;
      case AppView.REVIEW_RESPONDER:
        return <ReviewResponder />;
      case AppView.LISTING_ANALYZER:
        return <ListingAnalyzer />;
      case AppView.DASHBOARD:
      default:
        return <Dashboard navigateTo={navigateToTool} />;
    }
  };

  const renderPageView = () => {
    switch (currentPage) {
      case PageView.HOME:
        return <Home navigateToPage={navigateToPage} />;
      case PageView.ABOUT:
        return <About />;
      case PageView.BLOG:
        return <Blog />;
      case PageView.CONTACT:
        return <Contact />;
      case PageView.PRIVACY:
        return <Privacy />;
      case PageView.TOOLS:
        return (
          <>
            {currentTool !== AppView.DASHBOARD && (
              <button
                onClick={() => navigateToTool(AppView.DASHBOARD)}
                className="mb-8 flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-300"
              >
                <i className="fas fa-arrow-left"></i>
                Back to All Tools
              </button>
            )}
            {renderToolView()}
          </>
        );
      default:
        return <Home navigateToPage={navigateToPage}/>;
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      <Header navigateToPage={navigateToPage} currentPage={currentPage} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderPageView()}
      </main>
      <Footer navigateToPage={navigateToPage} />
      <AiSettings />
    </div>
  );
};

export default App;
