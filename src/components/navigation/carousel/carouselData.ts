
export interface PageInfo {
  path: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  imageUrl?: string;
}

export const defaultPages: PageInfo[] = [
  { 
    path: "/", 
    title: "Home", 
    description: "Your Atlas Universe Hub",
    color: "from-blue-500 to-purple-600",
    icon: "🏠",
    imageUrl: "https://picsum.photos/300/300?sky"
  },
  { 
    path: "/universe", 
    title: "U-N-I-Verse", 
    description: "Explore the unified space",
    color: "from-violet-500 to-indigo-600",
    icon: "🌌",
    imageUrl: "https://picsum.photos/300/300?universe"
  },
  { 
    path: "/chatroom", 
    title: "Chat Room", 
    description: "Talk to Atlas AI assistant",
    color: "from-green-500 to-teal-600",
    icon: "💬",
    imageUrl: "https://picsum.photos/300/300?chat"
  },
  { 
    path: "/atlaslink", 
    title: "Atlas Link", 
    description: "Connect with Trinity Dodge",
    color: "from-amber-500 to-orange-600",
    icon: "🔗",
    imageUrl: "https://picsum.photos/300/300?link"
  },
  { 
    path: "/applevisionpro", 
    title: "Vision Pro", 
    description: "Experience Apple Vision Pro",
    color: "from-gray-700 to-gray-900",
    icon: "👁️",
    imageUrl: "https://picsum.photos/300/300?vision"
  },
  { 
    path: "/settings", 
    title: "Settings", 
    description: "Configure your experience",
    color: "from-slate-500 to-slate-700",
    icon: "⚙️",
    imageUrl: "https://picsum.photos/300/300?settings"
  }
];
