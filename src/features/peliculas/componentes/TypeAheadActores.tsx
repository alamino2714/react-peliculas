import { Typeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import type ActorPelicula from "../modelos/ActorPelicula.model";

export default function TypeAheadActores()
{

     const actores: ActorPelicula[] = [
        {id:1, nombre:'Primero', personaje: 'Peronsaje1', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'},
        {id:2, nombre:'Segundo', personaje: 'Peronsaje2', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'},
        {id:3, nombre:'Tercero', personaje: 'Peronsaje3', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'}
     ]

    const seleccion: ActorPelicula[] = [];  

    return(
        <>
        <label>Actores</label>
        <Typeahead id="typeahead" 
           onChange={(actores: Option[]) => {

           }}
           options={actores}
           labelKey={(opcion: Option) => {
             const actor = opcion as ActorPelicula;
             return actor.nombre;
           }}
           filterBy={['nombre']}
           placeholder="Escriba el nombre del actor.."
           minLength={2}
           flip = {true}
           selected={seleccion}
           renderMenuItemChildren={(opcion: Option) =>{
            const actor = opcion as ActorPelicula;
            return (
                <>
                   <img alt="imagen actor" src={actor.foto} style={{height:'48px', width:'48px', marginRight:'10px'}}/>
                   <span>{actor.nombre}</span>
                </>
            )
           }}


        ></Typeahead>
        </>
    )
}