import { Shield, Award, FileCheck, Users } from 'lucide-react';

export default function Credentials() {
  const credentials = [
    {
      icon: Shield,
      title: 'Registered Business',
      description: 'Australian Business Number (ABN) verified and registered with ASIC'
    },
    {
      icon: Award,
      title: 'Industry Certified',
      description: 'Accredited aged care advisor with ongoing professional development'
    },
    {
      icon: FileCheck,
      title: 'Privacy Compliant',
      description: 'Full compliance with Australian Privacy Principles and GDPR standards'
    },
    {
      icon: Users,
      title: 'Family Owned',
      description: 'Independent service - not affiliated with any specific aged care provider'
    }
  ];

  return (
    <section className="hidden md:block py-12 md:py-16" style={{ background: '#ffffff' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Why You Can Trust Us
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            We're transparent about who we are and how we operate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg"
              style={{
                background: '#f7f9fb',
                borderColor: '#e2e8f0'
              }}
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f4b400' }}>
                <cred.icon className="w-8 h-8" style={{ color: '#0f1f2e' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#0f1f2e' }}>
                {cred.title}
              </h3>
              <p className="text-sm" style={{ color: '#64748b' }}>
                {cred.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact for verification */}
        <div className="text-center mt-8">
          <p style={{ color: '#64748b' }}>
            Want to verify our credentials? Call us at{' '}
            <a href="tel:1800303101" className="font-bold hover:underline" style={{ color: '#f4b400' }}>
              1800 303 101
            </a>
            {' '}or email us for our business documentation.
          </p>
        </div>
      </div>
    </section>
  );
}


