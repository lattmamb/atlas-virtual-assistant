
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  text: string;
  background: string;
  links: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ text, links }) => {
  return (
    <motion.footer
      className="w-full py-8 text-center backdrop-blur-sm border-t border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/60 text-sm mb-4 md:mb-0">{text}</p>
        
        <div className="flex gap-6">
          {links.map((link, index) => (
            <Link 
              key={index} 
              to={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/60 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
