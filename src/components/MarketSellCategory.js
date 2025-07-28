import React, { useState } from "react";

// Пример данных — потом подключи свои из src/data/
const exampleSell = [
  {
    id: 1,
    title: "Продам красную икру, 500 кг",
    image: "/images/ikra1.webp",
    price: "3200 ₽/кг",
    desc: "Свежий улов, доставка по РФ",
    contact: "+7 900 123-45-67"
  },
  {
    id: 2,
    title: "Рыба Камчатка, опт",
    image: "/images/ryba1.webp",
    price: "от 180 ₽/кг",
    desc: "Горбуша, кижуч, чавыча, отличное качество.",
    contact: "+7 900 000-00-00"
  },
];

export default function MarketSellCategory() {
  const [items] = useState(exampleSell);

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
        Борт полный — объявления о продаже
      </h2>
      <div style={{
        width: "100%",
        maxWidth: 440,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 15,
        justifyContent: "center"
      }}>
        {items.map((item) => (
          <div key={item.id}
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
            {/* Фото без зазоров, полностью закругленное */}
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: 130,
                objectFit: "cover",
                background: "#26263b",
                display: "block"
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            {/* Название */}
            <div style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 14.5,
              margin: "10px 7px 0 7px",
              textAlign: "center",
              lineHeight: 1.18,
              maxHeight: 36,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal"
            }}>
              {item.title}
            </div>
            {/* Цена */}
            <div style={{
              color: "#23df81",
              fontWeight: 700,
              fontSize: 13.8,
              marginTop: 4,
              marginBottom: 2
            }}>
              {item.price}
            </div>
            {/* Описание */}
            <div style={{
              color: "#a0a0a0",
              fontWeight: 400,
              fontSize: 12.3,
              margin: "2px 10px 6px 10px",
              textAlign: "center"
            }}>
              {item.desc}
            </div>
            {/* Контакты */}
            <div style={{
              color: "#81e2bb",
              fontSize: 12.3,
              fontWeight: 500,
              marginBottom: 10
            }}>
              {item.contact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
