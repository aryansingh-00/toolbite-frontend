/* eslint-disable */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title="Privacy Policy"
        description="Read the ToolBite Privacy Policy to understand how we collect, use, and protect your personal data when you use our web design services and templates."
        keywords="privacy policy, data protection, toolbite privacy, user data safety"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 md:px-16 shadow-sm border border-slate-200"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 mb-10 font-medium border-b border-slate-100 pb-6">Effective Date: March 24, 2026</p>
          
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-teal-600 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:mb-6 prose-li:text-slate-600 text-lg leading-relaxed">
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to ToolBite. At ToolBite, we are deeply committed to maintaining the trust and confidence of our visitors, clients, and partners. 
              ToolBite is an advanced, premium platform where users can purchase ready-made, high-converting website templates and securely order bespoke, custom website development services tailored to their precise strategic needs. 
              Because we operate at the intersection of digital commerce and custom software engineering, the protection of your personal and technical data is not merely a legal obligation—it is a foundational pillar of our corporate philosophy. 
              This comprehensive Privacy Policy has been meticulously drafted to explain in transparent, unambiguous detail exactly how we collect, process, utilize, and protect your information when you interact with our ecosystem.
            </p>
            <p>
              When you browse our marketplace, utilize our digital tools, or engage our engineering teams for custom architectural builds, you are implicitly trusting us with sensitive data. 
              We recognize the monumental importance of user privacy in the modern digital age. Consequently, we have engineered our data collection protocols to be minimally invasive while ensuring we have the necessary contextual information to deliver an elite web experience. 
              This policy governs all data collection across our entire digital infrastructure, from frontend interactions to backend database processing. By accessing ToolBite, you acknowledge that you have read, understood, and agree to the data practices described in this document.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              To provide exceptionally tailored web solutions and a seamless marketplace experience, we must collect specific categories of data. ToolBite employs a principle of data minimization, strictly gathering only what is required to fulfill our operational and commercial obligations.
            </p>
            <p>
              <strong>Personal Information:</strong> When you register an account, purchase a template, or submit a request for custom development, you voluntarily provide direct personal identifiers. This includes your full legal name, preferred contact email address, direct phone number, and physical billing address. This data is critical for establishing a verified commercial relationship, executing legally binding development contracts, and ensuring accurate invoice processing.
            </p>
            <p>
              <strong>Usage Data:</strong> We continuously monitor how our platform is utilized to refine our user journeys. We automatically collect granular usage data, which encompasses the exact timestamp of your visits, the chronological sequence of pages you navigated, the duration of time spent on specific template demonstrations, and the specific interactive elements you engaged with. This data provides our engineering and UX teams with invaluable heatmaps and behavioral flows, allowing us to optimize conversion rates and eliminate interface friction.
            </p>
            <p>
              <strong>Device and Browser Information:</strong> Whenever you access ToolBite, our servers automatically record hardware and software telemetry. This includes your Internet Protocol (IP) address, which helps us determine regional demographics and prevent fraudulent access. We also log your browser type and version (e.g., Chrome, Safari, Firefox), your operating system architecture, screen resolution, and mobile device identifiers if applicable. This technical data ensures our React-based responsive architecture renders flawlessly regardless of the hardware you are utilizing.
            </p>
            <p>
              <strong>Cookies and Tracking Data:</strong> Our platform relies on small data files known as cookies, embedded tracking pixels, and secure session tokens. These mechanisms are vital for maintaining persistent login states, tracking items within your shopping cart, and analyzing macro-level traffic patterns. You will find an exhaustive breakdown of our tracking methodologies in the dedicated Cookies section of this policy.
            </p>

            <h2>3. How We Use Information</h2>
            <p>
              The data we collect is actively utilized to continuously elevate the quality, security, and personalization of the ToolBite experience. We never collect data arbitrarily; every data point has a strict, predefined operational purpose.
            </p>
            <p>
              <strong>Providing Services:</strong> Foremost, your data allows us to execute your purchases. When you buy a template, we use your securely provided financial and personal data to instantly provision your digital download files and generate licensing documentation. For custom development clients, your contact information and provided business data serve as the foundation for our technical scoping sessions, subsequent sprint planning, and staging server deployments.
            </p>
            <p>
              <strong>Improving Website and User Experience:</strong> Behavioral data and hardware analytics are funneled into our continuous improvement pipeline. If our metrics indicate that users are experiencing high bounce rates on a specific template demonstration, our engineers use that data to investigate potential latency issues or UI flaws. We proactively analyze this aggregated data to roll out performance patches, refine our typography hierarchies, and ensure our templates remain at the absolute forefront of modern web design standards.
            </p>
            <p>
              <strong>Communication and Customer Support:</strong> We utilize your email address and phone number to establish a direct, professional line of communication. This includes sending automated post-purchase receipts, instant download links, and critical security advisories. Furthermore, if you encounter a barrier and contact our support infrastructure, we cross-reference your email with our database to instantly pull up your purchase history, allowing our technical support staff to provide rapid, context-aware troubleshooting without asking redundant questions.
            </p>
            <p>
              <strong>Security and Fraud Prevention:</strong> The integrity of our marketplace is paramount. We aggressively utilize IP logs, anomalous behavioral tracking, and location data to automatically flag and block malicious actors, credential stuffing attacks, and fraudulent credit card transactions. By analyzing the technical footprints of our visitors, our automated security protocols can isolate threats before they compromise our infrastructure or the data of our legitimate client base.
            </p>

            <h2>4. Sharing of Information</h2>
            <p>
              ToolBite operates under a strict policy against the monetization of personal data. We categorically do not sell, rent, or trade your personal information to third-party data brokers or marketing agencies. However, the complex nature of operating a global digital marketplace necessitates the highly controlled sharing of data with specific, vetted entities.
            </p>
            <p>
              <strong>Service Providers and Sub-Processors:</strong> We partner with elite, enterprise-grade service providers who perform critical functions on our behalf. These include PCI-compliant payment gateways (such as Stripe) that securely process your credit card numbers without routing raw financial data through our own servers. We also utilize cloud hosting networks (like AWS or Vercel) which physically store our database architectures. These third-party vendors are bound by stringent, legally enforceable data processing agreements that completely restrict them from utilizing your data for any purpose other than operational facilitation.
            </p>
            <p>
              <strong>Legal Requirements and Compliance:</strong> While we aggressively guard user privacy, ToolBite is a legally operating corporate entity. We reserve the right to disclose your personal information if we are explicitly required to do so by local, national, or international law. This includes responding to verified subpoenas, executing court orders, or complying with requests from legitimate law enforcement authorities to assist in the investigation of fraud, intellectual property theft, or significant security breaches.
            </p>
            <p>
              <strong>Business Operations and Transfers:</strong> In the event that ToolBite undergoes a structural business transition—such as a merger, acquisition by another corporate entity, or the sale of a significant portion of our assets—our user database, including your personal information, will invariably be among the transferred assets. We will provide prominent notice on our platform and via email before your personal information is subjected to a different Privacy Policy under a new corporate ownership structure.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We view data security not as a feature, but as a mandatory architectural baseline. ToolBite deploys a multi-layered, defense-in-depth security strategy designed to rigorously protect your personal and financial information against unauthorized access, malicious alteration, exposure, or destruction. We utilize industry-best practices that exceed standard compliance requirements.
            </p>
            <p>
              All data transmitted between your local browser and our server infrastructure is strictly encrypted using Transport Layer Security (TLS/SSL) protocols. This ensures that any data intercepted over public Wi-Fi networks remains cryptographically impenetrable. Our backend databases, which house your profile and purchase history, are geographically distributed across highly secure, SOC 2 compliant data centers utilizing strictly enforced air-gapped backups and granular Role-Based Access Control (RBAC).
            </p>
            <p>
              Furthermore, we do not store raw passwords in our database; we utilize advanced cryptographic hashing algorithms with unique salts (e.g., bcrypt) to ensure that even in the event of a theoretical database compromise, user passwords cannot be reverse-engineered. We continuously subject our codebase to automated vulnerability scanning, dependency auditing, and periodic manual penetration testing to identify and patch potential vectors before they can be exploited. 
            </p>

            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              ToolBite implements advanced cookie and tracking technologies to engineer a frictionless, hyper-personalized user interface. A cookie is a minuscule encrypted text file injected into your device's storage by your web browser, allowing our servers to uniquely recognize your session across multiple page loads. We do not utilize cookies maliciously; rather, they are a fundamental requirement for the modern web applications we deploy.
            </p>
            <p>
              We deploy "Essential Cookies" which are structurally required for our marketplace to function. Without these, our backend node server cannot authenticate your login session, nor can it remember which premium template you placed into your shopping cart. We also utilize "Performance Cookies" which aggregate completely anonymous statistical data regarding page load speeds and error occurrences, empowering our engineers to fix bottlenecks.
            </p>
            <p>
              Additionally, we employ "Marketing and Targeting Cookies" utilized primarily by our advertising partners, such as Google AdSense. These sophisticated tracking pixels record your digital interactions on ToolBite to build a general demographic profile, allowing ad networks to display highly relevant, curated advertisements to you on external websites. While you possess the complete autonomy to explicitly block or delete these cookies via your browser's security settings, doing so may degrade certain customized elements of the ToolBite experience or require you to repeatedly authenticate your account.
            </p>

            <h2>7. User Rights</h2>
            <p>
              ToolBite operates globally, and we universally respect the fundamental data rights granted by major international privacy frameworks, including the European General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). Regardless of your geographic location, we believe you should maintain absolute sovereignty over your digital footprint.
            </p>
            <p>
              <strong>Right to Access:</strong> You possess the inalienable right to request a complete, plain-text export of all personal data we currently hold regarding your account. Upon receiving a verified request, our data compliance team will compile your profile parameters, usage logs, and purchase history into a standardized format.
            </p>
            <p>
              <strong>Right to Request Deletion:</strong> Often referred to as the "Right to be Forgotten," you may command us to permanently eradicate your personal data from our active databases and localized backups. However, please note that we may legally be required to retain specific transactional data points for mandatory tax auditing and localized financial compliance purposes.
            </p>
            <p>
              <strong>Right to Modify Data:</strong> If your professional contact information changes, or if you discover inaccuracies within your profile infrastructure, you possess the ongoing right to rectify this data. Much of this can be achieved autonomously via your user dashboard, but our support team stands ready to manually overwrite incorrect data points upon request. To invoke any of these sovereign rights, please contact our dedicated privacy routing detailed in the concluding section.
            </p>

            <h2>8. Third-party Services</h2>
            <p>
              To deliver a rapid, globally scalable digital platform, ToolBite integrates numerous elite software-as-a-service (SaaS) dependencies into our tech stack. These third-party tools inevitably process fragments of your data, and we maintain complete transparency regarding these partnerships.
            </p>
            <p>
              We heavily utilize third-party analytics infrastructures, predominantly Google Analytics, to process raw traffic data into actionable behavioral insights. These analytical engines help us understand regional demographics, enabling us to optimize our server content delivery networks (CDNs) for faster global load times. For our hosting and continuous deployment pipelines, we leverage cloud platform providers who physically maintain the hardware that runs ToolBite. 
            </p>
            <p>
              Additionally, our platform incorporates external APIs for features like our automated live chat matrix and instantaneous email dispatch systems (e.g., SendGrid). Every third-party service provider integrated into the ToolBite ecosystem has been subjected to a rigorous security audit. However, we strongly advise you to independently review the privacy policies of these major tech providers, as their internal data processing methodologies operate independently of ToolBite’s explicit jurisdiction.
            </p>

            <h2>9. Changes to Privacy Policy</h2>
            <p>
              The technological landscape is aggressively dynamic, and global legislative frameworks concerning digital privacy are continuously evolving. Consequently, ToolBite reserves the explicit right to autonomously amend, update, or completely overhaul this Privacy Policy at our discretion to reflect new operational protocols, newly integrated third-party APIs, or shifting international legal mandates.
            </p>
            <p>
              We fundamentally oppose stealth policy modifications. Should we enact significant, structural changes that severely alter how we process or monetize your data, we will aggressively notify our user base. This notification will manifest as prominent alert banners injected into our user interface and direct, plaintext email dispatches to the primary addresses associated with active accounts. Any continued utilization of the ToolBite platform following these publicly declared modifications constitutes your legally binding acceptance of the revised data protocols.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              Transparency is useless without accessibility. We maintain open channels for all inquiries, disputes, or clarification requests regarding how your digital information is handled within our architecture. If you require further extrapolation on any clause within this document, or if you wish to formally invoke your sovereign data rights, please route your communications to our dedicated compliance team.
            </p>
            <p>
              You may initiate a dialogue with us at any time by emailing us directly at:<br/>
              <strong>Email:</strong> privacy@toolbite.com
            </p>
            <p>
              While we primarily operate as an agile digital entity, formal written correspondence and legal inquiries can be directed to our corporate headquarters located at:<br/>
              <strong>Address:</strong> ToolBite Inc., New Delhi, India 110001
            </p>
            <p>
              Our internal compliance personnel typically acknowledge receipt of all privacy-related inquiries within 48 operational hours, and we strive to wholly resolve complex technical data disputes within a maximum window of 30 days.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
