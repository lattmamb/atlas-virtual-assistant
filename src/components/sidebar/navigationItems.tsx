
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
  Key,
  Glasses
} from 'lucide-react';

// Primary navigation items
export const getPrimaryNavItems = (): NavItem[] => [
  {
    title: 'Home',
    name: 'Home',
    path: '/',
    icon: <Home className="h-4 w-4" />
  },
  {
    title: 'Atlas',
    name: 'Atlas',
    path: '/atlas',
    icon: <Sparkles className="h-4 w-4" />,
    badge: {
      count: 1,
      color: 'blue-600'
    }
  },
  {
    title: 'Workflows',
    name: 'Workflows',
    path: '/workflows',
    icon: <Workflow className="h-4 w-4" />
  },
  {
    title: 'Vision Pro',
    name: 'Vision Pro',
    path: '/applevisionpro',
    icon: <Glasses className="h-4 w-4" />,
    badge: {
      count: 'New',
      color: 'purple-600'
    }
  }
];

// Atlas submenu items
export const getAtlasNavItems = (): NavItem[] => [
  {
    title: 'Chat',
    name: 'Chat',
    path: '/atlas?view=chat',
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    title: 'Link',
    name: 'Link',
    path: '/atlas?view=link',
    icon: <Link2 className="h-4 w-4" />
  },
  {
    title: 'Workflows',
    name: 'Workflows',
    path: '/atlas?view=workflows',
    icon: <Workflow className="h-4 w-4" />
  },
  {
    title: 'Store',
    name: 'Store',
    path: '/atlas?view=store',
    icon: <Store className="h-4 w-4" />
  },
  {
    title: 'Knowledge',
    name: 'Knowledge',
    path: '/atlas?view=knowledge',
    icon: <Book className="h-4 w-4" />
  },
  {
    title: 'API',
    name: 'API',
    path: '/atlas?view=api',
    icon: <Key className="h-4 w-4" />
  },
  {
    title: 'Settings',
    name: 'Settings',
    path: '/atlas?view=settings',
    icon: <Settings className="h-4 w-4" />
  }
];

// Trinity Dodge navigation items
export const getTrinityNavItems = (): NavItem[] => [
  {
    title: 'Inventory',
    name: 'Inventory',
    path: '/inventory',
    icon: <Car className="h-4 w-4" />
  },
  {
    title: 'Test Drive',
    name: 'Test Drive',
    path: '/test-drive',
    icon: <Calendar className="h-4 w-4" />
  },
];

// Tools navigation items
export const getToolsNavItems = (): NavItem[] => [
  {
    title: 'Settings',
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-4 w-4" />
  },
  {
    title: 'Notifications',
    name: 'Notifications',
    path: '/notifications',
    icon: <Bell className="h-4 w-4" />,
    badge: {
      count: 3,
      color: 'red-500'
    }
  },
  {
    title: 'Help',
    name: 'Help',
    path: '/help',
    icon: <HelpCircle className="h-4 w-4" />
  }
];

// Export a consolidated navigationItems array for AppSidebar
export const navigationItems: NavItem[] = [
  ...getPrimaryNavItems(),
  ...getToolsNavItems()
];
