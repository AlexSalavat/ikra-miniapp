// src/components/LogisticsShowcase.js

import React, { useState } from "react";
import logistics from "../data/logistics";
import { useNavigate } from "react-router-dom";

const FILTERS = ["Камчатка", "Владивосток", "Сахалин", "Хабаровск"];
const CARD_SIZE = 136;

function getRegionShort(address = "") {
  if (address.toLowerCase().includes("камчат")) return "Камчатка";
  if (address.toLowerCase().includes("сахалин")) return "Сахалин";
  if (address.toLowerCase().includes("владивосток")) return "Владивосток";
  if (address.toLowerCase().includes("хабаровск")) return "Хабаровск";
  return "";
}

export default function LogisticsShowcase() {
  const [region, setRegion] = useState(FILTERS[0]);
  const navigate = useNavigate();
  // Фильтруем по городу
  const filtered = logistics.filter((item) => getRegionShort(item.address) === region);

  // Делаем всегда 10 карточек (заполняем пустыми)
  const cards = [
    ...filtered.map(s => ({ ...s, isPlaceholder: false })),
    ...Array(10 - filtered.length).fill(0).map((_, i) => ({
      isPlaceholder: true,
      id: "empty-" + (i + 1)
    }))
  ].slice(0, 10);

  return (
    <div className="bg-black min-h-screen pb-20 pt-2 flex flex-col items-center">
      {/* Кнопка назад */}
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

      {/* Фильтр — компакт */}
      <div style={{
        display: "flex",
        gap: 7,
        marginBottom: 15,
        width: "100%",
        justifyContent: "center",
        flexWrap: "nowrap"
      }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            style={{
              background: region === f ? "#23232a" : "none",
              color: region === f ? "#20d978" : "#bababa",
              border: `1.3px solid ${region === f ? "#20d978" : "#23232a"}`,
              borderRadius: 8,
              padding: "3px 9px",
              fontWeight: 700,
              fontSize: 12,
              minWidth: 50,
              maxWidth: 90,
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "border .13s, color .13s, background .13s"
            }}
            onClick={() => setRegion(f)}
          >{f}</button>
        ))}
      </div>

      {/* Карточки 2 в ряд, квадратные, без зазора */}
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
            margin: 0,
            userSelect: "none"
          }}>
            <div style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
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
            {/* Только название компании */}
            {!card.isPlaceholder && (
              <div style={{
                textAlign: "center",
                fontWeight: 600,
                color: "#fff",
                fontSize: 13.5,
                margin: "2px 0 5px 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: CARD_SIZE + 12
              }}>
                {card.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
