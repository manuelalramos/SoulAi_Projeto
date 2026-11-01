import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import Carregando from "../../components/Carregando/Carregando";
import { credenciaisInvalidas, mensagemErro } from "../../data/api";
import useSessao from "../../hooks/useSessao";
import AcessoLayout from "../../layouts/AcessoLayout/AcessoLayout";
import type { Credenciais } from "../../types/app";

// Página de entrada para usuários e administradores.
export default function Login() {
    const { sessao, entrar } = useSessao();
    const [parametros] = useSearchParams();
    const administrador = parametros.get("admin") === "1";
    const location = useLocation();
    const [erro, setErro] = useState("");
    const [sugerirCadastro, setSugerirCadastro] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Credenciais>();

    if (sessao) return <Navigate to={sessao.tipo === "administrador" ? "/admin" : "/app"} replace />;

    async function enviarFormulario(dados: Credenciais) {
        setErro("");
        setSugerirCadastro(false);

        try {
            await entrar({ email: dados.email.trim(), senha: dados.senha }, administrador);

        } catch (erro) {
            setErro(mensagemErro(erro));
            setSugerirCadastro(credenciaisInvalidas(erro));
        }
    }

    return (
        <AcessoLayout titulo={administrador ? "Portal do administrador" : "Bom ter você por aqui."}
            descricao={administrador ? "Entre para cuidar das missões e dos acessórios do SoulAI." : "Entre na sua conta e continue sua jornada de pequenas ações sustentáveis."}>
            <h2 className="mb-6 text-2xl font-extrabold text-soul-ink">{administrador ? "Acesso administrativo" : "Entrar"}</h2>
        
            {location.state?.cadastroConcluido && <p role="status" className="mb-5 rounded-xl bg-soul-soft p-3 text-sm text-soul-blue">Conta criada! Entre para começar sua jornada.</p>}

            <form onSubmit={handleSubmit(enviarFormulario)} noValidate>
                <fieldset disabled={isSubmitting} className="grid gap-4 disabled:opacity-70">
                    <div className="grid gap-2">
                        <label className="font-bold text-soul-ink" htmlFor="email">E-mail</label>
                        <input id="email" type="email" autoComplete="username" className="campo-app" aria-invalid={!!errors.email} aria-describedby="erro-email"
                            {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um e-mail válido." } })} />
                        <small id="erro-email" className="font-bold text-red-600">{errors.email?.message}</small>
                    </div>

                    <div className="grid gap-2">
                        <label className="font-bold text-soul-ink" htmlFor="senha">Senha</label>
                        <input id="senha" type="password" autoComplete="current-password" className="campo-app" aria-invalid={!!errors.senha} aria-describedby="erro-senha"
                            {...register("senha", { required: "Informe sua senha." })} />
                        <small id="erro-senha" className="font-bold text-red-600">{errors.senha?.message}</small>
                    </div>

                    {erro && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-700">
                        <strong>{erro}</strong>
                        {sugerirCadastro && !administrador && <> Se você ainda não tem conta, <Link to="/cadastro" className="font-extrabold underline underline-offset-2">cadastre-se</Link>.</>}
                        {sugerirCadastro && administrador && " Confira os dados do seu acesso administrativo."}
                    </p>}

                    <button type="submit" className="botao-app">{isSubmitting ? "Entrando..." : "Entrar"}</button>

                </fieldset>
                {isSubmitting && <Carregando />}

            </form>
            {!administrador && <p className="mt-6 text-center text-sm">Ainda não tem conta? <Link to="/cadastro" className="font-bold text-soul-blue hover:underline">Cadastre-se</Link></p>}

            <div className="mt-6 border-t border-soul-line pt-4 text-center">
                {!administrador && <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-soul-text/70">Acesso restrito</p>}
                <Link to={administrador ? "/login" : "/login?admin=1"} onClick={() => { setErro(""); setSugerirCadastro(false); }} className="text-xs text-soul-text hover:underline">
                    {administrador ? "Voltar ao login de usuário" : "Entrar como administrador"}
                </Link>
            </div>
            
        </AcessoLayout>
    );
}
