import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import clienteAPI from "../../../api/clienteAxios";
import type Genero from "../../generos/modelos/Genero.model";
import type Pelicula from "../modelos/Pelicula.model";
import type PeliculaFiltrarDTO from "../utilidades/PeliculaFiltrar.model";
import type { UseFormSetValue } from "react-hook-form";

export default function useFiltroPeliculas(valorInicial: PeliculaFiltrarDTO, setValue: UseFormSetValue<PeliculaFiltrarDTO>) {

    const [listGeneros, setListGeneros] = useState<Genero[]>([]);
    const [peliculas, setPeliculas] = useState<Pelicula[]>();
    
    const [serchParams, setSearchParams] = useSearchParams();
    const [pagina, setPagina] = useState(serchParams.has('pagina') ? parseInt(serchParams.get('pagina')!, 10) : 1);
    const [recordPorPagina, setRecordPorPagina] = useState(serchParams.has('recordPorPagina') ? parseInt(serchParams.get('recordPorPagina')!, 10) : 5);
    const [cantidadTotalDeRegistros, setCantidadTotalDeRegistros] = useState(0);

    useEffect(() => {
        clienteAPI.get<Genero[]>('/generos/todos')
            .then(respuesta => {
                setListGeneros(respuesta.data);
            })
    }, []);


    useEffect(() => {
        if(listGeneros.length === 0){
            return;
        }
        if(serchParams.has('titulo'))
        {
            valorInicial.titulo = serchParams.get('titulo')!;
            setValue('titulo', valorInicial.titulo);
        }
        if(serchParams.has('generoId'))        {
            valorInicial.generoId = parseInt(serchParams.get('generoId')!);
            setValue('generoId', valorInicial.generoId);
        }
        if(serchParams.has('proximosExtrenos')){
            valorInicial.proximosExtrenos = Boolean(serchParams.get('proximosExtrenos'));
            setValue('proximosExtrenos', valorInicial.proximosExtrenos);
        }
        if(serchParams.has('enCines')){
            valorInicial.enCines = Boolean(serchParams.get('enCines'));
            setValue('enCines', valorInicial.enCines);
        }

        buscarPeliculas(valorInicial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listGeneros, pagina, recordPorPagina]);


    function modificarURL(form: PeliculaFiltrarDTO){
        const params = new URLSearchParams();
        if(form.titulo){
            params.set('titulo', form.titulo);
        }
        if(form.generoId !== 0){
            params.set('generoId', String(form.generoId));
        }
        if(form.proximosExtrenos){
            params.set('proximosExtrenos', String(form.proximosExtrenos));
        }
        if(form.enCines){
            params.set('enCines', String(form.enCines.toString()));
        }
         params.set('pagina', String(pagina));
         params.set('recordPorPagina', String(recordPorPagina));

        setSearchParams(params);
        return params;

    }

    async function buscarPeliculas(form: PeliculaFiltrarDTO) {
        modificarURL(form);
        try {
            const respuesta = await clienteAPI.get<Pelicula[]>('/peliculas/filtrar', { params: {...form, pagina, recordPorPagina: recordPorPagina }});
            const cantidadTotalDeRegistros = parseInt(respuesta.headers['cantidad-total-registros'],10);
            setCantidadTotalDeRegistros (cantidadTotalDeRegistros);
            
            setPeliculas(respuesta.data);

        } catch (error) {
            console.log(error);
        }
    }


    return { buscarPeliculas, listGeneros, pagina, recordPorPagina, cantidadTotalDeRegistros,   setPagina,  setRecordPorPagina, peliculas };

}