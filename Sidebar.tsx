import React, { useState } from 'react';
import { Pencil, Search, LayoutGrid, MessageSquare, Menu, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  onNewChat: () => void;
  sessions: any[];
  onSelectSession: (id: string) => void;
  currentSessionId?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ onNewChat, sessions, onSelectSession, currentSessionId, isOpen, setIsOpen }: SidebarProps) {
  
  return (
    <div className={`flex flex-col bg-[#F9F9FA] border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} shrink-0 h-screen overflow-hidden relative`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-full transition-colors shrink-0"
          >
            <Menu size={20} />
          </button>
          {isOpen && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg text-gray-700 tracking-tight">DocAI</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-2 pt-2 flex flex-col gap-1">
        <button 
          onClick={onNewChat}
          className={`flex items-center gap-3 w-full p-2.5 rounded-full hover:bg-gray-200 transition-colors ${!isOpen ? 'justify-center' : ''}`}
        >
          <Pencil size={20} className="shrink-0 text-gray-600" />
          {isOpen && <span className="font-medium text-gray-700 text-[14px]">New chat</span>}
        </button>
        
        <button className={`flex items-center gap-3 w-full p-2.5 rounded-full hover:bg-gray-200 transition-colors ${!isOpen ? 'justify-center' : ''}`}>
          <Search size={20} className="shrink-0 text-gray-600" />
          {isOpen && <span className="font-medium text-gray-700 text-[14px]">Search chats</span>}
        </button>

        <button className={`flex items-center gap-3 w-full p-2.5 rounded-full hover:bg-gray-200 transition-colors ${!isOpen ? 'justify-center' : ''}`}>
          <LayoutGrid size={20} className="shrink-0 text-gray-600" />
          {isOpen && <span className="font-medium text-gray-700 text-[14px]">Library</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 mt-2">
        {isOpen && sessions.length > 0 && (
          <div className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Recent
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          {sessions.map((session, idx) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-colors text-left ${session.id === currentSessionId ? 'bg-sky-100 text-sky-800' : 'hover:bg-gray-200 text-gray-700'} ${!isOpen ? 'justify-center rounded-full' : ''}`}
              title={session.title || 'Source Document'}
            >
              <MessageSquare size={18} className="shrink-0" />
              {isOpen && (
                <span className="text-[13px] font-medium truncate w-full">
                  {session.title || 'Document Analysis'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
