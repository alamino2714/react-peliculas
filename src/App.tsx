import "./App.css";
import Menu from "./componentes/Menu";
import AppRoute from './AppRoute';
import { HashRouter } from 'react-router';
import AutenticacionContext from "./features/seguridad/utilidades/AutenticacionContext";
import { useEffect, useState } from "react";
import type Claims from "./features/seguridad/modelos/Claims";
import { obtenerClaims } from "./features/seguridad/utilidades/ManejadorJWT";

export default function App() {

  const [claims, setClaims] = useState<Claims[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
  }, []);

  function actualizar(claims: Claims[]) {
    setClaims(claims);
  }

  return (
    <>
       <HashRouter>
        <AutenticacionContext.Provider value={{claims: claims, actualizar: actualizar}}>
          
        <Menu />
        <div className="container mb-4">
            <AppRoute/>          
        </div>

        </AutenticacionContext.Provider>
        </HashRouter>
      
    </>
  )
}


