import PageIntro  from "../../components/PageIntro/PageIntro";
import { TeamCard } from "../../components/TeamCard/TeamCard";
import { teamMembers } from "../../data/team";

export default function Integrantes() {
  return (
    <>
      {/* Cabeçalho da página com título e descrição */}
      <PageIntro
        label="Equipe"
        title="Integrantes do Projeto"
        description="Conheça as integrantes responsáveis pelo desenvolvimento do SoulAI, projeto criado para unir tecnologia, sustentabilidade e experiência do usuário dentro da plataforma SoulUp."
      />

      {/* Seção onde ficam os cards das integrantes */}
      <section className="bg-white py-16 md:py-20">

        {/* Grid responsável por organizar os cards */}
        <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2">

          {/* Percorre a lista de integrantes */}
          {teamMembers.map((member) => (

            // Cria um TeamCard para cada integrante
            <TeamCard
              key={member.rm}
              member={member}
            />

          ))}

        </div>
      </section>
    </>
  );
}