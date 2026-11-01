import { Link } from "react-router-dom";
import CardMissao from "../../components/CardMissao/CardMissao";
import fogoAnimado from "../../assets/media/fogo.png";
import useProgresso from "../../hooks/useProgresso";

// Página inicial com o foguinho e as próximas missões do usuário.
export default function Dashboard() {
    const { dados } = useProgresso();
    if (!dados) return null;
    const { usuario, missoes } = dados;
    const concluidas = missoes.filter((missao) => missao.concluida).length;
    // A energia representa a proporção de missões ativas já concluídas.
    const energia = missoes.length ? Math.round(concluidas / missoes.length * 100) : 0;
    const missoesDoDia = missoes.filter((missao) => !missao.concluida).slice(0, 3);

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink sm:text-4xl">Olá, {usuario.nome.split(" ")[0]}!</h1>
            <p className="mt-2">Uma pequena ação já faz diferença no seu dia.</p>
            <section aria-label="Seu foguinho" className="my-8 flex flex-col items-center gap-6 rounded-2xl border border-soul-line bg-white p-6 shadow-card sm:flex-row sm:gap-10 sm:p-8">
                {/* Reaproveita o foguinho animado da seção de engajamento. */}
                <div className="grid h-52 w-52 shrink-0 place-items-center rounded-full bg-gradient-to-br from-soul-yellow to-[#fff5bd] shadow-card sm:h-60 sm:w-60">
                    <img className="h-28 w-28 object-contain [filter:brightness(0)_saturate(100%)_invert(27%)_sepia(74%)_saturate(2441%)_hue-rotate(226deg)_brightness(80%)_contrast(93%)] sm:h-32 sm:w-32" src={fogoAnimado} alt="Seu foguinho SoulAI" />
                </div>
                <div className="w-full min-w-0 max-w-lg">
                    <p className="text-sm font-bold text-soul-purple">Seu foguinho</p>
                    <h2 className="mt-1 text-2xl font-extrabold text-soul-ink">Nível {usuario.nivel}</h2>
                    <div className="mb-2 mt-5 flex justify-between text-sm font-bold"><span>Energia</span><span>{energia}%</span></div>
                    <div role="progressbar" aria-label="Energia das missões" aria-valuemin={0} aria-valuemax={100} aria-valuenow={energia} className="h-3 overflow-hidden rounded-full bg-soul-soft">
                        <div className="h-full rounded-full bg-soul-gradient transition-all duration-500" style={{ width: `${energia}%` }} />
                    </div>
                    <p className="mt-3 text-xs">{concluidas} de {missoes.length} missões ativas concluídas.</p>
                </div>
            </section>
            <section aria-labelledby="missoes-do-dia">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 id="missoes-do-dia" className="text-xl font-extrabold text-soul-ink">Missões do dia</h2>
                    <Link to="/app/missoes" className="text-sm font-bold text-soul-blue hover:underline">Ver todas</Link>
                </div>
                <div className="grid gap-4">
                    {missoesDoDia.map((missao) => <CardMissao key={missao.id} missao={missao} />)}
                    {missoesDoDia.length === 0 && <p className="rounded-2xl border border-soul-line bg-white p-6">{missoes.length ? "Tudo concluído por aqui. Bom trabalho!" : "As próximas missões chegam em breve."}</p>}
                </div>
            </section>
        </>
    );
}

