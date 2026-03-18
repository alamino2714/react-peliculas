import { useForm, type SubmitHandler } from "react-hook-form";
import type CineCreacion from "./modelos/CineCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { primeraLetraMayuscula } from "../../../validaciones/Validaciones";
import Boton from "../../../componentes/Boton";
import { NavLink } from "react-router";
import Mapa from "../../../componentes/Mapa/Mapa";
import type Coordenada from "../../../componentes/Mapa/Coordenada.model";

export default function FormularioCine(props: FormularioCineProps) {
    const { register, handleSubmit,
           setValue,
           formState: { errors, isValid, isSubmitting } }
        = useForm<CineCreacion>({
              resolver: yupResolver(reglasDeValidacion),
            mode: 'onChange',
            defaultValues: props.modelo ?? { nombre: '' }
        })

  function transformarCoordenadas(): Coordenada[] | undefined{
     if(props.modelo){
        const respuesta: Coordenada = {
            latitud: props.modelo.latitud,
            longitud: props.modelo.longitud
        } 
        return [respuesta];
     }
     return undefined;
  }

         return (
            <> 
              <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="idNombre">Nombre</label>
                    <input type="text" id="idNombre" className="form-control" autoComplete="off" {...register('nombre')}></input>
                    {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                </div>

                <div className="mt-2">
                    <Mapa coordenadas={transformarCoordenadas()}
                        lugarSeleccionado={coordenada => {
                        setValue('latitud', coordenada.latitud, {shouldValidate:true}) 
                        setValue('longitud', coordenada.longitud, {shouldValidate:true}) 
                         }}/>
                </div>

                <div className="mt-2">
                    <Boton type="submit" disabled={!isValid || isSubmitting}> {isSubmitting ? 'Enviando...' : 'Enviar'} </Boton>
                    <NavLink to="/cines" className="btn btn-secondary ms-2">Cancelar </NavLink>
                </div>
    
             </form>
            </>
         )
}

interface FormularioCineProps {
    modelo?: CineCreacion;
    onSubmit: SubmitHandler<CineCreacion>;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombr es obligatorio').test(primeraLetraMayuscula()),
    latitud: yup.number().required(),
    longitud: yup.number().required()
});