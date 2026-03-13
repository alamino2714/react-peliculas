import { useEffect, useState } from "react";
import ListadoPeliculas from "../../peliculas/componentes/ListadoPeliculas";
import type Pelicula from "../../peliculas/modelos/peliculas.model";

export default function LandingPage() {
    const [peliculas, setPeliculas] = useState<LandingPageState>({});

    useEffect(() => {
        setTimeout(() => {

            const peliculaEnCines: Pelicula[] = [
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

            const peliculaExtrenos: Pelicula[] = [
                {
                    id: 4,
                    titulo: "El Padrino",
                    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
                    director: "Francis Ford Coppola",
                    año: 1972,
                    genero: "Crimen, Drama",
                    sinopsis: "La historia de la familia Corleone, una de las más poderosas familias mafiosas de Nueva York."
                },
                {
                    id: 5,
                    titulo: "El Padrino II",
                    poster: "https://yisyusoft.com/wp-content/uploads/2025/07/image-21-300x200.jpg",
                    director: "Francis Ford Coppola",
                    año: 1974,
                    genero: "Crimen, Drama",
                    sinopsis: "La continuación de la historia de la familia Corleone, explorando sus orígenes y su expansión en el mundo del crimen."
                }, {
                    id: 6,
                    titulo: "El Padrino III",
                    poster: "https://yisyusoft.com/wp-content/uploads/2025/07/image-39-300x200.jpg",
                    director: "Francis Ford Coppola",
                    año: 1990,
                    genero: "Crimen, Drama",
                    sinopsis: "La conclusión de la saga de la familia Corleone, centrada en el intento de Michael Corleone por legitimar su imperio criminal."
                }
            ];

            setPeliculas({ peliculaEnCines, peliculaExtrenos });

        }, 1000)

    }, [])

    return (
        <>
            <h1 className="h1">Peliculas en cines</h1>
            <ListadoPeliculas peliculas={peliculas.peliculaEnCines} />
            <h1 className="h1">Peliculas en estreno</h1>
            <ListadoPeliculas peliculas={peliculas.peliculaExtrenos} />
        </>

    )

}


interface LandingPageState {
    peliculaEnCines?: Pelicula[],
    peliculaExtrenos?: Pelicula[]
}