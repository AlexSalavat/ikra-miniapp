import React from "react";

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

export default function Market() {
  return (
    <div className="bg-black min-h-screen pb-20 pt-4 flex flex-col items-center">
      <div style={{
        width: "100%",
        maxWidth: 410,
        margin: "0 auto",
      }}>
        <h1 style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: 21,
          margin: "0 0 16px 0",
          letterSpacing: 0.13,
          textAlign: "center",
        }}>
          Объявления
        </h1>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 22 }}>
          {CARDS.map((card, idx) => (
            <a
              key={card.key}
              href={card.link}
              style={{
                borderRadius: 23,
                background: "#18181e",
                overflow: "hidden",
                width: "100%",
                maxWidth: 410,
                margin: "0 auto",
                boxShadow: "0 2px 13px #16141a33",
                textDecoration: "none"
              }}
            >
              <div style={{
                width: "100%",
                aspectRatio: "1.18/1",
                background: "#23232a",
                position: "relative"
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
              <div style={{
                background: "#18181d",
                padding: "14px 8px 13px 8px",
                textAlign: "center",
                minHeight: 58,
              }}>
                <div style={{
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 16.8,
                  marginBottom: 2,
                  letterSpacing: 0.03,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>{card.title}</div>
                <div style={{
                  fontSize: 12.5,
                  color: "#b5b5b5",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>{card.description}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
