import { useState } from "react";

type Props = {
    consentimentoObrigatorio: boolean;
    alterarConsentimento: (aceito: boolean) => void;
};

// Opções de consentimento apresentadas durante o cadastro.
export default function ConsentimentoCadastro({ consentimentoObrigatorio, alterarConsentimento }: Props) {
    const [notificacoes, setNotificacoes] = useState(false);
    const [melhoriaServico, setMelhoriaServico] = useState(false);

    const opcoes = [
        {
            id: "consentimento-progresso",
            titulo: "Dados de uso e progresso",
            descricao: "Armazenamos seu progresso nas missões, moedas e ofensiva para personalizar sua experiência. Obrigatório para usar o app.",
            obrigatorio: true,
            ligado: consentimentoObrigatorio,
            alterar: alterarConsentimento,
        },
        {
            id: "consentimento-notificacoes",
            titulo: "Notificações personalizadas",
            descricao: "Envio de lembretes de missões e conquistas. Opcional — você pode desativar nas configurações do celular.",
            obrigatorio: false,
            ligado: notificacoes,
            alterar: setNotificacoes,
        },
        {
            id: "consentimento-melhoria",
            titulo: "Melhoria do serviço",
            descricao: "Dados anônimos de comportamento para aprimorar o SoulAI. Opcional e sem identificação pessoal.",
            obrigatorio: false,
            ligado: melhoriaServico,
            alterar: setMelhoriaServico,
        },
    ];

    return (
        <section aria-labelledby="titulo-consentimento" className="mt-2 rounded-2xl border border-soul-line bg-soul-soft p-3 sm:p-4">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-soul-purple/10 text-soul-purple">
                <i className="fa-solid fa-lock" aria-hidden="true" />
            </span>
            <h3 id="titulo-consentimento" className="text-lg font-extrabold text-soul-ink">Seus dados, seu controle</h3>
            <p className="mb-5 mt-2 text-sm leading-relaxed">Em conformidade com a LGPD, precisamos do seu consentimento</p>

            <div className="grid gap-3">
                {opcoes.map((opcao) => (
                    <label key={opcao.id} htmlFor={opcao.id} className="flex cursor-pointer flex-wrap items-start gap-x-3 gap-y-2 rounded-2xl border border-soul-line bg-white p-4">

                        <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                                <span id={`${opcao.id}-titulo`} className="text-sm font-extrabold text-soul-ink">{opcao.titulo}</span>
                                {opcao.obrigatorio && <span id={`${opcao.id}-selo`} className="rounded-full bg-soul-purple/10 px-2 py-1 text-[10px] font-extrabold text-soul-blue">Obrigatório</span>}
                            </span>

                        </span>

                        <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0">
                            <input id={opcao.id} type="checkbox" role="switch" required={opcao.obrigatorio} checked={opcao.ligado}
                                aria-labelledby={`${opcao.id}-titulo${opcao.obrigatorio ? ` ${opcao.id}-selo` : ""}`} aria-describedby={`${opcao.id}-descricao`}
                                onChange={(evento) => opcao.alterar(evento.target.checked)} className="peer sr-only" />

                            <span aria-hidden="true" className="h-6 w-11 rounded-full bg-soul-line transition-colors peer-checked:bg-soul-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-soul-purple" />
                            
                            <span aria-hidden="true" className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5 motion-reduce:transition-none" />
                        </span>

                        <span id={`${opcao.id}-descricao`} className="block w-full text-sm leading-relaxed">{opcao.descricao}</span>

                    </label>
                ))}
            </div>
        </section>
    );
}
