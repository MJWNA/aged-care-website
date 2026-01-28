export default function FooterSection() {
  return (
    <footer style={{ background: '#1b262c' }} className="text-white py-12">
      <div className="container max-w-[1180px] mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#f4b400' }}>
              Aged Care Complete
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Helping Australian families find the perfect aged care provider since 2023. 
              100% free, independent service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: '#f4b400', color: '#0f1f2e' }}>
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#f4b400' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#why-trust-us" className="text-gray-300 hover:text-white transition-colors">Why Trust Us</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#f4b400' }}>
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#download-guide" className="text-gray-300 hover:text-white transition-colors">Free 2026 Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Provider Checklist</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cost Calculator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog & Updates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Aged Care Glossary</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: '#f4b400' }}>
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <div>
                  <div className="text-gray-400">Phone</div>
                  <a href="tel:1800303101" className="text-white font-semibold hover:text-[#f4b400] transition-colors">
                    1800 303 101
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <div>
                  <div className="text-gray-400">Email</div>
                  <a href="mailto:info@agedcarecomplete.com.au" className="text-white hover:text-[#f4b400] transition-colors">
                    info@agedcarecomplete.com.au
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>⏰</span>
                <div>
                  <div className="text-gray-400">Hours</div>
                  <div className="text-white">Mon-Fri: 9am - 5pm AEST</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2026 Aged Care Complete. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong>Disclaimer:</strong> Aged Care Complete is an independent aged care referral service. 
              We are not affiliated with any government agency or aged care provider. We receive referral fees 
              from providers when you choose their services, at no cost to you.
            </p>
            <p>
              All information provided is general in nature. For specific advice regarding your aged care situation, 
              please consult with qualified healthcare professionals or contact My Aged Care on 1800 200 422.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 items-center">
          <div className="px-4 py-2 bg-white/10 rounded-lg text-xs flex items-center gap-2">
            <span>🔒</span>
            <span>SSL Secure</span>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-lg text-xs flex items-center gap-2">
            <span>🇦🇺</span>
            <span>Australian Owned</span>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-lg text-xs flex items-center gap-2">
            <span>✓</span>
            <span>Privacy Compliant</span>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-lg text-xs flex items-center gap-2">
            <span>⭐</span>
            <span>1,000+ Families Helped</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
