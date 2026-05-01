import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp,
  Target, Zap, FileText, BarChart3, TrendingUp, X, Sparkles
} from 'lucide-react';

// ─── ATS Scoring Engine ───────────────────────────────────────────────────────
const ACTION_VERBS = [
  'achieved','improved','managed','led','developed','created','designed','built',
  'launched','delivered','optimized','increased','reduced','implemented','executed',
  'spearheaded','coordinated','directed','established','generated','streamlined',
  'oversaw','trained','mentored','negotiated','analyzed','researched','authored',
  'deployed','automated','architected','scaled','migrated','refactored','shipped',
];

function extractKeywords(text) {
  if (!text) return [];
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for',
    'of','with','by','from','is','are','was','were','be','been','have','has','had',
    'do','does','did','will','would','could','should','may','might','must','shall',
    'this','that','these','those','i','you','we','they','it','our','your','their','its',
    'as','if','so','not','no','yes','all','any','each','few','more','most','other','some',
    'such','than','then','into','through','during','before','after','above','below',
    'between','out','off','over','under','again','further','also','just','well','much',
  ]);
  return [...new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s+#]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  )];
}

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function startsWithActionVerb(text) {
  if (!text) return false;
  const firstWord = text.trim().toLowerCase().split(/\s+/)[0];
  return ACTION_VERBS.includes(firstWord);
}

export function calculateATSScore(formData, jobDescription = '') {
  const scores = {};
  const suggestions = [];
  const p = formData?.personal || {};

  // 1. Contact Information (10 pts)
  let contactScore = 0;
  if (p.email) contactScore += 4;
  else suggestions.push({ type: 'error', text: 'Add your email address' });
  if (p.phone) contactScore += 3;
  else suggestions.push({ type: 'error', text: 'Add your phone number' });
  if (p.location) contactScore += 3;
  else suggestions.push({ type: 'warning', text: 'Add your location (City, Country)' });
  scores.contact = { score: contactScore, max: 10, label: 'Contact Info' };

  // 2. Summary Quality (15 pts)
  const summaryWords = countWords(p.summary);
  let summaryScore = 0;
  if (summaryWords >= 40 && summaryWords <= 80) {
    summaryScore = 15;
  } else if (summaryWords > 0 && summaryWords < 40) {
    summaryScore = 7;
    suggestions.push({ type: 'warning', text: `Summary too short (${summaryWords} words). Aim for 40–80 words.` });
  } else if (summaryWords > 80) {
    summaryScore = 10;
    suggestions.push({ type: 'warning', text: `Summary too long (${summaryWords} words). Keep it under 80.` });
  } else {
    suggestions.push({ type: 'error', text: 'Add a professional summary (40–80 words)' });
  }
  scores.summary = { score: summaryScore, max: 15, label: 'Summary Quality' };

  // 3. Skills Count (10 pts)
  const skillsText = (formData?.skills || []).map(s => s.list || s.name || '').join(', ');
  const skillCount = skillsText.split(',').filter(s => s.trim().length > 0).length;
  let skillsScore = 0;
  if (skillCount >= 8) skillsScore = 10;
  else if (skillCount >= 6) skillsScore = 8;
  else if (skillCount >= 4) skillsScore = 5;
  else if (skillCount >= 1) skillsScore = 3;
  if (skillCount < 6) suggestions.push({ type: 'warning', text: `Add more skills (${skillCount} listed). Aim for 6+ relevant skills.` });
  scores.skills = { score: skillsScore, max: 10, label: 'Skills Count' };

  // 4. Experience Quality (15 pts)
  const experiences = formData?.experience || [];
  let expScore = 0;
  if (experiences.length > 0) {
    expScore += 5;
    let verbCount = 0;
    experiences.forEach(exp => {
      if (exp.description && startsWithActionVerb(exp.description)) verbCount++;
    });
    if (verbCount >= experiences.length * 0.7) expScore += 10;
    else {
      expScore += Math.round((verbCount / Math.max(experiences.length, 1)) * 10);
      suggestions.push({ type: 'tip', text: 'Start experience bullets with action verbs (Built, Led, Improved, Managed)' });
    }
  } else {
    suggestions.push({ type: 'error', text: 'Add at least one work experience entry' });
  }
  scores.experience = { score: expScore, max: 15, label: 'Experience Quality' };

  // 5. Action Verbs (10 pts)
  const allText = [
    p.summary || '',
    ...(formData?.experience || []).map(e => e.description || ''),
    ...(formData?.projects || []).map(pr => pr.description || ''),
  ].join(' ').toLowerCase();
  const verbsFound = ACTION_VERBS.filter(v => allText.includes(v));
  let verbScore = 0;
  if (verbsFound.length >= 5) verbScore = 10;
  else if (verbsFound.length >= 3) verbScore = 7;
  else if (verbsFound.length >= 1) verbScore = 4;
  else suggestions.push({ type: 'tip', text: `Use strong action verbs like: Built, Improved, Led, Shipped, Optimized` });
  scores.actionVerbs = { score: verbScore, max: 10, label: 'Action Verbs' };

  // 6. Keyword Match (20 pts)
  let keywordScore = 0;
  let matchedKeywords = [];
  let missingKeywords = [];
  let keywordMatchPct = 0;
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdKeywords = extractKeywords(jobDescription);
    const resumeText = [
      p.summary || '', skillsText,
      ...(formData?.experience || []).map(e => `${e.role} ${e.description}`),
      ...(formData?.projects || []).map(pr => pr.description),
    ].join(' ').toLowerCase();
    const topJDKeywords = jdKeywords.slice(0, 25);
    matchedKeywords = topJDKeywords.filter(k => resumeText.includes(k));
    missingKeywords = topJDKeywords.filter(k => !resumeText.includes(k)).slice(0, 10);
    keywordMatchPct = Math.round((matchedKeywords.length / Math.max(topJDKeywords.length, 1)) * 100);
    keywordScore = Math.round((keywordMatchPct / 100) * 20);
    if (missingKeywords.length > 0) {
      suggestions.push({ type: 'tip', text: `Add missing keywords: ${missingKeywords.slice(0, 5).join(', ')}` });
    }
  } else {
    keywordScore = 10; // neutral when no JD provided
    suggestions.push({ type: 'info', text: 'Paste a job description to see keyword match analysis' });
  }
  scores.keywords = { score: keywordScore, max: 20, label: 'Keyword Match' };

  // 7. Formatting / Structure (5 pts)
  let formatScore = 0;
  const hasEducation = (formData?.education || []).length > 0;
  const hasExperience = (formData?.experience || []).length > 0;
  if (hasEducation && hasExperience) formatScore = 5;
  else if (hasEducation || hasExperience) formatScore = 3;
  scores.formatting = { score: formatScore, max: 5, label: 'Structure' };

  // 8. Education (5 pts)
  let eduScore = hasEducation ? 5 : 0;
  if (!hasEducation) suggestions.push({ type: 'warning', text: 'Add your education history' });
  scores.education = { score: eduScore, max: 5, label: 'Education' };

  // 9. Projects (5 pts)
  const hasProjects = (formData?.projects || []).length > 0;
  let projectScore = hasProjects ? 5 : 2;
  if (!hasProjects) suggestions.push({ type: 'info', text: 'Add projects to strengthen your profile' });
  scores.projects = { score: projectScore, max: 5, label: 'Projects' };

  // 10. Readability (5 pts)
  let readScore = 3;
  if (p.fullName) readScore += 1;
  if (p.website || p.linkedin) readScore += 1;
  scores.readability = { score: Math.min(readScore, 5), max: 5, label: 'Readability' };

  const total = Object.values(scores).reduce((sum, s) => sum + s.score, 0);
  const level = total >= 86 ? 'Excellent' : total >= 71 ? 'Good' : total >= 41 ? 'Average' : 'Poor';
  const levelColor = total >= 86 ? '#10b981' : total >= 71 ? '#3b82f6' : total >= 41 ? '#f59e0b' : '#ef4444';

  return { total, level, levelColor, scores, suggestions, matchedKeywords, missingKeywords, keywordMatchPct };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ATSScorePanel({ formData, onClose }) {
  const [jobDescription, setJobDescription] = useState('');
  const [showJDInput, setShowJDInput] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const result = useMemo(() => calculateATSScore(formData, jobDescription), [formData, jobDescription]);

  const circleR = 54;
  const circleC = 2 * Math.PI * circleR;
  const dashOffset = circleC - (result.total / 100) * circleC;

  const categoryIcons = {
    contact: '📬', summary: '✍️', skills: '🛠', experience: '💼',
    actionVerbs: '⚡', keywords: '🎯', formatting: '📐',
    education: '🎓', projects: '📁', readability: '📖',
  };

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-[400px] bg-slate-950/90 backdrop-blur-xl border-l border-white/5 z-[90] flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Target size={18} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="font-black text-white text-base tracking-tight">ATS Core</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Intelligence Engine</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">

        {/* Score Ring */}
        <div className="flex flex-col items-center py-8 bg-white/5 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r={circleR} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
              <motion.circle
                cx="64" cy="64" r={circleR}
                fill="none"
                stroke={result.levelColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circleC}
                initial={{ strokeDashoffset: circleC }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ filter: `drop-shadow(0 0 8px ${result.levelColor})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-black text-white"
              >
                {result.total}
              </motion.span>
              <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
          </div>
          <span
            className="text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ backgroundColor: `${result.levelColor}20`, color: result.levelColor }}
          >
            {result.level}
          </span>
          <div className="grid grid-cols-4 gap-2 mt-4 w-full px-4">
            {[{ label: 'Poor', color: '#ef4444', min: 0 }, { label: 'Avg', color: '#f59e0b', min: 41 }, { label: 'Good', color: '#3b82f6', min: 71 }, { label: 'Excellent', color: '#10b981', min: 86 }].map(l => (
              <div key={l.label} className="text-center">
                <div className="h-1 rounded-full mb-1" style={{ backgroundColor: result.total >= l.min ? l.color : 'rgba(255,255,255,0.08)' }} />
                <span className="text-[9px] font-bold" style={{ color: result.total >= l.min ? l.color : 'rgba(255,255,255,0.3)' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Keyword Match — JD Input */}
        <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setShowJDInput(!showJDInput)}
            className="w-full px-5 py-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <Target size={16} className="text-teal-400" />
              <span className="font-bold text-white text-sm">Job Description Match</span>
            </div>
            {jobDescription ? (
              <span className="text-xs font-black text-teal-400">{result.keywordMatchPct}% match</span>
            ) : (
              <span className="text-xs text-slate-500">Paste JD to analyze</span>
            )}
          </button>

          <AnimatePresence>
            {showJDInput && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-5 pb-5 space-y-3 border-t border-white/10 pt-4">
                  <textarea
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here to analyze keyword match..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 resize-none"
                  />
                  {jobDescription && (
                    <div className="space-y-3">
                      {/* Match % bar */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-400">Keyword Match</span>
                          <span style={{ color: result.levelColor }}>{result.keywordMatchPct}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.keywordMatchPct}%` }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: result.levelColor }}
                          />
                        </div>
                      </div>

                      {/* Matched Keywords */}
                      {result.matchedKeywords.length > 0 && (
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">✅ Matched Keywords</p>
                          <div className="flex flex-wrap gap-1.5">
                            {result.matchedKeywords.slice(0, 12).map(k => (
                              <span key={k} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] font-bold">{k}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Missing Keywords */}
                      {result.missingKeywords.length > 0 && (
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">❌ Missing Keywords</p>
                          <div className="flex flex-wrap gap-1.5">
                            {result.missingKeywords.map(k => (
                              <span key={k} className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md text-[10px] font-bold">{k}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Score Breakdown</p>
          {Object.entries(result.scores).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
              className="w-full bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 transition-colors text-left"
            >
              <span className="text-lg w-7 shrink-0">{categoryIcons[key]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white truncate">{data.label}</span>
                  <span className="text-xs font-black text-slate-400 ml-2 shrink-0">{data.score}/{data.max}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.score / data.max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: data.score / data.max >= 0.85 ? '#10b981' : data.score / data.max >= 0.6 ? '#3b82f6' : '#f59e0b'
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Suggestions */}
        {result.suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">💡 Improvements</p>
            {result.suggestions.map((s, i) => {
              const colors = {
                error: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', icon: <XCircle size={13} /> },
                warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: <AlertCircle size={13} /> },
                tip: { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400', icon: <Zap size={13} /> },
                info: { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-400', icon: <FileText size={13} /> },
              };
              const c = colors[s.type] || colors.info;
              return (
                <div key={i} className={`flex items-start gap-3 px-4 py-3 ${c.bg} border ${c.border} rounded-2xl`}>
                  <span className={`${c.text} mt-0.5 shrink-0`}>{c.icon}</span>
                  <span className={`text-xs font-medium ${c.text}`}>{s.text}</span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </motion.div>
  );
}
