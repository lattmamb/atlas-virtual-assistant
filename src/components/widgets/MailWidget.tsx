
import React from 'react';
import { Mail } from 'lucide-react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Email {
  id: number;
  subject: string;
  sender: string;
  time: string;
  read: boolean;
}

interface MailWidgetProps {
  emails: Email[];
}

const MailWidget: React.FC<MailWidgetProps> = ({ emails }) => {
  const handleEmailClick = (id: number) => {
    toast("Mail app coming soon", {
      icon: "📧",
      position: "top-center"
    });
  };

  return (
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
                email.read ? "hover:bg-white/5" : "bg-white/10 hover:bg-white/15"
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
  );
};

export default MailWidget;
