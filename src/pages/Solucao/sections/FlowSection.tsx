import { flowSteps } from "../../../data/solution";

const cardColors = [
  "from-soul-purple to-[#7d6bff]",
  "from-soul-blue to-[#5a67ff]",
  "from-[#1182c2] to-soul-cyan",
  "from-soul-ink to-[#30338c]",
  "from-[#7c3aed] to-soul-cyan",
  "from-[#0891b2] to-soul-blue",
  "from-[#4338ca] to-soul-purple",
];

export function FlowSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-[92%] max-w-[1180px]">

        {/* Título da seção */}
        <div className="max-w-3xl">
          <p className="font-black uppercase text-soul-blue">
            Fluxo de uso
          </p>

          <h2 className="mt-1 text-4xl font-black text-soul-ink md:text-5xl">
            Do primeiro acesso até as ações sustentáveis
          </h2>

          <p className="mt-4 text-base md:text-lg">
            A experiência foi pensada para ser simples e progressiva. O usuário
            acessa a plataforma, interage com o avatar, recebe sugestões de
            missões e acumula pontos conforme realiza ações dentro da SoulUp.
          </p>
        </div>

        {/* Cards do fluxo */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {flowSteps.map((step, index) => (
            <article
              key={step.title}
              className={`rounded-xl bg-gradient-to-br ${
                cardColors[index]
              } p-6 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-future`}
            >
              <h3 className="text-3xl font-black">
                {step.title}
              </h3>

              <p className="mt-3 text-white/90">
                {step.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}