
import React from 'react';
import { NavItem } from './types';
import { Home, MessageSquare, Settings, Car } from 'lucide-react';

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
    path: '/chatroom',
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
    name: 'atlas',
    title: 'Atlas',
    icon: React.createElement(Car),
    path: '/atlas',
  },
];

export default navigationItems;
