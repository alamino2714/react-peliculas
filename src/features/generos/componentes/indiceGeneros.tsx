import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";
import { useEffect } from "react";
import clienteAPI from "../../../api/clienteAxios";

export default function IndiceGeneros() {
    const navigate = useNavigate();
    
    useEffect( () =>{
        clienteAPI.get(`/Generos`).then(respuesta => console.log(respuesta.data));
    },[]
    )

    return (
        <>
            <h1>Generos</h1>
            <Boton onClick={() => navigate('/generos/crear')}>Crear Generos</Boton>
        </>
    )
}

 