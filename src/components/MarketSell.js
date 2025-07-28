import React from "react";

const CATEGORIES = [
  {
    key: "ikra",
    image: "/images/cav.webp",
    title: "Икра",
    description: "Красная и черная икра от прямых производителей.",
  },
  {
    key: "ryba",
    image: "/images/fish.webp",
    title: "Рыба",
    description: "Свежемороженая, охлажденная, разделанная рыба — оптом и в розницу.",
  },
  {
    key: "krab",
    image: "/images/krab.webp",
    title: "Краб",
    description: "Живой, варёно-мороженый, лапы и клещни, премиум-качество.",
  },
  {
    key: "mor",
    image: "/images/mor.webp",
    title: "Морепродукты",
    description: "Мидии, гребешок, креветка и другие деликатесы Дальнего Востока.",
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
        gap: 20,
        justifyContent: "center"
      }}>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              background: "none"
            }}
            onClick={() => window.location.href = `/market/sell/${cat.key}`}
          >
            {/* Фото карточки — во всю карточку, с закруглением */}
            <div style={{
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: 19,
              overflow: "hidden",
              boxShadow: "0 2px 14px #16181d66",
              background: "#23232a",
              marginBottom: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 19,
                  display: "block"
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            {/* Название под карточкой */}
            <div
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 15.2,
                marginBottom: 2,
                marginTop: 2,
                textAlign: "center",
                letterSpacing: ".01em"
              }}
            >
              {cat.title}
            </div>
            {/* Описание */}
            <div
              style={{
                color: "#a5ffa5",
                fontWeight: 400,
                fontSize: 11.3,
                textAlign: "center",
                lineHeight: "1.16",
                minHeight: 28,
                marginBottom: 2
              }}
            >
              {cat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
