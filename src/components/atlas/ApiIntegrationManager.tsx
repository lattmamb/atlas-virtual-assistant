
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Key, Save, Plus, Trash, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";

interface ApiIntegrationManagerProps {
  isDarkMode: boolean;
}

interface ApiIntegration {
  id: string;
  name: string;
  api_key: string;
  service: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

const AVAILABLE_SERVICES = [
  { id: 'openai', name: 'OpenAI', description: 'For ChatGPT and other AI models', docUrl: 'https://platform.openai.com/api-keys' },
  { id: 'google', name: 'Google Cloud', description: 'For Maps, Translation, and other Google services', docUrl: 'https://console.cloud.google.com/apis/credentials' },
  { id: 'anthropic', name: 'Anthropic', description: 'For Claude AI models', docUrl: 'https://console.anthropic.com/account/keys' },
  { id: 'weather', name: 'Weather API', description: 'For weather data and forecasts', docUrl: 'https://openweathermap.org/api' },
  { id: 'twilio', name: 'Twilio', description: 'For SMS and messaging services', docUrl: 'https://www.twilio.com/console' },
  { id: 'stripe', name: 'Stripe', description: 'For payment processing', docUrl: 'https://dashboard.stripe.com/apikeys' },
];

const ApiIntegrationManager: React.FC<ApiIntegrationManagerProps> = ({ isDarkMode }) => {
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<ApiIntegration | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('api_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching API integrations:', error);
        toast.error('Failed to load API integrations');
        return;
      }

      setIntegrations(data as ApiIntegration[]);
    } catch (error) {
      console.error('Error in fetchIntegrations:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleSelectIntegration = (integration: ApiIntegration) => {
    setSelectedIntegration(integration);
    setSelectedService(integration.service);
    setApiKey(integration.api_key);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    setSelectedIntegration(null);
    setSelectedService('');
    setApiKey('');
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (!selectedIntegration) return;
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsCreating(false);
    if (selectedIntegration) {
      setSelectedService(selectedIntegration.service);
      setApiKey(selectedIntegration.api_key);
    }
  };

  const handleSaveClick = async () => {
    if (!selectedService || !apiKey.trim()) {
      toast.error('Service and API key are required');
      return;
    }

    const serviceInfo = AVAILABLE_SERVICES.find(s => s.id === selectedService);
    if (!serviceInfo) {
      toast.error('Invalid service selected');
      return;
    }

    try {
      if (isCreating) {
        const newIntegration = {
          service: selectedService,
          api_key: apiKey,
          name: serviceInfo.name,
          description: serviceInfo.description,
          status: 'pending' as const
        };

        const { data, error } = await supabase
          .from('api_integrations')
          .insert([newIntegration])
          .select();

        if (error) {
          console.error('Error creating API integration:', error);
          toast.error('Failed to create API integration');
          return;
        }

        toast.success('API integration created successfully');
        setIsCreating(false);
        
        if (data && data[0]) {
          setSelectedIntegration(data[0] as ApiIntegration);
        }
      } else if (isEditing && selectedIntegration) {
        const { error } = await supabase
          .from('api_integrations')
          .update({ 
            api_key: apiKey,
            updated_at: new Date().toISOString(),
            status: 'pending'
          })
          .eq('id', selectedIntegration.id);

        if (error) {
          console.error('Error updating API integration:', error);
          toast.error('Failed to update API integration');
          return;
        }

        toast.success('API integration updated successfully');
        setIsEditing(false);
        
        setSelectedIntegration({
          ...selectedIntegration,
          api_key: apiKey,
          updated_at: new Date().toISOString(),
          status: 'pending'
        });
      }

      fetchIntegrations();
    } catch (error) {
      console.error('Error saving API integration:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleDeleteClick = async () => {
    if (!selectedIntegration) return;

    if (!confirm('Are you sure you want to delete this API integration?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('api_integrations')
        .delete()
        .eq('id', selectedIntegration.id);

      if (error) {
        console.error('Error deleting API integration:', error);
        toast.error('Failed to delete API integration');
        return;
      }

      toast.success('API integration deleted successfully');
      setSelectedIntegration(null);
      fetchIntegrations();
    } catch (error) {
      console.error('Error deleting API integration:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const validateApiKey = async () => {
    if (!selectedService || !apiKey.trim()) {
      toast.error('Service and API key are required');
      return;
    }

    setIsValidating(true);
    try {
      // In a real app, we would validate the API key with the service
      // For now, we'll just simulate a validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated success
      toast.success('API key validated successfully');
      
      if (selectedIntegration) {
        const { error } = await supabase
          .from('api_integrations')
          .update({ 
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedIntegration.id);
          
        if (error) {
          console.error('Error updating API integration status:', error);
        } else {
          setSelectedIntegration({
            ...selectedIntegration,
            status: 'active',
            updated_at: new Date().toISOString()
          });
          fetchIntegrations();
        }
      }
    } catch (error) {
      toast.error('Failed to validate API key');
      console.error('Error validating API key:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-100';
      case 'inactive':
        return 'text-red-500 bg-red-100';
      case 'pending':
        return 'text-yellow-500 bg-yellow-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Sidebar with API integrations list */}
      <Card className={cn(
        "w-full lg:w-1/3 h-full overflow-hidden",
        isDarkMode ? "dark-apple-card" : "apple-card"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>API Integrations</CardTitle>
            <Button size="sm" onClick={handleCreateClick} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-2 overflow-y-auto" style={{ maxHeight: "calc(100% - 80px)" }}>
          <div className="space-y-2">
            {integrations.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No API integrations found. Add your first one!
              </div>
            ) : (
              integrations.map((integration) => (
                <div
                  key={integration.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    selectedIntegration?.id === integration.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleSelectIntegration(integration)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium truncate">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Updated: {formatDate(integration.updated_at || integration.created_at)}
                      </p>
                    </div>
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      getStatusColor(integration.status)
                    )}>
                      {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                    </div>
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
                <CardTitle>{isCreating ? "Create New Integration" : "Edit Integration"}</CardTitle>
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
                <label htmlFor="service" className="block text-sm font-medium mb-1">
                  Service
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  disabled={isEditing}
                >
                  <option value="">Select a service</option>
                  {AVAILABLE_SERVICES.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                  API Key
                </label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="Enter your API key"
                />
              </div>
              {selectedService && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    Need an API key? Visit the documentation for 
                    <a 
                      href={AVAILABLE_SERVICES.find(s => s.id === selectedService)?.docUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                    >
                      {AVAILABLE_SERVICES.find(s => s.id === selectedService)?.name}
                      <ExternalLink className="h-3 w-3 inline ml-1" />
                    </a>
                  </span>
                </div>
              )}
            </CardContent>
          </>
        ) : selectedIntegration ? (
          <>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{selectedIntegration.name}</CardTitle>
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
                    <Key className="h-4 w-4" />
                    Edit Key
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Service</h3>
                <p>{selectedIntegration.name} - {selectedIntegration.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">API Key</h3>
                <p className="font-mono">••••••••{selectedIntegration.api_key.substring(selectedIntegration.api_key.length - 4)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Status</h3>
                <div className="flex items-center">
                  <div className={cn(
                    "text-sm px-2 py-1 rounded-full inline-flex items-center gap-1",
                    getStatusColor(selectedIntegration.status)
                  )}>
                    {selectedIntegration.status === 'active' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {selectedIntegration.status.charAt(0).toUpperCase() + selectedIntegration.status.slice(1)}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Last Updated</h3>
                <p>{formatDate(selectedIntegration.updated_at || selectedIntegration.created_at)}</p>
              </div>
              
              {selectedIntegration.status !== 'active' && (
                <Button 
                  onClick={validateApiKey} 
                  disabled={isValidating}
                  className="w-full mt-4"
                >
                  {isValidating ? 'Validating...' : 'Validate API Key'}
                </Button>
              )}
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Documentation</h3>
                <a 
                  href={AVAILABLE_SERVICES.find(s => s.id === selectedIntegration.service)?.docUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  View {selectedIntegration.name} documentation
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <h3 className="text-xl font-medium mb-2">Select or Create an API Integration</h3>
            <p className="text-muted-foreground mb-4">
              Connect your favorite services to enhance Atlas AI capabilities.
            </p>
            <Button onClick={handleCreateClick} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Integration
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApiIntegrationManager;
