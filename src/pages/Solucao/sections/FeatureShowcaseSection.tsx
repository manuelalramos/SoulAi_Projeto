import { Carrosel } from "../../../components/Carrossel/Carrossel";
import { functionalityCards } from "../../../data/solution";


// Reutiliza o carrossel para destacar os recursos principais da solução.
export function FeatureShowcaseSection() {
    return (
        <Carrosel
            label="Principais recursos"
            title="O que aparece durante o uso"
            items={functionalityCards}
        />
    );
}
