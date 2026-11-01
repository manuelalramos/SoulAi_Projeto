import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Missao } from "../../../types/app";

type DadosMissao = Omit<Missao, "id" | "concluida" | "atribuida">;
type Props = {
    missoes: Missao[];
    ocupado: boolean;
    salvar: (dados: DadosMissao, id?: number) => Promise<boolean>;
    excluir: (id: number) => Promise<boolean>;
};

const missaoVazia: DadosMissao = { titulo: "", descricao: "", recompensa: 0, ativa: true };

export default function MissoesAdmin({ missoes, ocupado, salvar, excluir }: Props) {
    const [idEdicao, setIdEdicao] = useState<number>();
    const [idExclusao, setIdExclusao] = useState<number>();
    const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting } } = useForm<DadosMissao>({ defaultValues: missaoVazia });
    const bloqueado = ocupado || isSubmitting;

    function editar(missao: Missao) {
        setIdEdicao(missao.id);
        reset({ titulo: missao.titulo, descricao: missao.descricao, recompensa: missao.recompensa, ativa: missao.ativa });
        setFocus("titulo");
    }

    function limparFormulario() {
        setIdEdicao(undefined);
        reset(missaoVazia);
    }

    async function enviarFormulario(dados: DadosMissao) {
        if (await salvar(dados, idEdicao)) limparFormulario();
    }

    return (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">

            <form className="rounded-2xl border border-soul-line bg-white p-6" onSubmit={handleSubmit(enviarFormulario)} noValidate>

                <h2 className="mb-5 text-xl font-extrabold text-soul-ink">{idEdicao ? "Editar missão" : "Nova missão"}</h2>

                <fieldset disabled={bloqueado} className="grid gap-4 disabled:opacity-60">

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="titulo">Título</label>
                        <input id="titulo" className="campo-app" maxLength={150} aria-invalid={!!errors.titulo} aria-describedby="erro-titulo" {...register("titulo", { required: "Informe o título.", validate: (valor) => !!valor.trim() || "Informe o título." })} />
                        <small id="erro-titulo" className="font-bold text-red-600">{errors.titulo?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="descricao">Descrição</label>
                        <textarea id="descricao" className="campo-app min-h-28 resize-y" maxLength={1000} {...register("descricao")} />
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="recompensa">Recompensa em moedas</label>
                        <input id="recompensa" type="number" min={0} step={1} className="campo-app" aria-invalid={!!errors.recompensa} aria-describedby="erro-recompensa"
                            {...register("recompensa", { valueAsNumber: true, required: "Informe a recompensa.", validate: (valor) => Number.isSafeInteger(valor) && valor >= 0 && valor <= 2147483647 || "Use um número inteiro entre 0 e 2147483647." })} />
                        <small id="erro-recompensa" className="font-bold text-red-600">{errors.recompensa?.message}</small>
                    </div>

                    <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" className="h-4 w-4 accent-soul-purple" {...register("ativa")} />Missão ativa</label>
                    <div className="flex flex-wrap gap-3">
                        <button type="submit" className="botao-app">{bloqueado ? "Salvando..." : "Salvar missão"}</button>
                        {idEdicao && <button type="button" className="botao-secundario" onClick={limparFormulario}>Cancelar edição</button>}
                    </div>

                </fieldset>
            </form>

            <section aria-label="Missões cadastradas" className="grid gap-4">
                <h2 className="text-xl font-extrabold text-soul-ink">Missões cadastradas</h2>
                {missoes.map((missao) => (
                    <article className={`min-w-0 rounded-2xl border border-l-4 border-soul-line bg-white p-5 ${missao.ativa ? "border-l-green-500" : "border-l-red-500"}`} key={missao.id}>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${missao.ativa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{missao.ativa ? "Ativa" : "Inativa"}</span>
                            <p className="text-xs font-bold text-soul-text">{missao.recompensa} moedas</p>
                        </div>

                        <h3 className="mt-2 break-words font-extrabold text-soul-ink">{missao.titulo}</h3>
                        <p className="mt-2 break-words text-sm">{missao.descricao}</p>
                        {idExclusao === missao.id ? (
                            <div className="mt-4 rounded-xl bg-soul-soft p-3">
                                <p className="text-sm">Excluir esta missão?</p>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    <button type="button" className="botao-secundario" disabled={bloqueado} onClick={async () => { if (await excluir(missao.id)) setIdExclusao(undefined); }}>Confirmar exclusão</button>
                                    <button type="button" className="botao-secundario" disabled={bloqueado} onClick={() => setIdExclusao(undefined)}>Cancelar</button>
                                </div>

                            </div>

                        ) : (
                            <div className="mt-4 flex gap-3">
                                <button type="button" className="botao-secundario" disabled={bloqueado} onClick={() => editar(missao)}>Editar</button>
                                <button type="button" className="botao-secundario" disabled={bloqueado} onClick={() => setIdExclusao(missao.id)}>Excluir</button>
                            </div>

                        )}

                    </article>
                ))}

                {missoes.length === 0 && <p>Nenhuma missão cadastrada.</p>}

            </section>
            
        </div>
    );
}
