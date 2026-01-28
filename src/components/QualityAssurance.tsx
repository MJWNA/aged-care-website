import { Shield, CheckCircle, Users, Award } from 'lucide-react';

export default function QualityAssurance() {
  const qualityChecks = [
    {
      icon: Shield,
      title: 'Verified Providers Only',
      description: 'Every provider in our network is verified for compliance with Australian aged care standards and regulations.'
    },
    {
      icon: CheckCircle,
      title: 'Regular Quality Audits',
      description: 'We conduct ongoing reviews of provider performance, service quality, and family satisfaction ratings.'
    },
    {
      icon: Users,
      title: 'Real Family Reviews',
      description: 'See honest feedback from families who have used each provider. We don\'t hide negative reviews.'
    },
    {
      icon: Award,
      title: 'Performance Monitoring',
      description: 'Providers are rated on response times, care quality, flexibility, and overall family satisfaction.'
    }
  ];

  const redFlags = [
    'Provider has unresolved complaints with Aged Care Quality & Safety Commission',
    'Consistent negative feedback about staff turnover or care quality',
    'Poor communication or delayed responses to families',
    'Lack of transparency about costs or hidden fees',
    'Restrictive contracts or difficult cancellation policies'
  ];

  return (
    <section className="py-20 px-4" style={{ background: '#f7f9fb' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            How We Ensure Provider Quality
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            Your loved one deserves the best care. Here's how we make sure every provider meets our high standards.
          </p>
        </div>

        {/* Quality Checks */}
        <div className="grid md:grid-cols-2 gap-6">
          {qualityChecks.map((check, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border-2 transition-all duration-200 hover:shadow-lg"
              style={{
                background: '#ffffff',
                borderColor: '#e2e8f0'
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f4b400' }}>
                  <check.icon className="w-6 h-6" style={{ color: '#0f1f2e' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
                    {check.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                    {check.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

