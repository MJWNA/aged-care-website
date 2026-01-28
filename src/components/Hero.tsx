export default function Hero() {
  return (
    <header className="relative text-white pt-20 pb-12 md:pt-24 md:pb-20 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f4c75aa, #1b262cdd), url(https://cdn.abacus.ai/images/9efb012d-f492-4b50-a50d-789845658942.png) center/cover no-repeat'
    }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.08), transparent 30%)'
      }} />
      
      <div className="container max-w-[1180px] mx-auto px-4 relative z-10">
        <div className="grid gap-7 md:grid-cols-1 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{
              background: 'rgba(255,255,255,0.18)',
              color: '#fff'
            }}>
              Free, Independent | Australia-wide | Same day responses
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 text-white leading-tight">
              Starting Care or Ready to Switch? <span className="block mt-1 md:mt-2" style={{ color: '#f4b400' }}>Find Your Perfect Match</span>
            </h1>
            
            <p className="text-base md:text-lg mb-3 md:mb-4" style={{ color: '#e8f3ff' }}>
              The Australian aged care system changed on 1 November 2025. Whether you're new to the Support at Home program or unhappy with your current provider, we help Australian families find quality care — completely free and independent.
            </p>
            
            <ul className="mb-4 md:mb-5 space-y-1.5 md:space-y-2 text-sm md:text-base" style={{ color: '#e8f3ff', listStyle: 'none', paddingLeft: 0 }}>
              <li className="flex items-start gap-2">
                <span className="text-xl font-bold flex-shrink-0" style={{ color: '#f4b400' }}>✓</span>
                <span><strong>New to home care?</strong> We guide you through the entire process — 100% free</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl font-bold flex-shrink-0" style={{ color: '#f4b400' }}>✓</span>
                <span><strong>Existing aged care clients?</strong> Compare and switch providers easily — 100% free</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl font-bold flex-shrink-0" style={{ color: '#f4b400' }}>✓</span>
                <span><strong>Independent advice</strong> — we don't work for any provider</span>
              </li>
            </ul>
            
            <div className="flex gap-2 md:gap-3 flex-wrap mb-3 md:mb-5">
              <a 
                href="tel:1800303101" 
                className="inline-flex items-center justify-center gap-2 px-5 md:px-5 py-3 md:py-3 rounded-lg font-bold border-2 transition-all duration-200 hover:brightness-95 hover:-translate-y-0.5 w-full sm:w-auto text-base md:text-base"
                style={{
                  background: '#f4b400',
                  color: '#0f1f2e',
                  borderColor: '#f4b400'
                }}
              >
                📞 <span className="md:hidden">Tap to Call:</span><span className="hidden md:inline">Call Now:</span> 1800 303 101
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold border-2 transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto text-base"
                style={{
                  background: 'transparent',
                  color: '#f4b400',
                  borderColor: '#f4b400'
                }}
              >
                Get FREE 2026 Guide → 
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-3 md:mt-5">
              <div className="rounded-xl p-2 md:p-3 border text-sm md:text-base" style={{
                background: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff'
              }}>
                <span>We have helped Families<br />across all of australia</span>
              </div>
              <div className="rounded-xl p-2 md:p-3 border text-sm md:text-base" style={{
                background: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff'
              }}>
                <strong className="block text-lg md:text-xl">100%</strong>
                <span>Free service</span>
              </div>
              <div className="rounded-xl p-2 md:p-3 border text-sm md:text-base" style={{
                background: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff'
              }}>
                <strong className="block text-lg md:text-xl">Expert</strong>
                <span>Independent advice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}





