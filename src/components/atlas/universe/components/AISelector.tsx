
import React from 'react';
import { AISelectorProps } from '../types/pulse-types';

const AISelector: React.FC<AISelectorProps> = ({
  activeAI,
  setActiveAI,
  language,
  atxBalance,
  setAtxBalance
}) => {
  const premiumAIs = ['grok', 'gemini', 'claude'];
  
  const unlockAI = (ai: string) => {
    if (atxBalance >= 10) {
      setAtxBalance((prev) => prev - 10);
      setActiveAI(ai);
    } else {
      alert(
        language === 'en'
          ? 'Need 10 ATX to unlock!'
          : '¡Necesitas 10 ATX para desbloquear!'
      );
    }
  };

  return (
    <div className="p-4 flex gap-2">
      {['atlas', 'grok', 'gemini', 'claude'].map((ai) => (
        <button
          key={ai}
          onClick={() => (premiumAIs.includes(ai) ? unlockAI(ai) : setActiveAI(ai))}
          className={`p-2 rounded ${
            activeAI === ai ? 'bg-cyan-400 text-black' : 'bg-gray-700'
          }`}
          disabled={premiumAIs.includes(ai) && atxBalance < 10}
          aria-label={`Switch to ${ai}`}
        >
          {ai.charAt(0).toUpperCase() + ai.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default AISelector;
