import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    careFor: '',
    careType: '',
    location: '',
    // Step 2
    preferences: [] as string[],
    urgency: '',
    // Step 3
    name: '',
    email: '',
    phone: '',
    contactMethod: 'phone'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you within the same day with your personalised care match.');
  };

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const togglePreference = (pref: string) => {
    const current = formData.preferences;
    if (current.includes(pref)) {
      handleChange('preferences', current.filter(p => p !== pref));
    } else {
      handleChange('preferences', [...current, pref]);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.careFor && formData.careType && formData.location;
    }
    if (currentStep === 2) {
      return formData.urgency;
    }
    return true;
  };

  return (
    <section className="py-20 px-4" id="contact" style={{ background: '#f7f9fb' }}>
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Get Your Free Care Match
          </h2>
          <p className="text-lg" style={{ color: '#64748b' }}>
            Tell us about your needs and we'll match you with 3 perfect providers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="rounded-2xl p-6 md:p-8 border shadow-lg" style={{
            background: '#ffffff',
            borderColor: '#e2e8f0'
          }}>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: '#4a7c9e' }}>
                  Step {currentStep} of 3
                </span>
                <span className="text-sm" style={{ color: '#64748b' }}>
                  {Math.round((currentStep / 3) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div 
                  className="h-full transition-all duration-300 rounded-full"
                  style={{ 
                    background: '#4a7c9e',
                    width: `${(currentStep / 3) * 100}%`
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Situation */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
                    Tell us about your situation
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#0f1f2e' }}>
                      Who is the care for? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Parent', 'Spouse', 'Myself', 'Other family'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange('careFor', option)}
                          className="p-4 rounded-lg border-2 font-semibold transition-all text-left"
                          style={{
                            borderColor: formData.careFor === option ? '#4a7c9e' : '#e2e8f0',
                            background: formData.careFor === option ? '#f0f7fb' : '#ffffff',
                            color: formData.careFor === option ? '#0f1f2e' : '#64748b'
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#0f1f2e' }}>
                      What type of care do you need? *
                    </label>
                    <div className="space-y-2">
                      {['Starting new home care', 'Switching providers', 'Respite care', 'Not sure yet'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange('careType', option)}
                          className="w-full p-4 rounded-lg border-2 font-semibold transition-all text-left flex items-center justify-between"
                          style={{
                            borderColor: formData.careType === option ? '#4a7c9e' : '#e2e8f0',
                            background: formData.careType === option ? '#f0f7fb' : '#ffffff',
                            color: formData.careType === option ? '#0f1f2e' : '#64748b'
                          }}
                        >
                          {option}
                          {formData.careType === option && (
                            <CheckCircle className="w-5 h-5" style={{ color: '#4a7c9e' }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#0f1f2e' }}>
                      What's your location/postcode? *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="e.g., Sydney, 2000"
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none focus:border-[#4a7c9e]"
                      style={{
                        borderColor: '#e2e8f0',
                        color: '#0f1f2e',
                        background: '#ffffff'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
                    What matters most to you?
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#0f1f2e' }}>
                      Select all that apply
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Language support',
                        'Dementia care',
                        'Medical support',
                        'Cultural fit',
                        'Flexible hours',
                        'Affordable pricing'
                      ].map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => togglePreference(pref)}
                          className="p-3 rounded-lg border-2 font-semibold transition-all text-sm text-left flex items-center gap-2"
                          style={{
                            borderColor: formData.preferences.includes(pref) ? '#4a7c9e' : '#e2e8f0',
                            background: formData.preferences.includes(pref) ? '#f0f7fb' : '#ffffff',
                            color: formData.preferences.includes(pref) ? '#0f1f2e' : '#64748b'
                          }}
                        >
                          <div 
                            className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                            style={{
                              borderColor: formData.preferences.includes(pref) ? '#4a7c9e' : '#cbd5e1',
                              background: formData.preferences.includes(pref) ? '#4a7c9e' : '#ffffff'
                            }}
                          >
                            {formData.preferences.includes(pref) && (
                              <CheckCircle className="w-4 h-4" style={{ color: '#ffffff' }} />
                            )}
                          </div>
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#0f1f2e' }}>
                      How soon do you need care? *
                    </label>
                    <div className="space-y-2">
                      {['Urgent (within 1 week)', 'Soon (1-4 weeks)', 'Planning ahead (1+ months)'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange('urgency', option)}
                          className="w-full p-4 rounded-lg border-2 font-semibold transition-all text-left flex items-center justify-between"
                          style={{
                            borderColor: formData.urgency === option ? '#4a7c9e' : '#e2e8f0',
                            background: formData.urgency === option ? '#f0f7fb' : '#ffffff',
                            color: formData.urgency === option ? '#0f1f2e' : '#64748b'
                          }}
                        >
                          {option}
                          {formData.urgency === option && (
                            <CheckCircle className="w-5 h-5" style={{ color: '#4a7c9e' }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
                    How should we contact you?
                  </h3>

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
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none focus:border-[#4a7c9e]"
                      style={{
                        borderColor: '#e2e8f0',
                        color: '#0f1f2e',
                        background: '#ffffff'
                      }}
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
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none focus:border-[#4a7c9e] text-lg"
                      style={{
                        borderColor: '#e2e8f0',
                        color: '#0f1f2e',
                        background: '#ffffff'
                      }}
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
                      className="w-full px-4 py-3.5 border-2 rounded-lg transition-all focus:outline-none focus:border-[#4a7c9e]"
                      style={{
                        borderColor: '#e2e8f0',
                        color: '#0f1f2e',
                        background: '#ffffff'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#0f1f2e' }}>
                      Preferred contact method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleChange('contactMethod', 'phone')}
                        className="p-4 rounded-lg border-2 font-semibold transition-all flex items-center gap-2 justify-center"
                        style={{
                          borderColor: formData.contactMethod === 'phone' ? '#4a7c9e' : '#e2e8f0',
                          background: formData.contactMethod === 'phone' ? '#f0f7fb' : '#ffffff',
                          color: formData.contactMethod === 'phone' ? '#0f1f2e' : '#64748b'
                        }}
                      >
                        <Phone className="w-4 h-4" />
                        Phone
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange('contactMethod', 'email')}
                        className="p-4 rounded-lg border-2 font-semibold transition-all flex items-center gap-2 justify-center"
                        style={{
                          borderColor: formData.contactMethod === 'email' ? '#4a7c9e' : '#e2e8f0',
                          background: formData.contactMethod === 'email' ? '#f0f7fb' : '#ffffff',
                          color: formData.contactMethod === 'email' ? '#0f1f2e' : '#64748b'
                        }}
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold border-2 transition-all"
                    style={{
                      borderColor: '#e2e8f0',
                      color: '#64748b',
                      background: '#ffffff'
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: canProceed() ? '#4a7c9e' : '#cbd5e1',
                      color: '#ffffff'
                    }}
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold transition-all text-lg"
                    style={{
                      background: '#f4b400',
                      color: '#0f1f2e'
                    }}
                  >
                    Get My Free Provider Match
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            <p className="text-xs mt-4 text-center" style={{ color: '#64748b' }}>
              🔒 Your information is private and secure. We'll contact you same day.
            </p>
          </div>

          {/* Side Image & Info */}
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop"
                alt="Caring aged care professional with senior" 
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="p-6 rounded-xl" style={{ background: '#ffffff', border: '2px solid #e2e8f0' }}>
              <h4 className="font-bold text-lg mb-4" style={{ color: '#0f1f2e' }}>
                What happens next?
              </h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                    1
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#0f1f2e' }}>We Review Your Needs</p>
                    <p className="text-sm" style={{ color: '#64748b' }}>Our team carefully matches your requirements</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                    2
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#0f1f2e' }}>Same Day Response</p>
                    <p className="text-sm" style={{ color: '#64748b' }}>We call you with 3 perfect provider matches</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                    3
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#0f1f2e' }}>You Choose & Start Care</p>
                    <p className="text-sm" style={{ color: '#64748b' }}>We guide you through the entire process</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, #4a7c9e 0%, #0f4c75 100%)', color: '#ffffff' }}>
              <p className="text-2xl font-bold mb-2">Need immediate help?</p>
              <a 
                href="tel:1800303101"
                className="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-lg font-bold transition-all"
                style={{ background: '#f4b400', color: '#0f1f2e' }}
              >
                <Phone className="w-5 h-5" />
                Call 1800 303 101
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
