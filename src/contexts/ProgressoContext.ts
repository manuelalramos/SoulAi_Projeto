import { createContext } from "react";
import type { carregarProgresso } from "../data/api";
import type { Acessorio, DadosPerfil, ItemInventario, Missao } from "../types/app";

export type DadosProgresso = Awaited<ReturnType<typeof carregarProgresso>>;

type Progresso = {
    dados: DadosProgresso | null;
    carregando: boolean;
    ocupado: boolean;
    erro: string;
    aviso: string;
    erroAcao: string;
    
    atualizar: () => Promise<void>;
    concluir: (missao: Missao) => Promise<void>;
    comprar: (acessorio: Acessorio) => Promise<void>;
    trocarEquipamento: (item: ItemInventario) => Promise<void>;
    salvarPerfil: (dados: DadosPerfil) => Promise<boolean>;
    limparAvisos: () => void;
};

export const ProgressoContext = createContext<Progresso | null>(null);
