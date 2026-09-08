import { Outlet } from "react-router-dom";
import { FloatingChat } from "../../components/FloatingChat/FloatingChat";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";


export function MainLayout() {
    return (
        <>
            <Header />
            {/* O conteúdo de cada rota entra dentro deste único main. */}
            <main>
                <Outlet />
            </main>
            {/* O chat fica disponível em todas as páginas, como no ZIP de referência. */}
            <FloatingChat />
            <Footer />
        </>
    );
}