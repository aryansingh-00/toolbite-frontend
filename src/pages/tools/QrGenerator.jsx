import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Link as LinkIcon, Type, Mail, User, Shield, Share2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const QrGenerator = () => {
  const [input, setInput] = useState('https://toolbite.in');
  const [qrType, setQrType] = useState('url');
  const [color, setColor] = useState('#0d9488'); // teal-600
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrImage, setQrImage] = useState('');
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(input, {
        width: 1000,
        margin: 2,
        color: {
          dark: color,
          light: bgColor
        }
      });
      setQrImage(url);
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate QR code');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [input, color, bgColor]);

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = `toolbite-qr-${Date.now()}.png`;
    link.href = qrImage;
    link.click();
    toast.success('QR Code downloaded!');
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create custom, high-resolution QR codes for websites, text, or emails. Fully customizable colors and instant download."
      keywords="qr code generator, qr creator, barcode generator, custom qr code, download qr"
      icon={QrCode}
      category="Marketing"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Step 1: Input & Options */}
        <div className="space-y-8">
          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 overflow-x-auto no-scrollbar">
            <TypeButton label="URL" active={qrType === 'url'} onClick={() => setQrType('url')} icon={LinkIcon} />
            <TypeButton label="Text" active={qrType === 'text'} onClick={() => setQrType('text')} icon={Type} />
            <TypeButton label="Email" active={qrType === 'email'} onClick={() => setQrType('email')} icon={Mail} />
            <TypeButton label="vCard" active={qrType === 'vcard'} onClick={() => setQrType('vcard')} icon={User} />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">
              {qrType === 'url' ? 'Website URL' : qrType === 'email' ? 'Email Address' : 'Your Content'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={qrType === 'url' ? 'https://example.com' : 'Type your text here...'}
              className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-medium min-h-[140px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">QR Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                />
                <span className="font-mono text-sm font-bold text-slate-600 uppercase">{color}</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Background</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                />
                <span className="font-mono text-sm font-bold text-slate-600 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Preview & Actions */}
        <div className="flex flex-col items-center justify-center space-y-8 bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 p-6 bg-white rounded-3xl shadow-2xl transform transition-transform group-hover:scale-105 duration-500">
            {qrImage ? (
              <img src={qrImage} alt="QR Code Preview" className="w-64 h-64 rounded-xl" />
            ) : (
              <div className="w-64 h-64 bg-slate-50 flex items-center justify-center rounded-xl animate-pulse">
                <QrCode size={48} className="text-slate-200" />
              </div>
            )}
          </div>

          <div className="relative z-10 w-full space-y-4">
            <button
              onClick={downloadQR}
              className="w-full py-5 bg-teal-600 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-teal-500/30 hover:bg-teal-500 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Download size={22} />
              Download PNG
            </button>
            <p className="text-center text-slate-400 text-sm font-medium">
              High resolution (1000x1000 px)
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

const TypeButton = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${active ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
  >
    <Icon size={18} />
    {label}
  </button>
);

export default QrGenerator;
