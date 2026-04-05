import { Camera as Instagram, Copy, Sparkles, Wand2, Music, Zap } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const InstagramPrompt = () => {
  const [niche, setNiche] = useState('');
  const [vibe, setVibe] = useState('Aesthetic');
  const [duration, setDuration] = useState('7-15 Seconds');

  const generatePrompt = () => {
    if (!niche.trim()) {
      toast.error('Please enter your niche first!');
      return;
    }

    const prompt = `Act as a viral Instagram Reel Strategist. Generate a concept for a high-engagement reel for the "${niche}" niche.
Vibe: ${vibe}
Ideal Duration: ${duration}

The concept must include:
1. A visual HOOK that stops the scroll immediately.
2. A fast-paced structured flow for the main content.
3. Trending audio recommendations type (e.g., fast beat, ambient, speech).
4. Text-on-screen overlay strategy for maximum retention.
5. Captivating Caption + 5 high-converting hashtags.

The goal is to maximize shares and saves.`;
    
    navigator.clipboard.writeText(prompt);
    toast.success('Instagram Reel Prompt copied to clipboard!');
  };

  return (
    <ToolLayout
      title="Instagram Reel Generator"
      description="Create viral reel concepts instantly. Our AI-optimized prompt generator helps you design scroll-stopping hooks and engaging visual scripts for Instagram."
      keywords="instagram reel generator, reel prompt generator, viral hooks, instagram marketing tools, ai content generator"
      icon={Instagram}
      category="AI"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-rose-500" />
                Industry or Niche
              </label>
              <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., Fitness, Tech, Food, Real Estate"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium text-slate-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Wand2 size={16} className="text-purple-500" />
                Aesthetic Vibe
              </label>
              <select 
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>Aesthetic / Minimalist</option>
                <option>High Energy / Fast Paced</option>
                <option>Educational / Talk to Camera</option>
                <option>POV / Storytelling</option>
                <option>Behind the Scenes</option>
                <option>Funny / Meme Based</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                Ideal Length
              </label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>5-7 Seconds (Fast Hook)</option>
                <option>7-15 Seconds (Normal)</option>
                <option>15-30 Seconds (Educational)</option>
                <option>30-60 Seconds (Detailed)</option>
                <option>60+ Seconds (Masterclass)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={generatePrompt}
            className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-rose-500 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
          >
            Generate & Copy Prompt
            <Copy size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Zap} 
            title="Viral Hooks" 
            desc="Focused on the first 3s for maximum retention."
            color="rose"
          />
          <FeatureCard 
            icon={Music} 
            title="Audio Advice" 
            desc="Matches audio style to your visual content."
            color="purple"
          />
          <FeatureCard 
            icon={Instagram} 
            title="Metric Focused" 
            desc="Designed to boost shares and saves."
            color="blue"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    rose: 'bg-rose-50 text-rose-600',
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

export default InstagramPrompt;
