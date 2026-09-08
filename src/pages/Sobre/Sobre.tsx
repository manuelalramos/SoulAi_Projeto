import { PageIntro } from "../../components/PageIntro/PageIntro";
import AboutObjectiveSection from "./sections/AboutObjectiveSection";

export default function Sobre() {
    return (
        <>
            <PageIntro
                label="Sobre o projeto"
                title="SoulUp + SoulAI"
                description="Conheça a proposta do SoulAI, um avatar inteligente criado para tornar a experiência na SoulUp mais interativa, personalizada e conectada com ações sustentáveis."
            />
            <AboutObjectiveSection />
        </>
    );
}

