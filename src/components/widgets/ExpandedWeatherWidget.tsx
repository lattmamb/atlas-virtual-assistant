
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface WeatherData {
  temp: string;
  condition: string;
  location: string;
  forecast: {
    day: string;
    condition: string;
    high: string;
    low: string;
  }[];
}

const ExpandedWeatherWidget: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  // Mock weather data - in a real app this would come from an API
  const weatherData: WeatherData = {
    temp: '72°',
    condition: 'Sunny',
    location: 'Taylorville, IL',
    forecast: [
      { day: 'Today', condition: 'sunny', high: '74°', low: '58°' },
      { day: 'Thu', condition: 'partly-cloudy', high: '68°', low: '55°' },
      { day: 'Fri', condition: 'rainy', high: '62°', low: '51°' },
      { day: 'Sat', condition: 'cloudy', high: '65°', low: '53°' },
      { day: 'Sun', condition: 'sunny', high: '71°', low: '57°' },
    ]
  };
  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-400" />;
      case 'partly-cloudy':
        return <Cloud className="h-6 w-6 text-blue-300" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="h-6 w-6 text-white" />;
      default:
        return <Wind className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <AppleWidget
      title="Weather"
      icon={<Sun className="h-5 w-5 text-yellow-400" />}
      className="col-span-1 md:col-span-2"
    >
      <div className="p-4 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-light">{weatherData.temp}</div>
              <div className="text-sm text-gray-400">{weatherData.condition}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{weatherData.location}</div>
              <div className="text-xs text-gray-400">Updated just now</div>
            </div>
          </div>
          
          <div className="border-t border-b border-white/10 py-4 mb-4">
            <div className="text-sm font-medium mb-3">5-Day Forecast</div>
            <div className="grid grid-cols-5 gap-2">
              {weatherData.forecast.map((day) => (
                <div 
                  key={day.day} 
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg",
                    isDarkMode ? "hover:bg-white/5" : "hover:bg-black/5"
                  )}
                >
                  <div className="text-xs mb-1">{day.day}</div>
                  <div className="my-1">{getWeatherIcon(day.condition)}</div>
                  <div className="text-xs font-medium">{day.high}</div>
                  <div className="text-xs text-gray-400">{day.low}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className={cn(
              "p-2 rounded-lg",
              isDarkMode ? "bg-white/5" : "bg-black/5"
            )}>
              <div className="text-xs text-gray-400">Humidity</div>
              <div className="text-sm font-medium">65%</div>
            </div>
            <div className={cn(
              "p-2 rounded-lg",
              isDarkMode ? "bg-white/5" : "bg-black/5"
            )}>
              <div className="text-xs text-gray-400">UV Index</div>
              <div className="text-sm font-medium">Medium</div>
            </div>
            <div className={cn(
              "p-2 rounded-lg",
              isDarkMode ? "bg-white/5" : "bg-black/5"
            )}>
              <div className="text-xs text-gray-400">Wind</div>
              <div className="text-sm font-medium">8 mph</div>
            </div>
            <div className={cn(
              "p-2 rounded-lg",
              isDarkMode ? "bg-white/5" : "bg-black/5"
            )}>
              <div className="text-xs text-gray-400">Precipitation</div>
              <div className="text-sm font-medium">10%</div>
            </div>
          </div>
        </div>
      </div>
    </AppleWidget>
  );
};

export default ExpandedWeatherWidget;
