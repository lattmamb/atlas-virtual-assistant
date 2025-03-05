
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface AgoraFeedProps {
  language: string;
  atxBalance: number;
  setAtxBalance: React.Dispatch<React.SetStateAction<number>>;
}

interface Post {
  id?: string;
  text: string;
  created_at: string;
}

const AgoraFeed: React.FC<AgoraFeedProps> = ({ language, atxBalance, setAtxBalance }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Filter out any "bad" content for demonstration
      if (data) {
        setPosts(data.filter((p) => !p.text.includes('bad')));
      }
    };
    
    fetchPosts();

    const channel = supabase
      .channel('agora')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => setPosts((prev) => [payload.new as Post, ...prev])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const tipPost = (postId: string | undefined) => {
    if (!postId) return;
    
    if (atxBalance >= 1) {
      setAtxBalance((prev) => prev - 1);
      console.log(`Tipped 1 ATX to post ${postId}`);
    } else {
      alert(
        language === 'en' ? 'Insufficient ATX!' : '¡ATX insuficiente!'
      );
    }
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
        // If user says "Post <message>", insert into posts
        if (transcript.toLowerCase().startsWith('post')) {
          const postText = transcript.slice(5).trim();
          supabase
            .from('posts')
            .insert({ text: postText, created_at: new Date().toISOString() });
        }
        setIsListening(false);
      };
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="p-4 text-2xl">
        {language === 'en' ? 'Agora' : 'Ágora'}
      </h1>
      <button
        onClick={toggleListening}
        className={`m-4 p-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-cyan-400'
        } text-black`}
      >
        {isListening ? '🎙️ Stop' : '🎙️ Post'}
      </button>
      <div
        role="feed"
        aria-label={language === 'en' ? 'Social Feed' : 'Flujo Social'}
      >
        {posts.map((post, i) => (
          <motion.div
            key={i}
            className="p-4 border-b border-gray-700"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -100)
                setPosts((prev) => prev.filter((_, idx) => idx !== i));
              if (offset.x > 100) tipPost(post.id);
            }}
            role="article"
            aria-label={post.text}
          >
            <p>{post.text}</p>
            <span className="text-sm text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </span>
            <button
              className="ml-2 text-amber-400"
              onClick={() => tipPost(post.id)}
              aria-label={
                language === 'en' ? 'Tip 1 ATX' : 'Propina 1 ATX'
              }
            >
              {language === 'en' ? 'Tip 1 ATX' : 'Propina 1 ATX'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgoraFeed;
