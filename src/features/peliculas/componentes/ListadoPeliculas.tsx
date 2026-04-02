import type Pelicula from "../modelos/Pelicula.model";
import PeliculaIndividual from "./PeliculaIndividual";
import styles from "./ListadoPeliculas.module.css";
import ListadoGenerico from "./ListadoGenerico";
import Cargando from "../../../componentes/Cargando";

export default function ListadoPeliculas(props: ListadoPeliculasProps) {
 
    return (
         <ListadoGenerico<Pelicula> listado={props.peliculas} 
                                   listadoVacioUI = {<Cargando/>}>
            <div className={styles.div}>
                {props.peliculas?.map(pelicula => <PeliculaIndividual key={pelicula.id} pelicula={pelicula} />)}
            </div>           
           
        </ListadoGenerico>
    )
}

interface ListadoPeliculasProps {
    peliculas?: Pelicula[];
}
