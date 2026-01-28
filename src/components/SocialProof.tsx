import { useState, useEffect } from 'react';

const recentActivity = [
  { name: 'Sarah M.', location: 'Melbourne, VIC', action: 'booked a consultation', time: '2 min ago' },
  { name: 'John K.', location: 'Sydney, NSW', action: 'booked a consultation', time: '5 min ago' },
  { name: 'Linda P.', location: 'Brisbane, QLD', action: 'booked a consultation', time: '8 min ago' },
  { name: 'Michael T.', location: 'Perth, WA', action: 'booked a consultation', time: '12 min ago' },
  { name: 'Emma R.', location: 'Adelaide, SA', action: 'booked a consultation', time: '15 min ago' },
];

const stats = [
  { number: '2,847', label: 'Families Helped', subtext: 'Across all of Australia' },
  { number: '2.3 Days', label: 'Average Match Time', subtext: 'From enquiry to provider contact' },
  { number: '$340/mo', label: 'Average Savings', subtext: 'Compared to first quote' },
  { number: '98%', label: 'Satisfaction Rate', subtext: 'Would recommend our service' },
  { number: '150+', label: 'Provider Network', subtext: 'Trusted aged care providers' }
];

export default function SocialProof() {
  return (
    <section className="hidden md:block py-6 md:py-8" style={{ background: '#f7f9fb' }}>
      {/* Floating notification */}
      <div className="fixed bottom-6 left-6 z-50 max-w-sm hidden md:block">
        <div 
          className={`bg-white rounded-lg shadow-2xl p-4 border-l-4 transition-all duration-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
          style={{ borderColor: '#f4b400' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f4b400' }}>
              <span className="text-lg">👤</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm" style={{ color: '#0f4c75' }}>
                {current.name} from {current.location}
              </div>
              <div className="text-xs text-gray-600">
                {current.action}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {current.time}
              </div>
            </div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f4b400' }} />
          </div>
        </div>
      </div>

      {/* Stats section with urgency */}
      <section className="py-8" style={{ background: '#fff4e6', borderTop: '2px solid #f4b400', borderBottom: '2px solid #f4b400' }}>
        <div className="container max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🔥</span>
              <div className="text-left">
                <div className="text-2xl font-bold" style={{ color: '#0f4c75' }}>47</div>
                <div className="text-sm text-gray-600">Families helped this week</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">✓</span>
              <div className="text-left">
                <div className="text-2xl font-bold" style={{ color: '#0f4c75' }}>100%</div>
                <div className="text-sm text-gray-600">Free Aged Care Check</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">⭐</span>
              <div className="text-left">
                <div className="text-2xl font-bold" style={{ color: '#0f4c75' }}>4.9/5</div>
                <div className="text-sm text-gray-600">Average satisfaction rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

