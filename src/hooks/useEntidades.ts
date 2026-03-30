import { useState, useEffect, useCallback } from "react";
import clienteAPI from "../api/clienteAxios";

export function useEntidades<T>(url:string)
{
    const[entidades, setEntidades] = useState<T[]>();
    const[cantTotalRegistros,setCantTotalRegistros] =useState(0);
    const[pagina,setPagina] =useState(1);
    const[recordPorPagina,setRecordsPorPagina] =useState(10);
    const[cargando,setCargando] =useState(true);

    const cargarRegistros = useCallback(() => {
        setCargando(true);
        clienteAPI.get<T[]>(url, {params:{pagina,recordPorPagina}})
           .then(respuesta =>   {           
            const cantidadTotalRegistros = parseInt(respuesta.headers['cantidad-total-registros']);
            setCantTotalRegistros(cantidadTotalRegistros);
            setEntidades(respuesta.data)
            setCargando(false);
           });
    },[pagina,recordPorPagina,url]);

    useEffect(() => { cargarRegistros ();   }, [cargarRegistros]
    );


    return {cargando,pagina,setPagina, recordPorPagina,setRecordsPorPagina, cantTotalRegistros,entidades,cargarRegistros };
}