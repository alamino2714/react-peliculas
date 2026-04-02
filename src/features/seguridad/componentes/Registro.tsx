import FormularioAutenticacion from "./FormularioAutenticacion";

export default function Registro() {
    return (
        <>
            <h3>Registro de usuario</h3>
            <FormularioAutenticacion url="/Usuarios/registrar"></FormularioAutenticacion>
        </>
    )
}