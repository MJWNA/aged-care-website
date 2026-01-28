import { useState, useEffect } from 'react';
import { X, Phone, Mail, Send } from 'lucide-react';

export default function LeadFormPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup every 2 minutes (120000 milliseconds)
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Reset form if it was submitted
    if (isSubmitted) {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Popup form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Auto-close after 3 seconds on success
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: '#ffffff',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'slideUp 0.4s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:brightness-90"
          style={{
            background: 'rgba(15, 31, 46, 0.8)',
            color: '#ffffff'
          }}
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div 
          className="px-8 pt-8 pb-6"
          style={{
            background: 'linear-gradient(135deg, #4a7c9e 0%, #0f4c75 100%)'
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🎯 Get Your Free Provider Match
          </h2>
          <p className="text-white text-lg opacity-90">
            Same-day response • 100% free • No obligation
          </p>
        </div>

        {/* Form Content */}
        <div className="px-8 py-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: '#22c55e' }}>
                <Send className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#0f1f2e' }}>
                Thank You!
              </h3>
              <p className="text-lg" style={{ color: '#64748b' }}>
                We've received your enquiry and will contact you same day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0f1f2e' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none"
                  style={{
                    borderColor: '#e2e8f0',
                    color: '#0f1f2e',
                    background: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a7c9e'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0f1f2e' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="0400 000 000"
                  className="w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none text-lg"
                  style={{
                    borderColor: '#e2e8f0',
                    color: '#0f1f2e',
                    background: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a7c9e'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0f1f2e' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  inputMode="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none"
                  style={{
                    borderColor: '#e2e8f0',
                    color: '#0f1f2e',
                    background: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a7c9e'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0f1f2e' }}>
                  Tell us about your needs (optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="E.g., looking for dementia care in Sydney..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none resize-none"
                  style={{
                    borderColor: '#e2e8f0',
                    color: '#0f1f2e',
                    background: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a7c9e'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background: '#f4b400',
                  color: '#0f1f2e'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Get My Free Provider Match'}
                {!isSubmitting && <Send className="w-5 h-5" />}
              </button>

              <p className="text-xs text-center" style={{ color: '#64748b' }}>
                🔒 Your information is private and secure
              </p>
            </form>
          )}

          {/* Quick Contact Options */}
          {!isSubmitted && (
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#e2e8f0' }}>
              <p className="text-center text-sm font-semibold mb-3" style={{ color: '#64748b' }}>
                Or contact us directly:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="tel:1800303101"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:brightness-95"
                  style={{
                    background: '#4a7c9e',
                    color: '#ffffff'
                  }}
                >
                  <Phone className="w-4 h-4" />
                  1800 303 101
                </a>
                <a
                  href="mailto:info@agedcareinformation.com.au"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all"
                  style={{
                    background: '#f7f9fb',
                    color: '#4a7c9e',
                    border: '2px solid #4a7c9e'
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
