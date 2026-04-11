import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, ExternalLink, FileText, CheckCircle2, MessageSquare, AlertCircle, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PortalWidgets = ({ projectId }) => {
  const quickLinks = [
    { title: 'Staging Site', desc: 'Live preview', icon: ExternalLink, link: '#', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-500/10' },
    { title: 'Figma Mockups', desc: 'Design files', icon: ExternalLink, link: '#', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    { title: 'Shared Drive', desc: 'Assets & Media', icon: FileText, link: '#', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  ];

  const [actionItems, setActionItems] = useState([
    { id: 1, text: 'Loading...', type: 'normal', completed: false }
  ]);

  useEffect(() => {
    async function loadActions() {
      if (!projectId) return;
      const { data, error } = await supabase.from('action_items').select('*').eq('project_id', projectId).order('created_at', { ascending: false });
      if (data && !error && data.length > 0) {
        setActionItems(data);
      }
    }
    loadActions();
  }, [projectId]);

  const toggleAction = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    
    // UI Optimistic UI Update 
    setActionItems(items => items.map(item => 
      item.id === id ? { ...item, completed: newStatus } : item
    ));

    // Write to Supabase Database
    try {
      await supabase.from('action_items').update({ completed: newStatus }).eq('id', id);
    } catch(err) {
      console.error("Failed to update status:", err);
    }
  };

  const feedItems = [
    { id: 1, action: 'Development Phase Started', user: 'Aryan', time: '2 hours ago', type: 'system' },
    { id: 2, action: 'Uploaded new Figma designs', user: 'Aryan', time: 'Yesterday', type: 'file' },
    { id: 3, action: 'Approved Phase 1 Wireframes', user: 'Sarah (You)', time: 'Nov 5', type: 'approval' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Action Items Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="text-teal-500" size={20} />
            Your To-Do List
          </h3>
          <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center">1</span>
        </div>
        
        <ul className="space-y-4">
          {actionItems.map(item => (
            <li key={item.id} className={`flex gap-3 group items-start transition-all ${item.completed ? 'opacity-50' : ''}`}>
              <button 
                onClick={() => toggleAction(item.id, item.completed)}
                className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  item.completed 
                    ? 'bg-teal-500 border-teal-500 text-white' 
                    : item.type === 'urgent' 
                      ? 'border-rose-500 text-rose-500 hover:bg-rose-50' 
                      : 'border-slate-300 dark:border-slate-600 hover:border-teal-500'
                }`}
              >
                {item.completed && <Check size={12} strokeWidth={4} />}
              </button>
              <span className={`text-sm font-medium transition-all ${
                item.completed ? 'line-through text-slate-400 dark:text-slate-500' :
                item.type === 'urgent' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              } group-hover:text-teal-600 dark:group-hover:text-teal-400 cursor-pointer`}
              onClick={() => toggleAction(item.id, item.completed)}
              >
                {item.text}
              </span>
              {item.type === 'urgent' && !item.completed && <AlertCircle size={14} className="text-rose-500 ml-auto shrink-0" />}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Quick Links Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-[40px]"></div>
        <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
        <div className="space-y-4 relative z-10">
          {quickLinks.map((link, i) => (
            <a key={i} href={link.link} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
              <div className={`w-10 h-10 rounded-xl ${link.bg} ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <link.icon size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm">{link.title}</h4>
                <p className="text-xs text-slate-400">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Activity Feed Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {feedItems.map((feed, index) => (
            <div key={feed.id} className="flex gap-4 relative">
              {index !== feedItems.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-[-16px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>
              )}
              <div className="shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mt-1">
                {feed.type === 'system' ? <AlertCircle size={10} className="text-teal-500" /> : 
                 feed.type === 'approval' ? <CheckCircle2 size={10} className="text-emerald-500" /> : 
                 <MessageSquare size={10} className="text-blue-500" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1">{feed.action}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-teal-600 dark:text-teal-400">{feed.user}</span>
                  <span>•</span>
                  <span>{feed.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default PortalWidgets;
