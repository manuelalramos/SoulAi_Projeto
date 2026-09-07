import { Link } from "react-router-dom";
import logoSoulup from "../../assets/media/logo-soulup.png";
import { navigationItems } from "../../data/navigation";
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#161733,#202260_48%,#3438c8)] pt-14
text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:lineargradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
[background-size:48px_48px]" />
      <div className="relative mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 gap-8 md:grid-cols-3 md:[grid-templatecolumns:1.4fr_1fr_1fr]">
        <div className="max-w-[340px]">
          <Link to="/" aria-label="Voltar para o início">
            <img className="w-[110px]" src={logoSoulup} alt="Logo SoulUp" />
          </Link>
          <p className="mt-3 text-white/80">
            SoulAI é o avatar inteligente criado para deixar a experiência na
            SoulUp mais interativa, leve e conectada com ações sustentáveis.
          </p>
        </div>
        <nav className="flex flex-col items-start gap-2" aria-label="Links do rodapé">
          <h2 className="mb-1 font-bold text-soul-yellow">Páginas</h2>
          {navigationItems.map((item) => (
            <Link
              className="text-white/80 transition hover:translate-x-1 hover:text-soul-cyan"
              key={item.path}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-2">
          <h2 className="mb-1 font-bold text-soul-yellow">Contato</h2>
          <a
            className="inline-flex items-center text-white/80 transition hover:translate-x-1 hover:text-soul-cyan"
            href="mailto:contato@soulai.com?subject=Contato%20pelo%20site"
            aria-label="Enviar e-mail para contato da SoulAI"
          >
            <i className="fa-solid fa-envelope mr-2 text-soul-yellow" aria-hidden="true" />
            contato@soulai.com
          </a>
          <p className="text-white/80">
            <i className="fa-solid fa-location-dot mr-2 text-soul-yellow" aria-hidden="true" />
            São Paulo/SP
          </p>
        </div>
      </div>
      <p className="relative mt-8 px-5 text-center text-white/80">
        <i className="fa-solid fa-ear-listen mr-2 text-soul-yellow" aria-hidden="true" />
        Site pensado para acessibilidade, usando aria-label. Qualquer erro,{" "}
        <Link className="font-extrabold text-soul-yellow hover:text-soul-cyan" to="/contato">
          entre em contato
        </Link>
        .
      </p>
      <div className="relative w-full p-4 text-center text-sm text-soul-soft/55">
        &copy; SoulAI - Projeto acadêmico FIAP Challenge 2026. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}