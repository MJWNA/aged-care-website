import { useState } from 'react';

export default function DownloadGuide() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your email service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 100%)' }}>
        <div className="container max-w-[800px] mx-auto px-4 text-center text-white">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f4b400' }}>
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Check Your Email!</h3>
            <p className="text-lg mb-4">
              We've sent your FREE 2026 Aged Care Guide to <strong>{email}</strong>
            </p>
            <p className="text-sm opacity-90">
              Don't see it? Check your spam folder or contact us at 1800 303 101
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 100%)' }}>
      <div className="container max-w-[1180px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Benefits */}
          <div className="text-white">
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ background: '#f4b400', color: '#0f1f2e' }}>
              <span className="font-bold">FREE DOWNLOAD</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Complete 2026 Aged Care Guide
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Everything you need to know about the new Support at Home program, explained in plain English.
            </p>

            <ul className="space-y-3 mb-6">
              {[
                'Understanding the 8 new care levels',
                'How to get assessed and what to expect',
                'Calculating your likely costs',
                'Questions to ask potential providers',
                'Your rights and how to switch providers',
                '2026 fee changes explained',
                'Cultural and language considerations',
                'Checklist for choosing your provider'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0" style={{ color: '#f4b400' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <span className="text-3xl">📧</span>
              <div className="text-sm">
                <div className="font-bold">Instant Email Delivery</div>
                <div className="opacity-75">Plus ongoing aged care updates</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">📖</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0f4c75' }}>
                Download Your Free Guide
              </h3>
              <p className="text-gray-600">
                Join 1,000+ families who've downloaded this guide
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0f4c75' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#f4b400] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0f4c75' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#f4b400] transition-colors"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span>🔒</span>
                  <div>
                    <strong>Your privacy matters.</strong> We'll never share your email. 
                    Unsubscribe anytime. By downloading, you agree to receive helpful 
                    aged care tips and updates.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:brightness-95"
                style={{ background: '#f4b400', color: '#0f1f2e' }}
              >
                📥 Download FREE Guide Now
              </button>

              <p className="text-center text-xs text-gray-500">
                Instant download • No credit card required • 100% free
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
