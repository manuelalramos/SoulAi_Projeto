import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ContatoRoute from "./routes/Contato";
import NotFound from "./routes/NotFound";
import FAQRoute from "./routes/FAQ";
import HomeRoute from "./routes/Home";
import IntegrantesRoute from "./routes/Integrantes";
import SobreRoute from "./routes/Sobre";
import SolucaoRoute from "./routes/Solucao";
import SolucaoDetalheRoute from "./routes/SolucaoDetalhe";
import LoginRoute from "./routes/Login";
import CadastroRoute from "./routes/Cadastro";
import AreaAppRoute from "./routes/AreaApp";
import DashboardRoute from "./routes/Dashboard";
import MissoesRoute from "./routes/Missoes";
import LojaRoute from "./routes/Loja";
import AvatarRoute from "./routes/Avatar";
import PerfilRoute from "./routes/Perfil";
import EditarPerfilRoute from "./routes/EditarPerfil";
import AdminRoute from "./routes/Admin";
import SessaoProvider from "./contexts/SessaoProvider";

import "./index.css";

// Router principal com todas as páginas da aplicação.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // index: true representa a Home da rota pai "/".
      { index: true, element: <HomeRoute /> },
      { path: "sobre", element: <SobreRoute /> },
      { path: "integrantes", element: <IntegrantesRoute /> },
      { path: "faq", element: <FAQRoute /> },
      { path: "contato", element: <ContatoRoute /> },
      // /solucao é o caminho principal do menu.
      { path: "solucao", element: <SolucaoRoute /> },
      { path: "solucao/:slug", element: <SolucaoDetalheRoute /> },
      { path: "login", element: <LoginRoute /> },
      { path: "cadastro", element: <CadastroRoute /> },
      // A área logada compartilha o progresso entre as páginas filhas.
      {
        path: "app",
        element: <AreaAppRoute />,
        children: [
          { index: true, element: <DashboardRoute /> },
          { path: "missoes", element: <MissoesRoute /> },
          { path: "loja", element: <LojaRoute /> },
          { path: "avatar", element: <AvatarRoute /> },
          { path: "perfil", element: <PerfilRoute /> },
          { path: "perfil/editar", element: <EditarPerfilRoute /> },
        ],
      },
      { path: "admin", element: <AdminRoute /> },
      // 404 normal continua dentro do layout global.
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Ponto de montagem que conecta o React ao elemento #root do HTML.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessaoProvider>
      <RouterProvider router={router} />
    </SessaoProvider>
  </StrictMode>,
);
