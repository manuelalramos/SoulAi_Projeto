import { useEffect, useRef, useState } from "react";
import Carregando from "../../../components/Carregando/Carregando";

type Props = {
    ocupado: boolean;
    erro: string;
    confirmar: () => void;
    cancelar: () => void;
};

// Modal que confirma a troca de senha antes de salvar o perfil.
export default function ConfirmarSenha({ ocupado, erro, confirmar, cancelar }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [tentouSalvar, setTentouSalvar] = useState(false);

    useEffect(() => {
        const modal = dialogRef.current;
        if (modal && !modal.open) modal.showModal();
    }, []);

    return (
        <dialog ref={dialogRef} aria-labelledby="confirmar-senha" onClose={cancelar} onCancel={(evento) => { if (ocupado) evento.preventDefault(); }}
            className="w-[92%] max-w-md rounded-2xl border border-soul-line bg-white p-6 text-soul-text shadow-future backdrop:bg-soul-ink/60 sm:p-8">

            <h2 id="confirmar-senha" className="text-2xl font-extrabold text-soul-ink">Alterar sua senha?</h2>
            <p className="mt-4">Você informou uma nova senha. Deseja salvar os dados do perfil com essa alteração?</p>
            {tentouSalvar && erro && !ocupado && <p role="alert" className="mt-4 text-sm font-bold text-red-600">{erro}</p>}

            {ocupado && <Carregando />}

            <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" disabled={ocupado} className="botao-app" onClick={() => { setTentouSalvar(true); confirmar(); }}>{ocupado ? "Salvando..." : "Confirmar e salvar"}</button>
                <button type="button" disabled={ocupado} className="botao-secundario" onClick={cancelar}>Cancelar</button>
            </div>

        </dialog>
    );
}
