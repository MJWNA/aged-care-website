export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Story */}
          <div className="mb-12">
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ background: '#fff4e6', color: '#0f4c75' }}>
              <span className="font-bold">OUR STORY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0f4c75' }}>
              Why We Do What We Do
            </h2>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4">
                We started this service after watching our own families struggle to navigate 
                the complex aged care system. We saw firsthand how overwhelming it can be to 
                choose the right provider when you're already dealing with so much.
              </p>
              <p className="text-gray-700 mb-4">
                That's why we created a completely free, independent service that puts families 
                first. We don't work for any providers—we work for you.
              </p>
              <p className="text-gray-700 mb-6">
                Since 2023, we've helped over 1,000 Australian families find quality aged care 
                providers that match their unique needs, language preferences, and budgets.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-l-4" style={{ borderColor: '#f4b400' }}>
              <h3 className="font-bold mb-3" style={{ color: '#0f4c75' }}>Our Promise to You:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <span className="text-gray-700">100% free service—always</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <span className="text-gray-700">Completely independent advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <span className="text-gray-700">No pressure, just honest guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <span className="text-gray-700">Your privacy is protected</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




