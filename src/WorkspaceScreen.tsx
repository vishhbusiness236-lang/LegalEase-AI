import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoreVertical, Plus, Mic, ArrowUp, FileText, X, Download, Mail } from 'lucide-react';
import Markdown from 'react-markdown';
import html2pdf from 'html2pdf.js';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface WorkspaceScreenProps {
  data: any;
  currentSessionId?: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function WorkspaceScreen({ data, messages, setMessages }: WorkspaceScreenProps) {
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    const opt = {
      margin: 0.5,
      filename: 'document_analysis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = inputVal) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg = text;
    setInputVal('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg, 
          chatHistory: messages,
          base64Data: data.base64Data,
          mimeType: data.mimeType
        })
      });
      const resData = await res.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: resData.reply }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isMock = data.type === 'mock';

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center font-bold">
            <FileText size={16} />
          </div>
          <span className="text-sm font-medium text-gray-800">Document Analysis</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
          <button className="hover:text-gray-900 transition-colors">Share</button>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            U
          </div>
          <button className="text-gray-500 hover:text-gray-800 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden p-4 gap-4">
        
        {/* Left Side: Document View */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden relative">
           
           <div className="flex-1 overflow-y-auto p-12 lg:p-16 flex flex-col items-center">
              <div className="max-w-[700px] w-full">
                <h1 className="text-[32px] font-normal text-center mb-8 text-gray-800">
                  {data.originalFileName || "Source Document"}
                </h1>
                
                {data.base64Data && data.mimeType ? (
                  <div className="w-full h-full min-h-[600px] rounded overflow-hidden">
                    {data.mimeType.startsWith('image/') ? (
                      <img 
                        src={`data:${data.mimeType};base64,${data.base64Data}`} 
                        alt="Source document" 
                        className="w-full h-auto object-contain"
                      />
                    ) : data.mimeType === 'application/pdf' ? (
                      <iframe 
                        src={`data:application/pdf;base64,${data.base64Data}#toolbar=0`} 
                        className="w-full h-full min-h-[600px]"
                        title="PDF Viewer"
                      />
                    ) : (
                      <div className="text-gray-700 whitespace-pre-wrap break-words text-[15px] leading-relaxed">
                        {atob(data.base64Data)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6 opacity-30 text-center">
                     <p className="text-xl">Content goes here...</p>
                     <div className="h-4 bg-gray-400 w-3/4 mx-auto rounded"></div>
                     <div className="h-4 bg-gray-400 w-full rounded"></div>
                     <div className="h-4 bg-gray-400 w-5/6 mx-auto rounded"></div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Right Side: Chat View */}
        <div className="w-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative shrink-0">
          
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            
            {/* Initial Analysis Content */}
            <div className="self-start max-w-full w-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Analysis Result</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={handleDownloadPdf} 
                    className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors" 
                    title="Export as PDF document"
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    onClick={() => handleSend("Please format this analysis summary as a professional email message.")} 
                    className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors" 
                    title="Draft Email"
                  >
                    <Mail size={16} />
                  </button>
                </div>
              </div>
              <div className="text-gray-800 text-[15px] leading-relaxed" id="report-content">
                {isMock ? (
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-4">
                    <p className="font-medium mb-1">Notice</p>
                    <p className="text-gray-600 text-sm">This is mock data because no processing backend is connected.</p>
                  </div>
                ) : (
                  <div className="markdown-body prose prose-sm max-w-none text-gray-800 p-2">
                    <Markdown>{data.result}</Markdown>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Messages */}
            {messages.map((m, idx) => (
              <div key={idx} className={`max-w-[85%] text-[15px] ${m.role === 'user' ? 'self-end text-right' : 'self-start'}`}>
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full flex items-center justify-center">
                      <span className="text-[10px]">✨</span>
                    </div>
                  </div>
                )}
                
                {m.role === 'user' ? (
                  <div className="inline-block px-5 py-3 rounded-3xl bg-[#F0F2F5] text-gray-800 text-left">
                    {m.content}
                  </div>
                ) : (
                  <div className="leading-relaxed text-gray-800 whitespace-pre-wrap markdown-body prose prose-sm max-w-none">
                    <Markdown>{m.content}</Markdown>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="self-start text-gray-400 text-sm italic py-2">generating...</div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Floating Input Area */}
          <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
            <div className="relative bg-gray-50 rounded-[24px] border border-gray-200 p-2 pl-4 flex flex-col transition-shadow focus-within:ring-2 focus-within:ring-sky-100 focus-within:border-sky-300">
              
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about your document..." 
                className="w-full bg-transparent border-none outline-none text-[15px] text-gray-800 placeholder-gray-500 py-2 mb-1"
                disabled={isLoading}
              />
              
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors">
                    <Mic size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !inputVal.trim()}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      inputVal.trim() && !isLoading ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-700' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>
              
            </div>
            
            <div className="text-center mt-3">
              <p className="text-[11px] text-gray-400">
                DocAI may produce errors. Verify important information.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
