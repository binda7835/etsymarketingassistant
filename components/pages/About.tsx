import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-white text-center mb-4">About Me</h1>
            <p className="text-orange-400 text-center mb-12">The Story Behind the Etsy Marketing Assistant</p>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <p>
                    Hello there! My name is Binda, and I'm the creator of the Etsy Marketing Assistant. Like many of you, I started my journey as a digital creator on Etsy, filled with passion for design but struggling to navigate the complex world of online marketing.
                </p>
                <p>
                    I spent countless hours trying to figure out what products to create, what keywords to use, and how to reach my ideal customers. I knew there had to be a smarter way to work, one that would let me focus more on creating and less on the guesswork.
                </p>
                <p>
                    That's why I built this toolkit. My goal was to create a simple, powerful, and affordable assistant that could handle the heavy lifting of market research and content creation. I wanted to build the tools that I wish I had when I was starting out.
                </p>
                <p>
                    This website is for the side-hustlers, the full-time creators, and everyone in between. It's built on the idea that with the right tools, anyone can turn their creative passion into a thriving business. 
                </p>
                <p>
                    Thank you for being here. I'm so excited to be a small part of your creative journey!
                </p>
                <p>
                    All the best,<br />
                    Binda
                </p>
            </div>
        </div>
    );
};

export default About;