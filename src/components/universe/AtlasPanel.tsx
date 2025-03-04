
import React, { useState } from 'react';
import { Home, MessageSquare, Settings, Sparkles, Shield, Workflow } from 'lucide-react';
import { MenuBar } from '@/components/ui/glow-menu';
import { cn } from '@/lib/utils';

interface AtlasPanelProps {
  className?: string;
}

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/atlas",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: MessageSquare,
    label: "Chat",
    href: "/chat",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: Workflow,
    label: "Workflows",
    href: "/workflows",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: Shield,
    label: "Security",
    href: "/atlas-link",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
  {
    icon: Sparkles,
    label: "Features",
    href: "/features",
    gradient:
      "radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(139,92,246,0.06) 50%, rgba(109,40,217,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    gradient:
      "radial-gradient(circle, rgba(75,85,99,0.15) 0%, rgba(55,65,81,0.06) 50%, rgba(31,41,55,0) 100%)",
    iconColor: "text-gray-500",
  },
];

const AtlasPanel: React.FC<AtlasPanelProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  return (
    <div className={cn("p-6", className)}>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Atlas Assistant</h2>
        </div>

        <MenuBar 
          items={menuItems} 
          activeItem={activeItem}
          onItemClick={setActiveItem}
          className="mb-6 w-full md:w-auto"
        />

        <div className="bg-white/5 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Trinity Dodge Dashboard</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Welcome to the Atlas Assistant for Trinity Dodge in Taylorville, Illinois.
            Access car inventory, customer information, and marketing tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <ul className="text-sm space-y-2">
                <li>• New Dodge Ram inventory added</li>
                <li>• 3 customer inquiries pending</li>
                <li>• Social media campaign scheduled</li>
              </ul>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-medium mb-2">Quick Stats</h4>
              <ul className="text-sm space-y-2">
                <li>• 24 vehicles in inventory</li>
                <li>• 12 test drives this week</li>
                <li>• 8 vehicles sold this month</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtlasPanel;
