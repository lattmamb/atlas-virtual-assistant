
import React, { useState, useEffect } from 'react';
import AppGrid from '@/components/icloud/AppGrid';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import { Car, CalendarClock, Clock, Cloud, Image, Mail, Calendar, FileText, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import ExpandedWeatherWidget from '@/components/widgets/ExpandedWeatherWidget';
import InventoryWidget from '@/components/widgets/InventoryWidget';
import TrinityCarsWidget from '@/components/widgets/TrinityCarsWidget';
import TrinityEventsWidget from '@/components/widgets/TrinityEventsWidget';
import TimeWeatherWidget from '@/components/widgets/TimeWeatherWidget';
import PhotosWidget from '@/components/widgets/PhotosWidget';
import MailWidget from '@/components/widgets/MailWidget';
import CalendarWidget from '@/components/widgets/CalendarWidget';
import NotesWidget from '@/components/widgets/NotesWidget';
import StorageWidget from '@/components/widgets/StorageWidget';
import MusicWidget from '@/components/widgets/MusicWidget';
import ChatButton from '@/components/widgets/ChatButton';
import ChatPopup from '@/components/widgets/ChatPopup';
import HeaderSection from '@/components/widgets/HeaderSection';
import WidgetSelector from '@/components/widgets/WidgetSelector';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import WidgetsGrid from '@/components/widgets/WidgetsGrid';
import DraggableWidget from '@/components/widgets/DraggableWidget';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';
import { toast } from "sonner";

export default function Index() {
  const { currentTheme, isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({ temp: '72°', condition: 'Sunny', location: 'Taylorville, IL' });
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [isEditingWidgets, setIsEditingWidgets] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'trinity_cars', 'trinity_events', 'time', 'photos', 'mail', 'calendar', 'notes', 'storage', 'music'
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
  
  const photos = [
    { id: 1, src: '/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png', alt: 'Photo 1' },
    { id: 2, src: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png', alt: 'Photo 2' },
    { id: 3, src: '/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png', alt: 'Photo 3' }
  ];
  
  const emails = [
    { id: 1, subject: 'Dodge Ram Pricing Update', sender: 'sales@trinitydodge.com', time: '9:45 AM', read: false },
    { id: 2, subject: 'Your Charger Test Drive', sender: 'service@trinitydodge.com', time: 'Yesterday', read: true },
    { id: 3, subject: 'Taylorville Event Reminder', sender: 'events@taylorville.com', time: 'Jul 15', read: true }
  ];
  
  const events = [
    { id: 1, title: 'Trinity Dodge Sales Meeting', time: '10:00 AM', date: 'Today' },
    { id: 2, title: 'Dodge Durango Test Drive', time: '2:30 PM', date: 'Tomorrow' },
    { id: 3, title: 'Taylorville Fair', time: 'All Day', date: 'Jul 20' }
  ];
  
  const availableWidgets = [
    { id: 'trinity_cars', name: 'Trinity Vehicles', icon: <Car className="h-4 w-4" /> },
    { id: 'trinity_events', name: 'Trinity Events', icon: <CalendarClock className="h-4 w-4" /> },
    { id: 'time', name: 'Time & Weather', icon: <Clock className="h-4 w-4" /> },
    { id: 'weather', name: 'Expanded Weather', icon: <Cloud className="h-4 w-4" /> },
    { id: 'inventory', name: 'Vehicle Inventory', icon: <Car className="h-4 w-4" /> },
    { id: 'photos', name: 'Photos', icon: <Image className="h-4 w-4" /> },
    { id: 'mail', name: 'Mail', icon: <Mail className="h-4 w-4" /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
    { id: 'notes', name: 'Notes', icon: <FileText className="h-4 w-4" /> },
    { id: 'storage', name: 'iCloud Storage', icon: <Cloud className="h-4 w-4" /> },
    { id: 'music', name: 'Music', icon: <Music className="h-4 w-4" /> },
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
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  const renderWidget = (widgetId: string, index: number) => {
    const key = `${widgetId}-${index}`;
    
    switch(widgetId) {
      case 'trinity_cars':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
            <TrinityCarsWidget />
          </DraggableWidget>
        );
      case 'trinity_events':
        return (
          <DraggableWidget key={key} id={key}>
            <TrinityEventsWidget />
          </DraggableWidget>
        );
      case 'time':
        return (
          <DraggableWidget key={key} id={key}>
            <TimeWeatherWidget
              currentTime={currentTime}
              weatherData={weatherData}
            />
          </DraggableWidget>
        );
      case 'weather':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
            <ExpandedWeatherWidget />
          </DraggableWidget>
        );
      case 'inventory':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
            <InventoryWidget />
          </DraggableWidget>
        );
      case 'photos':
        return (
          <DraggableWidget key={key} id={key}>
            <PhotosWidget photos={photos} />
          </DraggableWidget>
        );
      case 'mail':
        return (
          <DraggableWidget key={key} id={key}>
            <MailWidget emails={emails} />
          </DraggableWidget>
        );
      case 'calendar':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
            <CalendarWidget events={events} />
          </DraggableWidget>
        );
      case 'notes':
        return (
          <DraggableWidget key={key} id={key}>
            <NotesWidget />
          </DraggableWidget>
        );
      case 'storage':
        return (
          <DraggableWidget key={key} id={key}>
            <StorageWidget />
          </DraggableWidget>
        );
      case 'music':
        return (
          <DraggableWidget key={key} id={key}>
            <MusicWidget />
          </DraggableWidget>
        );
      default:
        return null;
    }
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
            {activeWidgets.map((widgetId, index) => renderWidget(widgetId, index))}
          </WidgetsGrid>
        </div>
        
        <div className="fixed bottom-4 right-4 z-40">
          <ChatButton onClick={toggleChat} />
        </div>

        {showChat && (
          <ChatPopup 
            isDarkMode={isDarkMode} 
            onClose={() => setShowChat(false)}
          />
        )}
      </ICloudLayout>
    </div>
  );
}
