import { Link } from "react-router-dom";
import { navigationItems } from "../../data/navigation";

export function Footer() {
  return (
    <footer className="footer">

      {/* Conteúdo principal do rodapé */}
      <div className="container footer-content">

        {/* Parte da marca e descrição do projeto */}
        <div className="footer-brand">

          {/* Link que leva de volta para a Home */}
          <Link to="/" aria-label="Voltar para o início">
            SoulAI
          </Link>

          {/* Pequena descrição do projeto */}
          <p className="footer-text">
            SoulAI é o avatar inteligente criado para deixar a experiência na
            SoulUp mais interativa, leve e conectada com ações sustentáveis.
          </p>

        </div>

        {/* Links das páginas do site */}
        <nav
          className="footer-links"
          aria-label="Links do rodapé"
        >
          <h2 className="footer-title">
            Páginas
          </h2>

          {/* Cria um link para cada item do navigation.ts */}
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Informações de contato */}
        <div className="footer-contato">

          <h2 className="footer-title">
            Contato
          </h2>

          {/* Link para enviar e-mail */}
          <a
            href="mailto:contato@soulai.com?subject=Contato%20pelo%20site"
            aria-label="Enviar e-mail para contato da SoulAI"
          >
            contato@soulai.com
          </a>

          {/* Localização */}
          <p>
            São Paulo/SP
          </p>

        </div>

      </div>

      {/* Informação sobre acessibilidade */}
      <p className="footer-acessibilidade">
        Site pensado para acessibilidade, usando aria-label. Qualquer erro,{" "}
        <Link to="/contato">
          entre em contato
        </Link>.
      </p>

      {/* Parte inferior do rodapé */}
      <div className="footer-bottom">
        &copy; SoulAI - Projeto acadêmico FIAP Challenge 2026. Todos os direitos
        reservados.
      </div>

    </footer>
  );
}