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
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
                        <Link
                            className="relative z-0 inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full border border-soul-blue/10 bg-soul-soft/80 px-5 py-3 text-center font-black text-soul-ink transition duration-300 before:absolute before:inset-0 before:-z-10 before:w-0 before:bg-gradient-to-r before:from-soul-yellow before:to-soul-cyan before:transition-all before:duration-500 before:content-[''] hover:-translate-y-1 hover:border-transparent hover:text-soul-ink hover:shadow-future hover:before:w-full sm:w-auto sm:min-w-[200px] sm:px-6"
                            to="/sobre"
                        >
                            Saiba mais
                        </Link>
                        <button
                            className="relative z-0 inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full border border-soul-blue/10 bg-soul-soft/80 px-5 py-3 text-center font-black text-soul-ink transition duration-300 before:absolute before:inset-0 before:-z-10 before:w-0 before:bg-gradient-to-r before:from-soul-yellow before:to-soul-cyan before:transition-all before:duration-500 before:content-[''] hover:-translate-y-1 hover:border-transparent hover:text-soul-ink hover:shadow-future hover:before:w-full sm:w-auto sm:min-w-[200px] sm:px-6"
                            type="button"
                            onClick={abrirDemonstracaoChat}
                        >
                            Ver demonstração do chat
                        </button>
                    </div>
                </article>
            </div>
        </section>
    );
}
