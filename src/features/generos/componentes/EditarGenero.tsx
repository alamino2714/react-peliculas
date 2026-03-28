import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type GeneroCreacion from "../modelos/GeneroCreacion.model";
import FormularioGenero from "./FormularioGenero";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/Cargando";
import clienteAPI from "../../../api/clienteAxios";
import type Genero from "../modelos/Genero.model";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";

export default function EditarGenero() {
    const { id } = useParams();
    const [modeloGenero, setModeloGenero] = useState<GeneroCreacion | undefined>(undefined)
    const navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        clienteAPI.get<Genero>(`/Generos/${id}`)
           .then(respuesta => setModeloGenero(respuesta.data))
        .catch(() => navigate('/generos'));
    }, [id,navigate])

    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
        try{
            await clienteAPI.put(`/Generos/${id}`,data);
            navigate('/generos');
        } 
        catch(err){
            const errors = extraerErrores(err as AxiosError);
            setErrores(errors);
        }
        console.log('Editando el genero');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    };


    return (
        <>
            <h3>Editar Genero</h3>
            {modeloGenero ? <FormularioGenero modelo={modeloGenero} errores={errores} onSubmit={onSubmit} /> : <Cargando />}
        </>
    )

}