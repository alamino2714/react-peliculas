import { AxiosError } from "axios";

export function extraerErrores(error: AxiosError): string[] {
    const mensajes: string[] = [];

    // 1. Error sin respuesta (problema de red, CORS, servidor caído, etc.)
    if (!error.response) {
        return ["No se pudo establecer conexión con el servidor."];
    }

    const { status, data } = error.response;

    // 2. Manejo por códigos HTTP
    if (status === 404) {
        return ["El recurso solicitado no fue encontrado (404)."];
    }

    if (status >= 500) {
        return ["Error interno del servidor. Inténtalo más tarde."];
    }

    // 3. Intentamos parsear errores del backend
    const respuestaError = data as Partial<RespuestaError>;

    if (respuestaError?.errors) {
        for (const campo in respuestaError.errors) {
              const mensajesCampo = respuestaError.errors[campo].map( (msg) => `${campo}: ${msg}`            );
              mensajes.push(...mensajesCampo);
        }
    }

    // 4. Fallback por si no vino en formato esperado
    if (mensajes.length === 0) {
        if (typeof data === "string") {
            mensajes.push(data);
        } else {
            mensajes.push("Ocurrió un error inesperado.");
        }
    }

    return mensajes;
}

interface RespuestaError {
    errors: {
        [campoNombre: string]: string[];
    };
}