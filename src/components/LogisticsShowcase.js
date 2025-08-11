// src/components/LogisticsShowcase.js
import React, { useMemo, useState } from "react";
import logistics from "../data/logistics";

const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток"] },
  { label: "Сахалин", keys: ["Сахалин"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
];

const GAP = 10;

function isMatchByKeys(item, keys) {
  if (!keys?.length) return true;
  const hay = `${item.region || ""} ${item.name || ""}`.toLowerCase();
  return keys.some((k) => hay.includes(String(k).toLowerCase()));
}

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);

  const activeKeys = useMemo(
    () => FILTERS.find((f) => f.label === filter)?.keys || [],
    [filter]
  );

  const filtered = useMemo(
    () => logistics.filter((item) => isMatchByKeys(item, activeKeys)),
    [activeKeys]
  );

  // вычисляем квадрат под мобиль
  const CARD_SIZE = `calc((100vw - 26px - ${GAP}px) / 2)`;

  return (
    <div className="bg-black min-h-screen pt-2 pb-20 flex flex-col items-center">
      {/* Назад */}
      <button
        onClick={() => window.history.back()}
        className="self-start ml-3 mb-2 text-[#2678f3] font-semibold flex items-center gap-1"
      >
        <svg width="17" height="17" fill="none" className="-mt-[2px]">
          <path
            d="M12 4l-6 5 6 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </button>

      {/* Фильтры */}
      <div className="w-full max-w-[480px] overflow-x-auto px-2 flex gap-2 mb-3 no-scrollbar">
        {FILTERS.map((f) => {
          const active = filter === f.label;
          return (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className={[
                "px-3 py-1 rounded-lg border text-sm font-bold whitespace-nowrap transition",
                active
                  ? "bg-[#0a1918] text-[#23df81] border-[#22b978]"
                  : "bg-transparent text-[#d3d3d7] border-[#20222b] hover:border-white/20",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Сетка карточек в стиле «glass» как у поставщиков */}
      <div
        className="w-full grid justify-center px-2"
        style={{
          maxWidth: `calc(2 * ${CARD_SIZE} + ${GAP}px)`,
          display: "grid",
          gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
          gap: GAP,
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-card card-glow p-2 rounded-[22px] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99]"
            style={{ width: "100%" }}
          >
            {/* внутренняя стеклянная плитка */}
            <div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md aspect-square">
              {/* skeleton-фон */}
              {!item.logo && (
                <div className="absolute inset-0 bg-white/5" />
              )}

              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/images/no-logo.webp")}
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-white/70 text-sm font-semibold">
                  Лого в разработке
                </div>
              )}

              {/* НАЗВАНИЕ — стеклянная плашка, адрес НЕ показываем */}
              <div className="absolute inset-x-1 bottom-1 rounded-lg overflow-hidden">
                <div className="px-2.5 py-1.5 text-center text-white font-bold text-[12.8px] leading-tight border border-white/10 bg-black/45 backdrop-blur-md">
                  {item.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
