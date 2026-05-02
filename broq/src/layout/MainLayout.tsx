import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { CloudUpload } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  isDragging?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, isDragging }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-[#0B0A10] text-[#E5E7EB] overflow-hidden relative">
      {/* Global Drag Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isDragging ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-full max-w-2xl mx-4 aspect-video rounded-3xl border-2 border-dashed border-[#7C3AED] bg-[#12101A]/80 flex flex-col items-center justify-center shadow-2xl">
          <CloudUpload className="text-[#7C3AED] w-20 h-20 mb-6 animate-bounce" style={{ animationDuration: '2s' }} />
          <h2 className="text-3xl font-bold text-white mb-3">Drop files to attach</h2>
          <p className="text-[#9CA3AF] text-lg">Your files will be uploaded securely</p>
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:relative md:flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main chat section */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#0F0D17]">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {children}
        </main>
      </div>
    </div>
  );
};
