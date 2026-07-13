import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ChevronDown, Type, Image as ImageIcon, Code, Zap, TrendingUp, ShieldAlert, Wrench, FileText, Palette, Video, CheckCheck, Smartphone, Search, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navMenu = [
  {
    label: 'Services',
    href: '/#services',
    isHash: true,
    dropdown: [
      { label: 'Web Design & Dev', href: '/#services', isHash: true, desc: 'Custom high-performance websites', icon: <Code size={16} className="text-primary" /> },
      { label: 'Mobile App Development', href: '/services/mobile-app-development', isHash: false, desc: 'iOS, Android & Cross-Platform', icon: <Smartphone size={16} className="text-secondary" /> },
      { label: 'Landing Pages', href: '/#services', isHash: true, desc: 'Conversion-focused page builds', icon: <Zap size={16} className="text-accent" /> },
      { label: 'Brand Strategy', href: '/#services', isHash: true, desc: 'Authority & identity engineering', icon: <Palette size={16} className="text-purple-400" /> },
      { label: 'ROI Calculator', href: '/tools/roi-calculator', desc: 'Predict your revenue growth', icon: <TrendingUp size={16} className="text-success" /> },
      { label: 'Digital Brand Audit', href: '/tools/brand-audit', desc: 'Instant digital presence scan', icon: <ShieldAlert size={16} className="text-blue-400" /> },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    dropdown: [
      { group: 'Text & Writing', items: [
        { label: 'Word Counter', href: '/tools/word-counter', icon: <Type size={14} className="text-primary" /> },
        { label: 'Grammar Fixer', href: '/tools/grammar-fixer', icon: <CheckCheck size={14} className="text-success" /> },
        { label: 'Text Improver', href: '/tools/text-improver', icon: <Zap size={14} className="text-accent" /> },
        { label: 'Tone Changer', href: '/tools/tone-changer', icon: <Wrench size={14} className="text-secondary" /> },
      ]},
      { group: 'Image & PDF', items: [
        { label: 'Image Compressor', href: '/tools/image-compressor', icon: <ImageIcon size={14} className="text-blue-400" /> },
        { label: 'Image to PDF', href: '/tools/image-to-pdf', icon: <FileText size={14} className="text-rose-400" /> },
        { label: 'PDF to Image', href: '/tools/pdf-to-image', icon: <FileText size={14} className="text-orange-400" /> },
      ]},
      { group: 'AI Generators', items: [
        { label: 'YouTube Script', href: '/tools/youtube-script-generator', icon: <Video size={14} className="text-red-400" /> },
        { label: 'Instagram Reel', href: '/tools/instagram-reel-generator', icon: <Video size={14} className="text-pink-400" /> },
        { label: 'Midjourney Prompt', href: '/tools/midjourney-prompt-generator', icon: <Palette size={14} className="text-purple-400" /> },
      ]},
    ],
    seeAll: '/tools',
  },
  { label: 'AI Resume Builder', href: '/tools/resume-builder' },
  { label: 'Templates', href: '/templates' },
  {
    label: 'Company',
    href: '/about',
    dropdown: [
      { label: 'About Us', href: '/about', desc: 'Our story and mission', icon: <User size={16} className="text-primary" /> },
      { label: 'Blog', href: '/blog', desc: 'Insights & strategy guides', icon: <FileText size={16} className="text-blue-400" /> },
      { label: 'Portfolio', href: '/portfolio', isHash: false, desc: 'Our case studies & work', icon: <Palette size={16} className="text-secondary" /> },
      { label: 'Contact', href: '/contact', desc: 'Get in touch with us', icon: <Zap size={16} className="text-accent" /> },
    ],
  },
];

const FlatDropdown = ({ items, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-64 z-50"
  >
    <div className="bg-card/80 backdrop-blur-3xl rounded-2xl shadow-premium border border-border p-2 overflow-hidden">
      {items.map((item) => (
        item.isHash ? (
          <a
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <span className="mt-0.5 shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">{item.label}</p>
              {item.desc && <p className="text-xs text-secondary-text">{item.desc}</p>}
            </div>
          </a>
        ) : (
          <Link
            key={item.label}
            to={item.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <span className="mt-0.5 shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">{item.label}</p>
              {item.desc && <p className="text-xs text-secondary-text">{item.desc}</p>}
            </div>
          </Link>
        )
      ))}
    </div>
  </motion.div>
);

const MegaDropdown = ({ groups, seeAll, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[480px] z-50"
  >
    <div className="bg-card/80 backdrop-blur-3xl rounded-2xl shadow-premium border border-border p-4 overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-text mb-2 px-1">{group.group}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span>{item.icon}</span>
                  <span className="text-xs font-medium text-secondary-text group-hover:text-primary transition-colors">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <Link
          to={seeAll}
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
        >
          View All Tools →
        </Link>
      </div>
    </div>
  </motion.div>
);

const NavItem = ({ item, onCloseAll }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const isActive = location.pathname === item.href || (item.dropdown && item.dropdown.some(d => location.pathname === d.href));
  const hasDropdown = !!item.dropdown;
  const isMega = hasDropdown && item.dropdown[0]?.group;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const baseClass = `flex items-center gap-1 text-[13px] font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-full ${
      isActive
        ? 'text-primary bg-primary/10'
        : 'text-secondary-text hover:text-text hover:bg-white/5'
  }`;

  return (
    <div ref={ref} className="relative" onMouseEnter={() => hasDropdown && setOpen(true)} onMouseLeave={() => hasDropdown && setOpen(false)}>
      {hasDropdown ? (
        <button
          className={baseClass}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {item.label}
          <ChevronDown size={14} className={`transition-transform duration-200 opacity-50 ${open ? 'rotate-180' : ''}`} />
        </button>
      ) : item.isHash ? (
        <a href={item.href} className={baseClass} onClick={() => { setOpen(false); onCloseAll(); }}>{item.label}</a>
      ) : (
        <Link to={item.href} className={baseClass} onClick={() => { setOpen(false); onCloseAll(); }}>{item.label}</Link>
      )}
      <AnimatePresence>
        {open && hasDropdown && (
          isMega
            ? <MegaDropdown groups={item.dropdown} seeAll={item.seeAll} onClose={() => { setOpen(false); onCloseAll(); }} />
            : <FlatDropdown items={item.dropdown} onClose={() => { setOpen(false); onCloseAll(); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-4 sm:px-6 lg:px-8 ${isScrolled ? 'pt-4' : 'pt-6'} ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className={`max-w-[1200px] mx-auto rounded-full transition-all duration-500 ease-in-out ${isScrolled ? 'bg-secondary-background/70 backdrop-blur-xl border border-white/10 shadow-premium' : 'bg-transparent border border-transparent'}`}>
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-primary">
                <svg viewBox="0 0 80 80" fill="none" className="w-5 h-5 text-white">
                  <path d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48" stroke="currentColor" strokeWidth="6" />
                  <polygon points="30,28 30,52 52,40" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-text ml-3">ToolBite</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-1 bg-white/5 border border-border p-1 rounded-full backdrop-blur-md">
              {navMenu.map((item) => (
                <NavItem key={item.label} item={item} onCloseAll={() => {}} />
              ))}
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
              className="flex items-center justify-center w-8 h-8 rounded-full text-secondary-text hover:text-text hover:bg-white/10 transition-colors"
              title="Search (⌘K)"
            >
              <Search size={16} />
            </button>
            <Link
              to="/client-login"
              className="text-[13px] font-medium text-secondary-text hover:text-text px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/start-project"
              className="px-4 py-2 rounded-full bg-text text-background text-[13px] font-medium hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
              className="p-2 rounded-full text-secondary-text hover:text-text hover:bg-white/10 transition"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full text-secondary-text hover:text-text hover:bg-white/10 transition"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-[calc(100%+10px)] left-4 right-4 bg-card/95 backdrop-blur-3xl border border-border rounded-2xl shadow-premium overflow-hidden"
          >
            <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navMenu.map((item) => {
                const hasDropdown = !!item.dropdown;
                const isExpanded = mobileExpanded === item.label;
                return (
                  <div key={item.label}>
                    {hasDropdown ? (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform text-secondary-text ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link to={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-text hover:bg-white/5 transition-colors">{item.label}</Link>
                    )}
                    <AnimatePresence>
                      {isExpanded && hasDropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-4 mt-1 space-y-1"
                        >
                          {!item.dropdown[0]?.group && item.dropdown.map((sub) => (
                            <Link key={sub.label} to={sub.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:text-text hover:bg-white/5 transition-colors">
                              {sub.icon}<span>{sub.label}</span>
                            </Link>
                          ))}
                          {item.dropdown[0]?.group && item.dropdown.map((group) => (
                            <div key={group.group} className="mb-2">
                              <p className="text-[10px] font-bold uppercase text-secondary-text px-3 py-1.5">{group.group}</p>
                              {group.items.map((sub) => (
                                <Link key={sub.label} to={sub.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-text hover:text-text hover:bg-white/5 transition-colors">
                                  {sub.icon}<span>{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
                <Link to="/client-login" onClick={() => setMobileOpen(false)} className="w-full py-3 flex items-center justify-center gap-2 rounded-xl border border-border text-text font-medium text-sm hover:bg-white/5 transition-all">
                  <User size={16} /> Client Login
                </Link>
                <Link to="/start-project" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-all shadow-glow-primary">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
