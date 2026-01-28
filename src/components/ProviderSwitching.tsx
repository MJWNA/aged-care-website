import { RefreshCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProviderSwitching() {
  const switchingSteps = [
    {
      step: '1',
      title: 'Tell Us Why',
      description: 'Share what\'s not working with your current provider',
      time: '5 minutes'
    },
    {
      step: '2',
      title: 'We Find Better Options',
      description: 'Get matched with providers who meet your specific needs',
      time: 'Same day'
    },
    {
      step: '3',
      title: 'Smooth Transition',
      description: 'We help coordinate the switch to minimize disruption',
      time: '1-2 weeks'
    },
    {
      step: '4',
      title: 'Follow-up Support',
      description: 'We check in to ensure you\'re happy with your new provider',
      time: 'Ongoing'
    }
  ];

  const commonReasons = [
    'Poor communication or unresponsive staff',
    'Care quality doesn\'t meet expectations',
    'Hidden fees or unexpected cost increases',
    'Inflexible scheduling or service restrictions',
    'Personality clash with care workers',
    'Provider going out of business or reducing services'
  ];

  return (
    <section className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <RefreshCcw className="w-6 h-6" style={{ color: '#f4b400' }} />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#f4b400' }}>
              Easy Provider Switching
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Unhappy With Your Current Provider?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            You're not stuck. Switching aged care providers is easier than you think, and we're here to help every step of the way.
          </p>
        </div>

        {/* Reassurance Box */}
        <div className="mb-12 p-6 rounded-xl border-2" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0284c7' }} />
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#0f1f2e' }}>
                You Have the Right to Change Providers
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Under the new Support at Home Program (effective Nov 1, 2025), you can switch providers without losing your funding or starting over. There's <strong>no penalty</strong> for changing providers, and you don't need to explain your decision to your current provider.
              </p>
            </div>
          </div>
        </div>

        {/* Switching Process */}
        <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: '#0f1f2e' }}>
          How We Make Switching Simple
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {switchingSteps.map((step, idx) => (
            <div key={idx} className="relative">
              <div
                className="p-6 rounded-xl border-2 h-full transition-all duration-200 hover:shadow-lg"
                style={{
                  background: '#f7f9fb',
                  borderColor: '#e2e8f0'
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                  {step.step}
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#0f1f2e' }}>
                  {step.title}
                </h4>
                <p className="mb-3" style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {step.description}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#f4b400' }} />
                  <span className="text-sm font-semibold" style={{ color: '#f4b400' }}>
                    {step.time}
                  </span>
                </div>
              </div>
              {idx < switchingSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5" style={{ background: '#e2e8f0' }} />
              )}
            </div>
          ))}
        </div>

        {/* Common Reasons */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-xl border-2" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0f1f2e' }}>
              Common Reasons Families Switch
            </h3>
            <ul className="space-y-3">
              {commonReasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#f4b400' }} />
                  <span style={{ color: '#64748b' }}>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-xl" style={{ background: '#f4b400' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
              What Families Say After Switching
            </h3>
            <div className="space-y-4">
              <blockquote className="italic" style={{ color: '#0f1f2e' }}>
                "We should have switched years ago. The new provider is so much more responsive and caring."
              </blockquote>
              <p className="text-sm" style={{ color: '#0f1f2e', opacity: 0.8 }}>
                — Margaret T., Switched after 3 years
              </p>
              
              <blockquote className="italic mt-6" style={{ color: '#0f1f2e' }}>
                "The transition was seamless. They handled everything while we focused on Mum's care."
              </blockquote>
              <p className="text-sm" style={{ color: '#0f1f2e', opacity: 0.8 }}>
                — David R., Melbourne
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Ready to Find a Better Provider?
          </h3>
          <p className="mb-6" style={{ color: '#64748b' }}>
            Get matched with providers who truly care — for free
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:brightness-95"
            style={{
              background: '#f4b400',
              color: '#0f1f2e'
            }}
          >
            Start Your Provider Switch Today
          </a>
        </div>
      </div>
    </section>
  );
}
