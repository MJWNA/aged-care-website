export default function ResourcesSection() {
  const resources = [
    {
      icon: '📋',
      title: 'Provider Comparison Checklist',
      description: 'Essential questions to ask before choosing your aged care provider',
      type: 'PDF Download',
      color: '#0f4c75'
    },
    {
      icon: '📖',
      title: 'Aged Care Glossary',
      description: 'Plain English explanations of confusing aged care terms',
      type: 'Quick Reference',
      color: '#f4b400'
    },
    {
      icon: '💰',
      title: 'Cost Calculator Guide',
      description: 'Understand what you might pay based on your income and assets',
      type: 'Interactive Tool',
      color: '#0f4c75'
    },
    {
      icon: '🎯',
      title: 'Assessment Preparation Guide',
      description: 'How to prepare for your aged care assessment',
      type: 'Step-by-Step',
      color: '#f4b400'
    }
  ];

  return (
    <section className="py-16" style={{ background: '#f6f8fb' }}>
      <div className="container max-w-[1180px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f4c75' }}>
            Free Resources & Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to make an informed decision about aged care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl"
                style={{ background: `${resource.color}20` }}
              >
                {resource.icon}
              </div>
              <div className="text-xs font-semibold mb-2 uppercase" style={{ color: resource.color }}>
                {resource.type}
              </div>
              <h3 className="font-bold mb-2 text-lg" style={{ color: '#0f4c75' }}>
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {resource.description}
              </p>
              <button 
                className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                style={{ color: resource.color }}
              >
                Download Free →
              </button>
            </div>
          ))}
        </div>

        {/* Blog Preview Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: '#0f4c75' }}>
            Latest Aged Care Updates & Tips
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-6xl">📅</span>
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold mb-2" style={{ color: '#f4b400' }}>
                  JANUARY 2026
                </div>
                <h4 className="font-bold mb-2 text-lg" style={{ color: '#0f4c75' }}>
                  What Changed in Aged Care on 1 November 2025?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  A complete breakdown of the new Support at Home program and what it means for you.
                </p>
                <a href="#" className="text-sm font-semibold" style={{ color: '#0f4c75' }}>
                  Read More →
                </a>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <span className="text-6xl">💡</span>
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold mb-2" style={{ color: '#f4b400' }}>
                  GUIDE
                </div>
                <h4 className="font-bold mb-2 text-lg" style={{ color: '#0f4c75' }}>
                  How to Switch Aged Care Providers in 2026
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step guide to changing providers under the new system.
                </p>
                <a href="#" className="text-sm font-semibold" style={{ color: '#0f4c75' }}>
                  Read More →
                </a>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <span className="text-6xl">🌏</span>
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold mb-2" style={{ color: '#f4b400' }}>
                  CULTURAL CARE
                </div>
                <h4 className="font-bold mb-2 text-lg" style={{ color: '#0f4c75' }}>
                  Finding Culturally Appropriate Aged Care
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Language, food, and cultural considerations when choosing a provider.
                </p>
                <a href="#" className="text-sm font-semibold" style={{ color: '#0f4c75' }}>
                  Read More →
                </a>
              </div>
            </article>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border-2" style={{ borderColor: '#f4b400' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">📬</div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#0f4c75' }}>
              Stay Updated on Aged Care Changes
            </h3>
            <p className="text-gray-600 mb-6">
              Get monthly tips, updates, and guidance delivered to your inbox. No spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#f4b400]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all hover:brightness-95"
                style={{ background: '#f4b400', color: '#0f1f2e' }}
              >
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
