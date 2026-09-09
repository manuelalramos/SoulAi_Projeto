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
      // 404 normal continua dentro do layout global.
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Ponto de montagem que conecta o React ao elemento #root do HTML.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
