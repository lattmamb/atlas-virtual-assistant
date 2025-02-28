
import { Bot, Maximize2, Minimize2 } from "lucide-react";

interface ChatHeaderProps {
  isExpanded: boolean;
  isMinimized: boolean;
  toggleExpand: () => void;
  toggleMinimize: () => void;
}

const ChatHeader = ({ isExpanded, isMinimized, toggleExpand, toggleMinimize }: ChatHeaderProps) => {
  return (
    <>
      <Bot className="h-5 w-5" />
      <div className="ml-auto flex items-center gap-1">
        {isExpanded ? (
          <button onClick={toggleExpand} className="p-1.5 hover:bg-white/10 rounded-full transition">
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button onClick={toggleExpand} className="p-1.5 hover:bg-white/10 rounded-full transition">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
        <button onClick={toggleMinimize} className="p-1.5 hover:bg-white/10 rounded-full transition">
          {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
