

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-20" style={{ background: '#ffffff' }}>
      <div className="container max-w-[1180px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4" style={{ color: '#0f4c75' }}>
            How It Works
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#718096' }}>
            Three simple steps to find your perfect aged care provider — completely free
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-7 items-center mt-5">
          <div>
            <ol className="space-y-5">
              <li>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
                  Step 1 – Tell Us About Your Situation
                </h3>
                <p style={{ color: '#566273' }}>
                  Complete the form or call <a href="tel:1800303101" className="font-semibold" style={{ color: '#0f4c75' }}>1800 303 101</a>. We'll ask about care needs, goals, culture, language, and your current situation.
                </p>
              </li>
              
              <li>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
                  Step 2 – We Create Your Personalised Shortlist
                </h3>
                <p style={{ color: '#566273' }}>
                  A tailored list of <strong>Support at Home providers and in‑home experts</strong> in your area with current availability – usually same day responses.
                </p>
              </li>
              
              <li>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
                  Step 3 – Choose with Confidence
                </h3>
                <p style={{ color: '#566273' }}>
                  We walk you through options, help with <strong>assessments, funding questions, and provider transfers</strong> if you decide to switch.
                </p>
              </li>
            </ol>
          </div>
          
          <div>
            <img 
              src="https://cdn.abacus.ai/images/5ddecf3a-1daf-4f8e-a7fd-bf819ec4c51a.png" 
              alt="Three-step guided process" 
              className="rounded-xl border shadow-sm w-full"
              style={{
                borderColor: '#dfe6ed',
                background: '#fff',
                boxShadow: '0 10px 20px rgba(0,0,0,0.04)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


