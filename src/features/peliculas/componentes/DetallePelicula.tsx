import { useParams } from "react-router";
import type Pelicula from "../modelos/peliculas.model";
import PeliculaIndividual from "./PeliculaIndificadual";

export default function DetallePelicula() {

    const { id } = useParams();
 
    const peliculas: Pelicula[] = [
        {
            id: 1,
            titulo: "El Padrino",
            poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
            director: "Francis Ford Coppola",
            año: 1972,
            genero: "Crimen, Drama",
            sinopsis: "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York."
        },
        {
            id: 2,
            titulo: "El Padrino II",
            poster: "https://yisyusoft.com/wp-content/uploads/2025/07/image-21-300x200.jpg",
            director: "Francis Ford Coppola",
            año: 1974,
            genero: "Crimen, Drama",
            sinopsis: "La continuación de la historia de la familia Corleone, explorando sus orígenes y su expansión en el mundo del crimen."
        }, {
            id: 3,
            titulo: "El Padrino III",
            poster: "https://yisyusoft.com/wp-content/uploads/2025/07/image-39-300x200.jpg",
            director: "Francis Ford Coppola",
            año: 1990,
            genero: "Crimen, Drama",
            sinopsis: "La conclusión de la saga de la familia Corleone, centrada en el intento de Michael Corleone por legitimar su imperio criminal."
        }
    ];
   // const construirUrlDetalle = () => `/peliculas/detalle/${id}`;

    const pelicula: Pelicula | undefined = peliculas.find(p => p.id === Number(id));

    return (
        <div>
            {pelicula && <PeliculaIndividual pelicula={pelicula} />}
        </div>
    )


}
