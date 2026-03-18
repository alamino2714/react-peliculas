import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/Cargando";
import type Genero from "../../generos/componentes/modelos/Genero.model";
import type Cine from "../../cine/componentes/modelos/Cine.model";

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
   
       const generosSeleccionados: Genero[] =[  {id:2, nombre: 'Comedia'}];
       const generosNoSeleccionados: Genero[] =[
           {id:1, nombre: 'Accion'},         
           {id:3, nombre: 'Terror'}
         ];
        const cinesSeleccionados: Cine[] =[{id:2, nombre: 'Segundo',latitud:0, longitud:0}];
          const cinesNoSeleccionados: Cine[] =[
              { id:1, nombre:'Primero',latitud:0, longitud:0 },              
              {id:3, nombre: 'Tercero',latitud:0, longitud:0}
            ];
       


    return (
        <>
            <h1>Editar Pelicula</h1>
            {  modeloPelicula ? 
              <FormularioPelicula modelo={ modeloPelicula} onSubmit={onSubmit} 
                  generosSeleccionados={generosSeleccionados} generosNoSeleccionados={generosNoSeleccionados}
                  cinesSeleccionados={cinesSeleccionados} cinesNoSeleccionados={cinesNoSeleccionados}
                  /> :
               <Cargando/> 
              }

        </>)
}