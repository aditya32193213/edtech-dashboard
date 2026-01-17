import api from "./api";

/**
 * Send user message to Gemini-powered chatbot
 */
export const sendChatMessage = async ({ message, context }) => {
  const response = await api.post("/ai/chat", {
    message,
    context,
  });

  return response.data;
};
