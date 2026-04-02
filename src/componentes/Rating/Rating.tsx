import { useEffect, useState } from "react";
import styles from './Rating.module.css'
import { usuarioEstaLogueado } from "../../features/seguridad/utilidades/ManejadorJWT";
import Swal from "sweetalert2";

export default function Rating(props: RatingProps) {
    const [maximoValorArreglo, setMaximoValorArreglo] = useState<number[]>([]);
    const [valorSeleccionadoTemp, setValorSeleccionadoTemp] = useState(props.valorSeleccionado);
    const [votoUsuario, setVotoUsuario] = useState(props.valorSeleccionado);

    useEffect(() => {
        setMaximoValorArreglo(Array(props.maximoValor).fill(0));
    }, [props.maximoValor]);


    function manejarMouseEnter(voto: number) {
        setValorSeleccionadoTemp(voto);
    }

    function manejarMouseLeave()
    {
        setValorSeleccionadoTemp(votoUsuario)
    }

    function manejarClick(voto:number)
    {
        const estaLogueado = usuarioEstaLogueado();
        if(!estaLogueado)
        {
            Swal.fire({title:'error', text: 'Debes loguaerte para votar', icon:'error'});
            return;
        }
        setValorSeleccionadoTemp(voto);
        setVotoUsuario(voto);
        props.onChange(voto);
    }

    return (
        <>
            {maximoValorArreglo.map((_, indice) => <i key={indice}
                onMouseEnter={() => manejarMouseEnter(indice + 1)}
                onMouseLeave={manejarMouseLeave}
                onClick={()=>manejarClick(indice + 1)}
                className={`bi bi-star-fill ms-1 ${indice < valorSeleccionadoTemp ? styles.checked : null}`}></i>)}
        </>
    )
}

interface RatingProps {
    maximoValor: number;
    valorSeleccionado: number;
    onChange(voto: number): void;
}