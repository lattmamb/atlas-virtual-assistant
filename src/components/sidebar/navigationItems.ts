
import React from 'react';
import { NavItem } from './types';
import { Home, MessageSquare, Settings, Sparkles, Cloud } from 'lucide-react';

export const navigationItems: NavItem[] = [
  {
    name: 'home',
    title: 'Home',
    icon: React.createElement(Home),
    path: '/',
  },
  {
    name: 'chat',
    title: 'Chat',
    icon: React.createElement(MessageSquare),
    path: '/chat',
    badge: {
      count: 2,
      color: 'blue',
    },
  },
  {
    name: 'settings',
    title: 'Settings',
    icon: React.createElement(Settings),
    path: '/settings',
  },
  {
    name: 'features',
    title: 'Features',
    icon: React.createElement(Sparkles),
    path: '/features',
  },
  {
    name: 'atlas',
    title: 'Atlas',
    icon: React.createElement(Cloud),
    path: '/atlas',
  },
];

export default navigationItems;
