
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Car, Eye, Globe, Link2 } from 'lucide-react';

type IconName = 'Eye' | 'Globe' | 'Link2' | 'Car';

interface ExploreCardProps {
  title: string;
  description: string;
  icon: IconName;
  link: string;
  glowColor: string;
}

const getIcon = (name: IconName) => {
  switch (name) {
    case 'Eye': return <Eye className="h-6 w-6" />;
    case 'Globe': return <Globe className="h-6 w-6" />;
    case 'Link2': return <Link2 className="h-6 w-6" />;
    case 'Car': return <Car className="h-6 w-6" />;
    default: return <Globe className="h-6 w-6" />;
  }
};

const ExploreCard: React.FC<ExploreCardProps> = ({ 
  title, 
  description, 
  icon, 
  link, 
  glowColor 
}) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden backdrop-blur-xl border",
        "h-[280px] w-full cursor-pointer transition-all duration-300"
      )}
      style={{ 
        backgroundColor: "rgba(30, 30, 30, 0.4)", 
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: `0 0 20px 2px ${glowColor}25` 
      }}
      whileHover={{
        y: -10,
        boxShadow: `0 10px 30px 5px ${glowColor}35`
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={link} className="block h-full">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-gradient-to-br"
             style={{ backgroundImage: `linear-gradient(135deg, ${glowColor}60 0%, transparent 100%)` }}
        />
        
        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                 style={{ backgroundColor: `${glowColor}30`, color: glowColor }}
            >
              {getIcon(icon)}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80">{description}</p>
          </div>
          
          <motion.div 
            className="flex items-center text-sm font-medium"
            style={{ color: glowColor }}
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, x: 5 }}
          >
            Explore {title}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExploreCard;
