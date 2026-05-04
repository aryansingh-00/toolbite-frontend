import React from 'react';
import { 
  Briefcase, Image as ImageIcon, Rocket, ShoppingCart, 
  UserCircle, RefreshCcw, Code2, Wrench,
  Zap, Palette, Smartphone, DollarSign, Search, MessageSquare, ShieldCheck, MousePointerClick,
  Cpu, Database, Lock, Settings, FileText, Globe
} from 'lucide-react';

export const servicesData = [
  { 
    icon: <Smartphone className="w-6 h-6 text-indigo-500" />, 
    title: 'Premium Mobile Applications', 
    slug: 'mobile-app-development',
    seoTitle: 'Premium Mobile App Development Services | iOS & Android | ToolBite',
    description: 'Architecting high-performance native (iOS/Android) and cross-platform apps using React Native and Flutter for a seamless mobile experience.', 
    extendedDescription: 'We specialize in building sub-second performance mobile applications that dominate the App Store and Google Play. Our engineering approach focuses on offline-first architecture, smooth 60FPS animations, and enterprise-grade security.',
    bg: 'bg-indigo-50', 
    border: 'border-indigo-200',
    faqs: [
      { question: 'Do you build native or hybrid mobile apps?', answer: 'We specialize in both. We use React Native and Flutter for high-performance cross-platform apps, and Swift/Kotlin for purely native requirements depending on your project needs.' },
      { question: 'How long does it take to develop a mobile app?', answer: 'A typical MVP (Minimum Viable Product) takes between 4 to 8 weeks, while complex enterprise apps with deep integrations can take 3+ months.' },
      { question: 'Can you help with App Store and Google Play submission?', answer: 'Yes, we handle the entire deployment process, including app store optimization (ASO), metadata preparation, and navigating the review process.' }
    ]
  },
  { 
    icon: <Briefcase className="w-6 h-6 text-blue-500" />, 
    title: 'Corporate Web Platforms', 
    slug: 'corporate-web-design',
    seoTitle: 'Enterprise Corporate Web Design & Development | ToolBite',
    description: 'Establish market dominance with a strategically engineered corporate presence designed to capture institutional B2B leads and drive sustained growth.', 
    extendedDescription: 'Your corporate website should be your most powerful sales asset. We build high-authority web platforms for B2B enterprises, focusing on lead generation, brand credibility, and seamless CRM integrations.',
    bg: 'bg-blue-50', 
    border: 'border-blue-200',
    faqs: [
      { question: 'What makes a corporate website effective for B2B?', answer: 'An effective B2B site focuses on authority, trust, and lead generation. We implement deep SEO, clear value propositions, and frictionless contact funnels.' },
      { question: 'Can you integrate the website with our CRM?', answer: 'Yes, we have extensive experience integrating corporate platforms with HubSpot, Salesforce, Pipedrive, and custom internal CRM systems.' }
    ]
  },
  { 
    icon: <ShoppingCart className="w-6 h-6 text-emerald-500" />, 
    title: 'Scalable E-Commerce', 
    slug: 'ecommerce-development',
    seoTitle: 'Scalable E-commerce Development Services | Headless Commerce | ToolBite',
    description: 'Enterprise-grade digital storefronts engineered for high-volume transactions, advanced behavioral tracking, and optimized checkouts to maximize continuous revenue.', 
    extendedDescription: 'We build the future of retail. Our headless e-commerce solutions using Shopify Plus, Medusa, or custom architectures ensure that your store can handle flash sales and global traffic without breaking a sweat.',
    bg: 'bg-emerald-50', 
    border: 'border-emerald-200',
    faqs: [
      { question: 'Which e-commerce platform do you recommend?', answer: 'We recommend Shopify Plus for most scaling brands, but we also build custom headless commerce solutions using MedusaJS or Next.js Commerce for unique requirements.' },
      { question: 'Do your e-commerce sites handle high traffic spikes?', answer: 'Absolutely. We architect our stores using serverless edge computing and CDNs to ensure 100% uptime even during massive flash sales or holiday peaks.' }
    ]
  },
  { 
    icon: <RefreshCcw className="w-6 h-6 text-teal-500" />, 
    title: 'Strategic UX Overhauls', 
    slug: 'ux-ui-redesign',
    seoTitle: 'Strategic UI/UX Redesign Services | Improve Conversions | ToolBite',
    description: 'We dismantle legacy frameworks and install modern, conversion-focused user interfaces to instantly drastically improve customer retention and lifetime value.', 
    extendedDescription: 'Bad design is expensive. We perform deep audit-driven UI/UX overhauls that eliminate friction, reduce bounce rates, and guide your users toward the "Buy" button with psychological precision.',
    bg: 'bg-teal-50', 
    border: 'border-teal-200' 
  },
  { icon: <ImageIcon className="w-6 h-6 text-purple-500" />, title: 'Elite Portfolio Showcases', slug: 'portfolio-design', description: 'Command industry respect. We build high-fidelity interactive galleries with flawless scrolling dynamics to showcase prestigious portfolios and enterprise case studies.', bg: 'bg-purple-50', border: 'border-purple-200' },
  { icon: <Rocket className="w-6 h-6 text-rose-500" />, title: 'High-Impact Landing Pages', slug: 'landing-page-design', description: 'Frictionless, psychologically structured single-page ecosystems hyper-optimized to convert ad traffic into qualified pipeline inventory.', bg: 'bg-rose-50', border: 'border-rose-200' },
  { icon: <UserCircle className="w-6 h-6 text-amber-500" />, title: 'Authority Branding', slug: 'branding-services', description: 'Solidify your industry reputation with a bespoke, lightning-fast architecture designed specifically for thought leaders, elite coaches, and disruptive founders.', bg: 'bg-amber-50', border: 'border-amber-200' },
  { icon: <Code2 className="w-6 h-6 text-indigo-500" />, title: 'Custom SaaS Architecture', slug: 'saas-development', description: 'Bespoke software solutions bridging highly complex server-side data infrastructure with intuitive, zero-latency client-side dashboards.', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  { icon: <Wrench className="w-6 h-6 text-slate-500" />, title: 'Dedicated Infrastructure Support', slug: 'web-maintenance', description: 'Uninterrupted technical safeguarding. We provide continuous server monitoring, impenetrable security updates, and active performance scaling.', bg: 'bg-slate-100', border: 'border-slate-300' },
  { icon: <Cpu className="w-6 h-6 text-orange-500" />, title: 'Advanced API Integrations', slug: 'api-integration', description: 'Seamlessly connecting your platform to Stripe, Twilio, and enterprise CRM solutions with custom middleware for complex data handling.', bg: 'bg-orange-50', border: 'border-orange-200' },
  { icon: <Database className="w-6 h-6 text-cyan-500" />, title: 'Real-Time Data Analytics', slug: 'data-analytics', description: 'Engineering live-streaming analytics pipelines and WebSocket-driven interactive dashboards for immediate business intelligence.', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  { icon: <Lock className="w-6 h-6 text-red-500" />, title: 'Secure User Auth Logic', slug: 'auth-security', description: 'Implementing multi-tier user authentication, RBAC (Role-Based Access Control), and session security protocols for sensitive data.', bg: 'bg-red-50', border: 'border-red-200' },
  { icon: <Settings className="w-6 h-6 text-teal-500" />, title: 'Headless CMS Ecosystems', slug: 'headless-cms', description: 'Architecting dynamic content pipelines using Sanity, Contentful, or Strapi to give you total control over high-resolution assets.', bg: 'bg-teal-50', border: 'border-teal-200' },
  { 
    icon: <FileText className="w-6 h-6 text-blue-600" />, 
    title: 'AI-Powered Resume Builder', 
    slug: 'resume-builder-service',
    seoTitle: 'Professional AI Resume Builder Service | Career-Driven Design | ToolBite',
    description: 'Engineer a career-defining presence with our AI-optimized resume building infrastructure, designed to pass ATS filters and command recruiter attention.', 
    extendedDescription: 'We don\'t just format text; we architect career assets. Our AI-powered resume builder combines industry-leading design with semantic optimization to ensure your professional profile stands out in the most competitive talent pools.',
    bg: 'bg-blue-50', 
    border: 'border-blue-200',
    faqs: [
      { question: 'Is the resume builder ATS-friendly?', answer: 'Yes, every resume generated uses a clean, semantic structure specifically optimized to be parsed correctly by all major Applicant Tracking Systems.' },
      { question: 'Can I export my resume to PDF?', answer: 'Absolutely. We provide high-resolution PDF exports with pixel-perfect typography and layout preservation.' }
    ]
  },
  { 
    icon: <Globe className="w-6 h-6 text-indigo-600" />, 
    title: 'Ready-Made Website Builder', 
    slug: 'website-builder',
    seoTitle: 'Ready-Made Website Builder | Rapid Deployment Platforms | ToolBite',
    description: 'Launch enterprise-grade digital platforms in days, not months. Choose from our vault of pre-engineered, high-performance templates tailored for your industry.', 
    extendedDescription: 'Our Ready-Made platforms are the bridge between generic builders and custom engineering. We provide the robust architecture of a custom build with the rapid deployment speed of a template, allowing you to dominate your market instantly.',
    bg: 'bg-indigo-50', 
    border: 'border-indigo-200',
    faqs: [
      { question: 'How fast can I launch my website?', answer: 'Our Ready-Made platforms can be fully branded, populated, and deployed to a global CDN within 3 to 7 days.' },
      { question: 'Are these templates customizable?', answer: 'Yes. We clone the core architecture and then universally scale your specific brand colors, typography, and content across the entire system.' }
    ]
  }
];

export const pricingPlans = [
  { name: 'Growth', originalPrice: '$198', price: '$99', audience: 'Optimized launchpads for emerging brands and early-stage startups.', features: [ { name: 'Up to 5 Core Pages', included: true }, { name: 'Omnichannel Responsive UX', included: true }, { name: 'Lead Capture Architecture', included: true }, { name: 'Technical SEO Foundation', included: true }, { name: 'Curated Premium Agency Layouts', included: true }, { name: 'Rapid Deployment: 5-7 Days', included: true }, { name: '2 Iteration Cycles', included: true }, { name: '1 Month Priority Support', included: true } ], highlight: false, buttonText: 'Initiate Growth Plan' },
  { name: 'Enterprise', originalPrice: '$398', price: '$199', audience: 'Complete bespoke solutions for scaling businesses dominating their sector.', features: [ { name: 'Up to 15 Distinct Pages', included: true }, { name: 'Omnichannel Responsive UX', included: true }, { name: 'Dynamic CMS Integrations', included: true }, { name: 'Advanced Semantic Tagging', included: true }, { name: 'Bespoke UI/UX Engineering', included: true }, { name: 'Strategic Sprint: 3-4 Weeks', included: true }, { name: 'Unlimited Revisions', included: true }, { name: '3 Months Priority Support', included: true } ], highlight: true, buttonText: 'Deploy Enterprise Plan' },
  { name: 'SaaS / App', originalPrice: '$998', price: '$499', audience: 'Complex infrastructure builds requiring logic, states, and intensive databases.', features: [ { name: 'Unlimited Scaling & Accounts', included: true }, { name: 'Immersive Dashboard UX', included: true }, { name: 'Custom Logic & Authentication', included: true }, { name: 'Comprehensive Architecture SEO', included: true }, { name: 'Award-Winning Interface Design', included: true }, { name: 'Development Lifecycle: 6-8 Weeks', included: true }, { name: 'Unlimited Scope Protection', included: true }, { name: '6 Months Full Engineering Support', included: true } ], highlight: false, buttonText: 'Request Architecture Proposal' }
];

export const portfolioProjects = [
  { title: 'Nexus Financial Operating System', category: 'Fintech Web Application', description: 'A massively scalable banking interface engineered to process millions in daily transactional volume with absolute zero-latency analytics integration.', tags: ['SaaS Architecture', 'Dashboard UX', 'React/Node'], image: 'bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-600', thumbnail: '/images/projects/nexus-finance.png', mockup: 'left', liveUrl: '/demos/nexus-finance/index.html' },
  { title: 'Aura Premium Streetwear', category: 'Headless E-Commerce Build', description: 'A hyper-optimized headless commerce application that reduced cart abandonment by 34% through a custom dynamic Stripe integration.', tags: ['E-Commerce', 'Jamstack', 'Shopify Plus'], image: 'bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500', thumbnail: '/images/projects/aura-streetwear.png', mockup: 'center', liveUrl: '/demos/aura-streetwear/index.html' },
  { title: 'Quantix AI Landing Platform', category: 'Enterprise B2B Lead Generation', description: 'A sleek, psychologically persuasive funnel engineered for a flagship AI firm, directly resulting in a 240% increase in qualified enterprise meeting bookings.', tags: ['Conversion Funnel', 'B2B Tech', 'Framer Motion'], image: 'bg-gradient-to-br from-teal-400 via-emerald-400 to-green-500', thumbnail: '/images/projects/quantix-ai.png', mockup: 'right', liveUrl: '/demos/quantix-ai/index.html' },
  { title: 'The Monarch Group', category: 'Global Real Estate Firm', description: 'A prestigious property portfolio interface allowing elite international buyers to seamlessly explore ultra-luxury properties with integrated virtual touring.', tags: ['Corporate Identity', 'Real Estate', 'Global Scale'], image: 'bg-gradient-to-br from-amber-200 via-yellow-400 to-orange-500', thumbnail: '/images/projects/monarch-realestate.png', mockup: 'left', liveUrl: '/demos/monarch-realestate/index.html' },
  { title: 'Vitality Health Portal', category: 'Compliance-Grade Healthcare Infrastructure', description: 'A HIPAA-compliant patient management system seamlessly bridging legacy hospital databases with modern, accessible patient-facing diagnostic reporting tools.', tags: ['Web Application', 'Medical Security', 'API Integration'], image: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500', thumbnail: '/images/projects/vitality-health.png', mockup: 'center', liveUrl: '/demos/vitality-health/index.html' },
  { title: 'Visionary Studio Labs', category: 'Immersive Portfolio Framework', description: 'A stunning WebGL-powered 3D portfolio architecture built for an awarded production studio to showcase high-resolution interactive case studies without performance drops.', tags: ['Web3/WebGL', 'Creative Agency', 'Performance Tuning'], image: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500', thumbnail: '/images/projects/visionary-studio.png', mockup: 'right', liveUrl: '/demos/visionary-studio/index.html' },
  { title: 'Stylekat Salon', category: 'Appointment Booking Platform', description: 'An elegant, high-conversion booking ecosystem authored by Aryan Singh. The platform features a seamless interactive scheduling interface that enables clients to instantly reserve haircut slots and browse premium salon services.', tags: ['Booking System', 'Salon Platform', 'Custom UX'], image: 'bg-gradient-to-br from-pink-500 via-rose-400 to-red-500', thumbnail: '/images/projects/stylekat.png', mockup: 'center', liveUrl: 'https://stylekat.in/' },
  { title: 'Bytesool', category: 'Software & AI Tool Builder', description: 'A powerful, high-tech platform engineered by Aryan Singh for building cutting-edge software, apps, and AI tools. The system provides a robust architecture and sleek user interface designed for seamless enterprise-scale creation.', tags: ['AI Tool Builder', 'SaaS Platform', 'Software Dev'], image: 'bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900', thumbnail: '/images/projects/bytesool.png', mockup: 'left', liveUrl: 'https://www.bytesool.com/' },
  { title: 'Stride Habit Tracking', category: 'SaaS Productivity Platform', description: 'An elite behavioral optimization ecosystem featuring real-time streak analytics, gamified milestones, and deep focus mode integration for high-performance individuals.', tags: ['SaaS Architecture', 'Behavioral Science', 'Dashboard UX'], image: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600', thumbnail: '/images/projects/habit-tracker.png', mockup: 'right', liveUrl: '/demos/habit-tracker/index.html' },
  { title: 'Lumina Fine Dining', category: 'Premium Culinary Experience', description: 'A high-conversion digital presence for an award-winning Michelin-starred restaurant, featuring an interactive seasonal menu and real-time table reservations.', tags: ['Hospitality UX', 'Interaction Design', 'Booking Systems'], image: 'bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900', thumbnail: '/images/projects/restaurant.png', mockup: 'left', liveUrl: '/demos/restaurant/index.html' },
  { title: 'SwiftCart Quick Commerce', category: 'Hyperlocal Delivery Ecosystem', description: 'A high-velocity quick commerce engine designed for sub-10 minute deliveries, featuring a real-time inventory matrix and AI-driven routing.', tags: ['Quick Commerce', 'Real-time Logistics', 'Consumer UX'], image: 'bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500', thumbnail: '/images/projects/q-commerce.png', mockup: 'center', liveUrl: '/demos/q-commerce/index.html' },
  { title: 'Nebula Cloud Infrastructure', category: 'Enterprise Cloud Solutions', description: 'A robust, high-availability cloud management portal architected for global enterprise scale, featuring real-time resource orchestration and predictive scaling.', tags: ['Cloud Architecture', 'DevOps', 'Enterprise'], image: 'bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900', thumbnail: null, mockup: 'left', liveUrl: '#' },
  { title: 'Zenith Luxury Automotive', category: 'Premium Retail Experience', description: 'An immersive digital showroom for a luxury automotive brand, featuring 3D vehicle configurators and a seamless concierge booking system.', tags: ['Luxury Retail', '3D Configurator', 'Concierge'], image: 'bg-gradient-to-br from-slate-800 via-zinc-900 to-black', thumbnail: null, mockup: 'center', liveUrl: '#' },
  { title: 'Orbit Space Logistics', category: 'Aerospace & Supply Chain', description: 'A complex mission-critical logistics tracking system for private aerospace ventures, ensuring sub-second data synchronization across global ground stations.', tags: ['Aerospace', 'Logistics', 'Data Sync'], image: 'bg-gradient-to-br from-blue-900 via-purple-900 to-black', thumbnail: null, mockup: 'right', liveUrl: '#' },
  { title: 'Terra Sustainable Energy', category: 'Green Tech Infrastructure', description: 'An AI-powered energy grid monitoring platform designed to optimize renewable energy distribution and reduce carbon footprints for smart cities.', tags: ['Green Tech', 'AI', 'Smart Cities'], image: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-green-900', thumbnail: null, mockup: 'left', liveUrl: '#' },
  { title: 'Pulse Wearable Health', category: 'Consumer HealthTech', description: 'A high-fidelity health monitoring dashboard that synchronizes with wearable devices to provide real-time biometric analytics and personalized wellness insights.', tags: ['HealthTech', 'Wearables', 'Analytics'], image: 'bg-gradient-to-br from-rose-500 via-pink-600 to-indigo-700', thumbnail: null, mockup: 'center', liveUrl: '#' }
];

export const testimonialsData = [
  { name: 'Rahul Dubey', business: 'Founder, Bytesool', rating: 5, text: "The custom software and AI tool ecosystem ToolBite architected for us is incredibly robust. Their implementation of modern design principles paired with flawless backend functionality has significantly scaled our operations.", avatar: 'bg-indigo-100 text-indigo-600' },
  { name: 'Rudra & Naitik', business: 'Founders, Stylekat', rating: 5, text: "Our salon required an elegant digital presence that matched our premium in-house experience. Aryan constructed a lightning-fast booking platform that completely streamlined our workflow and drove a massive increase in client reservations.", avatar: 'bg-pink-100 text-pink-600' },
  { name: 'Sarah Jenkins', business: 'Chief Marketing Officer, Aura Labs', rating: 5, text: "ToolBite completely transformed our funnel. They engineered a checkout flow that instantly skyrocketed our monthly recurring revenue by 142%. Their attention to performance detail and behavioral data is unmatched in the industry.", avatar: 'bg-rose-100 text-rose-600' },
  { name: 'Marcus Chen', business: 'Founder, Nexus Fintech Solutions', rating: 5, text: "We required a highly robust, compliant web application built within a radically strict timeline. The elite engineering team at ToolBite not only delivered ahead of schedule but their code structure was immaculately clean.", avatar: 'bg-blue-100 text-blue-600' },
  { name: 'Elena Rodriguez', business: 'Director, The Monarch Group', rating: 5, text: "Our global property firm required a digital presence that exuded absolute luxury. ToolBite architected an incredibly premium, fast-loading platform that has become our primary source of high-net-worth inbound leads.", avatar: 'bg-emerald-100 text-emerald-600' },
  { name: 'David O\'Connor', business: 'Executive Creative Director', rating: 5, text: "As a designer of 15 years, I am notoriously strict about typography and spacing nuances. ToolBite’s developers are uniquely brilliant—they possess the rare capability to translate pixel-perfect Figma files into flawless DOM architecture.", avatar: 'bg-purple-100 text-purple-600' }
];

export const templatesData = [
  { title: 'Gourmet Bistro', category: 'Restaurant Framework', desc: 'Elegant dining architecture featuring automated online reservations and interactive asynchronous menus.', price: '$149', features: ['Algorithmic Table Reservations', 'Dynamic Interactivity', 'Technical SEO'], color: 'from-orange-400 to-rose-400' },
  { title: 'Visionary Creator', category: 'Portfolio Blueprint', desc: 'Minimalist, fast-loading gallery infrastructure to flawlessly showcase massive design assets.', price: '$99', features: ['Asynchronous Masonry', 'Sub-second Load Pipeline', 'Client Acquisition Funnels'], color: 'from-purple-400 to-indigo-400' },
  { title: 'Monarch Real Estate', category: 'Property Firm System', desc: 'Advanced property listing matrix with integrated, scalable database search algorithms.', price: '$199', features: ['Complex Property Search', 'Broker Agent CRM', 'Map API Integration'], color: 'from-blue-400 to-cyan-400' },
  { title: 'Authority Coach', category: 'Consultancy Platform', desc: 'Authoritative landing framework engineered to automatically schedule and bill premium client sessions.', price: '$129', features: ['Automated Session Ticketing', 'Thought-Leadership Blog', 'Stripe Processing'], color: 'from-emerald-400 to-teal-400' },
  { title: 'Enterprise Corporate', category: 'B2B Business Model', desc: 'Authoritative corporate identity platform rigorously structured to drive institutional lead generation.', price: '$149', features: ['B2B Lead Funnels', 'Service Matrix Pages', 'C-Suite Profiles'], color: 'from-slate-600 to-slate-800' },
  { title: 'MarketMax Commerce', category: 'E-commerce Superstore', desc: 'A complete, highly-scalable storefront capable of processing complex inventory hierarchies securely.', price: '$249', features: ['Mass Catalog Management', 'Frictionless Checkout', 'Encrypted Client Data'], color: 'from-amber-400 to-orange-500' },
  { title: 'Glamour Beauty', category: 'Booking Ecosystem', desc: 'A chic, high-end booking platform designed to scale scheduling for elite salons and stylists.', price: '$119', features: ['Real-time Appointment Logs', 'Service Matrices', 'Social API Pipelines'], color: 'from-pink-400 to-rose-400' },
  { title: 'Digital Ad Agency', category: 'Agency Pro Framework', desc: 'A bold, aggressive portfolio configuration meant to highlight digital services and massive ROI cases.', price: '$179', features: ['Interactive Case Studies', 'Video Hero Overlays', 'Complex Framer Animation'], color: 'from-violet-500 to-fuchsia-500' }
];

export const whyChooseUsData = [
  { icon: <Zap size={24} className="text-[#B19CD9]" />, title: 'Rapid Deployment Dynamics', desc: 'We leverage advanced modular architecture to deploy enterprise-grade platforms in days, bypassing traditional sluggish agency timelines.', bg: 'bg-[#B19CD9]/10', border: 'border-[#B19CD9]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/rocket-dynamic-color.png' },
  { icon: <Palette size={24} className="text-[#FFB6C1]" />, title: 'Elite UI/UX Engineering', desc: 'Aesthetics drive credibility. We strictly adhere to modern psychological design principles to guarantee your interface commands absolute market respect.', bg: 'bg-[#FFB6C1]/10', border: 'border-[#FFB6C1]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/paint-kit-dynamic-color.png' },
  { icon: <Smartphone size={24} className="text-[#87CEEB]" />, title: 'Omnichannel Flawless Code', desc: 'Our rigorous QA protocol ensures zero layout shifts and absolute pixel perfection across every mobile device and ultrawide monitor matrix.', bg: 'bg-[#87CEEB]/10', border: 'border-[#87CEEB]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/mobile-dynamic-color.png' },
  { icon: <DollarSign size={24} className="text-white" />, title: 'Transparent Cost Modeling', desc: 'Premium engineering shouldn’t possess hidden traps. We provide aggressive, fixed-cost pricing structures with zero scope creep anxiety.', bg: 'bg-white/10', border: 'border-white/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/coin-dynamic-color.png' },
  { icon: <Search size={24} className="text-[#B19CD9]" />, title: 'Deep Technical SEO', desc: 'Every line of code is semantically structured and statically optimized to instantly pass Google Core Web Vitals and dominate SERP rankings.', bg: 'bg-[#B19CD9]/10', border: 'border-[#B19CD9]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/search-dynamic-color.png' },
  { icon: <MessageSquare size={24} className="text-[#FFB6C1]" />, title: 'Direct Developer Access', desc: 'We abhor bureaucratic barriers. You work directly alongside the senior software engineers actually architecting your platform.', bg: 'bg-[#FFB6C1]/10', border: 'border-[#FFB6C1]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/chat-bubble-dynamic-color.png' },
  { icon: <Wrench size={24} className="text-[#87CEEB]" />, title: 'Infinite Scalability', desc: 'We do not build fragile websites. We engineer scalable technological foundations ready to expand gracefully as your userbase skyrockets.', bg: 'bg-[#87CEEB]/10', border: 'border-[#87CEEB]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/settings-dynamic-color.png' },
  { icon: <ShieldCheck size={24} className="text-white" />, title: 'Enterprise Defensive Security', desc: 'Your platform is hardened against vulnerabilities. We deploy continuous threat monitoring, automated backups, and encrypted transit pathways.', bg: 'bg-white/10', border: 'border-white/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/shield-dynamic-color.png' },
  { icon: <MousePointerClick size={24} className="text-[#B19CD9]" />, title: 'Psychological User Flows', desc: 'Every hovering micro-animation and padding variance is intentionally programmed to seamlessly guide human psychology toward conversion.', bg: 'bg-[#B19CD9]/10', border: 'border-[#B19CD9]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/target-dynamic-color.png' },
  { icon: <Briefcase size={24} className="text-[#FFB6C1]" />, title: 'Strict ROI Fixation', desc: 'Code is merely a tool. Our ultimate objective is engineering a digital asset that drastically multiplies your commercial revenue metrics.', bg: 'bg-[#FFB6C1]/10', border: 'border-[#FFB6C1]/20', image: 'https://raw.githubusercontent.com/realvjy/3dicons/main/png/color/money-dynamic-color.png' }
];

export const faqData = [
  { question: 'What is your standard deployment timeline?', answer: 'We operate on highly aggressive, deterministic timelines. Our robust ready-made architecture platforms can be fully branded, populated, and deployed to a global CDN network within 3 to 7 days. Proprietary custom infrastructure builds typically require 3 to 6 weeks spanning from technical scoping to final launch protocol.' },
  { question: 'How do you ensure high website performance and speed?', answer: 'Performance is built into our DNA. We utilize advanced techniques like server-side rendering (SSR), image optimization with Next.js or Vite, and minimal JavaScript bundles. Every site we build is tested against Google Core Web Vitals to ensure it achieves near-perfect scores for Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).' },
  { question: 'Do you provide SEO-friendly content and architecture?', answer: 'Yes. Beyond just design, we structure every page with semantic HTML5, optimized meta tags, and high-quality schema markup (JSON-LD). We also offer guidance on content strategy to ensure your site provides genuine value to users, which is a key factor for search engine ranking and ad network approval.' },
  { question: "What is the difference between a template and a custom build?", answer: "Our templates are pre-engineered, high-performance foundations that we customize for your brand, offering a fast and cost-effective launch. A custom build is a 'from-scratch' architecture tailored to unique business logic, complex integrations, or specific proprietary features that off-the-shelf solutions can't support." },
  { question: 'Do you manage our hosting infrastructure?', answer: 'Yes. We eliminate technical friction by handling the entire server ecosystem. We provide enterprise-level Vercel or AWS hosting structures, guaranteeing 99.99% uptime, global edge-network caching, and automated SSL certification provisioning.' },
  { question: 'Are revision cycles included in the pricing model?', answer: 'Absolutely. We view development as a collaborative feedback loop. Depending on your chosen tier, you are allocated specific dedicated iteration sprints to refine micro-interactions, adjust copy structures, or modify aesthetic layouts prior to the final production push.' },
  { question: 'Can you engineer custom logic and database integrations?', answer: 'This is our core specialty. We transcend standard front-end design by constructing sophisticated full-stack SaaS architectures capable of managing complex data pipelines, strict user authentication states, and heavy third-party API processing payloads.' },
  { question: 'How do the "Ready-Made" platforms actually work?', answer: 'We maintain a proprietary vault of rigorously tested, high-converting React codebases engineered for specific business sectors. Upon purchase, our team clones the architecture, universally scales your specific typography and color branding tokens across the components, and injects your unique copy payload. Launch is immediate.' },
  { question: 'Is mobile performance a priority in your code?', answer: 'It is a mandate, not an option. We exclusively utilize mobile-first Tailwind CSS methodologies to ensure extreme cross-device fidelity. We guarantee maximum paint performance and zero cumulative layout shift (CLS) whether a user accesses your portal via a gigabit desktop or a fluctuating 3G cellular network.' },
  { question: 'What happens explicitly after the platform goes live?', answer: 'We transition into an active safeguarding posture. Every tier includes complimentary priority support ranging from 1 to 6 months. Following this period, we invite clients into our continuous retainer program for immediate response infrastructure monitoring, scaling updates, and persistent code auditing.' },
  { question: 'Is my website compatible with ad networks like Google AdSense?', answer: 'Yes. We build sites specifically to meet the high quality and technical standards required by major ad networks. This includes clean navigation, high-value content areas, essential legal pages (Privacy Policy, Terms), and fully responsive layouts that handle ad responsiveness perfectly.' },
  { question: 'What digital assets are required from our team?', answer: 'We streamline onboarding. To initialize the codebase, we require high-resolution vector corporate insignia (logos), established brand hex codes, a structural map of desired routing (pages), and any prepared linguistic copy payload. If these assets are undeveloped, our internal creative wing can formulate them for you.' }
];
