
import React from 'react';
import { AnimatedTabs, Tab } from '@/components/ui/tabs-animated';
import { Sparkles, MessageSquare, Settings, Car, Workflow } from 'lucide-react';

const TabsExample: React.FC = () => {
  // Define example tabs
  const exampleTabs: Tab[] = [
    {
      title: "Chat",
      value: "chat",
      content: (
        <div className="p-6 bg-gray-800/70 rounded-xl border border-white/10 backdrop-blur-xl text-white">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Chat
          </h3>
          <p className="text-gray-300">
            Engage with Trinity Dodge's AI assistant for instant support with your car needs.
            Whether you need pricing information, service scheduling, or product details, we're here to help.
          </p>
        </div>
      ),
    },
    {
      title: "Atlas",
      value: "atlas",
      content: (
        <div className="p-6 bg-gray-800/70 rounded-xl border border-white/10 backdrop-blur-xl text-white">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            Atlas AI
          </h3>
          <p className="text-gray-300">
            Experience our advanced AI system designed to provide personalized vehicle recommendations
            and create stunning visual content for your dream car.
          </p>
        </div>
      ),
    },
    {
      title: "Inventory",
      value: "inventory",
      content: (
        <div className="p-6 bg-gray-800/70 rounded-xl border border-white/10 backdrop-blur-xl text-white">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Car className="h-5 w-5 text-green-400" />
            Vehicle Inventory
          </h3>
          <p className="text-gray-300">
            Browse our extensive collection of Dodge vehicles, from powerful Ram trucks to sporty Chargers.
            Filter by model, price, and features to find your perfect match.
          </p>
        </div>
      ),
    },
    {
      title: "Workflows",
      value: "workflows",
      content: (
        <div className="p-6 bg-gray-800/70 rounded-xl border border-white/10 backdrop-blur-xl text-white">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Workflow className="h-5 w-5 text-amber-400" />
            Workflows
          </h3>
          <p className="text-gray-300">
            Automate your car buying journey with our custom workflows. From price alerts to
            service reminders, let our system handle the details while you enjoy the drive.
          </p>
        </div>
      ),
    },
    {
      title: "Settings",
      value: "settings",
      content: (
        <div className="p-6 bg-gray-800/70 rounded-xl border border-white/10 backdrop-blur-xl text-white">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-gray-400" />
            Settings
          </h3>
          <p className="text-gray-300">
            Customize your Trinity Dodge experience. Adjust notification preferences, manage your
            profile information, and control data sharing settings.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-8">Interactive Features</h2>
      
      <AnimatedTabs 
        tabs={exampleTabs}
        containerClassName="bg-gray-100 dark:bg-gray-900 p-2 rounded-full mb-4"
        activeTabClassName="bg-white dark:bg-gray-800 shadow-md"
        tabClassName="text-sm font-medium"
        contentClassName="mt-4 md:mt-6"
      />
    </div>
  );
};

export default TabsExample;
