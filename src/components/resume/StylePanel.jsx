import React from 'react';
import { motion } from 'framer-motion';
import { X, Palette, Type, AlignJustify } from 'lucide-react';

const FONT_FAMILIES = [
  { id: 'Inter, sans-serif', label: 'Inter', preview: 'Aa' },
  { id: 'Georgia, serif', label: 'Georgia', preview: 'Aa' },
  { id: "'Merriweather', serif", label: 'Merriweather', preview: 'Aa' },
  { id: "'Roboto Mono', monospace", label: 'Mono', preview: 'Aa' },
  { id: "'Playfair Display', serif", label: 'Playfair', preview: 'Aa' },
];

const COLOR_PRESETS = [
  { id: '#14b8a6', label: 'Teal', dark: '#0f766e' },
  { id: '#3b82f6', label: 'Blue', dark: '#1d4ed8' },
  { id: '#8b5cf6', label: 'Violet', dark: '#6d28d9' },
  { id: '#f43f5e', label: 'Rose', dark: '#be123c' },
  { id: '#1e293b', label: 'Slate', dark: '#0f172a' },
  { id: '#10b981', label: 'Emerald', dark: '#047857' },
];

const FONT_SIZES = [
  { id: 0.9, label: 'S' },
  { id: 1, label: 'M' },
  { id: 1.1, label: 'L' },
];

const LINE_SPACINGS = [
  { id: 1.3, label: 'Compact' },
  { id: 1.6, label: 'Normal' },
  { id: 2, label: 'Relaxed' },
];

export default function StylePanel({ styles, onStyleChange, onClose }) {
  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-[320px] bg-slate-950/90 backdrop-blur-xl border-l border-white/5 z-[80] flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <Palette size={18} className="text-violet-400" />
          </div>
          <div>
            <h3 className="font-black text-white text-base tracking-tight">Design System</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Visual Controller</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">

        {/* Theme Color */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Theme Color</p>
          <div className="grid grid-cols-3 gap-3">
            {COLOR_PRESETS.map(color => (
              <button
                key={color.id}
                onClick={() => onStyleChange('themeColor', color.id)}
                className={`relative h-16 rounded-2xl flex items-end p-2 transition-all ${styles.themeColor === color.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0f172a] scale-105' : 'hover:scale-102'}`}
                style={{ backgroundColor: color.id }}
              >
                <span className="text-white text-[10px] font-black opacity-80">{color.label}</span>
                {styles.themeColor === color.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color.id }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Type size={12} /> Font Family</p>
          <div className="space-y-2">
            {FONT_FAMILIES.map(font => (
              <button
                key={font.id}
                onClick={() => onStyleChange('fontFamily', font.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${styles.fontFamily === font.id ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/8'}`}
              >
                <span className="text-sm font-bold">{font.label}</span>
                <span style={{ fontFamily: font.id }} className="text-base opacity-60">{font.preview}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Font Size</p>
          <div className="grid grid-cols-3 gap-2">
            {FONT_SIZES.map(size => (
              <button
                key={size.id}
                onClick={() => onStyleChange('fontSizeScale', size.id)}
                className={`py-3 rounded-xl text-sm font-black transition-all border ${styles.fontSizeScale === size.id ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Spacing */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><AlignJustify size={12} /> Line Spacing</p>
          <div className="space-y-2">
            {LINE_SPACINGS.map(spacing => (
              <button
                key={spacing.id}
                onClick={() => onStyleChange('lineSpacing', spacing.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${styles.lineSpacing === spacing.id ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/8'}`}
              >
                <span className="text-sm font-bold">{spacing.label}</span>
                <div className="flex flex-col gap-0.5 opacity-50">
                  {[1, 2, 3].map(l => (
                    <div key={l} className="h-0.5 bg-current rounded" style={{ width: spacing.id === 2 ? 20 : spacing.id === 1.3 ? 14 : 24 }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
