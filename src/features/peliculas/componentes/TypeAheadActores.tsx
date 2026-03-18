import { Typeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import type ActorPelicula from "../modelos/ActorPelicula.model";

export default function TypeAheadActores(props:TypeAheadActoresProps)
{

     const actores: ActorPelicula[] = [
        {id:1, nombre:'Primero', personaje: 'Peronsaje1', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'},
        {id:2, nombre:'Segundo', personaje: 'Peronsaje2', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'},
        {id:3, nombre:'Tercero', personaje: 'Peronsaje3', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chris_Evans_Red_2024.jpg/330px-Chris_Evans_Red_2024.jpg'}
     ]

    const seleccion: ActorPelicula[] = [];  

    return(
        <>
        <label>Actores</label>
        <Typeahead id="typeahead" 
           onChange={(actores: Option[]) => {
             const actorSelecionado=actores[0] as ActorPelicula;
             if(props.actores.findIndex(x=>x.id===actorSelecionado.id)===-1){
                props.onAdd([...props.actores,actorSelecionado])
             }           

           }}
           options={actores}
           labelKey={(opcion: Option) => {
             const actor = opcion as ActorPelicula;
             return actor.nombre;
           }}
           filterBy={['nombre']}
           placeholder="Escriba el nombre del actor.."
           minLength={2}
           flip = {true}
           selected={seleccion}
           renderMenuItemChildren={(opcion: Option) =>{
            const actor = opcion as ActorPelicula;
            return (
                <>
                   <img alt="imagen actor" src={actor.foto} style={{height:'48px', width:'48px', marginRight:'10px'}}/>
                   <span>{actor.nombre}</span>
                </>
            )
           }}
        ></Typeahead>
        
         <ul className="list-group">
              {props.actores.map( actor => (
                <li className="list-group-item d-flex aling-items-center" key={actor.id}>
                   <div style={{width:'70px'}}>
                     <img style={{height:'60px'}} src={actor.foto} alt="foto"></img>
                   </div>
                   <div style={{width:'150px', marginLeft:'1rem'}}>
                    {actor.nombre}
                   </div>
                   <div className="flex-grow-1 mx-3">
                      <input  className="form-control" placeholder="Pesonaje" type="text" value={actor.personaje} 
                      onChange={ e=> {
                        props.onCambioPersonaje(actor.id, e.currentTarget.value)
                      }}
                      />         
                            
                   </div>
                    <span role="button" className="badge text-bg-secondary" onClick={()=>{props.onRemove(actor)}}>X</span>      

                </li>
            ))}
        </ul>
        </>
    )
}


interface TypeAheadActoresProps{
    actores:ActorPelicula[];
    onAdd(actores:ActorPelicula[]):void;
    onCambioPersonaje(id:number, personaje:string):void;
    onRemove(actor:ActorPelicula):void;
}