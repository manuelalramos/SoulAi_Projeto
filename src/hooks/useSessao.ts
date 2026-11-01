import { useContext } from "react";
import { SessaoContext } from "../contexts/SessaoContext";

// Atalho para acessar a sessão nas telas e nos componentes.
export default function useSessao() {
    const contexto = useContext(SessaoContext);
    if (!contexto) throw new Error("A sessão precisa estar dentro do SessaoProvider.");
    return contexto;
}
