import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";

export default function IndiceActores() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Actores</h1>
            <Boton onClick={() => navigate('/actores/crear')}>Crear Actores</Boton>
        </>
    )
}