import { Link, Navigate, useParams } from "react-router-dom";
import Carregando from "../../components/Carregando/Carregando";
import { buscarMissao } from "../../data/api";
import useDetalhe from "../../hooks/useDetalhe";

// Mostra a missão consultada pelo id, sem mexer na conclusão da lista.
export default function MissaoDetalhe() {
    const { id } = useParams<{ id: string }>();
    const estado = useDetalhe(id, buscarMissao);

    if (estado.status === "carregando") return <Carregando />;
    if (estado.status === "vazio") {
        return <Navigate to="/app/missoes" replace state={{ avisoDetalhe: "Essa missão não foi encontrada. Escolha outra na lista." }} />;
    }
    if (estado.status === "erro") {
        return (
            <section className="rounded-2xl border border-soul-line bg-white p-6">
                <h1 className="text-2xl font-extrabold text-soul-ink">Não conseguimos abrir a missão</h1>
                <p role="alert" className="mt-3">{estado.mensagem}</p>
                <Link className="botao-secundario mt-5" to="/app/missoes">Voltar para as missões</Link>
            </section>
        );
    }

    const missao = estado.dados;
    return (
        <>
            <Link className="botao-secundario mb-6" to="/app/missoes">Voltar para as missões</Link>
            <article className="rounded-2xl border border-soul-line bg-white p-6 sm:p-8">
                <p className="text-sm font-bold text-soul-purple">Detalhes da missão · {missao.ativa ? "Ativa" : "Inativa"}</p>
                <h1 className="mt-2 break-words text-3xl font-extrabold text-soul-ink">{missao.titulo}</h1>
                <p className="mt-4 whitespace-pre-line break-words leading-relaxed">{missao.descricao || "Essa missão ainda não tem uma descrição."}</p>
                <p className="mt-6 font-extrabold text-soul-purple">Recompensa: {missao.recompensa} moedas</p>
            </article>
        </>
    );
}
