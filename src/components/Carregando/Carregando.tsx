import { useEffect, useState } from "react";

// Aviso de carregamento com uma mensagem extra se a conexão demorar.
export default function Carregando() {
    const [demorando, setDemorando] = useState(false);

    useEffect(() => {
        const temporizador = window.setTimeout(() => setDemorando(true), 8000);
        return () => window.clearTimeout(temporizador);
    }, []);

    return (
        <div role="status" className="my-4 flex items-start gap-4 rounded-2xl border border-soul-cyan/30 bg-soul-soft p-4">
            <span aria-hidden="true" className="mt-0.5 inline-block h-7 w-7 shrink-0 animate-spin rounded-full border-[3px] border-soul-blue/15 border-t-soul-purple" />
            <div className="min-w-0">
                <p className="font-extrabold text-soul-ink">{demorando ? "Acordando o SoulAI, só um instante..." : "Carregando seu SoulAI..."}</p>
                <p className="mt-1 text-sm leading-relaxed text-soul-text">
                    {demorando ? <>A primeira conexão pode levar até <strong>90 segundos</strong>. Estamos preparando tudo para você.</> : "Só um instante. Estamos preparando tudo para você."}
                </p>
            </div>
        </div>
    );
}
