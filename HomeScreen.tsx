import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Globe, HardDrive, Copy, Search, AlertCircle, FileText } from 'lucide-react';

interface HomeScreenProps {
  onUpload: (file: File, instruction: string) => void;
}

export function HomeScreen({ onUpload }: HomeScreenProps) {
  const [instruction, setInstruction] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, instruction);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUpload(file, instruction);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-sky-50 via-white to-sky-50 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-sky-100">
          <FileText size={32} className="text-sky-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight text-gray-800 text-center">
          What would you like to analyze?
        </h1>
        <p className="text-gray-500 mb-10 text-center text-lg">Upload your documents or search the web to extract insights.</p>

        {/* Upload Container - Replicating the image UI */}
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
          
          {/* Drop Zone Area */}
          <div 
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-200 bg-[#F9F9FA] rounded-[24px] p-10 flex flex-col items-center justify-center text-center transition-colors relative hover:bg-gray-50"
          >
            <input 
              type="file" 
              id="file-upload" 
              accept="image/*,application/pdf"
              className="hidden" 
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center absolute inset-0 z-10" />
            
            <div className="relative z-20 pointer-events-none flex flex-col items-center w-full">
              <p className="text-[20px] font-medium text-gray-800 mb-1">or drop your files</p>
              <p className="text-[14px] text-gray-500 mb-8">PDF and Image files only</p>
              
              <div className="flex items-center justify-center flex-wrap gap-3 pointer-events-auto w-full">
                <label 
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Upload size={16} />
                  Upload files
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-1.5 opacity-80">
          <AlertCircle size={12} />
          DocAI models can make mistakes.
        </div>
      </motion.div>
    </div>
  );
}
