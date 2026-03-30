import { useNavigate } from "react-router";
import clienteAPI from "../api/clienteAxios";
import ListadoGenerico from "../features/peliculas/componentes/ListadoGenerico";
import Boton from "./Boton";
import Cargando from "./Cargando";
import Paginacion from "./Paginacion";
import type { ReactNode } from "react";
import confirmarBorrar from "../utilidades/confirmarBorrar";

export default function IndiceEntidades<T>(props: IndiceEntidadesProps<T>) {
    const navigate = useNavigate();

    const botones = (urlEditar: string, id: number) => <>
        <Boton className="btn btn-sm btn-outline-primary me-2" 
                onClick={() => navigate(urlEditar)}
        > <i className="bi bi-pencil me-1"></i></Boton>
        <Boton className="btn btn-sm btn-outline-danger"
              onClick={() => confirmarBorrar(() => Borrar(id))}>
            <i className="bi bi-trash me-1"></i></Boton>
    </>

    const Borrar = async (id: number) => {
        try {
             await clienteAPI.delete(`${props.url}/${id}`)
            if (props.pagina === 1) { props.cargarRegistros(); }
            else { props.setPagina(1) }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>{props.titulo}</h1>
            <div>
                <Boton onClick={() => navigate(props.urlCrear)}> Crear {props.nombreEntidad}</Boton>
            </div>

            {props.cargando ? <Cargando /> :
                <div className="mt-4">
                    <div className="mb-2">
                        <Paginacion paginaActual={props.pagina} registrosPorPagina={props.recordPorPagina} cantTotalRegistros={props.cantTotalRegistros} registrosPorPaginasOpciones={[5, 10, 20, 50]}
                            onCambioPaginacion={(pagina, registrosPorPagina) => {
                                props.setPagina(pagina);
                                props.setRecordsPorPagina(registrosPorPagina);
                            }}
                        ></Paginacion>
                    </div>

                    <ListadoGenerico listado={props.entidades!} >
                        <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                            {props.children(props.entidades!, botones)  }
                        </table>
                    </ListadoGenerico>
                </div>
            }
        </>
    )

}

interface IndiceEntidadesProps<T> {
    url: string;
    urlCrear: string;
    titulo: string;
    nombreEntidad: string;
    pagina: number;
    recordPorPagina: number;
    cantTotalRegistros: number;
    setPagina: (pagina: number) => void;
    setRecordsPorPagina: (recordsPorPagina: number) => void;
    entidades?: T[];
    cargando: boolean;
    cargarRegistros: () => void;
    children(entidades: T[], botones: (urlEditar: string, id: number) => ReactNode): ReactNode;

}