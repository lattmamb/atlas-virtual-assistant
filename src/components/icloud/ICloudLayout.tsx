import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import Widget from './Widget';
import { Image, Mail, Calendar, FileText, Settings, MessageSquare } from 'lucide-react';
import AtlasChatBot from '@/components/AtlasChatBot';
import { VercelV0Chat } from '@/components/ui/v0-ai-chat';

interface ICloudLayoutProps {
  children: React.ReactNode;
}

const ICloudLayout: React.FC<ICloudLayoutProps> = ({ children }) => {
  const [background, setBackground] = useState<string>('bg-gradient-to-r from-blue-50 to-blue-100');
  const isMobile = useIsMobile();
  
  const backgroundOptions = [
    'bg-gradient-to-r from-blue-50 to-blue-100',
    'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
    'bg-gradient-to-r from-green-50 to-emerald-50',
    'bg-[url(/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png)] bg-cover',
    'bg-[url(/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png)] bg-cover',
  ];

  return (
    <div className={cn(
      'min-h-screen font-sans p-2 md:p-6 transition-all duration-500',
      background
    )}>
      <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-6 right-6'} z-10 flex space-x-1 md:space-x-2`}>
        {backgroundOptions.map((bg, index) => (
          <button
            key={index}
            className={cn(
              `${isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full border-2 transition-all`,
              bg.includes('url') 
                ? bg.replace('bg-[url(', 'bg-[url(') // Keep the URL background
                : bg, // Apply the gradient class directly
              background === bg ? 'border-blue-500 scale-110' : 'border-white/50'
            )}
            onClick={() => setBackground(bg)}
            aria-label={`Background option ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-12 md:mt-16">
        {/* Main content passed as children */}
        {children}
        
        {/* Demo widgets */}
        <Widget
          title="Mail"
          icon={<Mail className="h-5 w-5" />}
          minWidth={isMobile ? "260px" : "280px"}
          className="hidden md:block"
        >
          <div className="p-4 text-center text-gray-500">
            <p>Your inbox is empty</p>
          </div>
        </Widget>
        
        <Widget
          title="Photos"
          icon={<Image className="h-5 w-5" />}
          minWidth={isMobile ? "260px" : "280px"}
          className="hidden lg:block"
        >
          <div className="grid grid-cols-3 gap-2 p-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="aspect-square bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </Widget>
        
        <Widget
          title="Calendar"
          icon={<Calendar className="h-5 w-5" />}
          minWidth={isMobile ? "260px" : "320px"}
          className="hidden lg:block"
        >
          <div className="p-4">
            <div className="text-sm font-medium">June 2023</div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square flex items-center justify-center text-xs rounded-full hover:bg-gray-100"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </Widget>
      </div>

      {/* Atlas Chatbot widget */}
      <AtlasChatBot />
    </div>
  );
};

export default ICloudLayout;
