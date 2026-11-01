import { useState } from "react";
import type { ReactNode } from "react";
import { loginAdministrador, loginUsuario } from "../data/api";
import type { Credenciais, Usuario } from "../types/app";
import { SessaoContext } from "./SessaoContext";
import type { Sessao } from "./SessaoContext";

export default function SessaoProvider({ children }: { children: ReactNode }) {
    const [sessao, setSessao] = useState<Sessao | null>(null);

    async function entrar(dados: Credenciais, administrador: boolean) {
        if (administrador) {
            const pessoa = await loginAdministrador(dados);
            setSessao({ tipo: "administrador", pessoa });
            
        } else {
            const pessoa = await loginUsuario(dados);
            setSessao({ tipo: "usuario", pessoa });
        }
    }

    function sair() {
        setSessao(null);
    }

    function atualizarUsuario(usuario: Usuario) {
        setSessao((atual) => atual?.tipo === "usuario" && atual.pessoa.id === usuario.id ? { tipo: "usuario", pessoa: usuario } : atual);
    }

    return (
        <SessaoContext.Provider value={{ sessao, entrar, sair, atualizarUsuario }}>
            {children}
        </SessaoContext.Provider>
    );
}
