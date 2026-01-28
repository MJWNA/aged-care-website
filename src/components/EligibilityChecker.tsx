import { useState } from 'react';

export default function EligibilityChecker() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: '',
    situation: '',
    location: '',
    urgency: ''
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (question: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ age: '', situation: '', location: '', urgency: '' });
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto border-2" style={{ borderColor: '#f4b400' }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f4b400' }}>
            <span className="text-3xl">✓</span>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#0f4c75' }}>Great News! You Likely Qualify</h3>
          <p className="text-gray-600">Based on your answers, we can help you find the perfect aged care provider.</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-bold mb-3" style={{ color: '#0f4c75' }}>Your Next Steps:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span style={{ color: '#d4910d' }}>1.</span>
              <span>Call us now for a free consultation: <strong>1800 303 101</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#d4910d' }}>2.</span>
              <span>We'll discuss your specific needs and situation</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#d4910d' }}>3.</span>
              <span>Get your personalized provider shortlist in 24-48 hours</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
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
          onClick={resetQuiz}
          className="block mx-auto mt-4 text-sm underline text-gray-500 hover:text-gray-700"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold" style={{ color: '#0f4c75' }}>Quick Eligibility Check</h3>
          <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: '#f4b400', color: '#0f1f2e' }}>
            Step {step} of 4
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              background: '#f4b400',
              width: `${(step / 4) * 100}%`
            }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">What's your situation?</h4>
          <button
            onClick={() => handleAnswer('situation', 'new')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">🆕 New to aged care</span>
            <span className="text-sm text-gray-600">Just starting to explore options</span>
          </button>
          <button
            onClick={() => handleAnswer('situation', 'existing')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">🔄 Already receiving care</span>
            <span className="text-sm text-gray-600">Want to switch providers</span>
          </button>
          <button
            onClick={() => handleAnswer('situation', 'exploring')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">🔍 Just exploring</span>
            <span className="text-sm text-gray-600">Researching for the future</span>
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">What's the age of the person needing care?</h4>
          <button
            onClick={() => handleAnswer('age', '65+')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold">65 years or older</span>
          </button>
          <button
            onClick={() => handleAnswer('age', '50-64-indigenous')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold">50-64 years (Aboriginal or Torres Strait Islander)</span>
          </button>
          <button
            onClick={() => handleAnswer('age', 'under-50')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold">Under 50 years</span>
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">Where are you located?</h4>
          <button
            onClick={() => handleAnswer('location', 'metro')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold">Metropolitan area (Sydney, Melbourne, Brisbane, etc.)</span>
          </button>
          <button
            onClick={() => handleAnswer('location', 'regional')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold">Regional area</span>
          </button>
          <button
            onClick={() => handleAnswer('location', 'remote')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold">Remote area</span>
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">How soon do you need help?</h4>
          <button
            onClick={() => handleAnswer('urgency', 'urgent')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">🚨 Urgent - Within 1 week</span>
            <span className="text-sm text-gray-600">Need immediate assistance</span>
          </button>
          <button
            onClick={() => handleAnswer('urgency', 'soon')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">⏰ Soon - Within 1 month</span>
            <span className="text-sm text-gray-600">Planning ahead</span>
          </button>
          <button
            onClick={() => handleAnswer('urgency', 'planning')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">📅 Planning - 1-3 months</span>
            <span className="text-sm text-gray-600">Getting organized</span>
          </button>
          <button
            onClick={() => handleAnswer('urgency', 'future')}
            className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e0e0e0' }}
          >
            <span className="font-semibold block mb-1">🔮 Future - 3+ months</span>
            <span className="text-sm text-gray-600">Researching options</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setStep(Math.max(1, step - 1))}
        className="mt-6 text-sm underline text-gray-500 hover:text-gray-700"
      >
        ← Back
      </button>
    </div>
  );
}
