import { Award, Shield, Users, TrendingUp } from 'lucide-react';

export default function AuthorityStatement() {
  return (
    <section className="py-8 md:py-16" style={{ background: 'linear-gradient(135deg, #0f4c75, #1b262c)' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(244, 180, 0, 0.2)', color: '#f4b400' }}
          >
            Australia's Leading Independent Service
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Trusted by Thousands of Australian Families
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            We're Australia's most trusted independent aged care matching service — helping families 
            navigate the complex aged care system with confidence since 2020
          </p>
        </div>

        <div 
          className="p-8 rounded-xl text-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(244, 180, 0, 0.3)'
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Why Families Choose Us Over Going Direct to Providers
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-xl font-bold mb-2" style={{ color: '#f4b400' }}>
                  ✓ Unbiased Advice
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  We're not owned by any provider — your interests always come first
                </p>
              </div>
              <div>
                <div className="text-xl font-bold mb-2" style={{ color: '#f4b400' }}>
                  ✓ Save Time
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Get matched in 24 hours vs weeks of calling providers yourself
                </p>
              </div>
              <div>
                <div className="text-xl font-bold mb-2" style={{ color: '#f4b400' }}>
                  ✓ Expert Support
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Navigate reforms, paperwork, and choices with confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


