import { AxiosError } from "axios";

export function extraerErrores(obj: AxiosError): string[]{

    const data= obj.response?.data as RespuestaError;
    const errores = data.errors;
    let mensajesDeError: string[] = [];

    for (const campo in errores) {
         const mensajeConCampo = errores[campo].map(mensajeError => `${campo} : ${mensajeError}`);
         console.log(mensajeConCampo);
         mensajesDeError = mensajesDeError.concat(mensajeConCampo);
    }
    return mensajesDeError;

}


interface RespuestaError{
    errors:{
        [campoNombre:string]:string[];
    }
}