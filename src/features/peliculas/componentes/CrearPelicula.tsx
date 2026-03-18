import type { SubmitHandler } from "react-hook-form";
import FormularioPelicula from "./FormularioPelicula";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import type Genero from "../../generos/componentes/modelos/Genero.model";
import type Cine from "../../cine/componentes/modelos/Cine.model";

export default function CrearPelicula()
{
    const onSubmit: SubmitHandler<PeliculaCreacion> =async (data) =>{
        console.log('creando pelicula...');
        await new Promise( resolve => setTimeout(resolve,500));
        console.log(data);
    }   

    const generosSeleccionados: Genero[] =[];
    const generosNoSeleccionados: Genero[] =[
        {id:1, nombre: 'Accion'},
        {id:2, nombre: 'Comedia'},
        {id:3, nombre: 'Terror'}
      ];
    const cinesSeleccionados: Cine[] =[];
    const cinesNoSeleccionados: Cine[] =[
        { id:1, nombre:'Primero',latitud:0, longitud:0 },
        {id:2, nombre: 'Segundo',latitud:0, longitud:0},
        {id:3, nombre: 'Tercero',latitud:0, longitud:0}
      ];


    
    return (  <> 
    <h1>Crear Pelicula</h1>
    <FormularioPelicula onSubmit={onSubmit}
          generosSeleccionados={generosSeleccionados} generosNoSeleccionados={generosNoSeleccionados}
          cinesSeleccionados={ cinesSeleccionados} cinesNoSeleccionados={cinesNoSeleccionados}
          actoresSeleccionados={[]}
    />
   </>

)
}