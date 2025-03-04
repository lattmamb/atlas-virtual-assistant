import { NavItem } from './types';
import { Home, MessageSquare, Settings, Sparkles } from 'lucide-react';

export const navigationItems: NavItem[] = [
  {
    name: 'home',
    title: 'Home',
    icon: Home,
    path: '/',
  },
  {
    name: 'chat',
    title: 'Chat',
    icon: MessageSquare,
    path: '/chat',
    badge: {
      count: 2,
      color: 'blue',
    },
  },
  {
    name: 'settings',
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  },
  {
    name: 'features',
    title: 'Features',
    icon: Sparkles,
    path: '/features',
  },
];

export default navigationItems;
