
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface CommandProps {
  language: string;
}

interface Task {
  id?: string;
  text: string;
  completed: boolean;
  created_at: string;
}

const Command: React.FC<CommandProps> = ({ language }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase.from('tasks').select('*');
      if (data) {
        setTasks(data);
      }
    };
    
    fetchTasks();

    const channel = supabase
      .channel('command')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tasks' },
        (payload) => setTasks((prev) => [...prev, payload.new as Task])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addTask = async (text: string) => {
    const newTask = {
      text,
      completed: false,
      created_at: new Date().toISOString(),
    };
    
    await supabase.from('tasks').insert(newTask);
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
        if (transcript.toLowerCase().startsWith('task'))
          addTask(transcript.slice(5).trim());
        setIsListening(false);
      };
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Command' : 'Comando'}
      </h1>
      <button
        onClick={toggleListening}
        className={`m-4 p-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-cyan-400'
        } text-black`}
      >
        {isListening ? '🎙️ Stop' : '🎙️ Task'}
      </button>
      <div
        role="list"
        aria-label={language === 'en' ? 'Task List' : 'Lista de Tareas'}
      >
        {tasks.map((task, i) => (
          <motion.div key={i} className="p-4 border-b border-gray-700" role="listitem">
            <p>{task.text}</p>
            <span className="text-sm text-gray-400">
              {new Date(task.created_at).toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => addTask('Sample task from AI')}
        className="m-4 p-2 bg-cyan-400 text-black rounded"
        aria-label="Add AI Task"
      >
        {language === 'en' ? 'Add AI Task' : 'Añadir Tarea IA'}
      </button>
    </div>
  );
};

export default Command;
