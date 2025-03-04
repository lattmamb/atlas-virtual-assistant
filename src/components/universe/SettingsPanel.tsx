
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Settings, Moon, Sun, BellRing, Shield, Eye, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPanel: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          className="mb-4 inline-block p-3 rounded-full bg-gray-500/20 text-gray-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Settings className="h-8 w-8" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          System Settings
        </h1>
        <p className="text-lg max-w-3xl opacity-80">
          Customize your experience and manage your preferences.
        </p>
      </div>
      
      <div className={cn(
        "rounded-xl overflow-hidden",
        "border backdrop-blur-lg",
        isDarkMode
          ? "bg-white/5 border-white/10"
          : "bg-white/60 border-gray-200/50"
      )}>
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <div className="p-4 border-b border-white/10">
            <TabsList className={cn(
              "grid grid-cols-4 w-full",
              isDarkMode
                ? "bg-white/5"
                : "bg-black/5"
            )}>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="ai">AI & Learning</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className="text-sm opacity-70">Receive alerts and updates</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sync Across Devices</div>
                    <div className="text-sm opacity-70">Keep settings in sync</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Activity Log</div>
                    <div className="text-sm opacity-70">Track your actions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Language Preference</h3>
                  <select className={cn(
                    "w-full px-3 py-2 rounded-md",
                    "border backdrop-blur-sm",
                    isDarkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white/60 border-gray-200/50"
                  )}>
                    <option value="en">English (US)</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    <option value="jp">Japanese</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm opacity-70">Switch between light and dark themes</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-400" />
                    <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                    <Moon className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-2">Interface Density</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Compact</span>
                    <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                    <span className="text-xs">Spacious</span>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-2">Animation Intensity</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Minimal</span>
                    <Slider defaultValue={[75]} max={100} step={1} className="flex-1" />
                    <span className="text-xs">Full</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-medium mb-2">Accent Color</div>
                  <div className="flex gap-2">
                    {['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} as accent color`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy & Security</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <div>
                      <div className="font-medium">Enhanced Protection</div>
                      <div className="text-sm opacity-70">Additional security features</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <div>
                      <div className="font-medium">Privacy Mode</div>
                      <div className="text-sm opacity-70">Limit data collection</div>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="font-medium">Privacy Alerts</div>
                      <div className="text-sm opacity-70">Receive notifications about privacy concerns</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-4">
                  <button className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "bg-red-500/20 text-red-400",
                    "hover:bg-red-500/30 transition-colors"
                  )}>
                    Clear All Data
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">AI Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <div>
                      <div className="font-medium">Vision AI</div>
                      <div className="text-sm opacity-70">Enable advanced AI capabilities</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <div className="font-medium mb-2">AI Assistance Level</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Minimal</span>
                    <Slider defaultValue={[80]} max={100} step={1} className="flex-1" />
                    <span className="text-xs">Proactive</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Learning from Interactions</div>
                    <div className="text-sm opacity-70">Allow AI to improve based on your usage</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Custom AI Agent Creation</div>
                    <div className="text-sm opacity-70">Create and deploy specialized AI assistants</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
