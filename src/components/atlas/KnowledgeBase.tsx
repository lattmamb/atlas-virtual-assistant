
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Book, PenLine, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface KnowledgeBaseProps {
  isDarkMode: boolean;
}

interface CustomInstruction {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ isDarkMode }) => {
  const [instructions, setInstructions] = useState<CustomInstruction[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedInstruction, setSelectedInstruction] = useState<CustomInstruction | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchInstructions();
  }, []);

  const fetchInstructions = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_instructions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching instructions:', error);
        toast.error('Failed to load custom instructions');
        return;
      }

      setInstructions(data as CustomInstruction[]);
    } catch (error) {
      console.error('Error in fetchInstructions:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const saveInstruction = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide both a title and content');
      return;
    }

    try {
      if (isEditing && selectedInstruction) {
        // Update existing instruction
        const { error } = await supabase
          .from('custom_instructions')
          .update({ title, content })
          .eq('id', selectedInstruction.id);

        if (error) {
          throw error;
        }

        toast.success('Instruction updated successfully');
      } else {
        // Create new instruction
        const { error } = await supabase
          .from('custom_instructions')
          .insert([{ title, content }]);

        if (error) {
          throw error;
        }

        toast.success('Instruction saved successfully');
      }

      // Reset form and refresh instructions
      setTitle("");
      setContent("");
      setIsEditing(false);
      setSelectedInstruction(null);
      fetchInstructions();
    } catch (error) {
      console.error('Error saving instruction:', error);
      toast.error('Failed to save instruction');
    }
  };

  const deleteInstruction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('custom_instructions')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('Instruction deleted successfully');
      fetchInstructions();
      
      if (selectedInstruction?.id === id) {
        setSelectedInstruction(null);
        setTitle("");
        setContent("");
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error deleting instruction:', error);
      toast.error('Failed to delete instruction');
    }
  };

  const selectInstruction = (instruction: CustomInstruction) => {
    setSelectedInstruction(instruction);
    setTitle(instruction.title);
    setContent(instruction.content);
    setIsEditing(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedInstruction(null);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 h-full">
      <div className="md:w-1/3 h-full overflow-hidden flex flex-col">
        <Card className={cn(
          "h-full flex flex-col",
          isDarkMode 
            ? "dark-apple-card"
            : "apple-card"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Saved Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {instructions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center mt-4">
                No custom instructions yet. Create your first one!
              </p>
            ) : (
              <ul className="space-y-2">
                {instructions.map((instruction) => (
                  <li 
                    key={instruction.id} 
                    className={cn(
                      "p-3 rounded-md cursor-pointer flex items-center justify-between group",
                      selectedInstruction?.id === instruction.id 
                        ? "bg-primary/10" 
                        : "hover:bg-muted/50"
                    )}
                    onClick={() => selectInstruction(instruction)}
                  >
                    <div className="overflow-hidden">
                      <h4 className="font-medium text-sm truncate">{instruction.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{instruction.content.substring(0, 50)}...</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteInstruction(instruction.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="md:w-2/3 h-full overflow-hidden flex flex-col">
        <Card className={cn(
          "h-full flex flex-col",
          isDarkMode 
            ? "dark-apple-card"
            : "apple-card"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <PenLine className="h-5 w-5" />
              {isEditing ? 'Edit Instruction' : 'Create New Instruction'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your instruction a name"
                className="w-full"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="content" className="block text-sm font-medium mb-1">Custom Instruction</label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your custom instruction or prompt for Atlas AI..."
                className="flex-1 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              {isEditing && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button onClick={saveInstruction} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? 'Update' : 'Save'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBase;
