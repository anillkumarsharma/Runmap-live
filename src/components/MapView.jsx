import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const runnerIcon = L.divIcon({
  className: '',
  html: '<div class="runner-avatar">🏃</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position]);
  return null;
}

export default function MapView({ coords, isRunning }) {
  const [userLocation, setUserLocation] = useState(null);
  const defaultCenter = [28.6139, 77.2090];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {}
    );
  }, []);

  const positions = coords.map(c => [c.lat, c.lng]);

  const latestCoord = coords.length > 0 ? coords[coords.length - 1] : null;
  const markerPos = isRunning && latestCoord ? latestCoord : userLocation;
  const mapCenter = markerPos
    ? [markerPos.lat, markerPos.lng]
    : defaultCenter;

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-800 mb-4">
      <MapContainer
        center={mapCenter}
        zoom={17}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap'
        />

        {positions.length >= 2 && (
          <Polyline positions={positions} color="#60efff" weight={4} opacity={0.9} />
        )}

        {positions.length >= 3 && (
          <Polygon
            positions={positions}
            color="#00ff87"
            fillColor="#00ff87"
            fillOpacity={0.15}
            weight={2}
          />
        )}

        {markerPos && (
          <Marker position={[markerPos.lat, markerPos.lng]} icon={runnerIcon} />
        )}

        <RecenterMap position={markerPos} />
      </MapContainer>
    </div>
  );
}
