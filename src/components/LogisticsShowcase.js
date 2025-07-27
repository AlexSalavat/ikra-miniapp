import React, { useState } from "react";
import logistics from "../data/logistics";
import { useNavigate } from "react-router-dom";

const FILTERS = ["Камчатка", "Владивосток", "Сахалин", "Хабаровск"];
const CARD_SIZE = 134;
const GAP = 2; // минимальный зазор

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
  const filtered = logistics.filter(item => getRegionShort(item.address) === region);

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
          marginBottom: 7,
          display: "flex",
          alignItems: "center",
          gap: 5,
          alignSelf: "flex-start",
          marginLeft: 13,
        }}
      >
        <svg width="18" height="18" fill="none" style={{ verticalAlign: "-3px" }}>
          <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      {/* Компактный фильтр */}
      <div style={{
        display: "flex",
        gap: 6,
        marginBottom: 14,
        width: "100%",
        justifyContent: "center",
        flexWrap: "nowrap"
      }}>
        {FILTERS.map(f => (
          <button
            key={f}
            style={{
              background: region === f ? "#23232a" : "none",
              color: region === f ? "#20d978" : "#bababa",
              border: `1.2px solid ${region === f ? "#20d978" : "#23232a"}`,
              borderRadius: 8,
              padding: "2.5px 9px",
              fontWeight: 700,
              fontSize: 12,
              minWidth: 52,
              maxWidth: 80,
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

      <div style={{
        width: "100%",
        maxWidth: 420,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: `${GAP}px`,
        padding: "0 4px"
      }}>
        {cards.map((card, idx) => (
          <div key={card.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            <div style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              background: card.isPlaceholder ? "#23232b" : "#191a1d",
              borderRadius: 19,
              overflow: "hidden",
              border: "1.2px solid #23232b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {card.isPlaceholder ? (
                <span style={{
                  color: "#aaa",
                  fontSize: 15.2,
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: "18px",
                  whiteSpace: "pre-line"
                }}>Место{"\n"}свободно</span>
              ) : (
                <img
                  src={card.logo || "/images/no-logo.webp"}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    background: "#191a1d",
                    display: "block"
                  }}
                  onError={e => { e.target.src = "/images/no-logo.webp"; }}
                />
              )}
            </div>
            <div style={{
              textAlign: "center",
              fontWeight: 600,
              color: "#fff",
              fontSize: 13,
              margin: "2.5px 0 0 0", // минимальный отступ
              minHeight: 16,
              maxWidth: CARD_SIZE + 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {!card.isPlaceholder ? card.name : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
