import RotaProtegida from "../../components/RotaProtegida/RotaProtegida";
import Admin from "../../pages/Admin/Admin";

export default function AdminRoute() {
    return <RotaProtegida tipo="administrador"><Admin /></RotaProtegida>;
}
