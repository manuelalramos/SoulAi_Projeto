import { useState } from "react";
import { Link } from "react-router-dom";
import CardMissao from "../../components/CardMissao/CardMissao";
import fogoAnimado from "../../assets/media/fogo.png";
import useProgresso from "../../hooks/useProgresso";

// Página inicial com o foguinho e as próximas missões do usuário.
export default function Dashboard() {
    const { dados } = useProgresso();
    // Guarda só a confirmação visual da simulação, sem mexer nas moedas.
    const [resgatado, setResgatado] = useState(false);
    if (!dados) return null;
    const { usuario, missoes, ofensiva } = dados;
    const desconto = usuario.moedas * 0.10;
    const concluidas = missoes.filter((missao) => missao.concluida).length;
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
                    <h2 className="mt-1 text-2xl font-extrabold text-soul-ink">Nível {ofensiva.nivel}</h2>
                    <div className="mb-2 mt-5 flex justify-between text-sm font-bold"><span>Energia</span><span>{ofensiva.energia}%</span></div>
                    <div role="progressbar" aria-label="Energia das missões" aria-valuemin={0} aria-valuemax={100} aria-valuenow={ofensiva.energia} className="h-3 overflow-hidden rounded-full bg-soul-soft">
                        <div className="h-full rounded-full bg-soul-gradient transition-all duration-500" style={{ width: `${ofensiva.energia}%` }} />
                    </div>
                    <p className="mt-3 text-xs">{concluidas} de {missoes.length} missões ativas concluídas.</p>
                </div>
            </section>
            {/* Simulação de desconto usando o saldo real da pessoa. */}
            <section aria-labelledby="desconto-conta-luz" className="mb-8 rounded-2xl border border-soul-line bg-white p-6 shadow-card sm:p-8">
                <p className="mb-5 inline-flex rounded-full bg-soul-soft px-3 py-1 text-xs font-extrabold text-soul-blue">Demonstração · SoulUp + SoulAI</p>
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                        <h2 id="desconto-conta-luz" className="flex items-center gap-3 text-xl font-extrabold text-soul-ink">
                            <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-soul-yellow/40 text-2xl">⚡</span>
                            Desconto na conta de luz
                        </h2>
                        <p className="mt-4 text-sm">Esta simulação mostra uma possibilidade de integração com a SoulUp: usar as moedas das missões na loja de acessórios ou convertê-las em créditos na conta de luz.</p>
                        <p className="mt-4 font-bold text-soul-blue">Taxa ilustrativa: 10 moedas = R$ 1,00</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                        <p className="text-sm text-soul-text">Valor estimado na simulação</p>
                        <p className="mt-1 text-3xl font-extrabold text-soul-purple">{desconto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        <button type="button" className="botao-app mt-4 w-full sm:w-auto" onClick={() => setResgatado(true)}>Simular conversão</button>
                    </div>
                </div>
                {resgatado && <p role="status" className="mt-5 rounded-xl bg-soul-cyan/10 p-4 text-sm font-bold text-soul-blue">Simulação concluída! Esse valor ilustra o crédito que poderia ser usado na conta de luz.</p>}
                <div className="mt-5 rounded-xl border border-soul-yellow/50 bg-soul-yellow/10 p-4 text-sm text-soul-text">
                    <p><strong>Somente uma demonstração.</strong> Esta simulação não gera créditos reais nem altera seu saldo de moedas.</p>
                    <Link to="/solucao/pontos" className="mt-3 inline-flex font-bold text-soul-blue underline underline-offset-4">Leia mais sobre pontos e recompensas →</Link>
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

