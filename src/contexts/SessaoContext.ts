import type { Administrador, Credenciais, Usuario } from "../types/app";
import { createContext } from "react";

export type Sessao = 
    |{tipo: "usuario"; pessoa: Usuario}
    |{tipo: "administrador"; pessoa: Administrador}

type DadosSessao = {
    sessao: Sessao | null;
    entrar: (dados: Credenciais, administrador: boolean) => Promise<void>;
    sair: () => void;
    atualizarUsuario: (usuario: Usuario) => void;
};

export const SessaoContext = createContext<DadosSessao | null>(null);