
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

export default function Index() {
  const { currentTheme, isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({ temp: '72°', condition: 'Sunny', location: 'Taylorville, IL' });
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'trinity_cars', 'trinity_events', 'time', 'photos', 'mail', 'calendar', 'notes', 'storage', 'music'
  ]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
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
  };
  
  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <BackgroundEffects currentTheme={currentTheme} />
      
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
          
          <WidgetsGrid>
            {activeWidgets.includes('trinity_cars') && <TrinityCarsWidget />}
            
            {activeWidgets.includes('trinity_events') && <TrinityEventsWidget />}
            
            {activeWidgets.includes('time') && (
              <TimeWeatherWidget
                currentTime={currentTime}
                weatherData={weatherData}
              />
            )}
            
            {activeWidgets.includes('weather') && (
              <ExpandedWeatherWidget />
            )}
            
            {activeWidgets.includes('inventory') && (
              <InventoryWidget />
            )}
            
            {activeWidgets.includes('photos') && (
              <PhotosWidget photos={photos} />
            )}
            
            {activeWidgets.includes('mail') && (
              <MailWidget emails={emails} />
            )}
            
            {activeWidgets.includes('calendar') && (
              <CalendarWidget events={events} />
            )}
            
            {activeWidgets.includes('notes') && (
              <NotesWidget />
            )}
            
            {activeWidgets.includes('storage') && (
              <StorageWidget />
            )}
            
            {activeWidgets.includes('music') && (
              <MusicWidget />
            )}
          </WidgetsGrid>
        </div>
        
        <div className="fixed bottom-4 right-4 z-40">
          <ChatButton onClick={() => setShowChat(!showChat)} />
        </div>

        {showChat && <ChatPopup isDarkMode={isDarkMode} />}
      </ICloudLayout>
    </div>
  );
}
