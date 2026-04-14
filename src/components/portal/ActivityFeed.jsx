import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Image as ImageIcon, 
  Clock,
  Zap,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'security',
    title: 'Security Sync Complete',
    desc: 'Bait-and-switch protection and firewall audit passed with 0 threats.',
    time: '2 hours ago',
    icon: <ShieldCheck className="text-emerald-500" />,
    color: 'emerald'
  },
  {
    id: 2,
    type: 'infra',
    title: 'Cloudflare Cache Purged',
    desc: 'Updated visual assets successfully propagated to global edge nodes.',
    time: '4 hours ago',
    icon: <RefreshCw className="text-blue-500" />,
    color: 'blue'
  },
  {
    id: 3,
    type: 'dev',
    title: 'Staging v1.5.2 Deployed',
    desc: 'New "Design Lab" integration pushed to staging environment.',
    time: 'Yesterday at 5:44 PM',
    icon: <Terminal className="text-teal-500" />,
    color: 'teal'
  },
  {
    id: 4,
    type: 'asset',
    title: 'Brand Assets Sync',
    desc: '4 high-resolution SVG logos added to the project library.',
    time: '2 days ago',
    icon: <ImageIcon className="text-indigo-500" />,
    color: 'indigo'
  },
  {
    id: 5,
    type: 'status',
    title: 'Milestone 3 Reached',
    desc: 'Frontend architecture finalized and approved by Lead Engineer.',
    time: '3 days ago',
    icon: <CheckCircle2 className="text-emerald-500" />,
    color: 'emerald'
  }
];

const ActivityItem = ({ activity, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex gap-6 p-6 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group"
  >
    <div className={`w-12 h-12 rounded-2xl bg-${activity.color}-500/10 flex items-center justify-center shrink-0`}>
      {activity.icon}
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
          {activity.title}
        </h4>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Clock size={10} />
          {activity.time}
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        {activity.desc}
      </p>
    </div>
  </motion.div>
);

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Zap className="text-teal-500" size={20} fill="currentColor" />
          Live Project Insight
        </h3>
        <button className="text-xs font-bold text-teal-600 hover:underline px-3 py-1 bg-teal-50 dark:bg-teal-500/10 rounded-lg">
          View All logs
        </button>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
        {activities.map((activity, idx) => (
          <ActivityItem key={activity.id} activity={activity} index={idx} />
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
         <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Status: Healthy
         </div>
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v1.8.4 Node: SG-1</p>
      </div>
    </div>
  );
};

export default ActivityFeed;
