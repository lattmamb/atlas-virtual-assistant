
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { GitHub, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

const ARFooter: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const socialIcons = [
    { name: 'GitHub', icon: <GitHub className="w-5 h-5" /> },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" /> },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" /> },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" /> },
  ];
  
  return (
    <footer className={cn(
      "relative z-10 py-12 px-6 mt-24",
      "border-t",
      isDarkMode ? "border-white/10" : "border-black/10"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <h3 className={cn(
              "text-xl font-semibold mb-4",
              "bg-clip-text text-transparent bg-gradient-to-r",
              isDarkMode 
                ? "from-blue-400 to-purple-400" 
                : "from-blue-600 to-purple-600"
            )}>
              AppleVision Pro
            </h3>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Experience the next frontier of spatial computing with Apple Vision Pro. 
              Seamlessly blend digital content with your physical space.
            </p>
            
            <div className="flex space-x-4 mt-6">
              {socialIcons.map((item) => (
                <a 
                  key={item.name}
                  href="#"
                  className={cn(
                    "p-2 rounded-full",
                    isDarkMode 
                      ? "text-gray-400 hover:text-white hover:bg-white/10" 
                      : "text-gray-600 hover:text-black hover:bg-black/5",
                    "transition-colors"
                  )}
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          {[
            {
              title: "Products",
              links: ["AppleVision Pro", "Accessories", "Apps", "SDK", "Developer Tools"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Guides", "Tutorials", "Examples", "Support"]
            },
            {
              title: "Company",
              links: ["About Us", "Blog", "Careers", "Press", "Contact"]
            }
          ].map((column) => (
            <div key={column.title} className="col-span-1">
              <h4 className={cn(
                "font-medium mb-4",
                isDarkMode ? "text-gray-200" : "text-gray-800"
              )}>
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className={cn(
                        "text-sm",
                        isDarkMode 
                          ? "text-gray-400 hover:text-blue-300" 
                          : "text-gray-600 hover:text-blue-600",
                        "transition-colors"
                      )}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "mt-12 pt-6 border-t",
          isDarkMode ? "border-white/10" : "border-black/10",
          "flex flex-col md:flex-row justify-between items-center"
        )}>
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-500" : "text-gray-600"
          )}>
            © 2025 Apple Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
              <a 
                key={item}
                href="#"
                className={cn(
                  "text-sm",
                  isDarkMode 
                    ? "text-gray-500 hover:text-gray-300" 
                    : "text-gray-600 hover:text-gray-900",
                  "transition-colors"
                )}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ARFooter;
