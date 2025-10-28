import { GroundedContent, EtsyOptimizationResult } from "../types";

// Google Gemini REST API - Direct fetch calls for unlimited free usage
const API_KEY = 'AIzaSyCItudMofG38Z1KmQ2X0QXGynNvOPb4kBY';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
    groundingMetadata?: {
      groundingChunks?: any[];
    };
  }>;
}

const callGemini = async (
  prompt: string,
  useSearch: boolean = false,
  model: string = 'gemini-2.0-flash-exp'
): Promise<{ text: string; sources?: any[] }> => {
  try {
    const url = `${API_BASE}/${model}:generateContent?key=${API_KEY}`;
    
    const body: any = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    // Add Google Search grounding for real-time internet data
    if (useSearch) {
      body.tools = [{
        googleSearch: {}
      }];
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API Error:', error);
      throw new Error(error.error?.message || 'API request failed');
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    const sources = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const generateAudiencePersonas = async (keywords: string): Promise<string> => {
  const prompt = `You are a marketing expert specializing in the creator economy and digital products. 
Generate 3 detailed user personas for a business selling digital Halloween PNGs on Etsy.
Target audience keywords: "${keywords}".

For each persona, create a detailed profile including:
- **Name & Title:** A catchy name and title (e.g., "Creative Crafter," "DIY Mom")
- **Demographics:** Age range, location, profession/hobby
- **Goals:** What they want to achieve with these PNGs
- **Pain Points:** Challenges these PNGs can solve
- **Preferred Social Media:** Where they look for inspiration

Format in clean, readable Markdown with headings, bold text, and bullet points.`;

  try {
    const { text } = await callGemini(prompt);
    return text;
  } catch (error) {
    console.error("Error generating audience personas:", error);
    return "An error occurred while generating personas. Please try again.";
  }
};

export const findAudienceOnline = async (keywords: string): Promise<GroundedContent> => {
  const prompt = `You are a digital marketing research assistant.
Find online places where this target audience gathers.

Target Audience Keywords: "${keywords}"

List:
1. **Top 5-7 Instagram Accounts/Influencers**
2. **Key Instagram Hashtags** (15-20 popular and niche)
3. **Top 5-7 Reddit Communities (Subreddits)**
4. **Top 5-7 Blogs & Online Forums**

For each, provide a brief description.
Format in clean, readable Markdown.`;

  try {
    const { text, sources } = await callGemini(prompt, true); // Use Google Search
    return { text, sources: sources || [] };
  } catch (error) {
    console.error("Error finding audience online:", error);
    return {
      text: "An error occurred while searching. Please try again.",
      sources: [],
    };
  }
};

export const generateEmailCampaign = async (persona: string, etsyUrl: string): Promise<string> => {
  const prompt = `You are a professional email copywriter with a fun, engaging style.
Write a marketing email promoting digital Halloween PNG files on Etsy.

Target Persona: ${persona}
Etsy Store URL: ${etsyUrl}

Include:
1. 3-5 catchy subject line options
2. Email body with hook, benefits, style description, and CTA
3. Festive, fun, slightly mysterious tone

Format in clean Markdown.`;

  try {
    const { text } = await callGemini(prompt);
    return text;
  } catch (error) {
    console.error("Error generating email campaign:", error);
    return "An error occurred while generating the email. Please try again.";
  }
};

export const generateContentCalendar = async (persona: string): Promise<string> => {
  const prompt = `You are an expert social media manager for creative businesses.
Create a 7-day social media content calendar for Instagram and Pinterest.

Target Persona: ${persona}

For each day include:
- Day & Platform
- Theme/Concept
- Full Post Copy with emojis
- Visual description
- 10-15 Hashtags

Format in clean Markdown with clear headings for each day.`;

  try {
    const { text } = await callGemini(prompt, false, 'gemini-2.5-pro-exp');
    return text;
  } catch (error) {
    console.error("Error generating content calendar:", error);
    return "An error occurred while generating the calendar. Please try again.";
  }
};

export const optimizeEtsyListing = async (description: string): Promise<EtsyOptimizationResult | string> => {
  const prompt = `You are an Etsy SEO expert.
Create two optimized versions of an Etsy product listing for Halloween PNG files for A/B testing.

Original Description: "${description}"

Create Version A (cute & spooky) and Version B (retro & vintage).
For each version provide:
- Title (max 140 characters, keyword-rich)
- Optimized description with hook, what's included, usage ideas, features

Return ONLY valid JSON in this format:
{
  "versionA": {
    "title": "...",
    "description": "..."
  },
  "versionB": {
    "title": "...",
    "description": "..."
  }
}`;

  try {
    const { text } = await callGemini(prompt, false, 'gemini-2.5-pro-exp');
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return text;
  } catch (error) {
    console.error("Error optimizing listing:", error);
    return "An error occurred while optimizing. Please try again.";
  }
};

export const generateMarketingStrategy = async (productInfo: string): Promise<string> => {
  const prompt = `You are a master digital marketing strategist for creative entrepreneurs.
Create a comprehensive 30-day marketing plan for a digital product seller.

Product: "${productInfo}"

Cover:
1. Instagram Growth Strategy (content pillars, schedule, engagement)
2. Reddit Engagement Strategy (80/20 rule, finding subreddits, post ideas)
3. Email List Building (lead magnet, promotion, welcome email)

Format in clean Markdown with headings, subheadings, bold text, and bullet points.`;

  try {
    const { text } = await callGemini(prompt, false, 'gemini-2.5-pro-exp');
    return text;
  } catch (error) {
    console.error("Error generating strategy:", error);
    return "An error occurred while generating the strategy. Please try again.";
  }
};

export const generatePinterestPins = async (productInfo: string): Promise<string> => {
  const prompt = `You are a Pinterest marketing expert for Etsy sellers.
Generate 5 creative Pin ideas for a digital product.

Product: "${productInfo}"

For each Pin:
- Pin Title (catchy, keyword-rich)
- Pin Description (2-3 sentences with CTA)
- Visual Idea description

Format in clean Markdown with clear headings.`;

  try {
    const { text } = await callGemini(prompt, false, 'gemini-2.5-pro-exp');
    return text;
  } catch (error) {
    console.error("Error generating pins:", error);
    return "An error occurred while generating pins. Please try again.";
  }
};

export const getEtsyMarketResearch = async (niche: string): Promise<GroundedContent> => {
  const prompt = `You are an Etsy market research analyst using real-time data.
Provide a detailed trend report for this product niche.

Product Niche: "${niche}"

Include:
1. Current Trends (top 3-4 based on recent data)
2. New Product Ideas (3-5 specific ideas)
3. Pricing Analysis (typical price ranges)
4. Winning Keywords (10-15 high-potential keywords)

Format in clean Markdown with headings, bold text, and bullet points.`;

  try {
    const { text, sources } = await callGemini(prompt, true, 'gemini-2.5-pro-exp'); // Use Google Search
    return { text, sources: sources || [] };
  } catch (error) {
    console.error("Error researching market:", error);
    return {
      text: "An error occurred while researching. Please try again.",
      sources: [],
    };
  }
};

export const generateViralVideoIdeas = async (productInfo: string): Promise<string> => {
  const prompt = `You are a social media expert for viral TikTok and Instagram Reels.
Generate 3 catchy video ideas to promote a digital product.

Product: "${productInfo}"

For each video:
- Hook (thumb-stopping first 3 seconds)
- Video Concept (step-by-step)
- Trending Audio Suggestion

Format in clean Markdown with clear headings.`;

  try {
    const { text } = await callGemini(prompt, false, 'gemini-2.5-pro-exp');
    return text;
  } catch (error) {
    console.error("Error generating video ideas:", error);
    return "An error occurred while generating video ideas. Please try again.";
  }
};

export const generateNewProductIdeas = async (theme: string): Promise<string> => {
  const prompt = `You are a product development specialist for the digital creator economy.
Brainstorm 10 new digital product ideas based on a theme.

Theme/Niche: "${theme}"

Generate 10 distinct digital product ideas for Etsy.
For each: brief 1-2 sentence description of what it is and who it's for.

Format as a numbered list in clean Markdown.`;

  try {
    const { text } = await callGemini(prompt, false, 'gemini-2.5-pro-exp');
    return text;
  } catch (error) {
    console.error("Error generating product ideas:", error);
    return "An error occurred while generating ideas. Please try again.";
  }
};

export const generateReviewResponse = async (review: string): Promise<string> => {
  const prompt = `You are a customer service expert for a small Etsy creative business.
Write a response to this customer review.

Review: "${review}"

Instructions:
1. Analyze sentiment (positive/negative/mixed)
2. If positive: warm, grateful response
3. If negative: empathetic, apologetic with clear next step
4. Keep concise, professional, yet personal
5. Sign off with friendly closing

Format as a single block of text, ready to copy and paste.`;

  try {
    const { text } = await callGemini(prompt);
    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "An error occurred while generating a response. Please try again.";
  }
};

export const analyzeEtsyListings = async (idea: string): Promise<GroundedContent> => {
  const prompt = `You are an expert Etsy market analyst.
Perform a competitive analysis for a new product idea using real-time search data.

Product Idea: "${idea}"

Part 1: Research Current Top Listings
Based on real search data, describe what top listings look like:
- Typical titles, pricing, tags
- Popular styles and features
- Bestseller indicators

Part 2: Strategic Analysis
- Competitive Summary
- Pricing Insights
- Top Keywords & Tags
- Market Opportunity (gaps or unique angles)

Format in clean Markdown with clear headings.`;

  try {
    const { text, sources } = await callGemini(prompt, true, 'gemini-2.5-pro-exp'); // Use Google Search
    return { text, sources: sources || [] };
  } catch (error) {
    console.error("Error analyzing listings:", error);
    return {
      text: "An error occurred while analyzing. Please try again.",
      sources: [],
    };
  }
};
