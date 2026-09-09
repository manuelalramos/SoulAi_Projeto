import type { ChatMessage } from "../types/chat";

// Evento usado para abrir o chat flutuante a partir de outras partes do site.
export const SOUL_CHAT_OPEN_EVENT = "soulai:open-chat";

// Sequência fixa de mensagens usada para simular a conversa com o SoulAI.
export const chatMessages: ChatMessage[] = [

    { author: "SoulAI", text: "Ei, que bom que voltou hoje! 🔥\nSua sequência continua ativa!" },
    { author: "SoulAI", text: "O que deseja fazer hoje?" },
    { author: "Usuário", text: "Ver minhas missões" },
    { author: "SoulAI", text: "Você tem 2 missões disponíveis hoje \n• Assistir um conteúdo sustentável (+2 moedas)\n• 👇Completar uma ação consciente (+5 moedas)" },
    { author: "Usuário", text: "Quero fazer uma ação rápida" },
    { author: "SoulAI", text: "Perfeito 🙂\nMe responde uma coisa:\nHoje você fez algo pra economizar energia?" },
    { author: "Usuário", text: "Sim, desliguei as luzes antes de sair" },
    { author: "SoulAI", text: "Boa! Pequenas atitudes geram impacto 🌱" },
    { author: "SoulAI", text: "+3 moedas adicionadas!\nVocê agora tem 21 moedas 💰" },
    { author: "SoulAI", text: "Continue sua sequência para desbloquear novos itens do avatar⚡" },

];
