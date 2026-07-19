 
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import staticTemplates from '../data/templates';
import TiltCard from './TiltCard';
import Smooth3DSlideshow from './premium/Smooth3DSlideshow';

const ReadyMade = () => {
  // Use the first 8 from static data — no backend required
  const templates = staticTemplates.slice(0, 8);

  return (
    <section id="ready-made" className="py-12 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-black font-extrabold tracking-wide uppercase text-sm mb-3">Template Marketplace</p>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 tracking-tight">Launch Your Premium Website Today.</h2>
          <p className="text-lg text-black">
            Browse our collection of high-converting, fully customized templates designed for specific industries. Install instantly, customize easily.
          </p>
        </div>

        <div className="w-full mt-12 mb-16 overflow-visible">
            <Smooth3DSlideshow slides={templates} showTitle={false} autoplay={true} cardWidth={340} cardHeight={480} gap={10} />
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white transition-all"
          >
            Explore All 20 Templates →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyMade;
