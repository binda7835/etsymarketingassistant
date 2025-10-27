import React, { useState, useCallback } from 'react';
import { AppView } from './types';
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const navigateTo = useCallback((view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  const renderView = () => {
    switch (currentView) {
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
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      <Header onHomeClick={() => navigateTo(AppView.DASHBOARD)} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {currentView !== AppView.DASHBOARD && (
          <button
            onClick={() => navigateTo(AppView.DASHBOARD)}
            className="mb-8 flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-300"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Dashboard
          </button>
        )}
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;