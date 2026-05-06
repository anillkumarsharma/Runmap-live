import { useState, useRef, useCallback } from 'react';
import { calcDistance, calcArea, calcCalories, calcPace, formatTime } from '../utils/calculate';

export function useGPS() {
  const [isRunning, setIsRunning] = useState(false);
  const [coords, setCoords] = useState([]);
  const [stats, setStats] = useState({
    distance: 0,      // meters
    area: 0,          // m²
    speed: 0,         // km/h
    pace: '0:00',     // min/km
    calories: 0,
    time: 0,          // seconds
    timeStr: '00:00:00'
  });
  const [error, setError] = useState(null);

  const watchId = useRef(null);
  const timerRef = useRef(null);
  const secondsRef = useRef(0);
  const startTimeRef = useRef(null);

  const startRun = useCallback(() => {
    if (!navigator.geolocation) {
      setError('GPS aapke browser mein support nahi hai!');
      return;
    }

    setCoords([]);
    secondsRef.current = 0;
    setIsRunning(true);
    setError(null);
    startTimeRef.current = Date.now();

    // Timer
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
      setStats(prev => ({
        ...prev,
        time: secondsRef.current,
        timeStr: formatTime(secondsRef.current)
      }));
    }, 1000);

    // GPS watch
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newCoord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        setCoords(prev => {
          const updated = [...prev, newCoord];

          const distMeters = calcDistance(updated);
          const distKm = distMeters / 1000;
          const area = calcArea(updated);
          const speed = position.coords.speed
            ? position.coords.speed * 3.6
            : 0;
          const calories = calcCalories(distKm);
          const pace = calcPace(distKm, secondsRef.current);

          setStats(prev2 => ({
            ...prev2,
            distance: distMeters,
            area,
            speed: parseFloat(speed.toFixed(1)),
            pace,
            calories: Math.round(calories),
          }));

          return updated;
        });
      },
      (err) => {
        setError('GPS error: ' + err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }
    );
  }, []);

  const stopRun = useCallback(() => {
    setIsRunning(false);
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    if (timerRef.current) clearInterval(timerRef.current);

    // Save to localStorage
    const session = {
      id: Date.now(),
      date: new Date().toLocaleDateString('hi-IN'),
      time: formatTime(secondsRef.current),
      distance: (stats.distance / 1000).toFixed(2),
      area: Math.round(stats.area),
      calories: stats.calories,
    };

    const prev = JSON.parse(localStorage.getItem('runmap_sessions') || '[]');
    prev.unshift(session);
    if (prev.length > 20) prev.pop();
    localStorage.setItem('runmap_sessions', JSON.stringify(prev));

    return session;
  }, [stats]);

  return { isRunning, coords, stats, error, startRun, stopRun };
}