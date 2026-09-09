// Modelo dos campos controlados pelo formulário de contato.
export type ContactFormData = {
    nome: string;
    email: string;
    assunto: "projeto" | "equipe" | "duvida";
    mensagem: string;
};
