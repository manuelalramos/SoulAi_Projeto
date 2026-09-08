import { PageIntro } from "../../components/PageIntro/PageIntro";
import AboutObjectiveSection from "./sections/AboutObjectiveSection";
import AboutHighlightsSection from "./sections/AboutHighlightsSection";
import { FireProgressSection } from "./sections/FireProgressSection";
import { RoadmapSection } from "./sections/RoadmapSection";


export default function Sobre() {
    return (
        <>
            <PageIntro
                label="Sobre o projeto"
                title="SoulUp + SoulAI"
                description="Conheça a proposta do SoulAI, um avatar inteligente criado para tornar a experiência na SoulUp mais interativa, personalizada e conectada com ações sustentáveis."
            />
            <AboutObjectiveSection />
            <AboutHighlightsSection />
            <FireProgressSection />
            <RoadmapSection />
        </>
    );
}

