import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle } from './firebase';
import { LoginScreen } from './LoginScreen';
import { HomeScreen } from './HomeScreen';
import { ProcessingScreen } from './ProcessingScreen';
import { WorkspaceScreen, Message } from './WorkspaceScreen';
import { Sidebar } from './components/Sidebar';
import { FlowState } from './types';
import { mockReport } from './data';

interface Session {
  id: string;
  title: string;
  data: any;
  messages: Message[];
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [flowState, setFlowState] = useState<FlowState>('LOGIN');
  const [workspaceData, setWorkspaceData] = useState<any>(null);
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Helper to get current messages
  const currentMessages = sessions.find(s => s.id === currentSessionId)?.messages || [];

  const setCurrentMessages = (updater: React.SetStateAction<Message[]>) => {
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        const nextMessages = typeof updater === 'function' ? updater(s.messages) : updater;
        return { ...s, messages: nextMessages };
      }
      return s;
    }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && flowState === 'LOGIN') {
        setFlowState('HOME');
      }
    });
    return () => unsubscribe();
  }, [flowState]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      setFlowState('HOME');
    } catch (e) {
      console.error(e);
      // Fallback to mock login if firebase fails
      setFlowState('HOME');
    }
  };

  const handleNewChat = () => {
    setWorkspaceData(null);
    setCurrentSessionId(undefined);
    setFlowState('HOME');
  };

  const handleSelectSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setWorkspaceData(session.data);
      setCurrentSessionId(id);
      setFlowState('WORKSPACE');
    }
  };

  const handleUpload = async (file: File, instruction: string) => {
    setFlowState('PROCESSING');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (instruction) {
        formData.append('instruction', instruction);
      }
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const newSessionParams: Session = {
        id: Date.now().toString(),
        title: file.name,
        data: data,
        messages: []
      };
      
      setSessions(prev => [newSessionParams, ...prev]);
      setCurrentSessionId(newSessionParams.id);
      setWorkspaceData(data);
      setFlowState('WORKSPACE');
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error parsing document. Falling back to mock data.");
      
      const newSessionParams: Session = {
        id: Date.now().toString(),
        title: "Mock Document",
        data: { ...mockReport, type: 'mock' },
        messages: []
      };
      
      setSessions(prev => [newSessionParams, ...prev]);
      setCurrentSessionId(newSessionParams.id);
      setWorkspaceData(newSessionParams.data);
      setFlowState('WORKSPACE');
    }
  };

  if (flowState === 'LOGIN') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#F0F2F5] text-text-primary selection:bg-sky-100 selection:text-sky-900 font-sans">
      <Sidebar 
        onNewChat={handleNewChat}
        sessions={sessions}
        onSelectSession={handleSelectSession}
        currentSessionId={currentSessionId}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 overflow-hidden relative">
        {flowState === 'HOME' && <HomeScreen onUpload={handleUpload} />}
        {flowState === 'PROCESSING' && <ProcessingScreen />}
        {flowState === 'WORKSPACE' && (
          <WorkspaceScreen 
            data={workspaceData} 
            currentSessionId={currentSessionId} 
            messages={currentMessages}
            setMessages={setCurrentMessages}
          />
        )}
      </div>
    </div>
  );
}



