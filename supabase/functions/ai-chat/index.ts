
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const cohereApiKey = Deno.env.get('COHERE_API_KEY');
const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
const huggingFaceApiKey = Deno.env.get('HUGGINGFACE_API_KEY') || Deno.env.get('hugging face');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider, messages } = await req.json();

    let response;
    
    switch (provider) {
      case 'openai':
        response = await callOpenAI(messages);
        break;
      case 'anthropic':
        response = await callAnthropic(messages);
        break;
      case 'huggingface':
      case 'hugging face':
        response = await callHuggingFace(messages);
        break;
      case 'cohere':
        response = await callCohere(messages);
        break;
      case 'google':
        response = await callGoogle(messages);
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Unsupported provider' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function callOpenAI(messages: ChatMessage[]) {
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Unknown error from OpenAI');
  }
  
  return {
    content: data.choices[0].message.content,
    model: data.model,
  };
}

async function callAnthropic(messages: ChatMessage[]) {
  if (!anthropicApiKey) {
    throw new Error('Anthropic API key not configured');
  }

  // Convert from ChatGPT format to Claude format
  const systemMessage = messages.find(msg => msg.role === 'system')?.content || '';
  const conversationMessages = messages.filter(msg => msg.role !== 'system');
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      system: systemMessage,
      messages: conversationMessages,
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Unknown error from Anthropic');
  }
  
  return {
    content: data.content[0].text,
    model: data.model,
  };
}

async function callHuggingFace(messages: ChatMessage[]) {
  if (!huggingFaceApiKey) {
    throw new Error('HuggingFace API key not configured');
  }

  // Last message is what we'll send to the model
  const lastMessage = messages[messages.length - 1];

  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${huggingFaceApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: lastMessage.content,
      parameters: {
        max_new_tokens: 1024,
        temperature: 0.7,
        return_full_text: false,
      }
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Unknown error from HuggingFace');
  }
  
  return {
    content: data[0]?.generated_text || 'No response generated',
    model: 'Mistral-7B-Instruct',
  };
}

async function callCohere(messages: ChatMessage[]) {
  if (!cohereApiKey) {
    throw new Error('Cohere API key not configured');
  }
  
  // Format messages for Cohere
  const formattedMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'CHATBOT' : m.role.toUpperCase(),
    message: m.content
  }));

  const response = await fetch('https://api.cohere.ai/v1/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${cohereApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_history: formattedMessages,
      message: messages[messages.length - 1].content,
      model: 'command',
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Unknown error from Cohere');
  }
  
  return {
    content: data.text || 'No response generated',
    model: data.model || 'command',
  };
}

async function callGoogle(messages: ChatMessage[]) {
  if (!googleApiKey) {
    throw new Error('Google API key not configured');
  }

  // Google requires a slightly different format
  const formattedMessages = messages.map(message => ({
    role: message.role,
    parts: [{ text: message.content }],
  }));

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + googleApiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Unknown error from Google');
  }
  
  return {
    content: data.candidates[0]?.content?.parts[0]?.text || 'No response generated',
    model: 'gemini-pro',
  };
}
