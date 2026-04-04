import React, { useState } from 'react';
import { Type, Copy, Trash2, ArrowRightLeft } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const CaseConverter = () => {
  const [text, setText] = useState('');

  const convertCase = (type) => {
    let result = '';
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'camel':
        result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
        break;
      default:
        result = text;
    }
    setText(result);
    toast.success(`Converted to ${type} case!`);
  };

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
      title="Case Converter"
      description="Easily toggle between UPPERCASE, lowercase, and Title Case. Instant transformation for your labels, headers, and content."
      keywords="case converter, upper to lower, title case generator, sentence case, text transformer"
      icon={ArrowRightLeft}
      category="Text"
    >
      <div className="space-y-8">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <CaseButton onClick={() => convertCase('upper')} label="UPPERCASE" />
          <CaseButton onClick={() => convertCase('lower')} label="lowercase" />
          <CaseButton onClick={() => convertCase('title')} label="Title Case" />
          <CaseButton onClick={() => convertCase('sentence')} label="Sentence case" />
          <CaseButton onClick={() => convertCase('camel')} label="camelCase" />
        </div>
      </div>
    </ToolLayout>
  );
};

const CaseButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
  >
    {label}
  </button>
);

export default CaseConverter;
