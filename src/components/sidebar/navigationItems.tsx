
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
  Link2,
  Store,
  Book,
  Key
} from 'lucide-react';

// Primary navigation items
export const getPrimaryNavItems = (): NavItem[] => [
  {
    name: 'Home',
    path: '/',
    icon: <Home className="h-4 w-4" />
  },
  {
    name: 'Atlas',
    path: '/atlas',
    icon: <Sparkles className="h-4 w-4" />,
    badge: {
      count: 1,
      color: 'blue-600'
    }
  },
  {
    name: 'Workflows',
    path: '/workflows',
    icon: <Workflow className="h-4 w-4" />
  }
];

// Atlas submenu items - shown when Atlas is active
export const getAtlasNavItems = (): NavItem[] => [
  {
    name: 'Link',
    path: '/atlas?view=link',
    icon: <Link2 className="h-4 w-4" />
  },
  {
    name: 'Workflows',
    path: '/atlas?view=workflows',
    icon: <Workflow className="h-4 w-4" />
  },
  {
    name: 'Store',
    path: '/atlas?view=store',
    icon: <Store className="h-4 w-4" />
  },
  {
    name: 'Knowledge',
    path: '/atlas?view=knowledge',
    icon: <Book className="h-4 w-4" />
  },
  {
    name: 'API',
    path: '/atlas?view=api',
    icon: <Key className="h-4 w-4" />
  },
  {
    name: 'Settings',
    path: '/atlas?view=settings',
    icon: <Settings className="h-4 w-4" />
  }
];

// Trinity Dodge navigation items
export const getTrinityNavItems = (): NavItem[] => [
  {
    name: 'Inventory',
    path: '/inventory',
    icon: <Car className="h-4 w-4" />
  },
  {
    name: 'Test Drive',
    path: '/test-drive',
    icon: <Calendar className="h-4 w-4" />
  },
];

// Tools navigation items
export const getToolsNavItems = (): NavItem[] => [
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-4 w-4" />
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
    name: 'Help',
    path: '/help',
    icon: <HelpCircle className="h-4 w-4" />
  }
];
