
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react';
import { UniverseComponentProps } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  icon,
  title,
  description,
  children,
  delay = 0
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl",
        "backdrop-blur-md border",
        isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start mb-6">
        <div className={cn(
          "p-2 rounded-lg mr-4",
          isDarkMode ? "bg-white/10" : "bg-black/5"
        )}>
          {icon}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-1">
            {title}
          </h3>
          
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-white/70" : "text-black/70"
          )}>
            {description}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

interface SettingItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, description, children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <Label htmlFor={label.toLowerCase()} className="text-base">{label}</Label>
        {description && (
          <p className={cn(
            "text-xs",
            isDarkMode ? "text-white/60" : "text-black/60"
          )}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

const SettingsPanel: React.FC<UniverseComponentProps> = ({ scrollY }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="w-full py-8 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={cn(
            "p-3 rounded-full",
            isDarkMode ? "bg-white/10" : "bg-black/5"
          )}>
            <Settings className="h-10 w-10 text-gray-500" />
          </div>
        </motion.div>
        
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          App{" "}
          <span className={cn(
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-300 dark:to-gray-500"
          )}>
            Settings
          </span>
        </motion.h1>
        
        <motion.p
          className={cn(
            "max-w-3xl mx-auto text-lg",
            isDarkMode ? "text-white/70" : "text-black/70"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Customize your experience with personalized settings and preferences.
        </motion.p>
      </motion.div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <SettingsSection
          icon={<Palette className="h-6 w-6 text-blue-500" />}
          title="Appearance"
          description="Customize the look and feel of the application"
          delay={0.2}
        >
          <SettingItem 
            label="Dark Mode" 
            description="Toggle between light and dark theme"
          >
            <Switch 
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-blue-500"
            />
          </SettingItem>
          
          <SettingItem 
            label="High Contrast" 
            description="Increase contrast for better visibility"
          >
            <Switch id="high-contrast" />
          </SettingItem>
          
          <SettingItem 
            label="Animation Effects" 
            description="Enable or disable UI animations"
          >
            <Switch id="animations" defaultChecked />
          </SettingItem>
        </SettingsSection>
        
        <SettingsSection
          icon={<Bell className="h-6 w-6 text-purple-500" />}
          title="Notifications"
          description="Manage how and when you receive alerts"
          delay={0.3}
        >
          <SettingItem 
            label="Push Notifications" 
            description="Receive alerts even when the app is closed"
          >
            <Switch id="push-notifications" defaultChecked />
          </SettingItem>
          
          <SettingItem 
            label="Email Notifications" 
            description="Get important updates via email"
          >
            <Switch id="email-notifications" />
          </SettingItem>
          
          <SettingItem 
            label="Sound Effects" 
            description="Play sounds for notifications"
          >
            <Switch id="sound-effects" />
          </SettingItem>
        </SettingsSection>
        
        <SettingsSection
          icon={<Shield className="h-6 w-6 text-green-500" />}
          title="Privacy & Security"
          description="Control your data and security preferences"
          delay={0.4}
        >
          <SettingItem 
            label="Two-Factor Authentication" 
            description="Add an extra layer of security"
          >
            <Switch id="two-factor" />
          </SettingItem>
          
          <SettingItem 
            label="Data Collection" 
            description="Allow anonymous usage data to improve the app"
          >
            <Switch id="data-collection" defaultChecked />
          </SettingItem>
          
          <SettingItem 
            label="Activity History" 
            description="Store your activity history"
          >
            <Switch id="activity-history" defaultChecked />
          </SettingItem>
        </SettingsSection>
        
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            className={cn(
              "px-6 py-2 rounded-full",
              "bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-700 dark:to-gray-600",
              "text-white",
              "shadow-lg hover:shadow-xl shadow-gray-500/20",
              "border border-white/10",
              "transition-all duration-300"
            )}
            size="lg"
          >
            <Settings className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPanel;
