import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock, DollarSign, Cpu, CheckCircle2, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

const PLATFORMS = [
  { id: 'web', name: 'Web Application / Site', basePrice: 99, baseWeeks: 1, desc: 'High-performance web architecture & corporate platforms' },
  { id: 'mobile', name: 'Mobile App (iOS & Android)', basePrice: 299, baseWeeks: 3, desc: 'Native & cross-platform smartphone application' },
  { id: 'ecommerce', name: 'E-Commerce Superstore', basePrice: 249, baseWeeks: 2, desc: 'High-conversion storefront with dynamic checkout' },
  { id: 'ai', name: 'Custom AI Tool / SaaS', basePrice: 399, baseWeeks: 4, desc: 'Automated AI utilities, LLM pipelines & SaaS engines' }
];

const SCALES = [
  { id: 'mvp', name: 'MVP Launchpad', multiplier: 1.0, weeksAdd: 0, label: 'Fastest turn-around for emerging brands' },
  { id: 'pro', name: 'Professional Scale', multiplier: 1.8, weeksAdd: 2, label: 'Bespoke architecture for scaling businesses' },
  { id: 'enterprise', name: 'Enterprise Infrastructure', multiplier: 3.2, weeksAdd: 4, label: 'High-availability, mission-critical ecosystem' }
];

const ADDONS = [
  { id: 'auth', name: 'Biometric & Supabase Auth', price: 50, tech: 'Supabase / Auth0' },
  { id: 'payments', name: 'Stripe & Payment Gateways', price: 75, tech: 'Stripe Connect' },
  { id: 'ai-gen', name: 'AI / LLM API Integration', price: 120, tech: 'Gemini / OpenAI' },
  { id: 'realtime', name: 'Real-time Push & Websockets', price: 80, tech: 'Websockets / FCM' },
  { id: 'analytics', name: 'Custom Analytics Dashboard', price: 60, tech: 'Recharts / Tailwind' }
];

const ProjectCostEstimator = () => {
  const [platform, setPlatform] = useState('web');
  const [scale, setScale] = useState('pro');
  const [selectedAddons, setSelectedAddons] = useState(['auth', 'payments']);

  const selectedPlatformObj = PLATFORMS.find(p => p.id === platform);
  const selectedScaleObj = SCALES.find(s => s.id === scale);

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const item = ADDONS.find(a => a.id === addonId);
    return acc + (item ? item.price : 0);
  }, 0);

  const calculatedPrice = Math.round((selectedPlatformObj.basePrice * selectedScaleObj.multiplier) + addonsTotal);
  const calculatedWeeks = selectedPlatformObj.baseWeeks + selectedScaleObj.weeksAdd + (selectedAddons.length > 2 ? 1 : 0);

  const handleBookConsultation = () => {
    const summary = `${selectedPlatformObj.name} (${selectedScaleObj.name}) ~ Est: $${calculatedPrice} (${calculatedWeeks} wks)`;
    window.dispatchEvent(new CustomEvent('open-appointment-modal', { detail: { notes: `Project Estimate: ${summary}` } }));
  };

  return (
    <section id="cost-estimator" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Glow Backdrops */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-teal-500/20">
            <Calculator size={14} className="text-teal-400" />
            Instant Project Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive Project <span className="text-teal-400">Cost & Timeline Estimator</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Configure your technical requirements below for a real-time estimate of cost, delivery timeline, and recommended architecture.
          </p>
        </div>

        {/* Estimator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            
            {/* Step 1: Select Platform */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center text-[10px] font-black">1</span>
                Select Core Platform
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORMS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      platform === p.id 
                        ? 'bg-teal-500/10 border-teal-500 text-white shadow-lg' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-white mb-1">{p.name}</p>
                      <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Project Scale */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center text-[10px] font-black">2</span>
                Select Scope & Scale
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCALES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setScale(s.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      scale === s.id 
                        ? 'bg-teal-500/10 border-teal-500 text-white' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <p className="font-bold text-xs text-white mb-1">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Modules */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center text-[10px] font-black">3</span>
                Select Advanced Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                        isChecked 
                          ? 'bg-teal-500/10 border-teal-500/50 text-white' 
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className={isChecked ? 'text-teal-400' : 'text-slate-600'} />
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">+{addon.tech}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Live Estimate Card Column */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Estimated Investment</span>
                <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 rounded-full text-[10px] font-bold uppercase">Fixed Cost Model</span>
              </div>

              {/* Price & Timeline Output */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">${calculatedPrice}</span>
                  <span className="text-xs text-slate-400">USD (Starting)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                  <Clock size={14} />
                  <span>Estimated Delivery: {calculatedWeeks} {calculatedWeeks === 1 ? 'Week' : 'Weeks'}</span>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Core Platform:</span>
                  <span className="font-bold text-white">{selectedPlatformObj.name}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Scope Level:</span>
                  <span className="font-bold text-white">{selectedScaleObj.name}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Active Features:</span>
                  <span className="font-bold text-teal-400">{selectedAddons.length} Modules</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleBookConsultation}
                className="w-full py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-xl group"
              >
                Book Appointment With This Estimate
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-slate-500 leading-normal">
                No obligation. Direct Developer consultation • Linked to hello.toolbite@gmail.com
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectCostEstimator;
