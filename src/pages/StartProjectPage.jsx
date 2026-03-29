import React, { useEffect } from 'react';
import OrderForm from '../components/OrderForm';

const StartProjectPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-slate-900 flex flex-col justify-center">
      <OrderForm />
    </div>
  );
};

export default StartProjectPage;
