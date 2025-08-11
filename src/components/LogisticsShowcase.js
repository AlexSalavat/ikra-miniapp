// src/components/LogisticsShowcase.js
import React, { useMemo, useState } from "react";
import logistics from "../data/logistics";

const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток", "Примор"] },
  { label: "Сахалин", keys: ["Сахалин"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
  { label: "Магадан", keys: ["Магадан"] },
];

function isMatchByKeys(item, keys) {
  if (!keys || keys.length === 0) return true;
  const hay = `${item?.address || ""} ${item?.name || ""} ${item?.region || ""}`.toLowerCase();
  return keys.some(k => hay.includes(String(k).toLowerCase()));
}

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);
  const activeKeys = useMemo(
    () => FILTERS.find(f => f.label === filter)?.keys || [],
    [filter]
  );

  const filtered = logistics.filter((x) => isMatchByKeys(x, activeKeys));

  return (
    <div className="bg-black min-h-screen pb-24 pt-4 flex flex-col items-center">
      {/* Назад */}
      <div className="w-full max-w-[440px] px-3 mb-2">
        <button
          onClick={() => window.history.back()}
          className="text-[#23df81] hover:text-white transition font-semibold inline-flex items-center gap-1"
        >
          <svg width="18" height="18" fill="none">
            <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Назад
        </button>
      </div>

      {/* Заголовок */}
      <div className="w-full max-w-[440px] px-3">
        <h1 className="text-white font-extrabold text-[20px] mb-2">
          Логистика ДВ
        </h1>
        <div className="text-white/70 text-[13px]">
          Транспорт, экспедирование, хранение, мультимодальные маршруты.
        </div>
      </div>

      {/* Фильтр регионов */}
      <div className="w-full max-w-[440px] px-3 mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => {
          const active = f.label === filter;
          return (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className={[
                "px-3 py-1.5 rounded-lg text-[12.5px] font-bold whitespace-nowrap transition",
                active
                  ? "bg-white/10 border border-white/10 text-[#23df81]"
                  : "bg-white/5 border border-white/5 text-white/80 hover:bg-white/10"
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Сетка карточек — стекло + холодная подсветка + КРУПНОЕ ФОТО */}
      <div
        className="w-full max-w-[440px] px-3 mt-4 grid gap-3 justify-center"
        style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
      >
        {filtered.map((item, idx) => {
          const isEmpty = !item || item.isEmpty;
          return (
            <div
              key={idx}
              className={[
                "relative overflow-hidden rounded-2xl",
                "bg-white/10 border border-white/10 backdrop-blur-md",
                "shadow-[0_12px_34px_rgba(14,129,255,0.20)]",
                "hover:shadow-[0_18px_46px_rgba(14,129,255,0.30)]",
                "transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[.99]",
                "flex flex-col"
              ].join(" ")}
            >
              {/* МЕДИА БЛОК (крупно) */}
              <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                {(!isEmpty && item.logo) ? (
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/images/no-image.webp"; }}
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center bg-[#0f141c]">
                    <span className="text-white/50 text-[12.5px] font-semibold text-center px-2">
                      {isEmpty ? "Место свободно" : "Лого в разработке"}
                    </span>
                  </div>
                )}

                {/* Внутренняя тонкая кайма и мягкий блик */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[18px]"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,.08), 0 24px 60px -26px rgba(14,129,255,.35)"
                  }}
                />
              </div>

              {/* ТЕКСТ ПОД ФОТО (без адреса — по просьбе клиента) */}
              {!isEmpty && (
                <div className="px-2.5 py-2">
                  <div
                    className="text-white font-bold text-[13.5px] leading-tight line-clamp-2 min-h-[32px]"
                    title={item.name}
                  >
                    {item.name}
                  </div>
                  {/* при желании: чип региона */}
                  {item.region && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-white/80">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z"/><circle cx="12" cy="11" r="3"/>
                      </svg>
                      <span className="truncate">{item.region}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
