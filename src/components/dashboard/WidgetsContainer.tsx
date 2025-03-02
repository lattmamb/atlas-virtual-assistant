
import React from 'react';
import { motion } from 'framer-motion';
import WidgetsGrid from '@/components/widgets/WidgetsGrid';
import TrinityCarsWidget from '@/components/widgets/TrinityCarsWidget';
import TrinityEventsWidget from '@/components/widgets/TrinityEventsWidget';
import TimeWeatherWidget from '@/components/widgets/TimeWeatherWidget';
import ExpandedWeatherWidget from '@/components/widgets/ExpandedWeatherWidget';
import InventoryWidget from '@/components/widgets/InventoryWidget';
import PhotosWidget from '@/components/widgets/PhotosWidget';
import MailWidget from '@/components/widgets/MailWidget';
import CalendarWidget from '@/components/widgets/CalendarWidget';
import NotesWidget from '@/components/widgets/NotesWidget';
import StorageWidget from '@/components/widgets/StorageWidget';
import MusicWidget from '@/components/widgets/MusicWidget';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface Email {
  id: number;
  subject: string;
  sender: string;
  time: string;
  read: boolean;
}

interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
}

interface WeatherData {
  temp: string;
  condition: string;
  location: string;
}

interface WidgetsContainerProps {
  activeWidgets: string[];
  currentTime: Date;
  weatherData: WeatherData;
  photos: Photo[];
  emails: Email[];
  events: Event[];
}

const WidgetsContainer: React.FC<WidgetsContainerProps> = ({
  activeWidgets,
  currentTime,
  weatherData,
  photos,
  emails,
  events
}) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <WidgetsGrid>
      {activeWidgets.includes('trinity_cars') && (
        <motion.div variants={item}>
          <TrinityCarsWidget />
        </motion.div>
      )}
      
      {activeWidgets.includes('trinity_events') && (
        <motion.div variants={item}>
          <TrinityEventsWidget />
        </motion.div>
      )}
      
      {activeWidgets.includes('time') && (
        <motion.div variants={item}>
          <TimeWeatherWidget
            currentTime={currentTime}
            weatherData={weatherData}
          />
        </motion.div>
      )}
      
      {activeWidgets.includes('weather') && (
        <motion.div variants={item}>
          <ExpandedWeatherWidget />
        </motion.div>
      )}
      
      {activeWidgets.includes('inventory') && (
        <motion.div variants={item}>
          <InventoryWidget />
        </motion.div>
      )}
      
      {activeWidgets.includes('photos') && (
        <motion.div variants={item}>
          <PhotosWidget photos={photos} />
        </motion.div>
      )}
      
      {activeWidgets.includes('mail') && (
        <motion.div variants={item}>
          <MailWidget emails={emails} />
        </motion.div>
      )}
      
      {activeWidgets.includes('calendar') && (
        <motion.div variants={item}>
          <CalendarWidget events={events} />
        </motion.div>
      )}
      
      {activeWidgets.includes('notes') && (
        <motion.div variants={item}>
          <NotesWidget />
        </motion.div>
      )}
      
      {activeWidgets.includes('storage') && (
        <motion.div variants={item}>
          <StorageWidget />
        </motion.div>
      )}
      
      {activeWidgets.includes('music') && (
        <motion.div variants={item}>
          <MusicWidget />
        </motion.div>
      )}
    </WidgetsGrid>
  );
};

export default WidgetsContainer;
