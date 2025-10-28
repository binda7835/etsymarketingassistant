import React from 'react';

const Blog: React.FC = () => {
    const posts = [
        {
            title: "5 Common Mistakes New Etsy Sellers Make (And How to Avoid Them)",
            date: "October 26, 2023",
            excerpt: "Starting an Etsy shop is exciting, but it's easy to fall into common traps. From poor photography to neglecting SEO, we're breaking down the five biggest mistakes we see new sellers make and giving you actionable tips to start strong.",
        },
        {
            title: "The Ultimate Guide to Keywords for Your Digital Products",
            date: "October 22, 2023",
            excerpt: "Keywords are the lifeblood of your Etsy shop's visibility. But how do you find the right ones? This guide will walk you through the process of researching and implementing keywords that attract your ideal customers.",
        },
        {
            title: "Why You Need an Email List for Your Etsy Shop (Even if You're New)",
            date: "October 18, 2023",
            excerpt: "Social media is great, but an email list is an asset you truly own. Learn why building an email list from day one is a game-changer for creating a sustainable and profitable creative business on Etsy.",
        },
         {
            title: "A/B Testing Your Etsy Listings: A Simple Guide to Increasing Sales",
            date: "October 15, 2023",
            excerpt: "What if a small change to your title could double your clicks? That's the power of A/B testing. We'll show you a simple, non-technical way to test your product titles and descriptions to find out what truly converts.",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white">The Etsy Seller's Blog</h1>
                <p className="mt-3 text-lg text-gray-400">Tips, tricks, and strategies to help you grow your shop.</p>
            </div>

            <div className="space-y-12">
                {posts.map((post, index) => (
                    <div key={index} className="p-8 bg-gray-800/50 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                        <h2 className="text-2xl font-bold text-orange-400 mb-3">{post.title}</h2>
                        <p className="text-gray-300 mb-4">{post.excerpt}</p>
                        <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-orange-500 hover:text-orange-400">
                            Read More <i className="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
