import { useNavigate } from "react-router-dom";
import type { SolutionFeature } from "../../../types/solution";

type SolutionDetailContentProps = {
  feature: SolutionFeature;
};

export function SolutionDetailContent({
  feature,
}: SolutionDetailContentProps) {
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

            <div className="mt-8 rounded-xl border border-soul-cyan/40 bg-soul-soft/70 p-6 shadow-card">
              <h3 className="text-2xl font-black text-soul-ink">
                Resultado esperado
              </h3>

              <p className="mt-3">
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
              {feature.actions.map((action, index) => (
                <article
                  key={action}
                  className="flex items-start gap-4 rounded-xl border border-soul-blue/10 bg-white p-5 shadow-card"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-soul-yellow to-soul-cyan font-black text-soul-ink">
                    {index + 1}
                  </span>

                  <p>
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