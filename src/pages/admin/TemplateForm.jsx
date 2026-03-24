import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, UploadCloud, X, Plus } from 'lucide-react';

const TemplateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    shortDescription: '',
    fullDescription: '',
    previewLink: '',
    status: 'active',
  });
  
  const [features, setFeatures] = useState(['']);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchTemplate();
    }
  }, [id]);

  const fetchTemplate = async () => {
    try {
      const { data } = await api.get(`/templates/${id}`);
      setFormData({
        title: data.title,
        category: data.category,
        price: data.price,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription || '',
        previewLink: data.previewLink || '',
        status: data.status,
      });
      setFeatures(data.features.length > 0 ? data.features : ['']);
      setImagePreview(data.imageUrl);
    } catch (error) {
      toast.error('Failed to load template');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, '']);

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures.length ? newFeatures : ['']);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File exceeds 5MB limit');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Clean features array
    const cleanFeatures = features.filter(f => f.trim() !== '');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('shortDescription', formData.shortDescription);
    data.append('fullDescription', formData.fullDescription);
    data.append('previewLink', formData.previewLink);
    data.append('status', formData.status);
    
    // For our node backend parsing logic:
    data.append('features', JSON.stringify(cleanFeatures));

    if (image) {
      data.append('image', image);
    } else if (!isEditMode) {
      toast.error('Please upload an image');
      setSubmitting(false);
      return;
    }

    try {
      if (isEditMode) {
        await api.put(`/templates/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Template updated successfully');
      } else {
        await api.post('/templates', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Template created successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save template');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse text-slate-500 font-medium">Loading template data...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center mb-8">
        <Link to="/admin/dashboard" className="mr-4 p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-full transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900">
          {isEditMode ? 'Edit Template' : 'Add New Template'}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Template Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition cursor-pointer relative group">
              <div className="space-y-2 text-center">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Preview" className="h-48 rounded-lg object-cover shadow-sm border border-slate-200" />
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); setImage(null); setImagePreview(''); }}
                      className="absolute -top-3 -right-3 z-10 bg-red-100 text-red-600 rounded-full p-1.5 hover:bg-red-200 hover:scale-110 transition shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-300 group-hover:text-blue-500 transition" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 py-1 transition">
                        <span>Upload a file</span>
                        <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                      </label>
                      <p className="pl-1 py-1">or click here</p>
                    </div>
                    <p className="text-xs text-slate-400 font-medium tracking-wide border border-slate-100 bg-slate-50 rounded-md py-1 px-3 inline-block">PNG, JPG, WEBP up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="SaaS Landing Page" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition cursor-pointer appearance-none">
                <option value="" disabled>Select a category</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Blog">Blog</option>
                <option value="SaaS">SaaS</option>
                <option value="Corporate">Corporate</option>
                <option value="Admin Dashboard">Admin Dashboard</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} min="0" step="0.01" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="49.99" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition cursor-pointer appearance-none">
                <option value="active">Active (Visible formatting)</option>
                <option value="inactive">Inactive (Hidden formatting)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preview Demo Link</label>
              <input type="url" name="previewLink" value={formData.previewLink} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="https://demo.toolbite.com/..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description</label>
              <input type="text" name="shortDescription" required value={formData.shortDescription} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="A brief one-liner summarizing the template" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description</label>
              <textarea name="fullDescription" rows="5" value={formData.fullDescription} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" placeholder="Detailed insights about what the template features..."></textarea>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <label className="block text-sm font-semibold text-slate-700">Template Details & Features</label>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input 
                  type="text" 
                  value={feature} 
                  onChange={(e) => handleFeatureChange(index, e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="e.g., Responsive Design, React Integration..." 
                />
                <button type="button" onClick={() => removeFeature(index)} className="px-4 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-xl transition shadow-sm border border-red-100">
                  <X className="w-5 h-5 mx-auto" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFeature} className="text-blue-600 text-sm font-bold hover:text-blue-800 transition flex items-center mt-3 px-2 py-1 rounded-lg hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-1 stroke-[3px]" /> Add Another Feature
            </button>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={submitting} 
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md shadow-blue-500/30 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  {isEditMode ? 'Update Template' : 'Publish Template'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;
