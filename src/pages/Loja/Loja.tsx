import { Link } from "react-router-dom";
import ImagemAcessorio from "../../components/ImagemAcessorio/ImagemAcessorio";
import useProgresso from "../../hooks/useProgresso";

export default function Loja() {
    const { dados, comprar, ocupado } = useProgresso();
    if (!dados) return null;

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Loja do SoulAI</h1>
            <p className="mb-8 mt-2">Troque suas moedas por acessórios para deixar o foguinho com a sua cara.</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {dados.acessorios.map((acessorio) => {
                    const adquirido = dados.inventario.some((item) => item.acessorio.id === acessorio.id);
                    const semSaldo = dados.usuario.moedas < acessorio.preco;

                    return (
                        <article key={acessorio.id} className="flex flex-col rounded-2xl border border-soul-line bg-white p-5">
                            <div className="mb-5 grid h-40 place-items-center rounded-xl bg-soul-soft p-4"><ImagemAcessorio acessorio={acessorio} /></div>
                            <p className="text-xs font-bold text-soul-purple">{acessorio.tipo} · {acessorio.raridade}</p>
                            <h2 className="mt-2 break-words text-lg font-extrabold text-soul-ink">{acessorio.nome}</h2>
                            <p className="mb-5 mt-2 text-sm font-bold">{acessorio.preco} moedas</p>
                            {adquirido ? <Link className="botao-secundario mt-auto" to="/app/avatar">Adquirido · ver no avatar</Link> : (

                                <button className="botao-app mt-auto" type="button" disabled={ocupado || semSaldo} onClick={() => void comprar(acessorio)}>
                                    {semSaldo ? "Moedas insuficientes" : "Comprar"}
                                </button>

                            )}
                        </article>
                    );
                })}
            </div>
            
            {dados.acessorios.length === 0 && <p className="rounded-2xl border border-soul-line bg-white p-6">A loja ainda não tem acessórios. Volte em breve!</p>}
        </>
    );
}
