
import React from 'react';
import { 
  BarChart, 
  Book, 
  Store, 
  Key, 
  Settings, 
  Calendar,
  Layers,
  Monitor,
  Users,
  Bell
} from "lucide-react";

export const getAtlasFeatures = () => [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    name: 'Knowledge Base',
    path: '/knowledge',
    icon: <Book className="h-4 w-4" />,
  },
  {
    name: 'GPT Store',
    path: '/store',
    icon: <Store className="h-4 w-4" />,
  },
  {
    name: 'API Keys',
    path: '/api',
    icon: <Key className="h-4 w-4" />,
  },
  {
    name: 'Workflow',
    path: '/workflow',
    icon: <Layers className="h-4 w-4" />,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: <Calendar className="h-4 w-4" />,
    badge: {
      count: 2,
      color: 'blue-600'
    }
  },
];

export const getSystemItems = () => [
  {
    name: 'Appearance',
    path: '/appearance',
    icon: <Monitor className="h-4 w-4" />,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: <Bell className="h-4 w-4" />,
    badge: {
      count: 3,
      color: 'red-500'
    }
  },
  {
    name: 'Team',
    path: '/team',
    icon: <Users className="h-4 w-4" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-4 w-4" />,
  },
];
