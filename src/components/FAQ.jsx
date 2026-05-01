import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Search } from 'lucide-react';
import { faqData } from '../data/content';

// Categorize FAQs
const categories = [
  {
    label: 'All',
    emoji: '✦',
    filter: () => true,
  },
  {
    label: 'Pricing & Plans',
    emoji: '💰',
    filter: (q) => /pric|cost|fee|revision|scope|tier/i.test(q),
  },
  {
    label: 'Timeline & Delivery',
    emoji: '🚀',
    filter: (q) => /timeline|deploy|deliver|days|weeks|launch|live|after/i.test(q),
  },
  {
    label: 'Technical',
    emoji: '⚙️',
    filter: (q) => /performance|speed|seo|mobile|code|logic|database|integrat|hosting|api|auth|cms/i.test(q),
  },
  {
    label: 'Services',
    emoji: '🛠️',
    filter: (q) => /template|custom|ready|asset|digital|saas|adsense|ad network/i.test(q),
  },
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04 }}
    className={`border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 ${
      isOpen
        ? 'shadow-md shadow-teal-500/5 border-teal-200 dark:border-teal-800/50'
        : 'hover:border-slate-300 dark:hover:border-slate-700'
    }`}
  >
    <button
      className={`w-full flex items-center justify-between py-5 px-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors ${
        isOpen ? 'bg-teal-50/50 dark:bg-teal-900/10' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/40'
      }`}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className={`text-base font-bold pr-6 transition-colors leading-snug ${isOpen ? 'text-teal-700 dark:text-teal-400' : 'text-slate-900 dark:text-slate-100'}`}>
        {question}
      </span>
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'bg-teal-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
      }`}>
        <ChevronDown size={16} strokeWidth={2.5} />
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-6 py-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const activeCat = categories.find((c) => c.label === activeCategory);
  const filtered = faqData.filter((faq) => {
    const matchesCategory = activeCat.filter(faq.question + ' ' + faq.answer);
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-16 bg-transparent relative overflow-hidden border-t border-white/5">
      {/* Decorative Blobs */}
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            Support Matrix
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter">
            Frequent <span className="text-emerald-500">Inquiries.</span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search the system..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => { setActiveCategory(cat.label); setOpenIndex(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat.label
                  ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-300 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filtered.length > 0 ? (
              <>
                {(showAll ? filtered : filtered.slice(0, 5)).map((faq, index) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    index={index}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
                
                {filtered.length > 5 && (
                  <button 
                    onClick={() => setShowAll(!showAll)}
                    className="w-full py-4 mt-2 text-sm font-bold text-slate-400 hover:text-white transition-colors border border-dashed border-white/10 rounded-2xl hover:bg-white/5"
                  >
                    {showAll ? 'Show Fewer Questions' : `View All ${filtered.length} Questions`}
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-slate-600">
                <p className="text-4xl mb-3 opacity-20">🔍</p>
                <p className="font-semibold text-slate-400">No results found in the support matrix.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/10 border border-teal-100 dark:border-teal-800/40 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Still have questions?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Can't find the answer you're looking for? Chat with our team directly.</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors shadow-sm whitespace-nowrap"
          >
            <MessageCircle size={18} />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
