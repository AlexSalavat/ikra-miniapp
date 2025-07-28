import React from "react";
import { useParams } from "react-router-dom";

// Массив всех объявлений с категорией
const exampleAds = [
  {
    id: 1,
    title: "Икра кеты солёная, 2024",
    images: ["/images/ikra1.webp"],
    category: "ikra", // <= совпадает с key в категориях!
    company: "ООО КамчатИкра",
    region: "Камчатка",
    price: "3200 ₽/кг"
  },
  {
    id: 2,
    title: "Горбуша свежемороженая, опт",
    images: ["/images/ryba1.webp"],
    category: "ryba",
    company: "ООО РыбСнаб",
    region: "Сахалин",
    price: "от 180 ₽/кг"
  },
  {
    id: 3,
    title: "Краб живой, Владивосток",
    images: ["/images/krab.webp"],
    category: "krab",
    company: "КрабСнаб",
    region: "Приморье",
    price: "12 000 ₽/шт"
  },
  {
    id: 4,
    title: "Мидии премиум",
    images: ["/images/mor.webp"],
    category: "mor",
    company: "Море Прим",
    region: "Владивосток",
    price: "850 ₽/кг"
  },
  // ...ещё
];

const CATEGORY_LABELS = {
  ikra: "Икра",
  ryba: "Рыба",
  krab: "Краб",
  mor: "Морепродукты",
};

export default function MarketSellCategory() {
  const { category } = useParams();

  // Фильтруем объявления по категории
  const filteredAds = exampleAds.filter(ad => ad.category === category);

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
        {CATEGORY_LABELS[category] || "Объявления"}
      </h2>
      <div style={{
        width: "100%",
        maxWidth: 440,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 15,
        justifyContent: "center"
      }}>
        {filteredAds.length === 0 && (
          <div style={{
            color: "#fff",
            fontSize: 15,
            gridColumn: "1/-1",
            textAlign: "center",
            marginTop: 25
          }}>Нет объявлений в этой категории</div>
        )}
        {filteredAds.map((ad) => (
          <div key={ad.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              background: "none"
            }}
            // onClick={() => ... подробнее ...}
          >
            {/* Фото карточки */}
            <div style={{
              width: "100%",
              aspectRatio: "1/1",
              background: "#191a1f",
              borderRadius: 19,
              overflow: "hidden",
              boxShadow: "0 2px 14px #16181d66",
              marginBottom: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img
                src={ad.images[0]}
                alt={ad.title}
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
                fontWeight: 700,
                fontSize: 13.3,
                marginBottom: 1,
                textAlign: "center",
                maxHeight: 44,
                minHeight: 28,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: "1.14"
              }}
              title={ad.title}
            >
              {ad.title}
            </div>
            {/* Цена и компания */}
            <div style={{
              color: "#23df81",
              fontWeight: 600,
              fontSize: 12.1,
              textAlign: "center",
              marginTop: 2,
            }}>
              {ad.price}
            </div>
            <div style={{
              color: "#a0f0c0",
              fontWeight: 500,
              fontSize: 11.3,
              textAlign: "center",
              marginBottom: 3
            }}>
              {ad.company} {ad.region && `· ${ad.region}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
