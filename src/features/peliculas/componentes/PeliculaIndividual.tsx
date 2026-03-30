import { Link, NavLink, useNavigate } from "react-router";
import type Pelicula from "../modelos/Pelicula.model";
import styles from "./PeliculaIndividual.module.css";
import Boton from "../../../componentes/Boton";
import confirmarBorrar from "../../../utilidades/confirmarBorrar";
import clienteAPI from "../../../api/clienteAxios";
import { useContext } from "react";
import AlertaContext from "../../../utilidades/alertaContext";

export default function PeliculaIndividual(props: PeliculaIndividualProps) {

    const construirUrlDetalle = () => `/peliculas/detalle/${props.pelicula.id}`;
    const navigate = useNavigate();
    const alertaDeContext = useContext(AlertaContext);


    const borrarPelicula = async (id:number) => {
        try {
            console.log('borrando pelicula...'+ id.toString());

            await clienteAPI.delete(`/Peliculas/${id}`);   
            console.log('pelicula borrada');     
            alertaDeContext();           
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className={styles.div}>
            <Link to={construirUrlDetalle()}  >
                {props.pelicula.poster ? <img src={props.pelicula.poster} alt={props.pelicula.titulo} /> : <div className={styles.divSinPoster}>Sin poster</div>}
            </Link>
            <p> <NavLink  to={construirUrlDetalle()}  > {props.pelicula.titulo} </NavLink> </p>
            {/* <p>{props.pelicula.sinopsis}</p>   */}
            <div>
                <Boton onClick={() => navigate(`/peliculas/editar/${props.pelicula.id}`)}>Editar</Boton>
                <Boton className="btn btn-danger ms-4" onClick={()=>confirmarBorrar(()=>borrarPelicula(props.pelicula.id))}>Borrar</Boton>
            </div>

        </div>
    )
}


interface PeliculaIndividualProps {
    pelicula: Pelicula;
}   