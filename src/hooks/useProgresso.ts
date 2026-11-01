import { useContext } from "react";
import { ProgressoContext } from "../contexts/ProgressoContext";

export default function useProgresso() {
    const contexto = useContext(ProgressoContext);
    if (!contexto) throw new Error("O progresso precisa estar dentro do ProgressoProvider.")
        
    return contexto;
}
