import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, ShoppingCart, Layout, Cpu, 
  ChevronRight, ChevronLeft, Sparkles, 
  CheckCircle2, DollarSign, Clock, Layers
} from 'lucide-react';

const steps = [
  { id: 'type', title: 'Project Type', icon: <Monitor className="w-5 h-5" /> },
  { id: 'pages', title: 'Scope', icon: <Layers className="w-5 h-5" /> },
  { id: 'complexity', title: 'Functionality', icon: <Cpu className="w-5 h-5" /> },
  { id: 'timeline', title: 'Timeline', icon: <Clock className="w-5 h-5" /> },
  { id: 'result', title: 'Estimate', icon: <Sparkles className="w-5 h-5" /> }
];

const types = [
  { id: 'landing', label: 'Landing Page', icon: <Layout />, basePrice: 500, desc: 'High-conversion single page' },
  { id: 'business', label: 'Business Website', icon: <Monitor />, basePrice: 1500, desc: 'Professional corporate presence' },
  { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart />, basePrice: 3500, desc: 'Full-featured online store' },
  { id: 'saas', label: 'SaaS / App', icon: <Cpu />, basePrice: 6000, desc: 'Custom web application' },
];

const pageOptions = [
  { id: 'small', label: '1 - 5 Pages', multiplier: 1 },
  { id: 'medium', label: '5 - 12 Pages', multiplier: 1.4 },
  { id: 'large', label: '12 - 25 Pages', multiplier: 2 },
  { id: 'enterprise', label: '25+ Pages', multiplier: 3.5 },
];

const complexityOptions = [
  { id: 'basic', label: 'Standard UI', multiplier: 1, desc: 'Clean, professional design' },
  { id: 'advanced', label: 'Advanced UX', multiplier: 1.5, desc: 'Animations & custom interactions' },
  { id: 'enterprise', label: 'Elite Custom', multiplier: 2.5, desc: 'Bespoke complex logic & API builds' },
];

const timelineOptions = [
  { id: 'flexible', label: 'Flexible (2+ Months)', multiplier: 0.9 },
  { id: 'standard', label: 'Standard (3-5 Weeks)', multiplier: 1 },
  { id: 'rush', label: 'Rush (1-2 Weeks)', multiplier: 1.6 },
];

const ProjectEstimator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    type: types[1],
    pages: pageOptions[0],
    complexity: complexityOptions[0],
    timeline: timelineOptions[1],
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [finalEstimate, setFinalEstimate] = useState({ min: 0, max: 0, originalMin: 0, originalMax: 0 });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 3) {
        calculateResult();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const calculateResult = () => {
    setIsCalculating(true);
    setCurrentStep(4);
    
    // Artificial delay for "AI" analysis feel
    setTimeout(() => {
      const base = selections.type.basePrice;
      const totalMultiplier = selections.pages.multiplier * selections.complexity.multiplier * selections.timeline.multiplier;
      const result = base * totalMultiplier;
      
      setFinalEstimate({
        min: Math.floor((result * 0.9) / 2),
        max: Math.ceil((result * 1.2) / 2),
        originalMin: Math.floor(result * 0.9),
        originalMax: Math.ceil(result * 1.2)
      });
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-20 px-4">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${i <= currentStep ? 'bg-black text-white shadow-lg shadow-black/10' : 'bg-slate-100 text-slate-400'}`}>
                {i < currentStep ? <CheckCircle2 size={20} /> : step.icon}
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-bold mt-2 hidden sm:block ${i <= currentStep ? 'text-black font-extrabold' : 'text-slate-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Type */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-black text-black mb-3">What are we building?</h3>
                  <p className="text-slate-500 font-medium">Select the core architecture for your digital platform.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {types.map((type) => (
                    <button title="Interactive Button" aria-label="Interactive Button"
                      key={type.id}
                      onClick={() => setSelections({ ...selections, type })}
                      className={`flex items-start gap-4 p-6 rounded-3xl border-2 transition-all text-left ${selections.type.id === type.id ? 'border-black bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${selections.type.id === type.id ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-black text-lg">{type.label}</h4>
                        <p className="text-sm text-slate-500">{type.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Pages */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-black text-black mb-3">Project Scope</h3>
                  <p className="text-slate-500 font-medium">How many unique pages or views do you require?</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {pageOptions.map((opt) => (
                    <button title="Interactive Button" aria-label="Interactive Button"
                      key={opt.id}
                      onClick={() => setSelections({ ...selections, pages: opt })}
                      className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all text-left ${selections.pages.id === opt.id ? 'border-black bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <span className="font-bold text-black text-lg">{opt.label}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selections.pages.id === opt.id ? 'border-black bg-black' : 'border-slate-300'}`}>
                        {selections.pages.id === opt.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Complexity */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-black text-black mb-3">Design & Logic</h3>
                  <p className="text-slate-500 font-medium">What is the desired level of visual and technical sophistication?</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {complexityOptions.map((opt) => (
                    <button title="Interactive Button" aria-label="Interactive Button"
                      key={opt.id}
                      onClick={() => setSelections({ ...selections, complexity: opt })}
                      className={`flex items-start gap-4 p-6 rounded-3xl border-2 transition-all text-left ${selections.complexity.id === opt.id ? 'border-black bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div>
                        <h4 className="font-bold text-black text-lg">{opt.label}</h4>
                        <p className="text-sm text-slate-500">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-black text-black mb-3">Launch Timeline</h3>
                  <p className="text-slate-500 font-medium">When do you need this platform to be operational?</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {timelineOptions.map((opt) => (
                    <button title="Interactive Button" aria-label="Interactive Button"
                      key={opt.id}
                      onClick={() => setSelections({ ...selections, timeline: opt })}
                      className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all text-left ${selections.timeline.id === opt.id ? 'border-black bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <span className="font-bold text-black text-lg">{opt.label}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selections.timeline.id === opt.id ? 'border-black bg-black' : 'border-slate-300'}`}>
                        {selections.timeline.id === opt.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Result */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full"
              >
                {isCalculating ? (
                  <div className="space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-black"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-black">
                        <Sparkles size={32} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-black">AI Analysis in Progress...</h3>
                    <p className="text-slate-500">Comparing parameters with market benchmarks.</p>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in zoom-in duration-700">
                    <div className="p-4 bg-slate-100 text-black rounded-2xl inline-flex gap-2 font-bold mb-4">
                      <Sparkles size={20} />
                      AI Prediction Ready
                    </div>
                    <h3 className="text-2xl font-bold text-black">Your Project Estimate</h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="px-10 py-8 bg-slate-50 rounded-[40px] border border-slate-100 relative">
                        <div className="absolute -top-4 -right-2 md:-right-6 bg-black text-white text-sm font-black px-4 py-2 rounded-full transform rotate-12 shadow-md shadow-black/10">
                          50% OFF
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Range</p>
                        
                        <div className="text-xl md:text-2xl font-bold text-slate-400 line-through mb-1">
                          ${finalEstimate.originalMin?.toLocaleString()} - ${finalEstimate.originalMax?.toLocaleString()}
                        </div>

                        <div className="text-5xl md:text-7xl font-black text-black tracking-tighter">
                          ${finalEstimate.min.toLocaleString()} <span className="text-slate-400">-</span> ${finalEstimate.max.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                      This is an algorithmic estimate based on current market rates for **{selections.type.label}** projects with **{selections.complexity.label}**.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button title="Interactive Button" aria-label="Interactive Button" 
                        onClick={() => setCurrentStep(0)}
                        className="px-8 py-4 rounded-2xl border-2 border-slate-200 font-bold hover:bg-slate-50 transition-all text-black"
                      >
                        Recalculate
                      </button>
                      <button title="Interactive Button" aria-label="Interactive Button" 
                        onClick={() => {
                          window.location.href = `/#ai-strategist?refine=true&budget=${finalEstimate.max}&type=${selections.type.label}&goal=${selections.complexity.label}`;
                        }}
                        className="px-8 py-4 rounded-2xl bg-slate-100 text-black font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
                      >
                        <Sparkles size={18} className="text-black" />
                        Refine with AI Strategist
                      </button>
                      <button title="Interactive Button" aria-label="Interactive Button" 
                        onClick={() => {
                          const contactSection = document.getElementById('custom-order');
                          if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-2xl bg-black text-white font-bold hover:bg-slate-900 transition-all shadow-lg"
                      >
                        Claim This Quote
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {currentStep < 4 && (
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <button title="Interactive Button" aria-label="Interactive Button"
              onClick={prevStep}
              className={`flex items-center gap-2 font-bold text-slate-500 hover:text-black transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ChevronLeft size={20} />
              Back
            </button>
            <div className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              Step {currentStep + 1} of 4
            </div>
            <button title="Interactive Button" aria-label="Interactive Button"
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              {currentStep === 3 ? 'Get Estimate' : 'Next Step'}
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectEstimator;
