import React from "react";
import type Claims from "../modelos/Claims";

const AutenticacionContext = React.createContext<AutenticacionContextParametros>({
    claims: [],
    actualizar: () => { }
});

interface AutenticacionContextParametros {
    claims: Claims[];
    actualizar: (claims: Claims[]) => void;
}


export default AutenticacionContext;