export default function MostrarErrores(props: MostrarErroresProps){
    return(
        <>
          <ul className="error">
            {props.errores.map(errorItem =><li key={errorItem}>{errorItem}</li>)}
          </ul>
        </>
    )

}

interface MostrarErroresProps{
    errores:string[];
}