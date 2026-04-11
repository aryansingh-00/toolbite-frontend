import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ProjectTimeline = ({ projectId }) => {
  const [phases, setPhases] = useState([
    { id: 1, title: 'Loading...', date: '...', status: 'pending' }
  ]);

  useEffect(() => {
    async function loadMilestones() {
      if (!projectId) return;
      const { data, error } = await supabase.from('milestones').select('*').eq('project_id', projectId).order('sort_order', { ascending: true });
      if (data && !error && data.length > 0) {
        setPhases(data.map(m => ({
          id: m.id,
          title: m.title,
          date: m.date_range,
          status: m.status
        })));
      }
    }
    loadMilestones();
  }, [projectId]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
        <CheckCircle2 className="text-teal-500" />
        Project Roadmap
      </h3>

      <div className="relative">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 rounded-full hidden md:block"></div>
        {/* Active Connecting Line */}
        <div className="absolute top-1/2 left-0 w-[50%] h-1 bg-teal-500 -translate-y-1/2 rounded-full hidden md:block transition-all duration-1000"></div>

        <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex md:flex-col items-center gap-4 md:w-1/5 text-left md:text-center group">
              
              {/* Desktop Connecting Line for Mobile View */}
              <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 absolute left-[1.125rem] md:hidden" style={{ top: `${index * 100}%`, display: index === phases.length - 1 ? 'none' : 'block' }}></div>

              {/* Status Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 ${
                phase.status === 'completed' ? 'bg-teal-500 border-white dark:border-slate-900 text-white shadow-xl shadow-teal-500/30' :
                phase.status === 'active' ? 'bg-white dark:bg-slate-900 border-teal-500 text-teal-500 shadow-lg shadow-teal-500/20 shadow-[0_0_0_4px_rgba(20,184,166,0.1)]' :
                'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              } transition-all duration-300 relative z-10`}>
                {phase.status === 'completed' && <Check size={18} strokeWidth={3} />}
                {phase.status === 'active' && <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" />}
                {phase.status === 'pending' && <CircleDashed size={20} />}
              </div>

              {/* Text Content */}
              <div>
                <h4 className={`font-bold mb-1 ${
                  phase.status === 'completed' ? 'text-slate-900 dark:text-white' :
                  phase.status === 'active' ? 'text-teal-600 dark:text-teal-400' :
                  'text-slate-400'
                }`}>{phase.title}</h4>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 md:justify-center">
                  <Clock size={12} /> {phase.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectTimeline;
