import { useEffect, useState } from "react";
import { mensagemErro, registroNaoEncontrado } from "../data/api";
import type { EstadoRequisicao } from "../types/app";

// Busca um detalhe pelo id da URL e separa carregamento, erro e resultado.
export default function useDetalhe<T>(id: string | undefined, buscar: (id: number) => Promise<T>): EstadoRequisicao<T> {
    const [consulta, setConsulta] = useState<{
        id: string | undefined;
        buscar: typeof buscar;
        estado: EstadoRequisicao<T>;
    }>({ id, buscar, estado: { status: "carregando" } });

    useEffect(() => {
        let ativo = true;

        function atualizar(estado: EstadoRequisicao<T>) {
            if (ativo) setConsulta({ id, buscar, estado });
        }

        async function carregar() {
            // Um id inválido volta para a lista sem fazer uma chamada desnecessária.
            const numero = Number(id);
            if (!id || !/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(numero)) {
                atualizar({ status: "vazio" });
                return;
            }

            atualizar({ status: "carregando" });
            try {
                const dados = await buscar(numero);
                atualizar({ status: "sucesso", dados });
            } catch (erro) {
                atualizar(registroNaoEncontrado(erro)
                    ? { status: "vazio" }
                    : { status: "erro", mensagem: mensagemErro(erro) });
            }
        }

        void carregar();
        // Ignora respostas antigas se a pessoa sair da tela ou trocar de id.
        return () => { ativo = false; };
    }, [id, buscar]);

    return consulta.id === id && consulta.buscar === buscar
        ? consulta.estado
        : { status: "carregando" };
}
