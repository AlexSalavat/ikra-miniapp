// src/components/LogisticsShowcase.js

import React from "react";
import { useNavigate } from "react-router-dom";
import logistics from "../data/logistics";

const CARDS_COUNT = 10;
const CARD_SIZE = 120;

export default function LogisticsShowcase() {
  const navigate = useNavigate();

  const cards = [
    ...logistics.map(c => ({ ...c, isPlaceholder: false })),
    ...Array(CARDS_COUNT - logistics.length).fill(0).map((_, i) => ({
      isPlaceholder: true,
      id: "empty-" + (i + 1),
      name: "Место свободно",
      region: "",
      logo: ""
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
            marginTop: 0
          }}>
            <div
              style={{
                background: card.isPlaceholder ? "#25252b" : "#16181c",
                borderRadius: 17,
                boxShadow: "0 2px 10px #19171c16",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: CARD_SIZE,
                width: CARD_SIZE,
                border: card.isPlaceholder ? "none" : "1.2px solid #23242d",
                overflow: "hidden",
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
                card.logo ? (
                  <img
                    src={card.logo}
                    alt={card.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // objectFit: "cover" если фото квадратное
                      background: "transparent",
                      display: "block"
                    }}
                    onError={e => { e.target.src = "/images/no-logo.webp"; }}
                  />
                ) : (
                  <span style={{ color: "#2690fc", fontSize: 21 }}>?</span>
                )
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
                  maxWidth: CARD_SIZE + 8,
                  marginBottom: 1,
                  marginTop: 2
                }}>
                  {card.name}
                </div>
                <div style={{
                  color: "#18f8a9",
                  fontSize: 10.2,
                  fontWeight: 500,
                  marginBottom: 1,
                  textAlign: "center"
                }}>
                  {card.address?.split(",")[0] || ""}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
