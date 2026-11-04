import { Link, Navigate, useParams } from "react-router-dom";
import Carregando from "../../components/Carregando/Carregando";
import ImagemAcessorio from "../../components/ImagemAcessorio/ImagemAcessorio";
import { buscarAcessorio } from "../../data/api";
import useDetalhe from "../../hooks/useDetalhe";

// Consulta o acessório na API; as compras continuam na loja.
export default function AcessorioDetalhe() {
    const { id } = useParams<{ id: string }>();
    const estado = useDetalhe(id, buscarAcessorio);

    if (estado.status === "carregando") return <Carregando />;
    if (estado.status === "vazio") {
        return <Navigate to="/app/loja" replace state={{ avisoDetalhe: "Esse acessório não foi encontrado. Escolha outro na loja." }} />;
    }
    if (estado.status === "erro") {
        return (
            <section className="rounded-2xl border border-soul-line bg-white p-6">
                <h1 className="text-2xl font-extrabold text-soul-ink">Não conseguimos abrir o acessório</h1>
                <p role="alert" className="mt-3">{estado.mensagem}</p>
                <Link className="botao-secundario mt-5" to="/app/loja">Voltar para a loja</Link>
            </section>
        );
    }

    const acessorio = estado.dados;
    return (
        <>
            <Link className="botao-secundario mb-6" to="/app/loja">Voltar para a loja</Link>
            <article className="grid gap-6 rounded-2xl border border-soul-line bg-white p-6 sm:grid-cols-2 sm:items-center sm:p-8">
                <div className="h-56 rounded-xl bg-soul-soft p-4 sm:h-72"><ImagemAcessorio acessorio={acessorio} /></div>
                <div className="min-w-0">
                    <p className="break-words text-sm font-bold text-soul-purple">{acessorio.tipo} · {acessorio.raridade}</p>
                    <h1 className="mt-2 break-words text-3xl font-extrabold text-soul-ink">{acessorio.nome}</h1>
                    <p className="mt-6 font-extrabold text-soul-purple">Preço: {acessorio.preco} moedas</p>
                </div>
            </article>
        </>
    );
}
