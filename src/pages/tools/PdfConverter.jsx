import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileImage, ArrowRight, Zap, ShieldCheck, Cpu } from 'lucide-react';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const PdfConverter = () => {
  const pdfTools = [
    {
      title: "Image to PDF",
      description: "Merge multiple JPG, PNG, or WEBP images into a single professional PDF document.",
      icon: FileText,
      link: "/tools/image-to-pdf",
      color: "bg-blue-500"
    },
    {
      title: "PDF to Image",
      description: "Extract high-quality PNG or JPG images from any PDF document page by page.",
      icon: FileImage,
      link: "/tools/pdf-to-image",
      color: "bg-teal-500"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title="Free Online PDF Converter | Fast, Secure & Private | ToolBite"
        description="The ultimate browser-native PDF converter suite. Convert images to PDF, extract images from PDF, and manage your documents with 100% privacy and sub-second speed."
        keywords="pdf converter, free pdf tools, image to pdf, pdf to image, online pdf converter, secure pdf tools"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'PDF Converter', url: '/tools/pdf-converter' }
        ]}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-sm mb-6 border border-teal-100"
          >
            <Zap size={16} fill="currentColor" />
            <span>Browser-Native Engine</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            The Ultimate <span className="text-teal-600">PDF Converter</span> Suite
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Professional-grade PDF manipulation without the privacy risks. All processing happens locally on your device—your files never touch our servers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {pdfTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link 
                to={tool.link}
                className="group block h-full bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-500"
              >
                <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <tool.icon size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">{tool.title}</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center text-teal-600 font-bold text-lg group-hover:gap-3 transition-all">
                  <span>Launch Tool</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Absolute Privacy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike other "free" converters that store your sensitive documents, ToolBite processes everything in RAM. Once you close the tab, it's gone forever.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Zero Lag Execution</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our WebAssembly-powered engine bypasses server latency, offering near-instant conversion speeds regardless of your internet connection.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">No Limits, No Ads</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We don't throttle your speed or limit the number of pages. Enjoy a clean, professional environment for all your document needs.
            </p>
          </div>
        </div>

        <section className="mt-32 pt-24 border-t border-slate-200">
          <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Why Use Our PDF Converter?</h2>
          <div className="prose prose-slate max-w-none grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-slate-600">
            <div>
              <p>
                In the modern digital landscape, the PDF (Portable Document Format) remains the standard for business communication. However, the tools to manage them are often trapped behind expensive subscriptions or invasive, ad-riddled websites that compromise your data privacy.
              </p>
              <p className="mt-6">
                ToolBite's PDF Converter suite was built to bridge this gap. We provide the same high-fidelity rendering found in enterprise desktop software, but with the accessibility of a web application.
              </p>
            </div>
            <div>
              <p>
                Whether you're a designer needing to extract assets for a moodboard, or a student merging lecture notes into a single submission file, our tools ensure that resolution remains crisp and file sizes remain optimized.
              </p>
              <ul className="mt-6 list-disc pl-6 space-y-4">
                <li><strong>Lossless Conversion:</strong> We maintain the original vector data wherever possible.</li>
                <li><strong>Cross-Platform:</strong> Works on Windows, macOS, Linux, and mobile browsers.</li>
                <li><strong>No Installation:</strong> Save your disk space; everything runs in the cloud-free sandbox.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PdfConverter;
