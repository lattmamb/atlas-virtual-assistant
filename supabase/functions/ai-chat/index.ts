
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider, messages } = await req.json();

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Get the API key for the specified provider
    const { data: apiKeys, error: keyError } = await supabase
      .from("api_keys")
      .select("*")
      .limit(1);

    if (keyError || !apiKeys || apiKeys.length === 0) {
      return new Response(
        JSON.stringify({
          error: "API keys not found",
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = apiKeys[0];

    // Select the appropriate key based on the provider
    let key;
    let endpoint;
    let modelName;
    let requestPayload;

    // Format messages for specific providers
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    switch (provider) {
      case "openai":
        key = apiKey.api_key;
        endpoint = "https://api.openai.com/v1/chat/completions";
        modelName = "gpt-3.5-turbo";
        requestPayload = {
          model: modelName,
          messages: formattedMessages,
          temperature: 0.7,
        };
        break;
      case "anthropic":
        key = apiKey.anthropic;
        endpoint = "https://api.anthropic.com/v1/messages";
        modelName = "claude-3-haiku";
        requestPayload = {
          model: modelName,
          messages: formattedMessages,
          max_tokens: 1024,
          temperature: 0.7,
        };
        break;
      case "huggingface":
      case "hugging face":
        key = apiKey["hugging face"] || apiKey.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;
        endpoint = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
        modelName = "Mistral-7B";
        requestPayload = {
          inputs: formattedMessages.map(msg => `${msg.role}: ${msg.content}`).join("\n"),
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false,
          },
        };
        break;
      case "cohere":
        key = apiKey.cohere;
        endpoint = "https://api.cohere.ai/v1/chat";
        modelName = "command-r";
        requestPayload = {
          model: modelName,
          message: formattedMessages[formattedMessages.length - 1].content,
          chat_history: formattedMessages.slice(0, -1).map(msg => ({
            role: msg.role,
            message: msg.content,
          })),
          temperature: 0.7,
        };
        break;
      case "google":
        key = apiKey.google;
        endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
        modelName = "gemini-pro";
        requestPayload = {
          contents: formattedMessages.map(msg => ({
            role: msg.role === "assistant" ? "model" : msg.role,
            parts: [{ text: msg.content }],
          })),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        };
        break;
      default:
        return new Response(
          JSON.stringify({
            error: `Unsupported provider: ${provider}`,
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    if (!key) {
      return new Response(
        JSON.stringify({
          error: `API key for ${provider} not found`,
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Set up the appropriate headers for each provider
    let headers = {
      "Content-Type": "application/json",
    };

    switch (provider) {
      case "openai":
        headers["Authorization"] = `Bearer ${key}`;
        break;
      case "anthropic":
        headers["x-api-key"] = key;
        headers["anthropic-version"] = "2023-06-01";
        break;
      case "huggingface":
      case "hugging face":
        headers["Authorization"] = `Bearer ${key}`;
        break;
      case "cohere":
        headers["Authorization"] = `Bearer ${key}`;
        break;
      case "google":
        endpoint += `?key=${key}`;
        break;
    }

    console.log(`Making request to ${provider} API: ${endpoint}`);
    
    // Send the request to the AI provider
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from ${provider} API: ${errorText}`);
      return new Response(
        JSON.stringify({
          error: `Error from ${provider} API: ${response.status}`,
          details: errorText,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the response based on the provider
    const data = await response.json();
    let content;
    
    switch (provider) {
      case "openai":
        content = data.choices[0].message.content;
        break;
      case "anthropic":
        content = data.content[0].text;
        break;
      case "huggingface":
      case "hugging face":
        content = Array.isArray(data) && data.length > 0 ? data[0].generated_text : data.generated_text;
        break;
      case "cohere":
        content = data.text;
        break;
      case "google":
        content = data.candidates[0].content.parts[0].text;
        break;
    }

    // Return the formatted response
    return new Response(
      JSON.stringify({
        content,
        model: modelName,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
