
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, BookOpen, FileText } from "lucide-react";

interface KnowledgeBaseProps {
  isDarkMode: boolean;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ isDarkMode }) => {
  const [documents, setDocuments] = useState([
    { id: 1, title: "Trinity Dodge Product Catalog", type: "file", size: "2.3 MB" },
    { id: 2, title: "Taylorville Local Information", type: "text", size: "15 KB" },
    { id: 3, title: "Dodge Specifications", type: "file", size: "4.1 MB" },
    { id: 4, title: "Sales Scripts", type: "text", size: "30 KB" }
  ]);
  
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');

  const handleAddDocument = () => {
    if (newDocTitle.trim()) {
      setDocuments([
        ...documents,
        { 
          id: documents.length + 1, 
          title: newDocTitle, 
          type: "text", 
          size: `${Math.floor(newDocContent.length / 100)} KB` 
        }
      ]);
      
      setNewDocTitle('');
      setNewDocContent('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Knowledge Base</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map(doc => (
                <div 
                  key={doc.id} 
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition cursor-pointer`}
                >
                  <div className="flex items-center">
                    {doc.type === "file" ? 
                      <FileText className="h-5 w-5 mr-2 text-blue-500" /> : 
                      <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                    }
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
          <CardHeader>
            <CardTitle>Add Knowledge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Document Title</label>
                <Input 
                  value={newDocTitle} 
                  onChange={(e) => setNewDocTitle(e.target.value)} 
                  placeholder="Enter title"
                  className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Content</label>
                <Textarea 
                  value={newDocContent} 
                  onChange={(e) => setNewDocContent(e.target.value)} 
                  placeholder="Enter text content or paste document text"
                  rows={6}
                  className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">
                  Upload File
                </Button>
                <Button onClick={handleAddDocument} disabled={!newDocTitle.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Knowledge Base
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBase;
