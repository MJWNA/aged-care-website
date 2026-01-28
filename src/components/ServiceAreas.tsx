import { MapPin } from 'lucide-react';

export default function ServiceAreas() {
  const areas = [
    { state: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'] },
    { state: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'] },
    { state: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville'] },
    { state: 'South Australia', cities: ['Adelaide', 'Mount Gambier'] },
    { state: 'Western Australia', cities: ['Perth', 'Mandurah'] },
    { state: 'Tasmania', cities: ['Hobart', 'Launceston'] },
    { state: 'Australian Capital Territory', cities: ['Canberra'] },
    { state: 'Northern Territory', cities: ['Darwin'] }
  ];

  return (
    <section className="py-16 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6" style={{ color: '#f4b400' }} />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#f4b400' }}>
              Nationwide Coverage
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            We Serve Families Across All of Australia
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            No matter where you are, we connect you with trusted aged care providers in your local area
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg"
              style={{ 
                background: '#ffffff',
                borderColor: '#e2e8f0'
              }}
            >
              <h3 className="font-bold text-lg mb-3" style={{ color: '#0f1f2e' }}>
                {area.state}
              </h3>
              <ul className="space-y-2">
                {area.cities.map((city, cityIdx) => (
                  <li key={cityIdx} className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f4b400' }} />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-semibold mb-4" style={{ color: '#0f1f2e' }}>
            Can't find your area? We're expanding our network daily.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:brightness-95"
            style={{
              background: '#f4b400',
              color: '#0f1f2e'
            }}
          >
            Contact Us About Your Location
          </a>
        </div>
      </div>
    </section>
  );
}
