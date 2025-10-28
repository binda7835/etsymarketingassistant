import React, { useEffect } from 'react';

const AdSlot: React.FC<{ className?: string }> = ({ className }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      if (window && (window as any).adsbygoogle) {
        // @ts-ignore
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className={`w-full my-6 ${className || ''}`}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-2199340340313348"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSlot;
