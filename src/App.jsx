import { useState } from 'react';
import { useGPS } from './hooks/useGPS';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import Controls from './components/Controls';
import History from './components/History';
import './index.css';

export default function App() {
  const { isRunning, coords, stats, error, startRun, stopRun } = useGPS();
  const [showHistory, setShowHistory] = useState(false);
  const [lastSession, setLastSession] = useState(null);

  function handleStop() {
    const session = stopRun();
    setLastSession(session);
    setShowHistory(true);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black tracking-widest text-green-400">RUNMAP</h1>
          <p className="text-xs text-gray-500 tracking-widest">LIVE GPS TRACKER</p>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-xs bg-gray-800 px-3 py-2 rounded-xl text-gray-300 hover:bg-gray-700"
        >
          {showHistory ? '📍 Map' : '📋 History'}
        </button>
      </div>

      {lastSession && !isRunning && (
        <div className="bg-green-900/30 border border-green-700 rounded-2xl p-4 mb-4 text-sm text-green-300">
          ✅ Run saved! <b>{lastSession.distance} km</b> — Area: <b>{parseInt(lastSession.area).toLocaleString()} m²</b>
        </div>
      )}

      <Controls isRunning={isRunning} onStart={startRun} onStop={handleStop} error={error} />
      <Dashboard stats={stats} />

      {showHistory ? (
        <History />
      ) : (
        <MapView coords={coords} isRunning={isRunning} />
      )}
    </div>
  );
}