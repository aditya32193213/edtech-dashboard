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

    return response.data;
  } catch (error) {
    console.error("Chat API Error:", error);

    // Handle specific error cases
    if (error.response?.data?.reply) {
      // Server returned a formatted error message
      return error.response.data;
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error("Request timeout. Please try again.");
    }

    if (error.response?.status === 429) {
      throw new Error("Too many requests. Please wait a moment.");
    }

    // Generic error
    throw new Error("Unable to reach AI assistant. Please try again later.");
  }
};

/**
 * Get quick action suggestions
 * @returns {Promise<Array>} - Array of suggestion strings
 */
export const getChatSuggestions = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await api.get(
      "/ai/suggestions",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.suggestions || [];
  } catch (error) {
    console.error("Suggestions API Error:", error);
    // Return default suggestions on error
    return [
      "Recommend a course for me",
      "What should I learn next?",
      "Show my progress",
      "Give me study tips"
    ];
  }
};