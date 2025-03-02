
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { toast } from "sonner";

const upcomingEvents = [
  {
    id: 1,
    title: "Dodge Ram Test Drive Day",
    date: "June 12, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Trinity Dodge, Taylorville",
    description: "Experience the power of the 2025 Dodge Ram lineup with free test drives. Special offers available on the day.",
    attendees: 34
  },
  {
    id: 2,
    title: "Summer Sales Event",
    date: "July 4-10, 2025",
    time: "All Day",
    location: "Trinity Dodge, Taylorville",
    description: "Independence Day special offers on all Dodge models with up to $3,000 cashback.",
    attendees: 120
  },
  {
    id: 3,
    title: "Dodge Charger Showcase",
    date: "July 18, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Taylorville Square",
    description: "See the latest Dodge Charger models and meet with Trinity Dodge sales team for exclusive offers.",
    attendees: 75
  }
];

const TrinityEventsWidget = () => {
  const { isDarkMode } = useTheme();
  
  const handleRSVP = (eventId: number) => {
    const event = upcomingEvents.find(e => e.id === eventId);
    if (event) {
      toast.success(`RSVP confirmed for ${event.title}`, {
        description: `We'll remind you before the event on ${event.date}`
      });
    }
  };
  
  const handleShare = (eventId: number) => {
    const event = upcomingEvents.find(e => e.id === eventId);
    if (event) {
      toast.info(`Sharing ${event.title}`, {
        description: "Event details ready to share with your contacts"
      });
    }
  };

  return (
    <AppleWidget
      title="Trinity Dodge Events"
      icon={<Calendar className="h-5 w-5 text-blue-400" />}
      className={cn("col-span-1 neomorphic",
        isDarkMode ? "text-white" : "text-gray-800"
      )}
    >
      <div className="p-4">
        <h3 className="text-sm font-medium mb-3 text-blue-400">Upcoming Events</h3>
        
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className={cn(
                "p-3 rounded-lg transition-all hover:scale-[1.01]", 
                isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
              )}
            >
              <h4 className="font-medium text-sm">{event.title}</h4>
              
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs gap-1">
                  <Calendar className="h-3 w-3 text-blue-400" />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {event.date}
                  </span>
                </div>
                
                <div className="flex items-center text-xs gap-1">
                  <Clock className="h-3 w-3 text-blue-400" />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {event.time}
                  </span>
                </div>
                
                <div className="flex items-center text-xs gap-1">
                  <MapPin className="h-3 w-3 text-blue-400" />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {event.location}
                  </span>
                </div>
                
                <div className="flex items-center text-xs gap-1">
                  <Users className="h-3 w-3 text-blue-400" />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {event.attendees} attending
                  </span>
                </div>
              </div>
              
              <p className="mt-2 text-xs text-gray-400 line-clamp-2">
                {event.description}
              </p>
              
              <div className="mt-3 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7 flex-1"
                  onClick={() => handleShare(event.id)}
                >
                  Share
                </Button>
                <Button 
                  size="sm" 
                  className="text-xs h-7 flex-1"
                  onClick={() => handleRSVP(event.id)}
                >
                  RSVP
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppleWidget>
  );
};

export default TrinityEventsWidget;
