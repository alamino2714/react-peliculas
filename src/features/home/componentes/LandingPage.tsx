import { useEffect, useState } from "react";
import ListadoPeliculas from "../../peliculas/componentes/ListadoPeliculas";
import type LandingPageState from "../modelos/LandingPageState.model";
import clienteAPI from "../../../api/clienteAxios";
import AlertaContext from "../../../utilidades/alertaContext";

export default function LandingPage() {
   
    const [peliculas, setPeliculas] = useState<LandingPageState>({});

    useEffect(() => { 
      cargarDatos();
    }, [])

   
    function cargarDatos() {
        clienteAPI.get<LandingPageState>('/peliculas/landing')
        .then(respuesta => {
            setPeliculas(respuesta.data);            
        });
    }


    return (
        <>

            <AlertaContext.Provider value={() => cargarDatos()}>           
            <h1 className="h1">Peliculas en cines</h1>
            <ListadoPeliculas peliculas={peliculas.peliculasEnCines} />
            <h1 className="h1">Peliculas en estreno</h1>
            <ListadoPeliculas peliculas={peliculas.peliculasProximosEstrenos} />
            </AlertaContext.Provider>
        </>

    )

}


