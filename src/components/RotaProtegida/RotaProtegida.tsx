import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useSessao from "../../hooks/useSessao";


// Confere a sessão antes de mostrar uma página de usuário ou administrador.
export default function RotaProtegida({ tipo, children }: {
    tipo: "usuario" | "administrador";
    children: ReactNode;
}) {
    const { sessao } = useSessao();
    if (!sessao) return <Navigate to={tipo === "administrador" ? "/login?admin=1" : "/login"} replace />;
    if (sessao.tipo !== tipo) return <Navigate to={sessao.tipo === "administrador" ? "/admin" : "/app"} replace />;
    return children;
}
