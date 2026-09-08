import { useEffect, useState } from "react";

import { SOUL_CHAT_OPEN_EVENT, chatMessages } from "../../data/chat";

export function FloatingChat() {
    // Controla se o chat está aberto ou fechado
    const [chatAberto, setChatAberto] = useState(false);

    // Controla quantas mensagens já apareceram
    const [mensagensVisiveis, setMensagensVisiveis] = useState(0);

    // Função usada para abrir o chat
    function abrirChat() {
        setMensagensVisiveis(0);
        setChatAberto(true);
    }

    // Permite que outra parte do site abra o chat
    useEffect(() => {
        window.addEventListener(SOUL_CHAT_OPEN_EVENT, abrirChat);

        return () => {
            window.removeEventListener(SOUL_CHAT_OPEN_EVENT, abrirChat);
        };
    }, []);

    // Faz as mensagens aparecerem aos poucos
    useEffect(() => {
        // Se o chat estiver fechado, zera as mensagens visíveis
        if (!chatAberto) {
            setMensagensVisiveis(0);
            return;
        }

        // Mostra uma nova mensagem a cada 520ms
        const intervalo = window.setInterval(() => {
            setMensagensVisiveis((quantidadeAtual) => {
                // Quando todas as mensagens aparecerem, para o intervalo
                if (quantidadeAtual >= chatMessages.length) {
                    window.clearInterval(intervalo);

                    return quantidadeAtual;
                }

                return quantidadeAtual + 1;
            });
        }, 520);

        // Limpa o intervalo quando o componente atualizar ou fechar
        return () => {
            window.clearInterval(intervalo);
        };
    }, [chatAberto]);

    return (
        <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
            {/* Janela do chat */}
            {chatAberto && (
                <aside
                    className="absolute bottom-20 right-0 w-[min(350px,calc(100vw-32px))] overflow-hidden rounded-xl bg-white/95 shadow-future backdrop-blur-2xl"
                    aria-label="Mensagens do SoulAI"
                >
                    {/* Cabeçalho do chat */}
                    <div className="flex items-start justify-between gap-3 border-b border-soul-soft/80 bg-gradient-to-r from-soul-purple to-soul-blue p-5 text-white">
                        <div>
                            <h2 className="text-2xl font-black text-white">
                                SoulAI
                            </h2>
                            <p className="text-xs text-white/60">
                                Demonstração do assistente virtual
                            </p>
                        </div>

                        {/* Botão para fechar o chat */}
                        <button
                            className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10 text-white"
                            type="button"
                            aria-label="Fechar chat"
                            onClick={() => setChatAberto(false)}
                        >
                            <i
                                className="fa-solid fa-xmark text-white"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    {/* Área das mensagens */}
                    <div className="grid max-h-[380px] gap-3 overflow-y-auto bg-soul-soft/50 p-5">
                        {chatMessages
                            .slice(0, mensagensVisiveis)
                            .map((message, index) => (
                                <p
                                    key={`${message.author}-${index}`}
                                    className={`grid max-w-[88%] gap-1 whitespace-pre-line rounded-xl px-3 py-2 text-sm ${message.author === "Usuário"
                                            ? "justify-self-end bg-gradient-to-r from-soul-blue to-soul-purple text-white"
                                            : "justify-self-start bg-white text-soul-text shadow"
                                        }`}
                                >
                                    <span className="text-xs font-black uppercase">
                                        {message.author}
                                    </span>

                                    {message.text}
                                </p>
                            ))}

                        {/* Aparece enquanto ainda existem mensagens para mostrar */}
                        {mensagensVisiveis < chatMessages.length && (
                            <p
                                className="w-max rounded-xl bg-white px-4 py-2 text-soul-blue shadow"
                                aria-label="SoulAI está digitando"
                            >
                                • • •
                            </p>
                        )}
                    </div>
                </aside>
            )}

            {/* Botão flutuante para abrir e fechar o chat */}
            <button
                className="grid h-16 w-16 place-items-center rounded-full border border-soul-cyan/40 bg-white shadow-[0_16px_30px_rgba(52,56,200,0.24)] transition hover:-translate-y-1 hover:scale-105 md:h-[70px] md:w-[70px]"
                type="button"
                aria-label={
                    chatAberto
                        ? "Fechar assistente SoulAI"
                        : "Abrir assistente SoulAI"
                }
                aria-expanded={chatAberto}
                onClick={() => {
                    if (chatAberto) {
                        setChatAberto(false);
                    } else {
                        abrirChat();
                    }
                }}
            >
                {/* Ícone do chat */}
                <i
                    className="fa-solid fa-fire text-3xl text-soul-blue"
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}