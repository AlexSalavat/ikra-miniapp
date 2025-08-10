import React, { useMemo, useState } from "react";
import logistics from "../data/logistics"; // твои данные

const FILTERS = [
  { label: "Все", keys: [] },
  { label: "Камчатка", keys: ["Камчатка", "Петропавловск"] },
  { label: "Владивосток", keys: ["Владивосток", "Приморье"] },
  { label: "Сахалин", keys: ["Сахалин", "Южно-Сахалинск"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
];

function matchByKeys(item, keys) {
  if (!keys || keys.length === 0) return true;
  const hay = `${item.region || ""} ${item.address || ""} ${item.name || ""}`.toLowerCase();
  return keys.some(k => hay.includes(String(k).toLowerCase()));
}

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);

  const items = useMemo(() => {
    const keys = FILTERS.find(f => f.label === filter)?.keys || [];
    return logistics.filter(it => matchByKeys(it, keys));
  }, [filter]);

  return (
    <div className="bg-black min-h-screen pb-20 pt-4 flex flex-col items-center">
      {/* Назад */}
      <div className="w-full max-w-[420px] px-3 mb-2">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition font-semibold"
        >
          <svg width="20" height="20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Назад
        </button>
      </div>

      {/* Заголовок */}
      <div className="w-full max-w-[420px] px-3">
        <h1 className="text-white font-extrabold text-[20px]">Логистика ДВ</h1>
        <div className="text-white/70 text-[12.8px]">Транспорт, экспедирование, контейнеры, рефы.</div>
      </div>

      {/* Фильтры */}
      <div className="w-full max-w-[420px] px-3 mt-3 flex gap-6 overflow-x-auto no-scrollbar">
        {FILTERS.map(f => {
          const active = f.label === filter;
          return (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className={[
                "px-3 py-1.5 rounded-xl text-[12.5px] font-bold whitespace-nowrap border transition",
                active ? "text-[#23df81] border-[#23df81] bg-white/5" : "text-white/70 border-white/10 hover:bg-white/5"
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Сетка карточек */}
      <div
        className="w-full mt-4 grid justify-center gap-3 px-3"
        style={{ gridTemplateColumns: "repeat(2, min(172px, 44vw))" }}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.mapLink || "#"}
            target={item.mapLink ? "_blank" : undefined}
            rel="noreferrer"
            className="card-glow glass-card group relative"
            style={{ borderRadius: 20, padding: 8 }}
            title={item.name}
          >
            {/* квадрат с фото/лого */}
            <div
              className="relative w-full aspect-square overflow-hidden border border-white/10"
              style={{ borderRadius: 14, background: "#11141a" }}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-white/70 text-sm">
                  Лого в разработке
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* регион‑пилюля */}
              {item.region && (
                <div className="absolute top-2 left-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white border border-white/15 bg-white/10 backdrop-blur-sm">
                    {item.region}
                  </span>
                </div>
              )}
            </div>

            {/* название и адрес */}
            <div className="mt-2">
              <div className="text-white font-bold text-[13.5px] leading-tight truncate">{item.name}</div>
              {item.address && (
                <div className="text-white/60 text-[11.5px] leading-snug line-clamp-2 mt-0.5">
                  {item.address}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* если пусто */}
      {items.length === 0 && (
        <div className="text-white/60 text-sm mt-10">Нет компаний по выбранному фильтру</div>
      )}
    </div>
  );
}
