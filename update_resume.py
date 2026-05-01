import re

with open(r"c:\toolbite\src\pages\tools\ResumeBuilder.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update State
state_replacement = """  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [visualLayout, setVisualLayout] = useState('architect');
  const [viewMode, setViewMode] = useState('split');"""
content = re.sub(r"  const \[selectedTemplate, setSelectedTemplate\] = useState\('modern'\);\n  const \[viewMode, setViewMode\] = useState\('split'\);", state_replacement, content)

# 2. Update loadTemplate
loadTemplate_replacement = """  const loadTemplate = (type) => {
    setSelectedTemplate(type);
    setFormData(dummyData[type]);
    if (type === 'corporate' || type === 'minimalist') setVisualLayout('executive');
    else if (type === 'creative') setVisualLayout('visionary');
    else setVisualLayout('architect');
    setCurrentStep('editor');
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} archetype loaded!`);
  };"""
content = re.sub(r"  const loadTemplate = \(type\) => \{.*?\};", loadTemplate_replacement, content, flags=re.DOTALL)

# 3. Add Template Render Functions before renderEditorStep
templates_str = """
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
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm">
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
           {sectionOrder.filter(s => ['skills', 'languages', 'awards'].includes(s)).map((sec) => {
             if (formData[sec]?.length === 0) return null;
             return (
               <div key={sec}>
                 <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 pb-2 border-b border-white/20 text-white">{sec}</h3>
                 <div className="space-y-4 text-xs text-white/90">
                   {formData[sec].map((item, i) => (
                     <div key={i}>
                       <p className="font-black text-white mb-1 uppercase tracking-tight">{item.category || item.name || item.title}</p>
                       <p className="font-medium">{item.list || item.level || item.issuer}</p>
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
                     <div key={i} className="relative pl-6 border-l-2 border-slate-200">
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

  const renderEditorStep = () => {"""

content = re.sub(r"  const renderEditorStep = \(\) => \{", templates_str, content)

# 4. Replace preview rendering logic with the 3 templates & new template switcher

preview_area_old = r"          \{\/\* Preview Area \*\/\}.*?<\/div>\n          \)\}\n        <\/div>\n      <\/motion\.div>\n    \);\n  \};"

preview_area_new = """          {/* Preview Area */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className="bg-black overflow-y-auto no-scrollbar relative flex justify-center py-16 px-8">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none"></div>
               
               {/* Floating Theme Control */}
               <div className="absolute top-8 right-8 flex flex-col gap-4 z-20">
                  <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-4 shadow-2xl w-48">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Visual Format</span>
                     <div className="flex flex-col gap-2">
                       {['architect', 'executive', 'visionary'].map(l => (
                         <button key={l} onClick={() => setVisualLayout(l)} className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${visualLayout === l ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                           {l.charAt(0).toUpperCase() + l.slice(1)}
                         </button>
                       ))}
                     </div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2 mt-2">Accent Color</span>
                     <div className="flex gap-2 flex-wrap">
                       {['#14b8a6', '#6366f1', '#0f172a', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'].map(c => (
                          <button key={c} onClick={() => setThemeColor(c)} className={`w-6 h-6 rounded-full border-2 ${themeColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`} style={{ backgroundColor: c }}></button>
                       ))}
                     </div>
                  </div>
               </div>

               {visualLayout === 'architect' && renderArchitectTemplate()}
               {visualLayout === 'executive' && renderExecutiveTemplate()}
               {visualLayout === 'visionary' && renderVisionaryTemplate()}
            </div>
          )}
        </div>
      </motion.div>
    );
  };"""

content = re.sub(preview_area_old, preview_area_new, content, flags=re.DOTALL)


# 5. Fix Editor Panel to Dark Mode
# First extract Editor area block to ensure we don't break main page layout.
# We will just do a string replace on specific known lines inside renderEditorStep
content = content.replace('bg-slate-50">', 'bg-[#0A0A0A]">')
content = content.replace('bg-white/80', 'bg-[#0A0A0A]/80')
content = content.replace('border-slate-200', 'border-white/10')
content = content.replace('bg-slate-100', 'bg-white/5')
content = content.replace('bg-white text-teal-600', 'bg-white/10 text-teal-400')
content = content.replace('text-slate-500 hover:text-slate-800', 'text-slate-400 hover:text-white')
content = content.replace('bg-white border-r border-slate-200', 'bg-[#0A0A0A] border-r border-white/10')
content = content.replace('border-b-2 border-transparent text-slate-500 hover:text-slate-900', 'border-b-2 border-transparent text-slate-500 hover:text-white')
content = content.replace('bg-teal-50/50 text-teal-600', 'bg-teal-500/10 text-teal-400')
content = content.replace('bg-slate-50 border border-slate-100', 'bg-white/5 border border-white/10 text-white placeholder-white/30')
content = content.replace('text-slate-900 mb-2', 'text-white mb-2')
content = content.replace('text-slate-400 mb-6', 'text-slate-500 mb-6')
content = content.replace('bg-white text-slate-900 font-black rounded-xl border border-slate-200 hover:border-teal-500 hover:text-teal-600', 'bg-white/10 text-white font-black rounded-xl border border-white/10 hover:border-teal-500 hover:text-teal-400')

with open(r"c:\toolbite\src\pages\tools\ResumeBuilder.jsx", "w", encoding="utf-8") as f:
    f.write(content)
