import * as turf from '@turf/turf';

// Distance calculate karo (meters mein)
export function calcDistance(coords) {
  if (coords.length < 2) return 0;
  const line = turf.lineString(coords.map(c => [c.lng, c.lat]));
  return turf.length(line, { units: 'kilometers' }) * 1000; // meters
}

// Area calculate karo (m² mein)
export function calcArea(coords) {
  if (coords.length < 3) return 0;
  try {
    const polygon = turf.polygon([[
      ...coords.map(c => [c.lng, c.lat]),
      [coords[0].lng, coords[0].lat] // close polygon
    ]]);
    return turf.area(polygon); // m²
  } catch {
    return 0;
  }
}

// Calories estimate
export function calcCalories(distanceKm, weightKg = 70) {
  return distanceKm * weightKg * 1.036;
}

// Pace calculate (min/km)
export function calcPace(distanceKm, seconds) {
  if (distanceKm === 0) return '0:00';
  const minPerKm = seconds / 60 / distanceKm;
  const min = Math.floor(minPerKm);
  const sec = Math.round((minPerKm - min) * 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

// Format seconds → HH:MM:SS
export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}