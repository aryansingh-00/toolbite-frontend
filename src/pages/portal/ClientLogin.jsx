import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, Cpu, Shield, Sparkles } from 'lucide-react';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { useNavigate } from 'react-router-dom';

const PARTICLES_COUNT = 20;

// Generate particles once at module level to stay pure during component render
const INITIAL_PARTICLES = [...Array(PARTICLES_COUNT)].map((_, i) => ({
  id: i,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 5,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`
}));

const NeuralGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Animated Light Trails */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: ['0vw', '110vw'],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
            className="absolute h-[1px] w-40 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
            style={{ top: `${15 + i * 15}%` }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {INITIAL_PARTICLES.map((p) => (
        <motion.div
          key={`p-${p.id}`}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay
          }}
          className="absolute w-1 h-1 bg-teal-400/30 rounded-full blur-[2px]"
          style={{
            left: p.left,
            top: p.top
          }}
        />
      ))}
    </div>
  );
};

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useClientAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Simulate "scanning" delay for AI feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const { error } = await login(email, password);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background System */}
      <NeuralGrid />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center w-32 h-32">
            {/* Spinning Ring */}
            <svg className="absolute w-full h-full animate-spin-slow opacity-20 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 8" className="text-teal-500" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" className="text-blue-500" />
            </svg>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="group relative z-10"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500/20 to-blue-600/20 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-5 bg-white border border-teal-500/20 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md">
                 <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="w-14 h-14 group-hover:drop-shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-500"
                  >
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} 
                      animate={{ pathLength: 1, opacity: 1 }} 
                      transition={{ duration: 1.5, ease: 'easeInOut' }} 
                      d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48" 
                      stroke="#0f172a" 
                      strokeWidth="4.5" 
                    />
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }} 
                      animate={{ pathLength: 1, opacity: 1 }} 
                      transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }} 
                      d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48" 
                      stroke="#0f172a" 
                      strokeWidth="4" 
                    />
                    <motion.polygon 
                      initial={{ scale: 0, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      transition={{ duration: 0.5, delay: 1, type: 'spring', stiffness: 200 }} 
                      points="30,28 30,52 52,40" 
                      fill="#0f172a" 
                    />
                  </motion.svg>
              </div>
            </motion.div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-black text-white tracking-tight">
          Client Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400 font-medium">
          Sign in to access your project dashboard
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-slate-900 py-8 px-4 shadow-2xl sm:rounded-[2rem] sm:px-10 border border-slate-800">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <AnimatePresence>
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-3 text-rose-400 text-sm font-medium"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-bold text-slate-300">
                Email Address
              </label>
              <div className="mt-2 relative rounded-2xl shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 sm:text-sm border border-slate-800 rounded-2xl focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-slate-950/50 text-white transition-all outline-none placeholder:text-slate-700"
                  placeholder="name@agency.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300">
                Password
              </label>
              <div className="mt-2 relative rounded-2xl shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 sm:text-sm border border-slate-800 rounded-2xl focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-slate-950/50 text-white transition-all outline-none placeholder:text-slate-700"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-slate-900 bg-teal-500 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5 text-slate-900" />
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}} />
    </div>
  );
};

export default ClientLogin;
