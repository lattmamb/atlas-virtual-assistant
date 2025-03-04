
import React from 'react';
import { NavItem } from './types';
import { Home, MessageSquare, Settings, Sparkles } from 'lucide-react';

export const navigationItems: NavItem[] = [
  {
    name: 'home',
    title: 'Home',
    icon: React.createElement(Home, { size: 20 }),
    path: '/',
  },
  {
    name: 'chat',
    title: 'Chat',
    icon: React.createElement(MessageSquare, { size: 20 }),
    path: '/chat',
    badge: {
      count: 2,
      color: 'blue',
    },
  },
  {
    name: 'settings',
    title: 'Settings',
    icon: React.createElement(Settings, { size: 20 }),
    path: '/settings',
  },
  {
    name: 'features',
    title: 'Features',
    icon: React.createElement(Sparkles, { size: 20 }),
    path: '/features',
  },
];

export default navigationItems;
