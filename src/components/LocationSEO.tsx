import { MapPin } from 'lucide-react';

export default function LocationSEO() {
  const locations = [
    { city: 'Sydney', state: 'NSW', providers: '45+' },
    { city: 'Melbourne', state: 'VIC', providers: '38+' },
    { city: 'Brisbane', state: 'QLD', providers: '32+' },
    { city: 'Perth', state: 'WA', providers: '28+' },
    { city: 'Adelaide', state: 'SA', providers: '24+' },
    { city: 'Gold Coast', state: 'QLD', providers: '18+' },
    { city: 'Canberra', state: 'ACT', providers: '15+' },
    { city: 'Newcastle', state: 'NSW', providers: '12+' },
    { city: 'Wollongong', state: 'NSW', providers: '10+' },
    { city: 'Hobart', state: 'TAS', providers: '8+' },
    { city: 'Darwin', state: 'NT', providers: '6+' },
    { city: 'Regional Areas', state: 'All States', providers: '50+' }
  ];

  return (
    <section className="py-16 px-4" style={{ background: '#f7f9fb' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            Aged Care Providers Across Australia
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#718096' }}>
            We connect families with quality aged care providers in every major city and regional area across Australia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations.map((location, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
              style={{ 
                background: '#ffffff',
                borderColor: 'rgba(74, 124, 158, 0.2)'
              }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#4a7c9e' }} />
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#0f1f2e' }}>
                    {location.city}, {location.state}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: '#f4b400' }}>
                    {location.providers} Providers
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6" style={{ color: '#2d3748' }}>
            <strong>Can't find your area?</strong> We work with providers nationwide, including regional and remote areas.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:brightness-95"
            style={{ background: '#4a7c9e', color: '#ffffff' }}
          >
            <MapPin className="w-5 h-5" />
            Find Providers in Your Area
          </a>
        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
                Aged Care Providers in Major Cities
              </h3>
              <p style={{ color: '#718096' }}>
                Whether you're looking for aged care providers in Sydney, Melbourne, Brisbane, or any other major Australian city, 
                our extensive network of 150+ quality providers ensures you'll find the perfect match for your loved one's needs. 
                We specialize in connecting families with trusted home care packages, Support at Home services, and residential 
                aged care facilities across all metropolitan areas.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
                Regional & Remote Aged Care Support
              </h3>
              <p style={{ color: '#718096' }}>
                Living in a regional or remote area shouldn't limit your aged care options. We work with providers who service 
                rural and regional Australia, ensuring families outside major cities have access to quality home care, respite care, 
                and aged care services. Our team understands the unique challenges of regional aged care and can help you find 
                providers who specialize in your area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
