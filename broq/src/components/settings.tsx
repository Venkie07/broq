import React from "react";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../App";
import { styles } from "../theme";

type ThemeType = "light" | "dark" | "system";

interface SettingsProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme, onBack }) => {
  const { activeTheme } = useTheme();
  const t = styles[activeTheme];

  return (
    <div 
      className="flex flex-col h-full w-full animate-in fade-in duration-300 transition-colors duration-300"
      style={{ backgroundColor: t.bg, color: t.text }}
    >
      {/* Header */}
      <div 
        className="flex items-center p-4 shrink-0 transition-colors duration-300"
        style={{ borderBottom: `1px solid ${t.border}` }}
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 p-2 rounded-lg transition-colors text-inherit"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.hoverBg}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="ml-4 text-xl font-semibold">Settings</h2>
      </div>

      {/* Body */}
      <div 
        className="p-6 flex-1 overflow-y-auto transition-colors duration-300"
        style={{ backgroundColor: t.bg }}
      >
        <div className="max-w-2xl">
          <h3 className="text-lg font-medium mb-4">Appearance</h3>
          <div className="space-y-3">
            <label className="block text-sm mb-2 transition-colors duration-300" style={{ color: t.mutedText }}>Theme</label>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: theme === "light" ? t.primary : t.card,
                  color: theme === "light" ? "#FFFFFF" : t.text,
                }}
                onMouseEnter={(e) => {
                  if (theme !== "light") e.currentTarget.style.backgroundColor = t.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (theme !== "light") e.currentTarget.style.backgroundColor = t.card;
                }}
                onClick={() => setTheme("light")}
              >
                Light
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: theme === "dark" ? t.primary : t.card,
                  color: theme === "dark" ? "#FFFFFF" : t.text,
                }}
                onMouseEnter={(e) => {
                  if (theme !== "dark") e.currentTarget.style.backgroundColor = t.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (theme !== "dark") e.currentTarget.style.backgroundColor = t.card;
                }}
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ 
                  backgroundColor: theme === "system" ? t.primary : t.card,
                  color: theme === "system" ? "#FFFFFF" : t.text,
                }}
                onMouseEnter={(e) => {
                  if (theme !== "system") e.currentTarget.style.backgroundColor = t.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (theme !== "system") e.currentTarget.style.backgroundColor = t.card;
                }}
                onClick={() => setTheme("system")}
              >
                System
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
