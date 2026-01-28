import { useState } from 'react';

export default function AgedCareComplete() {
  const [activeAccordions, setActiveAccordions] = useState<Record<string, number | null>>({
    'acc-first': null,
    'acc-switch': null,
    'acc-faq': null,
  });
  const [showModal, setShowModal] = useState(false);
  const [userPath, setUserPath] = useState<'new' | 'existing' | null>(null);

  const toggleAccordion = (accordionId: string, itemIndex: number) => {
    setActiveAccordions(prev => ({
      ...prev,
      [accordionId]: prev[accordionId] === itemIndex ? null : itemIndex
    }));
  };

  return (
    <div className="aged-care-complete">
      <style>{`
        .aged-care-complete {
          --nav-bg: #ffffff;
          --nav-text: #1f3248;
          --hero-overlay: rgba(15, 42, 69, 0.62);
          --text-light: #ffffff;
          --text-dark: #1f3248;
          --accent-gold: #f4b400;
          --accent-gold-border: #d19b00;
          --accent-green: #1fa16c;
          --accent-blue: #0c6291;
          --muted: #6aa7a1;
          --bg-soft: #f7f9fb;
          --card-border: #e6e9ee;
          font-family: "Inter", system-ui, -apple-system, sans-serif;
          background: var(--bg-soft);
          color: var(--text-dark);
          line-height: 1.6;
        }

        .aged-care-complete * {
          box-sizing: border-box;
        }

        .aged-care-complete a {
          color: inherit;
          text-decoration: none;
        }

        /* Path selector */
        .acc-path-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .acc-path-card {
          background: #fff;
          border: 3px solid #e6e9ee;
          border-radius: 12px;
          padding: 28px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .acc-path-card:hover {
          border-color: var(--accent-gold);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(244, 180, 0, 0.15);
        }

        .acc-path-card.selected {
          border-color: var(--accent-gold);
          background: #fffbf0;
          box-shadow: 0 8px 24px rgba(244, 180, 0, 0.2);
        }

        .acc-path-card h3 {
          font-size: 24px;
          margin-bottom: 12px;
          color: var(--text-dark);
        }

        .acc-path-card p {
          font-size: 15px;
          color: #465266;
          margin-bottom: 16px;
        }

        .acc-path-card .icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .acc-path-card ul {
          text-align: left;
          list-style: none;
          padding: 0;
          margin-top: 16px;
        }

        .acc-path-card li {
          font-size: 14px;
          color: #465266;
          margin-bottom: 8px;
          padding-left: 24px;
          position: relative;
        }

        .acc-path-card li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--accent-gold);
          font-weight: 700;
        }

        /* Comparison table */
        .acc-comparison {
          background: #fff;
          border: 1px solid #e6e9ee;
          border-radius: 12px;
          overflow: hidden;
          margin-top: 24px;
        }

        .acc-comparison-header {
          background: linear-gradient(135deg, #0f2a45 0%, #1f3248 100%);
          color: #fff;
          padding: 20px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
        }

        .acc-comparison-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #e6e9ee;
        }

        .acc-comparison-row:last-child {
          border-bottom: none;
        }

        .acc-comparison-cell {
          padding: 16px 20px;
          font-size: 14px;
        }

        .acc-comparison-cell:first-child {
          background: #f9fbfd;
          font-weight: 600;
          border-right: 1px solid #e6e9ee;
        }

        .acc-comparison-cell.highlight {
          background: #fffbf0;
          color: var(--text-dark);
        }

        /* Urgency banner */
        .acc-urgency {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          color: #fff;
          padding: 16px 20px;
          text-align: center;
          font-weight: 600;
          font-size: 15px;
          border-radius: 8px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }

        .acc-urgency strong {
          font-size: 17px;
        }

        /* Timeline */
        .acc-timeline {
          position: relative;
          padding: 20px 0;
        }

        .acc-timeline-item {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 20px;
          margin-bottom: 32px;
          position: relative;
        }

        .acc-timeline-item:before {
          content: "";
          position: absolute;
          left: 29px;
          top: 60px;
          bottom: -32px;
          width: 2px;
          background: #e6e9ee;
        }

        .acc-timeline-item:last-child:before {
          display: none;
        }

        .acc-timeline-number {
          width: 60px;
          height: 60px;
          background: var(--accent-gold);
          color: #0f1f2d;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(244, 180, 0, 0.3);
          z-index: 1;
          position: relative;
        }

        .acc-timeline-content h4 {
          font-size: 18px;
          margin-bottom: 8px;
          color: #1f3248;
        }

        .acc-timeline-content p {
          font-size: 14px;
          color: #4a5668;
        }

        /* Stats row */
        .acc-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 32px 0;
        }

        .acc-stat {
          text-align: center;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e6e9ee;
        }

        .acc-stat-number {
          font-size: 36px;
          font-weight: 700;
          color: var(--accent-gold);
          margin-bottom: 8px;
        }

        .acc-stat-label {
          font-size: 14px;
          color: #465266;
        }

        /* Header */
        .acc-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 64px;
          background: var(--nav-bg);
          border-bottom: 1px solid #e5e8ec;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          font-size: 14px;
        }

        .acc-brand {
          font-weight: 700;
          font-size: 16px;
          color: var(--nav-text);
        }

        .acc-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .acc-nav a {
          font-weight: 600;
          color: var(--nav-text);
        }

        .acc-nav-cta {
          background: var(--accent-gold);
          color: #0f1f2d;
          padding: 10px 14px;
          border-radius: 4px;
          border: 1px solid var(--accent-gold-border);
          font-weight: 700;
          font-size: 13px;
        }

        /* Hero */
        .acc-hero {
          margin-top: 64px;
          position: relative;
          min-height: 560px;
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(var(--hero-overlay), var(--hero-overlay)),
            url("https://placehold.co/1600x900/0f3248/ffffff?text=Hero+Image") center/cover no-repeat;
        }

        .acc-hero-inner {
          max-width: 1200px;
          width: 100%;
          padding: 64px 28px 72px;
        }

        .acc-hero h1 {
          font-size: 44px;
          line-height: 1.2;
          margin-bottom: 16px;
          color: #ffd34f;
          font-weight: 700;
        }

        .acc-hero-lead {
          max-width: 780px;
          font-size: 17px;
          margin-bottom: 18px;
        }

        .acc-bullets {
          margin: 14px 0 20px;
        }

        .acc-bullet {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 10px;
          font-size: 16px;
        }

        .acc-bullet .acc-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent-gold);
          color: #0f1f2d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }

        .acc-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin: 18px 0 26px;
        }

        .acc-btn-primary {
          background: var(--accent-gold);
          color: #0f1f2d;
          border: 1px solid var(--accent-gold-border);
          padding: 12px 18px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: inline-block;
        }

        .acc-btn-ghost {
          background: transparent;
          color: var(--text-light);
          border: 1px solid var(--text-light);
          padding: 12px 18px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: inline-block;
        }

        .acc-pill-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
          margin-top: 8px;
          max-width: 1000px;
        }

        .acc-pill {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 6px;
          padding: 18px;
          text-align: center;
          color: var(--text-light);
        }

        .acc-pill h3 {
          font-size: 18px;
          margin-bottom: 4px;
        }

        .acc-pill p {
          font-size: 12px;
          opacity: 0.9;
        }

        /* Strip */
        .acc-strip {
          background: #f7fdf7;
          border-top: 3px solid var(--accent-gold);
          border-bottom: 3px solid var(--accent-gold);
          padding: 10px 12px;
          color: var(--accent-green);
          font-weight: 600;
          font-size: 14px;
          text-align: center;
        }

        /* Sections */
        .acc-section {
          padding: 72px 20px;
        }

        .acc-section-inner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .acc-section h2 {
          font-size: 32px;
          margin-bottom: 18px;
          color: var(--text-dark);
        }

        .acc-lede {
          max-width: 900px;
          margin-bottom: 20px;
          color: #2b3a4f;
        }

        /* Two-column text blocks */
        .acc-two-col {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          align-items: start;
        }

        /* Cards */
        .acc-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .acc-card {
          background: #ffffff;
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 18px 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
        }

        .acc-card h3 {
          font-size: 18px;
          margin-bottom: 6px;
          color: var(--text-dark);
        }

        .acc-card p {
          font-size: 14px;
          color: #465266;
        }

        /* Levels */
        .acc-levels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }

        .acc-level {
          background: #f9fbfd;
          border: 1px solid #dfe6ef;
          border-radius: 8px;
          padding: 14px 12px;
        }

        .acc-level h4 {
          font-size: 15px;
          margin-bottom: 4px;
          color: #0c6291;
        }

        .acc-level p {
          font-size: 13px;
          color: #425064;
        }

        /* Accordions */
        .acc-accordion {
          border: 1px solid #dfe6ef;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }

        .acc-item {
          border-top: 1px solid #e8edf3;
        }

        .acc-item:first-child {
          border-top: none;
        }

        .acc-btn {
          width: 100%;
          text-align: left;
          padding: 14px 16px;
          background: #fff;
          border: none;
          outline: none;
          font-weight: 700;
          color: #1f3248;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .acc-btn span {
          font-weight: 400;
          color: #4b596d;
        }

        .acc-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.28s ease;
          padding: 0 16px;
          background: #f9fbfd;
          color: #4b596d;
          font-size: 14px;
        }

        .acc-content p {
          padding: 12px 0 14px;
        }

        .acc-item.active .acc-content {
          max-height: 320px;
        }

        /* Steps with images */
        .acc-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }

        .acc-step {
          background: #fff;
          border: 1px solid var(--card-border);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
        }

        .acc-step img {
          width: 100%;
          height: 170px;
          object-fit: cover;
          display: block;
        }

        .acc-step-body {
          padding: 14px;
        }

        .acc-step-body h4 {
          font-size: 16px;
          margin-bottom: 6px;
          color: #1f3248;
        }

        .acc-step-body p {
          font-size: 14px;
          color: #4a5668;
        }

        /* Testimonials */
        .acc-testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .acc-testimonial {
          background: #fff;
          border: 1px solid #e6e9ee;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
          color: #37455a;
        }

        .acc-testimonial strong {
          color: #1f3248;
        }

        /* Form */
        .acc-form-card {
          background: #fff;
          border: 1px solid #dfe6ef;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05);
          max-width: 760px;
          margin: 0 auto;
        }

        .acc-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
        }

        .acc-form-card label {
          font-weight: 600;
          font-size: 13px;
          color: #1f3248;
          display: block;
          margin-bottom: 4px;
        }

        .acc-form-card input,
        .acc-form-card select,
        .acc-form-card textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #cfd8e3;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          background: #fff;
        }

        .acc-form-card textarea {
          min-height: 100px;
          resize: vertical;
        }

        .acc-btn-submit {
          background: var(--accent-gold);
          color: #0f1f2d;
          border: 1px solid var(--accent-gold-border);
          padding: 12px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          margin-top: 8px;
        }

        .acc-secure {
          font-size: 12px;
          color: #4b596d;
          margin-top: 8px;
        }

        /* Footer */
        .acc-footer {
          background: #0f1f2d;
          color: #d9e2f0;
          padding: 32px 20px;
          margin-top: 48px;
        }

        .acc-footer-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .acc-footer-inner h4 {
          margin-bottom: 8px;
          color: #fff;
        }

        .acc-footer-inner p,
        .acc-footer-inner a {
          font-size: 14px;
          color: #d9e2f0;
        }

        /* Modal */
        .acc-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .acc-modal {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          max-width: 520px;
          width: 92%;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18);
          position: relative;
        }

        .acc-close-modal {
          position: absolute;
          top: 8px;
          right: 8px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #1f3248;
        }

        .acc-help-section {
          padding: 36px 20px;
          background: #f7fdf7;
          border-top: 3px solid var(--accent-gold);
          border-bottom: 3px solid var(--accent-gold);
          text-align: center;
        }
      `}</style>

      <header className="acc-header">
        <div className="acc-brand">Aged Care Information</div>
        <nav className="acc-nav">
          <a href="#how">How it works</a>
          <a href="#why">Why families trust us</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="acc-nav-cta" href="tel:1800303101">📞 1800 303 101</a>
      </header>

      <section className="acc-hero">
        <div className="acc-hero-inner">
          <h1>Starting Care or Ready to Switch? <span style={{ color: '#ffd34f' }}>Find Your Perfect Match</span></h1>
          <p className="acc-hero-lead">
            The Australian aged care system changed on 1 November 2025. Whether you're new to the Support at Home program or unhappy with your current provider, we help Australian families find quality care — completely free and independent.
          </p>
          <div className="acc-bullets">
            <div className="acc-bullet">
              <div className="acc-dot">✓</div>
              <div><strong>New to aged care?</strong> We guide you through the entire process — 100% free</div>
            </div>
            <div className="acc-bullet">
              <div className="acc-dot">✓</div>
              <div><strong>Already receiving care?</strong> Compare and switch providers easily — 100% free</div>
            </div>
            <div className="acc-bullet">
              <div className="acc-dot">✓</div>
              <div><strong>Independent advice</strong> — we don't work for any provider</div>
            </div>
          </div>
          <div className="acc-cta-row">
            <a className="acc-btn-primary" href="tel:1800303101">📞 Call Now: 1800 303 101</a>
            <a className="acc-btn-ghost" href="#guide">Get FREE 2026 Guide →</a>
          </div>
          <div className="acc-pill-row">
            <div className="acc-pill"><h3>1,000+</h3><p>Families helped across all of Australia</p></div>
            <div className="acc-pill"><h3>Same Day</h3><p>Same day response</p></div>
            <div className="acc-pill"><h3>100% FREE</h3><p>No hidden costs ever</p></div>
          </div>
        </div>
      </section>

      <div className="acc-strip">✓ 100% FREE for families | ✓ No hidden costs | ✓ No obligations | ✓ Independent advice</div>

      <section className="acc-section" style={{ paddingTop: '56px', paddingBottom: '56px', background: 'linear-gradient(180deg, #fff 0%, #f7f9fb 100%)' }}>
        <div className="acc-section-inner">
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Which Best Describes Your Situation?</h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 32px', color: '#2b3a4f' }}>
            Choose your path below to see information tailored to your needs
          </p>
          <div className="acc-path-selector">
            <div 
              className={`acc-path-card ${userPath === 'new' ? 'selected' : ''}`}
              onClick={() => setUserPath('new')}
            >
              <div className="icon">🆕</div>
              <h3>New to Aged Care</h3>
              <p>You're exploring aged care options for the first time</p>
              <ul>
                <li>Haven't had an assessment yet</li>
                <li>Don't know where to start</li>
                <li>Need guidance on eligibility</li>
                <li>Want to understand the process</li>
              </ul>
              <button className="acc-btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                I'm New to Aged Care
              </button>
            </div>
            <div 
              className={`acc-path-card ${userPath === 'existing' ? 'selected' : ''}`}
              onClick={() => setUserPath('existing')}
            >
              <div className="icon">🔄</div>
              <h3>Already Receiving Care</h3>
              <p>You have a provider but want to explore switching</p>
              <ul>
                <li>Unhappy with current provider</li>
                <li>Poor communication or service</li>
                <li>Want to compare other options</li>
                <li>Ready to make a change</li>
              </ul>
              <button className="acc-btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                I Want to Switch Providers
              </button>
            </div>
          </div>
        </div>
      </section>

      {userPath && (
        <section className="acc-section" style={{ paddingTop: '0' }}>
          <div className="acc-section-inner">
            <div className="acc-urgency">
              <strong>⏰ Limited Availability:</strong> We're currently assisting 47 families this week. Secure your free consultation before spots fill up.
            </div>
          </div>
        </section>
      )}

      {userPath === 'new' && (
        <section className="acc-section" style={{ background: '#fff', paddingTop: '56px' }}>
          <div className="acc-section-inner">
            <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Your Journey to Quality Care: What to Expect</h2>
            
            <div className="acc-timeline">
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">1</div>
                <div className="acc-timeline-content">
                  <h4>Call Us for a Free Consultation (Today)</h4>
                  <p>We'll discuss your situation, needs, and answer all your questions. No pressure, just honest guidance from experienced advisors.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">2</div>
                <div className="acc-timeline-content">
                  <h4>Get Your Aged Care Assessment (1-4 weeks)</h4>
                  <p>We'll help you prepare for your assessment and explain what to expect. We can even help you book it if needed.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">3</div>
                <div className="acc-timeline-content">
                  <h4>Receive Your Care Level & Budget (1-2 weeks)</h4>
                  <p>Once assessed, you'll receive your support level (1-8) and budget. We'll explain what it means and what services you can access.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">4</div>
                <div className="acc-timeline-content">
                  <h4>Get Your Curated Provider Shortlist (same day)</h4>
                  <p>We match you with 2-3 quality providers based on your needs, location, budget, language preferences, and care requirements.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">5</div>
                <div className="acc-timeline-content">
                  <h4>Choose Your Provider & Start Care (1-2 weeks)</h4>
                  <p>Review your options, ask questions, and select the best fit. We'll help coordinate the start of your services.</p>
                </div>
              </div>
            </div>

            <div className="acc-comparison">
              <div className="acc-comparison-header">
                Doing It Yourself vs. Using Our Free Service
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Time Investment</div>
                <div className="acc-comparison-cell highlight"><strong>2-3 hours</strong> (one call + review shortlist) vs. 15-20+ hours researching alone</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Providers to Research</div>
                <div className="acc-comparison-cell highlight"><strong>2-3 curated matches</strong> vs. 50+ providers to contact and compare yourself</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Expert Guidance</div>
                <div className="acc-comparison-cell highlight"><strong>Aged care specialists</strong> who know the system vs. figuring it out alone</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Cultural Matching</div>
                <div className="acc-comparison-cell highlight"><strong>Language & cultural preferences</strong> considered vs. limited filtering options</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Cost to You</div>
                <div className="acc-comparison-cell highlight"><strong>$0 — Completely FREE</strong></div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a className="acc-btn-primary" href="tel:1800303101" style={{ fontSize: '17px', padding: '16px 32px' }}>
                📞 Start Your Free Consultation Now
              </a>
              <p style={{ marginTop: '12px', fontSize: '14px', color: '#4b596d' }}>
                Available Mon-Fri 8am-6pm, Sat 9am-1pm AEST | Average call time: 15-20 minutes
              </p>
            </div>
          </div>
        </section>
      )}

      {userPath === 'existing' && (
        <section className="acc-section" style={{ background: '#fff', paddingTop: '56px' }}>
          <div className="acc-section-inner">
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Why Families Switch Providers (And Why It's Easier Than You Think)</h2>
            
            <div className="acc-stats">
              <div className="acc-stat">
                <div className="acc-stat-number">67%</div>
                <div className="acc-stat-label">of families report better service after switching</div>
              </div>
              <div className="acc-stat">
                <div className="acc-stat-number">5-7</div>
                <div className="acc-stat-label">days average switching time</div>
              </div>
              <div className="acc-stat">
                <div className="acc-stat-number">100%</div>
                <div className="acc-stat-label">of unspent funds transfer with you</div>
              </div>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '48px', marginBottom: '24px', textAlign: 'center' }}>Common Reasons Families Switch:</h3>
            
            <div className="acc-cards-grid" style={{ marginBottom: '40px' }}>
              <div className="acc-card">
                <h3>❌ Poor Communication</h3>
                <p>Hard to reach your care coordinator. Calls not returned. Changes made without consultation.</p>
              </div>
              <div className="acc-card">
                <h3>❌ Unreliable Service</h3>
                <p>Carers arriving late or not at all. Different staff every visit. No consistency in care quality.</p>
              </div>
              <div className="acc-card">
                <h3>❌ Hidden Fees</h3>
                <p>Unexpected charges. Confusing invoices. Services cost more than originally quoted.</p>
              </div>
              <div className="acc-card">
                <h3>❌ Limited Flexibility</h3>
                <p>Can't change appointment times. No weekend availability. Rigid service plans that don't adapt.</p>
              </div>
              <div className="acc-card">
                <h3>❌ Language Barriers</h3>
                <p>Current provider can't offer care in your preferred language or doesn't understand cultural needs.</p>
              </div>
              <div className="acc-card">
                <h3>❌ Better Options Available</h3>
                <p>New providers in your area. Better services for the same budget. More specialized care available.</p>
              </div>
            </div>

            <div className="acc-comparison">
              <div className="acc-comparison-header">
                The Old System (Pre-Nov 2025) vs. The New System
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Switching Process</div>
                <div className="acc-comparison-cell highlight">Now <strong>streamlined & faster</strong> — less paperwork, clearer process</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Your Unspent Funds</div>
                <div className="acc-comparison-cell highlight"><strong>Automatically transfer</strong> to your new provider (you don't lose a cent!)</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Notice Period</div>
                <div className="acc-comparison-cell highlight"><strong>Minimal disruption</strong> — we coordinate the handover smoothly</div>
              </div>
              <div className="acc-comparison-row">
                <div className="acc-comparison-cell">Re-assessment Required?</div>
                <div className="acc-comparison-cell highlight"><strong>No!</strong> Your existing care level and budget stay the same</div>
              </div>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '48px', marginBottom: '24px', textAlign: 'center' }}>How We Make Switching Simple:</h3>

            <div className="acc-timeline">
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">1</div>
                <div className="acc-timeline-content">
                  <h4>Tell Us What's Wrong (10-15 min call)</h4>
                  <p>We listen to your concerns with your current provider and understand what you need instead.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">2</div>
                <div className="acc-timeline-content">
                  <h4>Get Better Options (same day)</h4>
                  <p>We identify 2-3 providers who address your pain points and offer what your current provider doesn't.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">3</div>
                <div className="acc-timeline-content">
                  <h4>Compare & Choose (At your pace)</h4>
                  <p>Review your options with no pressure. We explain the differences and help you decide.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">4</div>
                <div className="acc-timeline-content">
                  <h4>We Handle the Transfer (5-7 days)</h4>
                  <p>We coordinate with both providers. Your funds transfer automatically. Minimal disruption to your care.</p>
                </div>
              </div>
              <div className="acc-timeline-item">
                <div className="acc-timeline-number">5</div>
                <div className="acc-timeline-content">
                  <h4>Start with Your New Provider (Week 2)</h4>
                  <p>Begin receiving better service. We check in to make sure everything is going smoothly.</p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', padding: '32px', background: '#fffbf0', borderRadius: '12px', border: '2px solid var(--accent-gold)' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Ready to Make the Switch?</h3>
              <p style={{ marginBottom: '20px', color: '#2b3a4f' }}>Join the hundreds of families who switched to better care this month</p>
              <a className="acc-btn-primary" href="tel:1800303101" style={{ fontSize: '17px', padding: '16px 32px' }}>
                📞 Call Now: 1800 303 101
              </a>
              <p style={{ marginTop: '12px', fontSize: '13px', color: '#4b596d' }}>
                Free consultation • No obligation • We handle everything
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="acc-section" style={{ paddingTop: '48px', paddingBottom: '48px', background: '#fff' }}>
        <div className="acc-section-inner">
          <div className="acc-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div className="acc-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
              <h3 style={{ fontSize: '16px' }}>Fast Response</h3>
              <p style={{ fontSize: '13px' }}>same day turnaround</p>
            </div>
            <div className="acc-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛡️</div>
              <h3 style={{ fontSize: '16px' }}>Independent</h3>
              <p style={{ fontSize: '13px' }}>We don't work for providers</p>
            </div>
            <div className="acc-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>💯</div>
              <h3 style={{ fontSize: '16px' }}>100% Free</h3>
              <p style={{ fontSize: '13px' }}>No fees, ever</p>
            </div>
            <div className="acc-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🇦🇺</div>
              <h3 style={{ fontSize: '16px' }}>Australia-Wide</h3>
              <p style={{ fontSize: '13px' }}>Every state & territory</p>
            </div>
            <div className="acc-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
              <h3 style={{ fontSize: '16px' }}>Expert Advisors</h3>
              <p style={{ fontSize: '13px' }}>Real people, real help</p>
            </div>
          </div>
        </div>
      </section>

      {!userPath && (
        <section className="acc-section" style={{ background: '#f1f4f8', textAlign: 'center' }}>
          <div className="acc-section-inner" style={{ maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '16px' }}>Still Not Sure Which Path Is Right for You?</h2>
            <p style={{ marginBottom: '24px', fontSize: '16px', color: '#2b3a4f' }}>
              That's completely normal. Give us a call and we'll help you figure out your best next steps — no matter where you are in your aged care journey.
            </p>
            <a className="acc-btn-primary" href="tel:1800303101" style={{ fontSize: '17px', padding: '16px 32px' }}>
              📞 Talk to an Expert (100% Free)
            </a>
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#4b596d' }}>
              Average call: 15 minutes • We explain everything in plain English
            </p>
          </div>
        </section>
      )}

      <section id="program" className="acc-section">
        <div className="acc-section-inner">
          <h2>Why the November 2025 Changes Matter to You</h2>
          <p className="acc-lede">New rules, new flexibility, more choice. We help you navigate the changes and unlock better care options — whether you're starting care or switching providers.</p>
          <div className="acc-two-col" style={{ gap: '18px' }}>
            <div className="acc-card">
              <h3>New to Aged Care?</h3>
              <p>We'll help you understand eligibility, assessments, and your first provider selection — at no cost.</p>
            </div>
            <div className="acc-card">
              <h3>Ready to Switch?</h3>
              <p>The new program makes switching easier. Unspent funds transfer automatically; we guide you through it.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="levels" className="acc-section" style={{ paddingTop: 0 }}>
        <div className="acc-section-inner">
          <h2>Understanding Your Care Level: Which One Suits Your Needs?</h2>
          <div className="acc-levels">
            <div className="acc-level"><h4>Level 1 — Basic</h4><p>Entry-level help with simple, occasional supports.</p></div>
            <div className="acc-level"><h4>Level 2 — Basic Plus</h4><p>More frequent basic supports for home living.</p></div>
            <div className="acc-level"><h4>Level 3 — Low Moderate</h4><p>Regular assistance with daily tasks and safety.</p></div>
            <div className="acc-level"><h4>Level 4 — Moderate</h4><p>Coordinated supports for ongoing needs.</p></div>
            <div className="acc-level"><h4>Level 5 — Mod High</h4><p>Higher intensity services with planning.</p></div>
            <div className="acc-level"><h4>Level 6 — High</h4><p>Comprehensive daily supports and oversight.</p></div>
            <div className="acc-level"><h4>Level 7 — V. High</h4><p>Complex care with multidisciplinary input.</p></div>
            <div className="acc-level"><h4>Level 8 — Complex</h4><p>Highest level, complex needs and coordination.</p></div>
          </div>
        </div>
      </section>

      <section id="how" className="acc-section">
        <div className="acc-section-inner">
          <h2>Start Your Care Journey in 5 Simple Steps</h2>
          <p className="acc-lede">No paperwork nightmares. No confusion. We guide you every step of the way — completely free.</p>
          <div className="acc-accordion">
            {[
              { title: 'Contact → Call 1800 303 101', content: 'Call us and we\'ll confirm your situation and next steps.' },
              { title: 'Eligibility & Assessment', content: 'We explain assessments and help you prepare.' },
              { title: 'Choose Your Provider', content: 'We shortlist based on your needs and preferences.' },
              { title: 'Agree on Services', content: 'We review inclusions, exclusions, and schedules with you.' },
              { title: 'Start Care', content: 'Begin services with confidence; we stay available.' }
            ].map((item, index) => (
              <div key={index} className={`acc-item ${activeAccordions['acc-first'] === index ? 'active' : ''}`}>
                <button className="acc-btn" onClick={() => toggleAccordion('acc-first', index)}>
                  {item.title}
                </button>
                <div className="acc-content"><p>{item.content}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="switch" className="acc-section">
        <div className="acc-section-inner">
          <h2>Unhappy with Your Current Provider? Switch in 5 Easy Steps</h2>
          <p className="acc-lede">You're not stuck. Switching is now smoother than ever — and your unspent funds transfer automatically with you.</p>
          <div className="acc-accordion">
            {[
              { title: 'Step 1: Call us (1800 303 101)', content: 'We confirm your current plan and pain points.' },
              { title: 'Step 2: Get a shortlist', content: 'We propose better-fit providers for your needs.' },
              { title: 'Step 3: Choose your new provider', content: 'You pick; we help with comparisons.' },
              { title: 'Step 4: Transfer your plan/funds', content: 'Unspent funds move with you under the new rules.' },
              { title: 'Step 5: Start seamlessly', content: 'Begin with the new provider; we stay on-call.' }
            ].map((item, index) => (
              <div key={index} className={`acc-item ${activeAccordions['acc-switch'] === index ? 'active' : ''}`}>
                <button className="acc-btn" onClick={() => toggleAccordion('acc-switch', index)}>
                  {item.title}
                </button>
                <div className="acc-content"><p>{item.content}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="acc-help-section">
        <div className="acc-section-inner">
          <h2 style={{ marginBottom: '8px' }}>Don't Navigate This Alone — Get Expert Help Today (100% FREE)</h2>
          <p style={{ marginBottom: '14px' }}>Call now: <strong>1800 303 101</strong></p>
          <a className="acc-btn-primary" href="tel:1800303101">📞 1800 303 101</a>
        </div>
      </section>

      <section id="how-we-help" className="acc-section">
        <div className="acc-section-inner">
          <h2>How We Match You with the Right Provider (Without Costing You a Cent)</h2>
          <div className="acc-steps">
            <div className="acc-step">
              <img src="https://placehold.co/600x400/94c9b6/ffffff?text=Tell+Your+Situation" alt="" />
              <div className="acc-step-body">
                <h4>1) Tell Your Situation</h4>
                <p>We listen carefully to what you need today and what might change soon.</p>
              </div>
            </div>
            <div className="acc-step">
              <img src="https://placehold.co/600x400/6ea5c0/ffffff?text=Get+Your+Shortlist" alt="" />
              <div className="acc-step-body">
                <h4>2) Get Your Shortlist</h4>
                <p>Curated providers matched to your care level, budget, and preferences.</p>
              </div>
            </div>
            <div className="acc-step">
              <img src="https://placehold.co/600x400/4f7fa8/ffffff?text=Start+or+Switch" alt="" />
              <div className="acc-step-body">
                <h4>3) Start or Switch with Confidence</h4>
                <p>We help you begin services or transfer smoothly, and stay available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="acc-section">
        <div className="acc-section-inner">
          <h2>Why 1,000+ Australian Families Trust Us with Their Care Decisions</h2>
          <div className="acc-cards-grid">
            <div className="acc-card">
              <h3>✅ We Support New & Existing Clients</h3>
              <p>Starting your aged care journey for the first time? Or ready to switch from an underperforming provider? We handle both — and we guide you through every detail.</p>
            </div>
            <div className="acc-card">
              <h3>☎️ Real Human Support (Not a Chatbot)</h3>
              <p>Speak with an experienced aged care advisor who explains everything in plain English. No jargon, no runaround — just honest, clear guidance tailored to your situation.</p>
            </div>
            <div className="acc-card">
              <h3>💰 100% FREE & Truly Independent</h3>
              <p>Zero cost to families. We don't work for any provider, so our only goal is finding YOU the best match for your needs — not pushing a particular service.</p>
            </div>
            <div className="acc-card">
              <h3>⏱️ Save Hours of Research</h3>
              <p>Instead of calling 20+ providers yourself, we do the heavy lifting. You get a curated shortlist of 2-3 quality options matched to your needs, budget, and location.</p>
            </div>
            <div className="acc-card">
              <h3>🔄 Switching Made Simple</h3>
              <p>Under the new 2025 rules, switching providers is easier and your unspent funds transfer with you. We handle all the paperwork and coordination so you don't have to.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="acc-section" style={{ background: '#f1f4f8' }}>
        <div className="acc-section-inner">
          <h2>Real Stories from Real Australian Families</h2>
          <div className="acc-testimonials">
            <div className="acc-testimonial">
              "I was completely lost after Mum's assessment came through. They explained everything in simple terms and found us a provider that was perfect for Mum's needs. Best part? Completely free service."<br /><br /><strong>— Sarah M., Melbourne VIC</strong>
            </div>
            <div className="acc-testimonial">
              "We were unhappy with our previous provider's communication. Switching seemed complicated but they handled everything. The funds transferred smoothly and our new team started within a week. Game changer."<br /><br /><strong>— James & Patricia L., Sydney NSW</strong>
            </div>
            <div className="acc-testimonial">
              "As a daughter living interstate, I needed help finding care for Dad in Brisbane. They did all the research, gave me three great options, and I made the call. Dad's now getting excellent care and I have peace of mind."<br /><br /><strong>— Linda K., Perth WA (caring for father in QLD)</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="acc-section">
        <div className="acc-section-inner">
          <h2>Your Questions Answered: Everything You Need to Know</h2>
          <div className="acc-accordion">
            {userPath === 'new' ? [
              { title: 'I\'m new to aged care—where do I start?', content: 'Call us first. We\'ll assess your situation, explain eligibility requirements, help you prepare for an assessment, and guide you through each step. The entire process typically takes 4-8 weeks from first call to receiving care.' },
              { title: 'How do I know if I\'m eligible for aged care?', content: 'Generally, you need to be 65+ (or 50+ for Aboriginal and Torres Strait Islander peoples) and require support with daily living. We\'ll help you understand if you meet the criteria and prepare for your assessment.' },
              { title: 'What happens during an aged care assessment?', content: 'An assessor visits you at home to discuss your needs, health, and daily activities. It usually takes 1-2 hours. We\'ll prepare you with exactly what to expect and what to have ready.' },
              { title: 'How much does aged care cost?', content: 'It depends on your income and assets. Some people pay nothing, others contribute. The government covers most costs. We\'ll explain your likely costs based on your situation — before you commit to anything.' },
              { title: 'How long does it take to start receiving care?', content: 'From assessment to starting care typically takes 4-8 weeks total. Once you have your approval, we can match you with a provider within same day.' }
            ] : userPath === 'existing' ? [
              { title: 'Can I switch providers if I\'m unhappy?', content: 'Absolutely. Under the new November 2025 rules, switching is simpler than ever. Your unspent funds transfer automatically, and there\'s no re-assessment needed. We handle all the coordination.' },
              { title: 'Will I lose my funds if I switch?', content: 'No! This is a big improvement in the new system. All unspent funds in your care budget transfer to your new provider automatically. You don\'t lose a single cent.' },
              { title: 'How long does switching take?', content: 'Typically 5-7 days from choosing your new provider to starting services with them. We coordinate everything to minimize any gap in your care.' },
              { title: 'Do I need to be re-assessed if I switch?', content: 'No. Your care level, budget, and approval stay exactly the same. You\'re just changing who delivers the services — not your entitlement.' },
              { title: 'What if my current provider tries to stop me?', content: 'They can\'t. You have the legal right to switch providers. We\'ve handled hundreds of switches and know exactly how to manage any pushback professionally.' }
            ] : [
              { title: 'I\'m new to aged care—where do I start?', content: 'Call us; we\'ll outline eligibility, assessment prep, and provider selection.' },
              { title: 'Can I switch providers if I\'m unhappy?', content: 'Yes. Under the new program, switching is simpler and unspent funds transfer.' },
              { title: 'How much does your service cost?', content: 'It\'s 100% free for families. We\'re independent and don\'t work for any provider.' },
              { title: 'What are the 8 new care levels?', content: 'They range from Basic to Complex (Levels 1–8) with increasing supports.' },
              { title: 'Will I lose my funds if I switch?', content: 'No. Unspent funds transfer with you under the new rules.' }
            ].map((item, index) => (
              <div key={index} className={`acc-item ${activeAccordions['acc-faq'] === index ? 'active' : ''}`}>
                <button className="acc-btn" onClick={() => toggleAccordion('acc-faq', index)}>
                  {item.title}
                </button>
                <div className="acc-content"><p>{item.content}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: 'linear-gradient(135deg, #0f2a45 0%, #1f3248 100%)', color: '#fff', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <h2 style={{ color: '#ffd34f', marginBottom: '16px' }}>Don't Wait Until You're Desperate</h2>
          <p style={{ fontSize: '18px', marginBottom: '24px', lineHeight: '1.7' }}>
            The families who get the best care outcomes are the ones who plan ahead. Whether you're starting fresh or ready to switch, the perfect provider is waiting — and we'll help you find them.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
              ✓ <strong>47 families</strong> helped this week
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
              ✓ <strong>same day</strong> response time
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
              ✓ <strong>100% FREE</strong> forever
            </div>
          </div>
          <a className="acc-btn-primary" href="tel:1800303101" style={{ fontSize: '18px', padding: '18px 36px', display: 'inline-block' }}>
            📞 Get Your Free Consultation Now
          </a>
          <p style={{ marginTop: '16px', fontSize: '14px', opacity: '0.9' }}>
            Call 1800 303 101 | Mon-Fri 8am-6pm, Sat 9am-1pm AEST
          </p>
        </div>
      </section>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section className="acc-section" style={{ background: '#f1f4f8', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during business hours.</div>
          </div>
        </div>
      </section>

      <section className="acc-section" style={{ background: '#f7fdf7', borderTop: '2px solid var(--accent-gold)', borderBottom: '2px solid var(--accent-gold)', padding: '48px 20px' }}>
        <div className="acc-section-inner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '16px' }}>Our Commitment to You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Hidden Costs</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>100% free now and always</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Pressure</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>You choose, we guide</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>No Obligations</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Walk away anytime</p>
            </div>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <strong>Your Privacy Protected</strong>
              <p style={{ fontSize: '14px', marginTop: '4px', color: '#2b3a4f' }}>Bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="acc-footer">
        <div className="acc-footer-inner">
          <div>
            <h4>Aged Care Information</h4>
            <p>Independent guidance for Australian families. 100% free.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Phone: 1800 303 101<br />Email: info@example.com</p>
          </div>
          <div>
            <h4>Registered</h4>
            <p>ABN: 12 345 678 901<br />SSL Secure • Aged Care Specialist</p>
          </div>
        </div>
      </footer>

      <section id="contact" className="acc-section">
        <div className="acc-section-inner">
          <h2>Get Your Personalized Provider Match Same Day — Free</h2>
          <p className="acc-lede" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <strong>Join 1,000+ families</strong> who found better care through our free service. No obligation. No sales pressure. Just genuine help.
          </p>
          <div className="acc-form-card">
            <div className="acc-form-grid">
              <div><label>Your Name *</label><input type="text" placeholder="Your name" required /></div>
              <div><label>Email Address *</label><input type="email" placeholder="you@example.com" required /></div>
              <div><label>Phone Number *</label><input type="tel" placeholder="04xx xxx xxx" required /></div>
              <div>
                <label>Your Situation *</label>
                <select required>
                  <option value="">Please select...</option>
                  <option>New to aged care (first time)</option>
                  <option>Want to switch providers</option>
                  <option>Just exploring options</option>
                  <option>Urgent — need help ASAP</option>
                </select>
              </div>
            </div>
            <textarea style={{ marginTop: '12px' }} placeholder="Tell us about your needs (optional but helpful — e.g., preferred language, location, special requirements)"></textarea>
            <button className="acc-btn-submit" style={{ marginTop: '12px' }}>Get My FREE Provider Match Now →</button>
            <div className="acc-secure">🔒 Your information is secure and confidential. We typically respond within 2-4 hours during