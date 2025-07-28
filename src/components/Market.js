import React from "react";
import { useNavigate } from "react-router-dom";

const CARDS = [
  {
    key: "sell",
    image: "/images/kamc.webp",
    title: "Борт полный",
    description: "Икра, рыба, морепродукты, краб — свежие предложения",
    link: "/market/sell",
  },
  {
    key: "buy",
    image: "/images/kam.webp",
    title: "Забирай!",
    description: "Ищу улов, продукцию — готов забрать быстро",
    link: "/market/buy",
  },
];

const CARD_SIZE = 170;
const CARD_GAP = 22;

export default function Market() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen pb-20 pt-6 flex flex-col items-center">
      <div style={{
        width: "100%",
        maxWidth: 410,
        margin: "0 auto",
        marginTop: 8,
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

        {/* Сетка карточек: большие и квадратные */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
          gap: CARD_GAP,
          justifyContent: "center",
          marginBottom: 28,
        }}>
          {CARDS.map((card) => (
            <a
              key={card.key}
              href={card.link}
              style={{
                borderRadius: 21,
                background: "#19191d",
                overflow: "hidden",
                width: CARD_SIZE,
                height: CARD_SIZE,
                boxShadow: "0 4px 16px #181b2455",
                textDecoration: "none",
                transition: "box-shadow .13s,transform .12s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative"
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 21,
                  display: "block"
                }}
                onError={e => { e.target.src = "/images/no-image.webp"; }}
              />
            </a>
          ))}
        </div>

        {/* Названия и описания ПОД карточками, строго два в ряд */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
          gap: CARD_GAP,
          justifyContent: "center",
          marginTop: -14, // немного "подъехать" к карточке
          marginBottom: 32
        }}>
          {CARDS.map((card) => (
            <div key={card.key} style={{textAlign: "center"}}>
              <div style={{
                fontWeight: 800,
                color: "#fff",
                fontSize: 15.6,
                marginBottom: 2,
                marginTop: 2,
                lineHeight: 1.13,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.01em"
              }}>{card.title}</div>
              <div style={{
                fontSize: 11.2,
                color: "#6ee7b7",
                minHeight: 17,
                fontWeight: 500,
                whiteSpace: "normal",
                lineHeight: "1.14"
              }}>{card.description}</div>
            </div>
          ))}
        </div>

        {/* Кнопка Подать объявление — неоновый стиль */}
        <button
          style={{
            background: "linear-gradient(87deg,#23df81 50%,#2678f3 100%)",
            color: "#fff",
            fontWeight: 800,
            borderRadius: 14,
            padding: "14px 0",
            fontSize: 17,
            width: "100%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 25px #23df818a, 0 2px 10px #2678f340",
            letterSpacing: ".03em",
            textShadow: "0 2px 8px #23df8133"
          }}
          onClick={() => navigate("/market/sell/create")}
        >
          + Подать объявление
        </button>
      </div>
    </div>
  );
}
