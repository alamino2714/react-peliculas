import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";

export default function convertirPeliculaAFromData(pelicula: PeliculaCreacion): FormData {
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('fechaLanzamiento', pelicula.fechaLanzamiento);
    if (pelicula.poster) {
        formData.append('poster', pelicula.poster);
    }
    if (pelicula.trailer) {
        formData.append('trailer', pelicula.trailer);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds??[]));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds??[]));
    formData.append('actores', JSON.stringify(pelicula.actores??[]));
    return formData;
}