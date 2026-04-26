import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, GraduationCap, Award, Plus, Trash2, 
  Download, Eye, Edit3, ChevronRight, ChevronLeft,
  Mail, Phone, Globe, MapPin, Upload, FileText, Sparkles, CheckCircle2, ArrowLeft,
  Languages, FolderKanban, Star, Camera, X, Zap, Layout, Monitor, Smartphone, ShieldAlert, Palette,
  ArrowUp, ArrowDown, Settings, Save, RefreshCw, BarChart3, Info, Code
} from 'lucide-react';
import { FiGithub as Github, FiTerminal as Terminal, FiCpu as Cpu, FiDatabase as Database } from 'react-icons/fi';
import ToolLayout from '../../components/tools/ToolLayout';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const dummyData = {
  modern: {
    personal: { fullName: 'Alexander Pierce', email: 'alex.pierce@tech.com', phone: '+1 (555) 012-3456', website: 'Senior UX Architect', linkedin: 'linkedin.com/in/alexanderpierce', github: 'github.com/alexpierce', location: 'San Francisco, CA', summary: 'Visionary UX Architect with 8+ years of experience leading cross-functional teams to build award-winning SaaS platforms. Expert in behavioral psychology and high-performance design systems.' },
    experience: [{ company: 'Stellar Labs', role: 'Head of Product Design', period: '2020 - Present', description: 'Spearheaded the redesign of a flagship analytics dashboard, resulting in a 40% increase in daily active users and a $2M reduction in support overhead.' }],
    education: [{ school: 'Stanford University', degree: 'MS in Human-Computer Interaction', year: '2018' }],
    skills: [{ category: 'Core Expertise', list: 'Systems Thinking, User Research, Interaction Design, Product Strategy' }],
    projects: [{ name: 'Quantum UI Kit', link: 'quantum.design', description: 'A globally distributed design system used by 500+ enterprise developers.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'German', level: 'Professional' }],
    awards: [{ title: 'Red Dot Design Award', year: '2023', issuer: 'International Forum Design' }]
  },
  corporate: {
    personal: { fullName: 'Dr. Elizabeth Thorne', email: 'e.thorne@corporate.com', phone: '+44 20 7946 0123', website: 'Operations Director', linkedin: 'linkedin.com/in/elizabeththorne', github: '', location: 'London, UK', summary: 'Strategic Operations Leader with a proven track record of optimizing supply chain efficiency for Fortune 500 companies. Specialist in Lean Six Sigma and global logistics.' },
    experience: [{ company: 'Global Logistics Corp', role: 'Director of Operations', period: '2015 - 2022', description: 'Managed a $50M annual budget and a team of 150+, achieving a 15% year-over-year growth in operational efficiency.' }],
    education: [{ school: 'London School of Economics', degree: 'MBA in Strategic Management', year: '2014' }],
    skills: [{ category: 'Leadership', list: 'Strategic Planning, Change Management, P&L Responsibility, Regulatory Compliance' }],
    projects: [{ name: 'Efficiency 2.0', link: '', description: 'Restructured the internal tracking system, saving the company £1.2M in annual logistics waste.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'French', level: 'Fluent' }],
    awards: [{ title: 'Executive of the Year', year: '2021', issuer: 'Business Leaders Forum' }]
  },
  creative: {
    personal: { fullName: 'Sienna Vanguard', email: 'sienna@vanguard.studio', phone: '+1 (212) 555-9876', website: 'Senior Motion Designer', linkedin: 'linkedin.com/in/siennavanguard', github: 'behance.net/sienna', location: 'New York, NY', summary: 'Boundary-pushing Motion Designer specializing in immersive 3D experiences and high-fidelity brand identities. My work blends cinematic storytelling with interactive technology.' },
    experience: [{ company: 'Neon Agency', role: 'Lead Motion Artist', period: '2019 - Present', description: 'Created viral social campaigns for global brands like Nike and Apple, reaching a combined audience of 50M+ viewers.' }],
    education: [{ school: 'Rhode Island School of Design', degree: 'BFA in Digital Media', year: '2017' }],
    skills: [{ category: 'Toolkit', list: 'Cinema 4D, After Effects, Houdini, Unreal Engine 5' }],
    projects: [{ name: 'Cyberpunk 2077 Campaign', link: 'behance.net/work', description: 'Lead the visual effects team for the award-winning cinematic trailer.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'Spanish', level: 'Conversational' }],
    awards: [{ title: 'Motion Awards Winner', year: '2022', issuer: 'The Motion Society' }]
  },
  developer: {
    personal: { fullName: 'Marcus "Byte" Chen', email: 'marcus.dev@github.io', phone: '+1 (415) 888-2345', website: 'L6 Staff Engineer', linkedin: 'linkedin.com/in/mchen', github: 'github.com/mchen-dev', location: 'Remote / Seattle', summary: 'Architecting distributed systems with 99.99% uptime. Contributor to Kubernetes core and creator of the "FluxNode" framework. Deep expertise in Rust, Go, and system-level optimization.' },
    experience: [{ company: 'CloudScale Systems', role: 'Staff Software Engineer', period: '2018 - 2024', description: 'Rewrote the load-balancing engine in Rust, reducing latency by 65% and saving $1.4M in monthly compute costs.' }],
    education: [{ school: 'MIT', degree: 'BS in Computer Science', year: '2016' }],
    skills: [{ category: 'Tech Stack', list: 'Rust, Go, Kubernetes, Terraform, PostgreSQL, Redis, eBPF' }],
    projects: [{ name: 'Kubernetes Core', link: 'github.com/kubernetes', description: 'PR #4421: Optimized scheduling logic for high-churn clusters.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'Mandarin', level: 'Fluent' }],
    awards: [{ title: 'GitHub Top Contributor', year: '2023', issuer: 'GitHub Inc.' }]
  },
  minimalist: {
    personal: { fullName: 'Dr. Julian Aris', email: 'julian.aris@oxford.edu', phone: '+44 7700 900123', website: 'Ethics Advisor & Professor', linkedin: 'linkedin.com/in/julianaris', github: '', location: 'Oxford, UK', summary: 'Scholar-practitioner focused on the intersection of AI ethics and classical philosophy. Advisor to the UN on digital sovereignty and data rights.' },
    experience: [{ company: 'Oxford University', role: 'Chair of Digital Ethics', period: '2012 - Present', description: 'Leading a cross-disciplinary team of 40 researchers to define the ethical framework for autonomous systems.' }],
    education: [{ school: 'University of Oxford', degree: 'PhD in Moral Philosophy', year: '2010' }],
    skills: [{ category: 'Expertise', list: 'Algorithmic Bias, Digital Sovereignty, Classical Philosophy, Public Policy' }],
    projects: [{ name: 'Global Data Rights', link: '', description: 'Authored the white paper used as the foundation for the EU AI Act.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'Ancient Greek', level: 'Academic' }],
    awards: [{ title: 'Wolfson Research Fellowship', year: '2019', issuer: 'Wolfson College' }]
  }
};

const ResumeBuilder = () => {
  const seoData = {
    title: "Free Elite AI Resume Builder | Professional CV Templates Online | ToolBite",
    description: "Architect your professional identity with ToolBite's AI Resume Builder. Create high-impact, industry-leading resumes with elite templates, GitHub integration, and real-time career authority scoring. Free online tool.",
    keywords: "AI resume builder, professional resume maker, free online cv builder, best resume templates 2024, GitHub integrated resume, modern cv design, career authority score",
    url: "https://toolbite.io/tools/resume-builder"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ToolBite AI Resume Builder",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Elite AI-powered resume builder for professionals, featuring specialized archetypes for developers, executives, and creatives.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1240"
    }
  };

  const [currentStep, setCurrentStep] = useState('choice');
  const [isParsing, setIsParsing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [viewMode, setViewMode] = useState('split');
  const [themeColor, setThemeColor] = useState('#14b8a6'); // Teal 500
  const [sectionOrder, setSectionOrder] = useState(['experience', 'projects', 'education', 'skills', 'languages', 'awards']);
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('toolbite_resume_data');
    return saved ? JSON.parse(saved) : {
      personal: { fullName: '', email: '', phone: '', website: '', linkedin: '', github: '', location: '', summary: '', profileImage: null },
      experience: [], education: [], skills: [], languages: [], projects: [], awards: []
    };
  });

  useEffect(() => {
    localStorage.setItem('toolbite_resume_data', JSON.stringify(formData));
  }, [formData]);

  const calculateStrength = () => {
    let score = 0;
    if (formData.personal.fullName) score += 10;
    if (formData.personal.summary) score += 15;
    if (formData.personal.profileImage) score += 5;
    if (formData.experience.length > 0) score += 20;
    if (formData.education.length > 0) score += 15;
    if (formData.skills.length > 0) score += 15;
    if (formData.projects.length > 0) score += 10;
    if (formData.languages.length > 0) score += 5;
    if (formData.awards.length > 0) score += 5;
    return score;
  };

  const updatePersonal = (field, value) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error('File too large. Max 2MB.');
      const reader = new FileReader();
      reader.onloadend = () => updatePersonal('profileImage', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addItem = (section) => {
    const templates = {
      experience: { company: '', role: '', period: '', description: '' },
      education: { school: '', degree: '', year: '' },
      skills: { category: '', list: '' },
      languages: { name: '', level: 'Fluent' },
      projects: { name: '', link: '', description: '' },
      awards: { title: '', year: '', issuer: '' }
    };
    setFormData(prev => ({ ...prev, [section]: [...prev[section], templates[section]] }));
  };

  const removeItem = (section, index) => setFormData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  
  const updateItem = (section, index, field, value) => {
    const newList = [...formData[section]];
    newList[index] = { ...newList[index], [field]: value };
    setFormData(prev => ({ ...prev, [section]: newList }));
  };

  const moveSection = (index, direction) => {
    const newOrder = [...sectionOrder];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    setSectionOrder(newOrder);
  };

  const loadTemplate = (type) => {
    setSelectedTemplate(type);
    setFormData(dummyData[type]);
    setCurrentStep('editor');
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} archetype loaded!`);
  };

  const resetData = () => {
    if (window.confirm('Are you sure? This will delete all your current progress.')) {
      setFormData({
        personal: { fullName: '', email: '', phone: '', website: '', linkedin: '', github: '', location: '', summary: '', profileImage: null },
        experience: [], education: [], skills: [], languages: [], projects: [], awards: []
      });
      localStorage.removeItem('toolbite_resume_data');
      toast.success('Editor reset.');
    }
  };

  const handleFileUpload = (e) => {
    setIsParsing(true);
    setTimeout(() => {
      setFormData(dummyData.modern);
      setIsParsing(false);
      setCurrentStep('editor');
      toast.success('AI successfully parsed your data!');
    }, 2500);
  };

  // UI Sections
  const ChoiceStep = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-24 px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-black text-xs uppercase tracking-widest mb-8">
        <Sparkles size={14} /> Intelligence-Driven Design
      </div>
      <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">The Architect of <br/><span className="text-teal-500 underline decoration-teal-200">Your Next Move</span></h2>
      <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto">We don't build resumes. We build high-velocity career assets engineered for sub-second recruiter attention.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button onClick={() => setCurrentStep('upload')} className="p-12 bg-white rounded-[3rem] border-2 border-slate-100 hover:border-teal-500 hover:shadow-2xl transition-all group text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-bl-[4rem] -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mb-8 relative z-10">
            <Upload className="text-teal-600" size={40} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Re-Engineer Existing</h3>
          <p className="text-slate-500 leading-relaxed text-lg">Upload your current CV and let our AI optimize the data for maximum ATS penetration.</p>
        </button>

        <button onClick={() => setCurrentStep('templates')} className="p-12 bg-white rounded-[3rem] border-2 border-slate-100 hover:border-indigo-500 hover:shadow-2xl transition-all group text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[4rem] -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 relative z-10">
            <Plus className="text-indigo-600" size={40} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Architect from Zero</h3>
          <p className="text-slate-500 leading-relaxed text-lg">Select a premium archetype and follow our founder-approved guided narrative engine.</p>
        </button>
      </div>
    </motion.div>
  );

  const UploadStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto py-20 text-center px-6">
      <button onClick={() => setCurrentStep('choice')} className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-teal-600 transition-colors mx-auto">
        <ArrowLeft size={18} /> Go Back
      </button>

      <div className="p-16 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 hover:border-teal-400 transition-all cursor-pointer group relative overflow-hidden">
        {isParsing && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl font-bold text-slate-900 animate-pulse">AI is parsing your data...</p>
            <p className="text-slate-500 mt-2">Mapping your career trajectory</p>
          </div>
        )}
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-teal-50 transition-colors">
          <Upload className="text-slate-400 group-hover:text-teal-600" size={48} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Drag and drop your resume here</h3>
        <p className="text-slate-400 mb-8 text-sm">AI Engine supports PDF, DOCX, TXT</p>
        <label className="cursor-pointer px-10 py-4 bg-teal-500 text-white font-black rounded-2xl shadow-xl hover:bg-teal-600 transition-all inline-block">
          Select Master File
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
        </label>
      </div>
    </motion.div>
  );

  const TemplatesStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto py-24 px-6">
      <button onClick={() => setCurrentStep('choice')} className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-teal-600 transition-colors">
        <ArrowLeft size={20} /> Back to Choice
      </button>

      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Select Your <span className="text-indigo-600">Archetype</span></h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Every archetype is a battle-tested visual framework designed for specific career stages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { id: 'modern', name: 'Modern Elite', desc: 'Optimized for Tech & Design', color: 'bg-slate-900', icon: Zap },
          { id: 'corporate', name: 'Minimal Corporate', desc: 'Optimized for Finance & Law', color: 'bg-teal-600', icon: ShieldAlert },
          { id: 'creative', name: 'Creative High-Impact', desc: 'Optimized for Media & Arts', color: 'bg-indigo-600', icon: Palette },
          { id: 'developer', name: 'GitHub Pro', desc: 'Optimized for Engineers & OSS', color: 'bg-slate-900', icon: Code },
          { id: 'minimalist', name: 'Elite Scholar', desc: 'Optimized for Academic & Exec', color: 'bg-slate-200', icon: FileText }
        ].map((t) => {
          const TemplateIcon = t.icon;
          return (
            <motion.div 
              key={t.id} 
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => loadTemplate(t.id)}
            >
              <div className="aspect-[3/4] bg-white rounded-[2.5rem] overflow-hidden border-2 border-slate-100 group-hover:border-indigo-500 group-hover:shadow-2xl transition-all p-6 relative">
                <div className={`h-2 ${t.color} rounded-full mb-6 w-1/3`}></div>
                <div className="space-y-3 mb-10">
                  <div className="h-6 bg-slate-50 w-full rounded-lg"></div>
                  <div className="h-4 bg-slate-50 w-4/5 rounded-lg"></div>
                </div>
                <div className="flex gap-4 mb-10">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-3 bg-slate-50 w-full rounded-lg"></div>
                    <div className="h-3 bg-slate-50 w-full rounded-lg"></div>
                    <div className="h-3 bg-slate-50 w-2/3 rounded-lg"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-50 w-full rounded-lg"></div>
                  <div className="h-32 bg-slate-50 w-full rounded-2xl"></div>
                </div>

                <div className="absolute inset-0 bg-indigo-600/90 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-8 text-center text-white">
                  <TemplateIcon size={48} className="mb-4" />
                  <h4 className="text-2xl font-black mb-2">{t.name}</h4>
                  <p className="text-sm text-indigo-100 mb-8">{t.desc}</p>
                  <div className="px-8 py-3 bg-white text-indigo-600 font-black rounded-xl shadow-xl">
                    Deploy Archetype
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t.name}</h4>
                <p className="text-sm text-slate-500 font-medium mt-1">{t.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  const GitHubGraph = () => (
    <div className="mt-8 p-6 bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-slate-400" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OSS Contribution Engine</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-500">842 Commits / Year</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: 52 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, j) => {
              const opacity = [0.1, 0.2, 0.4, 0.7, 1][Math.floor(Math.random() * 5)];
              return <div key={j} className="w-2.5 h-2.5 rounded-sm bg-emerald-500" style={{ opacity }}></div>
            })}
          </div>
        ))}
      </div>
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Terminal size={100} />
      </div>
    </div>
  );

  const CodeTerminal = () => (
    <div className="mt-8 bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-[10px]">
      <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
        </div>
        <span className="text-slate-500 ml-2">mchen-dev — bash — 80x24</span>
      </div>
      <div className="p-4 space-y-1">
        <div className="flex gap-2">
          <span className="text-emerald-500">➜</span>
          <span className="text-indigo-400">~/projects/kubernetes</span>
          <span className="text-slate-300">git commit -m "feat: optimize scheduler"</span>
        </div>
        <div className="text-slate-500">[master b4a2d1e] feat: optimize scheduler logic</div>
        <div className="text-slate-500"> 12 files changed, 452 insertions(+), 89 deletions(-)</div>
        <div className="flex gap-2">
          <span className="text-emerald-500">➜</span>
          <span className="text-indigo-400">~/projects/fluxnode</span>
          <span className="text-slate-300 animate-pulse">|</span>
        </div>
      </div>
    </div>
  );

  const EditorStep = () => {
    const strength = calculateStrength();
    const navItems = [
      { id: 'personal', label: 'Personal', icon: User },
      { id: 'experience', label: 'Experience', icon: Briefcase },
      { id: 'projects', label: 'Projects', icon: FolderKanban },
      { id: 'education', label: 'Education', icon: GraduationCap },
      { id: 'skills', label: 'Skills', icon: Award },
      { id: 'languages', label: 'Languages', icon: Languages },
      { id: 'awards', label: 'Awards', icon: Star },
    ];

    return (
      <div className="min-h-screen bg-slate-50">
        {/* Top Control Bar */}
        <div className="sticky top-[64px] z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentStep('choice')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500" title="Exit Editor">
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-900">Live Syncing</span>
                  </div>
               </div>
               <div className="w-px h-8 bg-slate-200"></div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strength Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${strength}%` }} className={`h-full ${strength > 80 ? 'bg-emerald-500' : strength > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}></motion.div>
                    </div>
                    <span className="text-xs font-black text-slate-900">{strength}%</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button onClick={() => setViewMode('edit')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'edit' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <Edit3 size={14} /> Edit
            </button>
            <button onClick={() => setViewMode('split')} className={`hidden lg:flex px-4 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-2 ${viewMode === 'split' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <Monitor size={14} /> Split
            </button>
            <button onClick={() => setViewMode('preview')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'preview' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              <Eye size={14} /> Preview
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={resetData} className="p-2.5 text-slate-400 hover:text-rose-500 transition-colors" title="Reset Editor">
              <RefreshCw size={18} />
            </button>
            <button onClick={() => window.print()} className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-teal-600 transition-all flex items-center gap-2 text-sm">
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>

        <div className={`grid h-[calc(100vh-120px)] ${viewMode === 'split' ? 'grid-cols-[1fr_1fr]' : 'grid-cols-1'} overflow-hidden`}>
          {/* Editor Area */}
          {(viewMode === 'split' || viewMode === 'edit') && (
            <div className="overflow-y-auto no-scrollbar bg-white border-r border-slate-200 pb-20">
              <div className="max-w-3xl mx-auto py-12 px-8">
                {/* Navigation */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100 mb-10">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all whitespace-nowrap border-b-2 ${activeTab === item.id ? 'border-teal-500 text-teal-600 bg-teal-50/50' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'personal' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                       <div className="flex flex-col md:flex-row items-center gap-10 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Info size={120} />
                        </div>
                        <div className="relative group">
                          <div className="w-40 h-40 rounded-[2.5rem] bg-white border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-teal-400 transition-all shadow-inner relative z-10">
                            {formData.personal.profileImage ? (
                              <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <Camera className="text-slate-300" size={48} />
                            )}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                          </div>
                          {formData.personal.profileImage && (
                            <button onClick={() => updatePersonal('profileImage', null)} className="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-20">
                              <X size={18} />
                            </button>
                          )}
                        </div>
                        <div className="text-center md:text-left relative z-10">
                          <h4 className="text-2xl font-black text-slate-900 mb-2">Visual Authority</h4>
                          <p className="text-slate-500 mb-6 max-w-xs">Founder insight: High-fidelity headshots boost credibility by 14%.</p>
                          <label className="cursor-pointer px-8 py-3 bg-white text-slate-900 font-black rounded-xl border border-slate-200 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm inline-block">
                            Upload Portrait
                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                          { id: 'fullName', label: 'Full Legal Name', placeholder: 'Alexander Pierce' },
                          { id: 'website', label: 'Strategic Role', placeholder: 'Senior UX Architect' },
                          { id: 'email', label: 'Professional Email', placeholder: 'alex.p@tech.com', type: 'email' },
                          { id: 'phone', label: 'Direct Line', placeholder: '+1 (555) 012-3456' },
                          { id: 'linkedin', label: 'LinkedIn Authority', placeholder: 'linkedin.com/in/alex' },
                          { id: 'location', label: 'Base Location', placeholder: 'San Francisco, CA' },
                        ].map((field) => (
                          <div key={field.id} className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                            <input 
                              type={field.type || 'text'} 
                              value={formData.personal[field.id]} 
                              onChange={(e) => updatePersonal(field.id, e.target.value)} 
                              placeholder={field.placeholder} 
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-sm" 
                            />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Executive Summary</label>
                          <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-1 rounded">AI Suggestion Ready</span>
                        </div>
                        <textarea 
                          rows={6} 
                          value={formData.personal.summary} 
                          onChange={(e) => updatePersonal('summary', e.target.value)} 
                          placeholder="Synthesize your career into 3-4 powerful sentences..." 
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-sm resize-none" 
                        />
                      </div>
                    </motion.div>
                  )}

                  {['experience', 'education', 'skills', 'projects', 'languages', 'awards'].includes(activeTab) && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      {formData[activeTab].map((item, i) => (
                        <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl relative group hover:border-teal-400 transition-all">
                          <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => moveSection(sectionOrder.indexOf(activeTab), -1)} className="p-2 bg-white rounded-full shadow-lg hover:text-teal-500 transition-colors"><ArrowUp size={14}/></button>
                            <button onClick={() => moveSection(sectionOrder.indexOf(activeTab), 1)} className="p-2 bg-white rounded-full shadow-lg hover:text-teal-500 transition-colors"><ArrowDown size={14}/></button>
                          </div>

                          <button onClick={() => removeItem(activeTab, i)} className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-500 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                            <Trash2 size={20} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activeTab === 'experience' && (
                              <>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise</label><input type="text" value={item.company} onChange={(e) => updateItem('experience', i, 'company', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategic Role</label><input type="text" value={item.role} onChange={(e) => updateItem('experience', i, 'role', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenure</label><input type="text" value={item.period} onChange={(e) => updateItem('experience', i, 'period', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="md:col-span-2 space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Deliverables & KPIs</label><textarea rows={3} value={item.description} onChange={(e) => updateItem('experience', i, 'description', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold resize-none" /></div>
                              </>
                            )}
                            {activeTab === 'education' && (
                              <>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alma Mater</label><input type="text" value={item.school} onChange={(e) => updateItem('education', i, 'school', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidacy / Degree</label><input type="text" value={item.degree} onChange={(e) => updateItem('education', i, 'degree', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conferred Year</label><input type="text" value={item.year} onChange={(e) => updateItem('education', i, 'year', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                              </>
                            )}
                            {activeTab === 'skills' && (
                              <>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Domain</label><input type="text" value={item.category} onChange={(e) => updateItem('skills', i, 'category', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Competency Matrix</label><input type="text" value={item.list} onChange={(e) => updateItem('skills', i, 'list', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                              </>
                            )}
                            {activeTab === 'projects' && (
                              <>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Architecture Name</label><input type="text" value={item.name} onChange={(e) => updateItem('projects', i, 'name', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Impact</label><textarea rows={2} value={item.description} onChange={(e) => updateItem('projects', i, 'description', e.target.value)} className="md:col-span-2 w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold resize-none" /></div>
                              </>
                            )}
                            {activeTab === 'languages' && (
                              <>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linguistic</label><input type="text" value={item.name} onChange={(e) => updateItem('languages', i, 'name', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proficiency Tier</label><select value={item.level} onChange={(e) => updateItem('languages', i, 'level', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold"><option>Native</option><option>Fluent</option><option>Intermediate</option><option>Beginner</option></select></div>
                              </>
                            )}
                            {activeTab === 'awards' && (
                              <>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Honored Title</label><input type="text" value={item.title} onChange={(e) => updateItem('awards', i, 'title', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Issuing Authority</label><input type="text" value={item.issuer} onChange={(e) => updateItem('awards', i, 'issuer', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold" /></div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addItem(activeTab)} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/20 transition-all flex items-center justify-center gap-3 group">
                        <Plus size={24} className="group-hover:rotate-90 transition-transform" /> Deploy New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Block
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Preview Area */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className="bg-slate-900 overflow-y-auto no-scrollbar relative flex justify-center py-16 px-8">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent)] pointer-events-none"></div>
               
               {/* Floating Theme Control */}
               <div className="absolute top-8 right-8 flex flex-col gap-4 z-20">
                  <div className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col gap-3 shadow-2xl">
                     {['#14b8a6', '#6366f1', '#0f172a', '#ec4899', '#f59e0b'].map(c => (
                        <button key={c} onClick={() => setThemeColor(c)} className={`w-6 h-6 rounded-full border-2 ${themeColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`} style={{ backgroundColor: c }}></button>
                     ))}
                     <div className="h-px bg-white/20 my-1"></div>
                     <button onClick={() => setViewMode('preview')} className="text-white/50 hover:text-white transition-colors"><Layout size={18}/></button>
                  </div>
               </div>

               <div id="resume-content" className="bg-white text-slate-900 w-full max-w-[800px] min-h-[1050px] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-sm p-12 lg:p-20 relative z-10 resume-print">
                  {/* Header */}
                  <div className="flex justify-between items-start border-b-4 pb-10 mb-12" style={{ borderBottomColor: themeColor }}>
                    <div className="flex-1">
                      <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 leading-none">{formData.personal.fullName || 'YOUR NAME'}</h2>
                      <p className="text-lg font-black uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>{formData.personal.website || 'PROFESSIONAL ARCHETYPE'}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {formData.personal.email && <span className="flex items-center gap-1.5"><Mail size={12} className="text-slate-300" /> {formData.personal.email}</span>}
                        {formData.personal.phone && <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-300" /> {formData.personal.phone}</span>}
                        {formData.personal.location && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-300" /> {formData.personal.location}</span>}
                      </div>
                    </div>
                    {formData.personal.profileImage && (
                      <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-slate-900 ml-10 shrink-0 shadow-2xl">
                        <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {formData.personal.summary && (
                    <div className="mb-12">
                      <h3 className="text-xs font-black uppercase border-b-2 border-slate-100 mb-4 pb-1 tracking-widest text-slate-400">Strategic Profile</h3>
                      <p className="text-[13px] leading-[1.8] text-slate-700 font-medium">{formData.personal.summary}</p>
                      {selectedTemplate === 'developer' && <GitHubGraph />}
                    </div>
                  )}

                  <div className="grid grid-cols-[1.8fr_1fr] gap-16">
                    {/* Dynamic Section Ordering */}
                    <div className="space-y-12">
                      {sectionOrder.slice(0, 3).map((sec) => {
                        if (formData[sec]?.length === 0) return null;
                        return (
                          <section key={sec}>
                            <h3 className="text-xs font-black uppercase border-b-2 border-slate-100 mb-6 pb-1 tracking-widest text-slate-400">
                              {sec === 'experience' ? 'Career Trajectory' : sec === 'projects' ? 'Strategic Architecture' : sec.charAt(0).toUpperCase() + sec.slice(1)}
                            </h3>
                            <div className="space-y-10">
                              {formData[sec].map((item, i) => (
                                <div key={i} className="relative">
                                  <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-sm font-black uppercase tracking-tight">{item.role || item.name || item.title}</h4>
                                    <span className="text-[10px] font-black text-slate-300 uppercase">{item.period || item.year}</span>
                                  </div>
                                  <p className="text-[11px] font-black uppercase mb-3" style={{ color: themeColor }}>{item.company || item.issuer || item.school}</p>
                                  <p className="text-[12px] leading-[1.7] text-slate-600 font-medium">{item.description || item.list || item.degree}</p>
                                </div>
                              ))}
                            </div>
                            {selectedTemplate === 'developer' && sec === 'experience' && <CodeTerminal />}
                          </section>
                        );
                      })}
                    </div>

                    <div className="space-y-12">
                      {sectionOrder.slice(3).map((sec) => {
                        if (formData[sec]?.length === 0) return null;
                        return (
                          <section key={sec}>
                            <h3 className="text-xs font-black uppercase border-b-2 border-slate-100 mb-4 pb-1 tracking-widest text-slate-400">{sec.charAt(0).toUpperCase() + sec.slice(1)}</h3>
                            <div className="space-y-4">
                              {formData[sec].map((item, i) => (
                                <div key={i}>
                                  <p className="text-[11px] font-black text-slate-900 uppercase mb-1">{item.category || item.name || item.title || item.degree}</p>
                                  <p className="text-[10px] text-slate-400 leading-relaxed font-bold">{item.list || item.level || item.school || item.description}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <ToolLayout
      title={seoData.title}
      category="Career"
      slug="resume-builder"
      description={seoData.description}
      keywords={seoData.keywords}
      extendedContent={
        <div className="max-w-7xl mx-auto space-y-32 px-6 py-24">
          <section className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">
              <Zap size={14} className="text-teal-400" /> Enterprise-Grade Output
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-none">Command the Room Before <br/><span className="text-teal-600">You Enter It.</span></h2>
            <p className="text-2xl leading-relaxed text-slate-500 font-medium">
              We've engineered this tool to reflect the standards of top-tier silicon valley hiring. It's not just about what you say; it's about the technical authority your document projects.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Data Persistence', desc: 'Auto-syncing logic ensures your progress is never lost. Close the tab, come back, your asset is ready.', icon: Save, color: 'text-amber-500', bg: 'bg-amber-50' },
              { title: 'Dynamic Architecture', desc: 'Reorder sections, swap themes, and tune typography in real-time for specific high-value roles.', icon: Layout, color: 'text-teal-500', bg: 'bg-teal-50' },
              { title: 'Recruiter Intelligence', desc: 'Our visual logic is designed around heat-map studies of how elite recruiters scan documents.', icon: BarChart3, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            ].map((card, i) => (
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className="p-12 bg-white rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all">
                <div className={`w-16 h-16 ${card.bg} ${card.color} rounded-[1.5rem] flex items-center justify-center mb-8`}>
                  <card.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      }
    >
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.url} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="bg-white min-h-screen">
        <AnimatePresence mode="wait">
          {currentStep === 'choice' && <ChoiceStep key="choice" />}
          {currentStep === 'upload' && <UploadStep key="upload" />}
          {currentStep === 'templates' && <TemplatesStep key="templates" />}
          {currentStep === 'editor' && <EditorStep key="editor" />}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden !important; }
          #resume-content, #resume-content * { visibility: visible !important; }
          #resume-content {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 1.5cm !important;
            box-shadow: none !important;
            z-index: 9999999 !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </ToolLayout>
  );
};

export default ResumeBuilder;
