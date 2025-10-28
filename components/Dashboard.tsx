import React from 'react';
import { AppView } from '../types';
import Card from './common/Card';
import AdSlot from './common/AdSlot';
import AiChat from './common/AiChatPublic';

interface DashboardProps {
  navigateTo: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Your Smart <span className="text-orange-500">Etsy Toolkit</span></h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          From market research to customer service, here are powerful tools to help you grow your digital product business.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          icon="fa-lightbulb"
          title="Brainstorm Product Ideas"
          description="Expand your shop by discovering a list of new digital product ideas based on a theme or niche."
          onClick={() => navigateTo(AppView.PRODUCT_IDEAS)}
        />
        <Card
          icon="fa-search-dollar"
          title="Research Niche Trends"
          description="Get market insights on trending products, fresh ideas, and profitable keywords in your niche."
          onClick={() => navigateTo(AppView.ETSY_RESEARCH)}
        />
         <Card
          icon="fa-chart-line"
          title="Analyze a Niche"
          description="Look at what top sellers are doing in your niche to find opportunities in pricing and keywords."
          onClick={() => navigateTo(AppView.LISTING_ANALYZER)}
        />
        <Card
          icon="fa-bullseye"
          title="Create Your Marketing Plan"
          description="Outline a complete, step-by-step marketing plan to attract customers on social media and email."
          onClick={() => navigateTo(AppView.STRATEGY)}
        />
        <Card
          icon="fa-users"
          title="Create Audience Personas"
          description="Develop detailed personas to better understand your ideal customers' needs, goals, and pain points."
          onClick={() => navigateTo(AppView.AUDIENCE)}
        />
        <Card
          icon="fa-search-location"
          title="Discover Your Audience Online"
          description="Find the blogs, forums, and social media groups where your potential customers are most active."
          onClick={() => navigateTo(AppView.AUDIENCE_FINDER)}
        />
        <Card
          icon="fa-video"
          title="Create Viral Video Ideas"
          description="Get catchy ideas for TikToks &amp; Instagram Reels to help your products get noticed."
          onClick={() => navigateTo(AppView.VIRAL_VIDEO)}
        />
        <Card
          icon="fa-pinterest"
          title="Plan Pinterest Content"
          description="Outline strategic Pin ideas with catchy titles and descriptions to drive traffic to your store."
          onClick={() => navigateTo(AppView.PINTEREST)}
        />
         <Card
          icon="fa-calendar-alt"
          title="Create a Content Calendar"
          description="Map out a 7-day plan for Instagram &amp; Pinterest with ready-to-use captions and ideas."
          onClick={() => navigateTo(AppView.CONTENT_CALENDAR)}
        />
        <Card
          icon="fa-envelope-open-text"
          title="Draft Email Campaigns"
          description="Write persuasive email copy tailored to your audience to turn subscribers into customers."
          onClick={() => navigateTo(AppView.EMAIL)}
        />
        <Card
          icon="fa-store"
          title="Create an A/B Test for a Listing"
          description="Develop two optimized versions of your listing to test and discover what converts best."
          onClick={() => navigateTo(AppView.ETSY)}
        />
         <Card
          icon="fa-pen-fancy"
          title="Draft a Review Response"
          description="Craft professional and empathetic responses to customer reviews in seconds."
          onClick={() => navigateTo(AppView.REVIEW_RESPONDER)}
        />
      </div>
  <AdSlot />
      <AiChat />
    </div>
  );
};

export default Dashboard;
