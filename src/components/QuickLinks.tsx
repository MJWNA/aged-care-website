export default function QuickLinks() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white rounded-2xl shadow-2xl p-3 space-y-2 border-2" style={{ borderColor: '#f4b400' }}>
        {/* Phone */}
        <a
          href="tel:1800303101"
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative"
          style={{ background: '#f4b400' }}
          title="Call Us"
        >
          <span className="text-2xl">📞</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            1800 303 101
          </div>
        </a>

        {/* SMS */}
        <a
          href="sms:1800303101"
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-gray-100 hover:bg-gray-200"
          title="Send SMS"
        >
          <span className="text-2xl">💬</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Text Us
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/61451304430"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-green-500 hover:bg-green-600"
          title="WhatsApp"
        >
          <span className="text-2xl">📱</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp
          </div>
        </a>

        {/* Email */}
        <a
          href="#lead-form"
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-gray-100 hover:bg-gray-200"
          title="Email Us"
        >
          <span className="text-2xl">✉️</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Contact Form
          </div>
        </a>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-2" />

        {/* Navigation Links */}
        <button
          onClick={() => scrollToSection('how')}
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-gray-100 hover:bg-gray-200"
          title="How It Works"
        >
          <span className="text-2xl">🔧</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            How It Works
          </div>
        </button>

        <button
          onClick={() => scrollToSection('why')}
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-gray-100 hover:bg-gray-200"
          title="Why Trust Us"
        >
          <span className="text-2xl">✅</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Why Trust Us
          </div>
        </button>

        <button
          onClick={() => scrollToSection('testimonials')}
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-gray-100 hover:bg-gray-200"
          title="Testimonials"
        >
          <span className="text-2xl">⭐</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Testimonials
          </div>
        </button>

        <button
          onClick={() => scrollToSection('faq')}
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative bg-gray-100 hover:bg-gray-200"
          title="FAQ"
        >
          <span className="text-2xl">❓</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            FAQ
          </div>
        </button>

        <button
          onClick={() => scrollToSection('lead-form')}
          className="flex items-center justify-center w-14 h-14 rounded-xl transition-all hover:scale-110 group relative"
          style={{ background: '#0f4c75' }}
          title="Contact"
        >
          <span className="text-2xl">📬</span>
          <div className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Contact
          </div>
        </button>
      </div>
    </div>
  );
}


