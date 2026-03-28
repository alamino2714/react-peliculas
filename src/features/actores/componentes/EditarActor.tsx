import { useNavigate, useParams } from "react-router";
import type ActorCreacion from "../modelos/ActorCreacion.model";
import FormularioActor from "./FormularioActor";
import Cargando from "../../../componentes/Cargando";
import type { SubmitHandler } from "react-hook-form";
import clienteAPI from "../../../api/clienteAxios";
import type Actor from "../modelos/Actor.model";
import formatearFecha from "../../../utilidades/formatearFecha";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";
 

export default function EditarActor() {

     const { id } = useParams();
     const [errores, setErrores] = useState<string[]>([]);
     const[ modeloActor, setModeloActor] =useState<ActorCreacion | undefined> (undefined);
     const navigate = useNavigate();

    useEffect ( ()=>{
      clienteAPI.get<Actor>(`/Actores/${id}`).then (respuesta =>{
        
        const actor = respuesta.data;
        const actorCreacion : ActorCreacion = {
            nombre:actor.nombre,
            fechaNacimiento:formatearFecha(actor.fechaNacimiento),
            foto: actor.foto        
        };
        setModeloActor(actorCreacion);
      });


    },[id])

    const onSubmit: SubmitHandler<ActorCreacion> = async (data) =>{
    console.log('editando actor...');
    try{
        await clienteAPI.putForm(`/Actores/${id}`,data);
        navigate('/actores');
    }catch(errors)
    {
        const errores = extraerErrores(errors as AxiosError);
        setErrores(errores);
    }

}

    return (
        <>
            <h3>Editar Actor</h3>
           {modeloActor ? <FormularioActor modelo={modeloActor} onSubmit={onSubmit} errores={errores}/> : <Cargando/>}
        </>
    )

}