import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Mic } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  RotateCcw,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BACKEND_URL = import.meta.env.VITE_BACKEND || "https://skyverse-ai-chatbot.onrender.com";

export default function ChatSection() {

  /* ================= STATES ================= */

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [currentSessionName, setCurrentSessionName] =
    useState("New Session");

  const [backendAvailable, setBackendAvailable] =
    useState(false);

  const [initializing, setInitializing] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] =
    useState(false);

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef(null);
  const stopGenerationRef = useRef(false);

  /* ================= HELPERS ================= */

  const toggleSidebar = () =>
    setSidebarExpanded(prev => !prev);

  const truncateText = (text = "", length = 25) =>
    text.length > length
      ? text.substring(0, length) + "..."
      : text;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  /* ================= USER LOAD ================= */

  useEffect(() => {

    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
        setUserInfo(user);
        return;

      }

      const storedUserId =
        localStorage.getItem("userId");

      if (storedUserId) {
        setUserId(storedUserId);
        return;
      }

      const token =
        localStorage.getItem("authToken");

      if (token) {

        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        if (payload.id) {
          setUserId(payload.id);
          return;
        }

      }
      setError("Login required");
    } catch {
      setError("User load error");

    }

  }, []);

  /* ================= BACKEND HEALTH ================= */

  const checkBackendHealth = async () => {

    try {
      const res = await fetch(`${BACKEND_URL}/health`);
      return res.ok;
    } catch {
      return false;

    }

  };

  /* ================= LOAD SESSIONS ================= */

  const loadUserSessions = async () => {

    if (!backendAvailable || !userId)
      return [];

    try {

      const res = await fetch(
        `${BACKEND_URL}/history/user/${userId}/sessions`
      );

      const data = await res.json();

      if (data.success) {
        setSessions(data.sessions);
        return data.sessions;
      }

    } catch { }
    return [];

  };

  /* ================= SWITCH SESSION ================= */

  const switchToSession = async (targetSessionId) => {
    if (targetSessionId === sessionId) return;

    const sessionData = await loadSessionFromBackend(targetSessionId);
    if (sessionData) {
      setSessionId(sessionData._id);
      setCurrentSessionName(sessionData.sessionName);

      if (sessionData.messages && sessionData.messages.length > 0) {
        setMessages(sessionData.messages);
      } else {
        const welcomeMessage = {
          role: "model",
          parts: [
            { text: "Hello! I'm your AI assistant. How can I help you today?" },
          ],
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    }
  };

  // Load a single session by ID
  const loadSessionFromBackend = async (sessionIdToLoad) => {
    if (!backendAvailable || !sessionIdToLoad || !userId) return null;

    try {
      const url = `${BACKEND_URL}/history/session/${sessionIdToLoad}?userId=${userId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      return data.success && data.session ? data.session : null;
    } catch (err) {
      console.error("Error loading session:", err);
      return null;
    }
  };

  /* ================= DELETE SESSION ================= */

  const deleteSession = async (sessionIdToDelete) => {
    if (!sessionIdToDelete || !backendAvailable) return;

    try {
      await fetch(`${BACKEND_URL}/history/delete/${sessionIdToDelete}`, {
        method: "GET",
      });

      const updated = await loadUserSessions();
      if (sessionIdToDelete === sessionId) {
        if (updated.length > 0) {
          await switchToSession(updated[0]._id);
        } else {
          await createNewSession();
        }
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  /* ================= NEW SESSION ================= */

  const createNewSession = async () => {

    const name = `Session ${new Date().toLocaleString()}`;

    const res = await fetch(
      `${BACKEND_URL}/history/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          sessionName: name,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSessionId(data.session._id);
      setCurrentSessionName(data.session.sessionName);

      // ✅ Add default welcome message here
      const welcomeMessage = {
        role: "model",
        parts: [
          {
            text: "Hello 👋 I am your AI assistant. Can I help you today?",
          },
        ],
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
      loadUserSessions();
    }
  };

  const handleNewSession = () =>
    createNewSession();

  /* ================= FILE UPLOAD ================= */

  const handleFileUpload = e => {

    const files = Array.from(e.target.files);

    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages(prev => [
      ...prev,
      ...previews,
    ]);

  };

  const removeImage = index =>

    setSelectedImages(prev =>
      prev.filter((_, i) => i !== index)
    );

  /* ================= MIC ================= */

  const handleMicClick = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (!isRecording) {
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion((prev) => prev + " " + transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";
  }

  /* ================= INIT ================= */

  useEffect(() => {

    if (!userId) return;
    (async () => {

      setInitializing(true);

      const healthy =
        await checkBackendHealth();

      setBackendAvailable(healthy);

      if (!healthy) return;

      const sessions =
        await loadUserSessions();

      if (!sessions.length)

        await createNewSession();

      else {

        setSessionId(sessions[0]._id);

        setMessages(
          sessions[0].messages || []
        );

        setCurrentSessionName(
          sessions[0].sessionName
        );

      }

      setInitializing(false);

    })();

  }, [userId]);

  // SaveMSGBACKEND
  const saveMessageToBackend = async (message) => {
    try {

      await fetch(
        "https://skyverse-ai-chatbot.onrender.com/history/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            userId,
            message,
          }),
        }
      );

    } catch (err) {
      console.error("Save message error:", err);
    }
  };

  /* ================= SEND MESSAGE ================= */

  const sendMessage = async () => {
    if (!question.trim() || loading || !backendAvailable)
      return;
    stopGenerationRef.current = false;

    const userMessage = {
      role: "user",
      parts: [{ text: question }],
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);
    await saveMessageToBackend(userMessage);
    try {

      const currentMessages = [
        ...messages,
        userMessage,
      ];

      // ✅ Call backend instead of Gemini
      const res = await fetch(
        `${BACKEND_URL}/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messages: currentMessages,
            sessionId,
            userId,
          }),
        }
      );

      if (!res.ok)
        throw new Error(
          `Backend error: ${res.status}`
        );

      const data = await res.json();

      const reply =
        data.reply ||
        "⚠️ No response from AI";

      let tempMessage = {
        role: "model",
        parts: [{ text: "" }],
        timestamp:
          new Date().toISOString(),
      };

      setMessages(prev => [
        ...prev,
        tempMessage,
      ]);

      let currentText = "";

      const words = reply.split(" ");

      for (let i = 0; i < words.length; i++) {
        if (
          stopGenerationRef.current
        ) break;

        currentText +=
          words[i] + " ";

        await new Promise(resolve =>
          setTimeout(resolve, 40)
        );

        setMessages(prev => {

          const updated = [
            ...prev,
          ];

          updated[
            updated.length - 1
          ] = {
            ...tempMessage,
            parts: [
              {
                text: currentText,
              },
            ],
          };
          return updated;
        });

      }

      // ✅ Save final AI reply in DB
      if (!stopGenerationRef.current) {

        await saveMessageToBackend({
          role: "model",
          parts: [
            { text: reply },
          ],
          timestamp:
            tempMessage.timestamp,
        });

      }

    } catch (err) {

      const errorMessage = {
        role: "model",
        parts: [
          {
            text: `⚠️ Error: ${err.message}`,
          },
        ],
        timestamp:
          new Date().toISOString(),
      };

      setMessages(prev => [
        ...prev,
        errorMessage,
      ]);

      await saveMessageToBackend(
        errorMessage
      );

    } finally {

      setLoading(false);

    }

  };

  /* ================= KEY PRESS ================= */

  const handleKeyDown = e => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();

    }

  };

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ================= REFRESH ================= */

  const handleRefreshSessions =
    async () => {
      setRefreshing(true);
      await loadUserSessions();
      setRefreshing(false);

    };

  /* ================= STOP ================= */

  const stopGeneration = () => {
    stopGenerationRef.current = true;
    setLoading(false);

  };

  /* ================= LOGOUT ================= */

  const Logout = () =>
    localStorage.removeItem("authToken");

  // Show loading screen while initializing
  if (initializing) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading your chat sessions...</p>
          {userInfo && (
            <p className="text-sm text-white/70 mt-2">
              Welcome back, {userInfo.name}!
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show error screen if no user or critical error
  if (error && !userId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-white text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-white/70 mb-4">{error}</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${sidebarExpanded
          ? "w-[80%] md:w-80 absolute md:relative h-full z-40"
          : "w-0"
          } transition-all duration-300 ease-in-out bg-black/30 backdrop-blur-sm border-r border-white/10 overflow-hidden flex flex-col`}
      >

        {sidebarExpanded && (
          <>
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">

                {/* Left Section */}
                <div className="flex items-center space-x-2">

                  {/* Sidebar Close Button (Mobile only) */}
                  <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Close sidebar"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    Chat Sessions
                    <span className="text-xs text-white/40 ml-2">
                      ({sessions.length})
                    </span>
                  </h2>

                </div>


                {/* Refresh Button */}
                <button
                  onClick={handleRefreshSessions}
                  disabled={refreshing || !backendAvailable}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  title="Refresh sessions"
                >
                  <RotateCcw
                    className={`w-4 h-4 text-white transition-transform duration-300 ${refreshing
                      ? "animate-spin"
                      : "group-hover:rotate-180"
                      }`}
                  />
                </button>

              </div>

              {userInfo && (
                <p className="text-xs text-white/60 mt-1">
                  Welcome, {userInfo.name}
                </p>
              )}
              <p className="text-xs text-white/30">
                Backend: {backendAvailable ? "✓ Connected" : "✗ Disconnected"}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {refreshing ? (
                <div className="text-white/60 text-sm text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
                  Refreshing sessions...
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-white/60 text-sm text-center py-8">
                  No sessions yet
                  <br />
                  <span className="text-xs text-white/40">
                    Create your first session to get started
                  </span>
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session._id}
                    className={`group flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all ${session._id === sessionId
                      ? "bg-cyan-500/20 border border-cyan-400/30"
                      : "bg-white/5 hover:bg-white/10"
                      }`}
                  >
                    <div
                      className="flex-1 min-w-0"
                      onClick={() => switchToSession(session._id)}
                    >
                      <h3
                        className={`text-sm font-medium truncate ${session._id === sessionId
                          ? "text-cyan-300"
                          : "text-white"
                          }`}
                      >
                        {truncateText(session.sessionName)}
                      </h3>
                      <p className="text-xs text-white/60 truncate">
                        {session.messages?.length || 0} messages
                      </p>
                      <p className="text-xs text-white/40">
                        {new Date(
                          session.updatedAt || session.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session._id);
                      }}
                      className="opacity-100 md:opacity-0 md:group-hover:opacity-100 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition-all"
                      title="Delete session"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleNewSession}
                disabled={loading}
                className="w-full p-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors flex items-center justify-center text-cyan-400 font-medium disabled:opacity-50"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Session
              </button>
            </div>
          </>
        )}
      </div>

      {/* Rest of the component remains the same... */}
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="relative z-10 p-3 sm:p-4 md:p-6 bg-black/20 border-b border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">

            {/* Left Section */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">

              <button
                onClick={toggleSidebar}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarExpanded ? (
                  <ChevronLeft className="w-5 h-5 text-white" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-white" />
                )}
              </button>

              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>

                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
              </div>

              <div className="min-w-0">

                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent truncate">
                  SkyVerse AI
                </h1>

                <p className="text-xs sm:text-sm text-white/60 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                  {userInfo
                    ? `Welcome, ${userInfo.name}`
                    : `User: ${userId}`}{" "}
                  • {truncateText(currentSessionName, 30)} •{" "}
                  {backendAvailable ? "Connected" : "Offline"}
                </p>

              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">

              {sessions.length > 0 && (
                <div className="hidden sm:block text-white/40 text-sm">
                  {sessions.length} session{sessions.length !== 1 ? "s" : ""}
                </div>
              )}

              <button
                onClick={handleNewSession}
                disabled={loading}
                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors disabled:opacity-50"
                title="New Session"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </button>

              <button
                onClick={() => {
                  Logout();
                  window.location.href = "/login";
                }}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-400 text-xs sm:text-sm"
                title="Logout"
              >
                Logout
              </button>

            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto max-w-full p-6 space-y-6 relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={`${sessionId}-${i}`}
              className={`flex items-start max-w-full space-x-3 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.role === "model" && (
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`relative ${msg.role === "model"
                  ? "w-[320px] max-w-[295px] sm:w-full sm:max-w-[600px]" // mobile thoda bada, desktop pe normal
                  : "w-[264px] max-w-[264px] sm:w-[264px] sm:max-w-[264px]" // user messages
                  } p-4 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${msg.role === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white ml-auto"
                    : "bg-black/20 border border-white/10 text-white mr-auto"
                  }`}
              >
                {msg.role === "model" && (
                  <Sparkles
                    className="absolute -top-2 -left-2 w-5 h-5 text-yellow-400 animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                )}

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => (
                      <p
                        className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-cyan-300" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="list-disc ml-5" {...props} />
                    ),

                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");

                      return !inline ? (
                        <div
                          style={{
                            maxHeight: "400px",
                            overflowX: "auto",
                            overflowY: "auto",
                            borderRadius: "12px",
                          }}
                        >
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match?.[1] || "javascript"}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="bg-black/30 px-1 py-0.5 rounded text-pink-400 font-mono break-words"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {Array.isArray(msg.parts)
                    ? msg.parts[0]?.text || ""
                    : msg.parts || ""}
                </ReactMarkdown>

                <div
                  className={`absolute top-4 w-3 h-3 transform rotate-45 ${msg.role === "user"
                    ? "right-[-6px] bg-gradient-to-r from-cyan-500 to-blue-600"
                    : "left-[-6px] bg-black/20 border-l border-t border-white/10"
                    }`}
                ></div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-10 p-6 backdrop-blur-md bg-black/20 border-t border-white/10">
          <div className="flex items-center space-x-4 max-w-4xl mx-auto">

            <div className="relative flex-1">

              {/* Left side Add Files */}
              <label
                htmlFor="fileUpload"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 hover:border-[oklch(71.5%_0.143_215.221)] hover:bg-[oklch(71.5%_0.143_215.221)/0.2] transition-all duration-300 shadow-lg"
              >
                <Plus className="w-6 h-6 text-[oklch(71.5%_0.143_215.221)] pointer-events-none" />
              </label>

              {selectedImages.length > 0 && (
                <div className="absolute left-14 right-4 top-1 flex gap-2 flex-wrap z-40">
                  {selectedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-12 h-12 rounded-lg overflow-hidden border border-cyan-400/40"
                    >
                      <img
                        src={img.preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-black/60 text-white text-xs px-1 rounded-bl-md hover:bg-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                id="fileUpload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.xlsx,.ppt,.pptx"
                className="hidden"
                onChange={handleFileUpload}
              />

              <input
                className={`w-full pl-13 pr-20 pb-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl ${selectedImages.length > 0 ? "pt-16" : "pt-4"
                  }`}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter message..."
                onKeyDown={handleKeyDown}
              />
              {/* Right side Mic + Enter */}
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-2">

                {/* Mic button */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 hover:border-[oklch(71.5%_0.143_215.221)] hover:bg-[oklch(71.5%_0.143_215.221)/0.2] transition-all duration-300 shadow-lg"
                >
                  <Mic
                    className={`w-5 h-5 ${isRecording
                      ? "text-red-400 animate-pulse"
                      : "text-[oklch(71.5%_0.143_215.221)]"
                      }`}
                  />
                </button>

              </div>
            </div>
            <button
              onClick={loading ? stopGeneration : sendMessage}
              disabled={(!question.trim() && !loading) || !backendAvailable}
              className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-xl text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group flex items-center gap-2"
            >
              {loading ? (
                <>
                  {/* Stop */}
                  <span className="w-3 h-3 bg-white rounded-sm"></span>
                </>
              ) : (
                <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              )}
            </button>
          </div>

          <p className="text-center text-white/25 text-xs mt-3">
            Press Enter to send • All messages synced to database • AI powered
            by Gemini
            {!backendAvailable && " • ⚠️ Backend offline"}
          </p>
        </div>
      </div>
    </div>
  );
}
