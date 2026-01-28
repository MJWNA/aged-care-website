
import { Home, Building2, Calendar, Heart, Users, Clock, Phone } from 'lucide-react';

export default function ServiceTypes() {
  const services = [
    {
      icon: Home,
      title: 'Home Care Packages',
      description: 'Support at Home services to help you live independently in your own home',
      features: ['Personal care', 'Domestic assistance', 'Nursing care', 'Allied health'],
      popular: true
    },
    {
      icon: Building2,
      title: 'Residential Aged Care',
      description: 'Find quality aged care homes with available beds near you',
      features: ['24/7 nursing care', 'Meals & accommodation', 'Social activities', 'Dementia care'],
      popular: false
    },
    {
      icon: Calendar,
      title: 'Respite Care',
      description: 'Short-term care options to give family carers a well-deserved break',
      features: ['Emergency respite', 'Planned breaks', 'In-home or facility', 'Flexible duration'],
      popular: false
    },
    {
      icon: Heart,
      title: 'Dementia Care',
      description: 'Specialized care for people living with dementia and memory conditions',
      features: ['Memory support', 'Secure environments', 'Specialized staff', 'Family support'],
      popular: false
    },
    {
      icon: Users,
      title: 'Day Programs',
      description: 'Social and therapeutic programs during the day while living at home',
      features: ['Social activities', 'Transport included', 'Hot meals', 'Respite for carers'],
      popular: false
    },
    {
      icon: Clock,
      title: 'Transitional Care',
      description: 'Short-term care after a hospital stay to help recovery',
      features: ['Post-hospital support', 'Rehabilitation', 'Recovery focused', 'Time-limited'],
      popular: false
    }
  ];

  return (
    <section className="py-20 px-4" style={{ background: '#ffffff' }}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold" style={{ background: '#fff3cd', color: '#856404' }}>
            All Care Types Covered
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f2e' }}>
            What Type of Care Are You Looking For?
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#718096' }}>
            We connect you with the right providers for every type of aged care service across Australia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
                style={{
                  background: '#ffffff',
                  borderColor: service.popular ? '#f4b400' : 'rgba(74, 124, 158, 0.2)'
                }}
              >
                {service.popular && (
                  <div 
                    className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: '#f4b400', color: '#0f1f2e' }}
                  >
                    Most Popular
                  </div>
                )}
                
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(74, 124, 158, 0.1)' }}
                >
                  <Icon className="w-7 h-7" style={{ color: '#4a7c9e' }} />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: '#0f1f2e' }}>
                  {service.title}
                </h3>

                <p className="mb-4 leading-relaxed" style={{ color: '#718096' }}>
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm" style={{ color: '#2d3748' }}>
                      <span style={{ color: '#f4b400' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-bold transition-all duration-200 hover:brightness-95"
                  style={{
                    background: service.popular ? '#4a7c9e' : 'rgba(74, 124, 158, 0.1)',
                    color: service.popular ? '#ffffff' : '#4a7c9e'
                  }}
                >
                  Find {service.title.split(' ')[0]} Providers
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6" style={{ color: '#2d3748' }}>
            <strong>Not sure which service you need?</strong> Our team can help you understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1800303101"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:brightness-95"
              style={{ background: '#f4b400', color: '#0f1f2e' }}
            >
              <Phone className="w-5 h-5" />
              Call for Free Advice
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-200 hover:brightness-95"
              style={{ 
                background: 'transparent', 
                color: '#4a7c9e',
                borderColor: '#4a7c9e'
              }}
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


