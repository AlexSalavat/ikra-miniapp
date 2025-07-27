import React from "react";
import { useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";

const CARDS_COUNT = 18;

export default function Catalog() {
  const navigate = useNavigate();

  // 18 карточек: заполненные + пустые
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
        maxWidth: 460,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        justifyContent: "center",
        padding: "0 6px",
      }}>
        {cards.map((card, idx) => card.isPlaceholder ? (
          <div
            key={card.id}
            style={{
              background: "#23232a",
              borderRadius: 16,
              height: 110,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#9ea1a6",
              fontSize: 14.7,
              textAlign: "center",
              boxShadow: "0 2px 9px #18161d22"
            }}
          >
            <span style={{
              fontSize: 13.8,
              color: "#bdbdbd",
              fontWeight: 500,
              width: "100%",
              whiteSpace: "pre-line",
              letterSpacing: 0.1
            }}>Место{"\n"}свободно</span>
          </div>
        ) : (
          <div
            key={card.id}
            onClick={() => navigate(`/supplier/${card.id}`)}
            style={{
              background: "#19191d",
              borderRadius: 16,
              height: 110,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 0 6px 0",
              cursor: "pointer",
              position: "relative",
              boxShadow: "0 2px 10px #18161d22",
              transition: "box-shadow 0.13s"
            }}
          >
            <div style={{
              width: "100%",
              flex: "1 1 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#23232a",
              borderRadius: 12,
              marginTop: 5,
              marginBottom: 0,
              overflow: "hidden",
              border: "1.5px solid #20202a",
              height: 70,
              minHeight: 0,
              maxHeight: 74
            }}>
              <img
                src={card.logo || "/images/no-logo.webp"}
                alt={card.name}
                style={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                  display: "block",
                  background: "transparent"
                }}
                onError={e => { e.target.src = "/images/no-logo.webp"; }}
              />
            </div>
            <div style={{
              width: "95%",
              textAlign: "center",
              fontWeight: 600,
              color: "#fff",
              fontSize: 11.5,
              letterSpacing: 0.01,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: "1px auto 0 auto"
            }}>
              {card.name}
            </div>
            <div style={{
              color: "#37e08a",
              fontSize: 10.4,
              fontWeight: 500,
              marginBottom: 0,
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
