import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type CineCreacion from "../modelos/CineCreacion.model";
import FormularioCine from "./FormularioCine";
import type { SubmitHandler } from "react-hook-form";
import Cargando from "../../../componentes/Cargando";
import clienteAPI from "../../../api/clienteAxios";
import type { AxiosError } from "axios";
import { extraerErrores } from "../../../utilidades/extraerErrores";

export default function EditarCine() {
  const { id } = useParams();
  const [modeloCine, setModeloCine] = useState<CineCreacion | undefined>(undefined);
  const [errores, setErrores] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    clienteAPI.get<CineCreacion>(`/Cines/${id}`).then(respuesta => {
      setModeloCine(respuesta.data);
    }).catch(() => navigate('/cines'));
  }, [id, navigate]);



  const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
    console.log('editando cine...')
    try {
        await clienteAPI.put(`/Cines/${id}`, data);
        navigate('/cines');
    } catch (errors) {
        const errores = extraerErrores(errors as AxiosError);
        setErrores(errores);
    }
  }
  return (
    <>
      <h3>Editar Cine </h3>
      {modeloCine ? <FormularioCine modelo={modeloCine} onSubmit={onSubmit} errores={errores} /> : <Cargando />}
    </>
  )
}