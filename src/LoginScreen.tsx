import React from 'react';
import { motion } from 'motion/react';
import { Brain, FileText, CheckCircle, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const features = [
    { icon: <FileText size={18} className="text-sky-600" />, text: "Upload documents to extract insights & summaries instantly." },
    { icon: <CheckCircle size={18} className="text-sky-600" />, text: "Get a clear, actionable breakdown of complex paperwork." },
    { icon: <Shield size={18} className="text-sky-600" />, text: "Secure, private, and automated AI analysis." }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-sky-50 via-sky-100 to-white font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[960px] flex flex-col md:flex-row bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl overflow-hidden border border-white/50"
      >
        {/* Left Side: Onboarding Features */}
        <div className="flex-1 p-10 md:p-14 bg-sky-50 text-gray-800 flex flex-col justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/50">
          {/* Decorative background glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-sky-100">
              <Brain size={32} className="text-sky-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight leading-snug">
              Understand your documents instantly.
            </h1>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Upload complex paperwork and extract key insights in seconds.
            </p>
            
            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-white shadow-sm">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm">
                    {f.icon}
                  </div>
                  <span className="text-gray-700 font-medium text-[15px]">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Login */}
        <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center bg-white">
          <div className="text-center w-full max-w-xs">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 mb-10 text-[15px]">Sign in to access your workspace</p>
            
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 shadow-sm rounded-full py-3.5 px-4 hover:bg-gray-50 hover:shadow-md transition-all font-medium text-gray-700 active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="mt-10 text-xs text-gray-400 text-center leading-relaxed">
              By continuing, you agree to our <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
