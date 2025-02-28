
import React, { useState } from 'react';
import { Apple, Mail, Calendar, Image, Cloud, FileText, List, BarChart3, ChevronDown } from 'lucide-react';
import Widget from './Widget';
import { Link } from 'react-router-dom';
import { useChat } from '@/context/ChatContext';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Button } from '@/components/ui/button';

const AppIcon = ({ icon, label, notification }: { icon: React.ReactNode, label: string, notification?: number }) => (
  <div className="icloud-app-item">
    <div className="relative">
      <div className="icloud-icon">{icon}</div>
      {notification && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {notification}
        </div>
      )}
    </div>
    <span className="text-xs text-white">{label}</span>
  </div>
);

const ICloudLayout = () => {
  const { messages, clearMessages } = useChat();
  const [backgroundChoice, setBackgroundChoice] = useState<string>('bg-gradient-to-br from-blue-800 to-blue-600');
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
  
  const backgroundOptions = [
    { name: 'Blue', value: 'bg-gradient-to-br from-blue-800 to-blue-600' },
    { name: 'Purple', value: 'bg-gradient-to-br from-purple-800 to-indigo-700' },
    { name: 'Green', value: 'bg-gradient-to-br from-emerald-700 to-teal-600' },
    { name: 'Dark', value: 'bg-gradient-to-br from-gray-900 to-gray-800' }
  ];

  return (
    <div className={`min-h-screen w-full ${backgroundChoice} overflow-hidden p-6 relative`}>
      {/* Header */}
      <header className="flex items-center justify-between mb-8 glassmorphism py-2 px-4 rounded-full">
        <div className="flex items-center space-x-2">
          <Apple className="w-6 h-6 text-white" />
          <span className="text-white font-medium">iCloud</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button 
              variant="ghost" 
              className="text-white flex items-center gap-2"
              onClick={() => setShowBackgroundOptions(!showBackgroundOptions)}
            >
              Background <ChevronDown className="w-4 h-4" />
            </Button>
            {showBackgroundOptions && (
              <div className="absolute top-full right-0 mt-2 glassmorphism rounded-lg p-2 z-50">
                {backgroundOptions.map(option => (
                  <button 
                    key={option.name} 
                    className="block w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded-md"
                    onClick={() => {
                      setBackgroundChoice(option.value);
                      setShowBackgroundOptions(false);
                    }}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link to="/settings" className="text-white hover:underline">
            Settings
          </Link>
        </div>
      </header>

      {/* Widgets Container */}
      <div className="relative w-full h-[calc(100vh-100px)]">
        {/* Profile Widget */}
        <Widget
          title="Profile"
          icon={<Apple />}
          className="left-0 top-0 z-10"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-white">Atlas User</h3>
            <p className="text-sm text-gray-300">user@example.com</p>
            <p className="text-xs text-primary/70">iCloud+</p>
          </div>
        </Widget>

        {/* Apps Widget */}
        <Widget
          title="Apps"
          icon={<List />}
          className="left-[340px] top-0 z-10"
          minWidth="520px"
        >
          <div className="icloud-app-grid p-4">
            <AppIcon icon={<Mail className="w-6 h-6 text-blue-400" />} label="Mail" notification={3} />
            <AppIcon icon={<Calendar className="w-6 h-6 text-red-400" />} label="Calendar" />
            <AppIcon icon={<Image className="w-6 h-6 text-purple-400" />} label="Photos" />
            <AppIcon icon={<Cloud className="w-6 h-6 text-white" />} label="Drive" />
            <AppIcon icon={<FileText className="w-6 h-6 text-yellow-400" />} label="Notes" />
            <AppIcon icon={<List className="w-6 h-6 text-red-300" />} label="Reminders" />
            <AppIcon icon={<FileText className="w-6 h-6 text-amber-400" />} label="Pages" />
            <AppIcon icon={<BarChart3 className="w-6 h-6 text-green-400" />} label="Numbers" />
          </div>
        </Widget>

        {/* Notes Widget */}
        <Widget
          title="Notes"
          icon={<FileText className="text-yellow-400" />}
          className="left-10 top-[320px] z-10"
          minWidth="440px"
          minHeight="340px"
        >
          <div className="flex flex-col space-y-3">
            {[
              { title: "Meeting Notes", date: "2/28/2024", content: "Discussed product roadmap and timeline." },
              { title: "Project Deadlines", date: "2/25/2024", content: "Website redesign due by April 15." },
              { title: "Ideas", date: "2/20/2024", content: "New feature concepts for the dashboard." }
            ].map((note, index) => (
              <div key={index} className="p-3 rounded-lg bg-black/20 border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-white">{note.title}</h4>
                  <span className="text-xs text-gray-400">{note.date}</span>
                </div>
                <p className="text-sm text-gray-300">{note.content}</p>
              </div>
            ))}
          </div>
        </Widget>

        {/* Chat Widget */}
        <Widget
          title="Atlas Assistant"
          icon={<Apple className="text-white" />}
          className="left-[480px] top-[180px] z-20"
          minWidth="500px"
          minHeight="400px"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No messages yet. Start a conversation!</p>
                </div>
              )}
            </div>
            <ChatInput />
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default ICloudLayout;
