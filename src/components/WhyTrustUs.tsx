export default function WhyTrustUs() {
  return (
    <section id="why-trust-us" className="py-12 md:py-20" style={{ background: '#f7f9fb' }}>
      <div className="container max-w-[1180px] mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0f1f2e' }}>
          Why Families Trust Aged Care Information
        </h2>
        
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl p-6 border shadow-lg" style={{
            background: '#ffffff',
            borderColor: '#e7edf5'
          }}>
            <img 
              src="https://cdn.abacus.ai/images/2a236caf-4417-4150-b3c6-b8c34f69dac6.png" 
              alt="Provider and service matching" 
              className="rounded-xl border shadow-sm w-full mb-4"
              style={{
                borderColor: '#dfe6ed',
                background: '#fff',
                boxShadow: '0 10px 20px rgba(0,0,0,0.04)'
              }}
            />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
              1) Provider + Service Matching
            </h3>
            <p className="mb-2" style={{ color: '#566273' }}>
              Beyond Support at Home providers, we help connect you with:
            </p>
            <ul className="list-disc pl-5 mb-3 space-y-1" style={{ color: '#566273' }}>
              <li>Nurses and clinical support</li>
              <li>Cleaners and home‑support workers</li>
              <li>Allied health professionals</li>
              <li>Cultural and language‑specific specialists</li>
            </ul>
            <p style={{ color: '#566273' }}>
              <strong>Right organisation and right people</strong> from day one.
            </p>
          </div>
          
          <div className="rounded-2xl p-6 border shadow-lg" style={{
            background: '#ffffff',
            borderColor: '#e7edf5'
          }}>
            <img 
              src="https://cdn.abacus.ai/images/75260b5a-fdca-4aa0-a833-ca2d30ed7997.png" 
              alt="Human support and care conversation" 
              className="rounded-xl border shadow-sm w-full mb-4"
              style={{
                borderColor: '#dfe6ed',
                background: '#fff',
                boxShadow: '0 10px 20px rgba(0,0,0,0.04)'
              }}
            />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
              2) Real Human Support
            </h3>
            <p className="mb-2" style={{ color: '#566273' }}>
              Experienced, caring staff who offer:
            </p>
            <ul className="list-disc pl-5 space-y-1" style={{ color: '#566273' }}>
              <li>Real conversations and honest advice</li>
              <li>Clear explanations without jargon</li>
              <li>Follow‑up so you're never alone in the process</li>
            </ul>
          </div>
          
          <div className="rounded-2xl p-6 border shadow-lg" style={{
            background: '#ffffff',
            borderColor: '#e7edf5'
          }}>
            <img 
              src="https://cdn.abacus.ai/images/954a6c19-9fc9-4529-b334-41a40365f830.png" 
              alt="Free and independent guidance" 
              className="rounded-xl border shadow-sm w-full mb-4"
              style={{
                borderColor: '#dfe6ed',
                background: '#fff',
                boxShadow: '0 10px 20px rgba(0,0,0,0.04)'
              }}
            />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
              3) 100% Free, Independent, Transparent
            </h3>
            <p className="mb-2" style={{ color: '#566273' }}>
              <strong>Completely free for families.</strong> No hidden costs, no obligation.
            </p>
            <p style={{ color: '#566273' }}>
              We explain funding, entitlements, and key changes to the <strong>Support at Home program</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


