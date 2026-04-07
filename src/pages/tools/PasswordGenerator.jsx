import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy, RefreshCw, Check, Clock, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';
import useToolHistory from '../../hooks/useToolHistory';

const PasswordGenerator = () => {
  // Initialize password on mount without triggering an effect-based state update
  const [password, setPassword] = useState(() => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };
    let allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let generated = '';
    for (let i = 0; i < 16; i++) {
      generated += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    return generated;
  });

  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', percentage: 25 };
    if (score <= 4) return { label: 'Medium', color: 'bg-amber-500', percentage: 50 };
    if (score < 6) return { label: 'Strong', color: 'bg-teal-500', percentage: 75 };
    return { label: 'Unbreakable', color: 'bg-emerald-500', percentage: 100 };
  };

  const [strength, setStrength] = useState(() => calculateStrength(password));
  const { history, addToHistory, clearHistory } = useToolHistory('password-generator', 5);

  const generatePassword = () => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let allowedChars = '';
    Object.keys(options).forEach(key => {
      if (options[key]) allowedChars += charSets[key];
    });

    if (!allowedChars) {
      toast.error('Please select at least one character set');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }

    const newStrength = calculateStrength(generatedPassword);
    setPassword(generatedPassword);
    setStrength(newStrength);
    addToHistory({ password: generatedPassword, length, strength: newStrength.label });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!');
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Create strong, random, and secure passwords locally in your browser. Fully customizable length and character sets for maximum security."
      keywords="password generator, random password, secure password, password creator, strong password, security tool"
      icon={ShieldCheck}
      category="Security"
    >
      <div className="space-y-10">
        <div className="relative group">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-8 pr-16 bg-slate-900 text-teal-400 font-mono text-3xl md:text-4xl text-center rounded-3xl border-2 border-slate-800 shadow-2xl transition-all"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={generatePassword}
              className="p-3 bg-slate-800 rounded-xl text-teal-400 hover:text-white hover:bg-teal-600 transition-all shadow-md"
              title="Generate new"
            >
              <RefreshCw size={24} />
            </button>
            <button 
              onClick={handleCopy}
              className="p-3 bg-slate-800 rounded-xl text-teal-400 hover:text-white hover:bg-teal-600 transition-all shadow-md"
              title="Copy to clipboard"
            >
              <Copy size={24} />
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-3 px-2">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-slate-500 uppercase tracking-widest">Security Level</span>
            <span className={`px-3 py-1 rounded-full text-white text-xs ${strength.color}`}>
              {strength.label}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ease-out ${strength.color}`}
              style={{ width: `${strength.percentage}%` }}
            />
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest">
              Password Length: <span className="text-slate-900 text-xl ml-2">{length}</span>
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-xs text-slate-400 font-bold px-1">
              <span>Short (4)</span>
              <span>Secure (16)</span>
              <span>Ultra (64)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CheckboxOption 
              active={options.uppercase} 
              onClick={() => setOptions({...options, uppercase: !options.uppercase})} 
              label="Uppercase" 
              desc="ABC"
            />
            <CheckboxOption 
              active={options.lowercase} 
              onClick={() => setOptions({...options, lowercase: !options.lowercase})} 
              label="Lowercase" 
              desc="abc"
            />
            <CheckboxOption 
              active={options.numbers} 
              onClick={() => setOptions({...options, numbers: !options.numbers})} 
              label="Numbers" 
              desc="123"
            />
            <CheckboxOption 
              active={options.symbols} 
              onClick={() => setOptions({...options, symbols: !options.symbols})} 
              label="Symbols" 
              desc="@#$"
            />
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full py-5 bg-teal-600 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-teal-500/30 hover:bg-teal-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <RefreshCw size={22} />
          Generate Secure Password
        </button>

        {history.length > 0 && (
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> Recent Passwords
              </h3>
              <button onClick={clearHistory} className="text-xs text-slate-400 hover:text-red-500 font-bold transition-colors flex items-center gap-1">
                <Trash2 size={12} /> Clear
              </button>
            </div>
            <div className="space-y-2">
              {history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { setPassword(item.password); navigator.clipboard.writeText(item.password); toast.success('Password copied!'); }}
                  className="w-full flex items-center justify-between px-5 py-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50 transition-all group"
                >
                  <span className="font-mono text-sm text-slate-700 truncate max-w-[60%]">{item.password}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-slate-400">{item.savedAt}</span>
                    <Copy size={12} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

const CheckboxOption = ({ active, onClick, label, desc }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${active ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-white border-slate-100 text-slate-400 grayscale hover:grayscale-0'}`}
  >
    <div className={`p-1 rounded-md ${active ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}>
      <Check size={14} />
    </div>
    <div className="text-left">
      <div className="text-xs font-extrabold uppercase leading-none mb-1">{label}</div>
      <div className="text-[10px] font-bold opacity-70">{desc}</div>
    </div>
  </button>
);

export default PasswordGenerator;
