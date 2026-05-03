import React, { useState } from 'react';
import { Hash, Copy, Trash2, ArrowRightLeft, Upload } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const Base64Converter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(inputText);
        setOutputText(encoded);
        toast.success('Successfully encoded to Base64!');
      } else {
        const decoded = atob(inputText);
        setOutputText(decoded);
        toast.success('Successfully decoded from Base64!');
      }
    } catch (error) {
      toast.error('Invalid input for the selected mode!');
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast.success('Output copied to clipboard!');
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    toast.success('Inputs cleared!');
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Quickly convert text to Base64 format or decode Base64 strings back to plain text. Fast, secure, and purely browser-based."
      keywords="base64 encoder, base64 decoder, text to base64, base64 to text converter, online encoding tool"
      icon={Hash}
      category="Development"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Understanding Base64 Encoding</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is widely used in web development for embedding images within CSS/HTML, transmitting data via APIs, and handling binary protocols over text-only transport layers. By converting complex binary data into a limited set of 64 characters, it ensures data integrity across diverse systems.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">When to Use Base64</h3>
              <p className="text-slate-600 leading-relaxed">
                Base64 is particularly useful for small data transfers. For instance, developers often encode small icons or logos into Data URIs to reduce the number of HTTP requests, thereby improving page load times. It's also frequently used in Basic Authentication headers and for encoding parameters in URLs where special characters might cause issues.
              </p>
            </section>

            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Security Considerations</h3>
              <p className="text-slate-600 leading-relaxed">
                It is vital to understand that <strong>Base64 is NOT encryption</strong>. It is merely a way to represent data differently. Base64 strings can be easily decoded by anyone with access to the encoded string. Never use Base64 to "secure" passwords or sensitive private data. For true security, always use cryptographic hashing and encryption standards.
              </p>
            </section>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => setMode('encode')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${mode === 'encode' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Encode
            </button>
            <button 
              onClick={() => setMode('decode')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${mode === 'decode' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Decode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Input Text</label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-64 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none font-mono text-sm resize-none"
                placeholder={mode === 'encode' ? 'Paste text to encode...' : 'Paste Base64 to decode...'}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Output Text</label>
            <div className="relative">
              <textarea
                value={outputText}
                readOnly
                className="w-full h-64 p-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-mono text-sm resize-none"
                placeholder="Result will appear here..."
              />
              {outputText && (
                <button 
                  onClick={handleCopy}
                  className="absolute bottom-4 right-4 p-3 bg-white text-slate-600 border border-slate-200 rounded-xl hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                  title="Copy Output"
                >
                  <Copy size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleProcess}
            className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-lg hover:bg-teal-500 transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-3"
          >
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </button>
          <button
            onClick={swapMode}
            className="px-10 py-5 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-3 active:scale-95"
          >
            <ArrowRightLeft size={20} />
            Swap Mode
          </button>
          <button
            onClick={handleClear}
            className="p-5 bg-slate-100 text-slate-500 rounded-2xl hover:text-red-600 hover:bg-red-50 transition-all"
            title="Clear All"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Base64Converter;
