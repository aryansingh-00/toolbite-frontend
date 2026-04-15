import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronDown, 
  ShieldQuestion, 
  ExternalLink,
  Zap,
  Globe,
  Clock,
  Sparkles
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`font-bold transition-colors ${isOpen ? 'text-teal-600 dark:text-teal-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-teal-500'}`}>
          {question}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-500' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PortalSupport = () => {
  const faqs = [
    {
      question: "How do I update my DNS settings for launch?",
      answer: "We handle the technical heavy lifting! Simply point your A records to our edge server IP or provide us with temporary access to your domain registrar (GoDaddy, Namecheap, etc.) via the Assets tab."
    },
    {
      question: "What is the typical turnaround for design revisions?",
      answer: "Minor revisions (colors, copy, images) are usually completed within 24-48 business hours. Significant structural changes may require 3-5 business days depending on the project scope."
    },
    {
      question: "Where can I find my project's technical documentation?",
      answer: "Technical docs, including API endpoints and CMS guides, are located under the 'Resources' tab in your dashboard."
    },
    {
      question: "How can I scale my hosting as traffic increases?",
      answer: "All projects are deployed on our auto-scaling edge network. If you anticipate a major marketing event or launch, please notify us 48 hours in advance so we can optimize cache TTLs."
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
             <MessageSquare className="text-teal-500" />
             Client Success Support
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Your direct line to the ToolBite engineering team.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-500/20">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           Devs Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Options */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Connect Instantly</h4>
              
              <div className="space-y-4">
                 {[
                   { label: "WhatsApp Desk", val: "+1 (555) 012-3456", icon: <Phone size={20} />, color: "emerald", action: "Chat Now" },
                   { label: "Technical Support", val: "support@toolbite.in", icon: <Mail size={20} />, color: "teal", action: "Send Email" },
                   { label: "Strategic Advisor", val: "Schedule a Call", icon: <Clock size={20} />, color: "indigo", action: "Book" }
                 ].map((opt, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-xl bg-${opt.color}-500/10 text-${opt.color}-500`}>
                            {opt.icon}
                         </div>
                         <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opt.label}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{opt.val}</p>
                         </div>
                      </div>
                      <span className="text-xs font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">{opt.action}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px]"></div>
              <Sparkles className="text-white/20 mb-6" size={40} />
              <h4 className="text-xl font-bold mb-2">Priority Lane Active</h4>
              <p className="text-teal-50/80 text-sm mb-6 leading-relaxed font-medium">
                As a Premium Tier client, your requests are automatically routed to the top of our technical queue. Typical response time: **{"<"} 15 mins**.
              </p>
              <button className="w-full py-4 bg-white text-teal-700 font-black rounded-xl hover:scale-105 transition-transform shadow-lg shadow-teal-900/20">
                 Create Support Ticket
              </button>
           </div>
        </div>

        {/* Right: Client FAQ */}
        <div className="lg:col-span-7">
           <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-8">
                 <ShieldQuestion className="text-indigo-500" />
                 <h4 className="text-lg font-bold text-slate-900 dark:text-white">Client Knowledge Hub</h4>
              </div>
              
              <div className="space-y-1">
                 {faqs.map((faq, i) => (
                   <FAQItem key={i} {...faq} />
                 ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                 <p className="text-sm text-slate-500 font-medium italic">Can't find what you need?</p>
                 <button className="flex items-center gap-2 text-sm font-bold text-teal-600 hover:gap-3 transition-all">
                    Search Full Docs <ExternalLink size={16} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSupport;
