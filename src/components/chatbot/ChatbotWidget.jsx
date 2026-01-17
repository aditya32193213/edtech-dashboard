import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../../services/chatbotApi";
import { fetchMyEnrollments } from "../../services/enrollment";
import { fetchProgressByCourse } from "../../services/progress";

const ChatbotWidget = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [chatContext, setChatContext] = useState("");

  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("chatHistory")) || [
      { sender: "bot", text: `Hi ${user?.name || ""}! How can I help you today?` },
    ];
  });

  const messagesEndRef = useRef(null);

  // Persist chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Build chatbot context cleanly using real APIs
  useEffect(() => {
    const buildContext = async () => {

        if (!user) {
         setChatContext(`
        User Type: Guest
        Page Context: Course browsing
        Instruction: Provide general course information and guidance.
        If the user asks for personalized help, ask them to log in.
        `);
        return;
        }
      try {
        let enrollments = [];
        let progressInfo = "Not started";

        if (user?.id) {
          enrollments = await fetchMyEnrollments();

          if (enrollments.length > 0) {
            const firstCourseId = enrollments[0]?.courseId;
            if (firstCourseId) {
              const progress = await fetchProgressByCourse(firstCourseId);
              progressInfo = `${progress.completedPercentage}% completed`;
            }
          }
        }

        const contextString = `
            User Name: ${user?.name || "Not Available"}
            Role: Learner
            Enrolled Courses Count: ${enrollments.length}
            Learning Progress: ${progressInfo}
            Learning Status: Active learner on the platform
            `;

        setChatContext(contextString);
            } catch (error) {
        console.error("Chatbot context build failed:", error.message);

        setChatContext(`
User Name: ${user?.name || "N/A"}
Role: Learner
Learning Status: Active
`);
      }
    };

    buildContext();
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage({
        message: input,
        context: chatContext,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn’t process that request right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl">
            AI Learning Assistant
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="italic text-gray-500 text-xs">
                Assistant is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 rounded"
            >
              Send
            </button>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("chatHistory");
              setMessages([
                { sender: "bot", text: "New session started!" },
              ]);
            }}
            className="text-xs text-red-500 p-1"
          >
            Clear Chat
          </button>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
