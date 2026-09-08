import fogoAnimado from "../../../assets/media/fogo.png";


export function FireProgressSection() {
    return (
        <section className="relative overflow-hidden bg-soul-soft/60 py-16 md:py-20">
            <div className="mx-auto w-[92%] max-w-[1180px]">
                <article className="grid grid-cols-1 items-center gap-6 rounded-xl border border-soul-cyan/40 bgwhite/90 p-7 shadow-card md:p-10 lg:grid-cols-[120px_1fr]">
                    <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-soul-yellow to-[#fff5bd] text-4xl text-soul-blue shadow-card">
                        <img
                            src={fogoAnimado}
                            alt=""
                            aria-hidden="true"
                            className="h-12 w-12 object-contain [filter:brightness(0)_saturate(100%)_invert(27%)_sepia(74%)_saturate(2441%)_hue-rotate(226deg)_brightness(80%)_contrast(93%)]"
                        />
                    </div>
                    <div>
                        <p className="font-black uppercase text-soul-blue">Engajamento</p>
                        <h2 className="mt-1 text-3xl font-black text-soul-ink md:text-4xl">
                            Foguinho progressivo
                        </h2>
                        <p className="mt-4">
                            Um dos diferenciais do SoulAI é o sistema de <strong>foguinho progressivo</strong>.
                            Diferente de outros aplicativos, em que uma ação simples já mantém a
                            sequência ativa, no SoulAI cada interação contribui com uma
                            <strong> porcentagem diferente</strong> para o preenchimento do fogo. <strong>Ações simples</strong>,
                            como curtir ou comentar, <strong>avançam menos</strong>, enquanto <strong>ações mais
                            relevantes</strong>, como participar de comunidades ou registrar uma ação
                            sustentável, geram um <strong>progresso maior.</strong>
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
}
