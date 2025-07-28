import React, { useState } from "react";

// Пример универсального массива объявлений
const exampleAds = [
  {
    id: 1,
    title: "Икра кеты солёная, 2024",
    images: ["/images/ikra1.webp", "/images/ikra2.webp"],
    description: "Свежая икра кеты с Камчатки, сертификаты. Минимальная партия — 20 кг.",
    price: "3200 ₽/кг",
    contact: {
      phone: "+7 900 123-45-67",
      telegram: "@ikra24"
    },
    company: "ООО КамчатИкра",
    region: "Камчатка",
    address: "Петропавловск-Камчатский, склад №4",
    payment: ["Безнал", "Наличный"],
    documents: ["Меркурий", "Честный знак"],
    minBatch: 20,
    expires: "01.10.2024"
  },
  {
    id: 2,
    title: "Горбуша свежемороженая, опт",
    images: ["/images/ryba1.webp"],
    description: "Улов 2024, отгрузка с ДВ, любая форма оплаты.",
    price: "от 180 ₽/кг",
    contact: {
      phone: "+7 900 000-00-00"
    },
    company: "ООО РыбСнаб",
    region: "Сахалин",
    address: "Южно-Сахалинск, ул. Морская, 12",
    payment: ["Безнал"],
    documents: [],
    minBatch: 50
  },
  // ...ещё объявления
];

function AdModal({ ad, onClose }) {
  if (!ad) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.7)", zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#18181f",
        borderRadius: 23,
        boxShadow: "0 4px 32px #000b",
        padding: 24,
        maxWidth: 370,
        width: "96vw",
        color: "#fff",
        position: "relative"
      }}>
        {/* Кнопка закрыть */}
        <button onClick={onClose}
          style={{
            position: "absolute", right: 13, top: 13, background: "none",
            color: "#23df81", border: "none", fontSize: 26, cursor: "pointer"
          }}>×</button>
        {/* Галерея фото (только первая картинка, если что — можно добавить свайпер) */}
        {ad.images && ad.images.length > 0 && (
          <img src={ad.images[0]} alt="" style={{
            width: "100%", height: 175, objectFit: "cover", borderRadius: 17, marginBottom: 14,
            background: "#252532"
          }} onError={e => { e.target.src = "/images/no-image.webp"; }} />
        )}
        <div style={{ fontWeight: 700, fontSize: 17.5, marginBottom: 4 }}>{ad.title}</div>
        <div style={{ color: "#23df81", fontWeight: 700, fontSize: 15.5, marginBottom: 6 }}>{ad.price}</div>
        <div style={{ fontWeight: 500, fontSize: 13.5, color: "#b1ffe7", marginBottom: 3 }}>
          {ad.company}{ad.region ? `, ${ad.region}` : ""}
        </div>
        <div style={{ color: "#bababa", fontSize: 13, marginBottom: 10, whiteSpace: "pre-line" }}>
          {ad.description}
        </div>
        {ad.address && <div style={{ color: "#81e2bb", fontSize: 12.2, marginBottom: 6 }}>Склад: {ad.address}</div>}
        {ad.minBatch && <div style={{ color: "#23df81", fontSize: 12, marginBottom: 3 }}>Мин. партия: {ad.minBatch} кг</div>}
        {ad.expires && <div style={{ color: "#bdbdbd", fontSize: 11.5, marginBottom: 5 }}>Годен до: {ad.expires}</div>}
        {/* Документы */}
        {ad.documents && ad.documents.length > 0 && (
          <div style={{ color: "#9eea9c", fontSize: 12.2, marginBottom: 6 }}>
            Документы: {ad.documents.join(", ")}
          </div>
        )}
        {/* Оплата */}
        {ad.payment && ad.payment.length > 0 && (
          <div style={{ color: "#bbffcf", fontSize: 12.2, marginBottom: 6 }}>
            Оплата: {ad.payment.join(", ")}
          </div>
        )}
        {/* Контакты */}
        <div style={{
          fontSize: 13,
          color: "#35faaf",
          marginTop: 12,
          marginBottom: 3,
          fontWeight: 600
        }}>
          Контакты:
          {ad.contact?.phone && <div style={{ color: "#fff", fontWeight: 500, marginTop: 3 }}>📞 {ad.contact.phone}</div>}
          {ad.contact?.telegram && <div style={{ color: "#37e08a", fontWeight: 500 }}>TG: {ad.contact.telegram}</div>}
          {ad.contact?.email && <div style={{ color: "#b5e0ff", fontWeight: 500 }}>✉️ {ad.contact.email}</div>}
        </div>
      </div>
    </div>
  );
}

export default function MarketSellCategory() {
  const [ads] = useState(exampleAds);
  const [openAd, setOpenAd] = useState(null);

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
              fontSize: 14.5,
              margin: "9px 7px 0 7px",
              textAlign: "center",
              lineHeight: 1.18,
              maxHeight: 38,
              overflow: "hidden"
            }}>
              {ad.title}
            </div>
            {/* Цена */}
            <div style={{
              color: "#23df81",
              fontWeight: 700,
              fontSize: 13.8,
              marginTop: 3,
              marginBottom: 1
            }}>
              {ad.price}
            </div>
            {/* Компания и регион */}
            <div style={{
              color: "#a0f0c0",
              fontWeight: 500,
              fontSize: 12.3,
              margin: "1px 0 1px 0",
              textAlign: "center"
            }}>
              {ad.company}, {ad.region}
            </div>
            {/* Краткое описание */}
            <div style={{
              color: "#a0a0a0",
              fontWeight: 400,
              fontSize: 12.3,
              margin: "2px 10px 5px 10px",
              textAlign: "center"
            }}>
              {ad.description}
            </div>
            {/* Мини-инфо: документы, партия, адрес */}
            <div style={{
              fontSize: 11.5,
              color: "#7fffe1",
              marginBottom: 4,
              textAlign: "center"
            }}>
              {ad.documents && ad.documents.length > 0 && (
                <span>Документы: {ad.documents.join(", ")}<br /></span>
              )}
              {ad.minBatch && <span>Мин. партия: {ad.minBatch} кг<br /></span>}
              {ad.address && <span>Склад: {ad.address}</span>}
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
                margin: "9px 0 13px 0",
                border: "none",
                cursor: "pointer",
                width: "84%"
              }}
              onClick={() => setOpenAd(ad)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
      {openAd && <AdModal ad={openAd} onClose={() => setOpenAd(null)} />}
    </div>
  );
}
