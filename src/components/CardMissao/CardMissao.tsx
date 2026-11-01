import useProgresso from "../../hooks/useProgresso";
import type { Missao } from "../../types/app";

export default function CardMissao({ missao }: { missao: Missao }) {
    const { concluir, ocupado } = useProgresso();
    const corDaFaixa = missao.concluida ? "bg-emerald-500" : "bg-amber-400";
    return (
        <article className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-soul-line bg-white p-6 pl-7 sm:flex-row sm:items-center">

            <span className={`absolute left-0 top-0 h-full w-1.5 ${corDaFaixa}`} aria-hidden="true" />

            <div className="min-w-0">
                <h3 className="break-words text-lg font-extrabold text-soul-ink">{missao.titulo}</h3>
                {missao.descricao && <p className="mt-2 max-w-xl break-words text-sm">{missao.descricao}</p>}
                <p className="mt-3 text-sm font-bold text-soul-purple">+{missao.recompensa} moedas</p>
            </div>
            {missao.concluida ? (
                <p className="shrink-0 rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-bold text-emerald-600">✓ Concluída</p>
            ) : (
                <button type="button" className="botao-secundario shrink-0" disabled={ocupado} onClick={() => void concluir(missao)}>Concluir missão</button>
            )}
        </article>
    );
}