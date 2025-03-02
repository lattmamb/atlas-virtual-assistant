
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Sparkles, Save, Trash, Plus, FileEdit } from "lucide-react";

interface KnowledgeBaseProps {
  isDarkMode: boolean;
}

interface CustomInstruction {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ isDarkMode }) => {
  const [instructions, setInstructions] = useState<CustomInstruction[]>([]);
  const [selectedInstruction, setSelectedInstruction] = useState<CustomInstruction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        toast.error('Failed to load instructions');
        return;
      }

      setInstructions(data as CustomInstruction[]);
    } catch (error) {
      console.error('Error in fetchInstructions:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleSelectInstruction = (instruction: CustomInstruction) => {
    setSelectedInstruction(instruction);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleEditClick = () => {
    if (!selectedInstruction) return;
    
    setTitle(selectedInstruction.title);
    setContent(selectedInstruction.content);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    setTitle("");
    setContent("");
    setSelectedInstruction(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleSaveClick = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    try {
      if (isCreating) {
        // Create new instruction
        const { data, error } = await supabase
          .from('custom_instructions')
          .insert([
            { 
              title, 
              content, 
              is_active: true 
            }
          ])
          .select();

        if (error) {
          console.error('Error creating instruction:', error);
          toast.error('Failed to create instruction');
          return;
        }

        toast.success('Instruction created successfully');
        setIsCreating(false);
        
        if (data && data[0]) {
          setSelectedInstruction(data[0] as CustomInstruction);
        }
      } else if (isEditing && selectedInstruction) {
        // Update existing instruction
        const { error } = await supabase
          .from('custom_instructions')
          .update({ 
            title, 
            content, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', selectedInstruction.id);

        if (error) {
          console.error('Error updating instruction:', error);
          toast.error('Failed to update instruction');
          return;
        }

        toast.success('Instruction updated successfully');
        setIsEditing(false);
        
        // Update the selected instruction with new values
        setSelectedInstruction({
          ...selectedInstruction,
          title,
          content,
          updated_at: new Date().toISOString()
        });
      }

      // Refresh instructions list
      fetchInstructions();
    } catch (error) {
      console.error('Error saving instruction:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleDeleteClick = async () => {
    if (!selectedInstruction) return;

    if (!confirm('Are you sure you want to delete this instruction?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('custom_instructions')
        .delete()
        .eq('id', selectedInstruction.id);

      if (error) {
        console.error('Error deleting instruction:', error);
        toast.error('Failed to delete instruction');
        return;
      }

      toast.success('Instruction deleted successfully');
      setSelectedInstruction(null);
      fetchInstructions();
    } catch (error) {
      console.error('Error deleting instruction:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Sidebar with instruction list */}
      <Card className={cn(
        "w-full lg:w-1/3 h-full overflow-hidden",
        isDarkMode ? "dark-apple-card" : "apple-card"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Instructions</CardTitle>
            <Button size="sm" onClick={handleCreateClick} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-2 overflow-y-auto" style={{ maxHeight: "calc(100% - 80px)" }}>
          <div className="space-y-2">
            {instructions.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No instructions found. Create your first one!
              </div>
            ) : (
              instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    selectedInstruction?.id === instruction.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleSelectInstruction(instruction)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium truncate">{instruction.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        Updated: {formatDate(instruction.updated_at || instruction.created_at)}
                      </p>
                    </div>
                    {instruction.is_active && (
                      <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Active
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main content area */}
      <Card className={cn(
        "w-full lg:w-2/3 h-full overflow-hidden",
        isDarkMode ? "dark-apple-card" : "apple-card"
      )}>
        {isEditing || isCreating ? (
          <>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{isCreating ? "Create New Instruction" : "Edit Instruction"}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveClick} className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="Instruction title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[300px] p-2 rounded-md border border-input bg-background"
                  placeholder="Enter your custom instructions here..."
                />
              </div>
            </CardContent>
          </>
        ) : selectedInstruction ? (
          <>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{selectedInstruction.title}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleDeleteClick} 
                    className="flex items-center gap-1 text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleEditClick} 
                    className="flex items-center gap-1"
                  >
                    <FileEdit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto prose prose-sm max-w-none" style={{ maxHeight: "calc(100% - 80px)" }}>
              <div className="whitespace-pre-wrap">{selectedInstruction.content}</div>
            </CardContent>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <h3 className="text-xl font-medium mb-2">Select or Create an Instruction</h3>
            <p className="text-muted-foreground mb-4">
              Custom instructions help Atlas AI understand your preferences and needs.
            </p>
            <Button onClick={handleCreateClick} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Instruction
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default KnowledgeBase;
