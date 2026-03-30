import type { SubmitHandler } from "react-hook-form";
import FormularioCine from "./FormularioCine";
import type CineCreacion from "../modelos/CineCreacion.model";
import { useState } from "react";
import { useNavigate } from "react-router";
import clienteAPI from "../../../api/clienteAxios";
import type { AxiosError } from "axios";
import { extraerErrores } from "../../../utilidades/extraerErrores";

export default function CrearCine()
{ 

   const navigate = useNavigate();  
   const [errores, setErrores] = useState<string[]>([]);

  const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
    console.log('creando cine...')
    try {
        await clienteAPI.post('/Cines', data);
        navigate('/cines');
    } catch (errors) {
        const errores = extraerErrores(errors as AxiosError);
        setErrores(errores);
    }
  }


  return ( 
       <>
          <h3>Crear Cine</h3>
          <FormularioCine onSubmit={onSubmit} errores={errores} />
        </>
      
      )

}