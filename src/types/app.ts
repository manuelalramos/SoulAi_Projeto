export type Usuario = {
    id: number;
    nome: string;
    email: string;
    moedas: number;
    nivel: number;
    fotoUrl: string | null;
};

export type Administrador = {
    id: number;
    nome: string;
    email: string;
};

export type Missao = {
    id: number;
    titulo: string;
    descricao: string;
    recompensa: number;
    ativa: boolean;
    concluida: boolean;
    atribuida: boolean;
};

export type Acessorio = {
    id: number;
    nome: string;
    raridade: string;
    tipo: string;
    preco: number;
    imagemUrl: string | null;
};

export type ItemInventario = {
    acessorio: Acessorio;
    equipado: boolean;
};

export type Avatar = {
    id: number;
    nome: string
};

export type Credenciais = { 
    email: string; 
    senha: string 
};

export type DadosCadastro = Credenciais & { 
    nome: string 
};

export type DadosPerfil = DadosCadastro & { 
    fotoUrl: string 
};