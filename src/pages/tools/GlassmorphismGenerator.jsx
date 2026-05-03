import React, { useState } from 'react';
import { Layers, Copy, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const GlassmorphismGenerator = () => {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.2);
  const [color, setColor] = useState('#ffffff');
  const [outline, setOutline] = useState(0.1);

  const glassStyle = {
    backgroundColor: `${color}${Math.round(transparency * 255).toString(16).padStart(2, '0')}`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${outline})`,
  };

  const cssCode = `background: rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${transparency});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${outline});
border-radius: 24px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success('CSS copied to clipboard!');
  };

  return (
    <ToolLayout
      title="CSS Glassmorphism Generator"
      description="Design beautiful frosted-glass UI elements with real-time CSS generation. Perfect for modern, premium web designs."
      keywords="glassmorphism generator, css glass effect, frosted glass css, glass ui design, glassmorphism css"
      icon={Layers}
      category="Design"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">The Rise of Glassmorphism</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Glassmorphism is a modern UI trend characterized by background blur, multi-layered transparency, and subtle borders. It creates a "frosted glass" effect that adds depth, hierarchy, and a sense of premium quality to digital interfaces. Popularized by Apple (macOS Big Sur) and Microsoft (Windows 11), it has become a staple in high-end web design.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Design Principles</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Transparency:</strong> Use subtle background colors with low alpha values.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Blur:</strong> The backdrop-filter blur is what creates the "glass" look.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Borders:</strong> A very thin, light-colored border helps define the element's edges.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Vibrant Backgrounds:</strong> Glass effects look best over colorful, high-contrast backgrounds.</span></li>
              </ul>
            </section>

            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Implementation Best Practices</h3>
              <p className="text-slate-600 leading-relaxed">
                While visually stunning, glassmorphism should be used thoughtfully. Ensure that text over glass elements remains legible by choosing appropriate font colors and weights. Avoid nesting too many glass layers, as it can impact browser performance on lower-end devices. Always test the <code>backdrop-filter</code> support across different browsers.
              </p>
            </section>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Blur Amount ({blur}px)</label>
              </div>
              <input 
                type="range" min="0" max="25" step="1" 
                value={blur} onChange={(e) => setBlur(e.target.value)}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Transparency ({Math.round(transparency * 100)}%)</label>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={transparency} onChange={(e) => setTransparency(e.target.value)}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Outline Opacity ({Math.round(outline * 100)}%)</label>
              </div>
              <input 
                type="range" min="0" max="0.5" step="0.01" 
                value={outline} onChange={(e) => setOutline(e.target.value)}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Glass Color</label>
              <div className="flex gap-4">
                <input 
                  type="color" 
                  value={color} onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 rounded-xl border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={color.toUpperCase()} onChange={(e) => setColor(e.target.value)}
                  className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-700 uppercase"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4">Generated CSS</h4>
            <div className="relative">
              <pre className="bg-slate-900 text-teal-400 p-6 rounded-2xl font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {cssCode}
              </pre>
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                title="Copy CSS"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-inner">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-60"></div>
          
          <div 
            style={glassStyle}
            className="w-80 p-10 rounded-[24px] shadow-2xl relative z-10 text-center text-white"
          >
            <h3 className="text-2xl font-black mb-4">Glass Preview</h3>
            <p className="font-medium opacity-90 leading-relaxed">
              This is how your glassmorphism element will look in real-world conditions.
            </p>
          </div>

          {/* Floating elements for context */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-teal-400 rounded-full blur-xl opacity-80"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-400 rounded-full blur-2xl opacity-60"></div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default GlassmorphismGenerator;
