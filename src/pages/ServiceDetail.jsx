import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Rocket, ShieldCheck, Globe } from 'lucide-react';
import { servicesData } from '../data/content';
import SEO from '../components/SEO';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/#services" replace />;
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title={service.seoTitle || service.title}
        description={service.extendedDescription || service.description}
        keywords={`${service.title.toLowerCase()}, web design services, digital engineering, toolbite`}
        serviceData={{
          name: service.title,
          category: "Digital Agency Services"
        }}
        faqData={service.faqs}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/#services' },
          { name: service.title, url: `/services/${service.slug}` }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-8 shadow-sm border ${service.border}`}>
              {service.icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              {service.extendedDescription || service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/start-project" 
                className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-teal-600 transition-all hover:-translate-y-1 text-center"
              >
                Start Your Project
              </Link>
              <Link 
                to="/portfolio" 
                className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-center"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 blur-3xl rounded-[4rem]"></div>
            <div className="relative aspect-[4/3] bg-slate-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center p-12">
              <div className="text-center">
                <Rocket size={80} className="text-teal-400 mb-6 mx-auto animate-bounce" />
                <p className="text-teal-400 font-black text-2xl uppercase tracking-widest">High Performance</p>
                <p className="text-slate-400 mt-2">Engineered for Sub-Second Results</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features / Why Choose Us for this Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Zap className="text-amber-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Rapid Deployment</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We leverage proprietary modular frameworks to launch your {service.title.toLowerCase()} infrastructure 3x faster than traditional agencies.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <ShieldCheck className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every {service.title.toLowerCase()} build undergoes rigorous security auditing and penetration testing before the final production push.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Globe className="text-teal-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Global Scalability</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our architectures are designed to scale gracefully from your first 1,000 users to millions of global visitors without performance degradation.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] p-12 md:p-24 border border-slate-100 shadow-sm mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Mastering {service.title}</h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
              <p>
                In today's hyper-competitive digital economy, {service.title.toLowerCase()} is no longer just a technical requirement—it's a critical business advantage. Whether you are a scaling startup or a global enterprise, the way your {service.title.toLowerCase()} layer functions directly impacts your bottom line.
              </p>
              
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 my-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Engineering Philosophy</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-500 shrink-0 mt-1" size={20} />
                    <span>Performance-first code structure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-500 shrink-0 mt-1" size={20} />
                    <span>User-centric design thinking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-500 shrink-0 mt-1" size={20} />
                    <span>Seamless third-party integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-500 shrink-0 mt-1" size={20} />
                    <span>Future-proof tech stack selection</span>
                  </li>
                </ul>
              </div>

              <p>
                At ToolBite, we don't just "deliver projects." We architect digital ecosystems. Our approach to {service.title.toLowerCase()} involves deep technical scoping, pixel-perfect UI execution, and persistent optimization loops to ensure your platform stays ahead of the curve.
              </p>
            </div>
          </div>
        </div>

        {/* Service FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center tracking-tight">Service FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-start gap-3">
                    <span className="text-teal-500 font-black">Q.</span>
                    {faq.question}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-teal-600 rounded-[3rem] p-12 md:p-20 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Ready to Engineer Your Success?</h2>
          <p className="text-teal-50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our {service.title.toLowerCase()} expertise can solve your specific business challenges and drive massive ROI.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-12 py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:scale-105 transition-transform group"
          >
            Consult with our Engineers
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
