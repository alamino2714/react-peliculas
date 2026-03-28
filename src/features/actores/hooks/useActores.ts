import { useState, useEffect, useCallback } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type Actor from "../modelos/Actor.model";

export function useActores()
{
    const [actores, setActores] = useState<Actor[]>();
    const[cantTotalRegistros,setCantTotalRegistros] =useState(0);
    const[pagina,setPagina] =useState(1);
    const[recordPorPagina,setRecordsPorPagina] =useState(10);
    const[cargando,setCargando] =useState(true);

    const cargarRegistros = useCallback(() => {
        setCargando(true);
        clienteAPI.get<Actor[]>(`/Actores`, {params:{pagina,recordPorPagina}})
           .then(respuesta =>   {           
            const cantidadTotalRegistros = parseInt(respuesta.headers['cantidad-total-registros']);
            setCantTotalRegistros(cantidadTotalRegistros);
            setActores(respuesta.data)
            setCargando(false);
           });
    },[pagina,recordPorPagina]);

    useEffect(() => { cargarRegistros ();   }, [cargarRegistros]
    );


    return {cargando,pagina,setPagina, recordPorPagina,setRecordsPorPagina, cantTotalRegistros,actores,cargarRegistros };
} 