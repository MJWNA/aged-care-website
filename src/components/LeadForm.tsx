import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <section id="contact" className="py-12 md:py-20" style={{ background: 'linear-gradient(135deg, #0f4c75, #1b262c)' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Aged Care Provider?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Fill out the form and we'll contact you same day with personalised provider recommendations - 100% free, no obligation.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f4b400' }}>
                  <Phone className="w-6 h-6" style={{ color: '#0f1f2e' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us Directly</h3>
                  <a href="tel:1800303101" className="text-xl font-bold hover:underline" style={{ color: '#f4b400' }}>
                    1800 303 101
                  </a>
                  <p className="text-sm opacity-80 mt-1">Mon-Fri: 9am - 5pm AEST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f4b400' }}>
                  <Mail className="w-6 h-6" style={{ color: '#0f1f2e' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <a href="mailto:info@agedcareinformation.com.au" className="hover:underline" style={{ color: '#f4b400' }}>
                    info@agedcareinformation.com.au
                  </a>
                  <p className="text-sm opacity-80 mt-1">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f4b400' }}>
                  <MapPin className="w-6 h-6" style={{ color: '#0f1f2e' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Serving All of Australia</h3>
                  <p className="opacity-90">NSW, VIC, QLD, WA, SA, TAS, ACT, NT</p>
                  <p className="text-sm opacity-80 mt-1">Local provider networks nationwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="rounded-2xl p-8 shadow-2xl" style={{ background: '#ffffff' }}>
            {isSubmitted ? (
              <div className="text-center py-12">
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
              <>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#0f1f2e' }}>
                  Get Your Free Provider Match
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none"
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
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none text-lg"
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
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none"
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
                      placeholder="E.g., looking for dementia care in Sydney, need care urgently, switching from current provider..."
                      rows={4}
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none resize-none"
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
                    🔒 Your information is private and secure. We'll contact you same day with personalised recommendations.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


