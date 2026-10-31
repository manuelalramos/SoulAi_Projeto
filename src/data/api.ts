import type { Acessorio, Administrador, Avatar, Credenciais, DadosCadastro, DadosPerfil, ItemInventario, Missao, Usuario} from "../types/app";

export const API_BASE = "https://soulai-api.onrender.com";
const TEMPO_LIMITE = 90000;

type UsuarioApi = {
    idUsuario: number;
    nome: string;
    email: string;
    saldoMoedas: number;
    nivelOfensiva: number;
    fotoUrl?: string | null;
};

type MissaoApi = {
    idMissao: number;
    tituloMissao: string;
    descricaoMissao: string;
    ativo: string;
    valorMoedasMissao: number;
};

type AcessorioApi = Omit<Acessorio, "id" | "imagemUrl"> & {
    idAcessorio: number;
    imagemUrl?: string | null;
};

type RegistroMissao = {
    idMissao: number;
    missaoConcluida: string;
    missaoConcluidaEm: string | null;
};

type RegistroInventario = {
    idAcessorio: number;
    equipado: string;
};

// Erros e mensagens exibidos nas telas.
class ErroApi extends Error {
    status: number;

    constructor(mensagem: string, status: number) {
        super(mensagem);
        this.status = status;
    }
}

export function mensagemErro(erro: unknown) {
    return erro instanceof Error
        ? erro.message
        : "Não foi possível completar a ação. Tente novamente.";
}

export function credenciaisInvalidas(erro: unknown) {
    return erro instanceof ErroApi && erro.status === 401;
}

// Todas as chamadas passam aqui, inclusive o timeout do primeiro acesso.
async function requisicao<T>(
    caminho: string,
    opcoes: RequestInit = {},
    mensagem = "Não foi possível completar a ação."
): Promise<T> {
    const controle = new AbortController();
    const temporizador = setTimeout(() => controle.abort(), TEMPO_LIMITE);

    try {
        const resposta = await fetch(`${API_BASE}${caminho}`, {
            ...opcoes,
            headers: {
                Accept: "application/json",
                ...(opcoes.body ? { "Content-Type": "application/json" } : {}),
                ...opcoes.headers,
            },
            signal: controle.signal,
        });

        if (!resposta.ok) {
            let aviso = mensagem;

            if (resposta.status >= 500) {
                aviso =
                    "O SoulAI está indisponível no momento. Tente novamente em instantes.";
            } else if (resposta.status === 401) {
                aviso = caminho.endsWith("/login")
                    ? "E-mail ou senha incorretos."
                    : "Não foi possível autorizar esta ação. Entre novamente.";
            } else if (resposta.status === 403) {
                aviso = "Você não tem permissão para realizar esta ação.";
            } else if (resposta.status === 409) {
                aviso =
                    "Esse registro já existe ou está em uso e não pode ser excluído.";
            }

            // Traduz os erros de negócio sem exibir mensagens técnicas do servidor.
            const dados = await resposta.json().catch(() => ({}));
            const detalhe = String(
                dados.message ?? dados.mensagem ?? ""
            ).toLowerCase();

            if (detalhe.includes("saldo")) {
                aviso = "Você ainda não tem moedas suficientes para esse acessório.";
            }

            if (detalhe.includes("e-mail ja cadastrado")) {
                aviso = "Este e-mail já está cadastrado. Entre na sua conta.";
            }

            if (detalhe.includes("ja possui este acessorio")) {
                aviso = "Você já tem esse acessório no inventário.";
            }

            if (detalhe.includes("ja foi concluida")) {
                aviso = "Essa missão já foi concluída.";
            }

            if (detalhe.includes("atribuida a usuarios")) {
                aviso =
                    "Essa missão já está em uso. Você pode desativá-la ao editar.";
            }

            if (detalhe.includes("ja pertence a usuarios")) {
                aviso =
                    "Esse acessório já pertence a usuários e não pode ser excluído.";
            }

            throw new ErroApi(aviso, resposta.status);
        }
        if (resposta.status === 204) {
            return undefined as T;
        }

        return await resposta.json() as T;
    } catch (erro) {
        if (erro instanceof ErroApi) {
            throw erro;
        }

        throw new Error(
            controle.signal.aborted
                ? "O SoulAI está demorando para responder. Aguarde um pouco e tente novamente."
                : "Não foi possível conectar ao SoulAI. Confira sua conexão e tente novamente."
        );
    } finally {
        clearTimeout(temporizador);
    }
}

function usuarioDaApi(dados: UsuarioApi): Usuario {
    return {
        id: dados.idUsuario,
        nome: dados.nome,
        email: dados.email,
        moedas: dados.saldoMoedas,
        nivel: dados.nivelOfensiva,
        fotoUrl: dados.fotoUrl?.trim() || null,
    };
}

function missaoDaApi(dados: MissaoApi): Missao {
    return {
        id: dados.idMissao,
        titulo: dados.tituloMissao,
        descricao: dados.descricaoMissao ?? "",
        recompensa: dados.valorMoedasMissao,
        ativa: dados.ativo === "S",
        concluida: false,
        atribuida: false,
    };
}

function acessorioDaApi({ idAcessorio, ...dados }: AcessorioApi): Acessorio {
    return {
        id: idAcessorio,
        nome: dados.nome,
        tipo: dados.tipo,
        raridade: dados.raridade,
        preco: dados.preco,
        imagemUrl: dados.imagemUrl?.trim() || null,
    };
}

export async function loginUsuario(dados: Credenciais) {
    return usuarioDaApi(
        await requisicao<UsuarioApi>(
            "/usuario/login",
            {
                method: "POST",
                body: JSON.stringify(dados),
            },
            "E-mail ou senha incorretos."
        )
    );
}

export async function loginAdministrador(
    dados: Credenciais
): Promise<Administrador> {
    const pessoa = await requisicao<{
        idAdministrador: number;
        nome: string;
        email: string;
    }>(
        "/administrador/login",
        {
            method: "POST",
            body: JSON.stringify(dados),
        },
        "E-mail ou senha incorretos."
    );

    return {
        id: pessoa.idAdministrador,
        nome: pessoa.nome,
        email: pessoa.email,
    };
}

export function cadastrarUsuario(dados: DadosCadastro) {
    return requisicao<UsuarioApi>(
        "/usuario",
        {
            method: "POST",
            body: JSON.stringify(dados),
        },
        "Não foi possível criar sua conta. Confira os dados e tente novamente."
    );
}

export async function salvarPerfilUsuario(
    idUsuario: number,
    dados: DadosPerfil
) {
    const pessoa = await requisicao<UsuarioApi>(
        `/usuario/${idUsuario}`,
        {
            method: "PUT",
            body: JSON.stringify({
                nome: dados.nome.trim(),
                email: dados.email.trim(),
                senha: dados.senha,
                fotoUrl: dados.fotoUrl.trim(),
            }),
        },
        "Não foi possível salvar seu perfil. Confira os dados e tente novamente."
    );

    return usuarioDaApi(pessoa);
}

// Consulta das missões, acessórios e avatar.
export async function listarMissoes(todas = false) {
    const dados = await requisicao<MissaoApi[]>(
        todas ? "/missao" : "/missao/ativas"
    );

    return dados.map(missaoDaApi);
}

export async function listarAcessorios() {
    return (await requisicao<AcessorioApi[]>("/acessorio")).map(acessorioDaApi);
}

export async function buscarAvatar(idUsuario: number): Promise<Avatar | null> {
    try {
        const dados = await requisicao<{
            idAvatar: number;
            nome: string;
        }>(`/avatar/usuario/${idUsuario}`);

        return {
            id: dados.idAvatar,
            nome: dados.nome,
        };
    } catch (erro) {
        // Contas novas ainda não possuem um registro de avatar.
        if (erro instanceof ErroApi && erro.status === 404) {
            return null;
        }

        throw erro;
    }
}

export async function carregarProgresso(idUsuario: number) {
    const [
        pessoa,
        missoes,
        registros,
        acessorios,
        itens,
        avatar,
    ] = await Promise.all([
        requisicao<UsuarioApi>(`/usuario/${idUsuario}`),
        listarMissoes(),
        requisicao<RegistroMissao[]>(`/usuario/${idUsuario}/missoes`),
        listarAcessorios(),
        requisicao<RegistroInventario[]>(`/usuario/${idUsuario}/inventario`),
        buscarAvatar(idUsuario),
    ]);

    const inventario: ItemInventario[] = [];

    for (const item of itens) {
        const acessorio = acessorios.find(
            (acessorio) => acessorio.id === item.idAcessorio
        );

        if (acessorio) {
            inventario.push({
                acessorio,
                equipado: item.equipado === "S",
            });
        }
    }

    return {
        usuario: usuarioDaApi(pessoa),
        missoes: missoes.map((missao) => {
            const registro = registros.find(
                (registro) => registro.idMissao === missao.id
            );

            return {
                ...missao,
                atribuida: !!registro,
                concluida: registro?.missaoConcluida === "S",
            };
        }),
        acessorios,
        inventario,
        avatar,
        totalConcluidas: registros.filter(
            (registro) => registro.missaoConcluida === "S"
        ).length,
    };
}

export async function concluirMissao(idUsuario: number, missao: Missao) {
    if (!missao.atribuida) {
        try {
            await requisicao(
                `/usuario/${idUsuario}/missoes/${missao.id}`,
                { method: "POST" }
            );
        } catch (erro) {
            if (!(erro instanceof ErroApi && erro.status === 409)) {
                throw erro;
            }
        }
    }
    return requisicao(
        `/usuario/${idUsuario}/missoes/${missao.id}/concluir`,
        { method: "POST" },
        "Não foi possível concluir a missão. Atualize a lista e tente novamente."
    );
}

export function comprarAcessorio(idUsuario: number, idAcessorio: number) {
    return requisicao(
        `/usuario/${idUsuario}/inventario/${idAcessorio}`,
        { method: "POST" },
        "Não foi possível comprar esse acessório. Atualize a loja e tente novamente."
    );
}

export function alterarEquipamento(
    idUsuario: number,
    idAcessorio: number,
    equipado: boolean
) {
    return requisicao(
        `/usuario/${idUsuario}/inventario/${idAcessorio}/${equipado ? "desequipar" : "equipar"}`,
        { method: "PUT" },
        "Não foi possível trocar o acessório. Tente novamente."
    );
}

export function salvarMissao(
    missao: Omit<Missao, "id" | "concluida" | "atribuida">,
    idAdministrador: number,
    id?: number
) {
    return requisicao(
        id ? `/missao/${id}` : "/missao",
        {
            method: id ? "PUT" : "POST",
            body: JSON.stringify({
                tituloMissao: missao.titulo.trim(),
                descricaoMissao: missao.descricao.trim(),
                ativo: missao.ativa ? "S" : "N",
                valorMoedasMissao: missao.recompensa,
                idAdministrador,
            }),
        },
        "Não foi possível salvar a missão. Confira os dados e tente novamente."
    );
}

export function salvarAcessorio(
    acessorio: Omit<Acessorio, "id">,
    idAdministrador: number,
    id?: number
) {
    return requisicao(
        id ? `/acessorio/${id}` : "/acessorio",
        {
            method: id ? "PUT" : "POST",
            body: JSON.stringify({
                nome: acessorio.nome.trim(),
                tipo: acessorio.tipo.trim(),
                raridade: acessorio.raridade.trim(),
                preco: acessorio.preco,
                imagemUrl: acessorio.imagemUrl?.trim() || "",
                idAdministrador,
            }),
        },
        "Não foi possível salvar o acessório. Confira os dados e tente novamente."
    );
}

export function excluirRegistro(tipo: "missao" | "acessorio", id: number) {
    return requisicao(
        `/${tipo}/${id}`,
        { method: "DELETE" },
        "Não foi possível excluir. Atualize a lista e tente novamente."
    );
}
