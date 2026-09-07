import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { navigationItems } from "../../data/navigation";

// Imagem da logo
import logoSoulup from "../../assets/media/logo-soulup.png";

export function Header() {
  // Controla se o menu mobile está aberto ou fechado
  const [menuAberto, setMenuAberto] = useState(false);

  // Controla se a página foi rolada
  const [paginaRolada, setPaginaRolada] = useState(false);

  // Pega a página atual
  const location = useLocation();

  // Verifica se a página atual é a Home
  const estaNaHome = location.pathname === "/";

  // Fecha o menu mobile sempre que trocar de página
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  // Verifica o scroll da página
  useEffect(() => {
    function verificarScroll() {
      if (window.scrollY > 30) {
        setPaginaRolada(true);
      } else {
        setPaginaRolada(false);
      }
    }

    // Faz a primeira verificação
    verificarScroll();

    // Observa quando o usuário rolar a página
    window.addEventListener("scroll", verificarScroll);

    // Remove o evento quando o componente sair da tela
    return () => {
      window.removeEventListener("scroll", verificarScroll);
    };
  }, []);

  // Classe padrão do Header
  let classeHeader = "site-header";

  // Adiciona uma classe diferente quando estiver na Home
  if (estaNaHome) {
    classeHeader += " home-header";
  }

  // Adiciona a classe scrolled quando rolar a Home
  if (estaNaHome && paginaRolada) {
    classeHeader += " scrolled";
  }

  return (
    <header className={classeHeader}>
      <nav
        className="navbar container"
        aria-label="Menu principal"
      >

        {/* Logo que leva para a Home */}
        <Link
          className="logo"
          to="/"
          aria-label="Voltar para o início"
        >
          <img
            src={logoSoulup}
            alt="Logo SoulUp"
          />
        </Link>

        {/* Botão do menu mobile */}
        <button
          className="botao-menu"
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <i
            className="fa-solid fa-bars-staggered"
            aria-hidden="true"
          />
        </button>

        {/* Menu de navegação */}
        <ul className={`nav-links ${menuAberto ? "show" : ""}`}>
          <li className="nav-a-container">

            {/* Percorre os itens do navigation.ts */}
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}

                // Faz a Home ficar ativa apenas na rota "/"
                end={item.path === "/"}

                // Adiciona a classe active na página atual
                className={({ isActive }) => {
                  if (isActive) {
                    return "active";
                  }

                  return "";
                }}
              >
                {item.label}
              </NavLink>
            ))}

          </li>
        </ul>

      </nav>
    </header>
  );
}