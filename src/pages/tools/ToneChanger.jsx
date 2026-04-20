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
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">The Psychology of Emotional Tone</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              In written communication, "tone" refers to the attitude and emotional resonance conveyed by your choice of words. Without the benefit of body language or vocal inflection, your text alone must establish the relationship between you and your reader. Misjudging tone can lead to catastrophic communication breakdowns—such as sounding overly aggressive in a customer support email or too casual in a legal document.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Navigating Different Modalities</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <strong className="text-blue-600 block mb-1">Professional Tone</strong>
                  Strips away emotion to focus on objective facts, clear structure, and authoritative vocabulary. It builds trust through competence. Essential for B2B communications, proposals, and official announcements.
                </li>
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <strong className="text-emerald-600 block mb-1">Casual Tone</strong>
                  Utilizes contractions, colloquialisms, and direct second-person pronouns ("you"). It builds brand loyalty by making corporations feel human. Ideal for social media and B2C marketing.
                </li>
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <strong className="text-rose-600 block mb-1">Empathetic Tone</strong>
                  Prioritizes the reader's emotional state. Uses warm, validating language to de-escalate tension and foster connection. Crucial for customer service, apologies, and internal HR announcements.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">The ROI of Tone Consistency</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Brands that maintain a consistent, appropriate tone across all touchpoints experience significantly higher customer retention. When your tone aligns with your brand identity and the specific context of the user's journey, you reduce friction. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                By utilizing an AI tone changer, you can rapidly prototype different voices for A/B testing in ad campaigns, ensuring you find the precise emotional resonance that drives the highest conversion rate (CVR) and lowest Cost Per Acquisition (CPA).
              </p>
            </section>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How Our Algorithmic Tone Mapping Works</h3>
            <p className="text-slate-600 leading-relaxed">
              Transforming tone requires more than a simple thesaurus lookup. Our tool generates logic-driven AI prompts that analyze your text at the semantic level. It instructs Large Language Models to map the core intent of your sentence to a new emotional axis—swapping aggressive verbs for softer alternatives, restructuring passive sentences into active persuasive calls-to-action, and systematically injecting or removing empathy markers. This ensures a complete paradigm shift in mood without sacrificing your fundamental message.
            </p>
          </section>
        </div>
      }
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
