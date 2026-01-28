import { Clock, Zap, Calendar, TrendingUp } from 'lucide-react';

export default function Timelines() {
  const scenarios = [
    {
      icon: Zap,
      title: 'Urgent Care Needed',
      timeline: '24-48 hours',
      description: 'Emergency or hospital discharge situations',
      color: '#ef4444',
      steps: [
        'Same-day consultation call',
        'Priority provider matching',
        'Fast-track assessments',
        'Care starts within 48 hours'
      ]
    },
    {
      icon: Calendar,
      title: 'Standard Planning',
      timeline: '1-2 weeks',
      description: 'Most families fall into this category',
      color: '#f4b400',
      steps: [
        'Initial consultation within 24 hours',
        'Provider matches sent within 2-3 days',
        'Assessment appointments scheduled',
        'Care begins in 7-14 days'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Future Planning',
      timeline: '2-4 weeks',
      description: 'Planning ahead for gradual care needs',
      color: '#10b981',
      steps: [
        'Comprehensive care planning',
        'Multiple provider comparisons',
        'Trial periods if needed',
        'Scheduled start date of your choice'
      ]
    }
  ];

  const waitlistFacts = [
    {
      title: 'No Government Waitlists for Home Care',
      description: 'Since the 2025 reforms, home care funding is available immediately after your ACAT assessment. You don\'t wait for a "package" anymore.'
    },
    {
      title: 'Provider Availability Varies',
      description: 'Some popular providers may have waitlists, but we work with 150+ providers to find you immediate options.'
    },
    {
      title: 'Average Wait Time: 2.3 Days',
      description: 'From your first call to being connected with a provider. Most families start care within 2 weeks.'
    }
  ];

  return (
    <section className="py-20 px-4" style={{ background: '#f7f9fb' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6" style={{ color: '#f4b400' }} />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#f4b400' }}>
              Clear Timelines
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            How Long Will It Take?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            No uncertainty. Here's exactly what to expect based on your situation.
          </p>
        </div>

        {/* Timeline Scenarios */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {scenarios.map((scenario, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg"
              style={{
                background: '#ffffff',
                borderColor: '#e2e8f0'
              }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: scenario.color, opacity: 0.15 }}>
                <scenario.icon className="w-6 h-6" style={{ color: scenario.color }} />
              </div>
              
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
                {scenario.title}
              </h3>
              
              <div className="inline-block px-3 py-1 rounded-full mb-3 text-sm font-bold" style={{ background: scenario.color, color: '#ffffff' }}>
                {scenario.timeline}
              </div>
              
              <p className="mb-4 text-sm" style={{ color: '#64748b' }}>
                {scenario.description}
              </p>
              
              <div className="space-y-2">
                {scenario.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: scenario.color }} />
                    <span className="text-sm" style={{ color: '#64748b' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist Facts */}
        <div className="p-8 rounded-xl border-2 mb-8" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#0f1f2e' }}>
            What About Waitlists?
          </h3>
          <div className="space-y-6">
            {waitlistFacts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: '#0f1f2e' }}>
                    {fact.title}
                  </h4>
                  <p style={{ color: '#64748b' }}>
                    {fact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl" style={{ background: '#f4b400' }}>
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#0f1f2e' }}>
            Get Your Personalized Timeline
          </h3>
          <p className="mb-6 text-lg" style={{ color: '#0f1f2e' }}>
            Every situation is unique. Call us for an exact timeline based on your needs.
          </p>
          <a
            href="tel:1800303101"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:brightness-95"
            style={{
              background: '#0f1f2e',
              color: '#ffffff'
            }}
          >
            <Clock className="w-5 h-5" />
            Call Now: 1800 303 101
          </a>
        </div>
      </div>
    </section>
  );
}
