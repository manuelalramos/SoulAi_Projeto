import { useState } from "react";
import { obterImagemUrl } from "../../data/imagens";

type Props = {
    fotoUrl?: string | null;
    nome?: string;
    grande?: boolean;
};

export default function FotoPerfil({ fotoUrl, nome, grande = false }: Props) {
    const [imagemComErro, setImagemComErro] = useState("");
    const imagem = obterImagemUrl(fotoUrl);

    return (
        <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-soul-gradient text-white ring-2 ring-white/60 ${grande ? "h-24 w-24 text-4xl" : "h-10 w-10 text-lg"}`}>
            <span aria-hidden="true"><i className="fa-solid fa-user" /></span>
            {imagem && imagem !== imagemComErro && (
                <img className="absolute inset-0 h-full w-full object-cover" src={imagem} alt={nome ? `Foto de ${nome}` : "Foto de perfil"} onError={() => setImagemComErro(imagem)} />
            )}
        </span>
    );
}
