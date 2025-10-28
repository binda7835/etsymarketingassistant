import { GoogleGenAI, Type } from "@google/genai";
import { GroundedContent, EtsyOptimizationResult } from "../types";

const getAI = () => {
  const apiKey = localStorage.getItem('gemini_api_key') || '';
  if (!apiKey) {
    throw new Error('API key not found. Please set your API key in the settings.');
  }
  return new GoogleGenAI({ apiKey });
};

const model = "gemini-2.5-flash";

export const generateAudiencePersonas = async (keywords: string): Promise<string> => {
  const prompt = `
    You are a marketing expert specializing in the creator economy and digital products. 
    Your task is to generate 3 detailed user personas for a business selling digital Halloween PNGs on Etsy.
    The target audience is described by these keywords: "${keywords}".

    For each persona, create a detailed profile including:
    - **Name & Title:** A catchy name and a title (e.g., "Creative Crafter," "DIY Mom," "Side-Hustle Designer").
    - **Demographics:** Age range, location, profession/hobby.
    - **Goals:** What are they trying to achieve with these PNGs? (e.g., create unique party invitations, design t-shirts for their small business, make fun crafts with their kids).
    - **Pain Points:** What challenges do they face that these PNGs can solve? (e.g., lack of time to create graphics from scratch, limited design skills, need for high-quality and affordable assets).
    - **Preferred Social Media:** Where do they look for inspiration? (e.g., Pinterest, Instagram, TikTok, Facebook crafting groups).

    Format the output in clean, readable Markdown. Use headings, bold text, and bullet points to structure the information for each persona.
  `;
  try {
    const response = await getAI().models.generateContent({
      model: model,
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating audience personas:", error);
    return "An error occurred while generating personas. Please check the console for details.";
  }
};

export const findAudienceOnline = async (keywords: string): Promise<GroundedContent> => {
  const prompt = `
      You are a digital marketing research assistant.
      Your goal is to find online places where a specific target audience gathers, with a focus on Instagram and Reddit.

      Target Audience Keywords: "${keywords}"

      Task:
      Based on the keywords, find and list the following:
      1.  **Top 5-7 Instagram Accounts/Influencers:** Identify key Instagram accounts, creators, or influencers that this audience follows.
      2.  **Key Instagram Hashtags:** A list of 15-20 popular and niche hashtags this audience uses and follows on Instagram.
      3.  **Top 5-7 Reddit Communities (Subreddits):** Find relevant subreddits where the audience discusses related topics, asks for advice, or shares creations.
      4.  **Top 5-7 Blogs & Online Forums:** Popular blogs or forums (outside of Reddit/Instagram) that this audience reads for inspiration, tutorials, or industry news.
      
      For each account, blog, and community, provide a brief, one-sentence description of what it is.
      Format the output in clean, readable Markdown.
    `;
  try {
    const response = await getAI().models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

    return {
      text: response.text,
      sources: sources,
    };
  } catch (error) {
    console.error("Error finding audience online:", error);
    return {
      text:
        "An error occurred while searching for audience communities. Please check the console for details.",
      sources: [],
    };
  }
};

export const generateEmailCampaign = async (persona: string, etsyUrl: string): Promise<string> => {
  const prompt = `
    You are a professional email copywriter with a fun, engaging, and persuasive style.
    Your task is to write a marketing email promoting a new collection of digital Halloween PNG files on an Etsy store.

    **Target Persona:**
    ${persona}

    **Etsy Store URL:**
    ${etsyUrl}

    **Instructions:**
    1.  **Subject Line:** Write 3-5 catchy and spooky (but not cheesy) subject line options.
    2.  **Email Body:**
        - Start with a hook that resonates with the target persona's goals or pain points.
        - Introduce the new Halloween PNG collection, highlighting its benefits (e.g., easy to use, high-quality, perfect for [mention specific projects like t-shirts, mugs, invitations]).
        - Describe the style of the PNGs (e.g., cute, spooky, vintage, modern).
        - Create a clear and enthusiastic Call-to-Action (CTA) that encourages them to click through to the Etsy store.
    3.  **Tone:** The tone should be festive, fun, and slightly mysterious to fit the Halloween theme.

    Format the output in clean, readable Markdown.
  `;
  try {
    const response = await getAI().models.generateContent({
      model: model,
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating email campaign:", error);
    return "An error occurred while generating the email campaign. Please check the console for details.";
  }
};

export const generateContentCalendar = async (persona: string): Promise<string> => {
  const prompt = `
    You are an expert social media manager for creative businesses selling digital products like Halloween PNGs.
    Your task is to create a 7-day social media content calendar for Instagram and Pinterest, tailored to a specific audience persona.

    **Target Persona:**
    ${persona}

    **Instructions:**
    Create a day-by-day plan for one full week. For each day, provide a content idea for either Instagram or Pinterest. Mix up the platforms. The goal is to build community, showcase the product, and drive traffic.

    For each day's post, you must include:
    - **Day & Platform:** (e.g., "Day 1: Instagram")
    - **Theme/Concept:** A clear, catchy idea for the post (e.g., "Spooky Project Showcase," "Behind-the-Scenes Design Process," "Tip Tuesday: How to Use PNGs for Sublimation").
    - **Post Copy:** Write the full, engaging caption for the post. Use relevant emojis. Ask a question to encourage comments.
    - **Visuals:** Describe the image or video needed (e.g., "A carousel of 5 mockups showing a ghost PNG on a t-shirt, mug, and tote bag.", "A short, satisfying time-lapse video of you designing a pumpkin PNG.", "A beautiful Pin graphic with text overlay: '5 Ways to Decorate for a Halloween Party with PNGs'").
    - **Hashtags:** Provide a mix of 10-15 popular and niche hashtags.

    Structure the output in clean, readable Markdown. Use a clear heading for each day of the week.
  `;
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content calendar:", error);
    return "An error occurred while generating the content calendar. Please check the console for details.";
  }
};


export const optimizeEtsyListing = async (description: string): Promise<EtsyOptimizationResult | string> => {
  const prompt = `
    You are an Etsy SEO expert with a knack for writing compelling product descriptions that convert.
    Your task is to create two distinct, optimized versions of an Etsy product listing for a digital download of Halloween PNG files. This is for A/B testing.

    **Original Description:**
    "${description}"

    **Instructions for Each Version (Version A and Version B):**
    1.  **Title:** Write a unique, keyword-rich title (max 140 characters). Version A should focus on a "cute & spooky" angle, while Version B should target a "retro & vintage" angle.
    2.  **Description:** Rewrite the description to be engaging and optimized.
        - Start with a compelling hook.
        - Clearly list what's included (e.g., file types, resolution).
        - Provide creative usage ideas in a bulleted list.
        - Mention key features like "instant download," "transparent background," etc.
        - Naturally weave in relevant keywords for the respective angle (e.g., "cute ghost png" for A, "vintage halloween clipart" for B).
        - Use short paragraphs, bullet points, and emojis for readability.

    Return the result as a JSON object.
  `;
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            versionA: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
            versionB: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
          },
        },
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error optimizing Etsy listing:", error);
    return "An error occurred while optimizing the listing. Please check the console for details.";
  }
};


export const generateMarketingStrategy = async (productInfo: string): Promise<string> => {
  const prompt = `
    You are a master digital marketing strategist for creative entrepreneurs.
    Your task is to create a comprehensive, actionable, and ethical marketing strategy for a seller of digital products.

    **Product Information:**
    "${productInfo}"

    **Instructions:**
    Generate a 30-day marketing plan with a focus on building community and driving sales without spamming. The plan should cover three key areas: Instagram, Reddit, and building an Email List.

    **1. Instagram Growth Strategy:**
    - **Content Pillars:** Suggest 3-4 content themes (e.g., "Project Inspiration," "Behind-the-Scenes," "Customer Features," "Design Tips").
    - **Weekly Content Schedule:** Propose a simple weekly posting schedule (e.g., "Monday: Inspiration Post, Wednesday: Time-lapse video, Friday: New Product Feature").
    - **Engagement Tactics:** List 3 ways to authentically engage with the community (e.g., "Respond to every comment," "Engage with relevant hashtags," "Run a poll in Stories").

    **2. Reddit Engagement Strategy:**
    - **Finding Subreddits:** Explain how to identify the right communities (using the "Find Your Audience Online" tool).
    - **How to Engage (The 80/20 Rule):** Emphasize providing value. 80% of activity should be helpful comments, sharing advice, and participating in discussions. 20% can be self-promotion, but only when relevant and not spammy.
    - **Post Ideas:** Suggest 2-3 types of posts for Reddit (e.g., "Sharing a free sample PNG for feedback," "Asking for advice on a new design idea," "Showcasing a project made with their PNGs").

    **3. Email List Building (The Ethical Way):**
    - **Lead Magnet Idea:** Suggest a compelling freebie to offer in exchange for an email address (e.g., "A free mini-pack of 3 exclusive Halloween PNGs," "A printable Halloween craft guide").
    - **Where to Promote It:** List key places to promote the lead magnet (e.g., "Link in Instagram bio," "A pin on Pinterest," "A mention in your Etsy store announcement").
    - **First Email to Send:** Outline the content of the first "welcome" email new subscribers should receive.

    Format the output in clean, readable Markdown. Use headings, subheadings, bold text, and bullet points to make the strategy easy to follow. Start with a strong opening statement about the importance of authentic marketing.
  `;
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-pro", // Using a more powerful model for strategic content
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating marketing strategy:", error);
    return "An error occurred while generating the marketing strategy. Please check the console for details.";
  }
};

export const generatePinterestPins = async (productInfo: string): Promise<string> => {
    const prompt = `
      You are a Pinterest marketing expert, specializing in driving traffic for Etsy sellers.
      Your task is to generate 5 creative and compelling Pin ideas for a digital product.
  
      **Product Information:**
      "${productInfo}"
  
      **Instructions:**
      For each of the 5 Pin ideas, provide the following:
      - **Pin Title:** A catchy, keyword-rich title (e.g., "Cute Ghost PNG for Spooky Season Crafts | DIY Halloween Decor").
      - **Pin Description:** A 2-3 sentence description that encourages clicks. Use relevant keywords and a call-to-action (e.g., "Get ready for spooky season! ✨ Download our adorable ghost PNG to create your own Halloween t-shirts, mugs, and party decor. Perfect for Cricut and sublimation crafts. Click through to grab yours now! #HalloweenDIY #GhostPNG #EtsySeller").
      - **Visual Idea:** A brief description of the visual for the Pin (e.g., "A beautiful mockup photo showing the ghost PNG on a kids' t-shirt.", "A video Pin showing a quick time-lapse of a craft project using the PNG.", "A graphic Pin with a text overlay '3 Ways to Use This Spooky PNG' over a product mockup.").
  
      Format the output in clean, readable Markdown. Use a clear heading for each Pin idea.
    `;
    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error("Error generating Pinterest pins:", error);
      return "An error occurred while generating Pinterest ideas. Please check the console for details.";
    }
};

export const getEtsyMarketResearch = async (niche: string): Promise<GroundedContent> => {
    const prompt = `
        You are an Etsy market research analyst. Your goal is to provide a detailed trend report for a specific product niche using Google Search.

        **Product Niche:** "${niche}"

        **Task:**
        Conduct research and provide a report covering the following points:
        1.  **Current Trends:** What are the top 3-4 current trends within this niche on Etsy? (e.g., specific styles, colors, themes like 'retro groovy', 'dark academia', 'minimalist').
        2.  **New Product Ideas:** Suggest 3-5 specific, untapped, or emerging product ideas based on the trends. Be creative.
        3.  **Pricing Analysis:** What is the typical price range for these types of digital products on Etsy? Discuss the potential income based on what you see.
        4.  **Winning Keywords:** List 10-15 high-potential keywords that sellers are using successfully in their titles and tags.

        Format the output in clean, readable Markdown. Use headings, bold text, and bullet points.
      `;
    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
  
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  
      return {
        text: response.text,
        sources: sources,
      };
    } catch (error) {
      console.error("Error getting Etsy market research:", error);
      return {
        text:
          "An error occurred while researching the Etsy market. Please check the console for details.",
        sources: [],
      };
    }
};

export const generateViralVideoIdeas = async (productInfo: string): Promise<string> => {
    const prompt = `
      You are a social media expert specializing in viral short-form video content for platforms like TikTok and Instagram Reels.
      Your task is to generate 3 catchy video ideas to promote a digital product.
  
      **Product Information:**
      "${productInfo}"
  
      **Instructions:**
      For each of the 3 video ideas, provide the following:
      - **Hook:** A "thumb-stopping" first line or visual concept for the first 3 seconds of the video.
      - **Video Concept:** A brief, step-by-step description of what happens in the video. Keep it simple and engaging.
      - **Trending Audio Suggestion:** Suggest a type of audio that would fit the video (e.g., "A popular voiceover sound about a small business owner's day," "An upbeat, trending pop song," "A calming ASMR sound of digital drawing.").
  
      Format the output in clean, readable Markdown. Use a clear heading for each video idea.
    `;
    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error("Error generating video ideas:", error);
      return "An error occurred while generating video ideas. Please check the console for details.";
    }
};

export const generateNewProductIdeas = async (theme: string): Promise<string> => {
    const prompt = `
      You are a product development specialist for the digital creator economy.
      Your task is to brainstorm a list of 10 new digital product ideas based on a given theme or niche. The ideas should be creative and commercially viable for a platform like Etsy.
  
      **Theme/Niche:** "${theme}"
  
      **Instructions:**
      Generate a list of 10 distinct digital product ideas. For each idea, provide a brief (1-2 sentence) description of what it is and who it's for.
  
      Example Format:
      1.  **[Product Name Idea]:** [Brief Description].
  
      Format the output as a numbered list in clean, readable Markdown.
    `;
    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error("Error generating product ideas:", error);
      return "An error occurred while generating product ideas. Please check the console for details.";
    }
};

export const generateReviewResponse = async (review: string): Promise<string> => {
    const prompt = `
      You are a customer service expert with a friendly, professional, and empathetic tone, representing a small creative business on Etsy.
      Your task is to write a response to a customer review.
  
      **Customer Review:**
      "${review}"
  
      **Instructions:**
      1.  Analyze the sentiment of the review (positive, negative, or mixed).
      2.  If the review is positive, write a warm and grateful response. Mention something specific from their review if possible.
      3.  If the review is negative, write an empathetic and apologetic response. Acknowledge their issue and offer a clear next step (e.g., "I'm sending you a message right now to help resolve this," "Please check your messages for a link to the updated files."). Do NOT be defensive.
      4.  Keep the response concise and professional, yet personal. Sign off with a friendly closing (e.g., "Best," "All the best," "Warmly,").
  
      Format the output as a single block of text, ready to be copied and pasted.
    `;
    try {
      const response = await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error("Error generating review response:", error);
      return "An error occurred while generating a response. Please check the console for details.";
    }
};

export const analyzeEtsyListings = async (idea: string): Promise<GroundedContent> => {
  const prompt = `
    You are an expert Etsy market analyst. Your task is to perform a competitive analysis for a new product idea by simulating what top listings in that niche look like, grounding your simulation in real-time Google Search data.

    **Product Idea:** "${idea}"

    **Part 1: Simulate Top Listings using Search Insights**
    First, use Google Search to find current trends, popular styles, and pricing for the product idea. Then, generate a realistic but **simulated** summary of the top 5 listings you would find on Etsy based on your research. For each simulated listing, include:
    - **Title:** A plausible, keyword-rich title.
    - **Price:** A realistic price in USD.
    - **Tags:** 5-7 common tags they might use.
    - **Popularity:** An indicator like "Bestseller," "Popular now," or "High number of reviews."

    **Part 2: Strategic Analysis**
    Now, based **only** on the search-informed simulated data you generated in Part 1, provide a strategic analysis for a new seller. The analysis must cover:
    - **Competitive Summary:** A brief overview of what seems to be working for top sellers in this niche.
    - **Pricing Insights:** What is the common price range and what could be a competitive price point?
    - **Top Keywords & Tags:** A list of the most effective keywords and tags seen across the simulated listings.
    - **Market Opportunity:** Based on the simulated data, identify a potential gap or unique angle. For example, "Most listings focus on a 'cute' style, leaving an opportunity for a 'vintage' or 'gothic' design," or "Listings are single items, so a 'bundle pack' could stand out."

    Format the entire output in clean, readable Markdown. Use clear headings for each part and for each section of the analysis.
  `;
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  
    return {
      text: response.text,
      sources: sources,
    };

  } catch (error) {
    console.error("Error analyzing Etsy listings:", error);
    return {
        text: "An error occurred while analyzing listings. Please check the console for details.",
        sources: [],
    };
  }
};
