
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
      className="w-full py-6 text-center backdrop-blur-sm border-t border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/60 text-sm">{text}</p>
        
        <div className="flex gap-6 mt-3 md:mt-0">
          {links.map((link, index) => (
            <Link 
              key={index} 
              to={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
