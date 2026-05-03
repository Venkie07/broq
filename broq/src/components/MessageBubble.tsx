import React from "react";
import type { Message } from "../types/chat";
import { useTheme } from "../App";
import { styles } from "../theme";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  const { activeTheme } = useTheme();
  const t = styles[activeTheme];

  // Basic formatting for code blocks (for demonstration)
  // BACKEND TEAM: Supports future markdown responses. A full markdown parser (like react-markdown) should be used here.
  const formatContent = (content: string) => {
    if (content.includes("```")) {
      const parts = content.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is a code block
          const lines = part.trim().split("\n");
          const lang = lines[0].trim();
          const code = lines.slice(1).join("\n");
          return (
            <div 
              key={index} 
              className="my-3 rounded-lg overflow-hidden transition-colors duration-300" 
              style={{ backgroundColor: t.sidebarBg, border: `1px solid ${t.border}` }}
            >
              {lang && (
                <div 
                  className="px-4 py-1.5 text-xs flex justify-between items-center transition-colors duration-300"
                  style={{ backgroundColor: t.card, color: t.mutedText, borderBottom: `1px solid ${t.border}` }}
                >
                  <span>{lang}</span>
                </div>
              )}
              <pre className="p-4 overflow-x-auto text-sm font-mono transition-colors duration-300" style={{ color: t.text }}>
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        return <span key={index}>{part}</span>;
      });
    }
    return content;
  };

  // Assistant: full-width content style
  if (!isUser) {
    return (
      <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div 
          className="max-w-3xl w-full px-4 py-3 text-[15px] leading-relaxed transition-colors duration-300"
          style={{ color: t.text }}
        >
          {formatContent(message.content)}
        </div>
      </div>
    );
  }

  // User: bubble style
  return (
    <div className="flex w-full justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div 
        className="relative group ml-auto max-w-[70%] px-4 py-2 rounded-2xl transition-colors duration-300"
        style={{ backgroundColor: t.primary, color: "#ffffff" }}
      >
        <div
          className="leading-relaxed whitespace-pre-wrap break-words overflow-hidden max-w-full"
          style={{ wordBreak: 'break-word' }}
        >
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
};
