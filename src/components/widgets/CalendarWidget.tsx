
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  date: string;
}

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events }) => {
  const { isDarkMode } = useTheme();

  return (
    <AppleWidget 
      title="Calendar"
      icon={<Calendar className="h-5 w-5 text-blue-400" />}
      className="row-span-1 md:col-span-2 hybrid"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="text-sm text-blue-300 mb-4">Upcoming Events</div>
        <ul className="space-y-3">
          {events.map(event => (
            <li key={event.id} className={cn(
              "flex justify-between p-3 rounded-lg transition-all cursor-pointer",
              isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
            )}>
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-xs text-gray-400">{event.time}</div>
              </div>
              <div className="text-sm text-right text-blue-300">
                {event.date}
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center mt-auto pt-4">
          <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
            View Full Calendar
          </Button>
        </div>
      </div>
    </AppleWidget>
  );
};

export default CalendarWidget;
