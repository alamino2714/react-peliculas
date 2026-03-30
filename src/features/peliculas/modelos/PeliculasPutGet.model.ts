import type Cine from "../../cine/modelos/Cine.model";
import type Genero from "../../generos/modelos/Genero.model";
import type ActorPelicula from "./ActorPelicula.model";
import type Pelicula from "./Pelicula.model";
 
export default interface PeliculasPutGet
{
    pelicula: Pelicula;
    generosSeleccionados: Genero[];
    generosNoSeleccionados: Genero[];
    cinesSeleccionados:Cine[];
    cinesNoSeleccionados:Cine[];
    actoresSeleccionados: ActorPelicula[];
}


 