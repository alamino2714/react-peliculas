
import { type SubmitHandler } from "react-hook-form";
import type GeneroCreacion from "./modelos/GeneroCreacion.model";
import FormularioGenero from "./FormularioGenero";
import clienteAPI from "../../../api/clienteAxios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";


export default function CrearGenero() {

    const navigate = useNavigate();
    const [errores,setErrores] = useState<string[]>([]);

    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
        try{
          console.log('Creando el genero');
          await  clienteAPI.post('/Generos',data);//.then(()=> navigate('/generos'))
          navigate('/generos');
           // await new Promise(resolve => setTimeout(resolve,2000));
           console.log(data);
        }
        catch(err){
            console.log(err);
            const errors = extraerErrores(err as AxiosError);
            setErrores(errors);
        }
    };

    return (
        <>
            <h3>Crear Genero</h3>
            <FormularioGenero errores={errores} onSubmit={onSubmit} />            
        </>
    )
}

 