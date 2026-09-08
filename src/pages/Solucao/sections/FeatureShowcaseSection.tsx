import { Carrosel } from "../../../components/Carrossel/Carrossel";
import { functionalityCards } from "../../../data/solution";


export function FeatureShowcaseSection() {
    return (
        <Carrosel
            label="Principais recursos"
            title="O que aparece durante o uso"
            items={functionalityCards}
        />
    );
}
