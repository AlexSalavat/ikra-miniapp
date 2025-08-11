// src/components/LogisticsShowcase.js
import React, { useMemo, useState } from "react";
import logistics from "../data/logistics";
import s from "../styles/LogisticsShowcase.module.css";

const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток", "Примор"] },
  { label: "Сахалин", keys: ["Сахалин"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
  { label: "Магадан", keys: ["Магадан"] },
];

function isMatchByKeys(item, keys) {
  if (!keys || keys.length === 0) return true;
  const hay = `${item.region || ""} ${item.name || ""} ${item.address || ""}`.toLowerCase();
  return keys.some(k => hay.includes(String(k).toLowerCase()));
}

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);
  const activeKeys = useMemo(
    () => (FILTERS.find(f => f.label === filter)?.keys || []),
    [filter]
  );

  const filtered = useMemo(
    () => logistics.filter(item => isMatchByKeys(item, activeKeys)),
    [activeKeys]
  );

  // добиваем до ровной сетки (опционально)
  const MIN_CARDS = 10;
  const cards = filtered.concat(
    Array(Math.max(0, MIN_CARDS - filtered.length)).fill({ isEmpty: true })
  );

  return (
    <div className={s.page} style={{ ["--accent"]: "80,160,255" }}>
      {/* Шапка + назад */}
      <div className={s.header}>
        <button className={s.backBtn} onClick={() => window.history.back()}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад
        </button>
        <h1 className={s.title}>Логистика ДВ</h1>
        <span className={s.headerSpacer} />
      </div>

      {/* Фильтры */}
      <div className={s.regionFilter} role="tablist" aria-label="Фильтр по регионам">
        {FILTERS.map(f => {
          const active = f.label === filter;
          return (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className={active ? s.regionActive : s.regionBtn}
              role="tab"
              aria-selected={active}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Сетка карточек — стекло + холодная подсветка */}
      <div className={s.grid}>
        {cards.map((item, idx) => (
          <div key={idx} className={`${s.card} ${item.isEmpty ? s.empty : ""}`}>
            <div className={s.imgBox}>
              {!item.isEmpty && item.logo ? (
                <img
                  className={s.logo}
                  src={item.logo}
                  alt={item.name}
                  onError={e => { e.currentTarget.src = "/images/no-image.webp"; }}
                />
              ) : (
                <span className={s.placeholderText}>
                  {item.isEmpty ? "Место свободно" : "Лого в разработке"}
                </span>
              )}
            </div>

            {/* ТОЛЬКО название — адрес мы убрали */}
            {!item.isEmpty && (
              <div className={s.name} title={item.name}>{item.name}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
