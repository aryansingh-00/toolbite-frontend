import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Check, Sparkles, Calendar, DollarSign, ArrowRight } from 'lucide-react';

const MobileEstimator = () => {
  const [platform, setPlatform] = useState('Cross-Platform');
  const [appSize, setAppSize] = useState('Medium Core');
  const [designStyle, setDesignStyle] = useState('Premium Custom');
  const [selectedFeatures, setSelectedFeatures] = useState(['Push Notifications', 'Geo-Tracking & Maps']);

  const featuresList = [
    { id: 'push', label: 'Push Notifications', price: 600 },
    { id: 'geo', label: 'Geo-Tracking & Maps', price: 900 },
    { id: 'camera', label: 'Camera & Media Access', price: 500 },
    { id: 'iap', label: 'In-App Purchases', price: 1200 },
    { id: 'biometric', label: 'Biometric Auth (FaceID)', price: 700 },
    { id: 'offline', label: 'Offline-First Sync', price: 1400 },
    { id: 'ai', label: 'AI / Smart Features', price: 1500 },
    { id: 'ble', label: 'Bluetooth / BLE', price: 1100 }
  ];

  const toggleFeature = (label) => {
    setSelectedFeatures(prev =>
      prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
    );
  };

  // Live scope calculation
  const calculations = useMemo(() => {
    // 1. Base Cost by App Size
    let base = 3500; // Small
    let baseWeeks = 4;
    
    if (appSize === 'Medium Core') {
      base = 6500;
      baseWeeks = 7;
    } else if (appSize === 'Large Custom') {
      base = 12500;
      baseWeeks = 12;
    }

    // 2. Platform Multiplier
    let platformMultiplier = 1.0;
    if (platform === 'Cross-Platform') {
      platformMultiplier = 1.35; // Covers iOS & Android in unified codebase
    }

    // 3. Sum of features
    const featuresCost = selectedFeatures.reduce((sum, featLabel) => {
      const feat = featuresList.find(f => f.label === featLabel);
      return sum + (feat ? feat.price : 0);
    }, 0);

    // 4. Design style multiplier
    let designMultiplier = 1.0;
    if (designStyle === 'Premium Custom') {
      designMultiplier = 1.15; // Animation intensive, micro-interactions
    }

    const calculatedTotal = Math.round((base * platformMultiplier + featuresCost) * designMultiplier);
    
    // Timeline scaling
    const extraWeeks = Math.floor(selectedFeatures.length / 2);
    const calculatedWeeks = baseWeeks + extraWeeks;

    // Map calculated cost to a neat pre-filled budget range option in OrderForm
    let budgetRange = '$3,000 - $10,000';
    if (calculatedTotal > 10000) {
      budgetRange = '$10,000+';
    } else if (calculatedTotal < 3000) {
      budgetRange = '$1,000 - $3,000';
    }

    return {
      total: calculatedTotal,
      weeks: calculatedWeeks,
      budgetRange
    };
  }, [platform, appSize, designStyle, selectedFeatures]);

  // Construct dynamic checkout query URL
  const checkoutUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('service', 'mobile-app-development');
    params.set('platform', platform);
    params.set('screens', appSize);
    params.set('features', selectedFeatures.join(','));
    params.set('budget', calculations.budgetRange);
    return `/start-project?${params.toString()}`;
  }, [platform, appSize, selectedFeatures, calculations]);

  return (
    <section id="mobile-estimator" className="py-24 bg-slate-900 text-white rounded-[4rem] px-8 md:px-16 border border-white/10 shadow-2xl relative overflow-hidden my-24">
      {/* Visual background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 font-bold text-xs mb-4 uppercase tracking-widest">
            <Sparkles size={12} className="animate-pulse" />
            Interactive Calculator
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Scope & Estimate Your App</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Select your platform, application footprint, and native features. Our real-time calculator generates an interactive budget benchmark and build roadmap instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Panel: Options selection (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">1. Target Architecture</label>
              <div className="grid grid-cols-3 gap-3">
                {['Cross-Platform', 'Purely iOS', 'Purely Android'].map((plat) => (
                  <button title="Interactive Button" aria-label="Interactive Button"
                    key={plat}
                    type="button"
                    onClick={() => setPlatform(plat)}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold tracking-tight transition-all text-center ${
                      platform === plat 
                        ? 'bg-white border-white text-slate-900 shadow-lg scale-[1.02]' 
                        : 'bg-slate-800/40 border-white/5 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    {plat === 'Cross-Platform' ? 'iOS & Android' : plat.replace('Purely ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* App Footprint / Screens */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">2. Screen Footprint</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Small MVP', desc: '1 - 5 Screens' },
                  { label: 'Medium Core', desc: '6 - 15 Screens' },
                  { label: 'Large Custom', desc: '16+ Screens' }
                ].map((size) => (
                  <button title="Interactive Button" aria-label="Interactive Button"
                    key={size.label}
                    type="button"
                    onClick={() => setAppSize(size.label)}
                    className={`px-3 py-3 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                      appSize === size.label 
                        ? 'bg-white border-white text-slate-900 shadow-lg scale-[1.02]' 
                        : 'bg-slate-800/40 border-white/5 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{size.label}</span>
                    <span className={`text-[9px] font-medium ${appSize === size.label ? 'text-slate-600' : 'text-slate-400'}`}>{size.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Native Features Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">3. Advanced Core Capabilities</label>
              <div className="grid grid-cols-2 gap-3">
                {featuresList.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.label);
                  return (
                    <div 
                      key={feat.id}
                      onClick={() => toggleFeature(feat.label)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none ${
                        isChecked 
                          ? 'bg-white/5 border-teal-400 text-white' 
                          : 'bg-slate-800/40 border-white/5 text-slate-300 hover:border-white/20 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors border ${isChecked ? 'bg-teal-400 border-teal-400 text-slate-950' : 'border-slate-500 bg-transparent'}`}>
                          {isChecked && <Check size={12} strokeWidth={4} />}
                        </div>
                        <span className="text-xs font-semibold">{feat.label}</span>
                      </div>
                      <span className={`text-[10px] font-bold ${isChecked ? 'text-teal-400' : 'text-slate-500'}`}>+${feat.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Design & Spacing style */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">4. Creative UI / Aesthetic Tier</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Clean Standard', desc: 'Sleek, fluid standard layouts' },
                  { label: 'Premium Custom', desc: 'Deep custom styles & custom motions' }
                ].map((tier) => (
                  <button title="Interactive Button" aria-label="Interactive Button"
                    key={tier.label}
                    type="button"
                    onClick={() => setDesignStyle(tier.label)}
                    className={`px-4 py-3 rounded-xl border text-left transition-all flex flex-col justify-center gap-0.5 ${
                      designStyle === tier.label 
                        ? 'bg-white border-white text-slate-900 shadow-lg scale-[1.02]' 
                        : 'bg-slate-800/40 border-white/5 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{tier.label}</span>
                    <span className={`text-[9px] font-medium ${designStyle === tier.label ? 'text-slate-600' : 'text-slate-400'}`}>{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: Output Quote Summary Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-3xl bg-slate-950/80 border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <h4 className="text-lg font-black uppercase tracking-wider text-slate-400 border-b border-white/5 pb-4 mb-6 flex items-center gap-2">
                  <Smartphone size={18} className="text-indigo-400" />
                  Estimated Scope
                </h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Architecture</span>
                    <span className="font-extrabold text-white">{platform === 'Cross-Platform' ? 'iOS & Android' : platform.replace('Purely ', '')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Footprint</span>
                    <span className="font-extrabold text-white">{appSize}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Aesthetics</span>
                    <span className="font-extrabold text-white">{designStyle.replace(' Premium', '')}</span>
                  </div>
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-slate-400">Capabilities</span>
                    <span className="font-extrabold text-white text-right max-w-[160px] truncate block" title={selectedFeatures.join(', ') || 'None selected'}>
                      {selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'None selected'}
                    </span>
                  </div>
                </div>

                {/* Timeline Attraction Display */}
                <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <Calendar className="text-teal-400 shrink-0 animate-pulse" size={24} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-tight">Target Timeline</p>
                    <p className="text-base font-black text-teal-400 mt-0.5">{calculations.weeks} Weeks to Launch</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Benchmark Investment</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-0.5">Fixed cost model</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-3xl font-black text-white tracking-tight">
                      <DollarSign size={24} className="text-teal-400 shrink-0 -mr-1" />
                      {calculations.total.toLocaleString()}
                    </div>
                  </div>
                </div>

                <a 
                  href={checkoutUrl}
                  className="w-full py-4 rounded-xl font-bold bg-white text-slate-900 hover:bg-teal-400 hover:text-slate-950 hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 text-center text-sm uppercase tracking-wider"
                >
                  Proceed with this Scope
                  <ArrowRight size={16} />
                </a>
                
                <p className="text-center text-[9px] text-slate-500 mt-4 leading-relaxed">
                  * Benchmarks represent historical average builds. Dynamic parameters are bound securely into the order funnel.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileEstimator;
