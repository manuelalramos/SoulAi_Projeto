import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import ImagemAcessorio from "../../../components/ImagemAcessorio/ImagemAcessorio";
import type { Acessorio } from "../../../types/app";
import { obterImagemUrl } from "../../../data/imagens";

type DadosAcessorio = Omit<Acessorio, "id">;
type Props = {
    acessorios: Acessorio[];
    ocupado: boolean;
    salvar: (dados: DadosAcessorio, id?: number) => Promise<boolean>;
    excluir: (id: number) => Promise<boolean>;
};

const acessorioVazio: DadosAcessorio = { nome: "", tipo: "Touca", raridade: "Comum", preco: 0, imagemUrl: "" };

export default function AcessoriosAdmin({ acessorios, ocupado, salvar, excluir }: Props) {
    const [idEdicao, setIdEdicao] = useState<number>();
    const [idExclusao, setIdExclusao] = useState<number>();

    const { register, handleSubmit, reset, setFocus, control, formState: { errors, isSubmitting } } = useForm<DadosAcessorio>({ defaultValues: acessorioVazio });

    const imagemUrl = useWatch({ control, name: "imagemUrl" });

    const nome = useWatch({ control, name: "nome" });
    const bloqueado = ocupado || isSubmitting;
    const tipos = Array.from(new Set(["Touca", "Óculos", "Camiseta", "Mochila", "Tênis", ...acessorios.map((item) => item.tipo)]));

    const raridades = Array.from(new Set(["Comum", "Raro", "Épico", ...acessorios.map((item) => item.raridade)]));

    function editar(acessorio: Acessorio) {
        setIdEdicao(acessorio.id);
        reset({ nome: acessorio.nome, tipo: acessorio.tipo, raridade: acessorio.raridade, preco: acessorio.preco, imagemUrl: acessorio.imagemUrl ?? "" });
        setFocus("nome");
    }

    function limparFormulario() {
        setIdEdicao(undefined);
        reset(acessorioVazio);
    }

    async function enviarFormulario(dados: DadosAcessorio) {
        if (await salvar(dados, idEdicao)) limparFormulario();
    }

    return (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
            <form className="rounded-2xl border border-soul-line bg-white p-6" onSubmit={handleSubmit(enviarFormulario)} noValidate>

                <h2 className="mb-5 text-xl font-extrabold text-soul-ink">{idEdicao ? "Editar acessório" : "Novo acessório"}</h2>

                <fieldset disabled={bloqueado} className="grid gap-4 disabled:opacity-60">
                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="nome-acessorio">Nome</label>
                        <input id="nome-acessorio" className="campo-app" maxLength={150} aria-invalid={!!errors.nome} aria-describedby="erro-nome-acessorio" {...register("nome", { required: "Informe o nome.", validate: (valor) => !!valor.trim() || "Informe o nome." })} />
                        <small id="erro-nome-acessorio" className="font-bold text-red-600">{errors.nome?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="imagemUrl">Link da imagem</label>
                        <input id="imagemUrl" type="url" className="campo-app" placeholder="https://..." aria-invalid={!!errors.imagemUrl} aria-describedby="ajuda-imagem erro-imagem"
                            {...register("imagemUrl", { validate: (valor) => !valor?.trim() || !!obterImagemUrl(valor) || "Cole um link de imagem que comece com http:// ou https://." })} />
                        <small id="ajuda-imagem">Use o link direto da imagem do acessório.</small>
                        <small id="erro-imagem" className="font-bold text-red-600">{errors.imagemUrl?.message}</small>
                        <div className="grid h-32 place-items-center rounded-xl bg-soul-soft p-3" aria-label="Prévia da imagem do acessório"><ImagemAcessorio acessorio={{ nome, imagemUrl }} /></div>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="tipo">Tipo</label>
                        <select id="tipo" className="campo-app" {...register("tipo", { required: "Escolha o tipo." })}>{tipos.map((tipo) => <option key={tipo}>{tipo}</option>)}</select>
                        <small className="font-bold text-red-600">{errors.tipo?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="raridade">Raridade</label>
                        <select id="raridade" className="campo-app" {...register("raridade", { required: "Escolha a raridade." })}>{raridades.map((raridade) => <option key={raridade}>{raridade}</option>)}</select>
                        <small className="font-bold text-red-600">{errors.raridade?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold" htmlFor="preco">Preço em moedas</label>
                        <input id="preco" type="number" min={0} step={1} className="campo-app" aria-invalid={!!errors.preco} aria-describedby="erro-preco"
                            {...register("preco", { valueAsNumber: true, required: "Informe o preço.", validate: (valor) => Number.isSafeInteger(valor) && valor >= 0 && valor <= 2147483647 || "Use um número inteiro entre 0 e 2147483647." })} />
                        <small id="erro-preco" className="font-bold text-red-600">{errors.preco?.message}</small>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button type="submit" className="botao-app">{bloqueado ? "Salvando..." : "Salvar acessório"}</button>
                        {idEdicao && <button type="button" className="botao-secundario" onClick={limparFormulario}>Cancelar edição</button>}
                    </div>

                </fieldset>

            </form>

            <section aria-label="Acessórios cadastrados" className="grid gap-4">
                <h2 className="text-xl font-extrabold text-soul-ink">Acessórios cadastrados</h2>

                {acessorios.map((acessorio) => (
                    <article key={acessorio.id} className="min-w-0 rounded-2xl border border-soul-line bg-white p-5">
                        <div className="flex items-center gap-4">
                            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-soul-soft"><ImagemAcessorio acessorio={acessorio} /></div>
                            <div className="min-w-0"><h3 className="break-words font-extrabold text-soul-ink">{acessorio.nome}</h3><p className="mt-1 text-xs text-soul-purple">{acessorio.tipo} · {acessorio.raridade}</p><p className="mt-1 text-sm">{acessorio.preco} moedas</p></div>
                        </div>

                        {idExclusao === acessorio.id ? (
                            <div className="mt-4 rounded-xl bg-soul-soft p-3">
                                <p className="text-sm">Excluir este acessório?</p>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    <button type="button" className="botao-secundario" disabled={bloqueado} onClick={async () => { if (await excluir(acessorio.id)) setIdExclusao(undefined); }}>Confirmar exclusão</button>
                                    <button type="button" className="botao-secundario" disabled={bloqueado} onClick={() => setIdExclusao(undefined)}>Cancelar</button>
                                </div>

                            </div>

                        ) : (
                            <div className="mt-4 flex gap-3"><button type="button" className="botao-secundario" disabled={bloqueado} onClick={() => editar(acessorio)}>Editar</button><button type="button" className="botao-secundario" disabled={bloqueado} onClick={() => setIdExclusao(acessorio.id)}>Excluir</button></div>
                        )}

                    </article>
                    
                ))}

                {acessorios.length === 0 && <p>Nenhum acessório cadastrado.</p>}
                
            </section>
        </div>
    );
}
