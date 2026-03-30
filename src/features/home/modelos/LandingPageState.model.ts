import type Pelicula from "../../peliculas/modelos/Pelicula.model";

export default interface LandingPageState {
    peliculasEnCines?: Pelicula[],
    peliculasProximosEstrenos?: Pelicula[]
}