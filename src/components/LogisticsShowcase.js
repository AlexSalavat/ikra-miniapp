import React from "react";
import data from "../data/production"; // или logistics
import { useNavigate } from "react-router-dom";

const CARDS_PER_ROW = 2;
const GAP = 4; // минимальный зазор
const CARD_SIZE = `calc((100vw - 32px - ${GAP}px) / 2)`; // адаптивно!

export default function ProductionShowcase() {
  const navigate = useNavigate();
  // тут можно data.slice(0, 10) если нужно ровно 10 штук, иначе отрисуй все

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

      <div style={{
        width: "100%",
        maxWidth: 2 * 172 + GAP + 18, // по ширине экрана с запасом
        display: "grid",
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, minmax(0, 1fr))`,
        gap: GAP,
        justifyContent: "center",
        padding: "0 12px"
      }}>
        {data.map((item, idx) => (
          <div key={item.id || idx}
            style={{
              background: "#23232b",
              borderRadius: 18,
              width: "100%",
              aspectRatio: "1 / 1",
              minHeight: 0,
              minWidth: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative"
            }}>
            {/* Фото/лого */}
            <div style={{
              width: "100%",
              height: "70%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {item.logo
                ? <img
                    src={item.logo}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      background: "#191a1d"
                    }}
                    onError={e => { e.target.src = "/images/no-logo.webp"; }}
                  />
                : <span style={{
                    color: "#bababa",
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    width: "100%"
                  }}>{item.placeholder || "Лого в разработке"}</span>
              }
            </div>
            {/* Название под карточкой */}
            <div style={{
              width: "100%",
              minHeight: 38,
              background: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 0,
              paddingBottom: 4
            }}>
              <div style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15.3,
                textAlign: "center",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
