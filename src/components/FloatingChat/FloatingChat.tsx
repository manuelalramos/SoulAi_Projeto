import { useEffect, useState } from "react";
import iconSoul from "../../assets/media/icone.png";
import { SOUL_CHAT_OPEN_EVENT, chatMessages } from "../../data/chat";


export function FloatingChat() {
    const [chatAberto, setChatAberto] = useState(false);
    const [mensagensVisiveis, setMensagensVisiveis] = useState(0);
    function abrirChat() {
        setMensagensVisiveis(0);
        setChatAberto(true);
    }
    // Permite que a Home abra o chat por um evento simples.
    useEffect(() => {
        window.addEventListener(SOUL_CHAT_OPEN_EVENT, abrirChat);
        return () => {
            window.removeEventListener(SOUL_CHAT_OPEN_EVENT, abrirChat);
        };
    }, []);
    // Mostra as mensagens aos poucos enquanto o chat está aberto.
    useEffect(() => {
        if (!chatAberto) {
            setMensagensVisiveis(0);
            return;
        }
        const intervalo = window.setInterval(() => {
            setMensagensVisiveis((quantidadeAtual) => {
                if (quantidadeAtual >= chatMessages.length) {
                    window.clearInterval(intervalo);
                    return quantidadeAtual;
                }
                return quantidadeAtual + 1;
            });
        }, 520);
        return () => {
            window.clearInterval(intervalo);
        };
    }, [chatAberto]);
    return (
        <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
            {chatAberto && (
                <aside
                    className="absolute bottom-20 right-0 w-[min(350px,calc(100vw-32px))] overflow-hidden rounded-xl border bordersoul-cyan/40 bg-white/95 shadow-future backdrop-blur-2xl"
                    aria-label="Mensagens do SoulAI"
                >
                    <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-soul-purple to-soul-blue p-5 textwhite">
                        <div>
                            <span className="font-black uppercase text-soul-yellow">online</span>
                            <h2 className="text-2xl font-black">SoulAI</h2>
                        </div>
                        <button
                            className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10"
                            type="button"
                            aria-label="Fechar chat"
                            onClick={() => setChatAberto(false)}
                        >
                            <i className="fa-solid fa-xmark" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="grid max-h-[380px] gap-3 overflow-y-auto bg-soul-soft/50 p-5">
                        {chatMessages.slice(0, mensagensVisiveis).map((message, index) => (
                            <p
                                key={`${message.author}-${index}`}
                                className={`grid max-w-[88%] gap-1 whitespace-pre-line rounded-xl px-3 py-2 text-sm ${message.author === "Usuário"
                                        ? "justify-self-end bg-gradient-to-r from-soul-blue to-soul-purple text-white"
                                        : "justify-self-start bg-white text-soul-text shadow"
                                    }`}
                            >
                                <span className="text-xs font-black uppercase">{message.author}</span>
                                {message.text}
                            </p>
                        ))}
                        {mensagensVisiveis < chatMessages.length && (
                            <p className="w-max rounded-xl bg-white px-4 py-2 text-soul-blue shadow" aria-label="SoulAI está
digitando">
                                • • •
                            </p>
                        )}
                    </div>
                </aside>
            )}
            <button
                className="grid h-16 w-16 place-items-center rounded-full border border-soul-cyan/40 bg-white shadow-
[0_16px_30px_rgba(52,56,200,0.24)] transition hover:-translate-y-1 hover:scale-105 md:h-[70px] md:w-[70px]"
                type="button"
                aria-label={chatAberto ? "Fechar assistente SoulAI" : "Abrir assistente SoulAI"}
                aria-expanded={chatAberto}
                onClick={() => {
                    if (chatAberto) {
                        setChatAberto(false);
                    } else {
                        abrirChat();
                    }
                }}
            >
                <img className="h-11 w-11 object-contain" src={iconSoul} alt="" aria-hidden="true" />
            </button>
        </div>
    );
}