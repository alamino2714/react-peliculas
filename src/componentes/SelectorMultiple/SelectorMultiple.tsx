import type SelectorMultipleModel from "./SelectorMultiple.model";
import styles from './SelectorMultiple.module.css'

export default function SelectorMultiple(props:SelectorMultipleProps)
{  
    const seleccionar = (item:SelectorMultipleModel) => {
        const seleccionadosAux = [...props.seleccionados,item];
        const noSeleccionadosAux =  props.noSeleccionados.filter(valor => valor!==item);
        props.onChange(seleccionadosAux, noSeleccionadosAux);
    }
    const noSeleccionar = (item:SelectorMultipleModel) => {       
        const seleccionadosAux =  props.seleccionados.filter(valor => valor!==item);  
        const noSeleccionadosAux =   [...props.noSeleccionados,item];
        props.onChange(seleccionadosAux, noSeleccionadosAux);
         
    }
   const seleccionarTodo = () => {
        const seleccionadosAux = [...props.seleccionados, ...props.noSeleccionados];
        const noSeleccionadosAux: SelectorMultipleModel[]= []  ;
        props.onChange(seleccionadosAux, noSeleccionadosAux);
    }
    const noSeleccionarTodo = () => {
        const seleccionadosAux : SelectorMultipleModel[]= []  ;  
        const noSeleccionadosAux= [...props.seleccionados, ...props.noSeleccionados];
        props.onChange(seleccionadosAux, noSeleccionadosAux);
    }


    return(
    <div className={styles.div}>
        <ul>
            {props.noSeleccionados.map(item=> <li key={item.llave} onClick={()=> seleccionar(item)}> {item.descripcion}</li>)}
        </ul>
        <div className={styles.botones}>
            <button type="button" onClick={seleccionarTodo}>{'>>'}</button>
            <button type="button" onClick={noSeleccionarTodo}>{'<<'}</button>
        </div>
        <ul>
            {props.seleccionados.map(item=> <li key={item.llave} onClick={()=> noSeleccionar(item)}> {item.descripcion}</li>)}
        </ul>

    </div>
    )

}


interface SelectorMultipleProps{
   seleccionados: SelectorMultipleModel[];
   noSeleccionados: SelectorMultipleModel[];
   onChange(seleccionados: SelectorMultipleModel[],noSeleccionados: SelectorMultipleModel[]): void; 
}