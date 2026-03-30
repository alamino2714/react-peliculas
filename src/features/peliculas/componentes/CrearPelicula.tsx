import FormularioPelicula from "./FormularioPelicula";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import type Genero from "../../generos/modelos/Genero.model";
import type Cine from "../../cine/modelos/Cine.model";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/clienteAxios";
import Cargando from "../../../componentes/Cargando";
import type { SubmitHandler } from "react-hook-form";
import convertirPeliculaAFromData from "../utilidades/convertirPeliculaAFromData";
import type Pelicula from "../modelos/Pelicula.model";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

export default function CrearPelicula() {
  const navigate = useNavigate();
  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<Genero[]>([]);
  const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<Cine[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState<string[]>([]);


  useEffect(() => {
    clienteAPI.get('/peliculas/postget')
      .then(respuesta => {
        setGenerosNoSeleccionados(respuesta.data.generos);
        setCinesNoSeleccionados(respuesta.data.cines);
        setCargando(false);
        console.log(respuesta.data);
      })
  }, []);



  const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
  try {
        const formdata = convertirPeliculaAFromData(data);
        const respuesta = await clienteAPI.postForm<Pelicula>('/peliculas', formdata);
        navigate(`/peliculas/detalle/${respuesta.data.id}`);


 
    } catch (error) {
        const errores = extraerErrores(error as AxiosError);
        setErrores(errores);
         
    }


    console.log('creando pelicula...');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(data);
  }
  return (<>
    <h1>Crear Pelicula</h1>
    {cargando ? <Cargando /> :
      <FormularioPelicula onSubmit={onSubmit} errores={errores}
        generosSeleccionados={[]} generosNoSeleccionados={generosNoSeleccionados}
        cinesSeleccionados={[]} cinesNoSeleccionados={cinesNoSeleccionados}
        actoresSeleccionados={[]}
      />
    }

  </>

  )
}

 