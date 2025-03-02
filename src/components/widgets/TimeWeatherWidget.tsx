
import React from 'react';
import { Clock, Search } from 'lucide-react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TimeWeatherWidgetProps {
  currentTime: Date;
  weatherData: {
    temp: string;
    condition: string;
    location: string;
  };
}

const TimeWeatherWidget: React.FC<TimeWeatherWidgetProps> = ({ 
  currentTime, 
  weatherData 
}) => {
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', dateOptions);

  const handleRefreshWeather = () => {
    toast.success("Weather updated for Taylorville, IL", {
      position: "top-center",
      duration: 2000
    });
  };

  return (
    <AppleWidget 
      title="Time & Weather"
      icon={<Clock className="h-5 w-5 text-blue-400" />}
      className="row-span-1"
      onHeaderActionClick={handleRefreshWeather}
      headerActionIcon={<Search className="h-4 w-4" />}
      headerActionTooltip="Update Weather"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="text-3xl font-light mb-2">
          {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
        </div>
        <div className="text-sm text-blue-300 mb-4">{formattedDate}</div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-2xl font-semibold">{weatherData.temp}</div>
            <div className="text-sm text-gray-400">{weatherData.condition}</div>
          </div>
          <div className="text-sm text-right text-gray-400">
            {weatherData.location}
          </div>
        </div>
      </div>
    </AppleWidget>
  );
};

export default TimeWeatherWidget;
