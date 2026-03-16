export function primeraLetraMayuscula() {
    return {
        name: 'primera-letra-mayuscula',
        message: 'La primera letra debe ser mayúscula',
        test: (valor: string | undefined) => {
            if (valor && valor.length > 0) {
                const primeraLetra = valor.substring(0, 1);
                return primeraLetra === primeraLetra.toUpperCase();
            }
            return true;
        }
    }
}


export function fechaNoFutura() {
    return {
        name: 'fecha-no-futura',
        message: 'La fecha no puede ser futura',
        test: (valor: string | undefined) => {
            if (!valor) return true;
            const vFecha = new Date(valor);
            const vHoy = new Date(); 
            return vFecha <= vHoy;
        }
    }
}

