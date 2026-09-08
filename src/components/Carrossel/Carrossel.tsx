import { useState } from "react";
import type { CardContent } from "../../types/card";
type CarrosselProps = {
    label: string;
    title: string;
    items: CardContent[];
};



export function Carrosel({ label, title, items }: CarrosselProps) {
    const [indiceAtual, setIndiceAtual] = useState(0);
    function mostrarAnterior() {
        if (indiceAtual === 0) {
            setIndiceAtual(items.length - 1);
        } else {
            setIndiceAtual(indiceAtual - 1);
        }
    }
    function mostrarProximo() {
        if (indiceAtual === items.length - 1) {
            setIndiceAtual(0);
        } else {
            setIndiceAtual(indiceAtual + 1);
        }
    }
    const itemAtual = items[indiceAtual];
    return (
        <section className="relative overflow-hidden bg-[lineargradient(180deg,#ffffff_0%,#f5f6ff_28%,#eef7ff_70%,#ffffff_100%)] py-16 md:py-20">
            <div className="mx-auto w-[92%] max-w-[1180px]">
                <p className="font-black uppercase text-soul-blue">{label}</p>
                <h2 className="mt-1 max-w-3xl text-3xl font-black leading-tight text-soul-ink md:text-5xl">
                    {title}
                </h2>
                <div className="mt-7 flex items-center gap-2 md:gap-4">
                    <button
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soul-blue text-white shadow-card transition hover:-translate-y-1 hover:bg-soul-purple md:h-12 md:w-12"
                        type="button"
                        aria-label="Voltar card"
                        onClick={mostrarAnterior}>
                        <i className="fa-solid fa-angle-left" aria-hidden="true" />
                    </button>
                    <article className="min-h-[210px] flex-1 rounded-xl border border-soul-cyan/40 bg-white/90 p-7 shadow-card transition hover:-translate-y-1 hover:shadow-future">
                        <h3 className="text-2xl font-black text-soul-ink md:text-3xl">
                            {itemAtual.title}
                        </h3>
                        <p className="mt-3 max-w-3xl">{itemAtual.description}</p>
                    </article>
                    <button
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soul-blue text-white shadow-card transition hover:-translate-y-1 hover:bg-soul-purple md:h-12 md:w-12"
                        type="button"
                        aria-label="Próximo card"
                        onClick={mostrarProximo}>
                        <i className="fa-solid fa-angle-right" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-5 flex justify-center gap-2">
                    {items.map((item, index) => (
                        <button
                            key={item.title}
                            className={
                                index === indiceAtual
                                    ? "h-2.5 w-6 rounded-full bg-gradient-to-r from-soul-blue to-soul-cyan"
                                    : "h-2.5 w-2.5 rounded-full bg-soul-line transition hover:scale-125 hover:bg-soul-purple"
                            }
                            type="button"
                            aria-label={`Ir para o card ${item.title}`}
                            onClick={() => setIndiceAtual(index)}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
