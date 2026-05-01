with open(r'c:\toolbite\src\pages\tools\ResumeBuilder.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add html2pdf import after pdfjsLib import
old_import = "import * as pdfjsLib from 'pdfjs-dist';"
new_import = """import * as pdfjsLib from 'pdfjs-dist';
import html2pdf from 'html2pdf.js';"""
content = content.replace(old_import, new_import, 1)

# 2. Add Share, Upload icons to lucide imports
old_icons = "ChevronDown, ChevronUp, GripVertical, Wand2"
new_icons = "ChevronDown, ChevronUp, GripVertical, Wand2, Share2, BookOpen, Link2"
content = content.replace(old_icons, new_icons, 1)

# 3. Add fresher template dummy data before closing brace of dummyData
old_dummy_end = """  elegant: {
    personal: { fullName: 'Victoria Sterling', email: 'victoria@sterling.exec', phone: '+1 (555) 888-0000', website: 'VP of Strategy', linkedin: 'linkedin.com/in/vsterling', github: '', location: 'New York, NY', summary: 'C-Suite Executive driving global strategy and enterprise transformation. Proven expertise in scaling operations and achieving 10x ROI for Fortune 100 brands.' },
    experience: [{ company: 'Sterling Partners', role: 'VP of Strategy', period: '2018 - Present', description: 'Directed a global portfolio of $200M+, implementing an aggressive growth framework that outpaced market competitors by 30%.' }],
    education: [{ school: 'Harvard Business School', degree: 'MBA in Global Strategy', year: '2015' }],
    skills: [{ category: 'Leadership', list: 'Corporate Strategy, M&A, Growth Marketing, Executive Management' }],
    projects: [{ name: 'Project Apex', link: '', description: 'Led the acquisition and integration of a major competitor, expanding market share by 45%.' }],
    languages: [{ name: 'English', level: 'Native' }, { name: 'French', level: 'Fluent' }],
    awards: [{ title: 'Top 40 Under 40', year: '2022', issuer: 'Global Business Review' }]
  }
};"""

new_dummy_end = """  elegant: {
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
};"""

content = content.replace(old_dummy_end, new_dummy_end, 1)

# 4. Add certifications to initial formData
old_formdata_init = """  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('resumeFormData');
    return saved ? JSON.parse(saved) : {"""
# Find and add certifications field to the useState initializer
old_awards_init = "    awards: [],"
new_awards_init = "    awards: [],\n      certifications: [],"
content = content.replace(old_awards_init, new_awards_init, 1)

# 5. Add sectionOrder to include certifications
old_section_order = "const [sectionOrder, setSectionOrder] = useState(['experience', 'projects', 'education', 'skills', 'languages', 'awards']);"
new_section_order = "const [sectionOrder, setSectionOrder] = useState(['experience', 'projects', 'education', 'skills', 'languages', 'awards', 'certifications']);"
content = content.replace(old_section_order, new_section_order, 1)

# 6. Replace handleAIImprove with Gemini-powered version + add PDF export, save/load, share functions
old_ai_improve = """  const handleAIImprove = (section, field, currentValue, index = null) => {
    if (!currentValue) return toast.error('Please enter some text first');
    const toastId = toast.loading('AI is optimizing your text...');
    setTimeout(() => {
      const improvedText = currentValue + ' [Enhanced for ATS optimization]';
      if (section === 'personal') {
        updatePersonal(field, improvedText);
      } else {
        updateItem(section, index, field, improvedText);
      }
      toast.success('Optimization complete', { id: toastId });
    }, 1500);
  };"""

new_ai_improve = """  const handleAIImprove = async (section, field, currentValue, index = null) => {
    if (!currentValue) return toast.error('Please enter some text first');
    const toastId = toast.loading('Gemini AI is optimizing your text...');
    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
      const prompt = field === 'summary'
        ? `Rewrite this professional resume summary to be ATS-optimized, impactful, and under 75 words. Return ONLY the rewritten summary, no extra text:\\n\\n${currentValue}`
        : `Rewrite this resume bullet point to start with a strong action verb and include measurable impact. Return ONLY the improved text, no extra text:\\n\\n${currentValue}`;
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
  };"""

content = content.replace(old_ai_improve, new_ai_improve, 1)

# 7. Replace window.print() with handleExportPDF in Export PDF button
content = content.replace('onClick={() => window.print()} className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-teal-600 transition-all flex items-center gap-2 text-sm"', 
                          'onClick={handleExportPDF} className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-teal-600 transition-all flex items-center gap-2 text-sm"', 1)

# 8. Add Save, Load, Share buttons after Export PDF button
old_export_btn = """onClick={handleExportPDF} className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-teal-600 transition-all flex items-center gap-2 text-sm">
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>"""

new_export_btn = """onClick={handleExportPDF} className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-teal-600 transition-all flex items-center gap-2 text-sm">
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
        </div>"""

content = content.replace(old_export_btn, new_export_btn, 1)

with open(r'c:\toolbite\src\pages\tools\ResumeBuilder.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Phase 1 patch done")
print("Checking for certifications section in sectionOrder:", "certifications" in content)
print("Checking for html2pdf import:", "html2pdf" in content)
print("Checking for handleExportPDF:", "handleExportPDF" in content)
print("Checking for handleSaveJSON:", "handleSaveJSON" in content)
print("Checking for handleShareLink:", "handleShareLink" in content)
print("Checking for fresher in dummyData:", "'fresher'" in content or '"fresher"' in content)
