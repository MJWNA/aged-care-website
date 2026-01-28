import { Phone, Clock } from 'lucide-react';

export default function TopBar() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-sm border-b"
      style={{ 
        background: '#0f1f2e',
        borderColor: 'rgba(255,255,255,0.1)'
      }}
    >
      <div className="max-w-[1180px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2" style={{ color: '#ffffff' }}>
          <Clock className="w-4 h-4" style={{ color: '#f4b400' }} />
          <span className="font-medium">Mon-Fri 9am-5pm AEST</span>
        </div>
        
        <a 
          href="tel:1800303101"
          className="flex items-center gap-2 font-bold transition-colors hover:opacity-80"
          style={{ color: '#ffffff' }}
        >
          <Phone className="w-4 h-4" style={{ color: '#f4b400' }} />
          Need Support? Call <span style={{ color: '#f4b400' }}>1800 303 101</span>
        </a>
      </div>
    </div>
  );
}


