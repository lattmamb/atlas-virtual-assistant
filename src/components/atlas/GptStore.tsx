
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, Plus, Download, Sparkles, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface GptStoreProps {
  isDarkMode: boolean;
}

interface CustomGpt {
  id: string;
  title: string;
  description: string;
  icon: string;
  rating: number;
  downloads: number;
  created_at: string;
  is_official: boolean;
}

const GptStore: React.FC<GptStoreProps> = ({ isDarkMode }) => {
  const [gpts, setGpts] = useState<CustomGpt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGpts, setFilteredGpts] = useState<CustomGpt[]>([]);
  const [category, setCategory] = useState<'all' | 'official' | 'community'>('all');

  useEffect(() => {
    fetchGpts();
  }, []);

  useEffect(() => {
    filterGpts();
  }, [gpts, searchQuery, category]);

  const fetchGpts = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_gpts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching GPTs:', error);
        toast.error('Failed to load GPT models');
        return;
      }

      setGpts(data as CustomGpt[]);
    } catch (error) {
      console.error('Error in fetchGpts:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const filterGpts = () => {
    let filtered = [...gpts];
    
    // Apply category filter
    if (category === 'official') {
      filtered = filtered.filter(gpt => gpt.is_official);
    } else if (category === 'community') {
      filtered = filtered.filter(gpt => !gpt.is_official);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        gpt => 
          gpt.title.toLowerCase().includes(query) ||
          gpt.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredGpts(filtered);
  };

  const downloadGpt = async (id: string) => {
    try {
      // In a real app, we'd update the download count in the database
      // and maybe add it to user's collection
      const gpt = gpts.find(g => g.id === id);
      if (gpt) {
        toast.success(`Added ${gpt.title} to your collection`);
      }
    } catch (error) {
      console.error('Error downloading GPT:', error);
      toast.error('Failed to download GPT');
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-3 h-3", 
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search GPTs..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 ml-4">
          <Button 
            variant={category === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => setCategory('all')}
          >
            All
          </Button>
          <Button 
            variant={category === 'official' ? "default" : "outline"} 
            size="sm"
            onClick={() => setCategory('official')}
          >
            Official
          </Button>
          <Button 
            variant={category === 'community' ? "default" : "outline"} 
            size="sm"
            onClick={() => setCategory('community')}
          >
            Community
          </Button>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Create GPT
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1 pb-4">
        {filteredGpts.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center h-64">
            <p className="text-lg font-medium mb-2">No GPTs found</p>
            <p className="text-sm text-muted-foreground mb-4">Try a different search or create your own!</p>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New GPT
            </Button>
          </div>
        ) : (
          filteredGpts.map(gpt => (
            <Card key={gpt.id} className={cn(
              "overflow-hidden transition-all duration-300 hover:shadow-md",
              isDarkMode ? "dark-apple-card" : "apple-card"
            )}>
              <div className="aspect-video relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                {gpt.is_official && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Official
                  </div>
                )}
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-3xl font-bold">
                  {gpt.title.charAt(0)}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="truncate text-base">{gpt.title}</CardTitle>
                <div className="flex items-center mt-1">
                  {renderStars(gpt.rating)}
                  <span className="text-xs ml-2 text-muted-foreground">
                    {gpt.downloads.toLocaleString()} downloads
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {gpt.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => {}}
                >
                  Learn More
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
                <Button 
                  size="sm" 
                  className="text-xs"
                  onClick={() => downloadGpt(gpt.id)}
                >
                  <Download className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GptStore;
