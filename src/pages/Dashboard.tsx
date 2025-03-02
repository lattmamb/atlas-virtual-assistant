
import React, { useState, useEffect } from 'react';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import { Cloud } from 'lucide-react';
import { toast } from "sonner";
import { VoiceAssistant } from '@/components/ui/voice-assistant';
import { AIPersonalization } from '@/components/ui/ai-personalization';
import ChatButton from '@/components/widgets/ChatButton';
import ChatPopup from '@/components/widgets/ChatPopup';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import { useTheme } from '@/context/ThemeContext';
import DashboardContent from '@/components/dashboard/DashboardContent';

export default function Dashboard() {
  const { currentTheme, isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    // Welcome toast
    setTimeout(() => {
      toast.success("Welcome to Atlas Assistant", {
        description: "Your Trinity Dodge AI platform is ready to assist you.",
        icon: <Cloud className="h-5 w-5 text-blue-400" />,
        duration: 5000,
      });
    }, 1500);
  }, []);
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <BackgroundEffects currentTheme={currentTheme} />
      
      <ICloudLayout>
        <DashboardContent />
        
        <div className="fixed bottom-4 right-4 z-40">
          <ChatButton onClick={toggleChat} />
        </div>

        {showChat && (
          <ChatPopup 
            isDarkMode={isDarkMode} 
            onClose={() => setShowChat(false)}
          />
        )}
        
        {/* Add AI Personalization only when chat is not shown */}
        {!showChat && <AIPersonalization />}
        
        {/* Add Voice Assistant for the main page */}
        <VoiceAssistant />
      </ICloudLayout>
    </div>
  );
}
