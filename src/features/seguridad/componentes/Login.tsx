import FormularioAutenticacion from "./FormularioAutenticacion";

export default function Login() {
    return (
        <>
            <h3>Iniciar sesión</h3>
            <FormularioAutenticacion url="/Usuarios/login"></FormularioAutenticacion>
        </>
    )
}