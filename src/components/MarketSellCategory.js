import React, { useState } from "react";

// Пример универсального массива объявлений
const exampleAds = [
  {
    id: 1,
    title: "Икра кеты солёная, 2024",
    images: ["/images/ikra1.webp", "/images/ikra2.webp"],
    price: "3200 ₽/кг",
    company: "ООО КамчатИкра",
    region: "Камчатка",
  },
  {
    id: 2,
    title: "Горбуша свежемороженая, опт",
    images: ["/images/ryba1.webp"],
    price: "от 180 ₽/кг",
    company: "ООО РыбСнаб",
    region: "Сахалин",
  },
  // ...ещё объявления
];

export default function MarketSellCategory() {
  const [ads] = useState(exampleAds);

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      padding: "20px 0 60px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h2 style={{
        fontWeight: 800,
        fontSize: 21,
        color: "#23df81",
        marginBottom: 16,
        letterSpacing: ".03em"
      }}>
        Объявления о продаже
      </h2>
      <div style={{
        width: "100%",
        maxWidth: 440,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 15,
        justifyContent: "center"
      }}>
        {ads.map((ad) => (
          <div key={ad.id}
            style={{
              background: "#18181f",
              borderRadius: 19,
              boxShadow: "0 2px 18px #13151a33",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1.3px solid #22232b"
            }}>
            {/* Главное фото */}
            <img
              src={ad.images[0]}
              alt={ad.title}
              style={{
                width: "100%",
                height: 128,
                objectFit: "cover",
                background: "#26263b",
                borderRadius: 0,
                display: "block"
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            {/* Название */}
            <div style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 13.5,
              margin: "9px 7px 0 7px",
              textAlign: "center",
              lineHeight: 1.14,
              maxHeight: 36,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical"
            }}>
              {ad.title}
            </div>
            {/* Компания */}
            <div style={{
              color: "#a0f0c0",
              fontWeight: 500,
              fontSize: 12.3,
              margin: "1px 0 1px 0",
              textAlign: "center"
            }}>
              {ad.company}, {ad.region}
            </div>
            {/* Цена */}
            <div style={{
              color: "#23df81",
              fontWeight: 700,
              fontSize: 13.8,
              marginTop: 3,
              marginBottom: 8
            }}>
              {ad.price}
            </div>
            {/* Кнопка Подробнее */}
            <button
              style={{
                background: "#23df81",
                color: "#131513",
                fontWeight: 700,
                borderRadius: 11,
                padding: "7px 0",
                fontSize: 14,
                margin: "4px 0 13px 0",
                border: "none",
                cursor: "pointer",
                width: "84%"
              }}
              // onClick={() => ... открыть подробности ...}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
