import { useContext, useEffect, useState } from "react";
import AutenticacionContext from "../utilidades/AutenticacionContext";

export default function Autorizado(props: autorizacionProps) {

    const [autorizado, setAutorizado] = useState(false);
    const { claims } = useContext(AutenticacionContext);

    useEffect(() => {
        if (props.claims && props.claims.length > 0) {
            const existe = claims.some(c => props.claims?.includes(c.nombre));
            setAutorizado(existe);
        }

        else {
            setAutorizado(claims.length > 0);
        }
    }, [claims, props.claims]);


    return (
        <>
            {autorizado ? props.autorizado : props.noAutorizado}

        </>
    );





}

interface autorizacionProps {
    autorizado: React.ReactNode;
    noAutorizado?: React.ReactNode;
    claims?: string[];
    children?: React.ReactNode;
}