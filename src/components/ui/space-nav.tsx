
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from './glowing-effect';
import { 
  Home, 
  Sparkles, 
  Workflow, 
  MessageSquare, 
  Settings, 
  Book, 
  Store, 
  Key, 
  Menu, 
  X, 
  Car, 
  Calendar, 
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  path, 
  isActive,
  badge
}) => {
  return (
    <Link to={path} className="block">
      <div className="relative group">
        <motion.div 
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl backdrop-blur-sm transition-all",
            isActive 
              ? "bg-white/10 text-white" 
              : "text-white/70 hover:bg-white/5 hover:text-white"
          )}
          whileHover={{ x: 5 }}
        >
          <div className="relative">
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 bg-blue-500 rounded-md"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <div className={cn(
              "relative z-10 flex items-center justify-center w-9 h-9 rounded-md",
              isActive ? "text-white" : "text-white/70"
            )}>
              {icon}
            </div>
          </div>
          
          <span className="font-medium">{label}</span>
          
          {badge && (
            <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-xs">
              {badge}
            </div>
          )}
        </motion.div>
        
        {isActive && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-md" />
        )}
      </div>
    </Link>
  );
};

interface SpaceNavProps {
  activePage?: string;
}

const SpaceNav: React.FC<SpaceNavProps> = ({ activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };
  
  // Primary navigation items
  const primaryNavItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'Atlas',
      path: '/atlas',
      icon: <Sparkles className="h-5 w-5" />,
      badge: 1
    },
    {
      name: 'Workflows',
      path: '/workflows',
      icon: <Workflow className="h-5 w-5" />,
    }
  ];
  
  // Atlas submenu items - shown when Atlas is active
  const atlasNavItems = [
    {
      name: 'Chat',
      path: '/atlas?view=chat',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: 'Knowledge',
      path: '/atlas?view=knowledge',
      icon: <Book className="h-5 w-5" />,
    },
    {
      name: 'Store',
      path: '/atlas?view=store',
      icon: <Store className="h-5 w-5" />,
    },
    {
      name: 'API',
      path: '/atlas?view=api',
      icon: <Key className="h-5 w-5" />,
    }
  ];
  
  // Trinity Dodge navigation items
  const trinityNavItems = [
    {
      name: 'Inventory',
      path: '/inventory',
      icon: <Car className="h-5 w-5" />,
    },
    {
      name: 'Test Drive',
      path: '/test-drive',
      icon: <Calendar className="h-5 w-5" />,
    }
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 right-4 z-50 md:hidden bg-black/20 backdrop-blur-md text-white border border-white/10"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Navigation panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div 
            className="fixed right-0 top-0 h-full md:w-64 w-[80vw] z-40 flex flex-col"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="relative h-full overflow-hidden">
              {/* Glassmorphism panel */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-xl border-l border-white/10" />
              
              {/* Glow effects */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-40 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
              
              <div className="relative h-full flex flex-col p-4 overflow-y-auto">
                {/* User profile */}
                <div className="mb-8 mt-4">
                  <div className="relative p-1 rounded-xl">
                    <GlowingEffect 
                      spread={30} 
                      glow={true} 
                      disabled={false}
                      proximity={50}
                      inactiveZone={0.1}
                      borderWidth={1}
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">Trinity Dodge</span>
                          <span className="text-xs text-white/60">Taylorville, IL</span>
                        </div>
                      </div>
                    </GlowingEffect>
                  </div>
                </div>
                
                {/* Primary navigation */}
                <div className="space-y-1 mb-6">
                  <h3 className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                    Navigation
                  </h3>
                  {primaryNavItems.map(item => (
                    <NavItem 
                      key={item.name}
                      icon={item.icon}
                      label={item.name}
                      path={item.path}
                      isActive={isActive(item.path)}
                      badge={item.badge}
                    />
                  ))}
                </div>
                
                {/* Atlas submenu - only shown when Atlas is active */}
                {activePage === 'atlas' && (
                  <div className="space-y-1 mb-6">
                    <h3 className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      Atlas Features
                    </h3>
                    {atlasNavItems.map(item => (
                      <NavItem 
                        key={item.name}
                        icon={item.icon}
                        label={item.name}
                        path={item.path}
                        isActive={isActive(item.path)}
                      />
                    ))}
                  </div>
                )}
                
                {/* Trinity Dodge Navigation */}
                <div className="space-y-1 mb-6">
                  <h3 className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                    Trinity Dodge
                  </h3>
                  {trinityNavItems.map(item => (
                    <NavItem 
                      key={item.name}
                      icon={item.icon}
                      label={item.name}
                      path={item.path}
                      isActive={isActive(item.path)}
                    />
                  ))}
                </div>
                
                {/* Settings */}
                <div className="space-y-1 mt-auto pt-4 border-t border-white/10">
                  <NavItem 
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                    path="/settings"
                    isActive={isActive('/settings')}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { SpaceNav };
