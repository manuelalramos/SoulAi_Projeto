import type { ReactNode } from "react";
import FloatingChat from "../../components/FloatingChat/FloatingChat";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";


// Props do layout com o conteúdo da página atual.
type MainLayoutProps = {
    children: ReactNode;
};


// Layout global que envolve todas as páginas com Header, chat e Footer.
export default function MainLayout({ children }: MainLayoutProps) {
    const { pathname } = useLocation();
    const areaLogada = /^\/(app|admin)(\/|$)/.test(pathname);
    return (
        <>
            <Header />
            {/* Existe somente um main global na aplicação. */}
            <main>{children}</main>
            {/* O mesmo chat fica disponível em todas as páginas. */}
            <FloatingChat />
            {!areaLogada && <Footer />}
        </>
    );
}
