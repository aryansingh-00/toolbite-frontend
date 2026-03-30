/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters and Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data } = await api.get('/templates');
      setTemplates(data);
    } catch (error) {
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await api.delete(`/templates/${id}`);
        toast.success('Template deleted successfully');
        fetchTemplates();
      } catch (error) {
        toast.error('Failed to delete template');
      }
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/templates/${id}/status`);
      toast.success('Status updated');
      fetchTemplates();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Derive unique categories for the filter dropdown
  const categories = useMemo(() => {
    const cats = templates.map(t => t.category);
    return [...new Set(cats)];
  }, [templates]);

  // Apply filters and search
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            template.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory ? template.category === filterCategory : true;
      const matchesStatus = filterStatus ? template.status === filterStatus : true;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [templates, searchTerm, filterCategory, filterStatus]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Templates</h1>
        <Link
          to="/admin/templates/new"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition flex items-center shadow-md shadow-blue-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Template
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-t-2xl border-x border-t border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm text-slate-700 appearance-none cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <select
            className="w-full sm:w-40 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm text-slate-700 cursor-pointer appearance-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-6 py-4">Template</th>
                <th className="px-6 py-4">Category & Price</th>
                <th className="px-6 py-4 hidden md:table-cell">Created Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTemplates.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <Search className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-base font-medium text-slate-600">No templates found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTemplates.map((template) => (
                  <tr key={template._id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={template.imageUrl} 
                          alt={template.title} 
                          className="w-14 h-14 rounded-lg object-cover mr-4 shadow-sm border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-base">{template.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 max-w-[200px] md:max-w-xs truncate" title={template.shortDescription}>
                            {template.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide mb-1">
                        {template.category}
                      </span>
                      <p className="font-bold text-slate-800">${template.price}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap text-slate-500">
                      {new Date(template.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => toggleStatus(template._id)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                          template.status === 'active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-green-500/20' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:shadow-slate-500/20'
                        }`}
                      >
                        {template.status === 'active' ? <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> : <XCircle className="w-3.5 h-3.5 mr-1.5" />}
                        <span className="capitalize">{template.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/admin/templates/edit/${template._id}`}
                          className="p-2 bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-lg transition-colors mr-2 shadow-sm"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(template._id)}
                          className="p-2 bg-white border border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
