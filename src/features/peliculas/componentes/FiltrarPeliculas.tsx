import {  useForm, type SubmitHandler } from "react-hook-form";
import Boton from "../../../componentes/Boton";
import Paginacion from "../../../componentes/Paginacion";
import type PeliculaFiltrarDTO from "../utilidades/PeliculaFiltrar.model";
import useFiltroPeliculas from "../hooks/useFiltroPeliculas";
import ListadoPeliculas from "./ListadoPeliculas";

export default function FiltrarPeliculas() {
 

    const valorInicial: PeliculaFiltrarDTO = { titulo: '', generoId: 0, proximosExtrenos: false, enCines: false };

    const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<PeliculaFiltrarDTO>({
        defaultValues: valorInicial
    });

    const { buscarPeliculas, listGeneros, pagina, recordPorPagina, cantidadTotalDeRegistros,   setPagina,  setRecordPorPagina, peliculas } 
    = useFiltroPeliculas(valorInicial, setValue);   


    const onSubmit: SubmitHandler<PeliculaFiltrarDTO> = async (data) => {
        console.log('filtrando.....');
        await buscarPeliculas(data);
        console.log(data);
    }

    return (
        <>
            <h3>Filtro de Peliculas</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="row row-cols-lg-auto g-3 align-items-center">
                <div className="col-12">
                    <input id="titulo" placeholder="Titulo de la Pilicula" autoComplete="off" className="form-control" {...register('titulo')} />
                </div>
                <div className="col-12">
                    <select className="form-select" {...register('generoId')}>
                        <option value='0'> --Seleccione un genero-- </option>
                        {listGeneros.map(genero => <option key={genero.id} value={genero.id}> {genero.nombre} </option>)}
                    </select>
                </div>
                <div className="col-12">
                    <input id="idProximosExtrenos" className="form-check-input" type="checkbox"  {...register('proximosExtrenos')} />
                    <label htmlFor="idProximosExtrenos" > Proximos Extrenos</label>
                </div>
                <div className="col-12">
                    <input id="idEnCines" className="form-check-input" type="checkbox"  {...register('enCines')} />
                    <label htmlFor="idEnCines" > En Cines</label>
                </div>

                <div className="col-12">
                    <Boton disabled={isSubmitting} type="submit"> {isSubmitting ? 'Filtrando' : 'Filtrar'} </Boton>
                    <Boton onClick={() => {reset();buscarPeliculas(valorInicial);}} className="btn btn-danger ms-2"> Limpiar </Boton>
                </div>
            </form>
            
             <div className="mt-4">
                <Paginacion cantTotalRegistros={cantidadTotalDeRegistros} 
                            paginaActual={pagina} 
                            registrosPorPagina={recordPorPagina} 
                            registrosPorPaginasOpciones={[2,5,50]}
                            onCambioPaginacion={(pagina, registrosPorPagina) => {
                                setPagina(pagina);
                                setRecordPorPagina(registrosPorPagina);
                            }} />
             </div>

            <div className="mt-4">
                <ListadoPeliculas peliculas={peliculas} />
            </div>


        </>
    );
}


