import { Link } from "react-router-dom";
import { FAQItem } from "../../components/FAQItem/FAQItem";
import PageIntro  from "../../components/PageIntro/PageIntro";
import { faqQuestions } from "../../data/faq";

// Página que exibe as dúvidas frequentes e direciona o usuário para contato.
export default function FAQ() {
    return (
        <>
            <PageIntro
                label="FAQ"
                title="Perguntas frequentes"
                description="Tire suas principais dúvidas sobre o SoulAI, sua proposta, funcionamento e apoio no pagamento da conta de luz para os usuários da plataforma SoulUp."
            />
            <section className="bg-white py-16">
                <div className="mx-auto grid w-[92%] max-w-[1180px] gap-4">
                    {/* Gera um item interativo para cada pergunta cadastrada. */}
                    {faqQuestions.map((item, index) => (
                        <FAQItem key={item.question} item={item} defaultOpen={index === 0} />
                    ))}
                </div>
            </section>
            <section className="pb-20">
                <div className="mx-auto w-[92%] max-w-[700px] rounded-xl border border-soul-cyan/40 bg-soul-soft/90 p-8 text-center shadow-card">
                    <h2 className="text-3xl font-black text-soul-ink">Ficou com alguma dúvida?</h2>
                    <p className="mt-2">Entre em contato com a gente!</p>
                    {/* Link final para levar dúvidas restantes até o formulário. */}
                    <Link
                        className="relative z-0 mt-5 inline-flex min-h-12 min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-full border border-soul-blue/10 bg-white px-6 py-3 font-black text-soul-ink transition duration-300 before:absolute before:inset-0 before:-z-10 before:w-0 before:bg-gradient-to-r before:from-soul-yellow before:to-soul-cyan before:transition-all before:duration-500 before:content-[''] hover:-translate-y-1 hover:border-transparent hover:shadow-future hover:before:w-full"
                        to="/contato"
                        aria-label="Entrar em contato"
                    >
                        Fale com a gente!
                        <i className="fa-solid fa-arrow-up rotate-45" aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </>
    );
}
