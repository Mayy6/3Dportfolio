import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── System prompt (May's full resume context) ───────────────────────────────
const SYSTEM_PROMPT = `You are May's personal AI assistant on her portfolio website. Answer questions about May Rao concisely and warmly, as if you ARE May speaking in first person. Keep answers to 2–4 sentences unless more detail is asked for.

Here is May's full background:

NAME: May Rao
EMAIL: xy551166@gmail.com | PHONE: 0415 128 606

SUMMARY:
Technology graduate with hands-on experience building responsive web applications using JavaScript/TypeScript, React, Next.js, Node.js and Express.js. Strong interest in digital customer experience, enterprise technology and cross-functional collaboration.

EDUCATION:
- Master of Computing and Innovation, University of Adelaide (July 2023 – July 2025), GPA: 6/7
- Top coursework: Algorithm & Data Structures 98/100, Mining Big Data 95/100, Software Engineering & Project 91/100, Event Driven Computing 86/100

WORK EXPERIENCE:
1. CyberLab – Full Stack Developer Intern (March 2025 – June 2025), associated with the University of Adelaide
   - Built responsive React/Next.js interfaces and reusable UI components with TypeScript and Tailwind CSS
   - Integrated RESTful APIs for transaction data, account linking and dashboard features
   - Contributed to Git workflows, code reviews and CI/CD practices in an Agile environment
   - Optimised UI performance following Web Vitals best practices

2. JB Hi-Fi – Sales/Operations Team Member (October 2024 – Present)
   - Processed inventory receipts, transfers and system updates
   - Handled customer transactions, refunds and exchanges
   - Coordinated internal stock transfers and resolved operational issues

PROJECTS:
1. Mobile Plan & Support Platform
   - Full-stack retail support platform for plan recommendation, activation tracking and issue escalation
   - React + TypeScript frontend, Node.js/Express APIs, PostgreSQL database

2. AUS Tax Calculator
   - Next.js + TypeScript responsive tax calculator for Australian income tax estimation
   - Features: tax breakdowns, offset options, bracket display, Vitest testing

3. Finance SaaS Platform
   - Full-stack finance manager with income/expense tracking, CSV import, Plaid bank integration
   - Clerk authentication, Next.js + Tailwind CSS + Shadcn UI, Lemon Squeezy payments

CERTIFICATIONS:
- Salesforce Administrator Certification
- Microsoft Azure AZ-900
- Deloitte Technology Job Simulation

TECHNICAL SKILLS:
- Languages: Python, Java, JavaScript, TypeScript, SQL
- Frontend: React.js, Next.js, Three.js, HTML5, CSS, Tailwind CSS
- Backend: Node.js, Express.js, Spring Boot, RESTful APIs
- Databases: MongoDB, PostgreSQL
- DevOps/Tools: Git, Vercel, Docker, Kubernetes, Salesforce

EXTRACURRICULARS:
- Member, Computer Science Club, University of Adelaide (Dec 2023–Present)
- Women in STEM 2025, University of Adelaide (March 2025–Present)
- Event Coordinator & Co-captain, Glenelg Badminton Club (April 2024–October 2025)

If asked about something not in this profile, politely say you don't have that detail and suggest they contact May directly at xy551166@gmail.com.`

// ─── OpenAI API call ─────────────────────────────────────────────────────────
async function askOpenAI(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  })
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`)
  const data = await res.json()
  return data.choices[0].message.content
}

const SUGGESTIONS = [
  "What's your background?",
  "Tell me about your projects",
  "What are your technical skills?",
  "Where did you study?",
  "Why are you a good fit?",
]

// ─── Typing indicator ────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-4 py-3.5">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block w-2.5 h-2.5 rounded-full bg-gray-400"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.16 }}
      />
    ))}
  </div>
)

// ─── Message bubble ──────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isUser = msg.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2.5 mt-0.5 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #0a84ff, #5e5ce6)",
            fontSize: 13,
            boxShadow: "0 2px 8px rgba(10,132,255,0.4)",
          }}
        >
          M
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 leading-relaxed ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{
          fontSize: 14,
          background: isUser
            ? "linear-gradient(135deg, #0a84ff, #0070e0)"
            : "rgba(52, 52, 58, 0.95)",
          color: "rgba(255,255,255,0.92)",
          boxShadow: isUser
            ? "0 3px 14px rgba(10,132,255,0.35)"
            : "0 2px 10px rgba(0,0,0,0.35)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "bot",
      text: "Hi! I'm May. Ask me anything about her background, skills, projects, or experience!",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
    }
  }, [messages, isTyping, isOpen, isMinimized])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setError(null)
    const userMsg = { id: Date.now(), role: "user", text: trimmed }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput("")
    setIsTyping(true)

    try {
      const reply = await askOpenAI(updatedMessages)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: reply }])
    } catch (err) {
      setError("Couldn't reach OpenAI. Check your API key or network.")
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: "Sorry, I couldn't connect right now. Please try again in a moment." },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* ── Floating launcher button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => { setIsOpen(true); setIsMinimized(false) }}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0a84ff, #5e5ce6)",
              boxShadow: "0 6px 28px rgba(10,132,255,0.55), 0 2px 8px rgba(0,0,0,0.4)",
            }}
            aria-label="Open chat with May's assistant"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
              <circle cx="8" cy="11" r="1.3" fill="#0a84ff" />
              <circle cx="12" cy="11" r="1.3" fill="#0a84ff" />
              <circle cx="16" cy="11" r="1.3" fill="#0a84ff" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 48 }}
            animate={
              isMinimized
                ? { opacity: 1, scale: 1, y: 0, height: 56 }
                : { opacity: 1, scale: 1, y: 0, height: 660 }
            }
            exit={{ opacity: 0, scale: 0.88, y: 48 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col overflow-hidden"
            style={{
              width: 460,
              borderRadius: 18,
              background: "rgba(20, 20, 24, 0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(48px) saturate(200%)",
              WebkitBackdropFilter: "blur(48px) saturate(200%)",
              boxShadow:
                "0 40px 100px rgba(0,0,0,0.75), 0 0 0 0.5px rgba(255,255,255,0.07) inset",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            }}
          >
            {/* ── Title bar ── */}
            <div
              className="flex items-center gap-3 px-5 flex-shrink-0"
              style={{
                height: 56,
                background: "rgba(28, 28, 33, 0.99)",
                borderBottom: isMinimized ? "none" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center group transition-opacity hover:opacity-80"
                  style={{ background: "#ff5f57" }}
                  aria-label="Close"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-red-900 leading-none font-bold" style={{ fontSize: 8 }}>✕</span>
                </button>
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center group transition-opacity hover:opacity-80"
                  style={{ background: "#febc2e" }}
                  aria-label="Minimize"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-yellow-900 leading-none font-bold" style={{ fontSize: 8 }}>−</span>
                </button>
                <button
                  onClick={() => setIsMinimized(false)}
                  className="w-3.5 h-3.5 rounded-full transition-opacity hover:opacity-80"
                  style={{ background: "#28c840" }}
                  aria-label="Expand"
                />
              </div>

              {/* Title */}
              <div className="flex-1 flex items-center justify-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #0a84ff, #5e5ce6)",
                    fontSize: 11,
                    boxShadow: "0 1px 6px rgba(10,132,255,0.45)",
                  }}
                >
                  M
                </div>
                <span
                  className="text-gray-100 font-semibold"
                  style={{ fontSize: 14, letterSpacing: "-0.015em" }}
                >
                  Ask Anything About May
                </span>
              </div>

              {/* Symmetry spacer */}
              <div style={{ width: 54 }} />
            </div>

            {/* ── Body ── */}
            {!isMinimized && (
              <>
                {/* ── Messages ── */}
                <div
                  className="flex-1 overflow-y-auto px-5 py-5"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style>{`
                    .chat-msgs::-webkit-scrollbar { display: none; }
                  `}</style>
                  <div className="chat-msgs">
                    {messages.map((msg) => (
                      <MessageBubble key={msg.id} msg={msg} />
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start mb-3"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2.5 mt-0.5 flex-shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #0a84ff, #5e5ce6)",
                            fontSize: 13,
                            boxShadow: "0 2px 8px rgba(10,132,255,0.4)",
                          }}
                        >
                          M
                        </div>
                        <div
                          className="rounded-2xl rounded-tl-sm"
                          style={{ background: "rgba(52,52,58,0.95)" }}
                        >
                          <TypingDots />
                        </div>
                      </motion.div>
                    )}

                    {error && (
                      <p className="text-center text-red-400 text-xs mt-1 mb-2">{error}</p>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* ── Suggested questions ── */}
                <div
                  className="px-5 pt-3 pb-2 flex flex-wrap gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p
                    className="w-full text-center mb-0.5"
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "0.01em" }}
                  >
                    Try asking
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      disabled={isTyping}
                      className="transition-all hover:opacity-75 active:scale-95 disabled:opacity-40"
                      style={{
                        fontSize: 12,
                        padding: "6px 13px",
                        borderRadius: 22,
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.11)",
                        color: "rgba(255,255,255,0.65)",
                        cursor: isTyping ? "default" : "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* ── Input bar ── */}
                <div
                  className="px-5 pb-6 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 28,
                      padding: "9px 9px 9px 18px",
                    }}
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about May…"
                      disabled={isTyping}
                      className="flex-1 bg-transparent outline-none placeholder-gray-500 disabled:opacity-50"
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.88)",
                        fontFamily: "inherit",
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isTyping}
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                      style={{
                        background:
                          input.trim() && !isTyping
                            ? "linear-gradient(135deg, #0a84ff, #0070e0)"
                            : "rgba(255,255,255,0.1)",
                        cursor: input.trim() && !isTyping ? "pointer" : "default",
                        boxShadow:
                          input.trim() && !isTyping
                            ? "0 3px 10px rgba(10,132,255,0.45)"
                            : "none",
                      }}
                      aria-label="Send"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
