import type { AxiosError } from "axios";

export default function extraerErroresIdentity(obj: AxiosError): string[] {
   const data = obj.response?.data as RespuestaErrorIdentity[];
   const mensajeDeError: string[] = data.map(error => error.description); 
   return mensajeDeError;
}


interface RespuestaErrorIdentity {
    code: string;
    description: string;
}