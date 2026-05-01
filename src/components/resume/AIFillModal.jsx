import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, X, Wand2, RefreshCw, CheckCircle2,
  Zap, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(prompt) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
    })
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Strip markdown code fences if present
  return text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
}

async function generateFromJD({ jobTitle, jobDescription, userData }) {
  const name = userData?.personal?.fullName || 'the candidate';
  const currentSummary = userData?.personal?.summary || '';
  const currentSkills = (userData?.skills || []).map(s => s.list || s.name || '').join(', ');
  const currentExp = (userData?.experience || []).map(e => `${e.role} at ${e.company}: ${e.description}`).join('\n');
  const currentProjects = (userData?.projects || []).map(p => `${p.name}: ${p.description}`).join('\n');

  const prompt = `You are an expert ATS resume writer. Given the job description below and the candidate's existing resume data, generate enhanced resume content.

JOB TITLE: ${jobTitle || 'Not specified'}
JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S CURRENT DATA:
Name: ${name}
Current Summary: ${currentSummary}
Current Skills: ${currentSkills}
Current Experience: ${currentExp}
Current Projects: ${currentProjects}

Generate a JSON response with EXACTLY this structure (no markdown, just valid JSON):
{
  "summary": "A powerful 2-3 sentence professional summary optimized for this role (40-75 words)",
  "skills": [{"category": "Core Skills", "list": "skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8"}],
  "experience": [array of enhanced experience objects with fields: role, company, period, description - only enhance existing entries, do not fabricate],
  "projects": [array of enhanced project objects with fields: name, link, description - only enhance existing, do not fabricate],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8", "keyword9", "keyword10"],
  "achievements": ["achievement1 with metrics", "achievement2 with metrics"]
}

Rules:
- Do NOT invent fake experience or projects
- Use strong ATS action verbs (Built, Led, Developed, Optimized, etc.)
- Include relevant keywords from the job description naturally
- Keep experience descriptions under 2 sentences each
- Make summary specific to the job title`;

  const raw = await callGemini(prompt);
  return JSON.parse(raw);
}

export default function AIFillModal({ formData, onApply, onClose }) {
  const [step, setStep] = useState('input');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      toast.error('Please paste a job description (at least 50 characters)');
      return;
    }
    setError('');
    setStep('generating');
    setGenerationProgress(0);

    const stages = [
      [20, 'Analyzing job description...'],
      [40, 'Extracting ATS keywords...'],
      [60, 'Crafting professional summary...'],
      [80, 'Optimizing experience bullets...'],
      [95, 'Finalizing your resume...'],
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageIdx < stages.length) {
        setGenerationProgress(stages[stageIdx][0]);
        setProgressLabel(stages[stageIdx][1]);
        stageIdx++;
      }
    }, 700);

    try {
      const result = await generateFromJD({ jobTitle, jobDescription, userData: formData });
      clearInterval(interval);
      setGenerated(result);
      setGenerationProgress(100);
      setProgressLabel('Done!');
      setStep('preview');
    } catch (err) {
      clearInterval(interval);
      console.error('Gemini error:', err);
      setError('AI generation failed. Please try again.');
      setStep('input');
    }
  };

  const handleApply = () => {
    if (!generated) return;
    onApply(generated);
    toast.success('AI-generated content applied to your resume!');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-slate-900 border border-white/5 rounded-[2rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] rounded-full pointer-events-none" />
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.2)] border border-white/10">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">AI Resume Strategist</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Powered by Gemini 2.0 Flash</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">

            {/* Input Step */}
            {step === 'input' && (
              <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8 space-y-6">
                {error && (
                  <div className="flex items-center gap-3 px-5 py-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-medium">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Title (Optional)</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Description *</label>
                    <span className="text-[10px] text-slate-600">{jobDescription.length} chars</span>
                  </div>
                  <textarea
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here — requirements, responsibilities, qualifications..."
                    rows={12}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 resize-none text-sm leading-relaxed"
                  />
                </div>
                <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl flex items-start gap-3">
                  <Zap size={16} className="text-sky-400 mt-0.5 shrink-0" />
                  <p className="text-sky-400 text-xs leading-relaxed">Gemini AI will enhance your existing resume content using keywords from this JD. Your actual experience won't be fabricated.</p>
                </div>
              </motion.div>
            )}

            {/* Generating Step */}
            {step === 'generating' && (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles size={28} className="text-sky-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{progressLabel || 'Starting...'}</h3>
                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-slate-500 text-sm">{generationProgress}% complete</p>
              </motion.div>
            )}

            {/* Preview Step */}
            {step === 'preview' && generated && (
              <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-6">
                {/* Keywords */}
                {generated.keywords?.length > 0 && (
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">🎯 ATS Keywords Extracted ({generated.keywords.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {generated.keywords.map(k => (
                        <span key={k} className="px-2.5 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg text-xs font-bold">{k}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Summary Before/After */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">✍️ Professional Summary</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                      <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2">BEFORE</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{formData?.personal?.summary || '(No summary yet)'}</p>
                    </div>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                      <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">✨ AI OPTIMIZED</p>
                      <p className="text-slate-200 text-xs leading-relaxed">{generated.summary}</p>
                    </div>
                  </div>
                </div>
                {/* Skills */}
                {generated.skills?.[0]?.list && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">🛠 Optimized Skills</p>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-slate-300 text-sm">{generated.skills[0].list}</p>
                    </div>
                  </div>
                )}
                {/* Experience */}
                {generated.experience?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">💼 Enhanced Experience</p>
                    <div className="space-y-3">
                      {generated.experience.map((exp, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <p className="text-xs font-black text-slate-300 mb-1">{exp.role} @ {exp.company}</p>
                          <p className="text-slate-400 text-xs leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between shrink-0">
          {step === 'input' && (
            <>
              <button onClick={onClose} className="px-6 py-3 text-slate-400 hover:text-white font-bold transition-colors">Cancel</button>
              <button
                onClick={handleGenerate}
                disabled={!jobDescription.trim()}
                className="px-8 py-3 bg-gradient-to-r from-sky-500 to-violet-600 text-white font-black rounded-xl shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100 flex items-center gap-2"
              >
                <Sparkles size={16} />
                Generate with Gemini AI
              </button>
            </>
          )}
          {step === 'preview' && (
            <>
              <button onClick={() => { setGenerated(null); setStep('input'); }} className="px-6 py-3 text-slate-400 hover:text-white font-bold transition-colors flex items-center gap-2">
                <RefreshCw size={16} /> Regenerate
              </button>
              <button
                onClick={handleApply}
                className="px-8 py-3 bg-emerald-500 text-white font-black rounded-xl shadow-xl hover:bg-emerald-400 hover:scale-105 transition-all flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                Apply to Resume
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
