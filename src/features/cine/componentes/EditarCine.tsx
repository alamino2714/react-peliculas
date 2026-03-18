import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type CineCreacion from "./modelos/CineCreacion.model";
import FormularioCine from "./FormularioCine";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/Cargando";

export default function EditarCine() {
    const { id } = useParams();
    const [modeloCine, setModeloCine] = useState<CineCreacion | undefined>(undefined);
   
    useEffect( () => {
      setTimeout(()=>{
        setModeloCine({nombre:'Yun', latitud:-34.90905469461325, longitud:-56.19791908941991})
      },1000);
    },[id]);

     

   const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        console.log('editando cine...')
         await new Promise(resolve => setTimeout(resolve,500));
        console.log(data);
      }
    return (
        <>
             <h3>Editar Cine </h3>
             {modeloCine? <FormularioCine modelo={modeloCine} onSubmit={onSubmit}/> : <Cargando/> }
        </>
    )
}