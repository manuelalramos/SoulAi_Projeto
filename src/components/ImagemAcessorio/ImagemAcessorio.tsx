import { useState } from "react";
import { obterImagemUrl } from "../../data/imagens";
import type { Acessorio } from "../../types/app";

export default function ImagemAcessorio({ acessorio }: { acessorio: Pick<Acessorio, "nome" | "imagemUrl"> }) {
    const [imagemComErro, setImagemComErro] = useState("");
    const imagem = obterImagemUrl(acessorio.imagemUrl);
    return (
        <div className="relative grid h-full min-h-0 w-full min-w-0 place-items-center overflow-hidden">
            {imagem && imagem !== imagemComErro ? (
                <img className="absolute inset-0 h-full w-full object-contain p-2" src={imagem} alt={acessorio.nome} onError={() => setImagemComErro(imagem)} />
            ) : (
                <span role="img" aria-label={`Imagem indisponível: ${acessorio.nome || "acessório"}`} className="grid h-full w-full place-items-center rounded-xl bg-slate-100 text-2xl text-slate-400">
                    <i className="fa-solid fa-image" aria-hidden="true" />
                </span>
            )}
        </div>
    );
}
