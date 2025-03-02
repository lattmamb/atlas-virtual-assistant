
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';
import AppGrid from '@/components/icloud/AppGrid';
import ICloudLayout from '@/components/icloud/ICloudLayout';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { AtlasChatBot } from '@/components/atlas/index';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  MessageSquare, 
  Workflow, 
  Shield, 
  Grid, 
  Mail, 
  Image, 
  Calendar,
  FileText,
  Clock,
  Cloud,
  Music,
  Search,
  Plus,
  X
} from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { useTheme } from '@/context/ThemeContext';
import ExpandedWeatherWidget from '@/components/widgets/ExpandedWeatherWidget';
import InventoryWidget from '@/components/widgets/InventoryWidget';

export default function Index() {
  const { currentTheme, isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({ temp: '72°', condition: 'Sunny', location: 'Taylorville, IL' });
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'time', 'photos', 'mail', 'calendar', 'notes', 'storage', 'music'
  ]);
  
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', dateOptions);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const photos = [
    { id: 1, src: '/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png', alt: 'Photo 1' },
    { id: 2, src: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png', alt: 'Photo 2' },
    { id: 3, src: '/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png', alt: 'Photo 3' }
  ];
  
  const emails = [
    { id: 1, subject: 'Dodge Ram Pricing Update', sender: 'sales@trinitydodge.com', time: '9:45 AM', read: false },
    { id: 2, subject: 'Your Charger Test Drive', sender: 'service@trinitydodge.com', time: 'Yesterday', read: true },
    { id: 3, subject: 'Taylorville Event Reminder', sender: 'events@taylorville.com', time: 'Jul 15', read: true }
  ];
  
  const events = [
    { id: 1, title: 'Trinity Dodge Sales Meeting', time: '10:00 AM', date: 'Today' },
    { id: 2, title: 'Dodge Durango Test Drive', time: '2:30 PM', date: 'Tomorrow' },
    { id: 3, title: 'Taylorville Fair', time: 'All Day', date: 'Jul 20' }
  ];
  
  const availableWidgets = [
    { id: 'time', name: 'Time & Weather', icon: <Clock className="h-4 w-4" /> },
    { id: 'weather', name: 'Expanded Weather', icon: <Cloud className="h-4 w-4" /> },
    { id: 'inventory', name: 'Vehicle Inventory', icon: <Car className="h-4 w-4" /> },
    { id: 'photos', name: 'Photos', icon: <Image className="h-4 w-4" /> },
    { id: 'mail', name: 'Mail', icon: <Mail className="h-4 w-4" /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
    { id: 'notes', name: 'Notes', icon: <FileText className="h-4 w-4" /> },
    { id: 'storage', name: 'iCloud Storage', icon: <Cloud className="h-4 w-4" /> },
    { id: 'music', name: 'Music', icon: <Music className="h-4 w-4" /> },
  ];
  
  const handleRefreshWeather = () => {
    toast.success("Weather updated for Taylorville, IL", {
      position: "top-center",
      duration: 2000
    });
  };
  
  const handlePhotoClick = (id: number) => {
    toast("Photo viewer coming soon", {
      icon: "🖼️",
      position: "top-center"
    });
  };
  
  const handleEmailClick = (id: number) => {
    toast("Mail app coming soon", {
      icon: "📧",
      position: "top-center"
    });
  };
  
  const toggleWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter(id => id !== widgetId));
    } else {
      setActiveWidgets([...activeWidgets, widgetId]);
    }
  };
  
  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <div 
        className="fixed inset-0 z-0 transition-all duration-700"
        style={{ background: `var(--background-gradient)` }}
      >
        <GridPattern 
          width={40} 
          height={40} 
          className={cn(
            "absolute inset-0 fill-white/[0.01] stroke-white/[0.05]",
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
          )}
          strokeDasharray="1 3"
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 transition-all duration-700" 
          style={{ backgroundColor: `var(--accent-color)`, opacity: 0.1 }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 transition-all duration-700"
          style={{ backgroundColor: `var(--accent-color)`, opacity: 0.05 }}></div>
      </div>
      
      <ICloudLayout>
        <div className="relative z-10 mt-4 mb-8">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <AnimatedLogo />
              <div className="ml-3">
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Atlas Assistant
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Welcome to Trinity Dodge's AI platform
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "group flex gap-2 items-center transition-all",
                  isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
                )}
                onClick={() => setShowAppGrid(!showAppGrid)}
              >
                <Grid size={16} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Apps</span>
              </Button>
              
              <Link to="/atlas-link">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "group flex gap-2 items-center transition-all",
                    isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
                  )}
                >
                  <Shield size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Atlas Link</span>
                </Button>
              </Link>
              
              <Link to="/workflows">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "group flex gap-2 items-center transition-all",
                    isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
                  )}
                >
                  <Workflow size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Workflows</span>
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "group flex gap-2 items-center transition-all",
                    isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
                  )}
                >
                  <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Chat</span>
                </Button>
              </Link>
              
              <Link to="/settings">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "group flex gap-2 items-center transition-all",
                    isDarkMode ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-black hover:bg-black/10"
                  )}
                >
                  <Settings size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </Link>
            </div>
          </header>
          
          {showAppGrid && (
            <AppGrid 
              isDarkMode={isDarkMode} 
              onClose={() => setShowAppGrid(false)} 
            />
          )}
          
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Dashboard</h2>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center gap-1",
                isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
              )}
              onClick={() => setShowWidgetSelector(!showWidgetSelector)}
            >
              {showWidgetSelector ? (
                <>
                  <X size={14} />
                  <span className="text-xs">Close</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span className="text-xs">Customize</span>
                </>
              )}
            </Button>
          </div>
          
          {showWidgetSelector && (
            <div 
              className={cn(
                "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6 p-4 rounded-xl animate-fade-in",
                isDarkMode ? "bg-black/20 backdrop-blur-md border border-white/10" : "bg-white/20 backdrop-blur-md border border-black/10"
              )}
            >
              {availableWidgets.map(widget => (
                <Button
                  key={widget.id}
                  variant={activeWidgets.includes(widget.id) ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-auto py-2 flex flex-col items-center gap-2",
                    activeWidgets.includes(widget.id) 
                      ? "bg-blue-500 hover:bg-blue-600 text-white" 
                      : isDarkMode ? "border-white/10" : "border-black/10"
                  )}
                  onClick={() => toggleWidget(widget.id)}
                >
                  {widget.icon}
                  <span className="text-xs">{widget.name}</span>
                </Button>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            
            {activeWidgets.includes('time') && (
              <AppleWidget 
                title="Time & Weather"
                icon={<Clock className="h-5 w-5 text-blue-400" />}
                className="row-span-1"
                onHeaderActionClick={handleRefreshWeather}
                headerActionIcon={<Search className="h-4 w-4" />}
                headerActionTooltip="Update Weather"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="text-3xl font-light mb-2">
                    {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </div>
                  <div className="text-sm text-blue-300 mb-4">{formattedDate}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-2xl font-semibold">{weatherData.temp}</div>
                      <div className="text-sm text-gray-400">{weatherData.condition}</div>
                    </div>
                    <div className="text-sm text-right text-gray-400">
                      {weatherData.location}
                    </div>
                  </div>
                </div>
              </AppleWidget>
            )}
            
            {activeWidgets.includes('weather') && (
              <ExpandedWeatherWidget />
            )}
            
            {activeWidgets.includes('inventory') && (
              <InventoryWidget />
            )}
            
            {activeWidgets.includes('photos') && (
              <AppleWidget 
                title="Photos"
                icon={<Image className="h-5 w-5 text-blue-400" />}
                className="row-span-1"
                headerActionIcon={<Grid className="h-4 w-4" />}
                headerActionTooltip="View All Photos"
              >
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map(photo => (
                      <div 
                        key={photo.id} 
                        className="aspect-square rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => handlePhotoClick(photo.id)}
                      >
                        <img 
                          src={photo.src} 
                          alt={photo.alt} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
                      View All Photos
                    </Button>
                  </div>
                </div>
              </AppleWidget>
            )}
            
            {activeWidgets.includes('mail') && (
              <AppleWidget 
                title="Mail"
                icon={<Mail className="h-5 w-5 text-blue-400" />}
                className="row-span-1"
                badge={emails.filter(email => !email.read).length}
              >
                <div className="p-4">
                  <ul className="space-y-2">
                    {emails.map(email => (
                      <li 
                        key={email.id} 
                        className={cn(
                          "p-2 rounded-lg cursor-pointer transition-all",
                          isDarkMode 
                            ? email.read ? "hover:bg-white/5" : "bg-white/10 hover:bg-white/15"
                            : email.read ? "hover:bg-black/5" : "bg-black/10 hover:bg-black/15"
                        )}
                        onClick={() => handleEmailClick(email.id)}
                      >
                        <div className="flex justify-between">
                          <span className={cn("text-sm", !email.read && "font-medium")}>{email.subject}</span>
                          <span className="text-xs text-gray-400">{email.time}</span>
                        </div>
                        <div className="text-xs text-gray-400">{email.sender}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-4">
                    <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
                      Open Mail App
                    </Button>
                  </div>
                </div>
              </AppleWidget>
            )}
            
            {activeWidgets.includes('calendar') && (
              <AppleWidget 
                title="Calendar"
                icon={<Calendar className="h-5 w-5 text-blue-400" />}
                className="row-span-1 md:col-span-2"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="text-sm text-blue-300 mb-4">Upcoming Events</div>
                  <ul className="space-y-3">
                    {events.map(event => (
                      <li key={event.id} className={cn(
                        "flex justify-between p-3 rounded-lg transition-all cursor-pointer",
                        isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                      )}>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-gray-400">{event.time}</div>
                        </div>
                        <div className="text-sm text-right text-blue-300">
                          {event.date}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-auto pt-4">
                    <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
                      View Full Calendar
                    </Button>
                  </div>
                </div>
              </AppleWidget>
            )}
            
            {activeWidgets.includes('notes') && (
              <AppleWidget 
                title="Notes"
                icon={<FileText className="h-5 w-5 text-blue-400" />}
                className="row-span-1"
              >
                <div className="p-4">
                  <div className={cn(
                    "p-3 rounded-lg border h-[120px]",
                    isDarkMode ? "bg-[#1a1a1a]/50 border-white/10" : "bg-white/50 border-black/10"
                  )}>
                    <textarea 
                      className={cn(
                        "w-full h-full resize-none outline-none placeholder:text-gray-500 text-sm",
                        isDarkMode ? "bg-transparent" : "bg-transparent"
                      )}
                      placeholder="Type a note here..."
                    ></textarea>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
                      Open Notes
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Save Note
                    </Button>
                  </div>
                </div>
              </AppleWidget>
            )}
            
            {activeWidgets.includes('storage') && (
              <AppleWidget 
                title="iCloud Storage"
                icon={<Cloud className="h-5 w-5 text-blue-400" />}
                className="row-span-1"
              >
                <div className="p-4">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm">15.2 GB of 20 GB used</span>
                    <span className="text-xs text-blue-400">Manage</span>
                  </div>
                  <div className={cn(
                    "relative h-2 rounded-full overflow-hidden",
                    isDarkMode ? "bg-white/10" : "bg-black/10"
                  )}>
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: '76%' }}
                    ></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className={cn(
                      "p-2 rounded-lg flex items-center gap-2",
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    )}>
                      <FileText className="h-4 w-4 text-blue-400" />
                      <div className="text-xs">
                        <div>Documents</div>
                        <div className="text-gray-400">4.7 GB</div>
                      </div>
                    </div>
                    <div className={cn(
                      "p-2 rounded-lg flex items-center gap-2",
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    )}>
                      <Image className="h-4 w-4 text-blue-400" />
                      <div className="text-xs">
                        <div>Photos</div>
                        <div className="text-gray-400">8.3 GB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AppleWidget>
            )}
            
            {activeWidgets.includes('music') && (
              <AppleWidget 
                title="Music"
                icon={<Music className="h-5 w-5 text-blue-400" />}
                className="row-span-1"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div className="font-medium text-sm">Not Playing</div>
                    <div className="text-xs text-gray-400">Select a track to play</div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <Button size="icon" variant="ghost" className="rounded-full w-8 h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full w-10 h-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 15 12 5 21 5 3"></polygon></svg>
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full w-8 h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                    </Button>
                  </div>
                </div>
              </AppleWidget>
            )}
          </div>
        </div>
        
        <div className="fixed bottom-4 right-4 z-40">
          <Button 
            className={cn(
              "rounded-full flex items-center justify-center w-12 h-12 p-0 shadow-lg transition-all",
              "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20",
              "theme-glow"
            )}
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="text-white h-5 w-5" />
          </Button>
        </div>

        {showChat && (
          <div className={cn(
            "fixed bottom-20 right-4 z-40 w-80 md:w-96 h-96 shadow-2xl rounded-2xl overflow-hidden animate-fade-in",
            isDarkMode 
              ? "backdrop-blur-xl border border-white/10 bg-[#1a1a1a]/90"
              : "backdrop-blur-xl border border-black/10 bg-white/90",
          )}>
            <AtlasChatBot />
          </div>
        )}
      </ICloudLayout>
    </div>
  );
}

// Add Car import
import { Car } from 'lucide-react';
