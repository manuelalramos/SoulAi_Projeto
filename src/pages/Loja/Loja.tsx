import { Link, useLocation } from "react-router-dom";
import ImagemAcessorio from "../../components/ImagemAcessorio/ImagemAcessorio";
import useProgresso from "../../hooks/useProgresso";

// Página que mostra os acessórios e as opções de compra com moedas.
export default function Loja() {
    const { dados, comprar, ocupado } = useProgresso();
    const { state } = useLocation();
    // O detalhe avisa quando o acessório já não está disponível.
    const aviso = typeof state?.avisoDetalhe === "string" ? state.avisoDetalhe : "";
    if (!dados) return null;

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Loja do SoulAI</h1>
            <p className="mb-8 mt-2">Troque suas moedas por acessórios para deixar o foguinho com a sua cara.</p>
            {aviso && <p role="status" className="mb-5 rounded-xl border border-soul-cyan/30 bg-white p-4 text-sm text-soul-blue">{aviso}</p>}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {dados.acessorios.map((acessorio) => {
                    // O botão muda conforme o inventário e o saldo da pessoa.
                    const adquirido = dados.inventario.some((item) => item.acessorio.id === acessorio.id);
                    const semSaldo = dados.usuario.moedas < acessorio.preco;

                    return (
                        <article key={acessorio.id} className="flex flex-col rounded-2xl border border-soul-line bg-white p-5">
                            <div className="mb-5 grid h-40 place-items-center rounded-xl bg-soul-soft p-4" aria-label="Lista de acessórios da loja"><ImagemAcessorio acessorio={acessorio} /></div>
                            <p className="inline-block rounded-full bg-soul-soft px-3 py-1 text-xs font-bold text-soul-purple">{acessorio.tipo} · {acessorio.raridade}</p>
                            <h2 className="mt-2 break-words text-lg font-extrabold text-soul-ink">{acessorio.nome}</h2>
                            <p className="mb-5 mt-2 text-sm font-bold">{acessorio.preco} moedas</p>
                            <Link className="mb-4 self-start rounded text-sm font-bold text-soul-blue underline underline-offset-4 hover:text-soul-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul-purple" to={`/app/loja/${acessorio.id}`} aria-label={`Ver detalhes de ${acessorio.nome}`}>Ver detalhes</Link>
                            {adquirido ? <Link className="botao-secundario mt-auto" to="/app/avatar">Adquirido · ver no avatar</Link> : (

                                <button className="botao-app mt-auto" type="button" disabled={ocupado || semSaldo} onClick={() => void comprar(acessorio)}>
                                    {semSaldo ? "Moedas insuficientes" : "Comprar"}
                                </button>

                            )}
                        </article>
                    );
                })}
            </div>
            
            {dados.acessorios.length === 0 && <p className="rounded-2xl border border-soul-line bg-white p-6">A loja está sendo preparada. Em breve novos acessórios para o seu foguinho!</p>}
        </>
    );
}
