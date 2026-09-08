/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        soul: {
          purple: "#6e4bff",
          blue: "#3438c8",
          cyan: "#50c7ff",
          yellow: "#ffd86b",
          ink: "#161733",
          text: "#33364f",
          soft: "#f5f6ff",
          line: "#e5e7f5",
        },
      },
      backgroundImage: {
        "soul-gradient": "linear-gradient(135deg, #6e4bff, #3438c8, #50c7ff)",
      },
      boxShadow: {
        card: "0 12px 30px rgba(52, 56, 200, 0.13)",
        header: "0 8px 20px rgba(0, 0, 0, 0.15)",
        future: "0 20px 50px rgba(52, 56, 200, 0.18)",
      },
      animation: {
        "chat-enter": "chatEnter 0.28s ease both",
        "message-enter": "messageEnter 0.28s ease both",
        "typing-pulse": "typingPulse 0.8s ease-in-out infinite",
      },
      keyframes: {
        chatEnter: {
          from: { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        messageEnter: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        typingPulse: {
          "0%, 100%": { opacity: "0.35", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-2px)" },
        },
      },
    },
  },
  plugins: [],
};