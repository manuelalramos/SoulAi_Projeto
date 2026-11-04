import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { loginAdministrador, loginUsuario } from "../data/api";
import { autenticarIA } from "../data/ia";
import type { Credenciais, Usuario } from "../types/app";
import { SessaoContext } from "./SessaoContext";
import type { Sessao } from "./SessaoContext";

// Compartilha a conta conectada e as ações de entrada e saída.
export default function SessaoProvider({ children }: { children: ReactNode }) {
    const [sessao, setSessao] = useState<Sessao | null>(null);
    const tentativaAtual = useRef(0);

    async function entrar(dados: Credenciais, administrador: boolean) {
        const tentativa = ++tentativaAtual.current;
        let novaSessao: Sessao;
        if (administrador) {
            const pessoa = await loginAdministrador(dados);
            novaSessao = { tipo: "administrador", pessoa };
            
        } else {
            // Confirma o mesmo usuário no site e no chat antes de concluir a entrada.
            const [pessoa, chat] = await Promise.all([loginUsuario(dados), autenticarIA(dados)]);
            if (chat.usuario.idUsuario !== pessoa.id) {
                throw new Error("Não foi possível confirmar sua conta no chat. Tente entrar novamente.");
            }
            novaSessao = { tipo: "usuario", pessoa, tokenIA: chat.access_token };
        }
        // Um login antigo não pode reconectar a pessoa depois de sair ou trocar de conta.
        if (tentativa === tentativaAtual.current) setSessao(novaSessao);
    }

    function sair() {
        tentativaAtual.current += 1;
        setSessao(null);
    }

    function atualizarUsuario(usuario: Usuario) {
        setSessao((atual) => atual?.tipo === "usuario" && atual.pessoa.id === usuario.id ? { ...atual, pessoa: usuario } : atual);
    }

    return (
        <SessaoContext.Provider value={{ sessao, entrar, sair, atualizarUsuario }}>
            {children}
        </SessaoContext.Provider>
    );
}
