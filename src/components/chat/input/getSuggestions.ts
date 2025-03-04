
export function getSuggestions(aiMode: 'atlas' | 'grok'): string[] {
  return aiMode === "atlas" 
    ? [
        "Tell me about the 2025 Dodge Ram",
        "What's the pricing for a Charger?",
        "Do you have financing options?",
        "Schedule a test drive"
      ]
    : [
        "What's happening in the world today?",
        "Write a poem about technology",
        "Explain quantum physics simply",
        "Debate electric vs gas vehicles"
      ];
}
