import type Cine from "../../cine/modelos/Cine.model";
import type Genero from "../../generos/modelos/Genero.model";
import type ActorPelicula from "./ActorPelicula.model";

export default interface Pelicula {
    id: number;
    titulo: string;
    fechaLanzamiento: string;
    trailer: string | undefined;    
    poster: string | undefined;   
    generos?: Genero[];
    cines?: Cine[];
    actores?: ActorPelicula[];
}