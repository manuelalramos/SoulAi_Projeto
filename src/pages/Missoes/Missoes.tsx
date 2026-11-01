import CardMissao from "../../components/CardMissao/CardMissao";
import useProgresso from "../../hooks/useProgresso";

export default function Missoes() {
    const { dados } = useProgresso();
    if (!dados) return null;

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Suas missões</h1>
            <p className="mb-8 mt-2">Escolha uma ação. Quando terminar, conclua a missão para receber suas moedas.</p>
            <div className="grid gap-4">
                {dados.missoes.map((missao) => <CardMissao key={missao.id} missao={missao} />)}
                {dados.missoes.length === 0 && <p className="rounded-2xl border border-soul-line bg-white p-6">Ainda não há missões disponíveis. Volte em breve!</p>}
            </div>
        </>
    );
}
