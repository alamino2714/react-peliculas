import type Claims from "../modelos/Claims";
import type RespuestaAutenticacion from "../modelos/RespuestaAutenticacion";

const lleveToken = "token";
const lleveExpiracion = "expiracion";


export function usuarioEstaLogueado()
{
    const claims = obtenerClaims();
    return claims.length > 0;
}

export function guardarTokenLocalStorage(autenticacion:RespuestaAutenticacion)
{
    localStorage.setItem(lleveToken, autenticacion.token);
    localStorage.setItem(lleveExpiracion, autenticacion.expiracion.toString()); 
}
export function logout()
{
    localStorage.removeItem(lleveToken);
    localStorage.removeItem(lleveExpiracion);
}
export function obtenerClaims(): Claims[]
{
    const token = localStorage.getItem(lleveToken);
    const expiracion = localStorage.getItem(lleveExpiracion);
    if(!token || !expiracion)
    {
        logout();
        return [];
    }
    const expiracionFecha = new Date(expiracion);
    if(isNaN(expiracionFecha.getTime()) || expiracionFecha < new Date())
    {
        logout();
        return [];
    }
    try {
        const payloadBase64 = token.split(".")[1];
        const payloadDecodificadoJSON = atob(payloadBase64);
        const dataToken = JSON.parse(payloadDecodificadoJSON);
        const claims: Claims[] = Object.entries(dataToken).map(([nombre, valor]) => ({ nombre, valor: String(valor) }));
        return claims;
    }
    catch(error)  {
        console.error(error);
        logout();
        return [];
    }

}
export function obtenerToken()
{
    const token = localStorage.getItem(lleveToken);
    return token;
}