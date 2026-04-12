import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Download,
  Clock,
  File,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import ProjectTimeline from '../../components/portal/ProjectTimeline';
import PortalWidgets from '../../components/portal/PortalWidgets';

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [clientData, setClientData] = useState({
    name: "Loading Data...",
    contact: "Client",
    project: "Verifying Authentication...",
    status: "Loading",
    completion: 0,
    dueDate: "TBD"
  });
  const navigate = useNavigate();
  const { clientUser, logout } = useClientAuth();

  useEffect(() => {
    async function loadProject() {
      if (!clientUser?.id) return;
      try {
        const { data, error } = await supabase.from('projects').select('*').eq('client_auth_id', clientUser.id).single();
        if (data && !error) {
          setActiveProjectId(data.id);
          setClientData({
            name: data.client_name,
            contact: "Jane Doe",
            project: data.project_name,
            status: data.status,
            completion: data.completion_percentage,
            dueDate: data.due_date ? new Date(data.due_date).toLocaleDateString() : "TBD"
          });
        } else {
          setClientData({
            name: "No Assigned Projects",
            contact: "Unassigned Account",
            project: "Please contact support for access.",
            status: "Error",
            completion: 0,
            dueDate: "TBD"
          });
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    }
    loadProject();
  }, [clientUser]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: CheckSquare, label: 'Milestones' },
    { icon: FileText, label: 'Documents' },
    { icon: CreditCard, label: 'Invoices' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Portal Logo */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Tool<span className="text-teal-500">Bite</span> <span className="text-sm font-medium text-slate-500 uppercase tracking-widest ml-1 hidden sm:inline">Portal</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Client Profile Snippet */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/25">
              A
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{clientData.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{clientData.project}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-200 ${activeTab === item.label ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={async () => {
              await logout();
              navigate('/client-login');
            }} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 dark:text-slate-300 p-2 border border-slate-200 dark:border-slate-700 rounded-lg">
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">Project Overview</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-teal-500 dark:text-white w-64"
              />
            </div>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Notifications</h4>
                  <div className="text-sm text-slate-500">You have no new notifications.</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {activeTab === 'Dashboard' && (
              <>
                {/* Live Status Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome back, {clientData.contact.split(' ')[0]} 👋</h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">Here is the latest status of your project.</p>
                    </div>
                    <div className="px-5 py-2 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full font-bold text-sm border border-teal-100 dark:border-teal-500/20 flex items-center gap-2 shadow-sm">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                      </span>
                      {clientData.status}
                    </div>
                  </div>

                  {/* Progress Bar overall */}
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Overall Completion</span>
                      <span className="text-2xl font-black text-teal-500">{clientData.completion}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-200 dark:border-slate-700">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${clientData.completion}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Timeline Widget */}
                {activeProjectId && <ProjectTimeline projectId={activeProjectId} />}

                {/* Widgets Section */}
                {activeProjectId && <PortalWidgets projectId={activeProjectId} />}
              </>
            )}

            {activeTab === 'Invoices' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Billing History</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Download and manage your project invoices.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Outstanding Balance</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">$0.00</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Invoice ID</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        { id: 'INV-2026-001', date: 'April 05, 2026', amount: '$1,200.00', status: 'Paid' },
                        { id: 'INV-2026-002', date: 'March 15, 2026', amount: '$850.00', status: 'Paid' }
                      ].map((inv, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{inv.id}</td>
                          <td className="px-8 py-6 text-slate-600 dark:text-slate-400">{inv.date}</td>
                          <td className="px-8 py-6 font-black text-slate-900 dark:text-white">{inv.amount}</td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold">
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="p-2 text-slate-400 hover:text-teal-500 transition-colors">
                              <Download size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'Documents' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Project Assets</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Access your wireframes, logos, and project documentation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Wireframes_v2.pdf', size: '12.4 MB', type: 'PDF' },
                    { name: 'Brand_Assets.zip', size: '45.1 MB', type: 'Archive' },
                    { name: 'Project_Contract.pdf', size: '1.2 MB', type: 'PDF' },
                    { name: 'Design_System.fig', size: '2.5 MB', type: 'Figma' }
                  ].map((doc, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <File size={24} />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{doc.name}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{doc.size} • {doc.type}</p>
                      <div className="mt-6 flex justify-between items-center">
                        <button className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline">
                          <Download size={16} /> Download
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Milestones' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Project Roadmap</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Detailed breakdown of your project completion status.</p>
                </div>
                {activeProjectId && <ProjectTimeline projectId={activeProjectId} />}
              </motion.div>
            )}

            {activeTab === 'Settings' && (
              <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-400">
                  <Settings size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Portal Settings</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">Update your password or notification preferences. This view is coming soon.</p>
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  );
};

export default ClientDashboard;
