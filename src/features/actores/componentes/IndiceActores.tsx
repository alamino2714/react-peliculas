import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";
import { useActores } from "../hooks/useActores";
import Cargando from "../../../componentes/Cargando";
import Paginacion from "../../../componentes/Paginacion";
import ListadoGenerico from "../../peliculas/componentes/ListadoGenerico";
import confirmarBorrar from "../../../utilidades/confirmarBorrar";
import clienteAPI from "../../../api/clienteAxios";

export default function IndiceActores() {
    const navigate = useNavigate();
    const { cargando, pagina, setPagina, recordPorPagina, setRecordsPorPagina, cantTotalRegistros, actores, cargarRegistros } = useActores();


    const borrarReg = async (id: number) => {
        try {
            await clienteAPI.delete(`/Actores/${id}`)
            if (pagina === 1) {
                cargarRegistros();
            }
            else {
                setPagina(1)
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <h1>Actores</h1>
            <div>
                <Boton onClick={() => navigate('/actores/crear')}>Crear Actores</Boton>
            </div>
            {
                cargando ? <Cargando /> :
                    <div className="mt-4">
                        <div className="mb-2">
                            <Paginacion paginaActual={pagina} registrosPorPagina={recordPorPagina} cantTotalRegistros={cantTotalRegistros}
                                registrosPorPaginasOpciones={[5, 10, 20, 50]}
                                onCambioPaginacion={(pagina, recordsPorPagina) => {
                                    setPagina(pagina);
                                    setRecordsPorPagina(recordsPorPagina);
                                }}
                            ></Paginacion>
                        </div>
                        <ListadoGenerico listado={actores}>
                            <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                                <thead>
                                    <tr>
                                        <th scope="col"> Item  </th>
                                        <th scope="col"> Nombre  </th>
                                        <th scope="col" className="text-end"> Acciones </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {actores?.map(actor => <tr key={actor.id}>
                                        <td> {actor.id}</td>
                                        <td> {actor.nombre}</td>
                                        <td className="text-end">
                                            <Boton className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/actores/editar/${actor.id}`)}
                                            > <i className="bi bi-pencil me-1"></i></Boton>
                                            <Boton className="btn btn-sm btn-outline-danger" onClick={() => confirmarBorrar(() => borrarReg(actor.id))}>
                                                <i className="bi bi-trash me-1"></i></Boton>
                                        </td>

                                    </tr>)}

                                </tbody>
                            </table>
                        </ListadoGenerico>

                    </div>
            }
        </>
    )
}