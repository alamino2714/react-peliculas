import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/Cargando";
import type PeliculasPutGet from "../modelos/PeliculasPutGet.model";
import clienteAPI from "../../../api/clienteAxios";
import formatearFecha from "../../../utilidades/formatearFecha";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import convertirPeliculaAFromData from "../utilidades/convertirPeliculaAFromData";
import type { AxiosError } from "axios";

export default function EditarPelicula() {
    
    const [modeloPelicula, setModeloPelicula] = useState<PeliculaCreacion | undefined>(undefined);
    const [peliculaPutGet, setPeliculaPutGet] = useState<PeliculasPutGet | undefined>(undefined);
    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();


    const onSubmit: SubmitHandler<PeliculaCreacion> =async (data) =>{
        try {
            const formdata = convertirPeliculaAFromData(data);
            await clienteAPI.putForm(`/Peliculas/${id}`, formdata);
            navigate(`/peliculas/detalle/${id}`);           

        } catch (error) {
            const errores = extraerErrores(error as AxiosError);
            setErrores(errores);
        }
    }

    useEffect(()=>{
        clienteAPI.get<PeliculasPutGet>(`/Peliculas/putget/${id}`)
        .then(respuesta => {
             const pelicula = respuesta.data.pelicula;
             const peliculaCreacion: PeliculaCreacion = {
                titulo: pelicula.titulo,
                fechaLanzamiento: formatearFecha(pelicula.fechaLanzamiento),
                poster: pelicula.poster,
                trailer: pelicula.trailer
             }    
             setModeloPelicula(peliculaCreacion);
             setPeliculaPutGet(respuesta.data);
             console.log(respuesta.data);
        });
    },[id]);
   
      
    return (
        <>
            <h1>Editar Pelicula</h1>
            {  modeloPelicula && peliculaPutGet? 
              <FormularioPelicula modelo={ modeloPelicula} onSubmit={onSubmit}  errores={errores}
                  generosSeleccionados={peliculaPutGet.generosSeleccionados} generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
                  cinesSeleccionados={peliculaPutGet.cinesSeleccionados} cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
                  actoresSeleccionados={peliculaPutGet.actoresSeleccionados}
                  /> :
               <Cargando/> 
              }
        </>)
}
 