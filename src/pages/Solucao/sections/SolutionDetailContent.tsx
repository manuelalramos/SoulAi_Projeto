import { useNavigate } from "react-router-dom";
import type { SolutionFeature } from "../../../types/solution";

// Props recebidas pela página de detalhe de uma funcionalidade.
type SolutionDetailContentProps = {
    feature: SolutionFeature;
};

// Renderiza descrição, resultado esperado e etapas de uma funcionalidade.
export function SolutionDetailContent({
    feature,
}: SolutionDetailContentProps) {
    // Permite voltar para a lista principal de recursos.
    const navigate = useNavigate();

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto w-[92%] max-w-[1180px]">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">

                    {/* Informações principais da funcionalidade */}
                    <div>
                        <p className="font-black uppercase text-soul-blue">
                            Como funciona
                        </p>

                        <p className="mt-4 text-base leading-relaxed md:text-lg">
                            {feature.description}
                        </p>

                        <div className="group mt-8 rounded-xl border border-soul-cyan/40 bg-soul-soft/70 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-soul-purple hover:via-soul-blue hover:to-[#1182c2] hover:shadow-future">
                            <h3 className="text-2xl font-black text-soul-ink transition-colors duration-300 group-hover:text-white">
                                Resultado esperado
                            </h3>

                            <p className="mt-3 transition-colors duration-300 group-hover:text-white/90">
                                {feature.result}
                            </p>
                        </div>
                    </div>

                    {/* Etapas principais */}
                    <div>
                        <h2 className="text-3xl font-black text-soul-ink">
                            Etapas principais
                        </h2>

                        <div className="mt-6 grid gap-4">
                            {/* Gera a lista de ações principais da funcionalidade. */}
                            {feature.actions.map((action, index) => (
                                <article
                                    key={action}
                                    className="group flex items-center gap-4 rounded-xl border border-soul-blue/10 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-soul-cyan/60 hover:bg-soul-soft/50 hover:shadow-future"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-soul-yellow to-soul-cyan font-black leading-none text-soul-ink transition-transform duration-300 group-hover:scale-110">
                                        {index + 1}
                                    </span>

                                    <p className="flex-1 leading-relaxed">
                                        {action}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Botão para voltar para a página de solução */}
                <button
                    type="button"
                    onClick={() => navigate("/solucao")}
                    className="mt-10 inline-flex min-h-11 items-center justify-center rounded-full border border-soul-blue/10 bg-soul-soft/80 px-5 py-3 font-black text-soul-ink transition-all duration-300 hover:-translate-y-1 hover:text-soul-blue hover:shadow-future"
                >
                    Voltar para recursos
                </button>
            </div>
        </section>
    );
}
