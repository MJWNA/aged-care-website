import { Shield, Gift, CheckCircle } from 'lucide-react';

export default function GuaranteeSection() {
  return (
    <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #f4b400 0%, #e8a23f 100%)' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Shield className="w-10 h-10" style={{ color: '#ffffff' }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Our 100% Satisfaction Guarantee
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#0f1f2e', opacity: 0.9 }}>
            We're so confident in our service that we back it with a risk-free promise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#10b981' }} />
            <h3 className="font-bold text-lg mb-2" style={{ color: '#0f1f2e' }}>
              3 Provider Matches
            </h3>
            <p style={{ color: '#64748b' }}>
              We guarantee to find you at least 3 suitable providers, or we keep searching until you're happy
            </p>
          </div>

          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#10b981' }} />
            <h3 className="font-bold text-lg mb-2" style={{ color: '#0f1f2e' }}>
              No Hidden Costs
            </h3>
            <p style={{ color: '#64748b' }}>
              100% free service for families. No fees, no commissions, no surprises—ever
            </p>
          </div>

          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Gift className="w-12 h-12 mx-auto mb-4" style={{ color: '#f4b400' }} />
            <h3 className="font-bold text-lg mb-2" style={{ color: '#0f1f2e' }}>
              $50 Gift Card Promise
            </h3>
            <p style={{ color: '#64748b' }}>
              If we can't find 3 suitable providers for you, we'll give you a $50 Coles gift card
            </p>
          </div>
        </div>

        <div className="text-center p-8 rounded-xl" style={{ background: 'rgba(255,255,255,0.95)' }}>
          <p className="text-lg mb-4" style={{ color: '#0f1f2e' }}>
            <strong>Why we can offer this guarantee:</strong> We work with 150+ verified providers across Australia. 
            In over 2,847 families helped, we've never failed to find suitable matches.
          </p>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Terms: Gift card offered if we cannot provide at least 3 suitable provider recommendations within 7 days of your initial consultation.
          </p>
        </div>
      </div>
    </section>
  );
}
