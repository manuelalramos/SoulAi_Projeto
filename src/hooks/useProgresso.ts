import { useContext } from "react";
import { ProgressoContext } from "../contexts/ProgressoContext";

// Atalho para acessar o progresso e as ações da área logada.
export default function useProgresso() {
    const contexto = useContext(ProgressoContext);
    if (!contexto) throw new Error("O progresso precisa estar dentro do ProgressoProvider.")
        
    return contexto;
}
