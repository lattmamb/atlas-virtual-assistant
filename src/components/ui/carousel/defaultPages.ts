
import { PageInfo } from "./types";

export const getDefaultPages = (): PageInfo[] => [
  { 
    id: "home", 
    title: "Home", 
    description: "Your Atlas Universe Hub",
    color: "from-blue-500 to-purple-600",
    icon: "🏠",
    path: "/"
  },
  { 
    id: "universe", 
    title: "U-N-I-Verse", 
    description: "Explore the unified space",
    color: "from-violet-500 to-indigo-600",
    icon: "🌌",
    path: "/universe"
  },
  { 
    id: "vision", 
    title: "Vision Pro", 
    description: "Experience Apple Vision Pro",
    color: "from-gray-700 to-gray-900",
    icon: "👁️",
    path: "/applevisionpro"
  },
  { 
    id: "chat", 
    title: "Chat Room", 
    description: "Talk to Atlas AI assistant",
    color: "from-green-500 to-teal-600",
    icon: "💬",
    path: "/chatroom"
  },
  { 
    id: "atlas", 
    title: "Atlas Link", 
    description: "Connect with Trinity Dodge",
    color: "from-amber-500 to-orange-600",
    icon: "🔗",
    path: "/atlaslink"
  },
  { 
    id: "settings", 
    title: "Settings", 
    description: "Configure your experience",
    color: "from-slate-500 to-slate-700",
    icon: "⚙️",
    path: "/settings"
  }
];
