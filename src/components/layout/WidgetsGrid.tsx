
import React from 'react';
import TimeWeatherWidget from '@/components/widgets/TimeWeatherWidget';
import PhotosWidget from '@/components/widgets/PhotosWidget';
import MailWidget from '@/components/widgets/MailWidget';
import CalendarWidget from '@/components/widgets/CalendarWidget';
import NotesWidget from '@/components/widgets/NotesWidget';
import StorageWidget from '@/components/widgets/StorageWidget';
import MusicWidget from '@/components/widgets/MusicWidget';

interface WidgetsGridProps {
  currentTime: Date;
  weatherData: {
    temp: string;
    condition: string;
    location: string;
  };
  photos: Array<{ id: number; src: string; alt: string; }>;
  emails: Array<{ id: number; subject: string; sender: string; time: string; read: boolean; }>;
  events: Array<{ id: number; title: string; time: string; date: string; }>;
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({ 
  currentTime, 
  weatherData, 
  photos, 
  emails, 
  events 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <TimeWeatherWidget 
        currentTime={currentTime}
        weatherData={weatherData}
      />
      
      <PhotosWidget photos={photos} />
      
      <MailWidget emails={emails} />
      
      <CalendarWidget events={events} />
      
      <NotesWidget />
      
      <StorageWidget />
      
      <MusicWidget />
    </div>
  );
};

export default WidgetsGrid;
