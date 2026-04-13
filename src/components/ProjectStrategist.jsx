import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  FileDown, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  DollarSign
} from 'lucide-react';
import { jsPDF } from 'jspdf';

const questions = [
  { id: 'name', text: "Hello! I'm the ToolBite AI Strategist. Let's start with your name?", type: 'text' },
  { id: 'goal', text: "Great to meet you! What is the primary goal of your new project? (e.g., Sell products, Generate leads, Brand showcase)", type: 'text' },
  { id: 'audience', text: "Perfect. Who is your target audience? Who are we building this for?", type: 'text' },
  { id: 'budget', text: "Got it. What's your estimated budget range for this build?", type: 'choice', options: ['$1k - $3k', '$3k - $10k', '$10k - $25k', '$25k+'] },
  { id: 'timeline', text: "Understood. When would you ideally like to launch?", type: 'choice', options: ['ASAP (1-2 weeks)', 'Standard (4-6 weeks)', 'Flexible (2+ months)'] },
  { id: 'features', text: "Last one: Any 'Must-Have' features? (e.g., Blog, Dashboard, E-commerce, AI search)", type: 'text' }
];

const ProjectStrategist = () => {
  const [messages, setMessages] = useState([{ role: 'bot', content: questions[0].text }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isFinishing, setIsFinishing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text) => {
    const response = text || inputValue;
    if (!response && !text) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: response }];
    setMessages(newMessages);
    
    // Save answer
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: response };
    setAnswers(newAnswers);
    setInputValue('');

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: questions[currentQuestionIndex + 1].text }]);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 600);
    } else {
      finishStrategist();
    }
  };

  const finishStrategist = () => {
    setIsFinishing(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: "AI Strategy Engine processing... analyzing your requirements with ToolBite benchmarks." }]);
    }, 800);

    setTimeout(() => {
      setIsFinishing(false);
      setIsComplete(true);
    }, 3000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Styling
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('ToolBite Project Strategy Brief', 20, 25);
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(`Generated for: ${answers.name || 'Valued Client'}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
    
    doc.setDrawColor(20, 184, 166); // teal-500
    doc.setLineWidth(1);
    doc.line(20, 60, 190, 60);
    
    // Content sections
    let y = 75;
    const sections = [
      { label: 'PROJECT GOAL', value: answers.goal, icon: 'Target' },
      { label: 'TARGET AUDIENCE', value: answers.audience, icon: 'Users' },
      { label: 'BUDGET RANGE', value: answers.budget, icon: 'Budget' },
      { label: 'TIMELINE', value: answers.timeline, icon: 'Time' },
      { label: 'REQUIRED FEATURES', value: answers.features, icon: 'Features' }
    ];
    
    sections.forEach(s => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(s.label, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const textLines = doc.splitTextToSize(s.value || 'Not specified', 160);
      doc.text(textLines, 20, y + 7);
      y += (textLines.length * 7) + 15;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Confidential Strategy Document | ToolBite Agency 2.0', 105, 285, { align: 'center' });
    
    doc.save(`ToolBite_Strategy_${answers.name || 'Brief'}.pdf`);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden" id="ai-strategist">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full font-bold text-sm mb-6 border border-teal-500/20">
              <Sparkles size={16} />
              AI-Powered Project Scoping
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
              Build with <span className="text-teal-500">Perfect Clarity.</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-xl">
              Don't guess your project requirements. Chat with our AI Strategist to define your goals, scope features, and receive a professional Strategy Brief in minutes.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <TrendingUp className="text-teal-500" />, title: "Benchmark Analysis", desc: "We compare your goals against high-conversion market standards." },
                { icon: <Target className="text-emerald-500" />, title: "Strategic Alignment", desc: "Ensure your features match your target audience's true needs." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat UI */}
          <div className="relative">
            {/* Background elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10"></div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
              
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">AI Strategist</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Online now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 max-h-[400px]">
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-slate-100 dark:bg-slate-800 text-teal-500' : 'bg-teal-500 text-white'}`}>
                        {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === 'bot' ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none' : 'bg-teal-500 text-white rounded-tr-none shadow-lg shadow-teal-500/20'}`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isFinishing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-teal-500 flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl rounded-tl-none flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Strategy Complete!</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium">
                      Your business requirements have been analyzed. Download your professional Strategy Brief below.
                    </p>
                    <button
                      onClick={generatePDF}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 group"
                    >
                      Download My Strategy Brief
                      <FileDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => {
                        setMessages([{ role: 'bot', content: questions[0].text }]);
                        setCurrentQuestionIndex(0);
                        setAnswers({});
                        setIsComplete(false);
                      }}
                      className="mt-6 text-slate-400 text-sm font-bold hover:text-teal-500 transition-colors"
                    >
                      Start Over
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              {!isComplete && !isFinishing && (
                <div className="p-8 pt-0 border-t border-slate-100 dark:border-slate-800">
                  {questions[currentQuestionIndex].type === 'choice' ? (
                    <div className="grid grid-cols-2 gap-3 mt-8">
                      {questions[currentQuestionIndex].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(opt)}
                          className="py-3 px-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-50 dark:bg-slate-950 transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="relative mt-8 group">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 dark:text-white transition-all pr-16"
                      />
                      <button
                        onClick={() => handleSend()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-teal-500 text-white rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-colors disabled:opacity-50"
                        disabled={!inputValue}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  )}
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] mt-6">
                    Powered by ToolBite AI Engine
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectStrategist;
