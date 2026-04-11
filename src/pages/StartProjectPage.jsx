import React, { useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import ProjectEstimator from '../components/ProjectEstimator';
import SEO from '../components/SEO';

const StartProjectPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-slate-900 flex flex-col justify-center">
      <SEO 
        title="Start Your Project"
        description="Ready to launch? Tell us about your project and our elite development team will bring your vision to life. Get started with ToolBite."
        keywords="start web project, custom web development, hire react developers, launch website"
      />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Let's <span className="text-teal-500">Initialize</span> Your Vision.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Use our AI Estimator to get a technical benchmark, or scroll down to submit your detailed project scope directly.
          </p>
        </div>
        <ProjectEstimator />
      </div>
      <div id="order-form-container">
        <OrderForm />
      </div>
    </div>
  );
};

export default StartProjectPage;
