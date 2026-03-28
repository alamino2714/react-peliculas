import Swal from "sweetalert2";

export default function confirmarBorrar(
    onConfirm: () => void,
    titulo: string = 'Desea borrar el registro?',
    textoBotonConfirmacion: string = 'Borrar',
    texto: string = 'No se puede recuperar!'
) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:"#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: textoBotonConfirmacion
    }).then((result) => {
        if (result.isConfirmed) onConfirm();
    });
}