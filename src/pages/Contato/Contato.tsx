import { useForm } from "react-hook-form";

import PageIntro  from "../../components/PageIntro/PageIntro";
import type { ContactFormData } from "../../types/form";

export default function Contato() {
  // Configura o React Hook Form usando o tipo ContactFormData
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // Por enquanto o envio apenas limpa o formulário.
  // O modal será criado no próximo passo.
  function enviarFormulario() {
    reset();
  }

  return (
    <>
      <PageIntro
        label="Contato"
        title="Fale com a equipe"
        description="Tem alguma dúvida sobre o SoulAI, o projeto ou a proposta da solução? Envie uma mensagem para a equipe."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Formulário */}
          <form
            className="grid gap-5 rounded-xl border border-soul-blue/10 bg-white p-6 shadow-card md:p-8"
            onSubmit={handleSubmit(enviarFormulario)}
            noValidate
          >
            {/* Nome */}
            <div className="grid gap-2">
              <label
                className="font-black text-soul-ink"
                htmlFor="nome"
              >
                Nome
              </label>

              <input
                className="rounded-xl border border-soul-blue/10 bg-white px-4 py-3 outline-none transition duration-300 focus:border-soul-cyan focus:ring-2 focus:ring-soul-cyan/20"
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                {...register("nome", {
                  required: "Informe seu nome.",
                  minLength: {
                    value: 3,
                    message: "O nome deve ter pelo menos 3 caracteres.",
                  },
                })}
              />

              <small className="min-h-5 font-bold text-red-600">
                {errors.nome?.message}
              </small>
            </div>

            {/* E-mail */}
            <div className="grid gap-2">
              <label
                className="font-black text-soul-ink"
                htmlFor="email"
              >
                E-mail
              </label>

              <input
                className="rounded-xl border border-soul-blue/10 bg-white px-4 py-3 outline-none transition duration-300 focus:border-soul-cyan focus:ring-2 focus:ring-soul-cyan/20"
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email", {
                  required: "Informe seu e-mail.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um e-mail válido.",
                  },
                })}
              />

              <small className="min-h-5 font-bold text-red-600">
                {errors.email?.message}
              </small>
            </div>

            {/* Assunto */}
            <div className="grid gap-2">
              <label
                className="font-black text-soul-ink"
                htmlFor="assunto"
              >
                Assunto
              </label>

              <select
                className="rounded-xl border border-soul-blue/10 bg-white px-4 py-3 outline-none transition duration-300 focus:border-soul-cyan focus:ring-2 focus:ring-soul-cyan/20"
                id="assunto"
                defaultValue=""
                {...register("assunto", {
                  required: "Selecione um assunto.",
                })}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>

                <option value="projeto">
                  Projeto
                </option>

                <option value="equipe">
                  Equipe
                </option>

                <option value="duvida">
                  Dúvidas
                </option>
              </select>

              <small className="min-h-5 font-bold text-red-600">
                {errors.assunto?.message}
              </small>
            </div>

            {/* Mensagem */}
            <div className="grid gap-2">
              <label
                className="font-black text-soul-ink"
                htmlFor="mensagem"
              >
                Mensagem
              </label>

              <textarea
                className="min-h-36 resize-y rounded-xl border border-soul-blue/10 bg-white px-4 py-3 outline-none transition duration-300 focus:border-soul-cyan focus:ring-2 focus:ring-soul-cyan/20"
                id="mensagem"
                placeholder="Digite sua mensagem"
                {...register("mensagem", {
                  required: "Digite uma mensagem.",
                  minLength: {
                    value: 10,
                    message: "A mensagem deve ter pelo menos 10 caracteres.",
                  },
                })}
              />

              <small className="min-h-5 font-bold text-red-600">
                {errors.mensagem?.message}
              </small>
            </div>

            <button
              className="w-max rounded-full border border-soul-blue/10 bg-soul-soft/80 px-6 py-3 font-black text-soul-ink transition-all duration-300 hover:-translate-y-1 hover:text-soul-blue hover:shadow-future"
              type="submit"
            >
              Enviar mensagem
            </button>
          </form>

          {/* Informações de contato */}
          <aside className="grid h-max gap-4 rounded-xl border border-soul-blue/10 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-future md:p-8">
            <h2 className="text-3xl font-black text-soul-ink">
              Informações de Contato
            </h2>

            <p>
              Tem dúvidas sobre o projeto SoulAI ou quer saber mais sobre a
              solução? Envie uma mensagem para a equipe.
            </p>

            <a
              className="inline-flex w-max items-center font-extrabold text-soul-blue transition duration-300 hover:translate-x-1 hover:text-soul-purple"
              href="mailto:contato@soulai.com?subject=Contato%20pelo%20site"
              aria-label="Enviar e-mail para contato da SoulAI"
            >
              <i
                className="fa-solid fa-envelope mr-2 text-soul-yellow"
                aria-hidden="true"
              />

              contato@soulai.com
            </a>

            <p>
              <i
                className="fa-solid fa-location-dot mr-2 text-soul-yellow"
                aria-hidden="true"
              />

              São Paulo/SP
            </p>
          </aside>

        </div>
      </section>
    </>
  );
}