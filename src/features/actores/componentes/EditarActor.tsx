import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type ActorCreacion from "./modelos/ActorCreacion.model";
import FormularioActor from "./FormularioActor";
import Cargando from "../../../componentes/Cargando";
import type { SubmitHandler } from "react-hook-form";
 
 
const onSubmit: SubmitHandler<ActorCreacion> = async (data) =>{
    console.log('editando actor...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
}
export default function EditarActor() {
    const { id } = useParams();
    const[ modeloActor, setModeloActor] =useState<ActorCreacion | undefined> (undefined);
    useEffect ( ()=>{
        const timerId = setTimeout( ()=>{
            setModeloActor({nombre: 'Yuniel '+ id, fechaNacimiento: '2020-11-29', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'  })
        },1000);
        return ()=>clearTimeout(timerId);
    },[id])

   

    return (
        <>
            <h3>Editar Actor</h3>
           {modeloActor ? <FormularioActor modelo={modeloActor} onSubmit={onSubmit}/> : <Cargando/>}
        </>
    )

}