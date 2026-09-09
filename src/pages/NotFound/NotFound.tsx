import { Link } from "react-router-dom";

import PageIntro from "../../components/PageIntro/PageIntro";

// Página exibida quando o usuário acessa uma rota não cadastrada.
export default function NotFound() {
  return (
    <>
      <PageIntro
        label="Página não encontrada"
        title="Ops, essa rota não existe"
        description="Use o menu principal para continuar navegando pelo projeto."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto w-[92%] max-w-[700px]">

          {/* Card de página não encontrada */}
          <article className="rounded-xl border border-soul-blue/10 bg-soul-soft/50 p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-soul-cyan/40 hover:shadow-future md:p-10">

            {/* Código do erro */}
            <p className="text-7xl font-black text-soul-blue md:text-8xl">
              404
            </p>

            <h2 className="mt-4 text-3xl font-black text-soul-ink">
              Parece que você se perdeu por aqui.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed md:text-lg">
              A página que você tentou acessar não foi encontrada.
              Clique no botão abaixo para voltar para a página inicial e
              continuar navegando pelo SoulAI.
            </p>

            {/* Botão para voltar para a Home */}
            <Link
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-soul-blue/10 bg-soul-soft/80 px-6 py-3 font-black text-soul-ink transition-all duration-300 hover:-translate-y-1 hover:text-soul-blue hover:shadow-future"
              to="/"
            >
              Voltar para a Home

              <i
                className="fa-solid fa-arrow-right"
                aria-hidden="true"
              />
            </Link>

          </article>

        </div>
      </section>
    </>
  );
}
