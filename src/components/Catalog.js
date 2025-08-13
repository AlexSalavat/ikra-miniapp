import React, { useMemo, useState } from 'react';
import SupplierCard from './SupplierCard';
import { useSuppliers } from '../lib/useSuppliers';

export default function Catalog() {
  const { suppliers, loading, error } = useSuppliers();

  const [q, setQ] = useState('');

  const data = useMemo(() => {
    const list = Array.isArray(suppliers) ? suppliers : [];
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter((x) =>
      [x.name, x.region, x.city, ...(x.products || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(s)
    );
  }, [q, suppliers]);

  if (loading) return <div className="text-white p-4">Загрузка…</div>;
  if (error)
    return <div className="text-red-400 p-4">Ошибка: {String(error.message || error)}</div>;

  return (
    <div className="min-h-screen bg-black px-3 pt-4 pb-24">
      {/* Поиск */}
      <div className="sticky top-2 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2 bg-white/10 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)]">
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/60">
              <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск по названию, городу, продуктам…"
              className="w-full bg-transparent outline-none text-white placeholder-white/50 text-[14px] py-2"
            />
          </div>
        </div>
      </div>

      {/* Сетка */}
      <div className="mx-auto max-w-md mt-3 grid grid-cols-2 gap-3">
        {data.map((item) => (
          <SupplierCard key={item.id} company={item} />
        ))}

        {data.length === 0 && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[22px] h-[180px] bg-white/10 border border-white/10 backdrop-blur-xl animate-pulse"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
