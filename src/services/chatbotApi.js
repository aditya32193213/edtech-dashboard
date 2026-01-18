import api from "./api";

/**
 * Send a chat message to the AI assistant
 * @param {Object} payload - { message: string, context: string }
 * @returns {Promise<Object>} - { reply: string }
 */
export const sendChatMessage = async ({ message, context }) => {
  try {
    const response = await api.post(
      "/ai/chat",
      {
        message,
        context
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 15000 // 15 second timeout
      }
    );

    // ✅ FIX: Always return response data on success
    return response.data;
  } catch (error) {
    console.error("Chat API Error:", error);

    // ✅ FIX: Handle specific error cases with normalized messages
    
    // Rate limiting (429)
    if (error.response?.status === 429) {
      throw new Error("I'm getting a lot of questions right now. Please wait a moment 🙏");
    }

    // Request timeout
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }

    // Network errors
    if (error.message?.includes("network") || error.code === "ERR_NETWORK") {
      throw new Error("Unable to connect. Please check your internet connection 🌐");
    }

    // Server errors (5xx)
    if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again in a moment 🔧");
    }

    // Client errors (4xx) - extract server message if available
    if (error.response?.status >= 400 && error.response?.status < 500) {
      const serverMessage = error.response?.data?.message || error.response?.data?.error;
      if (serverMessage) {
        throw new Error(serverMessage);
      }
    }

    // ✅ FIX: Generic fallback error - always throw, never return silently
    throw new Error("Unable to reach AI assistant. Please try again later.");
  }
};