import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { submitForm } from '../lib/formSubmitter';


const OrderForm = () => {
  const [formState, setFormState] = useState('idle');
  const [fileName, setFileName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMobileFeatures, setSelectedMobileFeatures] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [marketingAttribution, setMarketingAttribution] = useState({});

  const toggleMobileFeature = (feature) => {
    setSelectedMobileFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };

  // Handle redirect from FormSubmit, service pre-selection, estimator pre-fill, and UTM capture
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setFormState('success');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Capture UTM tracking parameters
    const utmParams = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'gclid'].forEach(key => {
      const val = params.get(key);
      if (val) {
        utmParams[key] = val;
      }
    });
    if (Object.keys(utmParams).length > 0) {
      setMarketingAttribution(utmParams);
    }

    const serviceParam = params.get('service');
    if (serviceParam) {
      const slugMap = {
        'mobile-app-development': 'Custom Mobile Application',
        'corporate-web-design': 'Business / Corporate',
        'ecommerce-development': 'E-commerce Store',
        'portfolio-design': 'Portfolio / Creator',
        'landing-page-design': 'Landing Page',
        'saas-development': 'Custom Web Application',
      };
      const matchedType = slugMap[serviceParam];
      if (matchedType) {
        setSelectedType(matchedType);
      }

      // Check for estimator handoff parameters
      if (serviceParam === 'mobile-app-development') {
        const paramPlatform = params.get('platform');
        if (paramPlatform) {
          if (paramPlatform.includes('iOS')) setSelectedPlatform('Purely iOS (Apple Store)');
          else if (paramPlatform.includes('Android')) setSelectedPlatform('Purely Android (Google Play)');
          else setSelectedPlatform('Cross-Platform (iOS & Android) - Recommended');
        }

        const paramFeatures = params.get('features');
        if (paramFeatures) {
          const feats = paramFeatures.split(',');
          setSelectedMobileFeatures(feats);
        }

        const paramBudget = params.get('budget');
        if (paramBudget) {
          setSelectedBudget(paramBudget);
        }

        // Scroll dynamically to order form
        const orderFormContainer = document.getElementById('order-form-container');
        if (orderFormContainer) {
          setTimeout(() => {
            orderFormContainer.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      let fileUrl = null;
      
      // Handle file upload if present (optional try-catch for Supabase Storage)
      const attachment = formData.get('attachment');
      if (attachment && attachment.size > 0) {
        try {
          const fileExt = attachment.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `${Date.now()}-${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('attachments')
            .upload(filePath, attachment);
            
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('attachments')
              .getPublicUrl(filePath);
              
            fileUrl = publicUrl;
          }
        } catch (uploadErr) {
          console.error("Storage upload failed: ", uploadErr);
        }
      }
      
      // Remove File object from data to keep payload clean
      delete data.attachment;
      if (fileUrl) {
        data.attachmentUrl = fileUrl;
      }
      
      // Submit via centralized form submit helper
      const formPayload = {
        _subject: `New Custom Order Request from ${data.name}`,
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        business_name: data.businessName || 'N/A',
        project_type: data.websiteType || 'N/A',
        budget_range: data.budgetRange || 'N/A',
        delivery_timeline: data.deliveryTimeline || 'N/A',
        attachment_url: fileUrl || 'No attachment uploaded',
        message: data.message || 'N/A'
      };

      if (data.websiteType === 'Custom Mobile Application') {
        formPayload.target_platform = data.targetPlatform || 'N/A';
        formPayload.mobile_features = selectedMobileFeatures.length > 0 ? selectedMobileFeatures.join(', ') : 'None selected';
        formPayload.app_store_deployment = data.appStoreDeployment || 'N/A';
      } else {
        formPayload.number_of_pages = data.numberOfPages || 'N/A';
        formPayload.required_features = data.requiredFeatures || 'None specified';
        formPayload.preferred_design_style = data.preferredDesign || 'N/A';
        formPayload.reference_url = data.referenceUrl || 'N/A';
      }

      // Attach Marketing UTM attribution if captured
      if (Object.keys(marketingAttribution).length > 0) {
        formPayload.utm_source = marketingAttribution.utm_source || 'N/A';
        formPayload.utm_medium = marketingAttribution.utm_medium || 'N/A';
        formPayload.utm_campaign = marketingAttribution.utm_campaign || 'N/A';
        formPayload.utm_content = marketingAttribution.utm_content || 'N/A';
        formPayload.referral_ref = marketingAttribution.ref || 'N/A';
        if (marketingAttribution.gclid) {
          formPayload.google_ads_click_id = marketingAttribution.gclid;
        }
      }

      const isSuccess = await submitForm(formPayload);

      if (isSuccess) {
        setFormState('success');
      } else {
        console.error("Submission response error");
        setFormState('idle');
        alert("Something went wrong saving your order. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormState('idle');
      alert("Submission failed. Please check your connection.");
    }
  };

  return (
    <section id="custom-order" className="py-12 bg-white text-slate-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-slate-100/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-slate-500 font-semibold tracking-wide uppercase text-sm mb-3">Custom Websites</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-black mb-6">Start Your Custom Project</h3>
          <p className="text-lg text-slate-600 font-medium">
            Fill out the form below with your project details. Our team will review your request and contact you within 24 hours to schedule a discovery call.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          {formState === 'success' ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} />
              </div>
              <h4 className="text-3xl font-bold text-black mb-4">Request Submitted!</h4>
              <p className="text-lg text-slate-600 max-w-md mx-auto">
                Thank you for choosing ToolBite. We have received your project details and will be in touch within 24 hours.
              </p>
              <button title="Interactive Button" aria-label="Interactive Button" 
                onClick={() => setFormState('idle')}
                className="mt-8 px-6 py-2 rounded-full border border-black text-black font-semibold hover:bg-slate-50 transition-colors"
              >
                Submit another project
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="space-y-8"
            >

              {/* Personal Details */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-black border-b border-slate-200 pb-2">Client Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <input name="name" required type="text" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <input name="email" required type="email" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input name="phone" type="tel" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Business Name *</label>
                    <input name="businessName" required type="text" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all" placeholder="Acme Inc." />
                  </div>
                </div>
              </div>

              {/* Project Scope */}
              <div className="space-y-6 pt-4">
                <h4 className="text-xl font-bold text-black border-b border-slate-200 pb-2">Project Scope</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project / Website Type *</label>
                    <select 
                      name="websiteType" 
                      required 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black"
                    >
                      <option value="">Select a type</option>
                      <option>Business / Corporate</option>
                      <option>E-commerce Store</option>
                      <option>Portfolio / Creator</option>
                      <option>Landing Page</option>
                      <option>Custom Web Application</option>
                      <option value="Custom Mobile Application">Custom Mobile Application</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {selectedType === 'Custom Mobile Application' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Target Platform *</label>
                        <select 
                          name="targetPlatform" 
                          required={selectedType === 'Custom Mobile Application'} 
                          value={selectedPlatform}
                          onChange={(e) => setSelectedPlatform(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black"
                        >
                          <option value="">Select platform(s)</option>
                          <option value="Cross-Platform (iOS & Android) - Recommended">Cross-Platform (iOS & Android) - Recommended</option>
                          <option value="Purely iOS (Apple Store)">Purely iOS (Apple Store)</option>
                          <option value="Purely Android (Google Play)">Purely Android (Google Play)</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Core App Features Needed</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { id: 'push', label: 'Push Notifications' },
                            { id: 'geo', label: 'Geo-Tracking & Maps' },
                            { id: 'camera', label: 'Camera & Media Access' },
                            { id: 'iap', label: 'In-App Purchases' },
                            { id: 'biometric', label: 'Biometric Auth (FaceID)' },
                            { id: 'offline', label: 'Offline-First Sync' },
                            { id: 'ai', label: 'AI / Smart Features' },
                            { id: 'ble', label: 'Bluetooth / BLE' }
                          ].map((feat) => {
                            const isSelected = selectedMobileFeatures.includes(feat.label);
                            return (
                              <button
                                type="button"
                                key={feat.id}
                                onClick={() => toggleMobileFeature(feat.label)}
                                className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-center flex items-center justify-center ${
                                  isSelected 
                                    ? 'bg-black border-black text-white shadow-md scale-[1.02]' 
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                                }`}
                              >
                                {feat.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">App Store Deployment Assistance? *</label>
                        <select 
                          name="appStoreDeployment" 
                          required={selectedType === 'Custom Mobile Application'} 
                          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black"
                        >
                          <option value="">Select option</option>
                          <option>Yes, need deployment support (App Store & Google Play)</option>
                          <option>No, we will handle deployment ourselves</option>
                          <option>Not Sure / Need Guidance</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Number of Pages</label>
                        <select name="numberOfPages" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black">
                          <option>1 - 5 Pages (Standard)</option>
                          <option>5 - 10 Pages</option>
                          <option>10 - 20 Pages</option>
                          <option>20+ Pages (Large)</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Required Features (Optional)</label>
                        <input name="requiredFeatures" type="text" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all" placeholder="e.g., Online Booking, Payment Gateway, User Accounts, Subscriptions" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Design & Budget */}
              <div className="space-y-6 pt-4">
                <h4 className="text-xl font-bold text-black border-b border-slate-200 pb-2">Design & Logistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Design Style</label>
                    <select name="preferredDesign" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black">
                      <option>Minimal & Clean</option>
                      <option>Bold & Colorful</option>
                      <option>Corporate & Professional</option>
                      <option>Dark Mode Premium</option>
                      <option>Custom / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range *</label>
                    <select 
                      name="budgetRange" 
                      required 
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black"
                    >
                      <option value="">Select budget</option>
                      <option value="$1 - $500">$1 - $500</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $10,000">$3,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Timeline *</label>
                    <select name="deliveryTimeline" required className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all appearance-none [&>option]:bg-white [&>option]:text-black">
                      <option value="">Select timeline</option>
                      <option>Rush (1-2 Weeks)</option>
                      <option>Standard (3-4 Weeks)</option>
                      <option>Flexible (1-2 Months)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Context */}
              <div className="space-y-6 pt-4">
                <h4 className="text-xl font-bold text-black border-b border-slate-200 pb-2">Additional Context</h4>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {selectedType === 'Custom Mobile Application' ? 'Reference App / Website URL' : 'Reference Website URL'}
                    </label>
                    <input name="referenceUrl" type="url" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all" placeholder="https://example.com" />
                  </div>
                  
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Branding / Reference Files (Optional)</label>
                    <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-black hover:bg-slate-50 transition-colors cursor-pointer group relative">
                      <input 
                        type="file" 
                        name="attachment" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        accept=".svg,.png,.jpg,.jpeg,.pdf,.zip" 
                        onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                      />
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors mb-3">
                        <Upload size={24} className="text-slate-600 group-hover:text-white" />
                      </div>
                      <p className="text-sm font-semibold text-black mb-1">
                        {fileName ? <span className="text-black font-extrabold break-words">{fileName}</span> : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-slate-500">SVG, PNG, JPG, PDF or ZIP (max. 50MB)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Extra Message / Project Description *</label>
                    <textarea name="message" required rows="4" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black transition-all resize-none" placeholder="Tell us more about your vision..."></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <button title="Interactive Button" aria-label="Interactive Button" 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full md:w-auto px-10 py-4 rounded-xl font-bold bg-black text-white hover:bg-slate-900 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mx-auto text-lg"
                >
                  {formState === 'submitting' ? 'Submitting...' : (
                    <>
                      Submit Project Request
                      <Send size={20} />
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-slate-500 mt-4">
                  By submitting this form, you agree to our privacy policy. We will contact you within 24 hours.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default OrderForm;

