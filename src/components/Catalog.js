import React from "react";
import { useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";

const CARDS_COUNT = 18;

export default function Catalog() {
  const navigate = useNavigate();

  // Формируем массив из 18 карточек (заполненные + "место свободно")
  const cards = [
    ...suppliers.map(s => ({ ...s, isPlaceholder: false })),
    ...Array(CARDS_COUNT - suppliers.length).fill(0).map((_, i) => ({
      isPlaceholder: true,
      id: "empty-" + (i + 1)
    }))
  ].slice(0, CARDS_COUNT);

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
          marginBottom: 9,
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
      <div style={{
        width: "100%",
        maxWidth: 500,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 13,
        justifyContent: "center",
        padding: "0 6px",
      }}>
        {cards.map((card, idx) => card.isPlaceholder ? (
          <div
            key={card.id}
            style={{
              background: "#23232a",
              borderRadius: 17,
              height: 115,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 3px 15px 3px",
              fontWeight: 600,
              color: "#999",
              fontSize: 15,
              textAlign: "center",
              boxShadow: "0 2px 10px #18161d25"
            }}
          >
            <span style={{
              marginTop: 12,
              marginBottom: 3,
              fontSize: 14,
              color: "#bdbdbd",
              fontWeight: 500,
              width: "100%",
              whiteSpace: "pre-line",
              letterSpacing: 0.1
            }}>Место<br />свободно</span>
          </div>
        ) : (
          <div
            key={card.id}
            onClick={() => navigate(`/supplier/${card.id}`)}
            style={{
              background: "#19191d",
              borderRadius: 17,
              height: 115,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 4px 9px 4px",
              cursor: "pointer",
              position: "relative",
              boxShadow: "0 2px 11px #18161d22",
              transition: "box-shadow 0.14s"
            }}
          >
            <div style={{
              width: "90%",
              height: 57,
              background: "#23232a",
              borderRadius: 13,
              marginTop: 7,
              marginBottom: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1.5px solid #20202a"
            }}>
              <img
                src={card.logo || "/images/no-logo.webp"}
                alt={card.name}
                style={{
                  width: "83%",
                  height: "83%",
                  objectFit: "contain",
                  display: "block",
                  background: "transparent"
                }}
                onError={e => { e.target.src = "/images/no-logo.webp"; }}
              />
            </div>
            <div style={{
              width: "98%",
              textAlign: "center",
              fontWeight: 600,
              color: "#fff",
              fontSize: 12.8,
              letterSpacing: 0.02,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: "0 auto 2px auto"
            }}>
              {card.name}
            </div>
            <div style={{
              color: "#37e08a",
              fontSize: 11.2,
              fontWeight: 600,
              marginBottom: 1,
              marginTop: 0,
              textAlign: "center"
            }}>
              {card.region}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
