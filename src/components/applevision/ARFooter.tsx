
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface InformationLink {
  label: string;
  href: string;
}

interface ARFooterProps {
  socialLinks?: SocialLink[];
  informationLinks?: InformationLink[];
}

const ARFooter: React.FC<ARFooterProps> = ({ 
  socialLinks = [], 
  informationLinks = [] 
}) => {
  const { isDarkMode } = useTheme();
  
  const defaultSocialLinks: SocialLink[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: '#',
      label: 'Facebook'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      href: '#',
      label: 'Instagram'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      href: '#',
      label: 'Twitter'
    }
  ];
  
  const defaultInformationLinks: InformationLink[] = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Support', href: '#' }
  ];
  
  const links = informationLinks.length ? informationLinks : defaultInformationLinks;
  const socials = socialLinks.length ? socialLinks : defaultSocialLinks;
  
  return (
    <motion.footer
      className={cn(
        "relative z-10 w-full",
        "py-12 px-6 md:px-10",
        "border-t",
        isDarkMode ? "border-white/10" : "border-black/10",
        isDarkMode ? "text-white/90" : "text-black/90",
        "backdrop-blur-sm",
        isDarkMode ? "bg-black/20" : "bg-white/20"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="21.17" y1="8" x2="12" y2="8" />
                <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
              </svg>
              <span className="text-lg font-semibold">Vision Pro</span>
            </div>
            <p className="text-sm opacity-75">
              Experience the future of augmented reality with Apple's Vision Pro. 
              Seamlessly blend digital content with your physical space.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Information</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-sm opacity-75 hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div>
              <p className="text-sm opacity-75">Email: contact@visionpro.example</p>
              <p className="text-sm opacity-75">Phone: +1 (123) 456-7890</p>
            </div>
            <div className="flex space-x-4">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full",
                    isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10",
                    "transition-colors"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-800">
          <p className="text-sm text-center opacity-60">
            © {new Date().getFullYear()} Vision Pro. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default ARFooter;
