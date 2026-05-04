import React, { useState } from "react";
import { MessageSquare, Plus, PanelLeftClose, PanelLeft, Settings, Flame, PlugZap, FolderSymlink } from "lucide-react";
import { styles } from "../theme";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
  theme: "light" | "dark";
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose, theme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = styles[theme];
  const navigate = useNavigate();

  // Mock chat history
  const chats = [
    { id: 1, title: "React Architecture" },
    { id: 2, title: "Tailwind Styling" },
    { id: 3, title: "API Integration" },
  ];

  return (
    <div
      className={`h-full flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
      style={{ backgroundColor: t.sidebarBg, borderRight: `1px solid ${t.border}` }}
    >
      {/* Top Header Area */}
      <div className="p-4 flex items-center justify-between h-16 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2 group cursor-pointer animate-in fade-in duration-200" onClick={() => navigate("/")}> 
            <Flame
              style={{ color: t.primary }}
              className="transition-colors drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
              size={24}
              onMouseEnter={(e) => e.currentTarget.style.color = t.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.color = t.primary}
            />
            <span
              className="text-lg font-semibold tracking-tight transition-colors"
              style={{ color: t.text }}
            >
              Broq
            </span>
          </div>
        )}

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden md:flex p-2 rounded-lg transition-colors duration-200 ${isCollapsed ? "mx-auto" : ""}`}
          style={{ color: t.subtext }}
          onMouseEnter={(e) => { e.currentTarget.style.color = t.text; e.currentTarget.style.backgroundColor = t.hoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = t.subtext; e.currentTarget.style.backgroundColor = "transparent"; }}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* plugins and links */}
      <div className="p-4 flex flex-col gap-2 shrink-0" style={{ borderTop: `1px solid ${t.border}` }}>
        <button
          onClick={() => navigate("/plugins")}
          className={`w-full flex items-center rounded-xl transition-colors duration-200 ${isCollapsed ? "justify-center p-3" : "gap-3 p-3 text-left"}`}
          style={{ color: t.subtext, border: `1px solid ${t.border}` }}
          onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.backgroundColor = t.hoverBg; }}
          onMouseLeave={e => { e.currentTarget.style.color = t.subtext; e.currentTarget.style.backgroundColor = "transparent"; }}
          title="Plugins"
        >
          <PlugZap size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">Plugins</span>}
        </button>
        <button
          onClick={() => navigate("/links")}
          className={`w-full flex items-center rounded-xl transition-colors duration-200 ${isCollapsed ? "justify-center p-3" : "gap-3 p-3 text-left"}`}
          style={{ color: t.subtext, border: `1px solid ${t.border}` }}
          onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.backgroundColor = t.hoverBg; }}
          onMouseLeave={e => { e.currentTarget.style.color = t.subtext; e.currentTarget.style.backgroundColor = "transparent"; }}
          title="Links"
        >
          <FolderSymlink size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">Links</span>}
        </button>
      </div>


      {/* Chat List Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar" style={{ borderTop: `1px solid ${t.border}` }}>
        {!isCollapsed && <div className="text-xs font-semibold mb-3 px-2" style={{ color: t.mutedText }}>Recent Chats</div>}

        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={onClose}
            className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 group ${isCollapsed ? "justify-center" : "gap-3 text-left"
              }`}
            style={{
              color: chat.id === 1 ? t.text : t.subtext,
              backgroundColor: chat.id === 1 ? t.hoverBg : "transparent"
            }}
            onMouseEnter={(e) => {
              if (chat.id !== 1) {
                e.currentTarget.style.backgroundColor = t.hoverBg;
                e.currentTarget.style.color = t.text;
              }
            }}
            onMouseLeave={(e) => {
              if (chat.id !== 1) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = t.subtext;
              }
            }}
            title={chat.title}
          >
            <MessageSquare size={18} className="shrink-0" style={{ color: chat.id === 1 ? t.primary : "inherit" }} />
            {!isCollapsed && (
              <span className="truncate text-sm font-medium">{chat.title}</span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Area (New Chat & Settings) */}
      <div className="p-4 flex flex-col gap-2 shrink-0" style={{ borderTop: `1px solid ${t.border}` }}>
        {/* New Chat Button (Moved lower) */}
        <button
          onClick={() => navigate("/")}
          className={`w-full hover:scale-[1.02] active:scale-[0.98] rounded-xl flex items-center justify-center transition-all duration-200 ${isCollapsed ? "p-3" : "py-3 px-4 gap-2"}`}
          style={{ backgroundColor: t.primary, color: "#FFFFFF" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = t.primaryHover}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = t.primary}
          title="New Chat"
        >
          <Plus size={20} className="shrink-0" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden">New Chat</span>}
        </button>

        <button
          onClick={() => navigate("/settings")}
          className={`w-full flex items-center rounded-xl transition-colors duration-200 ${isCollapsed ? "justify-center p-3" : "gap-3 p-3 text-left"}`}
          style={{ color: t.subtext, border: `1px solid ${t.border}` }}
          onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.backgroundColor = t.hoverBg; }}
          onMouseLeave={e => { e.currentTarget.style.color = t.subtext; e.currentTarget.style.backgroundColor = "transparent"; }}
          title="Settings"
        >
          <Settings size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">Settings</span>}
        </button>
      </div>
    </div>
  );
};
