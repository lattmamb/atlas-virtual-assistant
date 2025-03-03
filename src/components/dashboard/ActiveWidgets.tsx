
import React from 'react';
import DraggableWidget from '@/components/widgets/DraggableWidget';
import AtlasLinkWidget from '@/components/widgets/AtlasLinkWidget';
import ChatRoomWidget from '@/components/widgets/ChatRoomWidget';
import WorkflowsWidget from '@/components/widgets/WorkflowsWidget';
import TimeWeatherWidget from '@/components/widgets/TimeWeatherWidget';
import { Shield, MessageSquare, Workflow, Clock, Cloud, Car } from 'lucide-react';
import InventoryWidget from '@/components/widgets/InventoryWidget';

// Widget style mapping to create visual variety
const widgetStyles: Record<string, {
  style: 'glass' | 'neomorph' | 'hybrid',
  hoverEffect: 'scale' | 'glow' | 'lift' | 'none',
  accentColor?: string
}> = {
  atlas_link: {
    style: 'hybrid',
    hoverEffect: 'lift',
    accentColor: 'rgba(59, 130, 246, 0.5)'
  },
  chat_room: {
    style: 'glass',
    hoverEffect: 'scale',
    accentColor: 'rgba(99, 102, 241, 0.5)'
  },
  workflows: {
    style: 'neomorph',
    hoverEffect: 'glow',
    accentColor: 'rgba(79, 70, 229, 0.5)'
  },
  time: {
    style: 'glass',
    hoverEffect: 'scale'
  },
  trinity_cars: {
    style: 'hybrid',
    hoverEffect: 'lift',
    accentColor: 'rgba(220, 38, 38, 0.5)'
  }
};

interface ActiveWidgetsProps {
  activeWidgets: string[];
  currentTime: Date;
  weatherData: {
    temp: string;
    condition: string;
    location: string;
  };
}

const ActiveWidgets: React.FC<ActiveWidgetsProps> = ({ 
  activeWidgets, 
  currentTime, 
  weatherData 
}) => {
  const renderWidget = (widgetId: string, index: number) => {
    const key = `${widgetId}-${index}`;
    const widgetStyle = widgetStyles[widgetId] || { style: 'glass', hoverEffect: 'scale' };
    
    switch(widgetId) {
      case 'atlas_link':
        return (
          <DraggableWidget 
            key={key} 
            id={key}
            style={widgetStyle.style}
            hoverEffect={widgetStyle.hoverEffect}
            accentColor={widgetStyle.accentColor}
          >
            <AtlasLinkWidget />
          </DraggableWidget>
        );
      case 'chat_room':
        return (
          <DraggableWidget 
            key={key} 
            id={key} 
            className="col-span-1 md:col-span-2"
            style={widgetStyle.style}
            hoverEffect={widgetStyle.hoverEffect}
            accentColor={widgetStyle.accentColor}
          >
            <ChatRoomWidget />
          </DraggableWidget>
        );
      case 'workflows':
        return (
          <DraggableWidget 
            key={key} 
            id={key} 
            className="col-span-1 md:col-span-2"
            style={widgetStyle.style}
            hoverEffect={widgetStyle.hoverEffect}
            accentColor={widgetStyle.accentColor}
          >
            <WorkflowsWidget />
          </DraggableWidget>
        );
      case 'time':
        return (
          <DraggableWidget 
            key={key} 
            id={key}
            style={widgetStyle.style}
            hoverEffect={widgetStyle.hoverEffect}
            accentColor={widgetStyle.accentColor}
          >
            <TimeWeatherWidget
              currentTime={currentTime}
              weatherData={weatherData}
            />
          </DraggableWidget>
        );
      case 'trinity_cars':
        return (
          <DraggableWidget 
            key={key} 
            id={key} 
            className="col-span-1 md:col-span-2"
            style={widgetStyle.style}
            hoverEffect={widgetStyle.hoverEffect}
            accentColor={widgetStyle.accentColor}
          >
            <InventoryWidget />
          </DraggableWidget>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {activeWidgets.map((widgetId, index) => renderWidget(widgetId, index))}
    </>
  );
};

export default ActiveWidgets;
