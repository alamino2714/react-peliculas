import { useParams } from "react-router";

export default function EditarPelicula() {
    const { id } = useParams();
    return (
        <>
            <h1>Editar Pelicula</h1>
            <p> El id es: {id}</p>

        </>)
}