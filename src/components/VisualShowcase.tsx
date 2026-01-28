export default function VisualShowcase() {
  const careScenes = [
    {
      title: 'In-Home Care',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop',
      description: 'Compassionate care in the comfort of home'
    },
    {
      title: 'Medical Support',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop',
      description: 'Professional medical assistance when needed'
    },
    {
      title: 'Social Connection',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&auto=format&fit=crop',
      description: 'Maintaining independence and dignity'
    }
  ];

  return (
    <section className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-[1180px] mx-auto">
        {/* Care Scenes */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Quality Care in Every Moment
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#64748b' }}>
            Real care from providers we've personally vetted and trust
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {careScenes.map((scene, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(74, 124, 158, 0.8), transparent)' }}
                />
              </div>
              <div className="p-6" style={{ background: '#f7f9fb' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1f2e' }}>
                  {scene.title}
                </h3>
                <p style={{ color: '#64748b' }}>
                  {scene.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Statement with Image */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-xl" style={{ background: '#f7f9fb' }}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
                Every Family Deserves Quality Care
              </h3>
              <p className="text-lg mb-6" style={{ color: '#64748b' }}>
                We understand how overwhelming aged care decisions can be. That's why we're here—to guide you every step of the way with honest, independent advice.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#4a7c9e' }}>
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#0f1f2e' }}>No pressure, just honest guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#4a7c9e' }}>
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#0f1f2e' }}>100% free for families</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#4a7c9e' }}>
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#0f1f2e' }}>Same day responses</span>
                </div>
              </div>
            </div>
            <div className="relative h-80 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop"
                alt="Happy senior receiving care"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

