import React, { useState } from 'react';
import { Smile, Copy, Trash2, Sparkles, Wand2, MessageSquare, Heart, ShieldCheck } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const ToneChanger = () => {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [result, setResult] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  const changeTone = () => {
    if (!text.trim()) {
      toast.error('Please enter some text first!');
      return;
    }

    setIsChanging(true);
    
    // Simulate AI changing tone
    setTimeout(() => {
      const prompt = `Act as an expert Communications Specialist. Rewrite the following text to perfectly match a "${tone}" tone.

Original Text:
"${text}"

Tone Guidelines for ${tone}:
${tone === 'Professional' ? '- Use formal language and clear structure.\n- Avoid slang and informal contractions.\n- Focus on authority and expertise.' : 
  tone === 'Casual' ? '- Use friendly, everyday language.\n- Keep it lighthearted and approachable.\n- Use conversational contractions.' : 
  tone === 'Persuasive' ? '- Focus on benefits and calling the reader to action.\n- Use strong verbs and emotional hooks.\n- Maintain high energy.' : 
  '- Use warm, understanding language.\n- Validate the reader\'s feelings.\n- Keep it supportive and gentle.'}

The goal is to shift the mood while keeping the core information identical.`;

      setResult(prompt);
      setIsChanging(false);
      toast.success(`${tone} tone structure generated!`);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result || text);
    toast.success('Prompt copied to clipboard!');
  };

  const handleClear = () => {
    setText('');
    setResult('');
    toast.success('Cleared!');
  };

  return (
    <ToolLayout
      title="Tone Changer"
      description="Shift your message's mood instantly. Convert text between professional, casual, persuasive, and empathetic tones with our AI-optimized prompt logic."
      keywords="tone changer, writing style tool, formal to casual converter, persuasive writing, empathy-driven text, ai editor"
      icon={Smile}
      category="Text"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-grow">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                <MessageSquare size={16} className="text-slate-400" />
                Original Message
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to change its emotional tone..."
                className="w-full h-48 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 resize-none"
              />
            </div>
            
            <div className="w-full md:w-64 space-y-3">
              <label className="text-sm font-bold text-slate-700 block text-center mb-4">Select Mood</label>
              {[
                { name: 'Professional', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
                { name: 'Casual', icon: Smile, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { name: 'Persuasive', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
                { name: 'Empathetic', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' }
              ].map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTone(t.name)}
                  className={`w-full px-5 py-4 rounded-xl font-bold transition-all flex items-center gap-3 group ${tone === t.name ? `${t.bg} ${t.color} border-2 border-current shadow-md` : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                >
                  <t.icon size={18} className={tone === t.name ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={changeTone}
              disabled={isChanging}
              className="flex-grow py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 disabled:opacity-50 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
            >
              <Wand2 size={24} className="group-hover:rotate-12 transition-transform" />
              {isChanging ? 'Crafting Tone...' : `Change to ${tone}`}
            </button>
            <button 
              onClick={handleClear}
              className="px-8 py-5 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>

        {result && (
          <div className="relative group animate-in slide-in-from-top-4 duration-500">
            <div className="p-8 rounded-[2rem] bg-slate-900 text-white border-2 border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg text-teal-400">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="font-extrabold text-white text-lg">AI Tone Transformation Prompt</h4>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  {tone} Mode Active
                </span>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-line mb-6">
                {result}
              </p>
              <button 
                onClick={handleCopy}
                className="w-full py-4 bg-teal-600 rounded-xl text-white font-bold hover:bg-teal-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-600/20"
              >
                Copy Optimized Prompt
                <Copy size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          <FeatureCard 
            icon={ShieldCheck} 
            title="Formal" 
            desc="Sharp and authoritative."
            color="blue"
          />
          <FeatureCard 
            icon={Smile} 
            title="Casual" 
            desc="Warm and approachable."
            color="emerald"
          />
          <FeatureCard 
            icon={Sparkles} 
            title="Persuasive" 
            desc="Direct and energetic."
            color="amber"
          />
          <FeatureCard 
            icon={Heart} 
            title="Empathetic" 
            desc="Gentle and supportive."
            color="rose"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600'
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
      <div className={`w-10 h-10 rounded-2xl ${colors[color]} flex items-center justify-center mb-4`}>
        <Icon size={20} />
      </div>
      <h4 className="text-base font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default ToneChanger;
