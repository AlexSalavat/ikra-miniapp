import React from "react";
import { useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";

const CARDS_COUNT = 18;
const CARD_SIZE = 86;  // Можно увеличить/уменьшить для твоего размера

export default function Catalog() {
  const navigate = useNavigate();

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
      <div style={{
        width: "100%",
        maxWidth: 430,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 11,
        padding: "0 10px"
      }}>
        {cards.map((card, idx) => (
          <div key={card.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => !card.isPlaceholder && navigate(`/supplier/${card.id}`)}
              style={{
                background: card.isPlaceholder ? "#25252b" : "#1a1b1f",
                borderRadius: 17,
                boxShadow: "0 2px 10px #19171c22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: card.isPlaceholder ? "default" : "pointer",
                height: CARD_SIZE,
                width: CARD_SIZE,
                marginBottom: 7,
                marginTop: 6,
                border: card.isPlaceholder ? "none" : "1.3px solid #262637",
                overflow: "hidden",
                transition: "box-shadow .18s"
              }}
            >
              {card.isPlaceholder ? (
                <span style={{
                  color: "#aaa",
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: "15px",
                  whiteSpace: "pre-line"
                }}>Место{"\n"}свободно</span>
              ) : (
                <img
                  src={card.logo || "/images/no-logo.webp"}
                  alt={card.name}
                  style={{
                    width: "98%",
                    height: "98%",
                    objectFit: "contain",
                    display: "block",
                    background: "transparent"
                  }}
                  onError={e => { e.target.src = "/images/no-logo.webp"; }}
                />
              )}
            </div>
            {/* Текст — только если есть компания */}
            {!card.isPlaceholder && (
              <>
                <div style={{
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: 12.8,
                  letterSpacing: 0.01,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: CARD_SIZE + 16,
                }}>
                  {card.name}
                </div>
                <div style={{
                  color: "#2bf599",
                  fontSize: 10.3,
                  fontWeight: 500,
                  marginBottom: 1,
                  textAlign: "center"
                }}>
                  {card.region}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
