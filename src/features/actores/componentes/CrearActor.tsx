import type { SubmitHandler } from "react-hook-form";
import FormularioActor from "./FormularioActor";
import type ActorCreacion from "../modelos/ActorCreacion.model";
import { useState } from "react";
import { useNavigate } from "react-router";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import clienteAPI from "../../../api/clienteAxios";


export default function CrearActor() {

    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        console.log('creando actor...');
        try {
           await clienteAPI.postForm(`/Actores`,data);
           navigate('/actores');
        }
        catch(err)
        {
            const errors = extraerErrores(err as AxiosError);
            setErrores(errors);
               //await new Promise(resolve => setTimeout(resolve, 2000));
        }    
        
    }

    return (
        <>
            <h3>Crear Actor</h3>
            <FormularioActor onSubmit={onSubmit} errores={errores} />
        </>
    )

}