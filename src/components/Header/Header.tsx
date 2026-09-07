import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation";

export function Header() {
  // Guarda se o menu mobile está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

      {/* Parte principal do header */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">

        {/* Logo / nome do site que volta para a Home */}
        <NavLink to="/" className="text-xl font-bold">
          SoulAI
        </NavLink>

        {/* Botão que aparece apenas no mobile */}
        <button
          type="button"
          className="rounded-lg border px-3 py-2 md:hidden"

          // Abre o menu se estiver fechado e fecha se estiver aberto
          onClick={() => setMenuOpen(!menuOpen)}

          // Informa para acessibilidade se o menu está aberto
          aria-expanded={menuOpen}
          aria-label="Abrir menu de navegação"
        >
          Menu
        </button>

        {/* Menu de navegação para tablet/desktop */}
        <nav
          className="hidden gap-5 md:flex"
          aria-label="Navegação principal"
        >
          {/* Percorre os itens do navigation.ts e cria um link para cada um */}
          {navigationItems.map((item) => (
            <NavLink
              // O React precisa de uma key única para cada item da lista
              key={item.path}

              // Define para qual página o link vai
              to={item.path}

              // Muda o estilo quando o link representa a página atual
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-violet-700"
                  : "text-slate-700 hover:text-violet-700"
              }
            >
              {/* Mostra o nome do link */}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Só mostra esse menu quando menuOpen for true */}
      {menuOpen && (
        <nav
          className="border-t bg-white px-4 py-3 md:hidden"
          aria-label="Navegação mobile"
        >
          <div className="flex flex-col gap-3">

            {/* Cria novamente os links, agora para o menu mobile */}
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}

                // Fecha o menu depois que o usuário escolhe uma página
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

          </div>
        </nav>
      )}
    </header>
  );
}