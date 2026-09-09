import type { TeamMember } from "../../types/team";

// Define o que o componente TeamCard precisa receber
type TeamCardProps = {
  // O componente recebe um objeto do tipo TeamMember
  member: TeamMember;
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    // Card principal da integrante
    <article className="rounded-xl border border-soul-blue/10 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-soul-cyan/50 hover:shadow-future">

      {/* Foto da integrante */}
      <img
        className="mx-auto mb-5 h-36 w-36 rounded-xl border-2 border-soul-cyan/40 object-cover"
        src={member.photo}
        alt={`Foto de ${member.name}`}
      />

      {/* Nome da integrante */}
      <h2 className="mb-2 text-2xl font-black text-soul-ink">
        {member.name}
      </h2>

      {/* RM da integrante */}
      <p>
        <strong>RM: </strong>
        {member.rm}
      </p>

      {/* Turma da integrante */}
      <p>
        <strong>Turma: </strong>
        {member.className}
      </p>

      {/* Área dos links sociais */}
      <div className="mt-4 flex justify-center gap-3">

        {/* Link para o GitHub */}
        <a
          className="grid h-11 w-11 place-items-center rounded-full border border-soul-line transition-all duration-300 hover:-translate-y-1 hover:border-soul-cyan hover:bg-soul-soft hover:shadow-card"
          href={member.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`GitHub de ${member.name}`}
        >
          {/* Ícone do GitHub */}
          <i
            className="fa-brands fa-github fa-xl text-soul-ink"
            aria-hidden="true"
          />
        </a>

        {/* Link para o LinkedIn */}
        <a
          className="grid h-11 w-11 place-items-center rounded-full border border-soul-line transition-all duration-300 hover:-translate-y-1 hover:border-soul-cyan hover:bg-soul-soft hover:shadow-card"
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`LinkedIn de ${member.name}`}
        >
          {/* Ícone do LinkedIn */}
          <i
            className="fa-brands fa-square-linkedin fa-xl text-soul-blue"
            aria-hidden="true"
          />
        </a>

      </div>
    </article>
  );
}