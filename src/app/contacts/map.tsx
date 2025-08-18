'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainerNoSSR = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });

const TileLayerNoSSR = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false }
)
export default function MyMap() {
  return (
    <MapContainerNoSSR
        center={[50.4501, 30.5234]} 
        zoom={18} 
        style={{ height: '406px', width: '100%', borderRadius: '16px' }}
    >
      <TileLayerNoSSR
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
    </MapContainerNoSSR>
  );
}
