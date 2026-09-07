import { Carrosel } from "../../../components/Carrossel/Carrossel";
import { homeCards } from "../../../data/home";
export function HomeExperienceSection() {
    return (
        <Carrosel
            label="Experiência SoulAI"
            title="Como a solução transforma o uso da SoulUp"
            items={homeCards}
        />
    );
}
