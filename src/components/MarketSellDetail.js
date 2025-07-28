// src/components/MarketSellDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Данные объявлений (лучше вынести в отдельный файл data/ads.js и импортировать)
const exampleAds = [
  {
    id: 1,
    title: "Икра кеты солёная, 2024",
    images: ["/images/ikra1.webp", "/images/ikra2.webp"],
    category: "ikra",
    company: "ООО КамчатИкра",
    region: "Камчатка",
    price: "3200 ₽/кг",
    contact: "+7 900 123-45-67",
    description: "Свежий улов, доставка по РФ. Все документы.",
    documents: ["Меркурий", "Честный знак"],
    warehouse: "Петропавловск-Камчатский, ул. Морская, 5",
    payment: "Безналичный, наличный",
  },
  {
    id: 2,
    title: "Горбуша свежемороженая, опт",
    images: ["/images/ryba1.webp"],
    category: "ryba",
    company: "ООО РыбСнаб",
    region: "Сахалин",
    price: "от 180 ₽/кг",
    contact: "+7 900 000-00-00",
    description: "Оптовые поставки. Супер качество.",
    documents: ["Меркурий"],
    warehouse: "Южно-Сахалинск, рыбный порт",
    payment: "Безналичный",
  },
  // ... ещё объявления
];

export default function MarketSellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Найти объявление по id (id может быть строкой)
  const ad = exampleAds.find(ad => String(ad.id) === String(id));

  if (!ad) return (
    <div style={{ color: "#fff", padding: 30 }}>Объявление не найдено</div>
  );

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      color: "#fff",
      padding: 22,
      fontFamily: "inherit",
      maxWidth: 420,
      margin: "0 auto"
    }}>
      {/* Кнопка назад */}
      <button onClick={() => navigate(-1)}
        style={{
          marginBottom: 18,
          padding: "6px 16px",
          borderRadius: 11,
          background: "none",
          color: '#357cff',
          border: 'none',
          fontWeight: 500,
          fontSize: 15,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 5
        }}>
        <svg width="18" height="18" fill="none" style={{ verticalAlign: '-3px', marginRight: 3 }}>
          <path d="M12 4l-6 5 6 5" stroke="#357cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      {/* Галерея фото (можно сделать цикл по ad.images) */}
      <div style={{
        width: "100%",
        aspectRatio: "1/1",
        background: "#191a1f",
        borderRadius: 19,
        overflow: "hidden",
        marginBottom: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 14px #16181d66"
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
      {/* Название и цена */}
      <div style={{
        fontWeight: 800,
        fontSize: 17,
        color: "#fff",
        marginBottom: 4
      }}>{ad.title}</div>
      <div style={{
        color: "#23df81",
        fontWeight: 700,
        fontSize: 15,
        marginBottom: 7
      }}>{ad.price}</div>
      {/* Описание */}
      <div style={{
        fontWeight: 400,
        color: "#bdbdbd",
        fontSize: 14,
        marginBottom: 13
      }}>{ad.description}</div>
      {/* Компания, регион */}
      <div style={{
        color: "#a0f0c0",
        fontWeight: 500,
        fontSize: 13,
        marginBottom: 8
      }}>{ad.company}{ad.region ? ` · ${ad.region}` : ""}</div>
      {/* Контакты */}
      {ad.contact && (
        <div style={{
          color: "#23df81",
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 11
        }}>
          Контакты: {ad.contact}
        </div>
      )}
      {/* Документы */}
      {ad.documents && ad.documents.length > 0 && (
        <div style={{
          color: "#eaeaea",
          fontSize: 12.5,
          marginBottom: 7
        }}>
          Документы: {ad.documents.join(", ")}
        </div>
      )}
      {/* Склад */}
      {ad.warehouse && (
        <div style={{
          color: "#8fe3b9",
          fontSize: 12.5,
          marginBottom: 7
        }}>
          Склад: {ad.warehouse}
        </div>
      )}
      {/* Оплата */}
      {ad.payment && (
        <div style={{
          color: "#bbffcc",
          fontSize: 12.5,
          marginBottom: 2
        }}>
          Оплата: {ad.payment}
        </div>
      )}
    </div>
  );
}
