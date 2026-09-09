import HeroSection from "./sections/HeroSection";
import { HomeAboutSection } from "./sections/HomeAboutSection";
import { HomeExperienceSection } from "./sections/HomeExperienceSection";

// Página inicial montada a partir das três seções principais da Home.
export default function Home() {
    return (
        <>
            {/* Hero apresenta o SoulAI logo no primeiro contato. */}
            <HeroSection />
            {/* Sobre resume a proposta e abre a demonstração do chat. */}
            <HomeAboutSection />
            {/* Carrossel destaca pontos da experiência SoulAI. */}
            <HomeExperienceSection />
        </>
    );
}
