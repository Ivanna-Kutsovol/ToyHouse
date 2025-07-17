'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MyMap() {
  return (
    <MapContainer
        center={[50.4501, 30.5234]} 
        zoom={18} 
        style={{ height: '406px', width: '100%', borderRadius: '16px' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
    </MapContainer>
  );
}
