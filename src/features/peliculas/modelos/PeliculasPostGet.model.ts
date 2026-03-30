import type Cine from "../../cine/modelos/Cine.model";
import type Genero from "../../generos/modelos/Genero.model";

export default interface PeliculasPostGet
{
    generos: Genero[];
    cines:Cine[];
}