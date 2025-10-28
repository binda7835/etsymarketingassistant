import { GroundedContent, EtsyOptimizationResult } from "../types";

// Using a CORS proxy for Hugging Face to avoid CORS issues
const CORS_PROXY = "https://corsproxy.io/?";
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

const callHuggingFace = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(HF_API_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    }
    
    if (data.error) {
      // Model is loading, return helpful message
      if (data.error.includes('loading')) {
        return "⏳ The AI model is warming up. Please try again in 10-20 seconds...";
      }
      console.error("API Error:", data.error);
      throw new Error(data.error);
    }
    
    return typeof data === 'string' ? data : JSON.stringify(data);
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw error;
  }
};

export const generateAudiencePersonas = async (keywords: string): Promise<string> => {
  const prompt = `You are a marketing expert specializing in the creator economy and digital products. 
    Generate 3 detailed user personas for a business selling digital Halloween PNGs on Etsy.
    Target audience keywords: "${keywords}".

    For each persona, create:
    - Name & Title (e.g., "Creative Crafter," "DIY Mom")
    - Demographics (Age range, location, profession/hobby)
    - Goals (What they want to achieve with these PNGs)
    - Pain Points (Challenges these PNGs can solve)
    - Preferred Social Media (Where they look for inspiration)

    Format in clean, readable Markdown with headings, bold text, and bullet points.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating audience personas:", error);
    return "An error occurred while generating personas. Please try again in a moment.";
  }
};

export const findAudienceOnline = async (keywords: string): Promise<GroundedContent> => {
  const prompt = `You are a digital marketing research assistant.
    Find online places where a specific target audience gathers.

    Target Audience Keywords: "${keywords}"

    List:
    1. Top 5-7 Instagram Accounts/Influencers
    2. Key Instagram Hashtags (15-20 popular and niche)
    3. Top 5-7 Reddit Communities (Subreddits)
    4. Top 5-7 Blogs & Online Forums
    
    For each, provide a brief description.
    Format in clean, readable Markdown.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return {
      text: result,
      sources: [],
    };
  } catch (error) {
    console.error("Error finding audience online:", error);
    return {
      text: "An error occurred while searching for audience communities. Please try again.",
      sources: [],
    };
  }
};

export const generateEmailCampaign = async (persona: string, etsyUrl: string): Promise<string> => {
  const prompt = `You are a professional email copywriter with a fun, engaging, and persuasive style.
    Write a marketing email promoting digital Halloween PNG files on Etsy.

    Target Persona: ${persona}
    Etsy Store URL: ${etsyUrl}

    Include:
    1. 3-5 catchy subject line options
    2. Email Body with hook, benefits, style description, and CTA
    3. Festive, fun, slightly mysterious tone

    Format in clean Markdown.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating email campaign:", error);
    return "An error occurred while generating the email campaign. Please try again.";
  }
};

export const generateContentCalendar = async (persona: string): Promise<string> => {
  const prompt = `You are an expert social media manager for creative businesses.
    Create a 7-day social media content calendar for Instagram and Pinterest.

    Target Persona: ${persona}

    For each day include:
    - Day & Platform
    - Theme/Concept
    - Full Post Copy with emojis and questions
    - Visual description
    - 10-15 Hashtags

    Format in clean Markdown with clear headings for each day.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating content calendar:", error);
    return "An error occurred while generating the content calendar. Please try again.";
  }
};

export const optimizeEtsyListing = async (description: string): Promise<EtsyOptimizationResult | string> => {
  const prompt = `You are an Etsy SEO expert.
    Create two optimized versions of an Etsy product listing for Halloween PNG files.

    Original Description: "${description}"

    Create Version A (cute & spooky angle) and Version B (retro & vintage angle).
    For each:
    - Title (max 140 characters, keyword-rich)
    - Optimized description with hook, what's included, usage ideas, features

    Respond ONLY with valid JSON in this exact format:
    {
      "versionA": {
        "title": "title here",
        "description": "description here"
      },
      "versionB": {
        "title": "title here",
        "description": "description here"
      }
    }`;
    
  try {
    const result = await callHuggingFace(prompt);
    // Try to parse JSON from the response
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return result;
  } catch (error) {
    console.error("Error optimizing Etsy listing:", error);
    return "An error occurred while optimizing the listing. Please try again.";
  }
};

export const generateMarketingStrategy = async (productInfo: string): Promise<string> => {
  const prompt = `You are a master digital marketing strategist for creative entrepreneurs.
    Create a comprehensive 30-day marketing plan for a digital product seller.

    Product: "${productInfo}"

    Cover:
    1. Instagram Growth Strategy (content pillars, schedule, engagement tactics)
    2. Reddit Engagement Strategy (80/20 rule, finding subreddits, post ideas)
    3. Email List Building (lead magnet, promotion places, welcome email)

    Format in clean Markdown with headings, subheadings, bold text, and bullet points.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating marketing strategy:", error);
    return "An error occurred while generating the marketing strategy. Please try again.";
  }
};

export const generatePinterestPins = async (productInfo: string): Promise<string> => {
  const prompt = `You are a Pinterest marketing expert for Etsy sellers.
    Generate 5 creative Pin ideas for a digital product.

    Product: "${productInfo}"

    For each Pin provide:
    - Pin Title (catchy, keyword-rich)
    - Pin Description (2-3 sentences with CTA)
    - Visual Idea description

    Format in clean Markdown with clear headings.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating Pinterest pins:", error);
    return "An error occurred while generating Pinterest ideas. Please try again.";
  }
};

export const getEtsyMarketResearch = async (niche: string): Promise<GroundedContent> => {
  const prompt = `You are an Etsy market research analyst.
    Provide a detailed trend report for this product niche.

    Product Niche: "${niche}"

    Include:
    1. Current Trends (top 3-4)
    2. New Product Ideas (3-5 specific ideas)
    3. Pricing Analysis (typical price range)
    4. Winning Keywords (10-15 high-potential keywords)

    Format in clean Markdown with headings, bold text, and bullet points.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return {
      text: result,
      sources: [],
    };
  } catch (error) {
    console.error("Error getting Etsy market research:", error);
    return {
      text: "An error occurred while researching the Etsy market. Please try again.",
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
    const result = await callHuggingFace(prompt);
    return result;
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
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating product ideas:", error);
    return "An error occurred while generating product ideas. Please try again.";
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
    const result = await callHuggingFace(prompt);
    return result;
  } catch (error) {
    console.error("Error generating review response:", error);
    return "An error occurred while generating a response. Please try again.";
  }
};

export const analyzeEtsyListings = async (idea: string): Promise<GroundedContent> => {
  const prompt = `You are an expert Etsy market analyst.
    Perform a competitive analysis for a new product idea.

    Product Idea: "${idea}"

    Part 1: Simulate Top 5 Listings
    For each: Title, Price, Tags (5-7), Popularity indicator

    Part 2: Strategic Analysis
    - Competitive Summary
    - Pricing Insights
    - Top Keywords & Tags
    - Market Opportunity (gaps or unique angles)

    Format in clean Markdown with clear headings.`;
    
  try {
    const result = await callHuggingFace(prompt);
    return {
      text: result,
      sources: [],
    };
  } catch (error) {
    console.error("Error analyzing Etsy listings:", error);
    return {
      text: "An error occurred while analyzing listings. Please try again.",
      sources: [],
    };
  }
};
