import { Download } from 'lucide-react';

interface QRCodeProps {
  size?: number;
  showDownload?: boolean;
  className?: string;
}

export default function QRCode({ 
  size = 300, 
  showDownload = true,
  className = '' 
}: QRCodeProps) {
  const websiteUrl = 'https://agedcareinformation.com.au/';
  
  // Using QR Server API - free and reliable
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(websiteUrl)}&format=png&margin=10`;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'agedcareinformation-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div 
        className="rounded-2xl p-6 shadow-lg"
        style={{ background: '#ffffff' }}
      >
        <img
          src={qrCodeUrl}
          alt="QR Code for Aged Care Information website"
          width={size}
          height={size}
          className="rounded-lg"
          style={{ 
            border: '4px solid #4a7c9e',
            borderRadius: '12px'
          }}
        />
      </div>
      
      <div className="text-center">
        <p className="font-bold text-lg mb-1" style={{ color: '#0f1f2e' }}>
          Scan to Visit Our Website
        </p>
        <p className="text-sm" style={{ color: '#64748b' }}>
          agedcareinformation.com.au
        </p>
      </div>

      {showDownload && (
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all hover:brightness-95"
          style={{
            background: '#4a7c9e',
            color: '#ffffff'
          }}
        >
          <Download className="w-5 h-5" />
          Download QR Code
        </button>
      )}

      <div 
        className="max-w-md text-center p-4 rounded-lg"
        style={{ background: '#f7f9fb' }}
      >
        <p className="text-sm" style={{ color: '#64748b' }}>
          💡 <strong>Use this QR code on:</strong>
        </p>
        <ul className="text-sm mt-2 space-y-1" style={{ color: '#64748b' }}>
          <li>• Business cards</li>
          <li>• Flyers & brochures</li>
          <li>• Posters at aged care facilities</li>
          <li>• Email signatures</li>
          <li>• Social media posts</li>
        </ul>
      </div>
    </div>
  );
}
