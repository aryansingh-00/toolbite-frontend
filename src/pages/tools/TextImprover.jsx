import React, { useState } from 'react';
import { Zap, Copy, Trash2, Sparkles, MessageSquare, Wand2, Lightbulb } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const TextImprover = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('Professional');
  const [improvedText, setImprovedText] = useState('');
  const [isImproving, setIsImproving] = useState(false);

  const improveText = () => {
    if (!text.trim()) {
      toast.error('Please enter some text first!');
      return;
    }

    setIsImproving(true);
    
    // Simulate AI improving
    setTimeout(() => {
      // In a real AI app, we'd call an API. Here we generate a high-quality prompt template.
      const prompt = `Act as an expert ${mode} Editor. Please rewrite the following text to improve its ${mode === 'Professional' ? 'authority and clarity' : mode === 'Creative' ? 'imagery and engagement' : 'simplicity and flow'}.

Original Text: 
"${text}"

Requirements:
- Maintain the original intent and core message.
- Enhance vocabulary and sentence structure.
- Ensure the tone is ${mode.toLowerCase()}.
- Optimize for maximum readability.`;

      setImprovedText(prompt);
      setIsImproving(false);
      toast.success(`${mode} improvement structure generated!`);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedText || text);
    toast.success('Prompt copied to clipboard!');
  };

  const handleClear = () => {
    setText('');
    setImprovedText('');
    toast.success('Cleared!');
  };

  return (
    <ToolLayout
      title="Text Improver"
      description="Elevate your writing instantly. Choose your style—Professional, Creative, or Clear—and generate optimized text improvements with our AI-powered logic."
      keywords="text improver, writing enhancer, content improver, professional writing tool, ai prose editor"
      icon={Zap}
      category="Text"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-grow">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                <MessageSquare size={16} className="text-slate-400" />
                Your Original Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your sentence or paragraph to improve..."
                className="w-full h-48 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 resize-none"
              />
            </div>
            
            <div className="w-full md:w-64 space-y-4">
              <label className="text-sm font-bold text-slate-700 block">Improvement Mode</label>
              {['Professional', 'Creative', 'Concise', 'Clear'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`w-full px-6 py-4 rounded-xl font-bold transition-all text-left flex items-center justify-between group ${mode === m ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {m}
                  <Sparkles size={14} className={mode === m ? 'opacity-100 rotate-12' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={improveText}
              disabled={isImproving}
              className="flex-grow py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 disabled:opacity-50 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
            >
              <Wand2 size={24} className="group-hover:rotate-12 transition-transform" />
              {isImproving ? 'Analyzing Style...' : `Improve to ${mode}`}
            </button>
            <button 
              onClick={handleClear}
              className="px-8 py-5 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>

        {improvedText && (
          <div className="relative group animate-in slide-in-from-top-4 duration-500">
            <div className="p-8 rounded-[2rem] bg-teal-50 border-2 border-teal-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-teal-600 shadow-sm">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="font-extrabold text-teal-900">AI Improvement Prompt Ready</h4>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 bg-white px-3 py-1 rounded-full border border-teal-100">
                  optimized for chatgpt/opus
                </span>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed whitespace-pre-line mb-4">
                {improvedText}
              </p>
              <button 
                onClick={handleCopy}
                className="w-full py-4 bg-white rounded-xl border border-teal-200 text-teal-700 font-bold hover:bg-teal-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                Copy Optimized Prompt
                <Copy size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <FeatureCard 
            icon={Lightbulb} 
            title="Vocabulary" 
            desc="Replaces weak words with powerful adjectives."
            color="amber"
          />
          <FeatureCard 
            icon={Zap} 
            title="Clarity" 
            desc="Fixes convoluted structure for better reading."
            color="teal"
          />
          <FeatureCard 
            icon={MessageSquare} 
            title="Pacing" 
            desc="Balances sentence length for professional flow."
            color="blue"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    amber: 'bg-amber-50 text-amber-600',
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600'
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
      <div className={`w-12 h-12 rounded-2xl ${colors[color]} flex items-center justify-center mb-4`}>
        <Icon size={24} />
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default TextImprover;
