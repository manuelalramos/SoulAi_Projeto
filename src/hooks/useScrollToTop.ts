import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Hook que leva a página para o topo sempre que a rota muda.
export function useScrollToTop() {
    // pathname muda quando o usuário navega para outra rota.
    const { pathname } = useLocation();

    useEffect(() => {
        // Garante que a nova página comece no topo da janela.
        window.scrollTo(0, 0);
    }, [pathname]);
}
