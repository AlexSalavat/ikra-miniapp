import React, { useState } from "react";
import logistics from "../data/logistics";

const CITIES = ["Камчатка", "Владивосток", "Сахалин", "Хабаровск"];
const CARDS_PER_ROW = 2;
const GAP = 6; // очень маленький зазор
const CARD_SIZE = `calc((100vw - 28px - ${GAP}px) / 2)`;

function filterByCity(item, city) {
  if (!city) return true;
  // поиск по подстроке (мягко)
  return (item.address && item.address.toLowerCase().includes(city.toLowerCase()))
    || (item.name && item.name.toLowerCase().includes(city.toLowerCase()));
}

export default function LogisticsShowcase() {
  const [city, setCity] = useState(CITIES[0]);
  // Фильтруем по выбранному городу
  const filtered = logistics.filter(item => filterByCity(item, city));
  // Заполняем свободные места до 10 карточек
  const cards = filtered.concat(Array(Math.max(0, 10 - filtered.length)).fill({ isEmpty: true }));

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
      {/* Фильтр города */}
      <div style={{
        display: "flex",
        gap: 6,
        marginBottom: 9,
        justifyContent: "center",
        width: "100%",
        paddingLeft: 6,
        paddingRight: 6,
        flexWrap: "wrap"
      }}>
        {CITIES.map(c => (
          <button
            key={c}
            onClick={() => setCity(c)}
            style={{
              background: city === c ? "#0a1918" : "none",
              color: city === c ? "#23df81" : "#d3d3d7",
              border: `1.3px solid ${city === c ? "#22b978" : "#20222b"}`,
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 13.4,
              minWidth: 77,
              padding: "4.5px 11px",
              cursor: "pointer",
              outline: "none"
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {/* Сетка карточек */}
      <div style={{
        width: "100%",
        maxWidth: 2 * 174 + GAP + 18,
        display: "grid",
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, minmax(0, 1fr))`,
        gap: GAP,
        justifyContent: "center",
        padding: "0 10px"
      }}>
        {cards.map((item, idx) => (
          <div key={idx}
            style={{
              background: "#212127",
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
              height: "74%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {!item.isEmpty && item.logo
                ? <img
                    src={item.logo}
                    alt={item.name}
                    style={{
                      width: "92%",
                      height: "92%",
                      objectFit: "contain",
                      background: "#18191c",
                      borderRadius: 13,
                    }}
                    onError={e => { e.target.src = "/images/no-logo.webp"; }}
                  />
                : <span style={{
                    color: "#86868d",
                    fontSize: 15.5,
                    fontWeight: 600,
                    textAlign: "center",
                    width: "90%"
                  }}>{item.isEmpty ? "Место\nсвободно" : "Лого в разработке"}</span>
              }
            </div>
            {/* Название и город отдельно — под карточкой */}
            <div style={{
              width: "100%",
              background: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              minHeight: 37,
              marginTop: 0,
              marginBottom: 2
            }}>
              {!item.isEmpty && (
                <>
                  <div style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13.5,
                    textAlign: "center",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: 1
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    color: "#22db94",
                    fontWeight: 500,
                    fontSize: 11.7,
                    textAlign: "center",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {item.address?.split(",")[0] || ""}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
