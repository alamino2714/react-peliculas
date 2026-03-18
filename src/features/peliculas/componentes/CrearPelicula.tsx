import type { SubmitHandler } from "react-hook-form";
import FormularioPelicula from "./FormularioPelicula";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";

export default function CrearPelicula()
{
    const onSubmit: SubmitHandler<PeliculaCreacion> =async (data) =>{
        console.log('creando pelicula...');
        await new Promise( resolve => setTimeout(resolve,500));
        console.log(data);
    }
   
    
    return (  <> 
    <h1>Crear Pelicula</h1>
    <FormularioPelicula onSubmit={onSubmit} />
   </>

)
}