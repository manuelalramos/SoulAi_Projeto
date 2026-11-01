import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Carregando from "../../components/Carregando/Carregando";
import { cadastrarUsuario, mensagemErro } from "../../data/api";
import useSessao from "../../hooks/useSessao";
import AcessoLayout from "../../layouts/AcessoLayout/AcessoLayout";
import type { DadosCadastro } from "../../types/app";
import ConsentimentoCadastro from "./sections/ConsentimentoCadastro";

// Página que cria a conta depois de validar os dados e o consentimento.
export default function Cadastro() {
    const { sessao } = useSessao();
    const navigate = useNavigate();
    const [erro, setErro] = useState("");
    const [consentimentoObrigatorio, setConsentimentoObrigatorio] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DadosCadastro>();

    if (sessao) return <Navigate to={sessao.tipo === "administrador" ? "/admin" : "/app"} replace />;

    async function enviarFormulario(dados: DadosCadastro) {
        if (!consentimentoObrigatorio) return;
        setErro("");

        try {
            await cadastrarUsuario({ ...dados, nome: dados.nome.trim(), email: dados.email.trim() });
            navigate("/login", { replace: true, state: { cadastroConcluido: true } });

        } catch (erro) {
            setErro(mensagemErro(erro));
        }
    }

    return (
        <AcessoLayout titulo="Sua jornada começa aqui." descricao="Crie sua conta, escolha uma missão e dê o primeiro passo com o seu foguinho.">

            <h2 className="mb-6 text-2xl font-extrabold text-soul-ink">Criar conta</h2>
            <form onSubmit={handleSubmit(enviarFormulario)} noValidate>

                <fieldset disabled={isSubmitting} className="grid gap-4 disabled:opacity-70">
                    <div className="grid gap-2">
                        <label className="font-bold text-soul-ink" htmlFor="nome">Nome</label>
                        <input id="nome" autoComplete="name" maxLength={100} className="campo-app" aria-invalid={!!errors.nome} aria-describedby="erro-nome"
                            {...register("nome", { required: "Informe seu nome.", validate: (nome) => nome.trim().length >= 3 || "O nome deve ter pelo menos 3 caracteres." })} />
                        <small id="erro-nome" className="font-bold text-red-600">{errors.nome?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold text-soul-ink" htmlFor="email">E-mail</label>
                        <input id="email" type="email" autoComplete="email" className="campo-app" aria-invalid={!!errors.email} aria-describedby="erro-email"
                            {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um e-mail válido." } })} />
                        <small id="erro-email" className="font-bold text-red-600">{errors.email?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold text-soul-ink" htmlFor="senha">Senha</label>
                        <input id="senha" type="password" autoComplete="new-password" className="campo-app" aria-invalid={!!errors.senha} aria-describedby="erro-senha"
                            {...register("senha", { required: "Informe uma senha.", minLength: { value: 6, message: "Use pelo menos 6 caracteres na senha." } })} />
                        <small id="erro-senha" className="font-bold text-red-600">{errors.senha?.message}</small>
                    </div>

                    <ConsentimentoCadastro consentimentoObrigatorio={consentimentoObrigatorio} alterarConsentimento={setConsentimentoObrigatorio} />
                
                    {erro && <p role="alert" className="text-sm font-bold text-red-600">{erro}</p>}
                    <p className="text-sm leading-relaxed">Ao continuar, você declara ter lido e concordado com a <strong>Política de Privacidade da SoulUp.</strong></p>
                    <button type="submit" className="botao-app" disabled={!consentimentoObrigatorio || isSubmitting} aria-describedby={!consentimentoObrigatorio ? "aviso-consentimento" : undefined}>{isSubmitting ? "Criando conta..." : "Criar conta"}</button>
                    {!consentimentoObrigatorio && <p id="aviso-consentimento" role="status" className="text-center text-xs font-bold text-soul-blue">Ative o consentimento obrigatório para continuar</p>}
                </fieldset>

                {isSubmitting && <Carregando />}
                
            </form>
            <p className="mt-6 text-center text-sm">Já tem conta? <Link to="/login" className="font-bold text-soul-blue hover:underline">Entrar</Link></p>
        </AcessoLayout>
    );
}
