import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSoulup from "../../assets/media/logo-soulup.png";
import { NavMenu } from "../NavMenu/NavMenu";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [paginaRolada, setPaginaRolada] = useState(false);

  const location = useLocation();
  const estaNaHome = location.pathname === "/";

  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  useEffect(() => {
    function verificarScroll() {
      setPaginaRolada(window.scrollY > 30);
    }

    verificarScroll();
    window.addEventListener("scroll", verificarScroll);

    return () => {
      window.removeEventListener("scroll", verificarScroll);
    };
  }, []);

  const headerClass = estaNaHome
    ? paginaRolada
      ? "fixed left-0 top-0 z-30 w-full bg-[#262aa0]/75 text-white shadow-header backdrop-blur-2xl transition-all duration-300"
      : "fixed left-0 top-0 z-30 w-full bg-gradient-to-b from-soul-ink/30 to-transparent text-white transition-all duration-300"
    : "sticky top-0 z-30 w-full bg-soul-gradient text-white shadow-header transition-all duration-300";

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
          className="absolute right-0 grid h-11 w-11 place-items-center rounded-lg border border-white/25 bg-white/15 text-white transition duration-300 hover:-translate-y-1 hover:bg-white/25 lg:hidden"
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
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