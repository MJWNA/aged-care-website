





import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import TopBar from './TopBar';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'How It Works', href: '#how' },
    { label: 'Why Trust Us', href: '#why' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <TopBar />
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{
          backdropFilter: 'blur(10px)',
          background: isScrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.9)',
          borderBottom: '1px solid #e2e8f0',
          top: '44px'
        }}
      >
        <div className="max-w-[1180px] mx-auto px-4 flex items-center justify-between gap-3 py-4">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-opacity hover:opacity-90"
          >
            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="https://cdn.abacus.ai/images/b9c38adc-b2a5-4a46-9737-6b7f9fb44e55.png"
                alt="Aged Care Information logo – cupped hands with info symbol and heart"
                style={{ maxWidth: '110px', width: '100%', height: 'auto' }}
                loading="eager"
              />
              <div>
                <h3 style={{ margin: '0 0 2px', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontWeight: 700, color: '#1f3248', fontSize: '14px', lineHeight: '1.2' }}>
                  AGED CARE
                </h3>
                <p style={{ margin: 0, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontWeight: 500, color: '#3b8c73', fontSize: '12px', lineHeight: '1.2' }}>
                  Information
                </p>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(link.href)}
                className="font-semibold transition-all duration-200 hover:opacity-80"
                style={{ color: '#4a7c9e' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:1800303101" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-200 hover:brightness-95"
              style={{
                background: '#4a7c9e',
                color: '#ffffff'
              }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a
              href="#lead-form"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all"
              style={{
                background: '#f4b400',
                color: '#0f1f2e'
              }}
            >
              <Phone className="w-4 h-4" />
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#0f1f2e' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden border-t"
            style={{
              background: '#ffffff',
              borderColor: '#e2e8f0'
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-200"
                  style={{
                    color: '#0f1f2e',
                    background: '#f7f9fb'
                  }}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3 border-t" style={{ borderColor: '#e2e8f0' }}>
                <a 
                  href="tel:1800303101" 
                  className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-lg font-bold transition-all duration-200"
                  style={{
                    background: '#4a7c9e',
                    color: '#ffffff'
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Call 1800 303 101
                </a>
                <a
                  href="#lead-form"
                  className="w-full text-center px-6 py-3 rounded-lg font-bold"
                  style={{
                    background: '#f4b400',
                    color: '#0f1f2e'
                  }}
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div style={{ height: '116px' }} />
    </>
  );
}









