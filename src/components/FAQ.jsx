import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { faqData } from '../data/content';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border-b border-slate-200 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
      <button
        className="w-full flex items-center justify-between py-6 px-4 md:px-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
        onClick={onClick}
      >
        <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? 'text-teal-600' : 'text-slate-900'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-teal-100 text-teal-600 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 md:px-8 text-slate-600 leading-relaxed text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = faqData;

  return (
    <section id="faq" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Questions & Answers</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our services, pricing, and how we build premium digital experiences.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center bg-teal-50 border border-teal-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h4>
            <p className="text-slate-600 text-sm">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          </div>
          <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors shadow-sm whitespace-nowrap">
            <MessageCircle size={18} />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

