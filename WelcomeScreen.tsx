import React from 'react';
import { Upload, FileText, Search, ShieldCheck, ArrowRight, BookOpen, Clock, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onUpload: () => void;
}

const steps = [
  {
    icon: <FileText size={24} className="text-text-primary" />,
    title: "1. Upload Document",
    description: "Securely upload your financial hold notice, tuition statement, or administrative letter."
  },
  {
    icon: <Search size={24} className="text-text-primary" />,
    title: "2. AI Analysis",
    description: "Our system instantly extracts deadlines, amounts due, and crucial context."
  },
  {
    icon: <Lightbulb size={24} className="text-text-primary" />,
    title: "3. Clear Next Steps",
    description: "Get a plain-English explanation and a concrete checklist to resolve your hold."
  }
];

const features = [
  {
    title: "No confusing jargon",
    description: "We translate complex administrative language into simple, direct terms.",
    icon: <BookOpen size={20} className="text-text-secondary" />
  },
  {
    title: "Deadline extraction",
    description: "Never miss a payment or appeal date. We highlight every critical deadline.",
    icon: <Clock size={20} className="text-text-secondary" />
  },
  {
    title: "Verified resources",
    description: "We connect you to the official offices and forms you need to fix the issue.",
    icon: <ShieldCheck size={20} className="text-text-secondary" />
  }
];

export function WelcomeScreen({ onUpload }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 w-full max-w-5xl mx-auto relative pt-12 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-text-secondary mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse"></span>
            Private & Secure AI Analysis
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6 leading-[1.1]">
            Understand your <br className="hidden sm:block" /> financial hold instantly.
          </h1>
          <p className="text-lg sm:text-xl text-text-muted mb-16 max-w-2xl mx-auto leading-relaxed">
            Upload your university document to get a clear explanation of your balance, deadlines, and the exact steps to resolve it.
          </p>

          <div 
            onClick={onUpload}
            className="border-2 border-card-border border-dashed bg-card rounded-[32px] p-12 sm:p-24 flex flex-col items-center justify-center cursor-pointer hover:bg-[#202020] hover:border-white/30 transition-all group w-full max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="bg-canvas p-5 rounded-full mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 shadow-xl border border-white/5 relative z-10">
              <Upload size={40} className="text-text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-text-primary mb-3 relative z-10 tracking-tight">Click or drop a document</h3>
            <p className="text-text-muted text-lg relative z-10">
              Supported formats: PDF, PNG, JPG, Screenshots
            </p>
          </div>
        </motion.div>
      </section>

      {/* How it works section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-32 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-5 tracking-tight">How it works</h2>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">From confusing paperwork to a clear action plan in seconds.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card border border-card-border rounded-[24px] p-8 relative overflow-hidden group hover:border-white/20 transition-colors shadow-lg"
            >
              <div className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:scale-105 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-32 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-6 leading-[1.15] tracking-tight">
              Designed for clarity. <br/>Built for peace of mind.
            </h2>
            <p className="text-text-muted text-lg lg:text-xl mb-12 leading-relaxed">
              University bureaucracy is stressful enough. We strip away the complicated terminology and give you the bottom line so you can take back control of your education.
            </p>
            
            <div className="space-y-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-text-primary mb-2 tracking-tight">{feature.title}</h4>
                    <p className="text-text-muted leading-relaxed text-lg">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#161616] border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl relative"
          >
            {/* Mocked UI snippet to show value visually without being distracting */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
              <div className="text-sm font-medium text-text-primary tracking-wide">Analysis Complete</div>
            </div>
            
            <div className="space-y-5">
              <div className="bg-[#202020] border border-white/5 rounded-2xl p-6 hover:bg-[#252525] transition-colors cursor-default">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">Bottom Line</div>
                <div className="text-base text-text-primary font-medium">Pay the $2,450 balance or set up a payment plan to remove the registration block.</div>
              </div>
              <div className="bg-[#202020] border border-white/5 rounded-2xl p-6 hover:bg-[#252525] transition-colors cursor-default">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">Deadline</div>
                <div className="text-lg font-semibold text-white tracking-tight">August 15, 2026</div>
              </div>
              <div className="bg-[#202020] border border-white/5 rounded-2xl p-6 hover:bg-[#252525] transition-colors cursor-default">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">Steps to resolve</div>
                <div className="flex items-center gap-4 text-text-secondary">
                  <div className="w-5 h-5 rounded-[6px] border-[1.5px] border-white/20 flex-shrink-0"></div>
                  <span className="text-base">Review account balance</span>
                </div>
                <div className="flex items-center gap-4 text-text-secondary mt-4">
                  <div className="w-5 h-5 rounded-[6px] border-[1.5px] border-white/20 flex-shrink-0"></div>
                  <span className="text-base">Submit payment via portal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-4xl mx-auto px-4 text-center mt-12 pb-32">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6 }}
           className="bg-card border border-white/10 rounded-[32px] p-16 relative overflow-hidden"
         >
           <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent"></div>
           <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary mb-6 tracking-tight relative z-10">Ready to clear your hold?</h2>
           <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto relative z-10">Upload your document now and get actionable steps in 10 seconds.</p>
           <button 
             onClick={onUpload}
             className="relative z-10 bg-white text-black px-10 py-5 rounded-full font-medium text-lg hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 shadow-xl"
           >
             Upload Document <ArrowRight size={20} />
           </button>
         </motion.div>
      </section>
    </div>
  );
}
