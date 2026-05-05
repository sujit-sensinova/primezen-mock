import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pz_cookie_consent');
    if (!consent) {
      // Small delay so it animates in after loader
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const acceptCookies = () => {
    localStorage.setItem('pz_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <div className="glass-card rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-500">
        <h4 className="text-white font-bold mb-2 text-lg">Your Privacy Matters</h4>
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
          We use cookies to improve your browsing experience, analyze site traffic, and deliver personalized content in compliance with the DPDP Act.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="flex-1 bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Accept
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-1 bg-white/10 text-white font-bold py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
