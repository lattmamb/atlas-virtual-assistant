
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from 'lucide-react';
import { toast } from "sonner";

const ApiEndpointDisplay = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + '/api/chat')
      .then(() => {
        setIsCopied(true);
        toast({
          description: "API endpoint copied to clipboard"
        });
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          description: "Failed to copy API endpoint"
        });
      });
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-md">
      <h2 className="text-xl font-semibold mb-4">API Endpoint</h2>
      <p className="text-gray-700 mb-2">
        Use the following endpoint to send requests to your chat model:
      </p>
      <div className="relative">
        <Input
          type="text"
          value={window.location.origin + '/api/chat'}
          readOnly
          className="bg-gray-50 cursor-not-allowed"
        />
        <Button
          onClick={handleCopyToClipboard}
          disabled={isCopied}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {isCopied ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ApiEndpointDisplay;
