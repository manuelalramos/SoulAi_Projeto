import { Fragment } from "react";
import { conceptPath } from "../../../data/about";

export default function AboutObjectiveSection() {
    return (
        <section className="relative overflow-hidden bg-[lineargradient(180deg,#ffffff_0%,#f7f9ff_38%,#eef8ff_72%,#ffffff_100%)] py-16 md:py-20">
            <div className="mx-auto w-[92%] max-w-[1180px]">
                <div className="max-w-4xl">
                    <p className="font-black uppercase text-soul-blue">Visão do projeto</p>
                    <h2 className="mt-1 text-4xl font-black leading-none text-soul-ink md:text-5xl">
                        Objetivo
                    </h2>
                    <p className="mt-4 max-w-3xl text-base md:text-lg">
                        O objetivo do SoulAI é aumentar o engajamento dos usuários dentro
                        da SoulUp, transformando ações sustentáveis em uma experiência mais
                        leve, interativa e recompensadora. A proposta incentiva o retorno
                        frequente ao aplicativo sem tornar o uso cansativo, valorizando
                        tanto pequenas interações quanto ações de maior impacto.
                    </p>
                </div>
                <div className="my-9 grid grid-cols-1 items-center gap-3 lg:grid-cols-[1fr_56px_1fr_56px_1fr]">
                    {conceptPath.map((item, index) => (
                        <Fragment key={item.title}>
                            <article
                                className={`min-h-[190px] rounded-xl border p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-future ${item.featured
                                        ? "border-soul-cyan/50 bg-white"
                                        : "border-soul-blue/10 bg-white/85"
                                    }`}
                            >
                                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-soulyellow to-[#fff5bd] font-black text-soul-ink">
                                    {item.index}
                                </span>
                                <h3 className="mt-3 text-2xl font-black text-soul-ink">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm md:text-base">{item.text}</p>
                            </article>
                            {index < conceptPath.length - 1 && (
                                <div
                                    className="h-8 w-0.5 justify-self-center bg-gradient-to-b from-soul-purple/20 to-soul-cyan/ 70 lg:h-0.5 lg:w-full lg:bg-gradient-to-r"
                                    aria-hidden="true"
                                />
                            )}
                        </Fragment>
                    ))}
                </div>
                <article className="grid grid-cols-1 items-center gap-6 rounded-xl border border-soul-cyan/40 bgwhite/90 p-7 shadow-card backdrop-blur md:p-8 lg:grid-cols-[0.82fr_1.18fr]">
                    <div>
                        <p className="font-black uppercase text-soul-blue">Solução proposta</p>
                        <h3 className="mt-1 text-3xl font-black leading-tight text-soul-ink">
                            Um avatar inteligente que deixa a plataforma mais viva.
                        </h3>
                    </div>
                    <p>
                        O SoulAI acompanha o comportamento do usuário, sugere missões,
                        reconhece conquistas e usa gamificação para estimular ações
                        sustentáveis no dia a dia.
                    </p>
                </article>
            </div>
        </section>
    );
}