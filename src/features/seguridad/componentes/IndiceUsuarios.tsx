import Swal from "sweetalert2";
import clienteAPI from "../../../api/clienteAxios";
import Boton from "../../../componentes/Boton";
import IndiceEntidades from "../../../componentes/IndiceEntidades";
import { useEntidades } from "../../../hooks/useEntidades";
import type EditarClaim from "../modelos/EditarClaim.models";
import type Usuario from "../modelos/Usuarios.model";
import confirmarBorrar from "../../../utilidades/confirmarBorrar";

export default function IndiceUsuarios()
{
    const usuariosHook = useEntidades<Usuario>('/Usuarios/listar');
    async function hacerAdmin (email:string)
    {
        await editarAdmin('/Usuarios/hacer-admin',email)
    }

    async function removerAdmin (email:string)
    {
        await editarAdmin('/Usuarios/remover-admin',email)
    }
    async function editarAdmin(url:string, email:string)
    {
        const editarClaim: EditarClaim = { email };
        
        await clienteAPI.post(url,editarClaim);
        Swal.fire({
            title: 'Exitoso',
            text: 'Operacion realizada con exito',
            icon:'success'
        });

    }    

    return (
        <IndiceEntidades<Usuario> titulo="Usuarios" {...usuariosHook}>
            {
                (usuarios) => <>
                  <thead className="table-light">
                           <tr>
                            <th scope="col"> Email</th>
                            <th scope="col" className="text-end"> Acciones </th>
                           </tr>
                  </thead>
                  <tbody>
                    {usuarios?.map(usuario => <tr key={usuario.email}>
                          <td>{usuario.email}</td>
                          <td className="text-end">
                            <Boton onClick= {()=> confirmarBorrar(()=> hacerAdmin(usuario.email),`Deseas hacer admin a ${usuario.email}`,`Sí` )}> Hacer Admin </Boton>
                            <Boton className="btn btn-danger ms-1" onClick= {()=> confirmarBorrar(()=> removerAdmin(usuario.email),`Deseas remover como admin a ${usuario.email}`,`Sí`)}> Remover Admin </Boton>
                          </td>
                    </tr>)}
                  </tbody>
                </>
            }

        </IndiceEntidades>
    )
}