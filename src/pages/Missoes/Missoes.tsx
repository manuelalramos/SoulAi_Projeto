import { useLocation } from "react-router-dom";
import CardMissao from "../../components/CardMissao/CardMissao";
import useProgresso from "../../hooks/useProgresso";

// Página que lista as missões disponíveis e as que já foram concluídas.
export default function Missoes() {
    const { dados } = useProgresso();
    const { state } = useLocation();
    // O detalhe manda um aviso quando a missão já não está disponível.
    const aviso = typeof state?.avisoDetalhe === "string" ? state.avisoDetalhe : "";
    if (!dados) return null;

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Suas missões</h1>
            <p className="mb-8 mt-2">Escolha uma ação. Quando terminar, conclua a missão para receber suas moedas.</p>
            {aviso && <p role="status" className="mb-5 rounded-xl border border-soul-cyan/30 bg-white p-4 text-sm text-soul-blue">{aviso}</p>}
            <div className="grid gap-4">
                {dados.missoes.map((missao) => <CardMissao key={missao.id} missao={missao} />)}
                {dados.missoes.length === 0 && <p className="rounded-2xl border border-soul-line bg-white p-6">Nenhuma missão por aqui ainda. Volte em breve para novas ações sustentáveis!</p>}
            </div>
        </>
    );
}
