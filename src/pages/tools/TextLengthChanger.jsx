import React, { useState } from 'react';
import { Maximize2, Minimize2, Copy, Trash2, Sparkles, MessageSquare, Wand2, FileText } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const TextLengthChanger = () => {
  const [text, setText] = useState('');
  const [target, setTarget] = useState('Summarize');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processText = () => {
    if (!text.trim()) {
      toast.error('Please enter some text first!');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const prompt = `Act as an expert Content Editor. Please ${target.toLowerCase()} the following text.

Original Content:
"${text}"

Goals for ${target}:
${target === 'Summarize' ? '- Reduce length by 50-70%.\n- Maintain the core message and key facts.\n- Use bullet points if necessary for clarity.' : '- Expand length significantly by adding details and context.\n- Maintain the original tone and intent.\n- Use descriptive language and illustrative examples.'}

Ensure the output is high-quality and professional.`;

      setResult(prompt);
      setIsProcessing(false);
      toast.success(`${target} structure generated!`);
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
      title="Text Length Changer"
      description="Adjust the size of your content with precision. Summarize long paragraphs or expand brief notes into detailed explanations using our AI-optimized logic."
      keywords="summarize tool, text expander, content shortener, ai writing editor, sentence lengthener"
      icon={Maximize2}
      category="Text"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-grow">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                <FileText size={16} className="text-slate-400" />
                Original Content
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the text you want to shrink or grow..."
                className="w-full h-48 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 resize-none"
              />
            </div>
            
            <div className="w-full md:w-64 space-y-4">
              <label className="text-sm font-bold text-slate-700 block text-center mb-4">Select Target</label>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setTarget('Summarize')}
                  className={`w-full px-6 py-6 rounded-2xl font-bold transition-all flex flex-col items-center gap-2 group ${target === 'Summarize' ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                >
                  <Minimize2 size={24} />
                  Summarize
                </button>
                <button
                  onClick={() => setTarget('Expand')}
                  className={`w-full px-6 py-6 rounded-2xl font-bold transition-all flex flex-col items-center gap-2 group ${target === 'Expand' ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                >
                  <Maximize2 size={24} />
                  Expand
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={processText}
              disabled={isProcessing}
              className={`flex-grow py-5 rounded-2xl font-bold text-lg disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3 group ${target === 'Summarize' ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-amber-900/10' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-900/10'}`}
            >
              <Wand2 size={24} className="group-hover:rotate-12 transition-transform" />
              {isProcessing ? 'Processing Text...' : `${target} Content`}
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
            <div className={`p-8 rounded-[2rem] border-2 shadow-lg ${target === 'Summarize' ? 'bg-amber-50 border-amber-200' : 'bg-indigo-50 border-indigo-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-white rounded-lg shadow-sm ${target === 'Summarize' ? 'text-amber-600' : 'text-indigo-600'}`}>
                    <Sparkles size={20} />
                  </div>
                  <h4 className={`font-extrabold ${target === 'Summarize' ? 'text-amber-900' : 'text-indigo-900'}`}>AI Optimized Prompt</h4>
                </div>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed whitespace-pre-line mb-6">
                {result}
              </p>
              <button 
                onClick={handleCopy}
                className={`w-full py-4 bg-white rounded-xl border font-bold transition-all flex items-center justify-center gap-2 group ${target === 'Summarize' ? 'border-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white' : 'border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white'}`}
              >
                Copy Optimized Prompt
                <Copy size={18} className="group-hover:translate-y-[-2px] transition-transform" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <FeatureCard 
            icon={Minimize2} 
            title="Density Control" 
            desc="Strips fluff to reveal the core essence of your words."
            color="amber"
          />
          <FeatureCard 
            icon={Maximize2} 
            title="Context Growth" 
            desc="Adds relevant detail while keeping your voice intact."
            color="indigo"
          />
          <FeatureCard 
            icon={MessageSquare} 
            title="Format Preserved" 
            desc="Keeps your structure while changing the volume."
            color="teal"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    teal: 'bg-teal-50 text-teal-600'
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

export default TextLengthChanger;
