import { Link } from 'react-router-dom';

function Tile({ label, to, soon = false }) {
  const inner = (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 h-24 flex items-center justify-center text-center hover:brightness-110 transition">
      <div>
        <div className="text-sm opacity-70">{soon ? 'Скоро' : 'Раздел'}</div>
        <div className="text-lg font-semibold">{label}</div>
      </div>
    </div>
  );
  return to && !soon ? <Link to={to}>{inner}</Link> : inner;
}

export default function AdminHome() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Tile label="Поставщики" to="/admin/suppliers" />
      <Tile label="Логистика ДВ" soon />
      <Tile label="Производители" soon />
      <Tile label="Объявления" soon />
      <Tile label="Новости" soon />
      <Tile label="Икорные цены" soon />
    </div>
  );
}
