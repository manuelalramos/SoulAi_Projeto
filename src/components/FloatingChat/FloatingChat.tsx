import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SOUL_CHAT_OPEN_EVENT, SOUL_PROGRESS_REFRESH_EVENT, chatMessages } from "../../data/chat";
import { enviarMensagem, sessaoIAExpirada } from "../../data/ia";
import useSessao from "../../hooks/useSessao";
import type { ChatMessage } from "../../types/chat";

// Chat da IA disponível em todas as telas, com ou sem login.
export default function FloatingChat() {
    const { sessao, sair } = useSessao();
    const navegar = useNavigate();
    const [chatAberto, setChatAberto] = useState(false);
    const [mensagens, setMensagens] = useState<ChatMessage[]>(chatMessages);
    const [texto, setTexto] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");
    const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID());
    const requisicaoAtual = useRef<AbortController | null>(null);
    const areaMensagens = useRef<HTMLDivElement>(null);

    function abrirChat() {
        setChatAberto(true);
    }

    // A Home também pode abrir a mesma conversa pelo evento compartilhado.
    useEffect(() => {
        window.addEventListener(SOUL_CHAT_OPEN_EVENT, abrirChat);
        return () => window.removeEventListener(SOUL_CHAT_OPEN_EVENT, abrirChat);
    }, []);

    useEffect(() => {
        return () => requisicaoAtual.current?.abort();
    }, []);

    // Rola só a área das mensagens, sem mover a página por trás do chat.
    useEffect(() => {
        if (chatAberto && areaMensagens.current) {
            areaMensagens.current.scrollTop = areaMensagens.current.scrollHeight;
        }
    }, [chatAberto, mensagens, enviando, erro]);

    async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const mensagem = texto.trim();
        if (!mensagem || requisicaoAtual.current) return;

        const controle = new AbortController();
        requisicaoAtual.current = controle;
        setMensagens((atuais) => [...atuais, { author: "Usuário", text: mensagem }]);
        setTexto("");
        setErro("");
        setEnviando(true);

        try {
            const token = sessao?.tipo === "usuario" ? sessao.tokenIA : undefined;
            const resposta = await enviarMensagem(mensagem, sessionId, controle.signal, token);
            if (controle.signal.aborted) return;
            setMensagens((atuais) => [...atuais, { author: "SoulAI", text: resposta.resposta }]);
            if (resposta.sessionId) setSessionId(resposta.sessionId);
            // Só recarrega os dados quando o Python confirma uma alteração no Java.
            if (token && resposta.metadata?.data_changed === true) {
                window.dispatchEvent(new Event(SOUL_PROGRESS_REFRESH_EVENT));
            }
        } catch (erro) {
            if (!controle.signal.aborted) {
                if (sessaoIAExpirada(erro) && sessao?.tipo === "usuario") {
                    sair();
                    navegar("/login", { replace: true, state: { sessaoExpirada: true } });
                    return;
                }
                setErro(erro instanceof Error ? erro.message : "Não foi possível enviar a mensagem. Tente novamente.");
            }
        } finally {
            if (!controle.signal.aborted) setEnviando(false);
            if (requisicaoAtual.current === controle) requisicaoAtual.current = null;
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
            {chatAberto && (
                <aside id="soulai-chat" aria-label="Mensagens do SoulAI"
                    className="absolute bottom-20 right-0 flex max-h-[calc(100dvh-7rem)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-soul-line bg-white/95 shadow-future backdrop-blur-2xl"
                    onKeyDown={(evento) => { if (evento.key === "Escape") setChatAberto(false); }}>
                    {/* Cabeçalho da conversa e botão para fechar. */}
                    <div className="flex shrink-0 items-start justify-between gap-3 bg-gradient-to-r from-soul-purple to-soul-blue p-4 text-white">
                        <div className="min-w-0">
                            <h2 className="text-2xl font-black">SoulAI</h2>
                            <p className="mt-1 break-words text-xs text-white/80">{sessao ? "Olá, " + sessao.pessoa.nome.split(" ")[0] + "!" : "Converse sobre sustentabilidade"}</p>
                        </div>
                        <button type="button" aria-label="Fechar chat" onClick={() => setChatAberto(false)}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                            <i className="fa-solid fa-xmark" aria-hidden="true" />
                        </button>
                    </div>

                    {/* As mensagens reais substituem a antiga conversa de demonstração. */}
                    <div ref={areaMensagens} role="log" aria-label="Conversa com o SoulAI" aria-live="polite" aria-relevant="additions"
                        className="grid min-h-0 max-h-[380px] gap-3 overflow-y-auto overscroll-contain bg-soul-soft/50 p-4">
                        {mensagens.map((mensagem, indice) => (
                            <p key={mensagem.author + "-" + indice}
                                className={"grid max-w-[88%] gap-1 whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm [overflow-wrap:anywhere] " + (mensagem.author === "Usuário"
                                    ? "justify-self-end bg-gradient-to-r from-soul-blue to-soul-purple text-white"
                                    : "justify-self-start bg-white text-soul-text shadow")}>
                                <span className="text-xs font-black uppercase">{mensagem.author}</span>
                                {mensagem.text}
                            </p>
                        ))}

                        {enviando && <div role="status" className="justify-self-start rounded-xl bg-white px-4 py-3 text-sm text-soul-blue shadow">
                            <p className="animate-typing-pulse font-bold motion-reduce:animate-none">SoulAI está digitando...</p>
                            <p className="mt-1 text-xs">A primeira resposta pode levar um pouco mais de tempo.</p>
                        </div>}
                        {erro && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{erro}</p>}
                    </div>

                    {/* Enviar bloqueia só este botão enquanto a IA responde. */}
                    <form onSubmit={(evento) => void enviarFormulario(evento)} className="shrink-0 border-t border-soul-line bg-white p-3 sm:p-4">
                        <label htmlFor="mensagem-soulai" className="sr-only">Mensagem para o SoulAI</label>
                        <div className="flex items-center gap-2">
                            <input id="mensagem-soulai" type="text" autoComplete="off" maxLength={4000} value={texto}
                                onChange={(evento) => setTexto(evento.target.value)} placeholder="Escreva sua mensagem..."
                                className="campo-app min-w-0 flex-1 text-sm" />
                            <button type="submit" disabled={enviando || !texto.trim()} className="botao-app shrink-0 px-4 text-sm">Enviar</button>
                        </div>
                        {!sessao && <p className="mt-3 text-xs text-soul-text">Converse sem login. <Link to="/login" onClick={() => setChatAberto(false)} className="font-bold text-soul-blue underline">Faça login</Link> para acompanhar seu progresso.</p>}
                    </form>
                </aside>
            )}

            {/* A bolinha permanece acessível mesmo para quem ainda não entrou. */}
            <button type="button" aria-controls="soulai-chat" aria-expanded={chatAberto}
                aria-label={chatAberto ? "Fechar assistente SoulAI" : "Abrir assistente SoulAI"}
                onClick={() => { if (chatAberto) setChatAberto(false); else abrirChat(); }}
                className="grid h-16 w-16 place-items-center rounded-full border border-soul-cyan/40 bg-white shadow-[0_16px_30px_rgba(52,56,200,0.24)] transition hover:-translate-y-1 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soul-purple motion-reduce:transform-none md:h-[70px] md:w-[70px]">
                <i className="fa-solid fa-fire text-3xl text-soul-blue" aria-hidden="true" />
            </button>
        </div>
    );
}
