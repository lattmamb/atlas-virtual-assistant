
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/chat-input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Image, MessageSquare, Workflow, Users, Map, Menu, Moon, Sun, Home, Book, Store, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import KnowledgeBase from './KnowledgeBase';
import GptStore from './GptStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AtlasLink: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celestialMode, setCelestialMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'knowledge' | 'store' | 'settings'>('dashboard');
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
  const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);
  
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
    
    // Add selected instruction context if any is selected
    let messageToSend = inputMessage;
    if (selectedInstruction) {
      messageToSend = `[Instruction: ${selectedInstruction}] ${inputMessage}`;
    }
    
    addMessage(messageToSend, 'user');
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = !apiKeys.openai
        ? 'Please provide an OpenAI API key in the sidebar first.'
        : `AI: You said "${messageToSend}". This is a placeholder response.`;
      
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
          
          <div className="space-y-1">
            <Button
              variant={activeTab === 'dashboard' ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab('dashboard')}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button
              variant={activeTab === 'chat' ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
            
            <Button
              variant={activeTab === 'knowledge' ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab('knowledge')}
            >
              <Book className="mr-2 h-4 w-4" />
              Knowledge Base
            </Button>
            
            <Button
              variant={activeTab === 'store' ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab('store')}
            >
              <Store className="mr-2 h-4 w-4" />
              GPT Store
            </Button>
            
            <Button
              variant={activeTab === 'settings' ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
          
          {activeTab === 'settings' && (
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
          )}
          
          {activeTab === 'chat' && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {selectedInstruction ? `Using: ${selectedInstruction}` : 'No instruction selected'}
                </p>
                <Button 
                  onClick={() => setSelectedInstruction(null)} 
                  variant="outline" 
                  size="sm"
                  disabled={!selectedInstruction}
                  className="w-full"
                >
                  Clear Instruction
                </Button>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'dashboard' && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Workflow Automations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{automationStatus}</p>
                <Button onClick={handleScheduleAutomation} className="w-full">Schedule Task</Button>
              </CardContent>
            </Card>
          )}
          
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
          <h1 className="text-xl font-semibold">
            {activeTab === 'dashboard' && "Atlas Link Dashboard"}
            {activeTab === 'chat' && "AI Assistant"}
            {activeTab === 'knowledge' && "Knowledge Base"}
            {activeTab === 'store' && "GPT Store"}
            {activeTab === 'settings' && "Settings"}
          </h1>
          <div className="flex gap-2">
            {/* Additional header actions can go here */}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'dashboard' && (
            <div className="dashboard-grid overscroll-bounce">
              {/* Calendar Tile */}
              <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Calendar</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>June 2025<br/>No events today.</p>
                </div>
              </Card>
              
              {/* Mail Tile */}
              <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Mail</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Inbox is empty</p>
                </div>
              </Card>
              
              {/* Photos Tile */}
              <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                <div className="flex items-center gap-2 mb-3">
                  <Image className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Photos</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>No recent photos</p>
                </div>
              </Card>
              
              {/* Atlas AI Assistant */}
              <Card className={cn(
                "h-[300px] flex flex-col col-span-2 row-span-2",
                celestialMode ? "dark-apple-card" : "apple-card"
              )}>
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
              <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                <div className="flex items-center gap-2 mb-3">
                  <Workflow className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Workflow Builder</h3>
                </div>
                <div className="workflow-canvas">
                  <span>Drag nodes here (future feature)</span>
                </div>
              </Card>
              
              {/* Social Feed */}
              <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
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
              <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                <div className="flex items-center gap-2 mb-3">
                  <Map className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Mobility & Charging</h3>
                </div>
                <div className="mobility-map">
                  <p>Live map & charging hubs coming soon...</p>
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'chat' && (
            <div className="p-4 h-full">
              <Card className={cn(
                "h-full flex flex-col",
                celestialMode ? "dark-apple-card" : "apple-card"
              )}>
                <CardContent className="flex-1 p-4 flex flex-col">
                  <div className="chat-messages flex-1 overflow-y-auto mb-4">
                    {messages.map(message => (
                      <div key={message.id} className={cn(
                        "mb-4 p-3 rounded-lg max-w-[80%]",
                        message.role === 'user' 
                          ? "ml-auto bg-primary text-primary-foreground" 
                          : "mr-auto bg-muted"
                      )}>
                        {message.content}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <ChatInput
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'knowledge' && (
            <div className="p-4 h-full">
              <KnowledgeBase isDarkMode={celestialMode} />
            </div>
          )}
          
          {activeTab === 'store' && (
            <div className="p-4 h-full">
              <GptStore isDarkMode={celestialMode} />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="p-4 h-full">
              <Tabs defaultValue="api" className="h-full flex flex-col">
                <TabsList className="mb-4">
                  <TabsTrigger value="api">API Keys</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                
                <div className="flex-1 overflow-auto">
                  <TabsContent value="api" className="h-full">
                    <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                      <CardHeader>
                        <CardTitle>API Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">OpenAI API Key</label>
                          <Input 
                            type="password" 
                            placeholder="sk-..." 
                            value={apiKeys.openai}
                            onChange={e => setApiKeys({...apiKeys, openai: e.target.value})}
                          />
                          <p className="text-xs text-muted-foreground">Used for chat and workflow automation</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">HuggingFace API Key</label>
                          <Input 
                            type="password" 
                            placeholder="hf_..." 
                            value={apiKeys.huggingface}
                            onChange={e => setApiKeys({...apiKeys, huggingface: e.target.value})}
                          />
                          <p className="text-xs text-muted-foreground">Used for additional AI models</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Supabase API Key</label>
                          <Input 
                            type="password" 
                            placeholder="eyJ..." 
                            value={apiKeys.supabase}
                            onChange={e => setApiKeys({...apiKeys, supabase: e.target.value})}
                          />
                          <p className="text-xs text-muted-foreground">Used for data storage</p>
                        </div>
                        
                        <Button onClick={handleSaveApiKeys} className="w-full">Save API Keys</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="h-full">
                    <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                      <CardHeader>
                        <CardTitle>Appearance Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Theme</label>
                          <div className="flex gap-2">
                            <Button 
                              variant={!celestialMode ? "default" : "outline"} 
                              onClick={() => setCelestialMode(false)}
                              className="flex-1"
                            >
                              <Sun className="mr-2 h-4 w-4" />
                              Light
                            </Button>
                            <Button 
                              variant={celestialMode ? "default" : "outline"} 
                              onClick={() => setCelestialMode(true)}
                              className="flex-1"
                            >
                              <Moon className="mr-2 h-4 w-4" />
                              Dark
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="account" className="h-full">
                    <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Account settings coming soon...</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mobile-navigation">
          <Button 
            variant="ghost" 
            size="icon" 
            className="tap-highlight no-select"
            onClick={() => setActiveTab('dashboard')}
          >
            <Home size={24} className={activeTab === 'dashboard' ? "text-primary" : ""} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="tap-highlight no-select"
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={24} className={activeTab === 'chat' ? "text-primary" : ""} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="tap-highlight no-select"
            onClick={() => setActiveTab('knowledge')}
          >
            <Book size={24} className={activeTab === 'knowledge' ? "text-primary" : ""} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="tap-highlight no-select"
            onClick={() => setActiveTab('store')}
          >
            <Store size={24} className={activeTab === 'store' ? "text-primary" : ""} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="tap-highlight no-select"
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AtlasLink;
