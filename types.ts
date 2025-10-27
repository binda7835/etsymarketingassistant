export enum AppView {
  DASHBOARD,
  AUDIENCE,
  EMAIL,
  CONTENT_CALENDAR,
  ETSY,
  AUDIENCE_FINDER,
  STRATEGY,
  PINTEREST,
  ETSY_RESEARCH,
  VIRAL_VIDEO,
  PRODUCT_IDEAS,
  REVIEW_RESPONDER,
  LISTING_ANALYZER,
}

export interface GroundedContent {
  text: string;
  sources: any[];
}

export interface EtsyOptimizationResult {
  versionA: {
    title: string;
    description: string;
  };
  versionB: {
    title: string;
    description: string;
  };
}

export interface Persona {
  name: string;
  demographics: string;
  goals: string;
  painPoints: string;
  platforms: string;
}

export interface SocialPostIdea {
  platform: string;
  idea: string;
  copy: string;
  visuals: string;
  hashtags: string;
}