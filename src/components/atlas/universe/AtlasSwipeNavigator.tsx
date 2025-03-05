
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import PulseChat from './PulseChat';
import AgoraFeed from './AgoraFeed';
import Mindstream from './Mindstream';
import Command from './Command';
import Spaces from './Spaces';
import FleetCommand from './FleetCommand';
import IntelCore from './IntelCore';

interface SwipeNavigatorProps {
  atxBalance: number;
  setAtxBalance: React.Dispatch<React.SetStateAction<number>>;
  language: string;
}

const AtlasSwipeNavigator: React.FC<SwipeNavigatorProps> = ({ 
  atxBalance, 
  setAtxBalance,
  language 
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [mood, setMood] = useState<'neutral' | 'positive' | 'negative'>('neutral');

  const panels = [
    {
      name: language === 'en' ? 'Pulse' : 'Pulso',
      component: (
        <PulseChat
          language={language}
          atxBalance={atxBalance}
          setAtxBalance={setAtxBalance}
        />
      ),
    },
    {
      name: language === 'en' ? 'Agora' : 'Ágora',
      component: (
        <AgoraFeed
          language={language}
          atxBalance={atxBalance}
          setAtxBalance={setAtxBalance}
        />
      ),
    },
    {
      name: language === 'en' ? 'Mindstream' : 'Flujo de Ideas',
      component: <Mindstream language={language} />,
    },
    {
      name: language === 'en' ? 'Command' : 'Comando',
      component: <Command language={language} />,
    },
    {
      name: language === 'en' ? 'Spaces' : 'Espacios',
      component: <Spaces language={language} />,
    },
    {
      name: language === 'en' ? 'Fleet' : 'Flota',
      component: <FleetCommand language={language} />,
    },
    {
      name: language === 'en' ? 'Intel' : 'Inteligencia',
      component: <IntelCore language={language} />,
    },
  ];

  useEffect(() => {
    const channel = supabase
      .channel('pulse')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const text = payload.new.text.toLowerCase();
          // If message mentions "great", set mood to "positive", etc.
          setMood(
            text.includes('great') || text.includes('good')
              ? 'positive'
              : text.includes('bad') || text.includes('issue')
              ? 'negative'
              : 'neutral'
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const moodStyles = {
    neutral: 'bg-black text-cyan-400',
    positive: 'bg-gray-900 text-amber-400',
    negative: 'bg-gray-800 text-pink-500',
  };

  return (
    <div
      className={`h-screen w-screen overflow-hidden ${
        highContrast ? 'bg-white text-black' : moodStyles[mood]
      }`}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: `-${currentPanel * 100}vw` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        role="region"
        aria-label={
          language === 'en' ? 'Main Navigation' : 'Navegación Principal'
        }
      >
        <div className="flex w-[700vw] h-full">
          {panels.map((panel, i) => (
            <div
              key={i}
              className="w-screen h-full"
              role="tabpanel"
              aria-label={panel.name}
            >
              {panel.component}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ambient Radial Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: mood === 'positive' ? 0.5 : 0.2 }}
        style={{
          background:
            mood === 'positive'
              ? 'radial-gradient(circle, #F5C06D, transparent)'
              : 'radial-gradient(circle, #E947FF, transparent)',
        }}
      />

      {/* Controls (Top-Right) */}
      <div className="fixed top-16 right-4 flex gap-2 z-40">
        {/* High Contrast Toggle */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="p-2 rounded bg-gray-700"
          aria-label="Toggle High Contrast"
        >
          {highContrast ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Panel Dots (Bottom) */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
        {panels.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentPanel ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
            onClick={() => setCurrentPanel(i)}
            onKeyPress={(e) => e.key === 'Enter' && setCurrentPanel(i)}
            aria-label={`${panels[i].name} Panel`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};

export default AtlasSwipeNavigator;
