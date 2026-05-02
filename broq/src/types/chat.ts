// BACKEND TEAM: Ensure these types align with the backend API response schema.

export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface ChatResponse {
  message: Message;
  // Extend for streaming or usage stats if needed
}

export interface SendMessagePayload {
  content: string;
  // BACKEND TEAM: Extend payload for attachments or selected model if needed
}
