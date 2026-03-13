import type { ReactNode } from "react";
import Cargando from "../../../componentes/Cargando";

export default function ListadoGenerico<T>(props:ListadoGenericoProps<T>)
{
  if(!props.listado) {return props.cargandoUI ? props.cargandoUI : <Cargando/>} 
  else if(props.listado.length === 0) {return props.listadoVacioUI ? props.listadoVacioUI : 'El listado se encuentra vacio...'}    
  else {      return props.children;    }
}


interface ListadoGenericoProps <T>{
    /* listado?: T[]; */
    listado: T[] | undefined;
    children:  ReactNode;
    listadoVacioUI?:ReactNode;
    cargandoUI?: ReactNode;

}