import { useState, useCallback } from "react";
import type { Message } from "../types/chat";
import { chatService } from "../services/chatService";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // 1. Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 2. Call service layer
    try {
      const aiResponse = await chatService.sendMessageToAI({ content });
      
      // 3. Append AI response
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error in useChat:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
