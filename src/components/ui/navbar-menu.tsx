
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Settings, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarMenuProps {
  vertical?: boolean;
}

const NavbarMenu = ({ vertical = false }: NavbarMenuProps) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      path: "/", 
      icon: <MessageSquare className="h-5 w-5" />, 
      label: "Chat" 
    },
    { 
      path: "/workflows", 
      icon: <Workflow className="h-5 w-5" />, 
      label: "Workflows" 
    },
    { 
      path: "/settings", 
      icon: <Settings className="h-5 w-5" />, 
      label: "Settings" 
    },
  ];

  return (
    <nav className={cn(
      vertical 
        ? "flex flex-col space-y-2" 
        : "flex items-center space-x-1"
    )}>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
            location.pathname === item.path
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary",
            vertical && "w-full justify-between"
          )}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavbarMenu;
