import { roadmapItems } from "../../../data/about";

// Seção que mostra possibilidades futuras para evolução do SoulAI.
export default function RoadmapSection() {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto w-[92%] max-w-[1180px] rounded-xl border border-soul-cyan/40 bg-[lineargradient(135deg,#ffffff,#f5f6ff)] p-7 shadow-card md:p-10">
                <p className="font-black uppercase text-soul-blue">Próximos passos</p>
                <h2 className="mt-1 text-4xl font-black text-soul-ink md:text-5xl">
                    Roadmap
                </h2>
                <p className="mt-3 max-w-3xl">
                    O roadmap mostra como o SoulAI pode evoluir depois da primeira versão,
                    mantendo a proposta de engajar o usuário e conectar as ações ao apoio no
                    pagamento da conta de luz.
                </p>
                <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Numera cada item do roadmap automaticamente. */}
                    {roadmapItems.map((item, index) => (
                        <article
                            className="rounded-xl border border-soul-blue/10 bg-white p-5 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                            key={item}
                        >
                            <span className="text-3xl font-black text-soul-blue">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-3">{item}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
