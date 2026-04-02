import { NavLink } from "react-router";
import Autorizado from "../features/seguridad/componentes/Autorizado";
import { useContext } from "react";
import AutenticacionContext from "../features/seguridad/utilidades/AutenticacionContext";
import Boton from "./Boton";
import { logout } from "../features/seguridad/utilidades/ManejadorJWT";

export default function Menu() {

   const { actualizar, claims } = useContext(AutenticacionContext);

   function obtenerNombreUsuario():string {
    return claims.filter(claim => claim.nombre === 'email')[0]?.valor;
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">React Peliculas</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/peliculas/filtrar" className="nav-link">Filtrar Pelicula</NavLink>
                        </li>
                        <Autorizado claims={['esadmin']}
                            autorizado={<>
                                <li className="nav-item">
                                    <NavLink to="/generos" className="nav-link">Generos</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/actores" className="nav-link">Actores</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cines" className="nav-link">Cines</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/peliculas/crear" className="nav-link">Crear Pelicula</NavLink>
                                </li>
                                 <li className="nav-item">
                                    <NavLink to="/usuarios" className="nav-link">Usuarios</NavLink>
                                </li>
                            </>
                            }
                        />
                    </ul>

                    <div className="d-flex">
                        <Autorizado claims={[]} autorizado={
                            <>
                                <span className='nav-item'> Hola, {obtenerNombreUsuario()} </span>
                                <Boton className="nav-link btn btn-link ms-2" onClick={()=> {logout(); actualizar([]);}}>Cerrar sesión</Boton>
                            </>
                        }
                        noAutorizado={
                            <>
                                <NavLink to="/login" className="nav-link btn btn-link">Login</NavLink>
                                <NavLink to="/registro" className="nav-link btn btn-link ms-2">Registro</NavLink>
                            </>
                        } />
                    </div>

                </div>
            </div>
        </nav>
    )
}

