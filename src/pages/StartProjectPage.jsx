import React, { useEffect } from 'react';
import OrderForm from '../components/OrderForm';
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
      <OrderForm />
    </div>
  );
};

export default StartProjectPage;
