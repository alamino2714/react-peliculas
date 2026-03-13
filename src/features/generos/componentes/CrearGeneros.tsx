import { NavLink } from "react-router";
import Boton from "../../../componentes/Boton";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function CrearGenero() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormType>({ resolver: yupResolver(reglasDeValidacion) });
    const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);

    return (
        <>
            <h3>Crear Genero</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input autoComplete="off" className="form-control" {...register('nombre')} />
                    {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                </div>

                <div className="mt-2">
                    <Boton type="submit">Enviar</Boton>
                    <NavLink to="/generos" className="btn btn-secondary ms-2">Cancelar</NavLink>
                </div>
            </form>
        </>
    )
}

interface FormType {
    nombre: string;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombre es requerido')
});