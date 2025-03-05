
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface MindstreamProps {
  language: string;
}

interface Idea {
  id?: string;
  text: string;
  user_id: string;
  created_at: string;
}

interface Cluster {
  key: string;
  summary: string;
}

const Mindstream: React.FC<MindstreamProps> = ({ language }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [input, setInput] = useState('');
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data } = await supabase.from('ideas').select('*');
      
      if (data) {
        setIdeas(data);
        
        // Simple AI cluster logic
        const clustered = data.reduce<Record<string, string[]>>((acc, idea) => {
          const key = idea.text.split(' ')[0];
          acc[key] = acc[key] || [];
          acc[key].push(idea.text);
          return acc;
        }, {});
        
        setClusters(
          Object.entries(clustered).map(([key, texts]) => ({
            key,
            summary: texts.join(' | '),
          }))
        );
      }
    };
    
    fetchIdeas();

    const channel = supabase
      .channel('mindstream')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ideas' },
        () => fetchIdeas()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addOrEditIdea = async (text = input) => {
    if (!text) return;
    
    const newIdea = {
      text,
      user_id: 'user1',
      created_at: new Date().toISOString(),
    };
    
    await supabase.from('ideas').upsert(newIdea, { onConflict: 'id' });
    setInput('');
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
        if (transcript.toLowerCase().startsWith('add'))
          addOrEditIdea(transcript.slice(4).trim());
        setIsListening(false);
      };
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Mindstream' : 'Flujo de Ideas'}
      </h1>
      <button
        onClick={toggleListening}
        className={`m-4 p-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-cyan-400'
        } text-black`}
      >
        {isListening ? '🎙️ Stop' : '🎙️ Add'}
      </button>
      <motion.div
        className="flex-1 overflow-y-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {ideas.map((idea, i) => (
          <motion.div
            key={i}
            className="mb-2 p-2 bg-gray-800 rounded"
            role="listitem"
            aria-label={idea.text}
          >
            <p>
              {idea.text}{' '}
              <span className="text-sm text-gray-400">
                ({idea.user_id})
              </span>
            </p>
            <button
              onClick={() => setInput(idea.text)}
              className="ml-2 p-1 bg-cyan-400 text-black rounded"
            >
              Edit
            </button>
          </motion.div>
        ))}
        <div className="mt-4">
          <h2>
            {language === 'en' ? 'AI Clusters' : 'Clústeres IA'}
          </h2>
          {clusters.map((cluster, i) => (
            <p key={i} className="text-pink-500">
              {cluster.key}: {cluster.summary}
            </p>
          ))}
        </div>
      </motion.div>
      <div className="p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addOrEditIdea()}
          className="w-full p-2 bg-gray-900 border-cyan-400 border rounded"
          placeholder={
            language === 'en' ? 'Add/Edit idea...' : 'Añadir/Editar idea...'
          }
          aria-label="Idea Input"
        />
      </div>
    </div>
  );
};

export default Mindstream;
