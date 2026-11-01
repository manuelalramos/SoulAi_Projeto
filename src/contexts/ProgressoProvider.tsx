import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { alterarEquipamento, carregarProgresso, comprarAcessorio, concluirMissao, mensagemErro, salvarPerfilUsuario } from "../data/api";

import useSessao from "../hooks/useSessao";
import type { Acessorio, DadosPerfil, ItemInventario, Missao } from "../types/app";
import { ProgressoContext } from "./ProgressoContext";
import type { DadosProgresso } from "./ProgressoContext";

export default function ProgressoProvider({ children }: { children: ReactNode }) {
    const { sessao, atualizarUsuario } = useSessao();
    const idUsuario = sessao?.pessoa.id;
    const [dados, setDados] = useState<DadosProgresso | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [ocupado, setOcupado] = useState(false);
    const [erro, setErro] = useState("");
    const [erroAcao, setErroAcao] = useState("");
    const [aviso, setAviso] = useState("");
    const acaoEmAndamento = useRef(false);

    useEffect(() => {
        if (!idUsuario) return;

        let ativo = true;
        carregarProgresso(idUsuario)
            .then((dados) => { if (ativo) setDados(dados); })
            .catch((erro) => { if (ativo) setErro(mensagemErro(erro)); })
            .finally(() => { if (ativo) setCarregando(false); });

        return () => { ativo = false; };

    }, [idUsuario]);

    async function atualizar() {
        setCarregando(true);
        setErro("");

        if (!idUsuario) return;
        try {
            setDados(await carregarProgresso(idUsuario));

        } catch (erro) {
            setErro(mensagemErro(erro));

        } finally {
            setCarregando(false);
        }
    }

    async function executarAcao(acao: () => Promise<unknown>, mensagem: string) {
        if (acaoEmAndamento.current) return;
        acaoEmAndamento.current = true;

        setOcupado(true);
        setErroAcao("");
        setAviso("");

        try {
            await acao();
            setAviso(mensagem);
            await atualizar();

        } catch (erro) {
            setErroAcao(mensagemErro(erro));

        } finally {
            acaoEmAndamento.current = false;
            setOcupado(false);
        }
    }

    async function concluir(missao: Missao) {
        if (!idUsuario || missao.concluida || !missao.ativa) return;

        await executarAcao(() => concluirMissao(idUsuario, missao), `Missão concluída! +${missao.recompensa} moedas para você.`);
    }

    async function comprar(acessorio: Acessorio) {
        if (!idUsuario || !dados) return;
        if (dados.inventario.some((item) => item.acessorio.id === acessorio.id)) {
            setErroAcao("Você já tem esse acessório no inventário.");
            return;
        }
        if (dados.usuario.moedas < acessorio.preco) {
            setErroAcao("Você ainda não tem moedas suficientes para esse acessório.");
            return;
        }
        await executarAcao(() => comprarAcessorio(idUsuario, acessorio.id), `${acessorio.nome} agora está no seu inventário!`);
    }

    async function trocarEquipamento(item: ItemInventario) {
        if (!idUsuario) return;

        await executarAcao(() => alterarEquipamento(idUsuario, item.acessorio.id, item.equipado), item.equipado ? "Acessório desequipado." : "Acessório equipado!");
    }

    async function salvarPerfil(perfil: DadosPerfil) {
        if (!idUsuario || acaoEmAndamento.current) return false;
        acaoEmAndamento.current = true;

        setOcupado(true);
        setErroAcao("");
        setAviso("");

        try {
            const usuario = await salvarPerfilUsuario(idUsuario, perfil);
            setDados((atual) => atual ? { ...atual, usuario } : atual);
            atualizarUsuario(usuario);
            setAviso("Perfil atualizado com sucesso.");
            return true;

        } catch (erro) {
            setErroAcao(mensagemErro(erro));
            return false;

        } finally {
            acaoEmAndamento.current = false;
            setOcupado(false);
        }
    }

    function limparAvisos() {

        setAviso("");
        setErroAcao("");
    }

    return (
        <ProgressoContext.Provider value={{ dados, carregando, ocupado, erro, erroAcao, aviso, atualizar, concluir, comprar, trocarEquipamento, salvarPerfil, limparAvisos }}>
            {children}
        </ProgressoContext.Provider>
    );
}
