import { Link } from "react-router-dom";

import PageIntro from "../../components/PageIntro/PageIntro";

import { solutionFeatures } from "../../data/solution";

import { FeatureShowcaseSection } from "./sections/FeatureShowcaseSection";

import { FlowSection } from "./sections/FlowSection";

// Página principal que apresenta o funcionamento e os recursos da solução.
export default function Solucao() {
    return (
        <>
            <PageIntro
                label="Funcionalidades"
                title="Como a solução funciona"
                description="Entenda como o SoulAI utiliza avatar inteligente, missões, foguinho progressivo e recompensas para tornar a experiência na SoulUp mais interativa e motivadora."
            />

            {/* Mostra o fluxo de uso do SoulAI em etapas. */}
            <FlowSection />

            {/* Apresenta os pilares da solução em cards resumidos. */}
            <FeatureShowcaseSection />

            <section className="bg-white pb-16">
                <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Cada funcionalidade vira um card com link para a rota dinâmica. */}
                    {solutionFeatures.map((feature) => (
                        <article
                            className="group rounded-xl border border-soul-blue/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-soul-purple hover:via-soul-blue hover:to-[#1182c2] hover:shadow-future"
                            key={feature.slug}
                        >
                            <h2 className="text-2xl font-black text-soul-ink transition-colors duration-300 group-hover:text-white">
                                {feature.title}
                            </h2>

                            <p className="mt-2 transition-colors duration-300 group-hover:text-white/90">
                                {feature.summary}
                            </p>

                            <Link
                                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-soul-blue/10 bg-soul-soft/80 px-5 py-3 font-black text-soul-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-future"
                                to={`/solucao/${feature.slug}`}
                            >
                                Ver detalhes
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
