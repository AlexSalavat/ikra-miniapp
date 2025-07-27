import React, { useState } from "react";
import logistics from "../data/logistics";
import { useNavigate } from "react-router-dom";

const FILTERS = ["Камчатка", "Владивосток", "Сахалин", "Хабаровск"];
const CARD_SIZE = 146; // сделай размер как в производстве

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

  // Делаем 2 ряда по 5 карточек (10 всего, с заглушками если не хватает)
  const cards = [
    ...filtered.map(s => ({ ...s, isPlaceholder: false })),
    ...Array(10 - filtered.length).fill(0).map((_, i) => ({
      isPlaceholder: true,
      id: "empty-" + (i + 1)
    }))
  ].slice(0, 10);

  return (
    <div className="bg-black min-h-screen pb-20 pt-2 flex flex-col items-center">
      {/* Назад */}
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

      {/* Фильтр */}
      <div style={{
        display: "flex",
        gap: 4,
        marginBottom: 11,
        width: "100%",
        justifyContent: "center"
      }}>
        {FILTERS.map(f => (
          <button
            key={f}
            style={{
              background: region === f ? "#23232a" : "none",
              color: region === f ? "#20d978" : "#bababa",
              border: `1.2px solid ${region === f ? "#20d978" : "#23232a"}`,
              borderRadius: 7,
              padding: "2.2px 8px",
              fontWeight: 700,
              fontSize: 12,
              minWidth: 46,
              maxWidth: 78,
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            onClick={() => setRegion(f)}
          >{f}</button>
        ))}
      </div>

      {/* Сетка карточек */}
      <div style={{
        width: "100%",
        maxWidth: 2 * CARD_SIZE + 16, // два в ряд + чуть-чуть отступов по краям
        display: "grid",
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 7,
        justifyContent: "center"
      }}>
        {cards.map((card, idx) => (
          <div
            key={card.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 0,
            }}
          >
            {/* Карточка — только картинка */}
            <div style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              background: card.isPlaceholder ? "#23232b" : "#191a1d",
              borderRadius: 17,
              overflow: "hidden",
              border: "1.2px solid #18191c",
              marginBottom: 5, // минимальный отступ до текста
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
            {/* Текст — только под карточкой */}
            {!card.isPlaceholder && (
              <div style={{
                width: "100%",
                textAlign: "center",
                fontWeight: 600,
                color: "#fff",
                fontSize: 13.2,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
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
