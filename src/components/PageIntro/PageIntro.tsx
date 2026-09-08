type PageIntroProps = {
    label: string;
    title: string;
    description: string;
};
export default function PageIntro({ label, title, description }: PageIntroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-soul-gradient pb-20 pt-32 text-white md:pb-24 md:pt-36 lg:pb-28 lg:pt-40">
            {/* Grade decorativa igual à identidade visual da Home. */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:lineargradient(rgba(255,255,255,0.08)_1px,transparent_1px),lineargradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:60px_60px]"
                aria-hidden="true"
            />
            <div className="mx-auto w-[92%] max-w-[1180px]">
                <p className="font-black uppercase tracking-wide text-soul-yellow">
                    {label}
                </p>
                <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                    {title}
                </h1>
                <p className="mt-4 max-w-3xl text-base text-white/85 md:text-lg">
                    {description}
                </p>
            </div>
            {/* Suaviza a passagem do topo colorido para o conteúdo branco. */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-b fromtransparent to-white"
                aria-hidden="true"
            />
        </section>
    );
}