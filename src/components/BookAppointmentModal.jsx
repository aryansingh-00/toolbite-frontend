import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, CalendarCheck, ArrowRight, Sparkles, Send } from 'lucide-react';
import { submitForm } from '../lib/formSubmitter';
import { toast } from 'react-hot-toast';

const SERVICES = [
  { id: 'web-dev', name: 'Custom Web Design & Engineering', desc: 'High-performance websites & corporate platforms' },
  { id: 'app-dev', name: 'Mobile App Development', desc: 'Native & cross-platform iOS/Android apps' },
  { id: 'templates', name: 'Ready-Made Website Templates', desc: 'Rapid deployment platforms & vault themes' },
  { id: 'ai-tools', name: 'AI Software & Custom Integration', desc: 'Automated AI utilities, tools & SaaS engines' },
  { id: 'strategy', name: 'Brand Audit & Growth Strategy', desc: 'ROI calculation & technical performance audit' }
];

const TIME_SLOTS = [
  '10:00 AM IST',
  '11:30 AM IST',
  '02:00 PM IST',
  '04:00 PM IST',
  '06:00 PM IST'
];

const BookAppointmentModal = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState('web-dev');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('11:30 AM IST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);
    const serviceName = SERVICES.find(s => s.id === selectedService)?.name || selectedService;

    const emailSubject = `Appointment Request: ${serviceName} - ${name}`;
    const emailBody = `Hi ToolBite Team,

I would like to book a project consultation / appointment.

📅 Preferred Date: ${selectedDate}
⏰ Preferred Time: ${selectedTime}
🚀 Service Required: ${serviceName}

👤 Name: ${name}
✉️ Email: ${email}
📞 Phone/WhatsApp: ${phone || 'Not provided'}
💬 Project Brief / Notes: ${notes || 'N/A'}

Looking forward to hearing from you!`;

    // 1. Dispatch background email form notification
    try {
      await submitForm({
        _subject: emailSubject,
        name,
        email,
        phone,
        service: serviceName,
        date: selectedDate,
        time: selectedTime,
        notes,
        source: 'Appointment Modal'
      });
    } catch (err) {
      console.error('Background form error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // 2. Launch direct mailto to hello.toolbite@gmail.com
    const mailtoUrl = `mailto:hello.toolbite@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');
    toast.success('Opening your email client to send the appointment details!');
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-8"
          >
            {/* Top Bar Accent */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-indigo-500 to-accent" />

            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl">
                  <CalendarCheck size={26} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Book an Appointment
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    Schedule a 1-on-1 strategy call with ToolBite engineers
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            {isSuccess ? (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-teal-500/10 text-teal-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Appointment Request Ready!
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Your appointment details have been prepared. If your email application didn't open automatically, you can email us directly at{' '}
                  <a href="mailto:hello.toolbite@gmail.com" className="text-teal-600 font-bold underline">
                    hello.toolbite@gmail.com
                  </a>.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-md hover:opacity-90 transition-all text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    1. Select Service / Topic
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedService === s.id
                            ? 'bg-teal-500/10 border-teal-500 text-teal-900 dark:text-teal-300 ring-2 ring-teal-500/20'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p className="font-bold text-xs sm:text-sm leading-tight mb-1">{s.name}</p>
                        <p className="text-[11px] opacity-70 leading-normal">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      2. Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      3. Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t} className="text-slate-900 dark:text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Inputs */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    4. Your Contact Info
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative mb-3">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <textarea
                      rows={2}
                      placeholder="Brief notes about your project or requirements..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Footer Submit */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-slate-400 text-center sm:text-left">
                    Direct email dispatch to <strong className="text-slate-700 dark:text-slate-300">hello.toolbite@gmail.com</strong>
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-teal-500/25 transition-all text-xs sm:text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending Request...'
                    ) : (
                      <>
                        <Send size={16} />
                        Confirm & Email Appointment
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookAppointmentModal;
