import { AsyncTypeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import type ActorPelicula from "../modelos/ActorPelicula.model";
import { useState } from "react";
import clienteAPI from "../../../api/clienteAxios";

export default function TypeAheadActores(props: TypeAheadActoresProps) {

    const [actores, setActores] = useState<ActorPelicula[]>([]);
    const [cargando, setCargando] = useState(false);

    function buscarActores(query: string) {
        setCargando(true);
        clienteAPI.get<ActorPelicula[]>(`/actores/${query}`)
            .then(respuesta => {
                setActores(respuesta.data);
                setCargando(false);
            });
    }

    const seleccion: ActorPelicula[] = [];

    const [elementoArrastrado, setElementoArrastrado] = useState<ActorPelicula | undefined>(undefined);
    const manejarDragStart = (actor: ActorPelicula) => {
        setElementoArrastrado(actor);
    }
    const manejarDragOver = (actor: ActorPelicula) => {
        if (!elementoArrastrado || actor.id === elementoArrastrado.id) return;

        const actores = [...props.actores];
        const indiceDesde = actores.findIndex(x => x.id === elementoArrastrado.id);
        const indiceHasta = actores.findIndex(x => x.id === actor.id);
        if (indiceDesde !== -1 && indiceHasta !== -1) {
            [actores[indiceDesde], actores[indiceHasta]] = [actores[indiceHasta], actores[indiceDesde]];
            props.onAdd(actores);
        }

    }

    return (
        <>
            <label>Actores</label>
            <AsyncTypeahead id="typeahead"
                isLoading={cargando}
                onSearch={buscarActores}
                onChange={(actores: Option[]) => {
                    const actorSelecionado = actores[0] as ActorPelicula;
                    if (props.actores.findIndex(x => x.id === actorSelecionado.id) === -1) {
                        actorSelecionado.personaje = '';
                        props.onAdd([...props.actores, actorSelecionado])
                    }

                }}
                options={actores}
                labelKey={(opcion: Option) => {
                    const actor = opcion as ActorPelicula;
                    return actor.nombre;
                }}
                filterBy={['nombre']}
                placeholder="Escriba el nombre del actor.."
                minLength={1}
                flip={true}
                selected={seleccion}
                renderMenuItemChildren={(opcion: Option) => {
                    const actor = opcion as ActorPelicula;
                    return (
                        <>
                            <img alt="imagen actor" src={actor.foto} style={{ height: '48px', width: '48px', marginRight: '10px' }} />
                            <span>{actor.nombre}</span>
                        </>
                    )
                }}
            ></AsyncTypeahead>
            {console.log(props.actores)}
            <ul className="list-group">
                {props.actores.map(actor => (
                    <li draggable={true} onDragStart={() => manejarDragStart(actor)} onDragOver={() => manejarDragOver(actor)}
                        className="list-group-item d-flex align-items-center" key={actor.id}>
                        <div style={{ width: '70px' }}>
                            <img style={{ height: '60px' }} src={actor.foto} alt="foto"></img>
                        </div>
                        <div style={{ width: '150px', marginLeft: '1rem' }}>
                            {actor.nombre}
                        </div>
                        <div className="flex-grow-1 mx-3">
                            <input className="form-control" placeholder="Pesonaje" type="text" value={actor.personaje}
                                onChange={e => {
                                    props.onCambioPersonaje(actor.id, e.currentTarget.value)
                                }}
                            />

                        </div>
                        <span role="button" className="badge text-bg-secondary" onClick={() => { props.onRemove(actor) }}>X</span>

                    </li>
                ))

                }
            </ul>
        </>
    )
}


interface TypeAheadActoresProps {
    actores: ActorPelicula[];
    onAdd(actores: ActorPelicula[]): void;
    onCambioPersonaje(id: number, personaje: string): void;
    onRemove(actor: ActorPelicula): void;
}