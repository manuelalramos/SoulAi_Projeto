import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";
import { obterImagemUrl } from "../../data/imagens";
import useProgresso from "../../hooks/useProgresso";
import type { DadosPerfil } from "../../types/app";
import ConfirmarSenha from "./sections/ConfirmarSenha";

// Formulário para atualizar os dados e a foto do perfil.
export default function EditarPerfil() {
    const { dados, ocupado, erroAcao, salvarPerfil, limparAvisos } = useProgresso();
    const navigate = useNavigate();

    const [confirmacao, setConfirmacao] = useState<DadosPerfil | null>(null);
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<DadosPerfil>({
        defaultValues: { nome: dados?.usuario.nome ?? "", email: dados?.usuario.email ?? "", senha: "", fotoUrl: dados?.usuario.fotoUrl ?? "" },
    });
    
    const fotoUrl = useWatch({ control, name: "fotoUrl" });
    const bloqueado = ocupado || isSubmitting;
    if (!dados) return null;

    async function salvar(perfil: DadosPerfil) {
        if (await salvarPerfil(perfil)) {
            setConfirmacao(null);
            navigate("/app/perfil", { replace: true });
        }
    }

    // Pede uma confirmação extra quando a pessoa também troca a senha.
    async function enviarFormulario(perfil: DadosPerfil) {
        limparAvisos();
        if (perfil.senha) {
            setConfirmacao(perfil);
            return;
        }
        await salvar(perfil);
    }

    return (
        <>
            <h1 className="text-3xl font-extrabold text-soul-ink">Editar perfil</h1>
            <p className="mb-8 mt-2">Atualize seus dados e escolha uma foto para o seu perfil.</p>
            <form className="max-w-2xl rounded-2xl border border-soul-line bg-white p-6 shadow-card sm:p-8" onSubmit={handleSubmit(enviarFormulario)} noValidate>

                <fieldset disabled={bloqueado} className="grid gap-5 disabled:opacity-70">
                    <div className="flex items-center gap-5">
                        <FotoPerfil fotoUrl={fotoUrl} nome={dados.usuario.nome} grande />
                        <div><p className="font-bold text-soul-ink">Sua foto</p><p className="mt-1 text-sm">A prévia muda quando você cola o link abaixo.</p></div>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="fotoUrl" className="font-bold text-soul-ink">Link da foto</label>
                        <input id="fotoUrl" type="url" className="campo-app" placeholder="https://..." aria-invalid={!!errors.fotoUrl} aria-describedby="ajuda-foto erro-foto"
                            {...register("fotoUrl", { validate: (valor) => !valor.trim() || !!obterImagemUrl(valor) || "Cole um link de imagem que comece com http:// ou https://." })} />
                        <small id="ajuda-foto" className="text-soul-text">Use o link direto de uma imagem. Deixe vazio para usar o ícone padrão.</small>

                        <small id="erro-foto" className="font-bold text-red-600">{errors.fotoUrl?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="nome" className="font-bold text-soul-ink">Nome</label>
                        <input id="nome" className="campo-app" autoComplete="name" maxLength={100} aria-invalid={!!errors.nome} aria-describedby="erro-nome"
                            {...register("nome", { required: "Informe seu nome.", validate: (valor) => valor.trim().length >= 3 || "O nome deve ter pelo menos 3 caracteres." })} />
                        <small id="erro-nome" className="font-bold text-red-600">{errors.nome?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="email" className="font-bold text-soul-ink">E-mail</label>
                        <input id="email" type="email" className="campo-app" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="erro-email"
                            {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um e-mail válido." } })} />
                        <small id="erro-email" className="font-bold text-red-600">{errors.email?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="senha" className="font-bold text-soul-ink">Nova senha</label>
                        <input id="senha" type="password" className="campo-app" autoComplete="new-password" aria-invalid={!!errors.senha} aria-describedby="ajuda-senha erro-senha"
                            {...register("senha", { validate: (valor) => !valor || (valor.length >= 6 && !!valor.trim()) || "Use pelo menos 6 caracteres na nova senha." })} />
                        <small id="ajuda-senha" className="text-soul-text">Deixe em branco para manter sua senha atual.</small>

                        <small id="erro-senha" className="font-bold text-red-600">{errors.senha?.message}</small>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button type="submit" className="botao-app">{bloqueado ? "Salvando..." : "Salvar alterações"}</button>
                        <Link to="/app/perfil" className="botao-secundario" aria-disabled={bloqueado} onClick={(evento) => { if (bloqueado) evento.preventDefault(); }}>Cancelar</Link>
                    </div>

                </fieldset>
                
            </form>
            {confirmacao && <ConfirmarSenha ocupado={ocupado} erro={erroAcao} confirmar={() => void salvar(confirmacao)} cancelar={() => setConfirmacao(null)} />}
        </>
    );
}
