import { useForm, type SubmitHandler } from "react-hook-form";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import SeleccionarImagen from "../../../componentes/SeleccionarImagen";
import Boton from "../../../componentes/Boton";
import { NavLink } from "react-router";

export default function FormularioPelicula(props:FormularioPeliculaProps)
{
    const { register, handleSubmit, setValue, formState:{errors, isValid, isSubmitting}
          } = useForm<PeliculaCreacion>({
             resolver:yupResolver(reglasDeValidacion),
             mode:'onChange',
             defaultValues:props.modelo??{titulo:''}
          } )

     const imagenActualURL: string |undefined =props.modelo?.poster ? props.modelo.poster as string : undefined;     

   return(
    <>
       <form onSubmit={handleSubmit(props.onSubmit)}>
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
       
        <div className="mt-2">
            <Boton type="submit" disabled={!isValid || isSubmitting}>{isSubmitting? 'Enviado...' : 'Enviar'} </Boton>
            <NavLink to="/peliculas" className="btn btn-secondary ms-2">Cancelar</NavLink>
        </div>



       </form>
    </>
   )
}

interface FormularioPeliculaProps{
    modelo?:PeliculaCreacion;
    onSubmit:SubmitHandler<PeliculaCreacion>;
}

const reglasDeValidacion = yup.object({
  titulo: yup.string().required('El titulo es obligario'),
  fechaLanzamiento: yup.string().required('La fecha de lanzamiento es requerida')
});