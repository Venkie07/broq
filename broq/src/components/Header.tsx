import React from "react";
import { Menu, Flame } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 bg-[#0F0D17]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 -ml-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-2 group cursor-pointer">
          <Flame className="text-[#7C3AED] group-hover:text-[#A78BFA] transition-colors drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" size={24} />
          <h1 className="text-lg font-semibold tracking-tight text-[#E5E7EB] group-hover:text-white transition-colors">Broq</h1>
        </div>
      </div>

      <div className="flex items-center">
        {/* Model Selector Dropdown UI (Mock) */}
        {/* <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-[#E5E7EB]">
          <span>Gemini 3.1 Pro</span>
          <ChevronDown size={16} className="text-[#9CA3AF]" />
        </button> */}
      </div>
    </header>
  );
};
