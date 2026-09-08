import { projectHighlights } from "../../../data/about";

export default function AboutHighlightsSection() {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 gap-5 md:grid-cols-3">
                {projectHighlights.map((card) => (
                    <article
                        className="relative overflow-hidden rounded-xl border border-soul-blue/10 bg-white/90 p-6 shadowcard transition-all duration-300 hover:-translate-y-1 hover:border-soul-cyan/50 hover:shadow-future"
                        key={card.title}
                    >
                        <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-soul-yellow to-soul-cyan" />
                        <h3 className="text-2xl font-black text-soul-ink">{card.title}</h3>
                        <p className="mt-3">{card.text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
