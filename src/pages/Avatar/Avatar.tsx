import { Link } from "react-router-dom";
import ImagemAcessorio from "../../components/ImagemAcessorio/ImagemAcessorio";
import { avatarBase } from "../../data/avatar";
import useProgresso from "../../hooks/useProgresso";
import type { ItemInventario } from "../../types/app";

// Página que mostra o avatar e permite escolher os acessórios equipados.
export default function Avatar() {
    const { dados, ocupado, trocarEquipamento } = useProgresso();
    if (!dados) return null;
    const equipados = dados.inventario.filter((item) => item.equipado);
    // Divide os acessórios entre os dois lados do foguinho.
    const esquerda = equipados.filter((_, indice) => indice % 2 === 0);
    const direita = equipados.filter((_, indice) => indice % 2 !== 0);

    function mostrarBalao(item: ItemInventario) {
        return (
            <div key={item.acessorio.id} className="balao-avatar">
                <div className="grid h-[72px] w-[72px] animate-message-enter place-items-center rounded-full border border-soul-cyan/40 bg-soul-cyan/10 p-2 shadow-sm backdrop-blur-sm motion-reduce:animate-none sm:h-24 sm:w-24" title={item.acessorio.nome}>

                    <ImagemAcessorio acessorio={item.acessorio} />

                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Seu avatar</h1>

            <p className="mt-2">Cada acessório conta um pouco da sua jornada.</p>

            <section aria-label="Avatar com acessórios equipados" className="my-8 rounded-2xl border border-soul-line bg-white px-3 py-8 sm:px-8">

                <div className="mx-auto grid max-w-[560px] grid-cols-[72px_minmax(0,1fr)_72px] items-center gap-2 sm:grid-cols-[96px_minmax(0,1fr)_96px] sm:gap-6">
                    <div className="grid justify-items-center gap-6">{esquerda.map(mostrarBalao)}</div>
                    <div className="relative isolate grid place-items-center py-6">
                        <div className="absolute bottom-5 -z-10 h-5 w-3/4 rounded-full bg-soul-cyan/30 blur-xl" aria-hidden="true" />

                        <img className="w-full max-w-[260px] object-contain drop-shadow-lg" src={avatarBase} alt={dados.avatar?.nome || "Seu foguinho SoulAI"} />

                    </div>
                    <div className="grid justify-items-center gap-6">{direita.map(mostrarBalao)}</div>
                </div>

                <p className="mt-4 text-center text-sm font-bold text-soul-blue">{equipados.length ? `${equipados.length} ${equipados.length === 1 ? "acessório equipado" : "acessórios equipados"}` : "Seu foguinho está pronto para começar."}</p>

            </section>
            <section aria-labelledby="inventario">

                <h2 id="inventario" className="text-xl font-extrabold text-soul-ink">Seu inventário</h2>
                <p className="mb-5 mt-2 text-sm">Você pode equipar um acessório de cada tipo. Ao trocar, o anterior é desequipado.</p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {dados.inventario.map((item) => (
                        <article key={item.acessorio.id} className={`flex flex-col rounded-2xl border bg-white p-5 ${item.equipado ? "border-soul-cyan" : "border-soul-line"}`}>

                            <div className="mb-4 grid h-28 place-items-center rounded-xl bg-soul-soft p-3"><ImagemAcessorio acessorio={item.acessorio} /></div>
                            <p className="text-xs text-soul-purple">{item.acessorio.tipo}</p>

                            <h3 className="mb-5 mt-1 break-words font-extrabold text-soul-ink">{item.acessorio.nome}</h3>
                            <button type="button" disabled={ocupado} aria-pressed={item.equipado} className="botao-secundario mt-auto" onClick={() => void trocarEquipamento(item)}>
                                {item.equipado ? "Desequipar" : "Equipar"}
                                
                            </button>
                        </article>
                    ))}
                </div>
                {dados.inventario.length === 0 && <div className="rounded-2xl border border-soul-line bg-white p-6"><p>Você ainda não tem acessórios. Complete missões para juntar moedas.</p><Link className="botao-secundario mt-4" to="/app/loja">Conhecer a loja</Link></div>}
            </section>
        </>
    );
}
