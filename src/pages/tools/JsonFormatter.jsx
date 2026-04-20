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
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Understanding JSON Architecture</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              JavaScript Object Notation (JSON) has become the undisputed lingua franca of the modern web. Whether you're configuring a frontend React application, managing a NoSQL database like MongoDB, or routing RESTful API requests, JSON is the lightweight data-interchange format that makes it all possible. However, because JSON requires strict syntax—where a single misplaced comma or missing quotation mark can crash an entire application—using a reliable formatter and validator is mission-critical.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Why Formatting Matters for Debugging</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Raw JSON payloads are often minified (stripped of whitespace) to conserve bandwidth during network transmission. While this is efficient for machines, it is entirely unreadable for humans. Prettifying your JSON expands the syntax into a beautifully nested, hierarchical structure. 
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Visual Scope:</strong> Indentation clarifies parent-child relationships within nested objects and arrays.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Rapid Troubleshooting:</strong> Our validator instantly flags syntax errors, dramatically reducing the time spent hunting down a stray trailing comma.</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Common JSON Syntax Errors</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <strong className="text-rose-600 block mb-1">Unquoted Keys</strong>
                  Unlike standard JavaScript objects, JSON requires all property names (keys) to be enclosed in double quotes. <code>{"{\"name\": \"John\"}"}</code> is valid; <code>{"{name: \"John\"}"}</code> is not.
                </li>
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <strong className="text-amber-600 block mb-1">Trailing Commas</strong>
                  A comma after the last item in an array or object will cause the parser to fail. This is the most frequent error encountered during copy-pasting.
                </li>
                <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <strong className="text-blue-600 block mb-1">Single Quotes</strong>
                  JSON strings must use double quotes (""). Single quotes ('') will trigger an immediate parsing failure.
                </li>
              </ul>
            </section>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">The Logic Behind Minification</h3>
            <p className="text-slate-600 leading-relaxed">
              When it's time to deploy your data to production, every byte counts. Extraneous spaces, line breaks, and tabs increase file size without adding functional value. Our JSON minifier uses advanced runtime execution to predictably strip all non-essential characters formatting, compressing your payloads for optimal Core Web Vitals and lightning-fast API responses.
            </p>
          </section>
        </div>
      }
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
