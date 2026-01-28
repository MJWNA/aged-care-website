


export default function TrustBadges() {
  return (
    <section className="py-16 border-b" style={{ 
      background: '#fafbfc',
      borderColor: 'rgba(15, 28, 46, 0.08)'
    }}>
      <div className="container max-w-[1180px] mx-auto px-4">
        {/* Trust Badges - Clean Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold text-sm mb-1" style={{ color: '#0f1f2e' }}>SSL Secure</div>
            <div className="text-xs" style={{ color: '#566273' }}>Bank-level encryption</div>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-2">🇦🇺</div>
            <div className="font-semibold text-sm mb-1" style={{ color: '#0f1f2e' }}>Australian Owned</div>
            <div className="text-xs" style={{ color: '#566273' }}>Locally operated</div>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-2">✓</div>
            <div className="font-semibold text-sm mb-1" style={{ color: '#0f1f2e' }}>Privacy Compliant</div>
            <div className="text-xs" style={{ color: '#566273' }}>Australian Privacy Act</div>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-semibold text-sm mb-1" style={{ color: '#0f1f2e' }}>5 Star Service</div>
            <div className="text-xs" style={{ color: '#566273' }}>1,000+ families helped</div>
          </div>
        </div>

        {/* Stats Bar - Subtle Divider */}
        <div className="pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6" style={{
          borderColor: 'rgba(15, 28, 46, 0.1)'
        }}>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: '#f4b400' }}>1,000+</div>
            <div className="text-sm" style={{ color: '#566273' }}>Families Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: '#f4b400' }}>Same Day</div>
            <div className="text-sm" style={{ color: '#566273' }}>Response Times</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: '#f4b400' }}>100%</div>
            <div className="text-sm" style={{ color: '#566273' }}>Free Service</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: '#f4b400' }}>All States</div>
            <div className="text-sm" style={{ color: '#566273' }}>Australia-Wide</div>
          </div>
        </div>
      </div>
    </section>
  );
}



