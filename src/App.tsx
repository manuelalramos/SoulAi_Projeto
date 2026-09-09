import { Outlet } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { MainLayout } from "./layouts/MainLayout/MainLayout";


// Componente raiz usado por todas as rotas da aplicação.
export default function App() {
  // Continua levando o usuário ao topo quando a rota muda.
  useScrollToTop();
  return (
    <MainLayout>
      {/* A página filha escolhida pelo router. */}
      <Outlet />
    </MainLayout>
  );
}
