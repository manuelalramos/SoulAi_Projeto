import type { ReactNode } from "react";
import { FloatingChat } from "../../components/FloatingChat/FloatingChat";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";


// Props do layout com o conteúdo da página atual.
type MainLayoutProps = {
    children: ReactNode;
};


// Layout global que envolve todas as páginas com Header, chat e Footer.
export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            {/* Existe somente um main global na aplicação. */}
            <main>{children}</main>
            {/* Chat demonstrativo fica disponível em todas as páginas. */}
            <FloatingChat />
            <Footer />
        </>
    );
}
