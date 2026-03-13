import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";

export default function IndiceCines()
{
    const navigate = useNavigate();
    return (
        <>
            <h1>Cines</h1>
            <Boton onClick={() => navigate('/cines/crear')}>Crear Cines</Boton>
        </>
    )
}