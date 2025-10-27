
import React from 'react';
import { AppView } from '../types';
import Card from './common/Card';
import AdBanner from './common/AdBanner';

interface DashboardProps {
  navigateTo: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Your AI <span className="text-orange-500">Etsy Assistant</span></h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          From market research to customer service, get AI-powered tools to grow your digital product business on Etsy.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          icon="fa-lightbulb"
          title="New Product Ideas"
          description="Brainstorm a list of new digital product ideas based on a theme to expand your store's offerings."
          onClick={() => navigateTo(AppView.PRODUCT_IDEAS)}
        />
        <Card
          icon="fa-search-dollar"
          title="Etsy Trend Spotter"
          description="Get AI market research on trending products, ideas, and keywords in your niche."
          onClick={() => navigateTo(AppView.ETSY_RESEARCH)}
        />
         <Card
          icon="fa-chart-line"
          title="Etsy Listing Analyzer"
          description="Analyze what top sellers are doing in your niche to find pricing and keyword opportunities."
          onClick={() => navigateTo(AppView.LISTING_ANALYZER)}
        />
        <Card
          icon="fa-bullseye"
          title="Generate Marketing Strategy"
          description="Get a complete, step-by-step marketing plan to attract customers on social media and email."
          onClick={() => navigateTo(AppView.STRATEGY)}
        />
        <Card
          icon="fa-users"
          title="Define Your Audience"
          description="Generate detailed personas to understand your ideal customers' needs, goals, and pain points."
          onClick={() => navigateTo(AppView.AUDIENCE)}
        />
        <Card
          icon="fa-search-location"
          title="Find Your Audience Online"
          description="Discover blogs, forums, and social media groups where your potential customers hang out."
          onClick={() => navigateTo(AppView.AUDIENCE_FINDER)}
        />
        <Card
          icon="fa-video"
          title="Viral Video Ideas"
          description="Generate catchy ideas for TikToks &amp; Instagram Reels to get your products noticed."
          onClick={() => navigateTo(AppView.VIRAL_VIDEO)}
        />
        <Card
          icon="fa-pinterest"
          title="Pinterest Power-Planner"
          description="Generate strategic Pin ideas with catchy titles and descriptions to drive traffic."
          onClick={() => navigateTo(AppView.PINTEREST)}
        />
         <Card
          icon="fa-calendar-alt"
          title="Generate Content Calendar"
          description="Get a 7-day plan for Instagram &amp; Pinterest with ready-to-use captions and ideas."
          onClick={() => navigateTo(AppView.CONTENT_CALENDAR)}
        />
        <Card
          icon="fa-envelope-open-text"
          title="Craft Email Campaigns"
          description="Generate persuasive email copy tailored to your audience to turn subscribers into customers."
          onClick={() => navigateTo(AppView.EMAIL)}
        />
        <Card
          icon="fa-store"
          title="Supercharge Your Etsy Listing"
          description="Generate two optimized versions of your listing to A/B test and find what converts best."
          onClick={() => navigateTo(AppView.ETSY)}
        />
         <Card
          icon="fa-pen-fancy"
          title="Customer Review Responder"
          description="Craft professional and empathetic responses to customer reviews in seconds."
          onClick={() => navigateTo(AppView.REVIEW_RESPONDER)}
        />
      </div>
      <AdBanner />
    </div>
  );
};

export default Dashboard;
