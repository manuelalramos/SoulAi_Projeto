/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos onde o Tailwind procura classes usadas pela interface.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Paleta personalizada da identidade visual do SoulAI.
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
      // Gradiente principal reutilizado em áreas de destaque.
      backgroundImage: {
        "soul-gradient": "linear-gradient(135deg, #6e4bff, #3438c8, #50c7ff)",
      },
      // Sombras padronizadas para cards, header e elementos destacados.
      boxShadow: {
        card: "0 12px 30px rgba(52, 56, 200, 0.13)",
        header: "0 8px 20px rgba(0, 0, 0, 0.15)",
        future: "0 20px 50px rgba(52, 56, 200, 0.18)",
      },
      // Animações usadas em interações como chat e mensagens.
      animation: {
        "chat-enter": "chatEnter 0.28s ease both",
        "message-enter": "messageEnter 0.28s ease both",
        "typing-pulse": "typingPulse 0.8s ease-in-out infinite",
      },
      // Keyframes que definem a entrada do chat e o indicador de digitação.
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
