import React, { useState, useEffect } from 'react';
import { AlignLeft, Copy, Trash2, Settings2, Hash, FileText } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const LOREM_IPS_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsum = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState('');

  const generateText = () => {
    let result = [];
    const words = LOREM_IPS_TEXT.toLowerCase().replace(/[.,]/g, '').split(' ');
    
    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        let p = LOREM_IPS_TEXT;
        if (i === 0 && !startWithLorem) {
          p = p.replace(/^Lorem ipsum dolor sit amet, /, 'Consectetur adipiscing elit, ');
        } else if (i > 0) {
          // Shuffle a bit for variety in paragraphs
          const shuffledWords = [...words].sort(() => 0.5 - Math.random());
          p = shuffledWords.slice(0, 50).join(' ') + ".";
          p = p.charAt(0).toUpperCase() + p.slice(1);
        }
        result.push(p);
      }
      setGeneratedText(result.join('\n\n'));
    } else if (type === 'sentences') {
      const sentences = LOREM_IPS_TEXT.split('. ');
      for (let i = 0; i < count; i++) {
        result.push(sentences[i % sentences.length]);
      }
      setGeneratedText(result.join('. ') + (result.length ? '.' : ''));
    } else {
      // Words
      for (let i = 0; i < count; i++) {
        result.push(words[i % words.length]);
      }
      setGeneratedText(result.join(' '));
    }
  };

  useEffect(() => {
    generateText();
  }, [count, type, startWithLorem]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success('Generated text copied!');
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Quickly generate placeholder text for your designs, layouts, and prototypes. Customize the amount of text you need."
      keywords="lorem ipsum, placeholder text, filler text, dummy text generator, design tool"
      icon={FileText}
      category="Design"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                min="1" 
                max="100" 
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all font-bold"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all font-bold appearance-none cursor-pointer"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <button 
              onClick={() => setStartWithLorem(!startWithLorem)}
              className={`flex items-center justify-between px-6 py-4 rounded-xl font-bold transition-all ${startWithLorem ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
            >
              <span>Start with "Lorem"</span>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${startWithLorem ? 'bg-teal-400' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${startWithLorem ? 'right-1' : 'left-1'}`} />
              </div>
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="w-full min-h-[320px] p-8 rounded-2xl bg-white border border-slate-200 text-slate-700 leading-relaxed font-medium overflow-auto">
            {generatedText.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4 last:mb-0">{p}</p>
            ))}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleCopy}
              className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-xl text-teal-600 hover:bg-teal-600 hover:text-white transition-all border border-teal-100"
              title="Copy all"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={generateText}
            className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Settings2 size={18} />
            Regenerate
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            Copy to Clipboard
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default LoremIpsum;
