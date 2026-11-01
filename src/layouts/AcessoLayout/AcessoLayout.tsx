import type { ReactNode } from "react";
import { avatarBase } from "../../data/avatar";

export default function AcessoLayout({ titulo, descricao, children }: {
    titulo: string;
    descricao: string;
    children: ReactNode;
}) {
    return (
        <section className="bg-soul-soft pb-20 pt-28 md:pt-36">
            <div className="mx-auto grid w-[92%] max-w-[960px] items-center gap-10 md:grid-cols-2 md:gap-16">
                <div>
                    <p className="font-extrabold uppercase tracking-wide text-soul-purple">Seu espaço SoulAI</p>
                    
                    <h1 className="mt-3 text-4xl font-extrabold leading-tight text-soul-ink">{titulo}</h1>
                    <p className="mt-4 max-w-sm">{descricao}</p>
                    <img className="mx-auto mt-8 hidden h-60 w-60 object-contain drop-shadow-xl md:block" src={avatarBase} alt="Foguinho do SoulAI" />
                </div>
                <div className="rounded-2xl border border-soul-line bg-white p-6 shadow-card sm:p-8">{children}</div>
            </div>
        </section>
    );
}
