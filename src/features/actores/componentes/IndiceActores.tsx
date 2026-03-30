import type Actor from "../modelos/Actor.model";
import IndiceEntidades from "../../../componentes/IndiceEntidades";
import { useEntidades } from "../../../hooks/useEntidades";

export default function IndiceActores() {
   
    const entidadesHook= useEntidades<Actor>('/Actores');
    return (
        <>
          <IndiceEntidades<Actor>  
                 titulo="Actores" nombreEntidad="Actor" url="/actores" urlCrear="/actores/crear"   {...entidadesHook} >
                {
                    (actores, botones) =>
                        <>
                            <thead>
                                <tr>
                                    <th scope="col"> Item  </th>
                                    <th scope="col"> Nombre  </th>
                                    <th scope="col" className="text-end"> Acciones </th>
                                </tr>
                            </thead>

                            <tbody>
                                {actores?.map(actor => <tr key={actor.id}>
                                    <td> {actor.id}</td>
                                    <td> {actor.nombre}</td>
                                    <td className="text-end">
                                        {botones(`/actores/editar/${actor.id}`, actor.id)}
                                    </td>

                                </tr>)}

                            </tbody>
                        </>
                }
            </IndiceEntidades>
        </>
    )
}