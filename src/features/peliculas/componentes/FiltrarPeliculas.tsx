import { useForm, type SubmitHandler } from "react-hook-form";
import Boton from "../../../componentes/Boton";
import type Genero from "../../generos/modelos/Genero.model";

export default function FiltrarPeliculas() {

const valorInicial: FormType = { titulo:'', generoId:0, proximosExtrenos:false, enCines:false}    

const {register, handleSubmit, reset, formState:{isSubmitting}} = useForm<FormType>(    {
        defaultValues:valorInicial
    });

 const listGeneros:Genero[] = [{id:1,nombre:'Accion'},{id:2, nombre:'Comedia'}];   
const onSubmit: SubmitHandler<FormType> = async (data) =>{
    console.log('filtrando.....');
    await new Promise(resolve => setTimeout(resolve,2000));
    console.log(data);
}

    return (
        <>
            <h3>Filtro de Peliculas</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="row row-cols-lg-auto g-3 align-items-center">
                <div className="col-12">
                    <input id="titulo" placeholder="Titulo de la Pilicula" autoComplete="off" className="form-control" {...register('titulo')}/>
                </div>
                <div className="col-12">
                    <select className="form-select" {...register('generoId')}>
                        <option value='0'> --Seleccione un genero-- </option>
                         {listGeneros.map(genero=> <option key={genero.id} value={genero.id}> {genero.nombre} </option>)}
                    </select>
                </div>
                <div className="col-12">
                    <input id="idProximosExtrenos" className="form-check-input" type="checkbox"  {...register('proximosExtrenos')}/>
                    <label htmlFor="idProximosExtrenos" > Proximos Extrenos</label>
                </div>
                 <div className="col-12">
                    <input id="idEnCines" className="form-check-input" type="checkbox"  {...register('enCines')}/>
                    <label htmlFor="idEnCines" > En Cines</label>
                </div>

                  <div className="col-12">
                     <Boton disabled={isSubmitting} type="submit"> {isSubmitting? 'Filtrando': 'Filtrar'} </Boton>
                     <Boton onClick={()=>reset()} className="btn btn-danger ms-2"> Limpiar </Boton>
                </div>
            </form>

        </>
    );
}



interface FormType
{
    titulo: string;
    generoId:number;
    proximosExtrenos:boolean;
    enCines:boolean;

}