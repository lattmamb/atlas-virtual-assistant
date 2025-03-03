
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

// Create a type for the icon generator function
type IconType = typeof BarChart;

interface NavItem {
  name: string;
  path: string;
  icon: IconType;
  badge?: {
    count: number;
    color: string;
  };
}

export const getAtlasFeatures = (): NavItem[] => [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: BarChart,
  },
  {
    name: 'Knowledge Base',
    path: '/knowledge',
    icon: Book,
  },
  {
    name: 'GPT Store',
    path: '/store',
    icon: Store,
  },
  {
    name: 'API Keys',
    path: '/api',
    icon: Key,
  },
  {
    name: 'Workflow',
    path: '/workflow',
    icon: Layers,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: Calendar,
    badge: {
      count: 2,
      color: 'blue-600'
    }
  },
];

export const getSystemItems = (): NavItem[] => [
  {
    name: 'Appearance',
    path: '/appearance',
    icon: Monitor,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: Bell,
    badge: {
      count: 3,
      color: 'red-500'
    }
  },
  {
    name: 'Team',
    path: '/team',
    icon: Users,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];
