
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/chat-input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Image, MessageSquare, Workflow, Users, Map, Menu, Moon, Sun, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AtlasLink: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celestialMode, setCelestialMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Atlas AI. Ask me anything, or explore the iCloud-style dashboard.",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    huggingface: '',
    supabase: ''
  });
  const [automationStatus, setAutomationStatus] = useState('No tasks scheduled.');
  
  // Generate stars effect for celestial mode
  useEffect(() => {
    if (celestialMode) {
      generateStars();
    }
  }, [celestialMode]);
  
  const generateStars = () => {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    starsContainer.innerHTML = '';
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
  };
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleCelestialMode = () => setCelestialMode(!celestialMode);
  
  const handleSaveApiKeys = () => {
    alert('API Keys saved securely!');
  };
  
  const handleScheduleAutomation = () => {
    if (!apiKeys.supabase) {
      alert('Please provide a Supabase Key for automation scheduling.');
      return;
    }
    
    setAutomationStatus('Scheduling...');
    addMessage('Scheduling an automation task...', 'user');
    
    setTimeout(() => {
      setAutomationStatus('Task scheduled successfully!');
      addMessage('Automation task scheduled via Atlas Link workflow!', 'assistant');
    }, 1000);
  };
  
  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    addMessage(inputMessage, 'user');
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = !apiKeys.openai
        ? 'Please provide an OpenAI API key in the sidebar first.'
        : `AI: You said "${inputMessage}". This is a placeholder response.`;
      
      addMessage(aiResponse, 'assistant');
    }, 600);
  };
  
  return (
    <div className={cn("h-screen flex flex-col md:flex-row overflow-hidden", 
      celestialMode ? "celestial-bg" : "bg-gradient-to-br from-blue-50 to-slate-100")}>
      
      {/* Stars container for celestial mode */}
      {celestialMode && (
        <div id="starsContainer" className="absolute inset-0 pointer-events-none z-0"></div>
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "md:w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r z-20 transition-transform duration-300",
        "flex flex-col justify-between",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-primary">Atlas Link</h2>
            <p className="text-sm text-muted-foreground">Powered by Agentic AI</p>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input 
                type="password" 
                placeholder="OpenAI Key" 
                value={apiKeys.openai}
                onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
              />
              <Input 
                type="password" 
                placeholder="HuggingFace Key" 
                value={apiKeys.huggingface}
                onChange={e => setApiKeys({...apiKeys, huggingface: e.target.value})}
              />
              <Input 
                type="password" 
                placeholder="Supabase Key" 
                value={apiKeys.supabase}
                onChange={e => setApiKeys({...apiKeys, supabase: e.target.value})}
              />
              <Button onClick={handleSaveApiKeys} className="w-full">Save Keys</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Workflow Automations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{automationStatus}</p>
              <Button onClick={handleScheduleAutomation} className="w-full">Schedule Task</Button>
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            onClick={toggleCelestialMode} 
            className="w-full flex items-center gap-2"
          >
            {celestialMode ? <Sun size={18} /> : <Moon size={18} />}
            {celestialMode ? "Normal Mode" : "Celestial Mode"}
          </Button>
        </div>
        
        <div className="p-4 text-center text-xs text-muted-foreground border-t">
          <p>© 2025 Atlas Intelligence LLC</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b p-3 flex items-center justify-between z-10">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu />
          </Button>
          <h1 className="text-xl font-semibold">Atlas Link Dashboard</h1>
          <div className="flex gap-2">
            {/* Additional header actions can go here */}
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="dashboard-grid overscroll-bounce">
          {/* Calendar Tile */}
          <Card className="apple-card dark:dark-apple-card">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Calendar</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>June 2025<br/>No events today.</p>
            </div>
          </Card>
          
          {/* Mail Tile */}
          <Card className="apple-card dark:dark-apple-card">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Mail</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Inbox is empty</p>
            </div>
          </Card>
          
          {/* Photos Tile */}
          <Card className="apple-card dark:dark-apple-card">
            <div className="flex items-center gap-2 mb-3">
              <Image className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Photos</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>No recent photos</p>
            </div>
          </Card>
          
          {/* Atlas AI Assistant */}
          <Card className="apple-card dark:dark-apple-card h-[300px] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Atlas AI Assistant</h3>
            </div>
            <div className="chat-box flex-1">
              <div className="chat-messages">
                {messages.map(message => (
                  <div key={message.id} className={message.role === 'user' ? 'user-message' : 'ai-message'}>
                    {message.content}
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <ChatInput
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage} className="ml-2">Send</Button>
              </div>
            </div>
          </Card>
          
          {/* Workflow Builder */}
          <Card className="apple-card dark:dark-apple-card">
            <div className="flex items-center gap-2 mb-3">
              <Workflow className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Workflow Builder</h3>
            </div>
            <div className="workflow-canvas">
              <span>Drag nodes here (future feature)</span>
            </div>
          </Card>
          
          {/* Social Feed */}
          <Card className="apple-card dark:dark-apple-card">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Social Feed</h3>
            </div>
            <div className="social-feed">
              <div className="social-post">User123: Checking out Atlas Link!</div>
              <div className="social-post">User456: Loving the new AI workflow features!</div>
            </div>
          </Card>
          
          {/* Mobility & Charging */}
          <Card className="apple-card dark:dark-apple-card">
            <div className="flex items-center gap-2 mb-3">
              <Map className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Mobility & Charging</h3>
            </div>
            <div className="mobility-map">
              <p>Live map & charging hubs coming soon...</p>
            </div>
          </Card>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mobile-navigation">
          <Button variant="ghost" size="icon" className="tap-highlight no-select">
            <Home size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="tap-highlight no-select">
            <MessageSquare size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="tap-highlight no-select">
            <Workflow size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="tap-highlight no-select">
            <Users size={24} />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="tap-highlight no-select">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AtlasLink;
