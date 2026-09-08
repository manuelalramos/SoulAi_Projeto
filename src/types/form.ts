export type ContactFormData = {
    nome: string;
    email: string;
    assunto: "projeto" | "equipe" | "duvida";
    mensagem: string;
};