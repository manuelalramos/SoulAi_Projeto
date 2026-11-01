import { useEffect, useRef, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";
import { excluirRegistro, listarAcessorios, listarMissoes, mensagemErro, salvarAcessorio, salvarMissao } from "../../data/api";
import useSessao from "../../hooks/useSessao";
import type { Acessorio, Missao } from "../../types/app";
import MissoesAdmin from "./sections/MissoesAdmin";
import AcessoriosAdmin from "./sections/AcessoriosAdmin";

// Portal que reúne o gerenciamento de missões e acessórios.
export default function Admin() {
    const { sessao } = useSessao();
    const [aba, setAba] = useState<"missao" | "acessorio">("missao");
    const [missoes, setMissoes] = useState<Missao[]>([]);
    const [acessorios, setAcessorios] = useState<Acessorio[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [ocupado, setOcupado] = useState(false);
    const [erro, setErro] = useState("");
    const [erroAcao, setErroAcao] = useState("");
    const [aviso, setAviso] = useState("");
    const acaoEmAndamento = useRef(false);

    useEffect(() => {
        let ativo = true;
        Promise.all([listarMissoes(true), listarAcessorios()])
            .then(([missoes, acessorios]) => {
                if (!ativo) return;
                setMissoes(missoes);
                setAcessorios(acessorios);
            })

            .catch((erro) => { if (ativo) setErro(mensagemErro(erro)); })
            .finally(() => { if (ativo) setCarregando(false); });
        return () => { ativo = false; };

    }, []);

    async function atualizar() {
        setCarregando(true);
        setErro("");
        try {
            const [missoes, acessorios] = await Promise.all([listarMissoes(true), listarAcessorios()]);
            setMissoes(missoes);
            setAcessorios(acessorios);
            setErro("");
        } catch (erro) {
            setErro(mensagemErro(erro));
        } finally {
            setCarregando(false);
        }
    }

    if (sessao?.tipo !== "administrador") return null;
    const idAdministrador = sessao.pessoa.id;

    // Evita ações ao mesmo tempo e atualiza a lista depois de salvar ou excluir.
    async function executarAcao(acao: () => Promise<unknown>, mensagem: string) {
        if (acaoEmAndamento.current) return false;
        acaoEmAndamento.current = true;
        setOcupado(true);
        setAviso("");
        setErroAcao("");
        try {
            await acao();
            setAviso(mensagem);
            await atualizar();
            return true;
        } catch (erro) {
            setErroAcao(mensagemErro(erro));
            return false;
        } finally {
            acaoEmAndamento.current = false;
            setOcupado(false);
        }
    }

    return (
        <section className="min-h-screen bg-soul-soft pb-28 pt-28 md:pt-32">

            <div className="mx-auto w-[92%] max-w-[1080px]">
                <p className="text-sm font-extrabold uppercase tracking-wide text-soul-purple">ADMIN</p>
                <h1 className="mt-2 text-3xl font-extrabold text-soul-ink">Portal do administrador</h1>
                <p className="mt-2">Gerencie as missões e os acessórios do SoulAI.</p>

                <div className="my-7 flex gap-3" aria-label="Conteúdo para gerenciar">
                    <button type="button" aria-pressed={aba === "missao"} disabled={ocupado} onClick={() => { setAba("missao"); setAviso(""); setErroAcao(""); }} className={aba === "missao" ? "botao-app" : "botao-secundario"}>Missões</button>
                    <button type="button" aria-pressed={aba === "acessorio"} disabled={ocupado} onClick={() => { setAba("acessorio"); setAviso(""); setErroAcao(""); }} className={aba === "acessorio" ? "botao-app" : "botao-secundario"}>Acessórios</button>
                </div>

                {aviso && <p role="status" className="mb-5 rounded-xl bg-white p-4 text-sm text-soul-blue">{aviso}</p>}
                {erroAcao && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{erroAcao}</p>}
                {carregando ? <Carregando /> : erro ? (
                    <div className="rounded-2xl bg-white p-6"><p role="alert">{erro}</p><button type="button" className="botao-secundario mt-4" onClick={() => void atualizar()}>Tentar novamente</button></div>
                ) : aba === "missao" ? (
                    <MissoesAdmin missoes={missoes} ocupado={ocupado}
                        salvar={(dados, id) => executarAcao(() => salvarMissao(dados, idAdministrador, id), "Missão salva.")}
                        excluir={(id) => executarAcao(() => excluirRegistro("missao", id), "Missão excluída.")} />
                ) : (
                    <AcessoriosAdmin acessorios={acessorios} ocupado={ocupado}
                        salvar={(dados, id) => executarAcao(() => salvarAcessorio(dados, idAdministrador, id), "Acessório salvo.")}
                        excluir={(id) => executarAcao(() => excluirRegistro("acessorio", id), "Acessório excluído.")} />
                )}
                {ocupado && !carregando && <Carregando />}
            </div>
            
        </section>
    );
}
