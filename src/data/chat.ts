import type { ChatMessage } from "../types/chat";

// Evento usado para abrir o chat flutuante a partir de outras partes do site.
export const SOUL_CHAT_OPEN_EVENT = "soulai:open-chat";

// Avisa a área logada quando o chat confirma uma alteração no progresso.
export const SOUL_PROGRESS_REFRESH_EVENT = "soulai:refresh-progress";

// Boas-vindas mostradas antes da primeira mensagem enviada para a IA.
export const chatMessages: ChatMessage[] = [
    { author: "SoulAI", text: "Oi! Eu sou o SoulAI 🔥 Posso ajudar com dúvidas sobre sustentabilidade, missões e a loja. O que você quer saber?" },
];
