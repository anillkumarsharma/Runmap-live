import { useState, useEffect } from 'react';

export default function History() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('runmap_sessions') || '[]');
    setSessions(saved);
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center text-gray-500 text-sm">
        No runs saved yet. Start your first run! 🏃
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Past Sessions</div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {sessions.map(s => (
          <div key={s.id} className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3">
            <div>
              <div className="text-sm text-white font-medium">{s.time}</div>
              <div className="text-xs text-gray-500">{s.date}</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-sm font-bold">{s.distance} km</div>
              <div className="text-cyan-400 text-xs">{parseInt(s.area).toLocaleString()} m²</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}