import { Link } from "react-router-dom";
import { SOUL_CHAT_OPEN_EVENT } from "../../../data/chat";
export function HomeAboutSection() {
    function abrirDemonstracaoChat() {
        window.dispatchEvent(new Event(SOUL_CHAT_OPEN_EVENT));
    
    }

    return (
        <section
            className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_46%,#ffffff_100%)] py-16 md:py-20"
            id="home">
            <div className="mx-auto w-[92%] max-w-[1180px]">
                <article className="rounded-xl border border-soul-cyan/40 bg-white/80 p-6 shadow-card backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-future md:p-12">
                    <p className="font-black uppercase text-soul-blue">Nosso Projeto</p>
                    <h2 className="mt-1 text-4xl font-black text-soul-ink md:text-5xl">Sobre</h2>
                    <p className="mt-4 max-w-4xl text-left">
                        O SoulAI é uma solução criada para tornar a experiência dentro da
                        SoulUp mais interativa, personalizada e envolvente. A proposta
                        utiliza inteligência artificial, gamificação e um avatar inteligente
                        para acompanhar o usuário, incentivar sua participação e estimular
                        ações sustentáveis de forma leve e contínua.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link
                            className="inline-flex min-h-12 min-w-[200px] items-center justify-center rounded-full border border-soulcyan/50 bg-white px-6 py-3 font-black text-soul-ink transition hover:-translate-y-1 hover:bg-soul-yellow"
                            to="/sobre">
                            Saiba mais
                        </Link>
                        <button
                            className="inline-flex min-h-12 min-w-[200px] items-center justify-center rounded-full border border-soulblue/20 bg-soul-soft/80 px-6 py-3 font-black text-soul-ink transition hover:-translate-y-1 hover:bg-soul-yellow"
                            type="button"
                            onClick={abrirDemonstracaoChat}>
                            Ver demonstração do chat
                        </button>
                    </div>
                </article>
            </div>
        </section>
    );
}
