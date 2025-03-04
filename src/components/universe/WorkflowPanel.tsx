
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { 
  Workflow, 
  ArrowRight, 
  MessageSquare, 
  Mail, 
  Calendar, 
  FileText, 
  BellRing, 
  CheckCircle 
} from 'lucide-react';
import { UniverseComponentProps } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface WorkflowCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: string[];
  color: string;
  delay?: number;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  icon,
  title,
  description,
  steps,
  color,
  delay = 0
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl relative overflow-hidden",
        "backdrop-blur-md border",
        isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={cn(
        "absolute top-0 left-0 w-full h-1",
        `bg-${color}-500/50`
      )} />
      
      <div className="flex items-start mb-4">
        <div className={cn(
          "p-2 rounded-lg mr-3",
          isDarkMode ? "bg-white/10" : "bg-black/5"
        )}>
          {icon}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">
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
      
      <div className={cn(
        "my-4 p-3 rounded-lg",
        isDarkMode ? "bg-white/5" : "bg-black/5"
      )}>
        <h4 className="text-sm font-medium mb-2">Workflow Steps:</h4>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2",
                `bg-${color}-500/20 text-${color}-500`
              )}>
                {index + 1}
              </div>
              <span className="text-sm">{step}</span>
              {index < steps.length - 1 && (
                <ArrowRight className="w-3 h-3 mx-2 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(
            "text-xs",
            `text-${color}-500 hover:text-${color}-400`
          )}
        >
          Edit Workflow <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
};

const WorkflowPanel: React.FC<UniverseComponentProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();
  
  const workflows = [
    {
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      title: "Chat Response Automation",
      description: "Automatically respond to chat messages based on predefined triggers",
      steps: ["New message received", "Analyze content", "Generate response", "Send reply"],
      color: "blue"
    },
    {
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      title: "Email Processing",
      description: "Filter, categorize and respond to emails automatically",
      steps: ["Email received", "Extract content", "Categorize", "Take action"],
      color: "purple"
    },
    {
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      title: "Schedule Management",
      description: "Create calendar events from various sources",
      steps: ["Event request", "Check availability", "Create event", "Send invites"],
      color: "green"
    },
    {
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      title: "Document Processing",
      description: "Extract data from documents and generate reports",
      steps: ["Upload document", "Extract data", "Process information", "Generate report"],
      color: "amber"
    },
    {
      icon: <BellRing className="h-5 w-5 text-red-500" />,
      title: "Alert Notifications",
      description: "Send notifications based on defined triggers and conditions",
      steps: ["Event trigger", "Check conditions", "Format notification", "Send alert"],
      color: "red"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-cyan-500" />,
      title: "Task Automation",
      description: "Create and assign tasks based on various events",
      steps: ["Trigger event", "Generate task", "Assign to user", "Set deadline"],
      color: "cyan"
    }
  ];
  
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
            <Workflow className="h-10 w-10 text-purple-500" />
          </div>
        </motion.div>
        
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Powerful{" "}
          <span className={cn(
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-purple-500 to-blue-500"
          )}>
            Workflow Automation
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
          Automate tasks and streamline your processes with our intuitive workflow builder. Connect apps, trigger actions, and let automation handle the repetitive tasks.
        </motion.p>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {workflows.map((workflow, index) => (
          <WorkflowCard 
            key={workflow.title}
            icon={workflow.icon}
            title={workflow.title}
            description={workflow.description}
            steps={workflow.steps}
            color={workflow.color}
            delay={0.2 + index * 0.1}
          />
        ))}
      </motion.div>
      
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          className={cn(
            "px-6 py-6 rounded-full text-white font-medium",
            "bg-gradient-to-r from-purple-500 to-blue-500",
            "border border-white/10",
            "shadow-lg hover:shadow-xl hover:shadow-purple-500/20",
            "transition-all duration-300 transform hover:-translate-y-1"
          )}
          size="lg"
        >
          <Workflow className="mr-2 h-5 w-5" />
          Create New Workflow
        </Button>
      </motion.div>
    </div>
  );
};

export default WorkflowPanel;
