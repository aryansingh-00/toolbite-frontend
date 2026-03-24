import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 md:px-16 shadow-sm border border-slate-200"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 mb-10 font-medium border-b border-slate-100 pb-6">Effective Date: March 24, 2026</p>
          
          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-teal-600 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:mb-6 prose-li:text-slate-600 text-lg leading-relaxed">
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to ToolBite. These comprehensive Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you," "User," or "Client"), and ToolBite ("we," "us," or "our"). This agreement strictly governs your access to and use of the ToolBite website, any affiliated media forms, our digital marketplace, our proprietary online tools, and our custom web development services. By accessing, browsing, registering for, or purchasing from ToolBite, you affirmatively declare that you have read, comprehensively understood, and unequivocally agreed to be bound by all of the stipulations contained within these Terms of Service.
            </p>
            <p>
              ToolBite operates at the intersection of premium digital commerce and advanced bespoke software engineering. Because our platform facilitates the licensing of complex programmatic architectures (ready-made website templates) and the commissioning of extensive labor (custom web development sprints), it is absolutely critical that the boundaries of our commercial relationship are rigidly defined. If you do not agree with any clause, sub-clause, or underlying philosophy of these Terms of Service, you are expressly prohibited from utilizing the Site and must immediately discontinue all use of our ecosystem and immediately terminate any active transactions or sessions.
            </p>
            <p>
              We view this document not merely as a legal shield, but as the foundational framework that allows ToolBite to consistently deliver high-performance digital assets without bureaucratic friction. This agreement outlines your sovereign rights as a digital consumer, protects our foundational intellectual property as a development agency, and establishes an exact, predictable protocol for how disputes, transactions, and licensing transfers will be executed. Please read these terms meticulously, as they directly impact your legal rights regarding the digital products you purchase and the custom code our engineering teams deploy on your behalf.
            </p>

            <h2>2. Use of Services</h2>
            <p>
              ToolBite grants you a revocable, non-exclusive, non-transferable, limited license to access and intelligently utilize the ToolBite platform strictly in accordance with these Terms of Service. The functional utility of our website encompasses browsing our public catalog of premium templates, utilizing our integrated AI-driven or utility web tools, reading our proprietary blog content, and engaging with our specialized customer support matrices. 
            </p>
            <p>
              Your right to access our services is entirely granted upon the absolute condition that you utilize the platform in a manner consistent with all applicable local, national, and international laws, regulations, and digital compliance frameworks. You are expected to interact with our digital infrastructure using standard, commercially available web browsers or our officially sanctioned API endpoints. You agree not to deploy automated scraping algorithms, headless browser scripts, or intensive data extraction tools designed to silently siphon our proprietary template layouts, pricing metrics, or user reviews without our explicit, written API authorization.
            </p>
            <p>
              Furthermore, your use of the ToolBite marketplace is subject to intrinsic bandwidth and infrastructural limitations. While we leverage elite Content Delivery Networks (CDNs) to ensure maximum uptime, we strictly forbid "stress testing," Denial of Service (DoS) simulations, or any action that artificially imposes an unreasonable or disproportionately massive load on our server architecture. By utilizing our services, you agree to respect the operational integrity of the platform, ensuring that your actions do not degrade, throttle, or compromise the identical user experiences of other active clients navigating the site concurrently.
            </p>

            <h2>3. Account Responsibilities</h2>
            <p>
              To execute a purchase for a ready-made template or to initiate a custom development sprint, you may be required to register, create, and maintain a secure user account on the ToolBite platform. The creation of this account establishes a persistent digital identity within our database. You absolutely guarantee that all information you submit during the registration process, including your legal name, functional email address, and billing credentials, is accurate, current, and exhaustively complete. Establishing an account using fraudulent identities, temporary "burner" email addresses, or intentionally falsified geographic data to circumvent regional tax codes is fundamentally prohibited and will result in instantaneous account termination.
            </p>
            <p>
              You maintain the exclusive, unilateral responsibility for safeguarding the cryptographic integrity of your account credentials. You are legally responsible for all transactions, interactions, template downloads, and communications that occur under your specific authenticated session. You must not share your login tokens, passwords, or two-factor authentication (2FA) backup codes with any unauthorized third parties. If you suspect that your account has been breached through a phishing vector or a credential stuffing attack, you are contractually obligated to notify ToolBite’s network security team immediately.
            </p>
            <p>
              ToolBite strictly reserves the right to suspend or outright permanently terminate any user account if we discover that the account is being utilized to bypass licensing restrictions, distribute pirated materials, or engage in malicious technical reconnaissance against our servers. Furthermore, if an account remains dormant for an extreme duration, we reserve the right to archive or purge the associated data in accordance with our overarching server optimization protocols and global data privacy retention limits.
            </p>

            <h2>4. Services Description</h2>
            <p>
              ToolBite is uniquely positioned as a dual-facing agency, operating simultaneously as a frictionless digital marketplace for instantaneous template downloads, and as a high-end contracting firm for custom architectural Web Application design. It is paramount that users understand the distinct operational realities of these two separate service layers.
            </p>
            <p>
              <strong>Ready-Made Website Templates:</strong> Our core digital product catalog consists of masterfully engineered, conversion-optimized website templates, meticulously built leveraging modern frameworks like React, Tailwind CSS, and Next.js. When you purchase a template, you are engaging in a digital licensing transaction. Upon successful payment vector clearance, you are granted instantaneous access to the source code, associated digital assets, and structural logic of that specific layout. These templates are meticulously tested across extensive device matrices, but they are ultimately sold "as is." While we guarantee the code functions exactly as demonstrated in our live previews at the time of purchase, we do not inherently offer free customization services to modify the template’s core logic for your unique use case post-download.
            </p>
            <p>
              <strong>Custom Website Services:</strong> Conversely, our custom web development tier is a rigorous, collaborative consulting service. When you commission our senior engineering teams to build a bespoke platform, you are hiring intensive professional labor. These projects strictly adhere to defined scoping documents, explicit deliverables, and mathematically calculated timelines established during our mandatory discovery phases. Unlike our instant templates, custom software sprints require active client collaboration, approvals, and phased milestone deployments.
            </p>
            <p>
              <strong>Digital Product Nature:</strong> You must acknowledge the intangible nature of the products sold on ToolBite. Because you are acquiring source code and digital files—assets that can be effortlessly duplicated and stored locally within milliseconds of a purchase—these transactions differ fundamentally from the purchase of physical consumer goods. Understanding this digital reality is crucial for comprehending our stringent guidelines regarding refunds and intellectual property licensing.
            </p>

            <h2>5. Payments and Pricing</h2>
            <p>
              ToolBite maintains an aggressive commitment to transparent, unambiguous pricing logic. All templates listed on our marketplace display fixed commercial prices, entirely free from stealth billing mechanisms or hidden subscription traps unless explicitly advertised as a recurring Software-as-a-Service (SaaS) product. By initiating a checkout sequence, you authorize ToolBite (via our PCI-compliant third-party payment infrastructure, such as Stripe) to charge your selected credit card or digital wallet for the exact monetary sum listed at the point of sale.
            </p>
            <p>
              <strong>Refund Policy for Digital Goods:</strong> We must enforce a radically strict financial policy due to the frictionless, duplicable nature of raw source code. <strong>All sales of ready-made website templates are absolutley final and entirely non-refundable.</strong> Because you receive immediate, unhindered access to the proprietary codebase upon purchase, we cannot issue refunds for "buyer's remorse," misaligned technological expectations, or a subsequent lack of engineering expertise on the user's part to deploy the code. The sole exception to this absolute rule is if the template is demonstrably, architecturally defective and our support engineering team is entirely unable to rectify the core defect within a reasonable timeframe.
            </p>
            <p>
              <strong>Custom Work Invoicing:</strong> Financial protocols for custom bespoke engineering vastly differ from our template marketplace. Custom web development sprints require a non-refundable upfront mobilization deposit (typically 50% of the aggregate project cost) to secure our engineering bandwidth and initiate the architectural wireframing phase. The remaining balance is strictly due upon project completion, immediately prior to the final migration of the compiled codebase to your live production servers. If a client unilaterally terminates a custom project mid-sprint, ToolBite explicitly retains all previously paid milestone deposits to offset the expended labor bandwidth and opportunity costs.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              The structural integrity and intellectual uniqueness of our codebases are the lifeblood of ToolBite’s corporate valuation. We maintain a zero-tolerance policy regarding software piracy, unauthorized redistribution, and the blatant theft of our digital assets. Intellectual property delineations must be comprehensively understood before executing any transaction on our platform.
            </p>
            <p>
              <strong>ToolBite's Retained Ownership:</strong> ToolBite exclusively retains all absolute copyrights, trademarks, design patents, and intellectual property rights associated with the foundational source code, overarching aesthetic designs, proprietary animations, and algorithmic logic of every ready-made template sold on our marketplace. The purchase of a template is strictly a licensing agreement, not a complete transfer of core intellectual ownership. We own the blueprint; you are purchasing a license to construct a single building using that blueprint.
            </p>
            <p>
              <strong>Granted Usage Rights:</strong> Upon finalized payment, you are granted a non-exclusive, non-transferable commercial license to deploy the purchased template for one single end-product (either for your own company or for one specific external client). You may modify the source code entirely to suit the branding requirements of that specific end-product. However, you are explicitly, legally prohibited from repackaging our source code, redesigning minor aesthetic vectors, and reselling the template as a competing digital product on external marketplaces (such as ThemeForest or competing bespoke agencies). You cannot claim independent authorship of the ToolBite foundational architecture.
            </p>
            <p>
              For our high-level bespoke custom development clients, intellectual property rights are vastly different. Upon absolute clearance of the final invoice milestone, ToolBite completely transfers all intellectual property rights and codebase authorship of the custom-developed end-product directly to the client, free and clear of encumbrances. We do not hold custom client code hostage.
            </p>

            <h2>7. Prohibited Activities</h2>
            <p>
              To maintain an elite, uncompromised digital ecosystem, ToolBite strictly enforces boundary conditions regarding user behavior. Subverting our infrastructure, attacking our codebase, or utilizing our premium templates to facilitate illegal operations will result in immediate tactical disruption of your account and potential reporting to internet oversight authorities.
            </p>
            <p>
              You are explicitly prohibited from deploying ToolBite products, templates, or custom engineering to construct websites that facilitate, promote, or process the sale of illegal narcotics, unregulated firearms, child exploitation material, or networks designed explicitly to execute phishing operations or distribute sophisticated malware payloads. Our high-performance code must not be weaponized as the frontend interface for cybercriminal syndicates or deceptive financial matrix schemes.
            </p>
            <p>
              Furthermore, on a technical infrastructure level, you are forbidden from attempting to reverse engineer our proprietary Node.js backend authentication systems, attempting SQL injection attacks against our marketplace databases, or exploiting Cross-Site Scripting (XSS) vulnerabilities to hijack the active sessions of competing users. You may not deploy custom robotic scripts to arbitrarily scrape our user testimonials, pricing algorithms, or internal dashboard mechanisms to build a mirrored, competing database. Any attempt to subvert the operational security parameters of ToolBite will instantly void any active template licenses you currently possess.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              While ToolBite is obsessively dedicated to engineering flawless, hyper-secure DOM architectures, the unpredictable, universally fragmented nature of modern web browsers and server environments dictates that we must enforce a rigorous limitation of corporate liability. You deploy our templates and utilize our platform entirely at your own intrinsic commercial risk.
            </p>
            <p>
              To the maximum extent permitted by applicable universal law, in no event shall ToolBite, its executive officers, its senior software engineers, its affiliate partners, or its third-party service vendors be held liable for any indirect, punitive, incidental, special, consequential, or catastrophic damages. This includes, without limitation, the catastrophic loss of revenue, extreme depletion of digital data stockpiles, destruction of corporate goodwill, or severe interruption of business operations arising directly or indirectly out of your use, or inability to appropriately use, our digital products or the core marketplace interface.
            </p>
            <p>
              If a purchased template experiences a fatal compilation error that inadvertently takes your business offline during a high-traffic sales event, ToolBite cannot be held financially liable for the monetary volume of the lost transactions. Our maximum total liability for any legally proven claim arising from a product defect or service failure on our end will strictly, unilaterally never exceed the exact monetary amount you initially paid to ToolBite for that specific transaction. By procuring our services, you accept this mathematical cap on liability.
            </p>

            <h2>9. Termination</h2>
            <p>
              ToolBite reserves the aggressive, unilateral right to instantly suspend, block, or permanently terminate your access to the entire platform, your authenticated dashboard, and any forthcoming updates to purchased templates, at our sole and exclusive discretion. We do not require a court mandate to revoke your access if we internally verify that you have breached the operational parameters of this agreement.
            </p>
            <p>
              Termination protocols will be forcefully executed if we discover that you have violated our Intellectual Property clauses by actively reselling our modified source code on black market vendor networks, if you have initiated fraudulent, unauthorized chargebacks against digital downloads via your credit card provider while maintaining possession of the code, or if you consistently leverage abusive, hostile language toward our customer support engineering staff.
            </p>
            <p>
              In the event of an account termination initiated by ToolBite due to a verified Terms of Service violation, you absolutely forfeit any right to access previously purchased digital goods, and you are entirely ineligible for any partial or full financial reimbursements. Furthermore, upon termination, all licenses previously granted to you for our templates are immediately revoked, severely mandating that you must immediately pull down, delete, and cease all commercial operations of any websites currently utilizing our proprietary code.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              The digital landscape is relentlessly volatile, and ToolBite must retain ultimate agility in optimizing our legal frameworks to adapt to new cybersecurity realities, shifting global licensing laws, or new product integrations. Therefore, we explicitly reserve the right to autonomously modify, heavily edit, or completely reconstruct these Terms of Service at any given time, completely without prior explicit consent from our individual users.
            </p>
            <p>
              When we deploy non-trivial updates to this document, we will systematically adjust the "Effective Date" timestamp deeply embedded at the top of this file. For structural changes that drastically alter how licensing works or how custom billing is calculated, we will proactively blast an email notification to all active accounts in our database. However, it ultimately remains your sovereign responsibility to periodically review this URL to ensure you remain fully aware of the active contractual parameters. If you aggressively disagree with any newly implemented clause, your only legal recourse is to immediately cease utilizing the ToolBite platform.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              While ToolBite operates as a borderless digital marketplace servicing clients in dozens of distinct geographic regions across the globe, our corporate scaffolding fundamentally requires a standardized judicial framework for interpreting the complex parameters of this sprawling agreement and resolving unmitigated disputes.
            </p>
            <p>
              These Terms of Service, your utilization of the platform, and any subsequent digital or analog disputes that arise from your relationship with ToolBite shall be governed by, and aggressively construed in accordance with, the internal cyber laws of India, explicitly ignoring its strict conflict of law principles. You unequivocally consent to the exclusive jurisdictional authority and venue of the federal and state courts located within New Delhi, India for all disputes spanning from template licensing friction to complex custom architectural contract breaches. You legally waive any defenses regarding lack of personal jurisdiction or non-convenient forum.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              In the event that you require extensive clarification regarding the intricate nuances of these Terms of Service, if you need to report a user actively violating our intellectual property rights, or if you need to negotiate a specialized, enterprise-level licensing agreement that supersedes the standard terms outlined in this document, our commercial operations team maintains highly active diagnostic communication channels.
            </p>
            <p>
              All formal legal notices, questions concerning user rights, or inquiries regarding the boundaries of template modification should be professionally routed via email. Please direct all high-priority correspondence to:
            </p>
            <p>
              <strong>Email:</strong> terms@toolbite.com
            </p>
            <p>
              Our executive staff aims to acknowledge and begin processing all complex legal inquiries within three highly active standard business days. Should you require physical correspondence, our corporate mailing details can be procured by referencing our centralized Privacy Policy page.
            </p>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
