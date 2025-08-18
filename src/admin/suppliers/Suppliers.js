import { Link } from 'react-router-dom';

export default function Suppliers() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link
        to="/admin/suppliers/list"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center hover:brightness-110"
      >
        Список
      </Link>
      <Link
        to="/admin/suppliers/create"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center hover:brightness-110"
      >
        Создать
      </Link>
    </div>
  );
}
