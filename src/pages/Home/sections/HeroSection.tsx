import avatarHero from "../../../assets/media/avatar_hero.mp4";

export default function HeroSection() {

    function irParaSobre() {
        document.getElementById("home")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <section className="relative isolate min-h-[680px] overflow-hidden bg-soul-gradient text-white md:min-h-[780px] lg:min-h-[900px]">
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:lineargradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)][background-size:70px_70px]"
                aria-hidden="true"
            />
            <div className="relative mx-auto min-h-[680px] w-[92%] max-w-[1180px] text-center md:min-h-[780px] lg:min-h-[900px]">
                <p className="absolute left-1/2 top-24 z-10 w-full -translate-x-1/2 font-black uppercase text-soul-yellow md:top-24">
                    Apresentamos
                </p>
                <h1 className="absolute left-1/2 top-32 z-10 w-screen -translate-x-1/2 whitespace-nowrap text-[84px] font-black leading-none text-white/60 md:top-28 md:text-[150px] lg:top-20 lg:text-[250px]">
                    SoulAI
                </h1>
                <video
                    className="pointer-events-none absolute left-1/2 top-40 z-20 w-[880px] max-w-none -translate-x-1/2 mix-blendlighten md:top-36 md:w-[1180px] lg:top-32 lg:w-[1600px] mix-blend-screen"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    aria-label="Vídeo de apresentação da SoulAI"
                    src={avatarHero}
                />
                <button
                    className="absolute bottom-12 left-1/2 z-30 inline-flex w-[min(400px,82vw)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white/90 px-6 py-3 font-black text-soul-blue shadow-xl backdrop-blur transition duration-300 before:absolute before:inset-0 before:grid before:origin-bottom before:scale-y-0 before:place-items-center before:bg-gradient-to-r before:from-soul-yellow before:to-[#fff5bd] before:text-3xl before:text-soul-ink before:content-['↓'] before:transition-transform before:duration-300 hover:text-transparent hover:before:scale-y-100"
                    type="button"
                    onClick={irParaSobre}
                >
                    Conheça o SoulAI
                </button>
            </div>
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-52 bg-gradient-to-b from-transparent via-
[#f7f8ff] to-white"
                aria-hidden="true"
            />
        </section>
    );
}