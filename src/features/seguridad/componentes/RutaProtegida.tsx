import { Outlet } from "react-router";
import Autorizado from "./Autorizado";

export default function RutaProtegida(props: rutaProtegidaProps) {
    return (
        <>
               <Autorizado claims={props.claims} autorizado={<Outlet />} noAutorizado={<p>No tienes permisos para ver este contenido</p>} />
        </>
    );
}

interface rutaProtegidaProps {
    claims: string[];
}