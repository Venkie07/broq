import React, { useState } from "react";
import { MessageSquare, Plus, PanelLeftClose, PanelLeft, Settings, Flame } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock chat history
  const chats = [
    { id: 1, title: "React Architecture" },
    { id: 2, title: "Tailwind Styling" },
    { id: 3, title: "API Integration" },
  ];

  return (
    <div 
      className={`h-full bg-[#12101A] border-r border-white/5 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header Area */}
      <div className="p-4 flex items-center justify-between h-16 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2 group cursor-pointer animate-in fade-in duration-200">
            <Flame className="text-[#7C3AED] group-hover:text-[#A78BFA] transition-colors drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" size={24} />
            <span className="text-lg font-semibold tracking-tight text-[#E5E7EB] group-hover:text-white transition-colors">Broq</span>
          </div>
        )}
        
        {/* Collapse Toggle (Desktop) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden md:flex p-2 hover:bg-white/10 rounded-lg text-[#9CA3AF] hover:text-white transition-colors ${
            isCollapsed ? "mx-auto" : ""
          }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* Chat List Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {!isCollapsed && <div className="text-xs font-semibold text-[#9CA3AF] mb-3 px-2">Recent</div>}
        
        {chats.map((chat) => (
          <button 
            key={chat.id}
            onClick={onClose}
            className={`w-full flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors group ${
              chat.id === 1 ? "bg-white/10 text-white" : "text-[#E5E7EB]"
            } ${isCollapsed ? "justify-center" : "gap-3 text-left"}`}
            title={chat.title}
          >
            <MessageSquare size={18} className={`shrink-0 ${chat.id === 1 ? "text-[#7C3AED]" : "text-[#9CA3AF] group-hover:text-white"}`} />
            {!isCollapsed && (
              <span className="truncate text-sm font-medium">{chat.title}</span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Area (New Chat & Settings) */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-2 shrink-0">
        {/* New Chat Button (Moved lower) */}
        <button 
          onClick={onClose}
          className={`w-full bg-[#7C3AED] hover:bg-[#6D28D9] hover:scale-[1.02] active:scale-[0.98] text-white rounded-xl flex items-center justify-center transition-all duration-200 ${
            isCollapsed ? "p-3" : "py-3 px-4 gap-2"
          }`}
          title="New Chat"
        >
          <Plus size={20} className="shrink-0" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden">New Chat</span>}
        </button>

        <button 
          className={`w-full flex items-center text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-colors ${
            isCollapsed ? "justify-center p-3" : "gap-3 p-3 text-left"
          }`}
          title="Settings"
        >
          <Settings size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">Settings</span>}
        </button>
      </div>
    </div>
  );
};
