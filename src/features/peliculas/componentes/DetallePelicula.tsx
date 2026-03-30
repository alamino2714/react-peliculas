import { useParams } from "react-router";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/clienteAxios";
import Cargando from "../../../componentes/Cargando";
import type Pelicula from "../modelos/Pelicula.model";
import type Coordenada from "../../../componentes/Mapa/Coordenada.model";
import Mapa from "../../../componentes/Mapa/Mapa";

export default function DetallePelicula() {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState<Pelicula>();


    useEffect(() => {
        clienteAPI.get(`/Peliculas/${id}`).then(respuesta => {
            setPelicula(respuesta.data);
        });
    }, [id]);

    if (!pelicula) {
        return <Cargando />
    }

    const fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
    const anioLanzamiento = fechaLanzamiento.getFullYear();
    const fechaLanzamientoFormateada = fechaLanzamiento.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });

    function obtenerUrlEmbebidaYoutube(trailer: string | undefined): string | undefined {
        if (!trailer) {
            return undefined;
        }
        const url = new URL(trailer);
        const videoId = url.searchParams.get("v");
        if (!videoId) {
            return undefined;
        }
        return `https://www.youtube.com/embed/${videoId}`;
    }


    function transformarCoordenadas(): Coordenada[] {

        return pelicula!.cines!.map(cine => {
            const coordenada: Coordenada = { latitud: cine.latitud, longitud: cine.longitud, mensaje: cine.nombre };
            return coordenada;
        });
    }


    return (
        <>
            <div className="container my-4">
                <div className="mb-3">
                    <h2>{pelicula.titulo} <small className="text-muted">({anioLanzamiento})</small></h2>
                    {pelicula.generos && pelicula.generos.length > 0 && (
                        <div className="mb-2">
                            {pelicula.generos.map(genero =>
                                <span key={genero.id} className="badge bg-primary me-2">{genero.nombre} </span>
                            )}
                        </div>
                    )}

                    <p className="text-muted">Extreno: {fechaLanzamientoFormateada}</p>
                </div>

                <div className="d-flex">
                    <span className="d-inline-block me-2">
                        <img src={pelicula.poster} alt={pelicula.titulo} style={{ width: '225px', height: '315px' }} />
                    </span>
                    <div>
                        <iframe
                            width="565"
                            height="315"
                            src={obtenerUrlEmbebidaYoutube(pelicula.trailer)}
                            title="trailer"
                            frameBorder="0" // Tradicionalmente ayuda a evitar bordes extraños
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                {pelicula.actores && pelicula.actores.length > 0 && (
                    <div className="mt-4">
                        <h4>Actores</h4>
                        <div className="row">
                            {pelicula.actores.map(actor => (
                                <div key={actor.id} className="col-md-4 d-flex mb-3">
                                    <img src={actor.foto} alt={actor.nombre} className="rounded me-3"
                                        style={{ width: '80px', height: '100px', marginRight: '1rem' }} />
                                    <div>
                                        <strong>{actor.nombre}</strong>
                                        <br />
                                        <span className="text-muted">{actor.personaje}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pelicula.cines && pelicula.cines.length > 0 && (
                    <div className="mt-4">
                        <h2>Mostrandose en los siguientes Cines</h2>
                        <Mapa coordenadas={transformarCoordenadas()} />
                    </div>
                )}

            </div>
        </>
    )


}
