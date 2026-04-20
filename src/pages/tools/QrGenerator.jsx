import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Link as LinkIcon, Type, Mail, User, Clock, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';
import useToolHistory from '../../hooks/useToolHistory';

const QrGenerator = () => {
  const [input, setInput] = useState('https://toolbite.in');
  const [qrType, setQrType] = useState('url');
  const [color, setColor] = useState('#0d9488');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrImage, setQrImage] = useState('');
  const { history, addToHistory, clearHistory } = useToolHistory('qr-generator', 5);

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

  // Generate on mount or when specific options change
  useEffect(() => {
    const timeoutId = setTimeout(generateQRCode, 300);
    return () => clearTimeout(timeoutId);
  }, [input, color, bgColor]);

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = `toolbite-qr-${Date.now()}.png`;
    link.href = qrImage;
    link.click();
    toast.success('QR Code downloaded!');
    addToHistory({
      content: input.length > 40 ? input.slice(0, 40) + '...' : input,
      type: qrType,
      image: qrImage,
    });
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create custom, high-resolution QR codes for websites, text, or emails. Fully customizable colors and instant download."
      keywords="qr code generator, qr creator, barcode generator, custom qr code, download qr"
      icon={QrCode}
      category="Marketing"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Bridging the Physical and Digital Worlds</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Quick Response (QR) codes have evolved from a niche inventory tracking system into a fundamental marketing asset. By converting long, cumbersome URLs or text payloads into scannable visual matrix barcodes, brands can instantly connect offline audiences (from billboards, menus, or business cards) directly to high-converting online experiences without friction.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Creative Uses in Modern Marketing</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                QR deployment should be strategic. Consider these high-ROI implementations:
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>vCard Networking:</strong> Replace traditional business cards with a single QR code that instantly downloads your contact info into a client's phone.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Frictionless WiFi:</strong> Hospitality businesses can generate WiFi login QR codes, eliminating the need for guests to type complex passwords.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Lead Gen Forms:</strong> Place localized QR codes on direct mailers to track conversion rates of physical campaigns directly within Google Analytics.</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visual Customization & Scanning Science</h3>
              <p className="text-slate-600 leading-relaxed">
                While it's tempting to use light or low-contrast colors for your QR code to match brand guidelines, this usually results in scan failures. QR scanners rely on stark contrast between the "data modules" (the dark squares) and the "quiet zone" (the light background). A dark foreground (like deep teal, navy, or black) on a pure white background guarantees a 99% scan success rate under variable optical conditions, such as screen glare or low-light environments.
              </p>
            </section>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Performance at Scale</h3>
            <p className="text-slate-600 leading-relaxed">
              Our generator doesn't just create a tiny image; it programmatically renders the matrix data into an ultra-high-resolution (1000x1000 pixel) PNG format. This ensures that whether you're printing the code on a small product label or a 40-foot highway billboard, the hard edges of the data modules remain perfectly intact, completely avoiding the scan-breaking blur associated with low-quality generic generators.
            </p>
          </section>
        </div>
      }
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
        {history.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> Recent QR Codes
              </h3>
              <button onClick={clearHistory} className="text-xs text-slate-400 hover:text-red-500 font-bold transition-colors flex items-center gap-1">
                <Trash2 size={12} /> Clear
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setInput(item.content.replace('...', ''))}
                  className="group flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50 transition-all text-left"
                >
                  <img src={item.image} alt="QR" className="w-14 h-14 rounded-lg" />
                  <span className="text-[10px] font-bold text-slate-500 truncate w-full text-center">{item.content}</span>
                  <span className="text-[9px] text-slate-400">{item.savedAt}</span>
                </button>
              ))}
            </div>
          </div>
        )}
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
