
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Bot, 
  Settings, 
  Home, 
  Workflow, 
  MessageSquare,
  ImageIcon,
  Video,
  Cube
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const location = useLocation();
  
  // Navigation items
  const mainNavItems = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },
    {
      title: "Workflows",
      path: "/workflows",
      icon: Workflow,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    }
  ];

  // Tool items
  const toolItems = [
    {
      title: "Chat",
      path: "/",
      icon: MessageSquare,
    },
    {
      title: "Text to Image",
      path: "#",
      icon: ImageIcon,
      comingSoon: true
    },
    {
      title: "Text to Video",
      path: "#",
      icon: Video,
      comingSoon: true
    },
    {
      title: "3D Generator",
      path: "#",
      icon: Cube,
      comingSoon: true
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 py-1">
          <Bot className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Atlas Assistant</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.path && !item.comingSoon}
                    disabled={item.comingSoon}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.comingSoon && (
                        <span className="ml-auto text-xs opacity-60">Soon</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-muted-foreground">
          <p>Atlas Assistant v1.0</p>
          <p>© 2024 Trinity Dodge</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
