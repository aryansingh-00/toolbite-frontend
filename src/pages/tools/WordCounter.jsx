import React, { useState, useMemo } from 'react';
import { Type, Copy, Trash2, CheckCircle2, Clock, MessageSquare, Hash, AlignLeft, Mic2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 225);
    const speakingTime = Math.ceil(words / 130);
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard!');
  };

  const handleClear = () => {
    setText('');
    toast.success('Text cleared!');
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Analyze your text in real-time. Get detailed statistics on word count, character count, reading time, and more."
      keywords="word counter, character count, text analyzer, writing stats, reading time calculator"
      icon={Type}
      category="Text"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Mastering Your Message: The Science of Word Counts</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              In the modern digital landscape, the length of your content isn't just a technical detail—it's a critical factor in how your message is perceived, shared, and ranked. Whether you're an SEO strategist, a creative writer, or a student, understanding the nuances of word and character counts is essential for effective communication.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">SEO & Digital Marketing</h3>
              <p className="text-slate-600 leading-relaxed italic">
                Modern search algorithms have evolved beyond simple length checks. However, "depth" is still highly correlated with higher rankings.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li><strong className="text-slate-900">High-Authority Blogs:</strong> Aim for 1,500 - 2,500 words for comprehensive coverage.</li>
                <li><strong className="text-slate-900">Meta Descriptions:</strong> Keep characters under 160 to prevent truncation in SERPs.</li>
                <li><strong className="text-slate-900">Product Pages:</strong> Concise, value-driven descriptions of 300-500 words work best.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Social Media Benchmarks</h3>
              <p className="text-slate-600 leading-relaxed">
                Platform constraints define how users consume your content. Staying within "Sweet Spots" maximizes your engagement.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li><strong className="text-slate-900">Instagram Captions:</strong> 125-150 characters for immediate impact without "more" clicks.</li>
                <li><strong className="text-slate-900">Twitter (X):</strong> 70-100 characters often see the highest engagement rates.</li>
                <li><strong className="text-slate-900">LinkedIn:</strong> 500-1,000 characters for authoritative professional storytelling.</li>
              </ul>
            </section>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Understanding Reading vs. Speaking Time</h3>
            <p className="text-slate-600 leading-relaxed">
              Our analyzer uses industry-standard benchmarks for time prediction. The average professional reads at approximately <strong>225 words per minute (WPM)</strong>, while standard speaking rates for presentations and podcasts hover around <strong>130 WPM</strong>. Knowing these metrics helps you tailor your content for newsletters, keynote speeches, or YouTube scripts.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Why Accuracy Matters</h3>
            <p className="text-slate-600 leading-relaxed">
              Using a reliable word counter prevents "scope creep" in academic assignments and ensures your marketing copy doesn't get cut off in mobile app views. ToolBite uses advanced regex processing to ensure that whitespace, punctuation, and multi-line breaks are handled with architectural precision.
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to begin analysis..."
            className="w-full h-80 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 resize-none placeholder:text-slate-400"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleCopy}
              className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm"
              title="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
            <button 
              onClick={handleClear}
              className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm"
              title="Clear text"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={AlignLeft} label="Words" value={stats.words} color="teal" />
          <StatCard icon={Hash} label="Characters" value={stats.chars} color="blue" />
          <StatCard icon={MessageSquare} label="Sentences" value={stats.sentences} color="emerald" />
          <StatCard icon={CheckCircle2} label="Paragraphs" value={stats.paragraphs} color="indigo" />
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reading Time</p>
              <p className="text-xl font-extrabold text-slate-900">
                {stats.readingTime} {stats.readingTime === 1 ? 'minute' : 'minutes'}
              </p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
              <Mic2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Speaking Time</p>
              <p className="text-xl font-extrabold text-slate-900">
                {stats.speakingTime} {stats.speakingTime === 1 ? 'minute' : 'minutes'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorMap = {
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-3xl font-extrabold text-slate-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
};

export default WordCounter;
