import React from "react";

export const TypingIndicator: React.FC = () => {
  // BACKEND TEAM: Replace with streaming status later if implementing text streaming
  return (
    <div className="flex w-full mb-6 justify-start animate-in fade-in duration-300">
      <div className="bg-[#1C1A25] rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1.5 h-[52px]">
        <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};
