// src/components/Catalog.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";

const CARDS_COUNT = 18;
const CARD_SIZE = 116; // Можешь чуть увеличить/уменьшить
const HIGHLIGHT_COLOR = "#2196f3";

export default function Catalog() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(null);

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
            <div style={{ position: "relative", width: CARD_SIZE, height: CARD_SIZE }}>
              <div
                onClick={() => !card.isPlaceholder && navigate(`/supplier/${card.id}`)}
                onMouseDown={() => setActiveIdx(idx)}
                onMouseUp={() => setActiveIdx(null)}
                onMouseLeave={() => setActiveIdx(null)}
                onTouchStart={() => setActiveIdx(idx)}
                onTouchEnd={() => setActiveIdx(null)}
                style={{
                  background: card.isPlaceholder
                    ? "#25252b"
                    : "#181b20",
                  borderRadius: 17,
                  boxShadow: "0 2px 10px #19171c1c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: card.isPlaceholder ? "default" : "pointer",
                  height: CARD_SIZE,
                  width: CARD_SIZE,
                  border: card.isPlaceholder ? "none" : "1.2px solid #23242d",
                  overflow: "hidden",
                  transition: "box-shadow .17s, background .15s",
                  padding: 0
                }}
              >
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
              {/* Подсветка */}
              {activeIdx === idx && !card.isPlaceholder && (
                <div style={{
                  position: "absolute",
                  bottom: -6,
                  left: "10%",
                  width: "80%",
                  height: 7,
                  borderRadius: 7,
                  background: `radial-gradient(circle, ${HIGHLIGHT_COLOR}77 70%, transparent 100%)`,
                  filter: "blur(2.5px)",
                  zIndex: 2,
                  pointerEvents: "none",
                  opacity: 1,
                  transition: "opacity .13s"
                }}/>
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
                  letterSpacing: 0.01,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: CARD_SIZE + 10,
                  marginBottom: 1,
                  marginTop: 2
                }}>
                  {card.name}
                </div>
                <div style={{
                  color: "#13ffc4",
                  fontSize: 10.2,
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
