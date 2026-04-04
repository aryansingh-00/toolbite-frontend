import React, { useState } from 'react';
import { AlignJustify, Copy, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
      toast.success('JSON Formatted!');
    } catch (e) {
      setError(e.message);
      toast.error('Invalid JSON format');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
      toast.success('JSON Minified!');
    } catch (e) {
      setError(e.message);
      toast.error('Invalid JSON format');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    toast.success('JSON copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setError(null);
    toast.success('Cleared!');
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Clean up, prettify, and validate your JSON data instantly. Detect errors and format with proper indentation."
      keywords="json formatter, json prettify, beautify json, validator, minify json, syntax checker"
      icon={AlignJustify}
      category="Development"
    >
      <div className="space-y-8">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder='Paste your JSON here (e.g., {"name": "ToolBite", "active": true})...'
            className={`w-full h-96 p-6 rounded-2xl bg-slate-900 text-teal-400 font-mono text-sm border-2 focus:outline-none transition-all resize-none placeholder:text-slate-500 ${error ? 'border-red-500/50' : 'border-slate-800 focus:border-teal-500/50'}`}
            spellCheck={false}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleCopy}
              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-colors shadow-lg"
              title="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
            <button 
              onClick={handleClear}
              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors shadow-lg"
              title="Clear text"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 font-medium">
            <AlertCircle size={20} className="flex-shrink-0" />
            <span>Invalid JSON: {error}</span>
          </div>
        ) : input && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700 font-medium">
            <CheckCircle2 size={20} className="flex-shrink-0" />
            <span>JSON is valid and ready for use.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <button
            onClick={formatJson}
            className="py-4 px-6 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 shadow-lg shadow-teal-500/25 transition-all active:scale-95"
          >
            Format / Prettify
          </button>
          <button
            onClick={minifyJson}
            className="py-4 px-6 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all active:scale-95"
          >
            Minify JSON
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatter;
