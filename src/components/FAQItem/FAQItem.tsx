import { useState } from "react";
import type { FaqQuestion } from "../../types/faq";

// Props necessárias para renderizar uma pergunta do FAQ.
type FAQItemProps = {
    item: FaqQuestion;
    defaultOpen?: boolean;
};

// Componente que abre e fecha uma resposta individual do FAQ.
export function FAQItem({ item, defaultOpen = false }: FAQItemProps) {
    // Controla se a resposta está visível.
    const [aberto, setAberto] = useState(defaultOpen);
    return (
        <article className="overflow-hidden rounded-xl border border-soul-blue/10 bg-white shadow-card transition-all duration-300 hover:border-soul-cyan/50 hover:shadow-future">
            <button
                className="flex w-full items-center justify-between gap-4 bg-transparent p-6 text-left text-lg font-black text-soul-ink" 
                type="button"
                aria-expanded={aberto}
                onClick={() => setAberto(!aberto)}
            >
                <span>{item.question}</span>
                <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${aberto
                            ? "rotate-180 bg-gradient-to-r from-soul-yellow to-[#fff5bd] text-soul-ink"
                            : "bg-soul-soft text-soul-blue"
                        }`}
                    aria-hidden="true"
                >
                    <i className="fa-solid fa-caret-down" />
                </span>
            </button>
            {/* A resposta só aparece quando o item está aberto. */}
            {aberto && (
                <div className="border-t border-soul-line px-6 pb-6 pt-4">
                    <p>{item.answer}</p>
                </div>
            )}
        </article>
    );
}
