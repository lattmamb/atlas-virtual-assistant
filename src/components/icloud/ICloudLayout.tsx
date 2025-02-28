
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, Settings, User, Mail, Calendar, Photos, Cloud, Search, Globe } from 'lucide-react';
import AtlasChatBot from '@/components/AtlasChatBot';
import Widget from '@/components/icloud/Widget';
import { NavbarDemo } from '@/components/ui/code-demo';
import { VercelV0Chat } from '@/components/ui/v0-ai-chat';
import { cn } from '@/lib/utils';

type BackgroundOption = {
  name: string;
  bgClass: string;
};

const backgrounds: BackgroundOption[] = [
  { name: 'Default', bgClass: 'bg-gradient-to-br from-blue-50 to-white' },
  { name: 'Minimal', bgClass: 'bg-white' },
  { name: 'Sunset', bgClass: 'bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50' },
  { name: 'Ocean', bgClass: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50' },
  { name: 'Forest', bgClass: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50' },
];

const ICloudLayout = () => {
  const [background, setBackground] = useState<BackgroundOption>(backgrounds[0]);
  const navigate = useNavigate();
  
  return (
    <div className={cn("min-h-screen w-full relative overflow-hidden transition-colors duration-500", background.bgClass)}>
      {/* Top Navigation */}
      <header className="flex items-center justify-between py-2 px-4 bg-white/60 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-gray-800" />
            <span className="font-medium text-gray-800">iCloud</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm text-gray-600 hover:text-gray-800">Mail</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Contacts</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Calendar</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Photos</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Drive</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Notes</button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search iCloud" 
              className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-full bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-[180px]"
            />
          </div>
          
          <button 
            onClick={() => navigate('/settings')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <Settings className="h-4 w-4" />
          </button>
          
          <div className="h-7 w-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
            JD
          </div>
        </div>
      </header>
      
      {/* Background options */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 z-40">
        {backgrounds.map((bg) => (
          <button
            key={bg.name}
            onClick={() => setBackground(bg)}
            className={cn(
              "w-6 h-6 rounded-full transition-all border",
              bg.name === background.name 
                ? "border-blue-500 scale-110" 
                : "border-gray-200 hover:scale-105"
            )}
            style={{ background: getPreviewColor(bg.bgClass) }}
            title={bg.name}
          />
        ))}
      </div>
      
      {/* Widgets */}
      <div className="pt-8 relative h-[calc(100vh-58px)]">
        <Widget 
          title="Mail" 
          icon={<Mail className="h-5 w-5" />}
          className="top-[80px] left-[40px]"
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex-1">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Inbox</h3>
                <span className="text-xs text-gray-500">Updated just now</span>
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="py-2 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between mb-1">
                    <div className="font-medium text-sm">Company Newsletter</div>
                    <div className="text-xs text-gray-500">10:{i+10} AM</div>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Latest updates and announcements from our company...
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition">
                Compose New Email
              </button>
            </div>
          </div>
        </Widget>
        
        <Widget 
          title="Calendar" 
          icon={<Calendar className="h-5 w-5" />} 
          className="top-[80px] left-[400px]"
        >
          <div className="p-4">
            <div className="grid grid-cols-7 mb-2 text-center">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="text-xs text-gray-500">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square flex items-center justify-center text-xs rounded-full",
                    i === 14 && "bg-blue-500 text-white",
                    i !== 14 && "hover:bg-gray-100 cursor-pointer"
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="rounded-md bg-blue-50 p-2 text-xs">
                <div className="font-medium">Team Meeting</div>
                <div className="text-gray-500">2:00 PM - 3:00 PM</div>
              </div>
              <div className="rounded-md bg-purple-50 p-2 text-xs">
                <div className="font-medium">Project Review</div>
                <div className="text-gray-500">4:00 PM - 5:00 PM</div>
              </div>
            </div>
          </div>
        </Widget>
        
        <Widget 
          title="Photos" 
          icon={<Photos className="h-5 w-5" />}
          className="top-[380px] left-[40px]"
        >
          <div className="p-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-medium text-sm">Recent Photos</h3>
              <button className="text-xs text-blue-500">View All</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-md"
                />
              ))}
            </div>
          </div>
        </Widget>
        
        <Widget 
          title="iCloud Drive" 
          icon={<Cloud className="h-5 w-5" />}
          className="top-[380px] left-[400px]"
        >
          <div className="p-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-medium text-sm">Recent Files</h3>
              <button className="text-xs text-blue-500">View All</button>
            </div>
            {['Document.pdf', 'Presentation.key', 'Spreadsheet.numbers', 'Image.jpg'].map((file, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  {file.split('.').pop()}
                </div>
                <div>
                  <div className="text-sm">{file}</div>
                  <div className="text-xs text-gray-500">Modified {i + 1}d ago</div>
                </div>
              </div>
            ))}
          </div>
        </Widget>
        
        <Widget 
          title="Weather" 
          icon={<Globe className="h-5 w-5" />}
          className="top-[120px] left-[750px]"
          minWidth="280px"
          minHeight="200px"
        >
          <div className="p-4 text-center">
            <div className="text-5xl font-light mb-2">72°</div>
            <div className="text-sm">Sunny</div>
            <div className="text-xs text-gray-500 mb-4">San Francisco, CA</div>
            
            <div className="grid grid-cols-5 gap-1 text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className="flex flex-col items-center">
                  <div className="text-gray-500">{day}</div>
                  <div className="my-1">{72 + i > 75 ? 'Sunny' : 'Cloudy'}</div>
                  <div>{72 + i}°</div>
                </div>
              ))}
            </div>
          </div>
        </Widget>
        
        <Widget 
          title="Notes" 
          className="top-[340px] left-[750px]"
          minWidth="280px"
          minHeight="220px"
        >
          <div className="p-4">
            <textarea 
              className="w-full h-full bg-transparent resize-none border-0 focus:outline-none focus:ring-0 text-sm"
              placeholder="Type your notes here..."
            />
          </div>
        </Widget>
        
        {/* Add Atlas Assistant */}
        <AtlasChatBot />
      </div>
    </div>
  );
};

// Helper function to extract a preview color from Tailwind classes
const getPreviewColor = (bgClass: string): string => {
  if (bgClass.includes('white')) return '#ffffff';
  if (bgClass.includes('blue')) return '#dbeafe';
  if (bgClass.includes('orange')) return '#fff7ed';
  if (bgClass.includes('emerald')) return '#ecfdf5';
  if (bgClass.includes('cyan')) return '#ecfeff';
  return '#f8fafc';
};

export default ICloudLayout;
