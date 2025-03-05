
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Compass, 
  Globe, 
  Headphones, 
  Image, 
  MessageCircle, 
  Settings as SettingsIcon, 
  ShoppingBag, 
  Smartphone,
  Car,
  Box,
  Brain
} from 'lucide-react';

const IOSAppGrid: React.FC = () => {
  const apps = [
    {
      name: 'Atlas',
      icon: <Box className="h-10 w-10 text-blue-500" />,
      path: '/atlas',
      color: 'bg-blue-500/10'
    },
    {
      name: 'Atlas Link',
      icon: <Compass className="h-10 w-10 text-indigo-500" />,
      path: '/atlaslink',
      color: 'bg-indigo-500/10'
    },
    {
      name: 'Universe',
      icon: <Globe className="h-10 w-10 text-purple-500" />,
      path: '/universe',
      color: 'bg-purple-500/10'
    },
    {
      name: 'Workflows',
      icon: <Activity className="h-10 w-10 text-green-500" />,
      path: '/workflows',
      color: 'bg-green-500/10'
    },
    {
      name: 'ChatRoom',
      icon: <MessageCircle className="h-10 w-10 text-pink-500" />,
      path: '/chatroom',
      color: 'bg-pink-500/10'
    },
    {
      name: 'Trinity',
      icon: <Car className="h-10 w-10 text-red-500" />,
      path: '/trinity',
      color: 'bg-red-500/10'
    },
    {
      name: 'Atlas Universe',
      icon: <Brain className="h-10 w-10 text-cyan-500" />,
      path: '/atlasuniverse',
      color: 'bg-cyan-500/10'
    },
    {
      name: 'Settings',
      icon: <SettingsIcon className="h-10 w-10 text-gray-500" />,
      path: '/settings',
      color: 'bg-gray-500/10'
    },
    {
      name: 'Apple Vision',
      icon: <Smartphone className="h-10 w-10 text-black" />,
      path: '/applevisionpro',
      color: 'bg-black/10'
    },
    {
      name: 'Photos',
      icon: <Image className="h-10 w-10 text-rose-500" />,
      path: '/',
      color: 'bg-rose-500/10'
    },
    {
      name: 'Safari',
      icon: <Compass className="h-10 w-10 text-blue-400" />,
      path: '/',
      color: 'bg-blue-400/10'
    },
    {
      name: 'Music',
      icon: <Headphones className="h-10 w-10 text-red-400" />,
      path: '/',
      color: 'bg-red-400/10'
    },
    {
      name: 'Store',
      icon: <ShoppingBag className="h-10 w-10 text-green-400" />,
      path: '/',
      color: 'bg-green-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {apps.map((app, index) => (
        <Link key={index} to={app.path} className="flex flex-col items-center">
          <div className={`rounded-2xl ${app.color} p-3 mb-1`}>
            {app.icon}
          </div>
          <span className="text-xs font-medium mt-1">{app.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default IOSAppGrid;
