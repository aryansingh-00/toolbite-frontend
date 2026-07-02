import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu } from 'lucide-react';

const DirectLinkBanner = () => {
  const adUrl = 'https://www.effectivecpmnetwork.com/yqcfjry38f?key=82473de6cc0e768dbcc47406b79e5ab7';

  return (
    <div className="w-full my-12 not-prose">
      <div className="relative rounded-[32px] overflow-hidden bg-slate-900 text-white p-8 md:p-12 border border-slate-800 shadow-2xl">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Text Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles size={12} className="animate-pulse" />
              Sponsor Feature
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Bespoke Software Engineering & <br />
              <span className="text-teal-400">Conversion Rate Dominance</span>
            </h3>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              Ready to scale past legacy builders? We design and deploy sub-second React templates, premium e-commerce architectures, and secure client-side AI modules. 100% data privacy guaranteed.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-teal-500" /> HIPAA & GDPR Compliant</span>
              <span className="flex items-center gap-1.5"><Cpu size={14} className="text-blue-500" /> Edge Optimized CDNs</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="flex justify-start lg:justify-end">
            <a 
              href={adUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl shadow-teal-500/20 hover:scale-[1.03] group w-full sm:w-auto justify-center"
            >
              Claim My Free System Audit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectLinkBanner;
