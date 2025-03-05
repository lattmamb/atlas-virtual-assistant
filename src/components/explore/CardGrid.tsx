
import React from 'react';
import { motion } from 'framer-motion';
import ExploreCard from './ExploreCard';

interface CardInfo {
  title: string;
  description: string;
  icon: 'Eye' | 'Globe' | 'Link2' | 'Car';
  link: string;
  background: string;
}

interface CardGridProps {
  columns: number;
  gap: string;
  padding: string;
  cards: CardInfo[];
}

const getGlowColor = (background: string): string => {
  if (background.includes('cyan')) return '#0ea5e9';
  if (background.includes('magenta')) return '#d946ef';
  if (background.includes('orange')) return '#f97316';
  if (background.includes('red')) return '#ef4444';
  return '#8b5cf6'; // Default purple
};

const CardGrid: React.FC<CardGridProps> = ({ columns, gap, padding, cards }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className={`p-${padding} w-full max-w-6xl mx-auto`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div 
        className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`}
        style={{ 
          gridTemplateColumns: `repeat(${columns === 2 ? 'auto-fit' : columns}, minmax(300px, 1fr))`,
          gap: `${parseInt(gap) * 0.25}rem`
        }}
      >
        {cards.map((card, index) => (
          <ExploreCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            link={card.link}
            glowColor={getGlowColor(card.background)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CardGrid;
