export default function Controls({ isRunning, onStart, onStop, error }) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {!isRunning ? (
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-black font-bold text-lg transition-all active:scale-95"
        >
          ▶ Running Shuru Karo
        </button>
      ) : (
        <button
          onClick={onStop}
          className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-400 text-white font-bold text-lg transition-all active:scale-95 animate-pulse"
        >
          ⏹ Rok Lo & Save Karo
        </button>
      )}

      {isRunning && (
        <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping inline-block"></span>
          GPS Track ho raha hai...
        </div>
      )}
    </div>
  );
}