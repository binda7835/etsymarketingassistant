import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-12">
            <div className="container mx-auto px-4 py-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Etsy Marketing Assistant. Powered by AI.</p>
                 <p className="text-xs mt-2">Disclaimer: This tool is for generating marketing ideas. Always comply with email marketing laws like CAN-SPAM and GDPR. Only send emails to users who have opted-in to receive them.</p>
            </div>
        </footer>
    );
};

export default Footer;