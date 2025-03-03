
import React from 'react';
import DraggableWidget from '@/components/widgets/DraggableWidget';
import AtlasLinkWidget from '@/components/widgets/AtlasLinkWidget';
import ChatRoomWidget from '@/components/widgets/ChatRoomWidget';
import WorkflowsWidget from '@/components/widgets/WorkflowsWidget';
import TimeWeatherWidget from '@/components/widgets/TimeWeatherWidget';
import { Shield, MessageSquare, Workflow, Clock, Cloud, Car } from 'lucide-react';
import InventoryWidget from '@/components/widgets/InventoryWidget';

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
    
    switch(widgetId) {
      case 'atlas_link':
        return (
          <DraggableWidget key={key} id={key}>
            <AtlasLinkWidget />
          </DraggableWidget>
        );
      case 'chat_room':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
            <ChatRoomWidget />
          </DraggableWidget>
        );
      case 'workflows':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
            <WorkflowsWidget />
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
      case 'trinity_cars':
        return (
          <DraggableWidget key={key} id={key} className="col-span-1 md:col-span-2">
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
