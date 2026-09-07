import { Route, Routes } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import Contato from "../pages/Contato/Contato";
import FAQ from "../pages/FAQ/Faq";
import Home from "../pages/Home/Home";
import Integrantes from "../pages/Integrantes/Integrantes";
import NotFound from "../pages/NotFound/NotFound";
import Sobre from "../pages/Sobre/Sobre";
import Solucao from "../pages/Solucao/Solucao";
export function AppRoutes() {
    useScrollToTop();
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/integrantes" element={<Integrantes />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/funcionalidades" element={<Solucao />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}