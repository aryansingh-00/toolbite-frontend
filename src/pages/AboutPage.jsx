import React, { useEffect } from 'react';
import { Target, Users, Zap, Award } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About <span className="text-teal-500">ToolBite</span></h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We are a premium agency dedictated to providing high-quality, conversion-optimized websites and web applications 
          for businesses worldwide. Our mission is to democratize elite web design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Founded in 2026, ToolBite started with a simple idea: making enterprise-grade web development accessible to 
            startups and growing businesses. Over the years, we've evolved into a full-scale digital agency, but our 
            core philosophy remains the same.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We believe that a website is more than just a digital presence—it's a powerful tool for growth. 
            That's why our templates and custom solutions are built with performance, SEO, and user experience at the forefront.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Team at work" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-20 shadow-sm border border-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Target className="w-8 h-8 text-teal-500" />, title: "Strategy First", desc: "Every project starts with a solid foundation of research and planning." },
            { icon: <Zap className="w-8 h-8 text-teal-500" />, title: "Fast Execution", desc: "We deliver exceptional quality without the typical agency delays." },
            { icon: <Award className="w-8 h-8 text-teal-500" />, title: "Premium Quality", desc: "We don't compromise on design, usability, or performance metrics." },
            { icon: <Users className="w-8 h-8 text-teal-500" />, title: "Dedicated Support", desc: "Our team is always here to help you scale and maintain your site." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-teal-50/50 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
