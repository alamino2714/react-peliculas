export default function formatearFecha(fechaISO:string){
    //FechaTHora
    return new Date(fechaISO).toISOString().split('T')[0]; 
}