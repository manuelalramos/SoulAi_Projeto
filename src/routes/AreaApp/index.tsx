import RotaProtegida from "../../components/RotaProtegida/RotaProtegida";
import ProgressoProvider from "../../contexts/ProgressoProvider";
import AppLayout from "../../layouts/AppLayout/AppLayout";

export default function AreaAppRoute() {
    return <RotaProtegida tipo="usuario"><ProgressoProvider><AppLayout /></ProgressoProvider></RotaProtegida>;
}
