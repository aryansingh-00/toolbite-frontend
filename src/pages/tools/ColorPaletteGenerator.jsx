import React, { useState, useEffect } from 'react';
import { Palette, Copy, RefreshCw, Download } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState([]);

  const generatePalette = () => {
    const newPalette = [];
    for (let i = 0; i < 5; i++) {
      const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
      newPalette.push(color);
    }
    setPalette(newPalette);
  };

  useEffect(() => {
    generatePalette();
  }, []);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied to clipboard!`);
  };

  const handleDownload = () => {
    const content = palette.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.txt';
    link.click();
    toast.success('Palette downloaded!');
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Create stunning, harmonious color schemes for your next project. Generate HEX, RGB, and HSL palettes instantly with one click."
      keywords="color palette generator, color scheme maker, hex color codes, design tools, branding colors"
      icon={Palette}
      category="Design"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Mastering the Psychology of Color</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Color is one of the most powerful tools in a designer's arsenal. It has the ability to evoke emotions, establish brand identity, and guide user behavior. A well-chosen color palette can elevate a simple layout into a premium digital experience, while poor color choices can confuse users and diminish trust.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Color Harmonies</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Monochromatic:</strong> Using different shades and tints of a single color for a clean, cohesive look.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Analogous:</strong> Colors that are next to each other on the color wheel, creating a serene and comfortable design.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Complementary:</strong> Opposite colors on the wheel that provide high contrast and vibrant energy.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Triadic:</strong> Three colors equally spaced around the wheel, offering balanced but bold combinations.</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Accessibility in Color Choice</h3>
              <p className="text-slate-600 leading-relaxed">
                When generating palettes, it's crucial to consider color contrast for accessibility (WCAG standards). Ensure that your text color has enough contrast against the background so that users with visual impairments can read your content comfortably. Our generator provides diverse colors to help you find the perfect balance between aesthetics and utility.
              </p>
            </section>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {palette.map((color, index) => (
            <div 
              key={index}
              className="group relative flex flex-col items-center"
            >
              <div 
                className="w-full aspect-[3/4] rounded-2xl shadow-lg border border-slate-200 transition-transform group-hover:scale-105 cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => handleCopy(color)}
              />
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono font-bold text-slate-700">{color}</span>
                <button 
                  onClick={() => handleCopy(color)}
                  className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <button
            onClick={generatePalette}
            className="flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-lg shadow-teal-500/20 active:scale-95"
          >
            <RefreshCw size={20} />
            Generate New Palette
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            <Download size={20} />
            Download Palette
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorPaletteGenerator;
