
import React, { useState } from 'react';

interface GeneratedContentProps {
  content: string;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple markdown to HTML conversion
  const formatContent = (text: string) => {
    let html = text;
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
    // Bullets
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/(\<li.*\>.*<\/li\>)/gim, '<ul>$1</ul>');
    html = html.replace(/<\/ul\>\n<ul\>/gim, '');
    // Newlines
    html = html.replace(/\n/g, '<br />');

    return { __html: html };
  };

  return (
    <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg relative">
      <div className="p-6 prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={formatContent(content)} />
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 bg-gray-700 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
      >
        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-2`}></i>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default GeneratedContent;
