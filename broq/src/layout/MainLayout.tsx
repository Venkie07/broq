
import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { CloudUpload } from "lucide-react";
import { styles } from "../theme";

interface MainLayoutProps {
  children: React.ReactNode;
  isDragging?: boolean;
  theme?: "light" | "dark";
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, isDragging, theme = "dark" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className="flex h-screen w-full overflow-hidden relative"
      style={{
        backgroundColor: styles[theme].bg,
        color: styles[theme].text,
      }}
    >
      {/* Global Drag Overlay */}
      <div
        className={`fixed inset-0 z-[100] backdrop-blur-lg flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isDragging ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div
          className="w-full max-w-2xl mx-4 aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center shadow-2xl"
          style={{
            borderColor: styles[theme].primary,
            backgroundColor: styles[theme].card,
          }}
        >
          <CloudUpload className="hidden md:block" style={{ color: styles[theme].primary, width: 80, height: 80, marginBottom: 24, animation: 'bounce 2s infinite' }} />
          <h2 className="text-3xl font-bold mb-3" style={{ color: styles[theme].text }}>Drop files to attach</h2>
          <p className="text-lg" style={{ color: styles[theme].mutedText }}>Your files will be uploaded securely</p>
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden transition-opacity"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:relative md:flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} theme={theme} />
      </div>

      {/* Main chat section */}
      <div
        className="flex-1 flex flex-col h-full min-w-0"
        style={{ backgroundColor: styles[theme].bg }}
      >
        <Header onToggleSidebar={toggleSidebar} theme={theme} />
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {children}
        </main>
      </div>
    </div>
  );
};
