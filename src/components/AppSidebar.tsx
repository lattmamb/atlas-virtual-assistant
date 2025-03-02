
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
  ChevronRight
} from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Primary navigation items
  const primaryNavItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="h-4 w-4" />
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      name: 'Workflows',
      path: '/workflows',
      icon: <Workflow className="h-4 w-4" />
    },
    {
      name: 'Atlas Link',
      path: '/atlas-link',
      icon: <Shield className="h-4 w-4" />
    }
  ];

  // Tools navigation items
  const toolsNavItems = [
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-4 w-4" />
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderTitle>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-6 w-6"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18Z" />
            <path d="M12 2c-2 4-4 5-6 6 1.5 2 2 4 2 6s-.5 4-2 6c2-1 4-2 6-6 2 4 4 5 6 6-1.5-2-2-4-2-6s.5-4 2-6c-2 1-4 2-6 6Z" />
          </svg>
          <span>Atlas Assistant</span>
        </SidebarHeaderTitle>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path}>
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
                    <Link to={item.path}>
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
      
      <SidebarFooter>
        <div className="flex justify-between items-center px-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {state === "expanded" ? (
              <ChevronLeft className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
