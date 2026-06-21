import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-[#030712] min-h-screen transition-colors duration-300">
      <SEO 
        title="Disclaimer & Limits of Liability | ToolBite"
        description="Read the ToolBite Disclaimer to understand our terms regarding browser-native utility tools, template usage, third-party advertising, and limits of liability."
        keywords="legal disclaimer, toolbite disclaimer, utility tools liability, template licensing, adsense disclosure"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 md:px-16 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-4 tracking-tight">Disclaimer</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium border-b border-slate-100 dark:border-slate-800 pb-6">Effective Date: June 22, 2026</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-headings:font-bold prose-a:text-teal-600 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-black dark:prose-p:text-slate-400 prose-p:mb-6 prose-li:text-black dark:prose-li:text-slate-400 text-lg leading-relaxed">
            
            <h2>1. Overview and Acceptance</h2>
            <p>
              Welcome to ToolBite. The information, services, utility tools, and ready-made website templates offered on or through the website (the "Site") are owned and operated by ToolBite Inc. ("we," "us," or "our"). This Disclaimer document has been carefully created to define the legal boundaries, limits of liability, and usage disclosures of our platform. By accessing or using the Site, you explicitly acknowledge that you have read, understood, and voluntarily agree to be bound by the terms, disclosures, and conditions outlined in this Disclaimer, as well as our Privacy Policy and Terms of Service.
            </p>
            <p>
              Please read this Disclaimer thoroughly. If you do not agree with any part of this Disclaimer, you are prohibited from using our Site, our digital utility tools, our templates, or engaging our engineering teams for custom web application builds. We reserve the right to modify, amend, or update this Disclaimer at any time without prior notice, and your continued use of the Site signifies your acceptance of any changes made.
            </p>

            <h2>2. Professional Services Disclaimer</h2>
            <p>
              ToolBite is a professional digital agency specializing in bespoke software development, high-performance website design, React frameworks, search engine optimization (SEO), and conversion rate optimization (CRO) consulting. However, the content, templates, resources, and insights provided on this Site are for general informational and educational purposes only.
            </p>
            <p>
              While we strive to implement best practices, modern coding standards, and Core Web Vitals optimizations, we do not guarantee specific business results, traffic increases, ranking improvements, or financial gains. The success of any digital asset depends on numerous factors outside our direct control, including but not limited to the client's business model, copywriting, market demand, hosting environment, third-party APIs, search engine algorithm updates, and external marketing efforts. Any case studies, testimonials, or revenue audits shared on the Site are illustrative of past results and do not constitute a guarantee or promise of future performance.
            </p>

            <h2>3. Browser-Native Utility Tools Sandbox Disclaimer</h2>
            <p>
              Our Site provides a wide variety of free, browser-native utility tools (the "Tools") under the `/tools` directory, including but not limited to the Word Counter, Image Compressor, JSON Formatter, QR Code Generator, Base64 Converter, and PDF Converter. 
            </p>
            <p>
              These Tools are engineered to execute entirely within the client-side sandbox of your local web browser. This means that all file compression, document merging, text parsing, and formatting computations run locally in your device's temporary Random Access Memory (RAM). ToolBite does not upload, transmit, process, or store your documents, text, images, or files on our servers, ensuring absolute data privacy.
            </p>
            <p>
              Despite our commitment to robust engineering, we provide these Tools "as is" and "as available." ToolBite disclaims any liability for:
            </p>
            <ul>
              <li>Potential data corruption or file loss during conversion or compression.</li>
              <li>Errors, inaccuracies, or bugs in mathematical calculations, ROI modeling, or formatting.</li>
              <li>Incompatibility of the Tools with specific browser versions, operating systems, or device architectures.</li>
              <li>Interruptions in service or performance degradation due to client-side memory constraints.</li>
            </ul>
            <p>
              You are solely responsible for keeping backup copies of any files, documents, or data you input into the Tools. Under no circumstances shall ToolBite be liable for any direct, indirect, incidental, special, or consequential damages arising from your reliance on or use of these browser-native Tools.
            </p>

            <h2>4. Third-Party Advertising and Cookies (AdSense Disclosure)</h2>
            <p>
              To keep our utility tools, design laboratories, and articles free and accessible, we display advertisements on the Site, including advertising served through Google AdSense and other third-party programmatic networks.
            </p>
            <p>
              Google, as a third-party vendor, uses cookies to serve ads on our Site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our Site and other sites on the Internet. Third-party ad servers or ad networks may also use cookies, web beacons, and tracking technologies to measure the effectiveness of their advertisements and to personalize the advertising content you see.
            </p>
            <p>
              ToolBite has no access to or control over the cookies and tracking technologies used by these third-party advertisers. We do not endorse, sponsor, or assume responsibility for the content, privacy practices, terms of service, or offerings of any third-party websites or services linked to or advertised on our Site. We advise you to review the privacy policies and disclaimers of any third-party ad networks you interact with to understand your data options, including opting out of personalized advertising via Google's Ad Settings.
            </p>

            <h2>5. Affiliate Links and Sponsored Content</h2>
            <p>
              From time to time, ToolBite may publish content containing affiliate links or sponsored placements. If you click on an affiliate link and purchase a product or service, we may receive a small commission at no additional cost to you. We only recommend platforms, tools, hosting services, and development packages that align with our engineering philosophy and that we believe provide genuine value to our audience.
            </p>
            <p>
              However, the presence of affiliate links does not represent an endorsement of the third-party's overall operations. You are encouraged to conduct your own due diligence before making any purchase decisions. ToolBite is not responsible for any transaction, support issue, or contract entered into between you and a third-party vendor.
            </p>

            <h2>6. Ready-Made Template Licensing and Usage Limits</h2>
            <p>
              Our Site showcases ready-made website templates available for purchase. Upon purchasing a template, you are granted a non-exclusive, non-transferable license to use the template code according to the specific tier purchased (e.g., Personal License, Commercial License, or Agency Extended License).
            </p>
            <p>
              ToolBite does not guarantee that the templates will remain compatible with future updates of external library frameworks, dependencies, or browsers. We do not guarantee that the templates will satisfy specific regulatory requirements (such as ADA accessibility, HIPAA, or local financial regulations) out-of-the-box without further bespoke configuration. The purchaser assumes full responsibility for reviewing, auditing, and securing the code template before deploying it to a production environment.
            </p>

            <h2>7. No Warranties</h2>
            <p>
              THE SITE, THE SERVICES, THE TEMPLATES, AND THE TOOLS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, TOOLBITE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, SECURITY, ACCURACY, AND FREEDOM FROM VIRUSES OR MALWARE. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR THAT ANY DEFECTS WILL BE PROMPTLY CORRECTED.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              If you have any legal questions, complaints, or feedback regarding this Disclaimer or our data processing procedures, please contact our legal compliance team directly at:
            </p>
            <p>
              <strong>Email:</strong> hello.toolbite@gmail.com<br />
              <strong>Phone:</strong> +91 9598037255<br />
              <strong>Mailing Address:</strong> ToolBite Inc., New Delhi, India
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;
