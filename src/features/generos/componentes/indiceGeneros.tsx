import { useNavigate } from "react-router";
import Boton from "../../../componentes/Boton";
import ListadoGenerico from "../../peliculas/componentes/ListadoGenerico";
import Paginacion from "../../../componentes/Paginacion";
import Cargando from "../../../componentes/Cargando";
import { useGeneros } from "../hooks/useGeneros";
import clienteAPI from "../../../api/clienteAxios";
import confirmarBorrar from "../../../utilidades/confirmarBorrar";

export default function IndiceGeneros() {
    const navigate = useNavigate();
    const  {cargando,pagina,setPagina, recordPorPagina,setRecordsPorPagina, cantTotalRegistros,generos,cargarRegistros } = useGeneros();

    const borrarReg = async (id:number)=> {
        try{
            await clienteAPI.delete(`/Generos/${id}`)
            if(pagina === 1){
                cargarRegistros();
            }  
            else{
                setPagina(1)
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>Generos</h1>
            <div>
                <Boton onClick={() => navigate('/generos/crear')}>Crear Generos</Boton>
            </div>

           {cargando?<Cargando/> :  
            <div className="mt-4">
                <div className="mb-2">
                    <Paginacion paginaActual={pagina} registrosPorPagina={recordPorPagina} cantTotalRegistros={cantTotalRegistros} registrosPorPaginasOpciones={[5, 10, 20, 50]}
                        onCambioPaginacion={(pagina, recordsPorPagina) => {
                          setPagina(pagina);
                          setRecordsPorPagina(recordsPorPagina);
                        }}
                    ></Paginacion>
                </div>

                <ListadoGenerico listado={generos}>
                    <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                        <thead>
                            <tr>
                                <th scope="col"> Nombre  </th>
                                <th scope="col" className="text-end"> Acciones </th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos?.map(genero => <tr key={genero.id}>
                                <td>{genero.nombre}</td>
                                <td className="text-end">
                                    <Boton className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/generos/editar/${genero.id}`)}
                                    > <i className="bi bi-pencil me-1"></i></Boton>
                                    <Boton className="btn btn-sm btn-outline-danger" onClick={()=> confirmarBorrar( ()=> borrarReg(genero.id))}> 
                                        <i className="bi bi-trash me-1"></i></Boton>
                                </td>
                            </tr>)
                            }
                        </tbody>

                    </table>
                </ListadoGenerico>
            </div>
             }
        </>
    )
}

