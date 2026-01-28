export default function AwardsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-[1180px] mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#0f4c75' }}>
            Recognized & Trusted
          </h3>
          <p className="text-gray-600">
            Industry recognition and professional memberships
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Award 1 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-3">🏆</div>
            <div className="font-bold text-sm mb-1" style={{ color: '#0f4c75' }}>
              Best Aged Care Service
            </div>
            <div className="text-xs text-gray-500">2025 Excellence Awards</div>
          </div>

          {/* Certification 1 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-3">✓</div>
            <div className="font-bold text-sm mb-1" style={{ color: '#0f4c75' }}>
              Accredited Service
            </div>
            <div className="text-xs text-gray-500">Australian Standards</div>
          </div>

          {/* Association 1 */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-3">🤝</div>
            <div className="font-bold text-sm mb-1" style={{ color: '#0f4c75' }}>
              Member
            </div>
            <div className="text-xs text-gray-500">Aged Care Industry</div>
          </div>

          {/* Rating */}
          <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
            <div className="text-5xl mb-3">⭐</div>
            <div className="font-bold text-sm mb-1" style={{ color: '#0f4c75' }}>
              4.9/5 Rating
            </div>
            <div className="text-xs text-gray-500">1,000+ Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
