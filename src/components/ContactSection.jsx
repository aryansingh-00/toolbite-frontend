import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { FiInstagram as Instagram, FiTwitter as Twitter, FiLinkedin as Linkedin, FiGithub as Github } from 'react-icons/fi';

const ContactSection = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const form = e.target;
      const formData = new FormData(form);
      
      const response = await fetch("https://formsubmit.co/ajax/hello.toolbite@gmail.com", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 rounded-l-[100px] -z-10 hidden lg:block"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:hidden">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Let's Build Something Great</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Contact Info */}
          <div className="order-2 lg:order-1">
            <div className="hidden lg:block mb-12">
              <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Get In Touch</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">Ready to scale your<br/>digital presence?</h3>
              <p className="text-lg text-slate-600 max-w-lg">
                Partner with an engineering team that understands business strategy. Tell us about your objectives, timeline, and let's build something extraordinary.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-100 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Email Us</h4>
                <p className="text-sm text-slate-500 mb-2">For general inquiries</p>
                <a href="mailto:hello.toolbite@gmail.com" className="text-teal-600 font-bold hover:text-teal-700 transition-colors">hello.toolbite@gmail.com</a>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-100 transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Phone size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">WhatsApp / Call</h4>
                <p className="text-sm text-slate-500 mb-2">For urgent matters</p>
                <a href="tel:+919598037255" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">+91 9598037255</a>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">HQ Office</h4>
                <p className="text-sm text-slate-500 mb-2">Come say hello</p>
                <span className="text-slate-700 font-medium leading-tight block">New Delhi,<br/>India</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-purple-100 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Business Hours</h4>
                <p className="text-sm text-slate-500 mb-2">We are open</p>
                <span className="text-slate-700 font-medium leading-tight block">Monday - Friday<br/>9:00 AM - 6:00 PM EST</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Connect with us</h4>
              <div className="flex gap-3">
                <a href="/https://www.threads.com/@hello.toolbite" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                  <Twitter size={20} />
                </a>
                <a href="/https://www.instagram.com/hello.toolbite?igsh=MThncHh4ejk5YzQzdg==" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tool-bite-16ab8b3ba?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                  <Linkedin size={20} />
                </a>
                <a href="/https://github.com/aryansingh-00" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500"></div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h3>
            
            {status === 'sent' ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                <p className="text-slate-600 mb-8">We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-full border border-teal-500 text-teal-600 font-bold hover:bg-teal-50 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Submission via Contact Form - ToolBite" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                    <input name="name" required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input name="email" required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <select name="subject" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 appearance-none font-medium">
                    <option>General Inquiry</option>
                    <option>I want to buy a Ready-Made template</option>
                    <option>I need a Custom Website</option>
                    <option>Support & Billing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">How can we help?</label>
                  <textarea name="message" required rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none text-slate-900" placeholder="Tell us about your project..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 hover:shadow-teal-500/20 disabled:opacity-70 text-lg"
                >
                  {status === 'sending' ? 'Sending...' : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

