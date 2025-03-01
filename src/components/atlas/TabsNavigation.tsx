
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const TabsNavigation = ({ activeTab, onChange }: TabsNavigationProps) => {
  return (
    <TabsList className="grid grid-cols-3 mb-2">
      <TabsTrigger value="chat">Chat</TabsTrigger>
      <TabsTrigger value="tools">Tools</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
  );
};

export default TabsNavigation;
