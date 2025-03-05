
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface PulseChatProps {
  language: string;
  atxBalance: number;
  setAtxBalance: React.Dispatch<React.SetStateAction<number>>;
}

interface Message {
  id?: string;
  text: string;
  sender: string;
  created_at: string;
}

const PulseChat: React.FC<PulseChatProps> = ({ language, atxBalance, setAtxBalance }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeAI, setActiveAI] = useState('atlas');
  const [isListening, setIsListening] = useState(false);

  // Initialize speech recognition if available
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at');
      
      if (data) {
        setMessages(data);
      }
    };
    
    fetchMessages();

    const channel = supabase
      .channel('pulse')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
          
          // Auto-convert relevant user messages into tasks
          if (payload.new.sender === 'user') {
            const lowerText = payload.new.text.toLowerCase();
            if (['do', 'task', 'check'].some((kw) => lowerText.includes(kw))) {
              supabase
                .from('tasks')
                .insert({
                  text: payload.new.text,
                  created_at: new Date().toISOString(),
                })
                .then();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const aiResponses = {
    atlas: (msg: string) =>
      `${
        language === 'en' ? 'Atlas: Noted "' : 'Atlas: Anotado "'
      }${msg}". ${
        language === 'en' ? "What's next?" : "¿Qué sigue?"
      }`,
    grok: (msg: string) =>
      `${
        language === 'en' ? 'Grok: Cool, "' : 'Grok: Genial, "'
      }${msg}". ${
        language === 'en' ? "Got any spicy follow-ups?" : "¿Tienes algo más interesante?"
      }`,
    gemini: (msg: string) =>
      `${
        language === 'en' ? 'Gemini: Analyzing "' : 'Gemini: Analizando "'
      }${msg}". ${
        language === 'en' ? "Need a visual?" : "¿Necesitas una visualización?"
      }`,
    claude: (msg: string) =>
      `${
        language === 'en' ? 'Claude: Reflecting on "' : 'Claude: Reflexionando sobre "'
      }${msg}". ${
        language === 'en' ? "Let's dive deeper." : "Profundicemos."
      }`,
  };

  const sendMessage = async (text: string) => {
    if (!text) return;
    
    const userMessage: Message = {
      text,
      sender: 'user',
      created_at: new Date().toISOString(),
    };
    
    await supabase.from('messages').insert(userMessage);
    setInput('');

    // Condition-based logic
    const lowerText = text.toLowerCase();
    if (lowerText.startsWith('post ')) {
      // Insert into Agora
      await supabase
        .from('posts')
        .insert({ text: text.slice(5), created_at: new Date().toISOString() });
    } else if (lowerText.startsWith('track ')) {
      // Update Fleet
      await supabase.from('fleet').update({ status: 'Tracking' }).eq('name', text.slice(6));
    } else if (lowerText.startsWith('add ')) {
      // Mindstream idea
      await supabase
        .from('ideas')
        .insert({ text: text.slice(4), created_at: new Date().toISOString() });
    }

    // AI response
    const aiResponse: Message = {
      text: aiResponses[activeAI as keyof typeof aiResponses](text),
      sender: activeAI,
      created_at: new Date().toISOString(),
    };
    
    setTimeout(() => supabase.from('messages').insert(aiResponse), 1000);
  };

  const toggleListening = () => {
    if (!recognition) {
      alert(
        language === 'en'
          ? 'Speech recognition not supported.'
          : 'Reconocimiento de voz no soportado.'
      );
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => setIsListening(false);
    }
  };

  const toTask = (text: string) =>
    supabase.from('tasks').insert({ text, created_at: new Date().toISOString() });

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
    <div className="h-full flex flex-col">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Pulse' : 'Pulso'}
      </h1>
      
      {/* AI Switch Buttons */}
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
      
      {/* Chat */}
      <motion.div
        className="flex-1 overflow-y-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`mb-2 p-2 ${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) =>
              offset.x < -100 &&
              setMessages((prev) => prev.filter((_, idx) => idx !== i))
            }
            role="listitem"
            aria-label={msg.text}
          >
            <span className="bg-pink-500 p-2 rounded">{msg.text}</span>
            {msg.sender === 'user' && (
              <button
                onClick={() => toTask(msg.text)}
                className="ml-2 p-1 bg-cyan-400 text-black rounded"
                aria-label="Convert to Task"
              >
                ➡️ Task
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Controls */}
      <div className="p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          className="flex-1 p-2 bg-gray-900 border-cyan-400 border rounded"
          placeholder={
            language === 'en' ? 'Talk to your AI...' : 'Habla con tu IA...'
          }
          aria-label="Chat Input"
        />
        <button
          onClick={toggleListening}
          className={`p-2 rounded ${
            isListening ? 'bg-red-500' : 'bg-cyan-400'
          } text-black`}
        >
          {isListening ? '🎙️ Stop' : '🎙️ Speak'}
        </button>
      </div>
    </div>
  );
};

export default PulseChat;
