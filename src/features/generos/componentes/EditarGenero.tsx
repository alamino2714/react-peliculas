import { useParams } from "react-router";

export default function EditarGenero(){
    const { id } = useParams();
    return (
        <>
        <h3>Editar Genero</h3>
        <p> El id es: {id}</p>
        </>
    )

}