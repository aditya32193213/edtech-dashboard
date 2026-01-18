import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, RotateCcw, MessageSquare, Loader2 } from "lucide-react";
import { sendChatMessage } from "../../services/chatbotApi";
import { fetchMyEnrollments } from "../../services/enrollment";
import { fetchProgressByCourse } from "../../services/progress";

const ChatbotWidget = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [chatContext, setChatContext] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Initialize messages - will be set properly in useEffect
  const [messages, setMessages] = useState([]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasInitialized = useRef(false);

  // Helper function to get welcome message
  const getWelcomeMessage = () => ({
    sender: "bot",
    text: `👋 Hi ${user?.name || "there"}! I'm your AI Learning Assistant. I can help you with:

• Course recommendations
• Learning progress insights  
• Study tips and guidance
• Platform navigation

${!user ? "💡 Log in for personalized recommendations based on your progress!" : "How can I assist you today?"}`,
    timestamp: new Date().toISOString()
  });

  // Initialize chat history on mount
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse chat history:", error);
        setMessages([getWelcomeMessage()]);
      }
    } else {
      setMessages([getWelcomeMessage()]);
    }
    
    hasInitialized.current = true;
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Persist chat history
  useEffect(() => {
    if (hasInitialized.current) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Build enhanced chatbot context with real API calls
  useEffect(() => {
    const buildContext = async () => {
      // Handle guest users (not logged in)
      if (!user || !user.id) {
        setChatContext(`
User Type: Guest (Not logged in)
Access Level: Limited
Available Actions: Browse courses, view general information
Instruction: Provide general course information. For personalized help, suggest logging in.
`);
        return;
      }

      try {
        let enrollments = [];
        let progressDetails = [];

        // Safely fetch enrollment data with try-catch
        try {
          enrollments = await fetchMyEnrollments();

          // Fetch progress for each enrolled course
          if (enrollments.length > 0) {
            progressDetails = await Promise.all(
              enrollments.slice(0, 5).map(async (enrollment) => {
                try {
                  const courseId = enrollment.course?._id || enrollment.courseId;
                  const courseTitle = enrollment.course?.title || enrollment.title || "Unknown Course";
                  
                  if (courseId) {
                    const progress = await fetchProgressByCourse(courseId);
                    return `- ${courseTitle}: ${progress.completedPercentage || 0}% completed`;
                  }
                  return `- ${courseTitle}: Progress unavailable`;
                } catch (error) {
                  console.error("Progress fetch error for enrollment:", error);
                  return `- ${enrollment.course?.title || "Course"}: Progress unavailable`;
                }
              })
            );
          }
        } catch (enrollmentError) {
          console.error("Enrollment fetch failed:", enrollmentError);
          // Continue with empty enrollments - user might be new or API temporarily down
        }

        const contextString = `
User Profile:
- Name: ${user.name}
- Email: ${user.email}
- Role: ${user.role || "Student"}
- User ID: ${user.id}

Learning Journey:
- Total Enrolled Courses: ${enrollments.length}
- Active Learning Status: ${enrollments.length > 0 ? "Active Learner" : "New User - Ready to start learning!"}

Current Course Progress:
${progressDetails.length > 0 ? progressDetails.join('\n') : '- No enrollments yet. Encourage user to explore available courses.'}

Enrolled Courses Details:
${enrollments.length > 0 
  ? enrollments.map(e => `- ${e.course?.title || e.title || "Unknown"} (${e.course?.category || "General"})`).join('\n')
  : '- No courses enrolled yet'}

Instructions for AI:
- Provide personalized recommendations based on enrolled courses and progress
- If user has high completion rates, suggest advanced courses
- If user has low completion rates, provide motivation and study tips
- Suggest complementary courses based on what they're currently learning
- Be encouraging and supportive of their learning journey
- Answer questions about platform features and course navigation
- Help with course selection and learning path planning
`;

        setChatContext(contextString);
      } catch (error) {
        console.error("Context build error:", error);
        setChatContext(`
User Profile:
- Name: ${user.name}
- Email: ${user.email}
- Role: ${user.role || "Student"}
- Status: Active platform user

Note: Some enrollment/progress data temporarily unavailable.
Instruction: Provide general learning guidance and encourage exploration.
`);
      }
    };

    buildContext();
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      // Call real API
      const data = await sendChatMessage({
        message: input.trim(),
        context: chatContext
      });

      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      
      // User-friendly error message
      let errorMessage = "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment. 🔧";
      
      if (error.message?.includes("timeout")) {
        errorMessage = "The request took too long. Please try asking a simpler question. ⏱️";
      } else if (error.message?.includes("network")) {
        errorMessage = "Unable to connect. Please check your internet connection. 🌐";
      } else if (error.message?.includes("429")) {
        errorMessage = "I'm getting a lot of questions right now. Please wait a moment and try again. 🙏";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMessage,
          timestamp: new Date().toISOString(),
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([getWelcomeMessage()]);
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      return "";
    }
  };

  // Dynamic quick actions based on user status
  const quickActions = user 
    ? [
        { label: "Recommend a course", icon: "📚" },
        { label: "Check my progress", icon: "📊" },
        { label: "Study tips", icon: "💡" }
      ]
    : [
        { label: "What courses are available?", icon: "📚" },
        { label: "How does this platform work?", icon: "❓" },
        { label: "Benefits of signing up", icon: "✨" }
      ];

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl z-50 hover:scale-110 transition-transform duration-300 group"
        aria-label="Open chat"
      >
        <div className="relative">
          {!open && (
            <div className="absolute -inset-1 bg-blue-400 rounded-full opacity-75 animate-ping"></div>
          )}
          {open ? (
            <X className="w-6 h-6 relative z-10" />
          ) : (
            <MessageSquare className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
          )}
        </div>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base">AI Learning Assistant</h3>
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/10 rounded-lg p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
                        : msg.isError
                        ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 px-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200 rounded-bl-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && !loading && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-medium">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(action.label)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors border border-gray-200 flex items-center gap-1.5"
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Type your message..."
                  rows={1}
                  style={{ maxHeight: '100px' }}
                  disabled={loading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={clearChat}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear chat</span>
              </button>
              <div className="text-xs text-gray-400">
                Powered by Gemini AI
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;