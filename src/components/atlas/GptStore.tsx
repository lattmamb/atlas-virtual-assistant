
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GptStoreProps {
  isDarkMode: boolean;
}

const GptStore: React.FC<GptStoreProps> = ({ isDarkMode }) => {
  const gptModels = [
    { id: 1, name: "Trinity Sales Assistant", description: "Specialized for car sales at Trinity Dodge", icon: "🚗", category: "Sales" },
    { id: 2, name: "Customer Support", description: "Handle customer inquiries and support requests", icon: "👨‍💼", category: "Support" },
    { id: 3, name: "Taylorville Events", description: "Keep up with local Taylorville events", icon: "📅", category: "Local" },
    { id: 4, name: "Inventory Manager", description: "Track and manage Trinity Dodge inventory", icon: "📋", category: "Inventory" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">GPT Store</h2>
        
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search GPTs" className={`pl-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gptModels.map(model => (
          <Card key={model.id} className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2 text-xl">{model.icon}</span>
                    {model.name}
                  </CardTitle>
                  <CardDescription>{model.description}</CardDescription>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {model.category}
                </span>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Install
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GptStore;
