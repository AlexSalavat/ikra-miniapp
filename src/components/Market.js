import React from "react";
import { useNavigate } from "react-router-dom";

const CARDS = [
  {
    key: "sell",
    image: "/images/kamc.webp",
    title: "Борт полный",
    description: "Свежие предложения: икра, рыба, морепродукты, краб",
    link: "/market/sell",
  },
  {
    key: "buy",
    image: "/images/kam.webp",
    title: "Забирай!",
    description: "Куплю: ищу улов, продукты, готов забрать",
    link: "/market/buy",
  },
];

const CARD_WIDTH = 158; // Можно менять по вкусу
const CARD_GAP = 19;

export default function Market() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen pb-20 pt-4 flex flex-col items-center">
      <div style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        marginTop: 10,
      }}>
        <h1 style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 22,
          margin: "0 0 19px 0",
          letterSpacing: 0.13,
          textAlign: "center",
        }}>
          Объявления
        </h1>

        {/* Сетка карточек */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${CARD_WIDTH}px)`,
          gap: CARD_GAP,
          justifyContent: "center",
          marginBottom: 28,
        }}>
          {CARDS.map((card, idx) => (
            <a
              key={card.key}
              href={card.link}
              style={{
                borderRadius: 18,
                background: "#19191d",
                overflow: "hidden",
                width: CARD_WIDTH,
                boxShadow: "0 2px 13px #16141a33",
                textDecoration: "none",
                transition: "box-shadow .13s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <div style={{
                width: "100%",
                aspectRatio: "1 / 1",
                background: "#23232a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={e => { e.target.src = "/images/no-image.webp"; }}
                />
              </div>
              {/* Название и описание под карточкой */}
              <div style={{
                width: "100%",
                background: "#16171c",
                padding: "9px 5px 8px 5px",
                textAlign: "center",
                minHeight: 46,
              }}>
                <div style={{
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 15.5,
                  marginBottom: 2,
                  letterSpacing: 0.01,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>{card.title}</div>
                <div style={{
                  fontSize: 10.9,
                  color: "#a9a9a9",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: 16
                }}>{card.description}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Кнопка подать объявление */}
        <button
          style={{
            background: "#357cff",
            color: "#fff",
            fontWeight: 800,
            borderRadius: 14,
            padding: "12px 0",
            fontSize: 16,
            width: "100%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 10px #2533af27"
          }}
          onClick={() => navigate("/market/sell/create")}
        >
          + Подать объявление
        </button>
      </div>
    </div>
  );
}
