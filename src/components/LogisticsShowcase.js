import React, { useState } from "react";
import logistics from "../data/logistics";

const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток"] },
  { label: "Сахалин", keys: ["Сахалин"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
];

const CARDS_PER_ROW = 2;
const GAP = 7;

function isMatchByKeys(item, keys) {
  if (!keys || keys.length === 0) return true;
  const addr = (item.address || "") + " " + (item.name || "");
  return keys.some(key => addr.toLowerCase().includes(key.toLowerCase()));
}

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);

  const activeKeys = FILTERS.find(f => f.label === filter)?.keys || [];
  const filtered = logistics.filter(item => isMatchByKeys(item, activeKeys));
  const cards = filtered.concat(Array(Math.max(0, 10 - filtered.length)).fill({ isEmpty: true }));

  // Размер вычисляем по ширине экрана (чтобы квадраты!)
  const CARD_SIZE = `calc((100vw - 26px - ${GAP}px) / 2)`;

  return (
    <div className="bg-black min-h-screen pt-2 pb-20 flex flex-col items-center">
      {/* Кнопка назад */}
      <button
        onClick={() => window.history.back()}
        style={{
          color: "#2678f3",
          background: "none",
          border: "none",
          fontWeight: 500,
          fontSize: 18,
          cursor: "pointer",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 4,
          alignSelf: "flex-start",
          marginLeft: 13,
        }}
      >
        <svg width="17" height="17" fill="none" style={{ verticalAlign: "-3px" }}>
          <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      {/* Фильтр */}
      <div style={{
        display: "flex",
        gap: 6,
        marginBottom: 9,
        width: "100vw",
        maxWidth: "100vw",
        overflowX: "auto",
        whiteSpace: "nowrap",
        paddingLeft: 10,
        paddingRight: 6,
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}>
        {FILTERS.map(f => (
          <button
            key={f.label}
            onClick={() => setFilter(f.label)}
            style={{
              background: filter === f.label ? "#0a1918" : "none",
              color: filter === f.label ? "#23df81" : "#d3d3d7",
              border: `1.2px solid ${filter === f.label ? "#22b978" : "#20222b"}`,
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13.3,
              minWidth: 92,
              maxWidth: 110,
              padding: "4px 10px",
              cursor: "pointer",
              outline: "none",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            <span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{f.label}</span>
          </button>
        ))}
      </div>
      {/* Сетка карточек */}
      <div style={{
        width: "100%",
        maxWidth: `calc(2 * ${CARD_SIZE} + ${GAP}px)`,
        display: "grid",
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, minmax(0, 1fr))`,
        gap: GAP,
        justifyContent: "center",
        padding: "0 10px"
      }}>
        {cards.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#212127",
              borderRadius: 19,
              width: "100%",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
              minWidth: 0,
            }}>
            {/* Фото/лого */}
            {!item.isEmpty && item.logo
              ? <img
                  src={item.logo}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",    // Или попробуй 'contain' если только логотипы
                    background: "#18191c",
                  }}
                  onError={e => { e.target.src = "/images/no-logo.webp"; }}
                />
              : <span style={{
                  color: "#86868d",
                  fontSize: 15.5,
                  fontWeight: 600,
                  textAlign: "center",
                  width: "100%"
                }}>{item.isEmpty ? "Место\nсвободно" : "Лого в разработке"}</span>
            }
            {/* Название компании — под карточкой! */}
            {!item.isEmpty && (
              <div style={{
                position: "absolute",
                left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.46)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13.2,
                textAlign: "center",
                padding: "6px 5px 5px 5px",
                width: "100%",
                lineHeight: "1.11",
                letterSpacing: ".02em",
                textShadow: "0 2px 10px #0009"
              }}>
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
