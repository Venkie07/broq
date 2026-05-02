import React, { useState } from "react";
import type { Message } from "../types/chat";
import { Check, Copy } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <div key={index} className="my-3 rounded-lg overflow-hidden bg-[#0B0A10] border border-white/10">
              {lang && (
                <div className="bg-[#12101A] px-4 py-1.5 text-xs text-[#9CA3AF] border-b border-white/5 flex justify-between items-center">
                  <span>{lang}</span>
                </div>
              )}
              <pre className="p-4 overflow-x-auto text-sm font-mono text-[#E5E7EB]">
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

  return (
    <div
      className={`flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative group max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${
          isUser
            ? "bg-[#7C3AED] text-white rounded-tr-sm"
            : "bg-[#1C1A25] text-[#E5E7EB] rounded-tl-sm"
        }`}
      >
        <div className="leading-relaxed whitespace-pre-wrap word-break-words">
          {formatContent(message.content)}
        </div>
        
        {/* Hover Actions (Copy) */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-[#2A2735] text-[#9CA3AF] opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
            title="Copy message"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};
