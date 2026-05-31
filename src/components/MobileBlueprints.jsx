import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShoppingBag, BarChart3, ArrowRight, Zap, CheckCircle } from 'lucide-react';

const blueprints = [
  {
    id: 'fintech-core',
    name: 'ToolBite Fintech Core',
    tag: 'FINANCIAL AUTOMATION',
    icon: Shield,
    color: 'from-blue-500 to-indigo-600',
    borderGlow: 'hover:shadow-blue-500/20',
    description: 'A pre-audited, ultra-secure transaction engine designed for banking, ledger syncing, and digital assets.',
    savings: 'Saves 140+ Engineering Hours',
    timeline: 'Launch in 4 - 6 Weeks',
    bullets: [
      'AES-256 encrypted biometric authentication vault',
      'Pre-configured Plaid, Stripe & crypto payment pipelines',
      'Real-time transaction queue with offline local caching'
    ],
    tech: ['React Native', 'Supabase DB', 'TailwindCSS', 'Biometrics API']
  },
  {
    id: 'eco-commerce',
    name: 'Eco-Commerce Hyper-Engine',
    tag: 'HIGH-CONVERSION RETAIL',
    icon: ShoppingBag,
    color: 'from-teal-500 to-emerald-600',
    borderGlow: 'hover:shadow-teal-500/20',
    description: 'An optimized commerce runtime tailored for high-speed catalog exploration, cart management, and seamless payments.',
    savings: 'Saves 100+ Engineering Hours',
    timeline: 'Launch in 3 - 5 Weeks',
    bullets: [
      'Sub-100ms multi-level product filter & search indexing',
      'Native Apple Pay & Google Pay checkout flows',
      'Automated dynamic inventory webhook trackers'
    ],
    tech: ['Flutter', 'Node.js Core', 'Redis Cache', 'Stripe Connect']
  },
  {
    id: 'saas-dashboard',
    name: 'SaaS Mobile Dashboard Kit',
    tag: 'ENTERPRISE OPERATIONS',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600',
    borderGlow: 'hover:shadow-purple-500/20',
    description: 'A responsive administrative and analytical app framework with pre-integrated push servers and tenant workspaces.',
    savings: 'Saves 120+ Engineering Hours',
    timeline: 'Launch in 4 - 5 Weeks',
    bullets: [
      'Live websocket notification listener server integration',
      'High-performance chart visualizers with animation triggers',
      'Multi-tenant team selection and role management UI'
    ],
    tech: ['React Native', 'Websockets', 'ChartKit', 'Auth0 Portal']
  }
];

const MobileBlueprints = () => {
  return (
    <section id="mobile-blueprints" className="py-16 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Zap size={10} className="text-teal-400" />
            Accelerated Engineering
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight mb-4">
            Pre-Engineered Mobile Blueprints
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Skip the boilerplate phase entirely. We leverage high-performance, thoroughly audited core engines to launch custom premium mobile applications 3x faster than industry average.
          </p>
        </div>

        {/* Blueprint Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blueprints.map((blueprint, index) => {
            const IconComponent = blueprint.icon;
            
            // Construct prefill checkout link
            const queryParams = new URLSearchParams();
            queryParams.set('service', 'mobile-app-development');
            queryParams.set('blueprint', blueprint.name);
            if (blueprint.id === 'fintech-core') {
              queryParams.set('platform', 'Cross-Platform');
              queryParams.set('features', 'Push Notifications,Biometric Auth (FaceID),Offline-First Sync');
              queryParams.set('budget', '$10,000+');
            } else if (blueprint.id === 'eco-commerce') {
              queryParams.set('platform', 'Cross-Platform');
              queryParams.set('features', 'In-App Purchases,Push Notifications,Geo-Tracking & Maps');
              queryParams.set('budget', '$3,000 - $10,000');
            } else {
              queryParams.set('platform', 'Cross-Platform');
              queryParams.set('features', 'Push Notifications,AI / Smart Features');
              queryParams.set('budget', '$3,000 - $10,000');
            }
            const blueprintUrl = `/start-project?${queryParams.toString()}`;

            return (
              <motion.div
                key={blueprint.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-slate-400 hover:shadow-2xl ${blueprint.borderGlow}`}
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {blueprint.tag}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${blueprint.color} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent size={20} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-black mb-3 tracking-tight">
                    {blueprint.name}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6">
                    {blueprint.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-8">
                    {blueprint.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle size={14} className="text-teal-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {blueprint.tech.map((tag) => (
                      <span key={tag} className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  {/* Attraction benchmarks */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-teal-600">{blueprint.savings}</p>
                      <p className="text-[10px] font-bold text-slate-500">{blueprint.timeline}</p>
                    </div>
                  </div>

                  {/* CTA button */}
                  <a
                    href={blueprintUrl}
                    className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-teal-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 text-center text-xs uppercase tracking-wider shadow-sm"
                  >
                    Deploy with Blueprint
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MobileBlueprints;
