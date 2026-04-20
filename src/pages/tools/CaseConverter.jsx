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
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">The Importance of Typographical Hierarchy</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              In digital design and content creation, how your words look is often just as important as what they say. Case formatting isn't merely a stylistic choice; it's a fundamental element of visual hierarchy that guides the reader's eye, establishes structural relationships between text elements, and ensures accessibility across different devices and screen sizes.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">When to Use Different Cases</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>UPPERCASE:</strong> Best used sparingly for strong emphasis, acronyms, or short navigational labels. Excessive use feels like "shouting" and severely decreases readability.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>lowercase:</strong> Often employed in modern, minimalist branding to convey approachability and simplicity. Used heavily in casual UI microcopy.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Title Case:</strong> The standard for blog post titles, book covers, and primary headings. It naturally draws attention while remaining easy to scan.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>Sentence case:</strong> The optimal choice for body paragraphs, descriptions, and long-form reading. It mimics natural conversational flow.</span></li>
                <li className="flex items-start gap-2"><div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2"></div><span><strong>camelCase:</strong> An essential format in programming environments (like JavaScript or JSON properties) where spaces are prohibited but word boundaries must be clear.</span></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Accessibility and UX Design</h3>
              <p className="text-slate-600 leading-relaxed">
                Dyslexic users and those with cognitive impairments rely heavily on the distinct visual shapes of words. Because ALL CAPS eliminates the ascenders and descenders (the parts of letters that go up and down, like 'b' or 'p'), words form uniform rectangular blocks that are difficult to distinguish. By using a case converter to enforce Sentence case in your main body copy, you adhere to global accessibility standards and ensure a seamless experience for all users.
              </p>
            </section>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">SEO Implications of Title Formatting</h3>
            <p className="text-slate-600 leading-relaxed">
              When search engines index your website, they pay close attention to your <code>&lt;h1&gt;</code> and <code>&lt;h2&gt;</code> tags. While Google's algorithm does not penalize you directly for case choices in headers, Click-Through Rates (CTR) on Search Engine Results Pages (SERPs) are heavily influenced by it. Studies show that Title Case headlines generally perform better in SERPs than lowercase ones because they stand out visually against standard descriptive text. Keeping your case formatting consistent across your entire site also signals strong editorial standards to both users and crawlers.
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
