import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Margaret Thompson',
      location: 'Sydney, NSW',
      avatar: '👵',
      rating: 5,
      text: "Jack was absolutely wonderful. After my stroke, I was overwhelmed and didn't know where to start. He patiently explained all my options and found me a provider within 48 hours. The care workers he matched me with are like family now.",
      situation: "Post-stroke recovery care"
    },
    {
      name: 'David & Helen Chen',
      location: 'Melbourne, VIC',
      avatar: '👴👵',
      rating: 5,
      text: "Jessica took the time to really understand Dad's needs. We were so confused about the care options, but she explained everything in plain English and found three perfect providers in our area. No pressure, just genuine help. We can't thank her enough.",
      situation: "First-time aged care seekers"
    },
    {
      name: 'Robert Mitchell',
      location: 'Brisbane, QLD',
      avatar: '👨',
      rating: 5,
      text: "Jack helped us switch providers after our previous one kept increasing fees without notice. Within a week, we had a better provider who's completely transparent about costs. Jack even followed up to make sure we were happy. Wish we'd called him sooner!",
      situation: "Switched providers"
    }
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20" style={{ background: '#ffffff' }}>
      <div className="container max-w-[1180px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4" style={{ color: '#0f4c75' }}>
            What Families Are Saying
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#718096' }}>
            Real stories from Australian families we've helped
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <div 
              key={index} 
              className="md:hidden p-4 md:p-6 rounded-xl shadow-lg border transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#f4b400' }} />
                    ))}
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: '#0f1f2e' }}>
                    {testimonial.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="hidden md:block p-4 md:p-6 rounded-xl shadow-lg border transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#f4b400' }} />
                    ))}
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: '#0f1f2e' }}>
                    {testimonial.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}








