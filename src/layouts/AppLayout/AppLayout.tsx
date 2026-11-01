import { NavLink, Outlet } from "react-router-dom";
import Carregando from "../../components/Carregando/Carregando";
import useProgresso from "../../hooks/useProgresso";

// Atalhos para as telas da área do usuário.
const paginas = [
    { caminho: "/app", nome: "Início" },
    { caminho: "/app/missoes", nome: "Missões" },
    { caminho: "/app/loja", nome: "Loja" },
    { caminho: "/app/avatar", nome: "Avatar" },
    { caminho: "/app/perfil", nome: "Perfil" },
];

// Layout que reúne saldo, navegação e avisos da área logada.
export default function AppLayout() {
    const { dados, carregando, ocupado, erro, erroAcao, aviso, atualizar, limparAvisos } = useProgresso();

    return (
        <div className="min-h-screen bg-soul-soft pb-28 pt-24 md:pt-28">
            <div className="mx-auto w-[92%] max-w-[1080px]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-soul-line pb-5">
                    <p className="text-lg font-extrabold text-soul-ink">Meu SoulAI</p>
                    {dados && !erro && <p className="inline-flex items-center gap-2 rounded-full bg-soul-yellow/40 px-4 py-2 text-sm font-extrabold text-soul-ink" aria-label={`Saldo: ${dados.usuario.moedas} moedas`}><span aria-hidden="true">🪙</span>{dados.usuario.moedas} moedas</p>}
                </div>

                {/* Destaca a página atual e anima os atalhos ao passar o mouse. */}
                <nav aria-label="Área do usuário" className="my-6 flex gap-1 overflow-x-auto py-2">
                    {paginas.map((pagina) => (
                        <NavLink key={pagina.caminho} to={pagina.caminho} end={pagina.caminho === "/app"} onClick={limparAvisos}
                            className={({ isActive }) => `shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul-purple focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none sm:px-5 ${isActive ? "border-soul-blue bg-soul-blue text-white shadow-card hover:bg-soul-purple" : "border-transparent text-soul-text hover:border-soul-cyan/40 hover:bg-white hover:text-soul-blue"}`}>
                            {pagina.nome}
                        </NavLink>
                    ))}
                </nav>
                
                {aviso && <p role="status" className="mb-5 rounded-xl border border-soul-cyan/30 bg-white p-4 text-sm text-soul-blue">{aviso}</p>}
                {erroAcao && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{erroAcao}</p>}
                {carregando ? <Carregando /> : erro ? (
                    <div className="rounded-2xl border border-soul-line bg-white p-6">
                        <p role="alert">{erro}</p>
                        <button className="botao-secundario mt-4" type="button" onClick={() => void atualizar()}>Tentar novamente</button>
                    </div>
                ) : <Outlet />}
                {ocupado && !carregando && <Carregando />}
            </div>
        </div>
    );
}
