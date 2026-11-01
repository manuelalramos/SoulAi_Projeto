import useProgresso from "../../hooks/useProgresso";
import useSessao from "../../hooks/useSessao";
import { Link } from "react-router-dom";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";

export default function Perfil() {
    const { dados, limparAvisos } = useProgresso();
    const { sair } = useSessao();
    if (!dados) return null;

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Seu perfil</h1>
            <p className="mb-8 mt-2">Seus dados e o caminho que você já percorreu.</p>

            <section className="max-w-2xl rounded-2xl border border-soul-line bg-white p-6 shadow-card sm:p-8" aria-label="Dados da conta">

                <div className="mb-7"><FotoPerfil fotoUrl={dados.usuario.fotoUrl} nome={dados.usuario.nome} grande /></div>
                <dl>
                    <dt className="text-sm text-soul-text">Nome</dt>
                    <dd className="mt-1 break-words text-xl font-extrabold text-soul-ink">{dados.usuario.nome}</dd>
                    <dt className="mt-5 text-sm text-soul-text">E-mail</dt>
                    <dd className="mt-1 break-all font-bold text-soul-ink">{dados.usuario.email}</dd>
                </dl>

                <dl className="my-8 grid grid-cols-1 gap-5 border-y border-soul-line py-6 sm:grid-cols-3">
                    <div><dt className="text-sm">Moedas</dt><dd className="mt-1 text-2xl font-extrabold text-soul-blue">{dados.usuario.moedas}</dd></div>
                    <div><dt className="text-sm">Nível</dt><dd className="mt-1 text-2xl font-extrabold text-soul-blue">{dados.usuario.nivel}</dd></div>
                    <div><dt className="text-sm">Missões concluídas</dt><dd className="mt-1 text-2xl font-extrabold text-soul-blue">{dados.totalConcluidas}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-3">
                    <Link to="/app/perfil/editar" className="botao-app" onClick={limparAvisos}>Editar perfil</Link>
                    <button type="button" onClick={sair} className="botao-secundario">Sair da conta</button>
                </div>
                
            </section>
        </>
    );
}
