import { useState } from 'react';

export default function ComparisonTool() {
  const [answers, setAnswers] = useState({
    careLevel: '',
    culturalNeeds: '',
    budget: '',
    specialNeeds: ''
  });
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const resetTool = () => {
    setAnswers({ careLevel: '', culturalNeeds: '', budget: '', specialNeeds: '' });
    setShowResults(false);
  };

  if (showResults) {
    return (
      <section className="py-16 bg-white">
        <div className="container max-w-[900px] mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2" style={{ borderColor: '#f4b400' }}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f4b400' }}>
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#0f4c75' }}>
                Here's What You Should Look For
              </h3>
              <p className="text-gray-600">
                Based on your needs, here are the key factors to consider
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <h4 className="font-bold mb-4" style={{ color: '#0f4c75' }}>Your Personalized Checklist:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <div>
                    <div className="font-semibold">Care Level Match</div>
                    <div className="text-sm text-gray-600">
                      Ensure provider can deliver {answers.careLevel} support
                    </div>
                  </div>
                </div>
                
                {answers.culturalNeeds !== 'none' && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span style={{ color: '#f4b400' }}>✓</span>
                    <div>
                      <div className="font-semibold">Cultural & Language Support</div>
                      <div className="text-sm text-gray-600">
                        Ask about {answers.culturalNeeds} speaking staff and culturally appropriate care
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <div>
                    <div className="font-semibold">Transparent Pricing</div>
                    <div className="text-sm text-gray-600">
                      Get a clear breakdown of all costs with no hidden fees
                    </div>
                  </div>
                </div>

                {answers.specialNeeds && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span style={{ color: '#f4b400' }}>✓</span>
                    <div>
                      <div className="font-semibold">Specialized Care</div>
                      <div className="text-sm text-gray-600">
                        Verify experience with {answers.specialNeeds}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <div>
                    <div className="font-semibold">Staff Qualifications</div>
                    <div className="text-sm text-gray-600">
                      Ask about staff training, turnover rates, and background checks
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span style={{ color: '#f4b400' }}>✓</span>
                  <div>
                    <div className="font-semibold">Flexibility & Responsiveness</div>
                    <div className="text-sm text-gray-600">
                      How quickly do they respond to changes in care needs?
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <h4 className="font-bold mb-3" style={{ color: '#0f4c75' }}>
                🚨 Red Flags to Watch For:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span>Pressure to sign immediately without time to review</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span>Unclear or confusing fee structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span>Won't provide references from current clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span>High staff turnover or unfilled care shifts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span>Dismissive of your questions or concerns</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Want us to find pre-vetted providers that match these criteria?
              </p>
              <div className="flex gap-3 justify-center flex-wrap mb-4">
                <a 
                  href="tel:1800303101"
                  className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:brightness-95"
                  style={{ background: '#f4b400', color: '#0f1f2e' }}
                >
                  📞 Call Now: 1800 303 101
                </a>
                <a 
                  href="#contact"
                  className="px-6 py-3 rounded-lg font-bold border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: '#f4b400', color: '#0f4c75' }}
                >
                  Request Callback
                </a>
              </div>
              <button
                onClick={resetTool}
                className="text-sm underline text-gray-500 hover:text-gray-700"
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-[900px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f4c75' }}>
            Provider Comparison Tool
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few questions to get a personalized checklist of what to look for
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border-2" style={{ borderColor: '#f4b400' }}>
          {/* Question 1 */}
          <div className="mb-8">
            <label className="block font-bold mb-4" style={{ color: '#0f4c75' }}>
              1. What level of care is needed?
            </label>
            <div className="space-y-3">
              {[
                { value: 'basic', label: 'Basic Support', desc: 'Help with household tasks, shopping, transport' },
                { value: 'moderate', label: 'Moderate Support', desc: 'Personal care, medication management, some nursing' },
                { value: 'high', label: 'High Support', desc: 'Complex health needs, 24/7 monitoring' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers.careLevel === option.value ? 'border-[#f4b400] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="careLevel"
                    value={option.value}
                    checked={answers.careLevel === option.value}
                    onChange={(e) => setAnswers({ ...answers, careLevel: e.target.value })}
                    required
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-8">
            <label className="block font-bold mb-4" style={{ color: '#0f4c75' }}>
              2. Are there any cultural or language preferences?
            </label>
            <div className="space-y-3">
              {[
                { value: 'none', label: 'No specific requirements' },
                { value: 'other', label: 'Other language/cultural needs' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers.culturalNeeds === option.value ? 'border-[#f4b400] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="culturalNeeds"
                    value={option.value}
                    checked={answers.culturalNeeds === option.value}
                    onChange={(e) => setAnswers({ ...answers, culturalNeeds: e.target.value })}
                    required
                  />
                  <div className="font-semibold">{option.label}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="mb-8">
            <label className="block font-bold mb-4" style={{ color: '#0f4c75' }}>
              3. Are there any special care needs?
            </label>
            <input
              type="text"
              value={answers.specialNeeds}
              onChange={(e) => setAnswers({ ...answers, specialNeeds: e.target.value })}
              placeholder="E.g., dementia care, palliative care, diabetes management (optional)"
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#f4b400] transition-colors"
            />
            <p className="text-sm text-gray-500 mt-2">Leave blank if not applicable</p>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:brightness-95"
            style={{ background: '#f4b400', color: '#0f1f2e' }}
          >
            Get My Personalized Checklist →
          </button>
        </form>
      </div>
    </section>
  );
}
