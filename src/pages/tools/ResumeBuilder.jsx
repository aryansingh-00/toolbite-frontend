import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, GraduationCap, Award, Plus, Trash2, 
  Download, Eye, Edit3, ChevronRight, ChevronLeft,
  Mail, Phone, Globe, MapPin, Upload, FileText, Sparkles, CheckCircle2, ArrowLeft,
  Languages, FolderKanban, Star, Camera, X, Zap, Layout, Monitor, Smartphone, ShieldAlert, Palette,
  ArrowUp, ArrowDown, Settings, Save, RefreshCw, BarChart3, Info, Code,
  ChevronDown, ChevronUp, GripVertical, Wand2, Share2, BookOpen, Link2
} from 'lucide-react';
import { FiGithub as Github, FiTerminal as Terminal, FiCpu as Cpu, FiDatabase as Database } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ToolLayout from '../../components/tools/ToolLayout';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import * as pdfjsLib from 'pdfjs-dist';
import html2pdf from 'html2pdf.js';
import ATSScorePanel from '../../components/resume/ATSScorePanel';
import AIFillModal from '../../components/resume/AIFillModal';
import StylePanel from '../../components/resume/StylePanel';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
  },
  elegant: {
    personal: { fullName: 'Victoria Sterling', email: 'victoria@sterling.exec', phone: '+1 (555) 888-0000', website: 'VP of Strategy', linkedin: 'linkedin.com/in/vsterling', github: '', location: 'New York, NY', summary: 'C-Suite Executive driving global strategy and enterprise transformation. Proven expertise in scaling operations and achieving 10x ROI for Fortune 100 brands.' },
    experience: [{ company: 'Sterling Partners', role: 'VP of Strategy', period: '2018 - Present', description: 'Directed a global portfolio of $200M+, implementing an aggressive growth framework that outpaced market competitors by 30%.' }],
    education: [{ school: 'Harvard Business School', degree: 'MBA in Global Strategy', year: '2015' }],
    skills: [{ category: 'Leadership', list: 'Corporate Strategy, M&A, Growth Marketing, Executive Management' }],
    projects: [{ name: 'Project Apex', link: '', description: 'Led the acquisition and integration of a major competitor, expanding market share by 45%.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'French', level: 'Fluent' }],
    awards: [{ title: 'Top 40 Under 40', year: '2022', issuer: 'Global Business Review' }]
  },
  fresher: {
    personal: { fullName: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210', website: 'Frontend Developer', linkedin: 'linkedin.com/in/priyasharma', github: 'github.com/priyadev', location: 'Bangalore, India', summary: 'Enthusiastic Computer Science graduate with hands-on experience in React and Python through internships and academic projects. Passionate about building user-friendly web applications and eager to contribute to a growth-oriented team.' },
    experience: [{ company: 'TechStartup Pvt Ltd', role: 'Frontend Intern', period: 'Jun 2024 - Aug 2024', description: 'Built responsive UI components using React and Tailwind CSS, improving mobile load time by 25%. Collaborated with senior developers on 3 client-facing features.' }],
    education: [{ school: 'Delhi Technological University', degree: 'B.Tech in Computer Science', year: '2024' }],
    skills: [{ category: 'Technical Skills', list: 'React, JavaScript, Python, HTML/CSS, Git, SQL, Figma, REST APIs' }],
    projects: [{ name: 'EduTrack App', link: 'github.com/priyadev/edutrack', description: 'Developed a student progress tracking web app using React and Firebase, adopted by 200+ students in the university.' }],
    languages: [{ name: 'English', level: 'Professional' }, { name: 'Hindi', level: 'Native' }],
    awards: [{ title: 'Best Project Award', year: '2024', issuer: 'DTU Computer Science Department' }],
    certifications: [{ title: 'React Developer Certification', issuer: 'Meta', year: '2024' }, { title: 'Google Data Analytics', issuer: 'Google', year: '2023' }]
  }
};

const ResumeBuilder = () => {
  const seoData = {
    title: "#1 Free AI Resume Builder | Create Professional CV Online | ToolBite",
    description: "Build a job-winning resume in minutes with ToolBite's free AI resume builder. 40+ professional CV templates, AI content generation, and ATS optimization. Download as PDF for free.",
    keywords: "AI resume builder, professional resume maker, free online cv builder, best resume templates 2024, ATS resume, CV generator, curriculum vitae maker, resume creator, ToolBite resume",
    url: "https://toolbite.io/tools/resume-builder"
  };

  const jsonLd = [
    {
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
      "description": "Elite AI-powered resume builder for professionals, featuring specialized templates for developers, executives, and students.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1240"
      },
      "featureList": "AI Content Generation, 40+ Premium Templates, Real-time ATS Scoring, PDF Export, JSON Export"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolbite.io/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://toolbite.io/tools" },
        { "@type": "ListItem", "position": 3, "name": "AI Resume Builder", "item": "https://toolbite.io/tools/resume-builder" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is the ToolBite AI Resume Builder free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, ToolBite's AI Resume Builder is 100% free to use. You can choose a template, use AI to generate content, and download your resume as a professional PDF without any hidden costs."
          }
        },
        {
          "@type": "Question",
          "name": "What is an ATS-friendly resume?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An ATS-friendly resume is designed to be easily read by Applicant Tracking Systems. ToolBite uses clean layouts and strategic keyword placement to ensure your resume passes through automated filters."
          }
        },
        {
          "@type": "Question",
          "name": "Can I edit my resume later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! You can save your resume as a JSON file and reload it into the ToolBite editor at any time to make updates or changes."
          }
        }
      ]
    }
  ];

  const [currentStep, setCurrentStep] = useState('choice');
  const [isParsing, setIsParsing] = useState(false);
  const [parseStatus, setParseStatus] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [visualLayout, setVisualLayout] = useState('architect');
  const [viewMode, setViewMode] = useState('split');
  const [themeColor, setThemeColor] = useState('#14b8a6'); // Teal 500
  const [sectionOrder, setSectionOrder] = useState(['experience', 'projects', 'education', 'skills', 'languages', 'awards', 'certifications']);
  const [expandedSection, setExpandedSection] = useState('personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStyleFilter, setActiveStyleFilter] = useState('All');
  const [activeExpFilter, setActiveExpFilter] = useState('All');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Feature panels
  const [showATSPanel, setShowATSPanel] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);

  // Style state
  const [editorStyles, setEditorStyles] = useState({
    themeColor: '#14b8a6',
    fontFamily: 'Inter, sans-serif',
    fontSizeScale: 1,
    lineSpacing: 1.6,
  });

  const handleStyleChange = (key, value) => {
    setEditorStyles(prev => ({ ...prev, [key]: value }));
    if (key === 'themeColor') setThemeColor(value);
  };

  const applyAIGenerated = (generated) => {
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, summary: generated.summary || prev.personal.summary },
      skills: generated.skills?.length > 0 ? generated.skills : prev.skills,
      experience: generated.experience?.length > 0 ? generated.experience : prev.experience,
      projects: generated.projects?.length > 0 ? generated.projects : prev.projects,
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (formData[type]) {
        const sectionData = [...formData[type]];
        const [removed] = sectionData.splice(source.index, 1);
        sectionData.splice(destination.index, 0, removed);
        setFormData(prev => ({ ...prev, [type]: sectionData }));
    }
  };

  const handleAIImprove = async (section, field, currentValue, index = null) => {
    if (!currentValue) return toast.error('Please enter some text first');
    const toastId = toast.loading('Gemini AI is optimizing your text...');
    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
      const prompt = field === 'summary'
        ? `Rewrite this professional resume summary to be ATS-optimized, impactful, and under 75 words. Return ONLY the rewritten summary, no extra text:\n\n${currentValue}`
        : `Rewrite this resume bullet point to start with a strong action verb and include measurable impact. Return ONLY the improved text, no extra text:\n\n${currentValue}`;
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 200 } })
      });
      const data = await res.json();
      const improved = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || currentValue;
      if (section === 'personal') updatePersonal(field, improved);
      else updateItem(section, index, field, improved);
      toast.success('AI optimization complete!', { id: toastId });
    } catch (err) {
      toast.error('AI improve failed. Please try again.', { id: toastId });
    }
  };

  const handleExportPDF = () => {
    const element = document.getElementById('resume-content');
    if (!element) return toast.error('Resume content not found');
    const toastId = toast.loading('Generating PDF...');
    const options = {
      margin: 0,
      filename: `${formData.personal.fullName || 'resume'}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save()
      .then(() => toast.success('PDF downloaded!', { id: toastId }))
      .catch(() => toast.error('PDF export failed', { id: toastId }));
  };

  const handleSaveJSON = () => {
    const blob = new Blob([JSON.stringify({ formData, themeColor, sectionOrder }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.personal.fullName || 'resume'}_toolbite.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Resume saved as JSON!');
  };

  const handleLoadJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.themeColor) setThemeColor(parsed.themeColor);
        if (parsed.sectionOrder) setSectionOrder(parsed.sectionOrder);
        toast.success('Resume loaded successfully!');
      } catch {
        toast.error('Invalid resume file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleShareLink = () => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify({ formData, themeColor })));
      const url = `${window.location.origin}/tools/resume-builder#resume=${encoded}`;
      navigator.clipboard.writeText(url);
      toast.success('Share link copied to clipboard!');
    } catch {
      toast.error('Could not generate share link');
    }
  };
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('toolbite_resume_data');
    return saved ? JSON.parse(saved) : {
      personal: { fullName: '', email: '', phone: '', website: '', linkedin: '', github: '', location: '', summary: '', profileImage: null },
      experience: [], education: [], skills: [], languages: [], projects: [], awards: [], certifications: []
    };
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#resume=')) {
      try {
        const encoded = hash.substring(8);
        const parsed = JSON.parse(decodeURIComponent(atob(encoded)));
        if (parsed.formData) {
          setFormData(parsed.formData);
          if (parsed.themeColor) setThemeColor(parsed.themeColor);
          setCurrentStep('editor');
          toast.success('Shared resume loaded!');
        }
      } catch (e) {
        console.error('Failed to load shared resume', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toolbite_resume_data', JSON.stringify(formData));
  }, [formData]);

  const calculateStrength = () => {
    let score = 0;
    if (formData.personal.fullName) score += 10;
    if (formData.personal.summary) score += 15;
    if (formData.personal.profileImage) score += 5;
    if (formData.experience.length > 0) score += 20;
    if (formData.education.length > 0) score += 10;
    if (formData.skills.length > 0) score += 15;
    if (formData.projects.length > 0) score += 10;
    if (formData.languages.length > 0) score += 5;
    if (formData.awards.length > 0) score += 5;
    if (formData.certifications?.length > 0) score += 5;
    return Math.min(score, 100);
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
      awards: { title: '', year: '', issuer: '' },
      certifications: { title: '', year: '', issuer: '' }
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
    if (type === 'corporate' || type === 'minimalist' || type === 'elegant') setVisualLayout('executive');
    else if (type === 'creative') setVisualLayout('visionary');
    else setVisualLayout('architect');
    setCurrentStep('editor');
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} archetype loaded!`);
  };

  const resetData = () => {
    if (window.confirm('Are you sure? This will delete all your current progress.')) {
      setFormData({
        personal: { fullName: '', email: '', phone: '', website: '', linkedin: '', github: '', location: '', summary: '', profileImage: null },
        experience: [], education: [], skills: [], languages: [], projects: [], awards: [], certifications: []
      });
      localStorage.removeItem('toolbite_resume_data');
      toast.success('Editor reset.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setParseStatus('Initializing AI Core...');

    try {
      let extractedText = '';
      
      if (file.type === 'application/pdf') {
        setParseStatus('Extracting Document Architecture...');
        const fileReader = new FileReader();
        extractedText = await new Promise((resolve, reject) => {
          fileReader.onload = async () => {
            try {
              const typedarray = new Uint8Array(fileReader.result);
              const pdf = await pdfjsLib.getDocument(typedarray).promise;
              let fullText = '';
              for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + ' \\n';
              }
              resolve(fullText);
            } catch (err) {
              reject(err);
            }
          };
          fileReader.onerror = reject;
          fileReader.readAsArrayBuffer(file);
        });
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        setParseStatus('Reading Text Matrix...');
        const fileReader = new FileReader();
        extractedText = await new Promise((resolve, reject) => {
          fileReader.onload = () => resolve(fileReader.result);
          fileReader.onerror = reject;
          fileReader.readAsText(file);
        });
      }

      setParseStatus('Structuring Career Data...');
      await new Promise(r => setTimeout(r, 1000));
      setParseStatus('Optimizing for ATS...');
      
      let newData = { ...dummyData.modern };
      
      if (extractedText) {
        // Basic NLP heuristics
        const words = extractedText.split(/\s+/).filter(w => w.length > 0);
        if (words.length > 0) {
           newData.personal.fullName = words.slice(0, 2).join(' '); 
        }
        
        const emailMatch = extractedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) newData.personal.email = emailMatch[0];
        
        const phoneMatch = extractedText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        if (phoneMatch) newData.personal.phone = phoneMatch[0];

        newData.personal.summary = extractedText.substring(0, 600) + '...';
      } else {
        newData.personal.fullName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      }

      setFormData(newData);
      setIsParsing(false);
      setCurrentStep('editor');
      toast.success('Successfully mapped your data!');
      
    } catch (error) {
      console.error(error);
      setIsParsing(false);
      toast.error('Failed to parse document. Please try a different file.');
    }
  };

  // UI Sections
  const renderChoiceStep = () => (
    <motion.div key="choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full bg-transparent min-h-[calc(100vh-8rem)] flex items-center pt-8 pb-20 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Buttons */}
          <div className="text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-slate-600 font-medium"><strong>49,171</strong> CVs created today</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
              Forge a <span className="text-emerald-400">Weapon</span> <br/>for the Job Market.
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
              The first step to an elite role? An elite CV. Architect your career path with AI-driven content generation, real-time ATS optimization, and industry-leading templates.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setCurrentStep('templates')} className="px-8 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-3">
                <Layout size={20} />
                Explore Templates
              </button>
              <button onClick={() => setCurrentStep('upload')} className="px-8 py-5 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold rounded-xl transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-3 backdrop-blur-md">
                <Upload size={20} />
                Import Existing CV
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual with Floating Badges */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            {/* Background glowing circle */}
            <div className="absolute inset-0 bg-sky-100/50 rounded-full blur-3xl transform scale-75"></div>
            
            {/* Main Resume Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[450px] h-full max-h-[600px] z-10"
            >
              <img 
                src="/images/resume-hero.png" 
                alt="Resume Preview" 
                className="w-full h-full object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white"
              />
            </motion.div>

            {/* Floating Element 1: Export Icons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="absolute top-12 -right-8 md:right-0 bg-white p-3 rounded-2xl shadow-xl z-20 flex flex-col gap-3 border border-slate-100"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 font-black text-xs border border-rose-100"><FileText size={20} className="mb-1" /><span className="absolute bottom-1 text-[8px]">PDF</span></div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 font-black text-xs border border-blue-100"><FileText size={20} className="mb-1" /><span className="absolute bottom-1 text-[8px]">DOC</span></div>
            </motion.div>

            {/* Floating Element 2: Color Palette */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
              className="absolute top-1/2 -left-12 md:-left-4 transform -translate-y-1/2 bg-white px-4 py-3 rounded-full shadow-xl z-20 flex gap-2 border border-slate-100"
            >
              <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-slate-100"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-200 shadow-sm"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-green-200 shadow-sm"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-orange-200 shadow-sm"></div>
            </motion.div>

            {/* Floating Element 3: ATS Perfect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="absolute bottom-32 -left-8 md:left-4 bg-emerald-50 px-5 py-3 rounded-xl shadow-lg z-20 flex items-center gap-2 border border-emerald-100"
            >
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-emerald-600 font-bold text-sm">ATS Perfect</span>
            </motion.div>

            {/* Floating Element 4: AI Ideas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="absolute -bottom-8 -right-4 md:right-12 bg-white p-5 rounded-2xl shadow-2xl z-30 w-72 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-sky-500" />
                <span className="font-bold text-slate-800 text-sm">AI-powered ideas:</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><ArrowLeft size={12} className="rotate-180" /></div>
                  <p className="text-xs text-slate-600 leading-tight">Analyzed market trends to identify new growth opportunities.</p>
                </div>
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><ArrowLeft size={12} className="rotate-180" /></div>
                  <p className="text-xs text-slate-600 leading-tight">Reduced operational costs by 15% through process optimization.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderUploadStep = () => (
    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto py-20 text-center px-6">
      <button onClick={() => setCurrentStep('choice')} className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-teal-600 transition-colors mx-auto">
        <ArrowLeft size={18} /> Go Back
      </button>

      <div className="p-16 bg-slate-900 rounded-[3rem] border-2 border-dashed border-white/10 hover:border-teal-400 transition-all cursor-pointer group relative overflow-hidden">
        {isParsing && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center">
            <div className="w-20 h-20 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(20,184,166,0.3)]"></div>
            <p className="text-2xl font-black text-white animate-pulse mb-3">AI Engine Processing</p>
            <div className="flex items-center gap-3 text-teal-400 font-medium bg-teal-500/10 px-6 py-3 rounded-full">
              <Zap size={16} />
              {parseStatus || 'Mapping career trajectory...'}
            </div>
          </div>
        )}
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-teal-500/20 transition-colors">
          <Upload className="text-slate-400 group-hover:text-teal-400" size={48} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Drag and drop your resume here</h3>
        <p className="text-slate-400 mb-8 text-sm">AI Engine supports PDF and TXT files</p>
        <label className="cursor-pointer px-10 py-4 bg-teal-500 text-white font-black rounded-2xl shadow-xl hover:bg-teal-600 transition-all inline-block">
          Select Master File
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
        </label>
      </div>
    </motion.div>
  );

  const renderTemplatesStep = () => {
    const templatesList = [
      { id: 'minimalist', name: 'Minimal', desc: 'Optimized for Academic & Exec', style: 'Simple', exp: 'Experienced', isPopular: true, tags: ['ATS Friendly', 'Clean', 'Classic'] },
      { id: 'modern', name: 'Astral', desc: 'Optimized for Tech & Design', style: 'Creative', exp: 'Experienced', isRecommended: true, tags: ['Tech', 'Modern', 'Sleek'] },
      { id: 'corporate', name: 'Astralis', desc: 'Optimized for Finance & Law', style: 'Professional', exp: 'Experienced', tags: ['Finance', 'Law', 'Formal'] },
      { id: 'creative', name: 'Pulsar', desc: 'Optimized for Media & Arts', style: 'Creative', exp: 'Fresher', tags: ['Arts', 'Media', 'Vibrant'] },
      { id: 'elegant', name: 'Aura', desc: 'Optimized for Management', style: 'Professional', exp: 'Experienced', isPopular: true, tags: ['Management', 'Executive', 'Luxury'] },
      { id: 'developer', name: 'Eclipse', desc: 'Optimized for Engineers & OSS', style: 'Simple', exp: 'Fresher', tags: ['Engineering', 'Coding', 'GitHub'] },
      { id: 'fresher', name: 'Launchpad', desc: 'Optimized for Students & Freshers', style: 'Simple', exp: 'Fresher', isRecommended: true, tags: ['Student', 'Entry Level', 'ATS Friendly'] },
    ];

    const filteredTemplates = templatesList.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStyle = activeStyleFilter === 'All' || t.style === activeStyleFilter;
      const matchExp = activeExpFilter === 'All' || t.exp === activeExpFilter;
      return matchSearch && matchStyle && matchExp;
    });

    return (
      <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full bg-slate-950 min-h-screen pb-20 pt-8 overflow-y-auto relative">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Gallery Header & Navigation */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <button onClick={() => setCurrentStep('choice')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} /> Back to Choice
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Template Gallery</h2>
              <p className="text-slate-400">Select a professionally designed template to get started.</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search templates or tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 pl-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-8 border-b border-slate-800 pb-8">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">By Style</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'Simple', 'Creative', 'Professional'].map(style => (
                <button 
                  key={style}
                  onClick={() => setActiveStyleFilter(style)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeStyleFilter === style ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">By Experience Level</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'Fresher', 'Experienced'].map(exp => (
                <button 
                  key={exp}
                  onClick={() => setActiveExpFilter(exp)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeExpFilter === exp ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="max-w-7xl mx-auto px-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600"><FileText size={32} /></div>
              <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
              <p className="text-slate-400">Try adjusting your filters or search query.</p>
              <button onClick={() => { setSearchQuery(''); setActiveExpFilter('All'); setActiveStyleFilter('All'); }} className="mt-6 px-6 py-2 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((t) => (
                <div key={t.id} className="group relative bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden hover:border-slate-600 transition-all shadow-xl">
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {t.isPopular && <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1"><Star size={10} /> Most Popular</span>}
                    {t.isRecommended && <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1"><Zap size={10} /> Recommended</span>}
                  </div>

                  {/* Image Wrapper */}
                  <div className="aspect-[1/1.4] w-full bg-slate-800 overflow-hidden relative">
                    <img src={`/images/templates/${t.id}.png`} alt={`${t.name} template`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    
                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-8">
                      <button 
                        onClick={() => {
                          loadTemplate(t.id);
                        }}
                        className="w-full py-4 bg-teal-500 text-white font-black rounded-xl shadow-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                      >
                        <Edit3 size={18} /> Use Template
                      </button>
                      <button 
                        onClick={() => {
                          setPreviewTemplate(t);
                          setPreviewModalOpen(true);
                        }}
                        className="w-full py-4 bg-white/10 text-white font-black rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                      >
                        <Eye size={18} /> Preview
                      </button>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{t.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full-Screen Preview Modal */}
        <AnimatePresence>
          {previewModalOpen && previewTemplate && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl p-4 md:p-8 flex items-center justify-center overflow-y-auto"
            >
              <button onClick={() => setPreviewModalOpen(false)} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110]">
                <X size={24} />
              </button>

              <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 items-center justify-center relative min-h-full py-12">
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img src={`/images/templates/${previewTemplate.id}.png`} alt={previewTemplate.name} className="w-full h-auto" />
                </motion.div>

                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full max-w-sm shrink-0 lg:sticky lg:top-20 text-center lg:text-left">
                  <h2 className="text-5xl font-black text-white mb-2">{previewTemplate.name}</h2>
                  <p className="text-xl text-teal-400 font-medium mb-8">{previewTemplate.desc}</p>
                  
                  <div className="space-y-6 mb-12">
                    <div>
                      <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Ideal For</h4>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                        <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">{previewTemplate.style} Style</span>
                        <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">{previewTemplate.exp} Level</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Features</h4>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                        {previewTemplate.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-sky-500/10 text-sky-400 rounded-lg text-sm border border-sky-500/20">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      loadTemplate(previewTemplate.id);
                      setPreviewModalOpen(false);
                    }}
                    className="w-full py-5 bg-teal-500 text-white font-black text-lg rounded-2xl shadow-[0_0_40px_rgba(20,184,166,0.3)] hover:bg-teal-400 hover:scale-105 transition-all"
                  >
                    Start with {previewTemplate.name}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    );
  };

  const renderGitHubGraph = () => (
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

  const renderCodeTerminal = () => (
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


  const renderArchitectTemplate = () => (
    <div id="resume-content" className="bg-white text-slate-900 w-full max-w-[800px] min-h-[1050px] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-sm p-12 lg:p-20 relative z-10 resume-print">
      <div className="flex justify-between items-start border-b-4 pb-10 mb-12" style={{ borderBottomColor: themeColor }}>
        <div className="flex-1">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 leading-none">{formData.personal.fullName || 'YOUR NAME'}</h2>
          <p className="text-lg font-black uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>{formData.personal.website || 'PROFESSIONAL ARCHETYPE'}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            {formData.personal.email && <span className="flex items-center gap-1.5"><Mail size={12} className="text-slate-300" /> {formData.personal.email}</span>}
            {formData.personal.phone && <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-300" /> {formData.personal.phone}</span>}
            {formData.personal.location && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-300" /> {formData.personal.location}</span>}
            {formData.personal.linkedin && <span className="flex items-center gap-1.5"><Globe size={12} className="text-slate-300" /> {formData.personal.linkedin}</span>}
          </div>
        </div>
        {formData.personal.profileImage && (
          <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-slate-900 ml-10 shrink-0 shadow-2xl">
            <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      {formData.personal.summary && (
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase border-b-2 border-slate-100 mb-4 pb-1 tracking-widest text-slate-400">Strategic Profile</h3>
          <p className="text-[13px] leading-[1.8] text-slate-700 font-medium">{formData.personal.summary}</p>
          {selectedTemplate === 'developer' && renderGitHubGraph()}
        </div>
      )}
      <div className="grid grid-cols-[1.8fr_1fr] gap-16">
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
                {selectedTemplate === 'developer' && sec === 'experience' && renderCodeTerminal()}
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
                      <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
                        {item.list || item.level || item.school || item.description}
                        {item.issuer && ` · ${item.issuer}`}
                        {item.year && ` (${item.year})`}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderExecutiveTemplate = () => (
    <div id="resume-content" className="bg-white text-slate-900 w-full max-w-[800px] min-h-[1050px] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-sm p-16 relative z-10 resume-print font-serif">
      <div className="text-center border-b-[3px] border-slate-900 pb-8 mb-10 relative">
        <h2 className="text-4xl font-bold uppercase tracking-widest mb-4 text-slate-900">{formData.personal.fullName || 'YOUR NAME'}</h2>
        <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] font-sans text-slate-600 uppercase tracking-widest font-bold">
          {formData.personal.email && <span>{formData.personal.email}</span>}
          {formData.personal.phone && <span className="text-slate-300">•</span>}
          {formData.personal.phone && <span>{formData.personal.phone}</span>}
          {formData.personal.location && <span className="text-slate-300">•</span>}
          {formData.personal.location && <span>{formData.personal.location}</span>}
          {formData.personal.linkedin && <span className="text-slate-300">•</span>}
          {formData.personal.linkedin && <span>{formData.personal.linkedin}</span>}
        </div>
        {formData.personal.profileImage && (
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-sm">
            <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      {formData.personal.summary && (
        <div className="mb-10 text-justify">
          <p className="text-[13px] leading-relaxed text-slate-800 font-medium">{formData.personal.summary}</p>
        </div>
      )}
      <div className="space-y-10">
        {sectionOrder.map((sec) => {
          if (formData[sec]?.length === 0) return null;
          return (
            <section key={sec}>
              <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-5 pb-1 tracking-widest text-slate-900" style={{ color: themeColor }}>
                {sec === 'experience' ? 'Professional Experience' : sec === 'projects' ? 'Selected Projects' : sec.charAt(0).toUpperCase() + sec.slice(1)}
              </h3>
              <div className="space-y-6">
                {formData[sec].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-[13px] font-bold uppercase font-sans tracking-tight text-slate-900">{item.role || item.name || item.title || item.school || item.category}</h4>
                      <span className="text-[11px] font-bold text-slate-500 uppercase font-sans">{item.period || item.year || item.level}</span>
                    </div>
                    <p className="text-[12px] font-bold mb-2 font-sans text-slate-700">{item.company || item.issuer || item.degree || item.list}</p>
                    {item.description && <p className="text-[12px] leading-[1.6] text-slate-700 font-medium">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );

  const renderVisionaryTemplate = () => (
    <div id="resume-content" className="bg-white text-slate-900 w-full max-w-[800px] min-h-[1050px] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-sm flex relative z-10 resume-print overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[280px] shrink-0 p-10 text-white flex flex-col h-[1050px]" style={{ backgroundColor: themeColor }}>
        {formData.personal.profileImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-8 mx-auto shadow-2xl">
            <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <h2 className="text-3xl font-black uppercase tracking-tight mb-2 leading-none text-center">{formData.personal.fullName || 'YOUR NAME'}</h2>
        <p className="text-sm font-bold uppercase tracking-widest mb-10 text-white/70 text-center">{formData.personal.website || 'PROFESSIONAL'}</p>
        
        <div className="space-y-6 text-[11px] font-bold text-white/90">
          {formData.personal.email && <div className="flex items-center gap-3"><Mail size={14} className="text-white/50" /> <span className="break-all">{formData.personal.email}</span></div>}
          {formData.personal.phone && <div className="flex items-center gap-3"><Phone size={14} className="text-white/50" /> <span>{formData.personal.phone}</span></div>}
          {formData.personal.location && <div className="flex items-center gap-3"><MapPin size={14} className="text-white/50" /> <span>{formData.personal.location}</span></div>}
          {formData.personal.linkedin && <div className="flex items-center gap-3"><Globe size={14} className="text-white/50" /> <span className="break-all">{formData.personal.linkedin}</span></div>}
        </div>

        <div className="mt-12 space-y-10 flex-1">
           {sectionOrder.filter(s => ['skills', 'languages', 'awards', 'certifications'].includes(s)).map((sec) => {
             if (formData[sec]?.length === 0) return null;
             return (
               <div key={sec}>
                 <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 pb-2 border-b border-white/20 text-white">{sec}</h3>
                 <div className="space-y-4 text-xs text-white/90">
                   {formData[sec].map((item, i) => (
                     <div key={i}>
                       <p className="font-black text-white mb-1 uppercase tracking-tight">{item.category || item.name || item.title}</p>
                       <p className="font-medium">{item.list || item.level || item.issuer}{item.year && ` (${item.year})`}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )
           })}
        </div>
      </div>
      
      {/* Right Content */}
      <div className="flex-1 p-10 py-16 bg-slate-50 h-[1050px]">
        {formData.personal.summary && (
          <div className="mb-12">
            <div className="w-10 h-1 mb-6" style={{ backgroundColor: themeColor }}></div>
            <p className="text-[13px] leading-relaxed text-slate-700 font-medium">{formData.personal.summary}</p>
          </div>
        )}
        
        <div className="space-y-12">
          {sectionOrder.filter(s => ['experience', 'education', 'projects'].includes(s)).map((sec) => {
             if (formData[sec]?.length === 0) return null;
             return (
               <section key={sec}>
                 <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                   {sec}
                 </h3>
                 <div className="space-y-8">
                   {formData[sec].map((item, i) => (
                     <div key={i} className="relative pl-6 border-l-2 border-white/10">
                       <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                       <div className="flex justify-between items-baseline mb-1">
                         <h4 className="text-[14px] font-bold text-slate-900">{item.role || item.name || item.degree}</h4>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white shadow-sm px-2 py-1 rounded">{item.period || item.year}</span>
                       </div>
                       <p className="text-[11px] font-black uppercase mb-3 text-slate-500" style={{ color: themeColor }}>{item.company || item.school}</p>
                       {item.description && <p className="text-[12px] leading-relaxed text-slate-600 font-medium">{item.description}</p>}
                     </div>
                   ))}
                 </div>
               </section>
             )
          })}
        </div>
      </div>
    </div>
  );

  const renderEditorStep = () => {
    const strength = calculateStrength();
    const navItems = [
      { id: 'personal', label: 'Personal', icon: User },
      { id: 'experience', label: 'Experience', icon: Briefcase },
      { id: 'projects', label: 'Projects', icon: FolderKanban },
      { id: 'education', label: 'Education', icon: GraduationCap },
      { id: 'skills', label: 'Skills', icon: Award },
      { id: 'languages', label: 'Languages', icon: Languages },
      { id: 'awards', label: 'Awards', icon: Star },
      { id: 'certifications', label: 'Certifications', icon: CheckCircle2 },
    ];

    // Live ATS Score calculation (inline for toolbar badge)
    const atsLiveScore = (() => {
      const p = formData?.personal || {};
      let s = 0;
      if (p.email) s += 10; if (p.phone) s += 8; if (p.location) s += 5;
      const wc = (p.summary || '').trim().split(/\s+/).filter(Boolean).length;
      if (wc >= 40 && wc <= 80) s += 15; else if (wc > 0) s += 6;
      const skillCount = (formData?.skills || []).flatMap(sk => (sk.list || '').split(',')).filter(Boolean).length;
      if (skillCount >= 6) s += 10; else if (skillCount > 0) s += 4;
      if ((formData?.experience || []).length > 0) s += 10;
      if ((formData?.education || []).length > 0) s += 5;
      if ((formData?.projects || []).length > 0) s += 5;
      return Math.min(s, 100);
    })();
    const atsColor = atsLiveScore >= 86 ? '#10b981' : atsLiveScore >= 71 ? '#3b82f6' : atsLiveScore >= 41 ? '#f59e0b' : '#ef4444';

    return (
      <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-950 flex flex-col">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentStep('choice')} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500" title="Exit Editor">
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-300">Live Syncing</span>
                  </div>
               </div>
               <div className="w-px h-8 bg-white/10"></div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Strength Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${strength}%` }} className={`h-full ${strength > 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : strength > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}></motion.div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">{strength}%</span>
                  </div>
               </div>
               <div className="w-px h-8 bg-white/10"></div>
               {/* Live ATS Badge */}
               <div className="flex flex-col cursor-pointer" onClick={() => setShowATSPanel(true)} title="Open ATS Score Panel">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ATS Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${atsLiveScore}%` }} className="h-full rounded-full" style={{ backgroundColor: atsColor }} />
                    </div>
                    <span className="text-xs font-black" style={{ color: atsColor }}>{atsLiveScore}</span>
                  </div>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl">
            <button onClick={() => setViewMode('edit')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'edit' ? 'bg-white/10 text-teal-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}>
              <Edit3 size={14} /> Edit
            </button>
            <button onClick={() => setViewMode('split')} className={`hidden lg:flex px-4 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-2 ${viewMode === 'split' ? 'bg-white/10 text-teal-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}>
              <Monitor size={14} /> Split
            </button>
            <button onClick={() => setViewMode('preview')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'preview' ? 'bg-white/10 text-teal-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}>
              <Eye size={14} /> Preview
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowStylePanel(!showStylePanel)} className={`p-2.5 rounded-xl transition-colors ${showStylePanel ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-violet-400 hover:bg-violet-500/10'}`} title="Style Controls">
              <Palette size={18} />
            </button>
            <button onClick={() => setShowAIModal(true)} className="px-4 py-2 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-lg" title="AI Fill from Job Description">
              <Sparkles size={14} /> AI Fill
            </button>
            <button onClick={() => setShowATSPanel(!showATSPanel)} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${showATSPanel ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'text-slate-400 border-white/10 hover:text-teal-400 hover:bg-teal-500/10'}`} title="ATS Score">
              <BarChart3 size={14} /> ATS Score
            </button>
            <button onClick={resetData} className="p-2.5 text-slate-400 hover:text-rose-500 transition-colors" title="Reset Editor">
              <RefreshCw size={18} />
            </button>
            <button onClick={handleExportPDF} className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-teal-600 transition-all flex items-center gap-2 text-sm">
              <Download size={18} /> Export PDF
            </button>
            <button onClick={handleSaveJSON} className="p-2.5 text-slate-400 hover:text-emerald-400 transition-colors" title="Save as JSON">
              <Save size={18} />
            </button>
            <label className="p-2.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer" title="Load JSON">
              <BookOpen size={18} />
              <input type="file" className="hidden" accept=".json" onChange={handleLoadJSON} />
            </label>
            <button onClick={handleShareLink} className="p-2.5 text-slate-400 hover:text-violet-400 transition-colors" title="Copy Share Link">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className={`grid flex-1 overflow-hidden ${viewMode === 'split' ? 'grid-cols-[1fr_1fr]' : 'grid-cols-1'}`}>
          {/* Editor Area */}
          {(viewMode === 'split' || viewMode === 'edit') && (
            <div className="overflow-y-auto no-scrollbar bg-slate-950 border-r border-white/5 pb-20">
              <div className="max-w-3xl mx-auto py-12 px-8">
                
                {/* Accordion List */}
                <div className="space-y-4">
                  
                  {/* Personal Info Accordion */}
                  <div className="border border-white/5 rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-sm shadow-xl">
                    <button onClick={() => setExpandedSection(expandedSection === 'personal' ? null : 'personal')} className="w-full px-8 py-6 flex items-center justify-between bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <User size={20} className="text-emerald-400" />
                        <span className="font-black text-white text-lg">Personal Details</span>
                      </div>
                      {expandedSection === 'personal' ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSection === 'personal' && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/5">
                          <div className="p-8 space-y-8">
                            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-900/80 rounded-3xl border border-white/5">
                              <div className="relative group shrink-0">
                                <div className="w-32 h-32 rounded-3xl bg-slate-950 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group-hover:border-emerald-500 transition-all relative z-10">
                                  {formData.personal.profileImage ? (
                                    <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                  ) : (
                                    <Camera className="text-slate-700" size={32} />
                                  )}
                                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                                </div>
                                {formData.personal.profileImage && (
                                  <button onClick={() => updatePersonal('profileImage', null)} className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-20">
                                    <X size={14} />
                                  </button>
                                )}
                              </div>
                              <div className="text-center md:text-left">
                                <h4 className="text-lg font-black text-slate-900 mb-1">Profile Photo</h4>
                                <p className="text-slate-500 text-sm mb-4">Adding a photo can build trust and authority.</p>
                                <label className="cursor-pointer px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl border border-slate-200 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm inline-block text-sm">
                                  Upload Photo
                                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                </label>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {[
                                { id: 'fullName', label: 'Full Name', placeholder: 'e.g. Alexander Pierce' },
                                { id: 'website', label: 'Job Title', placeholder: 'e.g. Senior UX Architect' },
                                { id: 'email', label: 'Email', placeholder: 'e.g. alex.p@tech.com', type: 'email' },
                                { id: 'phone', label: 'Phone', placeholder: 'e.g. +1 (555) 012-3456' },
                                { id: 'linkedin', label: 'LinkedIn', placeholder: 'e.g. linkedin.com/in/alex' },
                                { id: 'location', label: 'Location', placeholder: 'e.g. San Francisco, CA' },
                              ].map((field) => (
                                <div key={field.id} className="space-y-2">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                                  <input 
                                    type={field.type || 'text'} 
                                    value={formData.personal[field.id]} 
                                    onChange={(e) => updatePersonal(field.id, e.target.value)} 
                                    placeholder={field.placeholder} 
                                    className="w-full px-4 py-3.5 bg-slate-950 border border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-bold text-white placeholder:text-slate-700 transition-all" 
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Summary</label>
                                <button onClick={() => handleAIImprove('personal', 'summary', formData.personal.summary)} className="text-[10px] flex items-center gap-1 font-black text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors px-2 py-1 rounded">
                                  <Wand2 size={10} /> Improve with AI
                                </button>
                              </div>
                              <textarea 
                                rows={6} 
                                value={formData.personal.summary} 
                                onChange={(e) => updatePersonal('summary', e.target.value)} 
                                placeholder="Write a compelling summary of your career..." 
                                className="w-full px-4 py-4 bg-slate-950 border border-white/5 rounded-[2rem] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-bold text-white placeholder:text-slate-700 transition-all resize-none" 
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dynamic Sections */}
                  <DragDropContext onDragEnd={onDragEnd}>
                    {sectionOrder.map(section => {
                      const Icon = navItems.find(n => n.id === section)?.icon || FileText;
                      const label = navItems.find(n => n.id === section)?.label || section;
                      
                      return (
                        <div key={section} className="border border-white/5 rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-sm shadow-xl">
                          <button onClick={() => setExpandedSection(expandedSection === section ? null : section)} className="w-full px-8 py-6 flex items-center justify-between bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Icon size={20} className="text-emerald-400" />
                              <span className="font-black text-white text-lg">{label}</span>
                            </div>
                            {expandedSection === section ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
                          </button>

                          <AnimatePresence>
                            {expandedSection === section && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/5">
                                <div className="p-8 space-y-6 bg-slate-950/30">
                                  <Droppable droppableId={section} type={section}>
                                    {(provided) => (
                                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                        {formData[section].map((item, i) => (
                                          <Draggable key={`${section}-${i}`} draggableId={`${section}-${i}`} index={i}>
                                            {(provided, snapshot) => (
                                              <div 
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                className={`p-6 bg-slate-950 rounded-[2rem] border border-white/5 shadow-xl relative group hover:border-emerald-500 transition-all ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-emerald-500 scale-105 bg-slate-900' : ''}`}
                                              >
                                                <div 
                                                  {...provided.dragHandleProps} 
                                                  className="absolute -left-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-slate-300 hover:text-teal-500 transition-colors opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
                                                >
                                                  <GripVertical size={16} />
                                                </div>

                                                <button onClick={() => removeItem(section, i)} className="absolute top-4 right-4 w-8 h-8 bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-500 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                                  <Trash2 size={16} />
                                                </button>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  {section === 'experience' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Job Title</label><input type="text" value={item.role} onChange={(e) => updateItem('experience', i, 'role', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Company</label><input type="text" value={item.company} onChange={(e) => updateItem('experience', i, 'company', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1 md:col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase">Duration</label><input type="text" value={item.period} onChange={(e) => updateItem('experience', i, 'period', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="md:col-span-2 space-y-1">
                                                        <div className="flex justify-between items-center">
                                                          <label className="text-[10px] font-black text-slate-400 uppercase">Description</label>
                                                          <button onClick={() => handleAIImprove('experience', 'description', item.description, i)} className="text-[9px] flex items-center gap-1 font-black text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors px-2 py-1 rounded">
                                                            <SparklesIcon size={10} /> Generate Bullets
                                                          </button>
                                                        </div>
                                                        <textarea rows={4} value={item.description} onChange={(e) => updateItem('experience', i, 'description', e.target.value)} className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl outline-none font-bold text-white resize-none focus:border-emerald-500 transition-colors" />
                                                      </div>
                                                    </>
                                                  )}
                                                  {section === 'education' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Institution</label><input type="text" value={item.school} onChange={(e) => updateItem('education', i, 'school', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Degree</label><input type="text" value={item.degree} onChange={(e) => updateItem('education', i, 'degree', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Year</label><input type="text" value={item.year} onChange={(e) => updateItem('education', i, 'year', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                    </>
                                                  )}
                                                  {section === 'skills' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Skill Category</label><input type="text" value={item.category} onChange={(e) => updateItem('skills', i, 'category', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Skills</label><input type="text" value={item.list} onChange={(e) => updateItem('skills', i, 'list', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                    </>
                                                  )}
                                                  {section === 'projects' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Project Name</label><input type="text" value={item.name} onChange={(e) => updateItem('projects', i, 'name', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1 md:col-span-2">
                                                        <div className="flex justify-between items-center">
                                                          <label className="text-[10px] font-black text-slate-400 uppercase">Description</label>
                                                          <button onClick={() => handleAIImprove('projects', 'description', item.description, i)} className="text-[9px] flex items-center gap-1 font-black text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors px-2 py-1 rounded">
                                                            <Wand2 size={10} /> Enhance
                                                          </button>
                                                        </div>
                                                        <textarea rows={2} value={item.description} onChange={(e) => updateItem('projects', i, 'description', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold resize-none" />
                                                      </div>
                                                    </>
                                                  )}
                                                  {section === 'languages' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Language</label><input type="text" value={item.name} onChange={(e) => updateItem('languages', i, 'name', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Proficiency</label><select value={item.level} onChange={(e) => updateItem('languages', i, 'level', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold"><option>Native</option><option>Fluent</option><option>Intermediate</option><option>Beginner</option></select></div>
                                                    </>
                                                  )}
                                                  {section === 'awards' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Award Title</label><input type="text" value={item.title} onChange={(e) => updateItem('awards', i, 'title', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Issuer</label><input type="text" value={item.issuer} onChange={(e) => updateItem('awards', i, 'issuer', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                    </>
                                                  )}
                                                  {section === 'certifications' && (
                                                    <>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Certification Title</label><input type="text" value={item.title || ''} onChange={(e) => updateItem('certifications', i, 'title', e.target.value)} placeholder="e.g. AWS Solutions Architect" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Issuing Body</label><input type="text" value={item.issuer || ''} onChange={(e) => updateItem('certifications', i, 'issuer', e.target.value)} placeholder="e.g. Amazon Web Services" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                      <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">Year</label><input type="text" value={item.year || ''} onChange={(e) => updateItem('certifications', i, 'year', e.target.value)} placeholder="e.g. 2024" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold" /></div>
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>

                                  <button onClick={() => addItem(section)} className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-slate-500 font-bold hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 group">
                                    <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add {label}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </DragDropContext>
                </div>

              </div>
            </div>
          )}

          {/* Preview Area */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className="bg-black overflow-y-auto no-scrollbar relative flex justify-center py-16 px-8">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none"></div>
               
               {/* Compact layout switcher - moved to bottom */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full px-3 py-1.5 z-20">
                  {['architect', 'executive', 'visionary'].map(l => (
                    <button key={l} onClick={() => setVisualLayout(l)} className={`px-3 py-1 rounded-full text-[10px] font-black transition-all uppercase tracking-wider ${visualLayout === l ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                      {l}
                    </button>
                  ))}
               </div>

               {visualLayout === 'architect' && renderArchitectTemplate()}
               {visualLayout === 'executive' && renderExecutiveTemplate()}
               {visualLayout === 'visionary' && renderVisionaryTemplate()}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
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

      {currentStep === 'editor' ? (
        renderEditorStep()
      ) : (
        <div className="bg-slate-950 min-h-screen pt-24 pb-12">
          <AnimatePresence mode="wait">
            {currentStep === 'choice' && renderChoiceStep()}
            {currentStep === 'upload' && renderUploadStep()}
            {currentStep === 'templates' && renderTemplatesStep()}
          </AnimatePresence>
        </div>
      )}

      {/* ── Feature Panels (editor-only) ─────────────────────────────────── */}
      <AnimatePresence>
        {showATSPanel && currentStep === 'editor' && (
          <ATSScorePanel
            key="ats"
            formData={formData}
            onClose={() => setShowATSPanel(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStylePanel && currentStep === 'editor' && (
          <StylePanel
            key="style"
            styles={editorStyles}
            onStyleChange={handleStyleChange}
            onClose={() => setShowStylePanel(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAIModal && currentStep === 'editor' && (
          <AIFillModal
            key="ai"
            formData={formData}
            onApply={applyAIGenerated}
            onClose={() => setShowAIModal(false)}
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body * { visibility: hidden !important; }
          #resume-content, #resume-content * { visibility: visible !important; }
          #resume-content {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 15mm !important;
            box-shadow: none !important;
            transform: none !important;
            z-index: 9999999 !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          /* Override any ancestor constraints during print */
          html, body, #root, .min-h-screen, .grid, .overflow-y-auto, .overflow-hidden {
            overflow: visible !important;
            height: auto !important;
            position: static !important;
            transform: none !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
};

export default ResumeBuilder;
