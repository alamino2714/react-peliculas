import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";

export default function IndiceGeneros() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Generos</h1>
            <Boton onClick={() => navigate('/generos/crear')}>Crear Generos</Boton>
        </>
    )
}