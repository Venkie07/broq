import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "../types/chat";
import { Flame } from "lucide-react";
import { useTheme } from "../App";
import { styles } from "../theme";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { activeTheme } = useTheme();
  const t = styles[activeTheme];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div 
      className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar scroll-smooth transition-colors duration-300"
      style={{ backgroundColor: t.bg }}
    >
      <div className="max-w-3xl mx-auto flex flex-col min-h-full">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors duration-300"
              style={{ backgroundColor: t.card, border: `1px solid ${t.border}` }}
            >
              <Flame style={{ color: t.primary }} size={32} />
            </div>
            <h2 
              className="text-2xl font-semibold mb-2 tracking-tight transition-colors duration-300"
              style={{ color: t.text }}
            >
              What can I do for you?
            </h2>
            <p className="max-w-md mx-auto transition-colors duration-300" style={{ color: t.mutedText }}>
              I can help you manage everything and automate your works with text
            </p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-end space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
};
