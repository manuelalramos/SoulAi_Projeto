import PageIntro from "../../components/PageIntro/PageIntro";
import AboutHighlightsSection from "./sections/AboutHighlightsSection";
import AboutObjectiveSection  from "./sections/AboutObjectiveSection";
import FireProgressSection  from "./sections/FireProgressSection";
import RoadmapSection  from "./sections/RoadmapSection";

// Página que explica o propósito, diferenciais e evolução futura do SoulAI.
export default function Sobre() {
    return (
        <>
            <PageIntro
                label="Sobre o projeto"
                title="SoulUp + SoulAI"
                description="Conheça a proposta do SoulAI, um avatar inteligente criado para tornar a experiência na SoulUp mais interativa, personalizada e conectada com ações sustentáveis."
            />
            {/* Objetivo principal da solução dentro da experiência SoulUp. */}
            <AboutObjectiveSection />
            {/* Destaques sobre tecnologia, inovação e público. */}
            <AboutHighlightsSection />
            {/* Explicação visual do foguinho progressivo. */}
            <FireProgressSection />
            {/* Próximos passos sugeridos para evolução do projeto. */}
            <RoadmapSection />
        </>
    );
}
