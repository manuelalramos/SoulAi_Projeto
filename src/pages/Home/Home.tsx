import HeroSection from "./sections/HeroSection";
import { HomeAboutSection } from "./sections/HomeAboutSection";
import { HomeExperienceSection } from "./sections/HomeExperienceSection";
export function Home() {
    return (
        <>
            <HeroSection />
            <HomeAboutSection />
            <HomeExperienceSection />
        </>
    );
}
