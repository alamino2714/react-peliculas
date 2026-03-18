import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import type Coordenada from "./Coordenada.models";
import { useState } from "react";

export default function Mapa() {
 
 const [coordenadas, setCoordenadas] =useState<Coordenada[]>();   
    
    return (
        <MapContainer center={[-34.90561563644888, -56.19430122330699]} zoom={15} scrollWheelZoom={true} style={{ height: '400px' }}   >
            <TileLayer
                attribution="Yun Peliculas"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClicMapa setPunto={coordenada => setCoordenadas([coordenada])}/>
                {coordenadas?.map(coordenada => 
                   <Marker key={coordenada.latitud + coordenada.longitud} position={[coordenada.latitud, coordenada.longitud]}>
                                {coordenada.mensaje ? <Popup>{coordenada.mensaje}</Popup>:undefined }     
                   </Marker>)}                     
        </MapContainer>
    )
}


function ClicMapa(props:ClicMapaProps){
 
    useMapEvent('click', e=> {
        props.setPunto({latitud:e.latlng.lat, longitud:e.latlng.lng})
    })
    return null;
}
interface ClicMapaProps{
 
    setPunto:(coordenada:Coordenada)=>void;

}