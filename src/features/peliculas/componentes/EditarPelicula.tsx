import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/Cargando";

export default function EditarPelicula() {
    
    const [modeloPelicula, setModeloPelicula] = useState<PeliculaCreacion | undefined>(undefined);
    const { id } = useParams();
    const onSubmit: SubmitHandler<PeliculaCreacion> =async (data) =>{
            console.log('creando pelicula...');
            await new Promise( resolve => setTimeout(resolve,500));
            console.log(data);
        }
    useEffect(()=>{
        setTimeout(()=>{
            setModeloPelicula({titulo:'Yuniel'+ id, fechaLanzamiento: '2020-05-11',trailer: 'ABC', 
                poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg' })
        },500)
    },[id]);

    return (
        <>
            <h1>Editar Pelicula</h1>
            {modeloPelicula ? <FormularioPelicula modelo={ modeloPelicula} onSubmit={onSubmit}/> : <Cargando/> }

        </>)
}