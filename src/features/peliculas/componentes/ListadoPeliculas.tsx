import type Pelicula from "../modelos/peliculas.model";
import PeliculaIndividual from "./PeliculaIndificadual";
import styles from "./ListadoPeliculas.module.css";
import ListadoGenerico from "./ListadoGenerico";

export default function ListadoPeliculas(props: ListadoPeliculasProps) {
/*
    if (!props.peliculas) { return 'Cargando..'; }
    else if (props.peliculas.length === 0) { return 'No hay peliculas'; }
    else {
        return (
            <div className={styles.div}>
                {props.peliculas?.map(pelicula => <PeliculaIndividual key={pelicula.id} pelicula={pelicula} />)}
            </div>
        )
    }

    */

    return (
         <ListadoGenerico<Pelicula> listado={props.peliculas} 
                                   listadoVacioUI = {<> No hay peliculas para mostrar</>}                                   
                                   >
            <div className={styles.div}>
                {props.peliculas?.map(pelicula => <PeliculaIndividual key={pelicula.id} pelicula={pelicula} />)}
            </div>

        </ListadoGenerico>
    )



}

interface ListadoPeliculasProps {
    peliculas?: Pelicula[];
}
