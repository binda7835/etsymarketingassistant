import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = "Message from Etsy Marketing Assistant User";
        const body = `Name: ${name}\nFrom: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:binda7835@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white">Get In Touch</h1>
                <p className="mt-3 text-lg text-gray-400">Have a question, feedback, or a collaboration idea? I'd love to hear from you!</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                placeholder="Your Name" 
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" 
                                placeholder="you@example.com" 
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                        <textarea 
                            id="message" 
                            rows={6} 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" 
                            placeholder="How can I help you today?"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-6 text-right">
                        <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;