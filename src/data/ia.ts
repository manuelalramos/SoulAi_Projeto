import type { DadosProgresso } from "../contexts/ProgressoContext";
import type { Credenciais } from "../types/app";

// Chat e previsão usam o mesmo serviço, separado da API Java.
const IA_API_BASE = "https://soulai-ia-api.onrender.com";
const TEMPO_LIMITE_IA = 120000;

export type DadosEngajamento = {
    idade: number;
    dias_ativo: number;
    acessos: number;
    missoes_recebidas: number;
    missoes_concluidas: number;
    acoes_sustentaveis: number;
    interacoes_chatbot: number;
    comentarios: number;
    curtidas: number;
    participacoes_comunidade: number;
    streak_maximo: number;
    pontos: number;
    recompensas_resgatadas: number;
};

export type RespostaEngajamento = {
    sucesso: boolean;
    nivel_engajamento: "alto" | "medio" | "baixo";
    modelo: string;
    probabilidades: Record<string, number>;
    observacao: string;
};

export type DadosChat = {
    text: string;
    sessionId: string;
};

export type RespostaChat = {
    sucesso: boolean;
    resposta: string;
    sessionId?: string;
    metadata?: {
        authenticated?: boolean;
        auth_required?: boolean;
        data_changed?: boolean;
    };
};

export type RespostaLoginIA = {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
    usuario: { idUsuario: number; nome: string };
};

// Identifica mensagens amigáveis que já foram tratadas aqui.
class ErroIA extends Error {
    status: number;

    constructor(mensagem: string, status = 0) {
        super(mensagem);
        this.status = status;
    }
}

export function sessaoIAExpirada(erro: unknown) {
    return erro instanceof ErroIA && erro.status === 401;
}

async function requisicaoIA<T>(caminho: string, dados: object, sinal?: AbortSignal, token?: string): Promise<T> {
    const controle = new AbortController();
    const temporizador = setTimeout(() => controle.abort(), TEMPO_LIMITE_IA);
    const cancelar = () => controle.abort();
    sinal?.addEventListener("abort", cancelar, { once: true });
    if (sinal?.aborted) controle.abort();

    try {
        const resposta = await fetch(`${IA_API_BASE}${caminho}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(dados),
            signal: controle.signal,
        });

        if (!resposta.ok) {
            if (resposta.status === 401) {
                throw new ErroIA(caminho === "/auth/login"
                    ? "Não foi possível autenticar o chat. Confira seu e-mail e senha."
                    : "Sua sessão do chat expirou. Entre novamente.", 401);
            }
            throw new ErroIA(resposta.status === 429
                ? "O SoulAI está recebendo muitas mensagens. Aguarde um pouco e tente novamente."
                : "A IA está indisponível no momento. Tente novamente em instantes.");
        }

        const resultado = await resposta.json() as T;
        if (!resultado || typeof resultado !== "object" || ("sucesso" in resultado && resultado.sucesso !== true)) {
            throw new ErroIA("A IA não conseguiu completar o pedido. Tente novamente.");
        }
        return resultado;
    } catch (erro) {
        if (sinal?.aborted || erro instanceof ErroIA) throw erro;
        throw new ErroIA(controle.signal.aborted
            ? "O SoulAI está demorando para responder. Aguarde um pouco e tente novamente."
            : "Não foi possível conectar ao SoulAI. Confira sua conexão e tente novamente.");
    } finally {
        clearTimeout(temporizador);
        sinal?.removeEventListener("abort", cancelar);
    }
}

// A senha é usada só nesta chamada; apenas o token acompanha a sessão do site.
export async function autenticarIA(dados: Credenciais) {
    const resultado = await requisicaoIA<RespostaLoginIA>("/auth/login", { email: dados.email.trim(), senha: dados.senha });
    if (typeof resultado.access_token !== "string" || !resultado.access_token.trim() || resultado.token_type !== "bearer"
        || !Number.isSafeInteger(resultado.usuario?.idUsuario) || resultado.usuario.idUsuario <= 0) {
        throw new ErroIA("Não foi possível confirmar o login do chat. Tente novamente.");
    }
    return resultado;
}

// Aproveita o progresso real e usa valores padrão onde ainda não há histórico.
export function montarDadosEngajamento(dados: DadosProgresso): DadosEngajamento {
    const concluidas = Math.max(dados.totalConcluidas, dados.missoes.filter((missao) => missao.concluida).length);
    const recebidas = dados.missoes.filter((missao) => missao.atribuida || missao.concluida).length;

    return {
        // O cadastro não informa idade. Consideramos só o acesso de hoje para a atividade.
        idade: 18,
        dias_ativo: 1,
        acessos: 1,
        // O histórico pode incluir missões que já saíram da lista atual.
        missoes_recebidas: Math.max(recebidas, concluidas),
        missoes_concluidas: concluidas,
        acoes_sustentaveis: 0,
        interacoes_chatbot: 0,
        comentarios: 0,
        curtidas: 0,
        participacoes_comunidade: 0,
        streak_maximo: 0,
        // Saldo e acessórios adquiridos são os indicadores disponíveis no app.
        pontos: Math.max(0, dados.usuario.moedas),
        recompensas_resgatadas: dados.inventario.length,
    };
}

export async function preverEngajamento(dados: DadosEngajamento, sinal?: AbortSignal) {
    const resultado = await requisicaoIA<RespostaEngajamento>("/predict", dados, sinal);
    if (!["alto", "medio", "baixo"].includes(resultado.nivel_engajamento)) {
        throw new ErroIA("Não foi possível interpretar a previsão da IA. Tente novamente.");
    }
    return resultado;
}

export async function enviarMensagem(texto: string, sessionId: string, sinal?: AbortSignal, token?: string) {
    // A sessão mantém a conversa; o token identifica a conta nas consultas pessoais.
    const dados: DadosChat = { text: texto.trim(), sessionId };
    const resultado = await requisicaoIA<RespostaChat>("/chat", dados, sinal, token);
    if (typeof resultado.resposta !== "string" || !resultado.resposta.trim()) {
        throw new ErroIA("O SoulAI não conseguiu responder agora. Tente enviar sua mensagem novamente.");
    }
    return resultado;
}
