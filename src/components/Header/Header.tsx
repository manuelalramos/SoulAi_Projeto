import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSoulup from "../../assets/media/logo-soulup.png";
import { NavMenu } from "../NavMenu/NavMenu";
export function Header() {
  // Guarda se o menu mobile está aberto.
  const [menuAberto, setMenuAberto] = useState(false);
  // Guarda se a página já foi rolada mais de 30 pixels.
  const [paginaRolada, setPaginaRolada] = useState(false);
  // Permite descobrir em qual rota o usuário está.
  const location = useLocation();
  const estaNaHome = location.pathname === "/";
  // Sempre que a rota muda, o menu mobile fecha.
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);
  // Observa o scroll para mudar o fundo do Header na Home.
  useEffect(() => {
    function verificarScroll() {
      if (window.scrollY > 30) {
        setPaginaRolada(true);
      } else {
        setPaginaRolada(false);
      }
    }
    verificarScroll();
    window.addEventListener("scroll", verificarScroll);
    return () => {
      window.removeEventListener("scroll", verificarScroll);
    };
  }, []);
  let headerClass =
    "top-0 z-30 w-full text-white transition duration-300";
  if (estaNaHome) {
    headerClass +=
      " fixed left-0 bg-gradient-to-b from-soul-ink/30 to-transparent shadow-none";
  } else {
    headerClass += " sticky bg-soul-gradient shadow-header";
  }
  if (estaNaHome && paginaRolada) {
    headerClass =
      "fixed left-0 top-0 z-30 w-full border-b border-white/20 bg-[#262aa0]/75 text-white shadow-header backdrop-blur-2xl transition duration - 300";
  }
  return (
    <header className={headerClass}>
      <nav
        className="relative mx-auto flex min-h-16 w-[92%] max-w-[1180px] items-center justify-center gap-5 lg:min-h-[82px]"
        aria-label="Menu principal"
      >
        <Link
          className="absolute left-0"
          to="/"
          aria-label="Voltar para o início"
        >
          <img
            className="w-[105px] drop-shadow-md sm:w-[120px]"
            src={logoSoulup}
            alt="Logo SoulUp"
          />
        </Link>
        <button
          className="absolute right-0 grid h-11 w-11 place-items-center rounded-lg border border-white/25 bg-white/15
text-white transition hover:-translate-y-px hover:bg-white/25 lg:hidden"
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <i className="fa-solid fa-bars-staggered text-xl" aria-hidden="true" />
        </button>
        <NavMenu
          menuAberto={menuAberto}
          fecharMenu={() => setMenuAberto(false)}
        />
      </nav>
    </header>
  );
}