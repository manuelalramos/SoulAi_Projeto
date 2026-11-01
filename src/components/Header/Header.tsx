import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSoulup from "../../assets/media/logo-soulup.png";
import NavMenu from "../NavMenu/NavMenu";
import useSessao from "../../hooks/useSessao";
import FotoPerfil from "../FotoPerfil/FotoPerfil";

// Header fixo responsável pela logo, menu principal e menu mobile.
export default function Header() {
    // Controla o menu mobile.
    const [menuAberto, setMenuAberto] = useState(false);
    // Controla a mudança visual do Header depois do scroll.
    const [paginaRolada, setPaginaRolada] = useState(false);
    // Usamos a rota somente para fechar o menu quando a navegação muda.
    const location = useLocation();
    const { sessao, sair } = useSessao();
    const areaLogada = location.pathname === "/admin" || location.pathname.startsWith("/admin/") || location.pathname === "/app" || location.pathname.startsWith("/app/");
    const acesso = location.pathname === "/login" || location.pathname === "/cadastro";

    const [caminhoAnterior, setCaminhoAnterior] = useState(location.pathname);

    if (location.pathname !== caminhoAnterior) {
        setCaminhoAnterior(location.pathname);
        setMenuAberto(false);
    }
    
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
    // O mesmo comportamento visual vale para Home e páginas internas.
    const headerClass = paginaRolada || areaLogada || acesso
        ? "fixed left-0 top-0 z-30 w-full bg-[#262aa0]/75 text-white shadow-header backdrop-blur-2xl transition-all duration-300"
        : "fixed left-0 top-0 z-30 w-full bg-gradient-to-b from-soul-ink/30 to-transparent text-white transition-all duration-300";
    return (
        <header className={headerClass}>
            <nav
                className="relative mx-auto flex min-h-16 w-[92%] max-w-[1180px] items-center justify-center gap-5 lg:min-h-[82px]"
                aria-label="Menu principal"
            >
                {/* Logo funciona como atalho para voltar para a Home. */}
                <Link
                    className="absolute left-0"
                    to="/"
                    aria-label="Voltar para o início"
                >
                    <img
                        className={`${areaLogada ? "w-[80px]" : "w-[105px]"} drop-shadow-md sm:w-[120px]`}
                        src={logoSoulup}
                        alt="Logo SoulUp"
                    />
                </Link>
                {/* Botão exibido no mobile para abrir ou fechar a navegação. */}
                {!areaLogada && <button
                    className="absolute right-0 grid h-11 w-11 place-items-center rounded-lg border border-white/25 bg-white/20 text-white transition duration-300 hover:-translate-y-1 hover:bg-white/25 lg:hidden"
                    aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuAberto}
                    onClick={() => setMenuAberto((aberto) => !aberto)}
                >
                    <i className="fa-solid fa-bars-staggered text-xl" aria-hidden="true" />
                </button>}
                {!areaLogada && <NavMenu
                    menuAberto={menuAberto}
                    fecharMenu={() => setMenuAberto(false)}
                />}
                {areaLogada ? (
                    <div className="ml-auto flex items-center gap-2 text-xs font-bold sm:gap-4 sm:text-sm">
                        {sessao?.tipo === "administrador" && <span className="hidden rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold sm:block">ADMIN</span>}
                        <Link to="/" className="rounded-full px-1 py-2 hover:bg-white/10 sm:px-2">Voltar ao site</Link>
                        {sessao?.tipo === "usuario" && (
                            <Link to="/app/perfil" aria-label="Ver seu perfil" className="rounded-full transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                                <FotoPerfil fotoUrl={sessao.pessoa.fotoUrl} nome={sessao.pessoa.nome} />
                            </Link>
                        )}
                        <button type="button" onClick={sair} className="rounded-full border border-white/30 px-3 py-2 hover:bg-white/10 sm:px-4">Sair</button>
                    </div>
                ) : (
                    sessao?.tipo === "usuario" ? (
                        <Link to="/app/perfil" aria-label="Ver seu perfil" className="absolute right-14 rounded-full transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:right-0">
                            <FotoPerfil fotoUrl={sessao.pessoa.fotoUrl} nome={sessao.pessoa.nome} />
                        </Link>
                    ) : (
                        <Link to={sessao ? "/admin" : "/login"} className="absolute right-14 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-soul-blue transition hover:bg-soul-yellow lg:right-0">
                            {sessao ? "ADMIN" : "Entrar"}
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
}
