
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarCollapseToggle,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  Home, 
  MessageSquare, 
  Workflow, 
  Shield, 
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Bell,
  Car,
  Calendar,
  Sparkles,
  FileText,
  Clock,
  Users,
  BadgeCheck,
  CreditCard,
  FileQuestion,
  Phone,
  Headphones,
  BarChart2,
  Key,
  Link2
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AppSidebarProps {
  activePage?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ activePage }) => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const { isDarkMode } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  // Primary navigation items
  const primaryNavItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="h-4.5 w-4.5" />
    },
    {
      name: 'Atlas',
      path: '/atlas',
      icon: <Sparkles className="h-4.5 w-4.5" />
    },
    {
      name: 'Workflows',
      path: '/workflows',
      icon: <Workflow className="h-4.5 w-4.5" />
    }
  ];

  // Atlas submenu items - shown when Atlas is active
  const atlasNavItems = activePage === 'atlas' ? [
    {
      name: 'Chat',
      path: '/atlas',
      icon: <MessageSquare className="h-4.5 w-4.5" />
    },
    {
      name: 'Atlas Link',
      path: '/atlas',
      icon: <Link2 className="h-4.5 w-4.5" />
    }
  ] : [];

  // Trinity Dodge navigation items
  const trinityNavItems = [
    {
      name: 'Inventory',
      path: '/inventory',
      icon: <Car className="h-4.5 w-4.5" />
    },
    {
      name: 'Test Drive',
      path: '/test-drive',
      icon: <Calendar className="h-4.5 w-4.5" />
    },
  ];

  // Tools navigation items
  const toolsNavItems = [
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-4.5 w-4.5" />
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className="h-4.5 w-4.5" />
    },
    {
      name: 'Help',
      path: '/help',
      icon: <HelpCircle className="h-4.5 w-4.5" />
    }
  ];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className={cn(
        "border-r border-border/40 shadow-sm",
        isDarkMode ? "bg-black/90 backdrop-blur-xl" : "bg-white/90 backdrop-blur-xl"
      )}
    >
      <SidebarHeader className="border-b border-border/40">
        <SidebarHeaderTitle>
          <motion.div 
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
          </motion.div>
          <span className="text-lg font-medium">Atlas Assistant</span>
        </SidebarHeaderTitle>
      </SidebarHeader>
      
      <SidebarContent className="pt-4">
        {/* Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className={isActive(item.path) ? 'font-medium' : ''}>
                      {item.icon}
                      <span>{item.name}</span>
                      {item.name === 'Atlas' && (
                        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 text-xs">
                          1
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Atlas Submenu - only shown when Atlas is active */}
        {activePage === 'atlas' && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Atlas Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {atlasNavItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton>
                        <div className="flex items-center">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
        
        <SidebarSeparator />
        
        {/* Trinity Dodge Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Trinity Dodge</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trinityNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className={isActive(item.path) ? 'font-medium' : ''}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        {/* Tools Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className={isActive(item.path) ? 'font-medium' : ''}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/40">
        <div className="flex justify-between items-center px-2 py-2">
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 text-white flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Trinity Dodge</span>
              <span className="text-xs text-muted-foreground">Taylorville, IL</span>
            </div>
          </div>
          
          <SidebarCollapseToggle className="text-muted-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
