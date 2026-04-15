import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Smartphone, 
  Mail, 
  Save,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const PortalSettings = ({ clientData }) => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: clientData.name || '',
    email: clientData.contact_email || 'client@example.com',
    company: clientData.project || '',
    notifications: {
      milestones: true,
      messages: true,
      invoices: false,
      approvals: true
    },
    theme: 'system'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings updated successfully!', {
        style: {
          borderRadius: '16px',
          background: '#0f172a',
          color: '#fff',
          fontWeight: 'bold'
        },
        iconTheme: {
          primary: '#14b8a6',
          secondary: '#fff',
        },
      });
    }, 1200);
  };

  const sections = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'appearance', icon: Palette, label: 'Appearance' }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Nav */}
      <div className="w-full lg:w-64 space-y-1">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSubTab(section.id)}
            className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all ${activeSubTab === section.id ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm border border-slate-200 dark:border-slate-800' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <section.icon size={18} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-10">
        <AnimatePresence mode="wait">
          {activeSubTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-teal-500/20">
                  {formData.name.charAt(0)}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold dark:text-white mb-2">Public Profile</h4>
                  <p className="text-sm text-slate-500 mb-4">Your avatar and name are visible to the ToolBite team.</p>
                  <button className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white transition-all">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500/20 dark:text-white font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500/20 dark:text-white font-medium opacity-60" 
                    disabled 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Company / Project Name</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500/20 dark:text-white font-medium opacity-60" 
                    disabled 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-bold dark:text-white mb-6">Notification Preferences</h4>
              {[
                { key: 'milestones', label: 'Project Milestones', desc: 'Get notified when a new phase is completed.' },
                { key: 'messages', label: 'Team Messages', desc: 'Receive alerts for new direct messages from strategists.' },
                { key: 'approvals', label: 'Asset Approvals', desc: 'Get pinged when design assets need your review.' },
                { key: 'invoices', label: 'Billing & Invoices', desc: 'Monthly billing summaries and payment confirmations.' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => setFormData({
                      ...formData, 
                      notifications: {...formData.notifications, [item.key]: !formData.notifications[item.key]}
                    })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.notifications[item.key] ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.notifications[item.key] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeSubTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex gap-4">
                 <Shield className="text-amber-500 shrink-0" size={24} />
                 <div>
                    <h5 className="font-bold text-amber-700 dark:text-amber-400 text-sm">Account Security</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">We recommend changing your password every 90 days to maintain elite security for your project data.</p>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500/20 dark:text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">New Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter new password"
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500/20 dark:text-white" 
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
               <h4 className="text-xl font-bold dark:text-white">Portal Appearance</h4>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'System', icon: Smartphone }
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setFormData({...formData, theme: theme.id})}
                      className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${formData.theme === theme.id ? 'border-teal-500 bg-teal-500/5 text-teal-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'}`}
                    >
                      <theme.icon size={24} />
                      <span className="font-bold text-sm tracking-wide">{theme.label}</span>
                    </button>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalSettings;
