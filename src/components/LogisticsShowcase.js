// src/components/LogisticsShowcase.js

import React, { useState } from "react";
import logistics from "../data/logistics";
import { useNavigate } from "react-router-dom";

const REGIONS = [
  "Камчатский край",
  "г. Владивосток",
  "г. Южно-Сахалинск",
  "г. Хабаровск"
];

// Поддержка альтернативных значений для фильтрации (если в data другие форматы)
function matchRegion(region, filter) {
  return region?.toLowerCase().includes(filter.toLowerCase()) ||
    (filter === "Камчатка" && region?.toLowerCase().includes("камчат")) ||
    (filter === "Сахалин" && region?.toLowerCase().includes("сахалин")) ||
    (filter === "Владивосток" && region?.toLowerCase().includes("владивосток")) ||
    (filter === "Хабаровск" && region?.toLowerCase().includes("хабаровск"));
}

const FILTERS = ["Камчатка", "Владивосток", "Сахалин", "Хабаровск"];
const CARD_SIZE = 140;

export default function LogisticsShowcase() {
  const [region, setRegion] = useState(FILTERS[0]);
  const navigate = useNavigate();
  const filtered = logistics.filter((item) => matchRegion(item.address || item.region, region));

  // Пустышки для сетки (10 карточек)
  const cards = [
    ...filtered.map(s => ({ ...s, isPlaceholder: false })),
    ...Array(10 - filtered.length).fill(0).map((_, i) => ({
      isPlaceholder: true,
      id: "empty-" + (i + 1)
    }))
  ].slice(0, 10);

  return (
    <div className="bg-black min-h-screen pb-20 pt-2 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        style={{
          color: "#2678f3",
          background: "none",
          border: "none",
          fontWeight: 500,
          fontSize: 18,
          cursor: "pointer",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
          alignSelf: "flex-start",
          marginLeft: 12,
        }}
      >
        <svg width="18" height="18" fill="none" style={{ verticalAlign: "-3px" }}>
          <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      {/* Фильтр */}
      <div style={{ display: "flex", gap: 9, marginBottom: 18 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            style={{
              background: region === f ? "#23232a" : "none",
              color: region === f ? "#20d978" : "#bababa",
              border: `1.3px solid ${region === f ? "#20d978" : "#23232a"}`,
              borderRadius: 8,
              padding: "4.5px 15px",
              fontWeight: 700,
              fontSize: 13,
              minWidth: 70,
              cursor: "pointer",
              transition: "border .13s, color .13s, background .13s",
              outline: "none"
            }}
            onClick={() => setRegion(f)}
          >{f}</button>
        ))}
      </div>
      {/* Карточки 2 в ряд */}
      <div style={{
        width: "100%",
        maxWidth: 400,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0px",
        rowGap: "0px",
        padding: "0 4px"
      }}>
        {cards.map((card, idx) => (
          <div key={card.id} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 0,
            marginTop: 0,
            userSelect: "none"
          }}>
            <div style={{
              position: "relative",
              width: CARD_SIZE,
              height: CARD_SIZE,
              marginBottom: 3,
              background: card.isPlaceholder ? "#23232b" : "#191a1d",
              borderRadius: 17,
              overflow: "hidden",
              border: "1.2px solid #22242b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {card.isPlaceholder ? (
                <span style={{
                  color: "#aaa",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: "17px",
                  whiteSpace: "pre-line"
                }}>Место{"\n"}свободно</span>
              ) : (
                <img
                  src={card.logo || "/images/no-logo.webp"}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "transparent",
                    display: "block"
                  }}
                  onError={e => { e.target.src = "/images/no-logo.webp"; }}
                />
              )}
            </div>
            {/* Текст под карточкой */}
            {!card.isPlaceholder && (
              <>
                <div style={{
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: 13.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: CARD_SIZE + 10,
                  marginBottom: 0,
                  marginTop: 1
                }}>
                  {card.name}
                </div>
                <div style={{
                  color: "#20d978",
                  fontSize: 10.2,
                  fontWeight: 500,
                  marginBottom: 1,
                  textAlign: "center"
                }}>
                  {card.address}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
