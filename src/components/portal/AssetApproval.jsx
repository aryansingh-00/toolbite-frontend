import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Image as ImageIcon, FileText, Download, MessageSquare } from 'lucide-react';

const assetsData = [
  { id: 1, name: "Primary Logo - Dark Mode", type: "IMAGE", status: "Approved", size: "2.5 MB", preview: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Homepage Hero Copy Revision 2", type: "DOC", status: "Pending", size: "12 KB", preview: null },
  { id: 3, name: "Icon Set - Business Verticals", type: "IMAGE", status: "Revision Requested", size: "5.1 MB", preview: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&auto=format&fit=crop" },
  { id: 4, name: "Sitemap Architecture v1", type: "DOC", status: "Approved", size: "45 KB", preview: null },
];

const AssetApproval = () => {
  const [assets, setAssets] = useState(assetsData);

  const updateStatus = (id, newStatus) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Design & Asset Approval</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Review and approve assets to move the project forward.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold border border-teal-500/20">
              {assets.filter(a => a.status === 'Approved').length} Approved
           </div>
           <div className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-500/20">
              {assets.filter(a => a.status === 'Pending').length} Pending
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {assets.map((asset) => (
            <motion.div
              key={asset.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white dark:bg-slate-900 rounded-[2rem] border transition-all duration-300 overflow-hidden group ${asset.status === 'Approved' ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'}`}
            >
              {/* Asset Preview */}
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
                {asset.preview ? (
                  <img src={asset.preview} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <FileText size={48} className="text-slate-300 dark:text-slate-600" />
                )}
                
                <div className="absolute top-4 right-4">
                  {asset.status === 'Approved' && (
                    <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                  {asset.status === 'Revision Requested' && (
                    <div className="bg-rose-500 text-white p-1 rounded-full shadow-lg">
                      <AlertCircle size={18} />
                    </div>
                  )}
                </div>
              </div>

              {/* Asset Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate" title={asset.name}>{asset.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{asset.size} • {asset.type}</p>
                </div>

                <div className="flex gap-2 mt-6">
                  {asset.status !== 'Approved' ? (
                    <>
                      <button 
                        onClick={() => updateStatus(asset.id, 'Approved')}
                        className="flex-1 py-2 bg-teal-500 text-slate-900 text-xs font-bold rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={14} /> Approve
                      </button>
                      <button 
                         onClick={() => updateStatus(asset.id, 'Revision Requested')}
                         className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <MessageSquare size={14} />
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/20 cursor-default">
                      Finalized
                    </button>
                  )}
                  <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-teal-500 rounded-xl transition-colors shrink-0">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Tip */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-4 border border-slate-800">
        <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center shrink-0">
          <AlertCircle size={20} />
        </div>
        <p className="text-xs font-medium text-slate-400">
          Approving an asset confirms it for development. If you request a revision, please add a comment in the chat for our designers.
        </p>
      </div>
    </div>
  );
};

export default AssetApproval;
