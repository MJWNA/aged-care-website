import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Replace with your actual WhatsApp business number (format: country code + number, no spaces or symbols)
  const whatsappNumber = '61451304430'; // Australian number format
  const message = encodeURIComponent('Hi, I need help finding aged care for my family. Can you help me?');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" style={{ color: '#ffffff' }} />
      
      {/* Tooltip */}
      {isHovered && (
        <div
          className="absolute right-16 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold"
          style={{
            background: '#0f1f2e',
            color: '#ffffff'
          }}
        >
          Chat on WhatsApp
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rotate-45"
            style={{ background: '#0f1f2e' }}
          />
        </div>
      )}

      {/* Pulse animation */}
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          background: '#25D366',
          opacity: 0.4
        }}
      />
    </a>
  );
}
