import React, { useState, useEffect } from 'react';
import { Type, Copy, Trash2, CheckCircle2, Clock, MessageSquare, Hash, AlignLeft, Mic2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    
    // Average reading speed: 225 words per minute
    // Average speaking speed: 130 words per minute
    const readingTime = Math.ceil(words / 225);
    const speakingTime = Math.ceil(words / 130);

    setStats({
      words,
      chars,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    });
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
