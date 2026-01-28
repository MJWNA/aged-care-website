import { useState, useEffect } from 'react';

export default function ExitIntent() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let hasShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown && !submitted) {
        setShowPopup(true);
        hasShown = true;
      }
    };

    // Add event listener after a short delay to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, send to email service
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          // Success state
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f4b400' }}>
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#0f4c75' }}>
              Check Your Email!
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent your free aged care checklist to <strong>{email}</strong>
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-3 rounded-lg font-bold transition-all hover:brightness-95"
              style={{ background: '#f4b400', color: '#0f1f2e' }}
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          // Main popup content
          <>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 text-center">
              <div className="text-5xl mb-3">⏸️</div>
              <h3 className="text-2xl font-bold mb-2">
                Wait! Before You Go...
              </h3>
              <p className="text-lg opacity-90">
                Get our FREE provider comparison checklist
              </p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h4 className="font-bold mb-3" style={{ color: '#0f4c75' }}>
                  This Free Checklist Includes:
                </h4>
                <ul className="space-y-2">
                  {[
                    '15 essential questions to ask providers',
                    'Red flags to watch out for',
                    'How to compare quotes properly',
                    'Cultural & language considerations',
                    'Your rights as a care recipient'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#d4910d' }}>✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#f4b400] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold transition-all hover:brightness-95"
                  style={{ background: '#f4b400', color: '#0f1f2e' }}
                >
                  📥 Send Me The Free Checklist
                </button>

                <p className="text-xs text-center text-gray-500">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Limited time:</strong> Book a free consultation this week and get a 
                  personalized provider shortlist same day
                </p>
                <a 
                  href="tel:1800303101"
                  className="text-sm font-semibold inline-flex items-center gap-2 hover:underline"
                  style={{ color: '#0f4c75' }}
                >
                  📞 Call 1800 303 101
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

