
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import IOSStatusBar from '@/components/ios/IOSStatusBar';
import { useTheme } from '@/context/ThemeContext';
import AtlasSwipeNavigator from '@/components/atlas/universe/AtlasSwipeNavigator';

const AtlasUniverse: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [language, setLanguage] = useState('en');
  const [atxBalance, setAtxBalance] = useState(100);
  const { currentTheme } = useTheme();
  const [proposals, setProposals] = useState([
    { id: 1, text: 'Add video posts', votes: 0 },
    { id: 2, text: 'Expand fleet', votes: 0 },
  ]);

  const onboardingText = {
    en: 'Welcome to Atlas Universe! Swipe to explore, chat with AI, and manage your world.',
    es: '¡Bienvenido a Atlas Universe! Desliza para explorar, chatea con IA y gestiona tu mundo.',
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(onboardingText[language]);
      utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  }, [language, onboardingText]);

  const vote = (proposalId: number) => {
    if (atxBalance >= 1) {
      setAtxBalance((prev) => prev - 1);
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposalId ? { ...p, votes: p.votes + 1 } : p
        )
      );
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <IOSStatusBar />
      
      {showOnboarding && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="p-8 rounded bg-gray-900">
            <h1 className="text-2xl mb-4">
              {language === 'en' ? 'Welcome!' : '¡Bienvenido!'}
            </h1>
            <p>{onboardingText[language]}</p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="mt-4 p-2 bg-cyan-400 text-black rounded"
              aria-label={
                language === 'en' ? 'Start Exploring' : 'Comenzar a Explorar'
              }
            >
              {language === 'en' ? 'Start' : 'Iniciar'}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="ml-2 p-2 bg-gray-700 rounded"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </motion.div>
      )}
      
      <div className="fixed top-16 left-4 z-40 text-amber-400 font-bold">ATX: {atxBalance}</div>
      
      <AtlasSwipeNavigator 
        atxBalance={atxBalance} 
        setAtxBalance={setAtxBalance}
        language={language}
      />
      
      {/* Governance Bar */}
      <div className="fixed bottom-20 left-4 right-4 bg-gray-900 p-4 rounded z-40">
        <h2 className="text-cyan-400">
          {language === 'en' ? 'Governance' : 'Gobernanza'}
        </h2>
        {proposals.map((proposal) => (
          <div key={proposal.id} className="flex justify-between">
            <p>
              {proposal.text} ({proposal.votes} votes)
            </p>
            <button
              onClick={() => vote(proposal.id)}
              className="p-1 bg-cyan-400 text-black rounded"
              disabled={atxBalance < 1}
            >
              {language === 'en' ? 'Vote (1 ATX)' : 'Votar (1 ATX)'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtlasUniverse;
