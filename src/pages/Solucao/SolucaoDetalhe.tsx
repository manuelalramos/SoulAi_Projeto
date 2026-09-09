import { useNavigate, useParams } from "react-router-dom";

import PageIntro from "../../components/PageIntro/PageIntro";
import { solutionFeatures } from "../../data/solution";
import { SolutionDetailContent } from "./sections/SolutionDetailContent";

// Página dinâmica que mostra o detalhe de uma funcionalidade pelo slug da URL.
export default function SolucaoDetalhe() {
  // O slug vem da parte dinâmica da URL: /solucao/:slug
  const { slug } = useParams<{ slug: string }>();

  // Navegação programática usada no botão de retorno.
  const navigate = useNavigate();

  // Procura o recurso que possui o mesmo slug da URL
  const feature = solutionFeatures.find(
    (item) => item.slug === slug
  );

  // Caso não exista uma funcionalidade com esse slug
  if (!feature) {
    return (
      <>
        <PageIntro
          label="Recurso não encontrado"
          title="Essa página da solução não existe"
          description="Volte para a lista de recursos e escolha uma das opções disponíveis."
        />

        <section className="bg-white py-16">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <button
              className="relative z-0 inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-soul-blue/10 bg-soul-soft/80 px-6 py-3 font-black text-soul-ink transition duration-300 before:absolute before:inset-0 before:-z-10 before:w-0 before:bg-gradient-to-r before:from-soul-yellow before:to-soul-cyan before:transition-all before:duration-500 before:content-[''] hover:-translate-y-1 hover:border-transparent hover:shadow-future hover:before:w-full"
              type="button"
              onClick={() => navigate("/solucao")}
            >
              Voltar para a solução
            </button>
          </div>
        </section>
      </>
    );
  }

  // Caso a funcionalidade exista
  return (
    <>
      <PageIntro
        label="Detalhe da solução"
        title={feature.title}
        description={feature.summary}
      />

      <SolutionDetailContent feature={feature} />
    </>
  );
}
