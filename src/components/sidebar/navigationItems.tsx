
import React from 'react';
import { NavItem } from './types';
import { 
  Home, 
  MessageSquare, 
  Workflow, 
  Settings,
  HelpCircle,
  Bell,
  Car,
  Calendar,
  Sparkles,
  Link2
} from 'lucide-react';

// Primary navigation items
export const getPrimaryNavItems = (): NavItem[] => [
  {
    name: 'Home',
    path: '/',
    icon: <Home className="h-4.5 w-4.5" />
  },
  {
    name: 'Atlas',
    path: '/atlas',
    icon: <Sparkles className="h-4.5 w-4.5" />,
    badge: {
      count: 1,
      color: 'blue-600'
    }
  },
  {
    name: 'Workflows',
    path: '/workflows',
    icon: <Workflow className="h-4.5 w-4.5" />
  }
];

// Atlas submenu items - shown when Atlas is active
export const getAtlasNavItems = (): NavItem[] => [
  {
    name: 'Chat',
    path: '/atlas',
    icon: <MessageSquare className="h-4.5 w-4.5" />
  },
  {
    name: 'Atlas Link',
    path: '/atlas',
    icon: <Link2 className="h-4.5 w-4.5" />
  },
  {
    name: 'Workflows',
    path: '/atlas',
    icon: <Workflow className="h-4.5 w-4.5" />
  }
];

// Trinity Dodge navigation items
export const getTrinityNavItems = (): NavItem[] => [
  {
    name: 'Inventory',
    path: '/inventory',
    icon: <Car className="h-4.5 w-4.5" />
  },
  {
    name: 'Test Drive',
    path: '/test-drive',
    icon: <Calendar className="h-4.5 w-4.5" />
  },
];

// Tools navigation items
export const getToolsNavItems = (): NavItem[] => [
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-4.5 w-4.5" />
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: <Bell className="h-4.5 w-4.5" />
  },
  {
    name: 'Help',
    path: '/help',
    icon: <HelpCircle className="h-4.5 w-4.5" />
  }
];
