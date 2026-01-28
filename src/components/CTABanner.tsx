import { Phone, MessageCircle } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-8 md:py-16" style={{ 
      background: 'linear-gradient(135deg, #0f4c75, #1b262c)',
      borderTop: '4px solid #f4b400',
      borderBottom: '4px solid #f4b400'
    }}>
      <div className="max-w-[1180px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
          Ready to Find Your Perfect Aged Care Provider?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Join Australian families who found quality care with our free, independent service
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:1800303101"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:brightness-110 hover:scale-105 shadow-lg"
            style={{ background: '#f4b400', color: '#0f1f2e' }}
          >
            <Phone className="w-6 h-6" />
            Call Now: 1800 303 101
          </a>
          
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all"
            style={{
              background: '#f4b400',
              color: '#0f1f2e'
            }}
          >
            Get Free Consultation
          </a>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>100% Free Service</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Same Day Responses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>No Pressure, Just Help</span>
          </div>
        </div>
      </div>
    </section>
  );
}




