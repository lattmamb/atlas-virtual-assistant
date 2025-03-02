
import React, { useState, useEffect } from 'react';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import HeaderSection from '@/components/widgets/HeaderSection';
import WidgetsGrid from '@/components/layout/WidgetsGrid';
import BackgroundEffects from '@/components/layout/BackgroundEffects';
import ChatButton from '@/components/widgets/ChatButton';

export default function Index() {
  const [showChat, setShowChat] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({ temp: '72°', condition: 'Sunny', location: 'Taylorville, IL' });
  
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
  
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] text-white">
      <BackgroundEffects isDarkMode={isDarkMode} />
      
      <ICloudLayout>
        <div className="relative z-10 mt-4 mb-8">
          <HeaderSection 
            showAppGrid={showAppGrid} 
            setShowAppGrid={setShowAppGrid}
            isDarkMode={isDarkMode}
          />
          
          <WidgetsGrid 
            currentTime={currentTime}
            weatherData={weatherData}
            photos={photos}
            emails={emails}
            events={events}
          />
        </div>
        
        <ChatButton 
          showChat={showChat}
          setShowChat={setShowChat}
        />
      </ICloudLayout>
    </div>
  );
}
