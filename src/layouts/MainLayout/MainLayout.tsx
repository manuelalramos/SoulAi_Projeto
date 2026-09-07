import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
export function MainLayout() {
    return (
        <>
            <Header />
            {/* O conteúdo da rota atual entra aqui. */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}