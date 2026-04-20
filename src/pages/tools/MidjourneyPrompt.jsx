import React, { useState } from 'react';
import { Palette, Copy, Sparkles, Camera, Image as ImageIcon, Wand2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const MidjourneyPrompt = () => {
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [aspect, setAspect] = useState('16:9');
  const [lighting, setLighting] = useState('Cinematic');

  const generatePrompt = () => {
    if (!subject.trim()) {
      toast.error('Please enter a subject first!');
      return;
    }

    const prompt = `Act as a world-class AI Art Prompt Engineer. Generate a hyper-detailed Midjourney prompt for "${subject}". 
Style: ${style}
Aspect Ratio: ${aspect}
Lighting: ${lighting}

The prompt must include high-quality tokens such as:
- [Subject Details]
- [Environment / Background]
- [Artistic Technique]
- [Camera Settings: Aperture, Lens, Depth of Field]
- [Post-Processing: 8k, Unreal Engine 5, Octane Render]

Final Version: /imagine prompt: ${subject} in ${style} style, ${lighting} lighting, ultra-detailed, depth of field, 8k, photorealistic --ar ${aspect} --v 6.0 --stylize 250`;
    
    navigator.clipboard.writeText(prompt);
    toast.success('Midjourney Prompt copied to clipboard!');
  };

  return (
    <ToolLayout
      title="Midjourney Prompt Generator"
      description="Create hyper-realistic AI art prompts effortlessly. Our AI-optimized prompt generator helps you design professional Midjourney tokens with lighting, camera, and style controls."
      keywords="midjourney prompt generator, ai art prompts, midjourney v6 prompts, stable diffusion prompt, ai image generator tool"
      icon={Palette}
      category="AI"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">The Art of Prompt Engineering</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              In the rapidly evolving landscape of Generative AI, the difference between an amateur rendering and a professional, award-winning piece of digital art comes entirely down to prompt engineering. Midjourney v6 has completely redefined the generative model space, offering hyper-realistic textures and perfect text generation, but it requires highly specific, comma-separated tokens to reach its full potential.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Structuring the Perfect Prompt</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                A Midjourney prompt isn't just a sentence; it's a mathematical equation for art. Our generator follows the industry-standard "Token Hierarchy" to ensure the AI prioritizes the most important elements:
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>The Core Subject:</strong> Define the main focus clearly before adding modifiers.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Environmental Context:</strong> Establish the background, time of day, and weather.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Optical Parameters:</strong> Simulate high-end photography by injecting terms like "85mm lens," "f/1.8 aperture," and "depth of field."</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Render Engine Emulation:</strong> For 3D styles, adding "Unreal Engine 5" or "Octane Render" instantly boosts volumetric lighting quality.</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Parameters & Aspect Ratios</h3>
              <p className="text-slate-600 leading-relaxed">
                By default, Midjourney generates square (1:1) images. Professional workflows require dimension control. Our tool automatically injects the `--ar` (Aspect Ratio) parameter based on your use case—whether you need 16:9 for YouTube thumbnails or 9:16 for Instagram Reels and TikTok. We also append `--stylize` commands to instruct the AI on how strictly to adhere to the prompt versus taking creative liberties.
              </p>
            </section>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Why Use a Meta-Prompt Generator?</h3>
            <p className="text-slate-600 leading-relaxed">
              Writing a flawless 50-word prompt from scratch is incredibly time-consuming and often involves trial and error that drains your GPU hours/credits. By using our tool to generate a "Meta-Prompt" (asking an LLM to write the Midjourney prompt for you), you leverage AI to instruct AI. This results in incredibly dense, descriptive token combinations that human writers rarely think of natively.
            </p>
          </section>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-teal-500" />
                Image Subject
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., A cyber-punk street photographer in Tokyo at night"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Palette size={16} className="text-purple-500" />
                Artistic Style
              </label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>Photorealistic</option>
                <option>Digital Art / Pixar</option>
                <option>Oil Painting</option>
                <option>Anime / Studio Ghibli</option>
                <option>Steampunk</option>
                <option>Minimalist Abstract</option>
                <option>Cyberpunk / Neon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Wand2 size={16} className="text-amber-500" />
                Aspect Ratio
              </label>
              <select 
                value={aspect}
                onChange={(e) => setAspect(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>1:1 (Square)</option>
                <option>16:9 (Widescreen)</option>
                <option>9:16 (Vertical/Mobile)</option>
                <option>4:5 (Instagram Portrait)</option>
                <option>3:2 (Landscape)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Camera size={16} className="text-blue-500" />
                Lighting Scene
              </label>
              <select 
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 appearance-none"
              >
                <option>Cinematic Lighting</option>
                <option>Golden Hour / Soft Warm</option>
                <option>Neon / Futuristic Glow</option>
                <option>Studio / Pro Photography</option>
                <option>Natural Daylight</option>
                <option>Volumetric Foggy / Moody</option>
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
            icon={ImageIcon} 
            title="High Res" 
            desc="Optimized with tokens for 8k and ultra-detail."
            color="teal"
          />
          <FeatureCard 
            icon={Camera} 
            title="Pro Settings" 
            desc="Includes lens and camera aperture advice."
            color="purple"
          />
          <FeatureCard 
            icon={Palette} 
            title="Artistic Flair" 
            desc="Uses curated tokens for lighting and style."
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

export default MidjourneyPrompt;
