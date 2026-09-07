import HeroSection from "./sections/HeroSection";
import { HomeAboutSection } from "./sections/HomeAboutSection";
import { HomeExperienceSection } from "./sections/HomeExperienceSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <HomeAboutSection />
            <HomeExperienceSection />
        </>
    );
}
