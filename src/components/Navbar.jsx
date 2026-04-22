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
      { label: 'Web Design & Dev', href: '/#services', isHash: true, desc: 'Custom high-performance websites', icon: <Code size={16} className="text-teal-500" /> },
      { label: 'Mobile App Development', href: '/#services', isHash: true, desc: 'iOS, Android & Cross-Platform', icon: <Smartphone size={16} className="text-indigo-500" /> },
      { label: 'Landing Pages', href: '/#services', isHash: true, desc: 'Conversion-focused page builds', icon: <Zap size={16} className="text-amber-500" /> },
      { label: 'Brand Strategy', href: '/#services', isHash: true, desc: 'Authority & identity engineering', icon: <Palette size={16} className="text-rose-500" /> },
      { label: 'ROI Calculator', href: '/tools/roi-calculator', desc: 'Predict your revenue growth', icon: <TrendingUp size={16} className="text-emerald-500" /> },
      { label: 'Digital Brand Audit', href: '/tools/brand-audit', desc: 'Instant digital presence scan', icon: <ShieldAlert size={16} className="text-blue-500" /> },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    dropdown: [
      { group: 'Text & Writing', items: [
        { label: 'Word Counter', href: '/tools/word-counter', icon: <Type size={14} className="text-teal-500" /> },
        { label: 'Grammar Fixer', href: '/tools/grammar-fixer', icon: <CheckCheck size={14} className="text-emerald-500" /> },
        { label: 'Text Improver', href: '/tools/text-improver', icon: <Zap size={14} className="text-amber-500" /> },
        { label: 'Tone Changer', href: '/tools/tone-changer', icon: <Wrench size={14} className="text-purple-500" /> },
      ]},
      { group: 'Image & PDF', items: [
        { label: 'Image Compressor', href: '/tools/image-compressor', icon: <ImageIcon size={14} className="text-blue-500" /> },
        { label: 'Image to PDF', href: '/tools/image-to-pdf', icon: <FileText size={14} className="text-rose-500" /> },
        { label: 'PDF to Image', href: '/tools/pdf-to-image', icon: <FileText size={14} className="text-orange-500" /> },
      ]},
      { group: 'AI Generators', items: [
        { label: 'YouTube Script', href: '/tools/youtube-script-generator', icon: <Video size={14} className="text-red-500" /> },
        { label: 'Instagram Reel', href: '/tools/instagram-reel-generator', icon: <Video size={14} className="text-pink-500" /> },
        { label: 'Midjourney Prompt', href: '/tools/midjourney-prompt-generator', icon: <Palette size={14} className="text-violet-500" /> },
      ]},
    ],
    seeAll: '/tools',
  },
  {
    label: 'Templates',
    href: '/templates',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Company',
    href: '/about',
    dropdown: [
      { label: 'About Us', href: '/about', desc: 'Our story and mission', icon: <User size={16} className="text-teal-500" /> },
      { label: 'Blog', href: '/blog', desc: 'Insights & strategy guides', icon: <FileText size={16} className="text-blue-500" /> },
      { label: 'Portfolio', href: '/portfolio', isHash: false, desc: 'Our case studies & work', icon: <Palette size={16} className="text-purple-500" /> },
      { label: 'Contact', href: '/contact', desc: 'Get in touch with us', icon: <Zap size={16} className="text-emerald-500" /> },
    ],
  },
];

// Simple flat dropdown
const FlatDropdown = ({ items, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-64 z-50"
  >
    <div className="glass-card rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900/90 p-2 overflow-hidden">
      {items.map((item) => (
        item.isHash ? (
          <a
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors group"
          >
            <span className="mt-0.5 shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400">{item.label}</p>
              {item.desc && <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>}
            </div>
          </a>
        ) : (
          <Link
            key={item.label}
            to={item.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors group"
          >
            <span className="mt-0.5 shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400">{item.label}</p>
              {item.desc && <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>}
            </div>
          </Link>
        )
      ))}
    </div>
  </motion.div>
);

// Mega dropdown for Tools (grouped)
const MegaDropdown = ({ groups, seeAll, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[480px] z-50"
  >
    <div className="glass-card rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900/90 p-4 overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 px-1">{group.group}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors group"
                >
                  <span>{item.icon}</span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Link
          to={seeAll}
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-xs font-bold hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
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

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const hasDropdown = !!item.dropdown;
  const isMega = hasDropdown && item.dropdown[0]?.group;

  const baseClass = `flex items-center gap-1 text-sm font-semibold transition-colors whitespace-nowrap ${
    isActive
      ? 'text-teal-600 dark:text-teal-400'
      : 'text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400'
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
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
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
      
      // Glass effect when scrolled
      setIsScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
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

  // Reset mobile menu state when route changes (render phase instead of useEffect to avoid cascading renders)
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'py-0' : 'py-2'} ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'glass-card shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-2xl' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                >
                  <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48" stroke="#0f172a" strokeWidth="4.5" />
                  <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }} d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48" stroke="#0f172a" strokeWidth="4" />
                  <motion.polygon initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1, type: 'spring', stiffness: 200 }} points="30,28 30,52 52,40" fill="#0f172a" />
                </motion.svg>
                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white ml-2">Tool<span className="text-teal-500">Bite</span></span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navMenu.map((item) => (
                <NavItem key={item.label} item={item} onCloseAll={() => {}} />
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all border border-transparent hover:border-teal-100 group"
                title="Search Tools & Services (⌘K)"
              >
                <Search size={20} />
                <div className="hidden xl:flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Command size={10} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400">K</span>
                </div>
              </button>
              <Link
                to="/client-login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
              >
                <User size={15} />
                Login
              </Link>
              <Link
                to="/start-project"
                className="px-5 py-2 rounded-full bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 text-sm font-bold hover:bg-teal-600 dark:hover:bg-teal-400 transition-all shadow-md hover:shadow-teal-500/25"
              >
                Start Project
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
                className="p-2 rounded-full text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-full text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={24} /></motion.div>
                    : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={24} strokeWidth={2.5} /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-slate-200/50 dark:border-slate-700/50 glass-card dark:bg-slate-900/95 backdrop-blur-2xl"
          >
            <div className="max-w-[1400px] mx-auto px-4 py-4 space-y-1">
              {navMenu.map((item) => {
                const hasDropdown = !!item.dropdown;
                const isExpanded = mobileExpanded === item.label;

                return (
                  <div key={item.label}>
                    {hasDropdown ? (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    ) : item.isHash ? (
                      <a href={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">{item.label}</a>
                    ) : (
                      <Link to={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">{item.label}</Link>
                    )}

                    <AnimatePresence>
                      {isExpanded && hasDropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-4 mt-1 space-y-0.5"
                        >
                          {/* Flat items */}
                          {!item.dropdown[0]?.group && item.dropdown.map((sub) => (
                            sub.isHash ? (
                              <a key={sub.label} href={sub.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors">
                                {sub.icon}<span>{sub.label}</span>
                              </a>
                            ) : (
                              <Link key={sub.label} to={sub.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors">
                                {sub.icon}<span>{sub.label}</span>
                              </Link>
                            )
                          ))}
                          {/* Grouped (Tools) */}
                          {item.dropdown[0]?.group && item.dropdown.map((group) => (
                            <div key={group.group}>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 pt-2 pb-1">{group.group}</p>
                              {group.items.map((sub) => (
                                <Link key={sub.label} to={sub.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-colors">
                                  {sub.icon}<span>{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          ))}
                          {item.seeAll && (
                            <Link to={item.seeAll} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline">
                              View All Tools →
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-2">
                <Link to="/client-login" onClick={() => setMobileOpen(false)} className="w-full py-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <User size={16} /> Client Login
                </Link>
                <Link to="/start-project" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center rounded-xl bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 font-bold text-sm hover:bg-teal-600 dark:hover:bg-teal-400 transition-all shadow-md">
                  Start Project
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
