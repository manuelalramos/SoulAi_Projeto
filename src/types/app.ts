// Dados que usuário e administrador têm em comum.
export interface Pessoa {
    id: number;
    nome: string;
    email: string;
}

export interface Usuario extends Pessoa {
    moedas: number;
    nivel: number;
    fotoUrl: string | null;
}

export interface Administrador extends Pessoa {}

export interface Missao {
    id: number;
    titulo: string;
    descricao: string;
    recompensa: number;
    energia?: number;
    ativa: boolean;
    concluida: boolean;
    atribuida: boolean;
}

export interface Acessorio {
    id: number;
    nome: string;
    raridade: string;
    tipo: string;
    preco: number;
    imagemUrl: string | null;
}

export interface ItemInventario {
    acessorio: Acessorio;
    equipado: boolean;
}

export interface Avatar {
    id: number;
    nome: string;
}

export interface Credenciais {
    email: string; 
    senha: string;
}

// A interseção reaproveita os campos de login no cadastro e no perfil.
export type DadosCadastro = Credenciais & { 
    nome: string;
};

export type DadosPerfil = DadosCadastro & { 
    fotoUrl: string;
};

export type TipoSessao = "usuario" | "administrador";
// A API Java usa S e N nos campos de sim/não.
export type FlagApi = "S" | "N";

// O tipo da sessão indica quais dados a pessoa conectada possui.
export type Sessao =
    | { tipo: "usuario"; pessoa: Usuario }
    | { tipo: "administrador"; pessoa: Administrador };

// O mesmo estado serve para buscar missões, acessórios e outros detalhes.
export type EstadoRequisicao<T> =
    | { status: "carregando" }
    | { status: "erro"; mensagem: string }
    | { status: "vazio" }
    | { status: "sucesso"; dados: T };
