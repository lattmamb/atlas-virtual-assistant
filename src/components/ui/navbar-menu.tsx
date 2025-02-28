
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Settings, Workflow } from "lucide-react";

const NavbarMenu = () => {
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
    <nav className="flex items-center space-x-1">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            location.pathname === item.path
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavbarMenu;
