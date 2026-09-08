import type { ReactNode } from "react";
import { FloatingChat } from "../../components/FloatingChat/FloatingChat";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";


type MainLayoutProps = {
    children: ReactNode;
};


export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            {/* Existe somente um main global na aplicação. */}
            <main>{children}</main>
            <FloatingChat />
            <Footer />
        </>
    );
}
