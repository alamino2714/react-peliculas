import { useForm, type SubmitHandler } from "react-hook-form";
import type CredencialesUsuarios from "../modelos/CredencialesUsuarios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import MostrarErrores from "../../../componentes/MostrarErrores";
import extraerErroresIdentity from "../utilidades/ExtraerErroresIdentity";
import type { AxiosError } from "axios";
import clienteAPI from "../../../api/clienteAxios";
import type RespuestaAutenticacion from "../modelos/RespuestaAutenticacion";
import { guardarTokenLocalStorage, obtenerClaims } from "../utilidades/ManejadorJWT";
import AutenticacionContext from "../utilidades/AutenticacionContext";
import Boton from "../../../componentes/Boton";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

export default function FormularioAutenticacion(props: FormularioAutenticacionProps) {


const [errores, setErrores] = useState<string[]>([]);
const {actualizar} = useContext(AutenticacionContext);
const navigate = useNavigate();

const {
        register, 
        handleSubmit, 
        formState:{errors, isValid, isSubmitting}
    } = useForm<CredencialesUsuarios>({
        resolver:yupResolver(reglasDeValidacion),
        mode: 'onChange'
       });

  
       
const onSubmit: SubmitHandler<CredencialesUsuarios> = async (datos) => {
    try {
       const respuesta = await clienteAPI.post<RespuestaAutenticacion>(props.url, datos);
       guardarTokenLocalStorage(respuesta.data);
       actualizar(obtenerClaims());
       navigate("/");
    }
    catch(error) {
        const errores = extraerErroresIdentity(error as AxiosError);
        console.error(errores);
        setErrores(errores);
    }
}

  return (
    <> 
    <MostrarErrores errores={errores} />
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" {...register("email")} />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" {...register("password")} />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
         <div className="mt-2">
            <Boton disabled={!isValid || isSubmitting} type="submit"> {isSubmitting ? 'Enviando...' : 'Enviar'}</Boton>
            <NavLink to="/" className="btn btn-secondary ms-2">Cancelar</NavLink>
        </div>


    </form>
    </>
  )


}

interface FormularioAutenticacionProps {
    url: string;
}


const reglasDeValidacion = yup.object().shape({
    email: yup.string().required("El campo email es requerido").email("El campo email debe ser un correo electrónico válido"),
    password: yup.string().required("El campo password es requerido").min(6, "La contraseña debe tener al menos 6 caracteres")
});