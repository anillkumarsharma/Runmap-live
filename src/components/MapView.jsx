import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 0) {
      const last = coords[coords.length - 1];
      map.setView([last.lat, last.lng], map.getZoom());
    }
  }, [coords]);
  return null;
}

export default function MapView({ coords, isRunning }) {
  const defaultCenter = [28.6139, 77.2090]; // Delhi default

  const positions = coords.map(c => [c.lat, c.lng]);

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-800 mb-4">
      <MapContainer
        center={defaultCenter}
        zoom={17}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap'
        />

        {/* Route line */}
        {positions.length >= 2 && (
          <Polyline
            positions={positions}
            color="#60efff"
            weight={4}
            opacity={0.9}
          />
        )}

        {/* Covered area polygon */}
        {positions.length >= 3 && (
          <Polygon
            positions={positions}
            color="#00ff87"
            fillColor="#00ff87"
            fillOpacity={0.15}
            weight={2}
          />
        )}

        <RecenterMap coords={coords} />
      </MapContainer>
    </div>
  );
}