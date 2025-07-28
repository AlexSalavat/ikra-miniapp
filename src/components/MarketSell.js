import React from "react";

const CATEGORIES = [
  {
    key: "ikra",
    image: "/images/ikra1.webp",
    title: "Икра",
  },
  {
    key: "krab",
    image: "/images/krab.webp",
    title: "Краб",
  },
  {
    key: "ryba",
    image: "/images/ryba1.webp",
    title: "Рыба",
  },
  {
    key: "more",
    image: "/images/mor.webp",
    title: "Морепродукты",
  },
];

export default function MarketSell() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center pb-20 pt-4">
      <h2 style={{
        fontWeight: 800,
        fontSize: 21,
        color: "#23df81",
        marginBottom: 18,
        letterSpacing: ".03em",
        textAlign: "center"
      }}>
        Категории товаров
      </h2>
      <div style={{
        width: "100%",
        maxWidth: 440,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 17,
        justifyContent: "center"
      }}>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => window.location.href = `/market/sell/${cat.key}`}
          >
            {/* Фото карточки */}
            <div style={{
              width: "100%",
              aspectRatio: "1/1",
              background: "#191a1f",
              borderRadius: 19,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 14px #16181d66"
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: "86%",
                  height: "86%",
                  objectFit: "contain",
                  background: "#23232a",
                  borderRadius: 16,
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            {/* Название под карточкой */}
            <div
              style={{
                marginTop: 8,
                color: "#fff",
                fontWeight: 700,
                fontSize: 13.3,
                textAlign: "center",
                maxHeight: 44,
                minHeight: 28,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: "1.14"
              }}
              title={cat.title}
            >
              {cat.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
