import { useState, useEffect } from 'react';

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-in slide-in-from-bottom duration-300">
      <div className="shadow-2xl border-t-2" style={{ background: '#ffffff', borderColor: '#f4b400' }}>
        <div className="px-4 py-4">
          <div className="flex gap-3">
            <a
              href="tel:1800303101"
              className="flex-1 py-4 px-5 rounded-lg font-bold text-center text-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ background: '#f4b400', color: '#0f1f2e' }}
            >
              📞 Tap to Call
            </a>
            <a
              href="#contact"
              className="flex-1 py-4 px-5 rounded-lg font-bold text-center text-lg border-2 transition-all active:scale-95"
              style={{ borderColor: '#4a7c9e', color: '#4a7c9e', background: 'white' }}
            >
              Get Callback
            </a>
          </div>
          <div className="text-center mt-3">
            <p className="text-sm font-semibold" style={{ color: '#0f1f2e' }}>
              ✓ 100% Free Aged Care Check
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


