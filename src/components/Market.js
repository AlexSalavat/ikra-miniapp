// src/components/Market.js
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
  const [hover, setHover] = React.useState(false);

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

        {/* Сетка карточек */}
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

        {/* Названия и описания ПОД карточками */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
          gap: CARD_GAP,
          justifyContent: "center",
          marginTop: -14,
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
                color: "#38d8ff",
                minHeight: 17,
                fontWeight: 500,
                whiteSpace: "normal",
                lineHeight: "1.14"
              }}>{card.description}</div>
            </div>
          ))}
        </div>

        {/* Кнопка разместить объявление — синий/голубой градиент */}
        <button
          style={{
            background: hover
              ? "linear-gradient(92deg,#44e2ff 0%,#2678f3 100%)"
              : "linear-gradient(92deg,#2678f3 0%,#44e2ff 100%)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 14,
            padding: "11px 0",
            fontSize: 15.4,
            width: "100%",
            border: "none",
            cursor: "pointer",
            marginTop: 10,
            marginBottom: 4,
            boxShadow: "0 2px 8px #2678f355",
            transition: "background 0.18s, box-shadow .15s",
            letterSpacing: ".01em",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigate("/market/add")} // вот здесь правильный путь!
        >
          Разместить объявление
        </button>
      </div>
    </div>
  );
}
