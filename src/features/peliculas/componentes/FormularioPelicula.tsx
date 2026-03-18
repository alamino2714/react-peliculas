import { useForm, type SubmitHandler } from "react-hook-form";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import SeleccionarImagen from "../../../componentes/SeleccionarImagen";
import Boton from "../../../componentes/Boton";
import { NavLink } from "react-router";
import SelectorMultiple from "../../../componentes/SelectorMultiple/SelectorMultiple";
import type Genero from "../../generos/componentes/modelos/Genero.model";
import type SelectorMultipleModel from "../../../componentes/SelectorMultiple/SelectorMultiple.model";
import { useState } from "react";
import type Cine from "../../cine/componentes/modelos/Cine.model";
import TypeAheadActores from "./TypeAheadActores";


export default function FormularioPelicula(props:FormularioPeliculaProps)
{
   const { register, handleSubmit, setValue, formState:{errors, isValid, isSubmitting}
          } = useForm<PeliculaCreacion>({
             resolver:yupResolver(reglasDeValidacion),
             mode:'onChange',
             defaultValues:props.modelo??{titulo:''}
          } )

  const imagenActualURL: string |undefined =props.modelo?.poster ? props.modelo.poster as string : undefined;    
  
  const mapearId = (arreglo: {id: number, nombre:string}[]): SelectorMultipleModel[] =>{
    return arreglo.map (valor=> {
        return {llave: valor.id, descripcion: valor.nombre}
    })
  }

  const [generosSeleccionados, setGenerosSeleccionados] = useState(mapearId(props.generosSeleccionados));
  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapearId(props.generosNoSeleccionados));
  const [cinesSeleccionados, setCinesSeleccionados] = useState(mapearId(props.cinesSeleccionados));
  const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapearId(props.cinesNoSeleccionados));
 
  const onSubmit: SubmitHandler<PeliculaCreacion> = (data)=>{
    data.generosIds = generosSeleccionados.map(id=> id.llave);
    data.cinesIds = cinesSeleccionados.map(id=> id.llave);
    props.onSubmit(data);
  }
   

   return(
    <>
       <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label htmlFor="idTitulo"> Titulo</label>
            <input id="idTitulo" className="form-control" autoComplete="off" type="text" {...register('titulo')}/>
            {errors.titulo && <p className="error"> {errors.titulo.message}</p>}
        </div>
         <div className="form-group">
            <label htmlFor="idFechaLanzamiento"> Fecha Lanzamiento</label>
            <input id="idFechaLanzamiento" className="form-control" autoComplete="off" type="date" {...register('fechaLanzamiento')}/>
            {errors.fechaLanzamiento && <p className="error"> {errors.fechaLanzamiento.message}</p>}
        </div>
          <div className="form-group">
            <label htmlFor="idTrailer"> Trailer (YouTube)</label>
            <input id="idTrailer" className="form-control" autoComplete="off" type="text" {...register('trailer')}/>
        </div>
       
        <SeleccionarImagen label="Poster" imagenURL={imagenActualURL} imagenSeleccionada={poster => { setValue('poster',poster);}} />

         <div className="form-group" >
            <label> Géneros: </label>
            <SelectorMultiple seleccionados={generosSeleccionados} noSeleccionados={generosNoSeleccionados} 
                    onChange={(seleccionados, noSeleccionados) => {
                        setGenerosSeleccionados(seleccionados);
                        setGenerosNoSeleccionados(noSeleccionados);
                    }}>
            </SelectorMultiple>
         </div>   

         <div className="form-group" >
            <label> Cines: </label>
            <SelectorMultiple seleccionados={cinesSeleccionados} noSeleccionados={cinesNoSeleccionados} 
                    onChange={(seleccionados, noSeleccionados) => {
                        setCinesSeleccionados(seleccionados);
                        setCinesNoSeleccionados(noSeleccionados);
                    }}>
            </SelectorMultiple>
         </div>  
            <div className="form-group" >
                <TypeAheadActores></TypeAheadActores>
            </div>

        <div className="mt-2">
            <Boton type="submit" disabled={!isValid || isSubmitting}>{isSubmitting? 'Enviado...' : 'Enviar'} </Boton>
            <NavLink to="/" className="btn btn-secondary ms-2">Cancelar</NavLink>
        </div>



       </form>
    </>
   )
}

interface FormularioPeliculaProps{
    modelo?:PeliculaCreacion;
    onSubmit:SubmitHandler<PeliculaCreacion>;
    generosSeleccionados: Genero[];
    generosNoSeleccionados: Genero[];
    cinesSeleccionados: Cine[];
    cinesNoSeleccionados: Cine[];
}

const reglasDeValidacion = yup.object({
  titulo: yup.string().required('El titulo es obligario'),
  fechaLanzamiento: yup.string().required('La fecha de lanzamiento es requerida')
});