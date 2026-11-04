import type { Credenciais, Sessao, Usuario } from "../types/app";
import { createContext } from "react";

type DadosSessao = {
    sessao: Sessao | null;
    entrar: (dados: Credenciais, administrador: boolean) => Promise<void>;
    sair: () => void;
    atualizarUsuario: (usuario: Usuario) => void;
};

export const SessaoContext = createContext<DadosSessao | null>(null);
