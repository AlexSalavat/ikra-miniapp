// src/components/LogisticsShowcase.js
import React, { useMemo, useState } from "react";
import logistics from "../data/logistics";

const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток"] },
  { label: "Сахалин", keys: ["Сахалин"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
];

const GAP = 8;

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

  // для ровных квадратов — считаем размер от ширины экрана
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
                "px-3 py-1 rounded-lg border text-sm font-bold whitespace-nowrap",
                active
                  ? "bg-[#0a1918] text-[#23df81] border-[#22b978]"
                  : "bg-transparent text-[#d3d3d7] border-[#20222b]",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Сетка */}
      <div
        className="w-full grid justify-center px-2"
        style={{
          maxWidth: `calc(2 * ${CARD_SIZE} + ${GAP}px)`,
          display: "grid",
          gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
          gap: GAP,
        }}
      >
        {filtered.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="relative rounded-[19px] overflow-hidden"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              background: "#212127",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 14px #16181d66",
            }}
          >
            {/* Фото/лого */}
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/no-logo.webp";
                }}
              />
            ) : (
              <span
                className="text-center font-semibold"
                style={{ color: "#86868d", fontSize: 15.5 }}
              >
                Лого в разработке
              </span>
            )}

            {/* НАЗВАНИЕ (адрес НЕ выводим) */}
            <div className="absolute left-0 right-0 bottom-0 bg-black/45 text-white font-bold text-[13.2px] text-center py-1.5 px-2 tracking-wide">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
