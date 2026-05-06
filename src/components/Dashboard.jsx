export default function Dashboard({ stats }) {
  const distKm = (stats.distance / 1000).toFixed(2);
  const areaSqM = Math.round(stats.area).toLocaleString();
  const areaHa = (stats.area / 10000).toFixed(4);
  const areaFF = (stats.area / 7140).toFixed(2);

  const cards = [
    { label: 'Distance', value: distKm, unit: 'km', color: 'text-green-400' },
    { label: 'Area Covered', value: areaSqM, unit: 'm²', color: 'text-cyan-400', sub: `${areaHa} ha` },
    { label: 'Speed', value: stats.speed, unit: 'km/h', color: 'text-yellow-400' },
    { label: 'Pace', value: stats.pace, unit: 'min/km', color: 'text-purple-400' },
    { label: 'Calories', value: stats.calories, unit: 'kcal', color: 'text-orange-400' },
    { label: 'Time', value: stats.timeStr, unit: '', color: 'text-pink-400', small: true },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{card.label}</div>
          <div className={`font-bold ${card.color} ${card.small ? 'text-lg' : 'text-2xl'}`}>{card.value}</div>
          <div className="text-xs text-gray-600 mt-1">{card.unit}</div>
          {card.sub && <div className="text-xs text-gray-500 mt-1">{card.sub}</div>}
        </div>
      ))}

      {/* Football field comparison */}
      <div className="col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-4">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Area Comparison</div>
        <div className="flex gap-6">
          <div><span className="text-yellow-400 font-bold">{areaFF}</span> <span className="text-gray-500 text-xs">Football Fields</span></div>
          <div><span className="text-green-400 font-bold">{areaHa}</span> <span className="text-gray-500 text-xs">Hectares</span></div>
          <div><span className="text-cyan-400 font-bold">{areaSqM}</span> <span className="text-gray-500 text-xs">m²</span></div>
        </div>
      </div>
    </div>
  );
}