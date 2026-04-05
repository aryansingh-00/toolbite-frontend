import React, { useState } from 'react';
import { Youtube, Copy, Sparkles, Wand2, ListChecks, PlayCircle } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const YoutubePrompt = () => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Educational');
  const [length, setLength] = useState('10-15 Minutes');

  const generatePrompt = () => {
    if (!topic.trim()) {
      toast.error('Please enter a video topic first!');
      return;
    }

    const prompt = `Act as an expert YouTube Scriptwriter. Generate a high-retention video script about "${topic}". 
Style: ${style}
Estimated Length: ${length}

The script must include:
1. An irresistible HOOK (first 10 seconds) to prevent drop-off.
2. A compelling INTRODUCTION that sets the stakes.
3. A structured BODY with clear, value-driven points.
4. Strategic engagement cues (Like, Subscribe, Comment).
5. A powerful CALL TO ACTION (CTA) at the end.

Use professional formatting with [Visual Cues] and [Audio Cues].`;
    
    navigator.clipboard.writeText(prompt);
    toast.success('YouTube Script Prompt copied to clipboard!');
  };

  return (
    <ToolLayout
      title="YouTube Script Generator"
      description="Create high-retention YouTube scripts instantly. Our AI-optimized prompt generator helps you structure hooks, value points, and CTAs for maximum engagement."
      keywords="youtube script generator, video script prompt, high retention scripts, youtube content creator tools, ai video script writer"
      icon={Youtube}
      category="AI"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-teal-500" />
                Video Topic or Title
              </label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How to Start a Digital Agency in 2024"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Wand2 size={16} className="text-purple-500" />
                Content Style
              </label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>Educational / Tutorial</option>
                <option>Storytelling / Vlog</option>
                <option>Product Review</option>
                <option>Comedy / Entertainment</option>
                <option>Documentary Style</option>
                <option>Motivational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <PlayCircle size={16} className="text-blue-500" />
                Target Length
              </label>
              <select 
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>Under 5 Minutes</option>
                <option>5-10 Minutes</option>
                <option>10-15 Minutes</option>
                <option>15-30 Minutes</option>
                <option>Long Form (30+ Min)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={generatePrompt}
            className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
          >
            Generate & Copy Prompt
            <Copy size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Sparkles} 
            title="Hook Focused" 
            desc="Optimized for the first 10s to maximize retention."
            color="teal"
          />
          <FeatureCard 
            icon={ListChecks} 
            title="Structured" 
            desc="Clear logical flow from intro to the final CTA."
            color="purple"
          />
          <FeatureCard 
            icon={PlayCircle} 
            title="Production Ready" 
            desc="Includes visual and audio cue placeholders."
            color="blue"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    teal: 'bg-teal-50 text-teal-600',
    purple: 'bg-purple-50 text-purple-600',
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

export default YoutubePrompt;
