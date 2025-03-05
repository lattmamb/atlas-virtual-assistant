
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { SparklesCore } from '@/components/ui/sparkles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, MessageSquare, Settings, Workflow, Sparkles, Link, Home } from 'lucide-react';
import BackgroundEffects from '@/components/widgets/BackgroundEffects';
import { useIsMobile } from '@/hooks/use-mobile';

const UniverseHome: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, currentTheme } = useTheme();
  const isMobile = useIsMobile();

  // Define all the pages/apps available in our universe
  const universeApps = [
    {
      id: 'vision',
      title: 'Apple Vision Pro',
      description: 'Experience the future of augmented reality',
      icon: <Apple className="h-5 w-5" />,
      path: '/applevisionpro',
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      image: '/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png'
    },
    {
      id: 'atlas',
      title: 'Atlas AI',
      description: 'Your personal AI assistant',
      icon: <Sparkles className="h-5 w-5" />,
      path: '/atlas',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
      image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png'
    },
    {
      id: 'atlaslink',
      title: 'Atlas Link',
      description: 'Connect with AI services',
      icon: <Link className="h-5 w-5" />,
      path: '/atlaslink',
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      image: '/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png'
    },
    {
      id: 'chatroom',
      title: 'Chat Room',
      description: 'Engage in AI conversations',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/chatroom',
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png'
    },
    {
      id: 'workflows',
      title: 'Workflows',
      description: 'Create and manage automation',
      icon: <Workflow className="h-5 w-5" />,
      path: '/workflows',
      color: 'bg-gradient-to-br from-orange-500 to-amber-600',
      image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your experience',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings',
      color: 'bg-gradient-to-br from-slate-500 to-slate-700',
      image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden theme-${currentTheme}`}>
      <BackgroundEffects currentTheme={currentTheme} />
      
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Atlas Universe
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our suite of applications designed to enhance your digital experience
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {universeApps.map((app) => (
            <motion.div 
              key={app.id}
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
              onClick={() => navigate(app.path)}
            >
              <Card className={cn(
                "cursor-pointer overflow-hidden h-full transition-all border border-slate-200 dark:border-slate-800",
                "hover:shadow-lg"
              )}>
                <div className={cn("h-40 relative", app.color)}>
                  {app.image && (
                    <img 
                      src={app.image} 
                      alt={app.title} 
                      className="w-full h-full object-cover opacity-60"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                      {app.icon}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {app.title}
                  </CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(app.path);
                    }}
                  >
                    Launch {app.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UniverseHome;
