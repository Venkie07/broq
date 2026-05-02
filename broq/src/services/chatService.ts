import type { Message, SendMessagePayload } from "../types/chat";

/**
 * Service layer for backend communication.
 */
export const chatService = {
  /**
   * Send a message to the AI.
   * 
   * BACKEND TEAM: Replace API endpoint here.
   * Supports future markdown responses.
   * Streaming support can be added here.
   */
  async sendMessageToAI(payload: SendMessagePayload): Promise<Message> {
    try {
      // TODO: Replace with backend API
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });
      // if (!response.ok) throw new Error('API Error');
      // const data = await response.json();
      // return data.message;

      // Mock AI delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `This is a mock response to: "${payload.content}"\n\n\`\`\`javascript\nconsole.log("Supports code blocks!");\n\`\`\``,
        createdAt: Date.now(),
      };
    } catch (error) {
      console.error("Failed to send message:", error);
      // Fallback message
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request.",
        createdAt: Date.now(),
      };
    }
  },
};
