
import React, { useState, useEffect } from 'react';
import HeaderSection from '@/components/widgets/HeaderSection';
import WidgetSelector from '@/components/widgets/WidgetSelector';
import WidgetsGrid from '@/components/widgets/WidgetsGrid';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import AppGrid from '@/components/icloud/AppGrid';
import { 
  Cloud, Shield, MessageSquare, Workflow, 
  Clock, Car
} from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';
import { useTheme } from '@/context/ThemeContext';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import ActiveWidgets from '@/components/dashboard/ActiveWidgets';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentTheme, isDarkMode } = useTheme();
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({ temp: '72°', condition: 'Sunny', location: 'Taylorville, IL' });
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [isEditingWidgets, setIsEditingWidgets] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'atlas_link', 'chat_room', 'workflows', 'time'
  ]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Welcome toast
    setTimeout(() => {
      toast.success("Welcome to Atlas Assistant", {
        description: "Your Trinity Dodge AI platform is ready to assist you.",
        icon: <Cloud className="h-5 w-5 text-blue-400" />,
        duration: 5000,
      });
    }, 1500);
    
    return () => clearInterval(timer);
  }, []);
  
  const availableWidgets = [
    { id: 'atlas_link', name: 'Atlas Link', icon: <Shield className="h-4 w-4" /> },
    { id: 'chat_room', name: 'Chat Room', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'workflows', name: 'Workflows', icon: <Workflow className="h-4 w-4" /> },
    { id: 'time', name: 'Time & Weather', icon: <Clock className="h-4 w-4" /> },
    { id: 'weather', name: 'Expanded Weather', icon: <Cloud className="h-4 w-4" /> },
    { id: 'trinity_cars', name: 'Trinity Cars', icon: <Car className="h-4 w-4" /> },
  ];
  
  const toggleWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter(id => id !== widgetId));
    } else {
      setActiveWidgets([...activeWidgets, widgetId]);
    }
    
    toast.info(`Widget ${activeWidgets.includes(widgetId) ? "removed" : "added"}`, {
      description: `${availableWidgets.find(w => w.id === widgetId)?.name} has been ${activeWidgets.includes(widgetId) ? "removed from" : "added to"} your dashboard.`,
      duration: 2000,
    });
  };
  
  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <BackgroundEffects currentTheme={currentTheme} />
      
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>
      )}
      
      <ICloudLayout>
        <div className="relative z-10 mt-4 mb-8">
          <HeaderSection 
            isDarkMode={isDarkMode}
            setShowAppGrid={setShowAppGrid}
            showAppGrid={showAppGrid}
          />
          
          {showAppGrid && (
            <AppGrid 
              isDarkMode={isDarkMode} 
              onClose={() => setShowAppGrid(false)} 
            />
          )}
          
          <WidgetSelector 
            isDarkMode={isDarkMode}
            showWidgetSelector={showWidgetSelector}
            setShowWidgetSelector={setShowWidgetSelector}
            availableWidgets={availableWidgets}
            activeWidgets={activeWidgets}
            toggleWidget={toggleWidget}
          />
          
          <WidgetsGrid onEditMode={setIsEditingWidgets}>
            <ActiveWidgets
              activeWidgets={activeWidgets}
              currentTime={currentTime}
              weatherData={weatherData}
            />
          </WidgetsGrid>
        </div>
      </ICloudLayout>
    </div>
  );
};

export default DashboardLayout;
