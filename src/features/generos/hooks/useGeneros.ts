import { useState, useEffect, useCallback } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type Genero from "../modelos/Genero.model";

export function useGeneros()
{
    const [generos, setGeneros] = useState<Genero[]>();
    const[cantTotalRegistros,setCantTotalRegistros] =useState(0);
    const[pagina,setPagina] =useState(1);
    const[recordPorPagina,setRecordsPorPagina] =useState(10);
    const[cargando,setCargando] =useState(true);

    const cargarRegistros = useCallback(() => {
        setCargando(true);
        clienteAPI.get<Genero[]>(`/Generos`, {params:{pagina,recordPorPagina}})
           .then(respuesta =>   {           
            const cantidadTotalRegistros = parseInt(respuesta.headers['cantidad-total-registros']);
            setCantTotalRegistros(cantidadTotalRegistros);
            setGeneros(respuesta.data)
            setCargando(false);
           });
    },[pagina,recordPorPagina]);

    useEffect(() => { cargarRegistros ();   }, [cargarRegistros]
    );


    return {cargando,pagina,setPagina, recordPorPagina,setRecordsPorPagina, cantTotalRegistros,generos,cargarRegistros };
}