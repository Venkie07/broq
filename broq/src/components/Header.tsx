import React from "react";
import { Menu, Flame } from "lucide-react";
import { styles } from "../theme";

interface HeaderProps {
  onToggleSidebar: () => void;
  theme: "light" | "dark";
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, theme }) => {
  const t = styles[theme];

  return (
    <header 
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 backdrop-blur-md"
      style={{ backgroundColor: `${t.bg}cc`, borderBottom: `1px solid ${t.border}` }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 -ml-2 rounded-lg transition-colors"
          style={{ color: t.subtext }}
          onMouseEnter={(e) => { e.currentTarget.style.color = t.text; e.currentTarget.style.backgroundColor = t.hoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = t.subtext; e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center px-4">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Flame 
            style={{ color: t.primary }}
            className="transition-colors drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" 
            size={24} 
            onMouseEnter={(e) => e.currentTarget.style.color = t.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.color = t.primary}
          />
          <h1 
            className="text-lg font-semibold tracking-tight transition-colors"
            style={{ color: t.text }}
          >
            Broq
          </h1>
        </div>
      </div>
    </header>
  );
};
