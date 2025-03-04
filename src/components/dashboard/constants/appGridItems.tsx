
import React from 'react';
import {
  Mail,
  Calendar,
  FileVideo,
  FileMusic,
  Image,
  Settings,
  MessageSquare,
  Compass,
  Glasses,
} from 'lucide-react';

export const appGridItems = [
  {
    icon: <Mail />,
    name: "Mail",
    path: "/mail",
    badgeCount: 3,
  },
  {
    icon: <Calendar />,
    name: "Calendar",
    path: "/calendar",
    badgeCount: 0,
  },
  {
    icon: <FileVideo />,
    name: "Videos",
    path: "/videos",
    badgeCount: 0,
  },
  {
    icon: <FileMusic />,
    name: "Music",
    path: "/music",
    badgeCount: 0,
  },
  {
    icon: <Image />,
    name: "Photos",
    path: "/photos",
    badgeCount: 12,
  },
  {
    icon: <Settings />,
    name: "Settings",
    path: "/settings",
    badgeCount: 0,
  },
  {
    icon: <MessageSquare />,
    name: "Chat",
    path: "/chat",
    badgeCount: 8,
  },
  {
    icon: <Compass />,
    name: "Maps",
    path: "/maps",
    badgeCount: 0,
  },
  {
    icon: <Glasses />,
    name: "Vision Pro",
    path: "/applevisionpro",
    badgeCount: 0,
  },
];
