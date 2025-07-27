import React, { useState } from "react";
import BackButton from './BackButton';

const exampleBuy = [
  {
    id: 101,
    title: "Куплю свежую икру лососевых",
    quantity: "100-300 кг",
    desc: "Ищу надёжного поставщика, Самовывоз Владивосток.",
    contact: "@buyer_fish"
  },
  {
    id: 102,
    title: "Ищу оптом краба, живого/варёного",
    quantity: "до 1 тонны",
    desc: "Постоянный контракт, рассмотрю предложения.",
    contact: "+7 999 888-77-66"
  },
];

function MarketBuy() {
  const [items] = useState(exampleBuy);

  return (
    <div
      style={{
        background: "#101018",
        minHeight: "100vh",
        padding: "22px 0 80px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{ width: "100%", maxWidth: 350, marginBottom: 8, paddingLeft: 2 }}>
        <BackButton />
      </div>
      <h2 style={{
        color: "#e7f2ff",
        fontWeight: 500,
        fontSize: 19,
        marginBottom: 16,
        letterSpacing: 0.09
      }}>
        На охоте за уловом — ищу товар
      </h2>
      <div style={{
        width: "100%",
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#19192b",
              borderRadius: 19,
              padding: "14px 15px 13px 15px",
              border: "1px solid #273764",
              boxShadow: "0 2px 10px #1e263a33",
              marginBottom: 0,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h3 style={{
              fontWeight: 600,
              color: "#3fa6ff",
              fontSize: 15.7,
              marginBottom: 2
            }}>{item.title}</h3>
            <div style={{
              color: "#88c4ff",
              fontWeight: 500,
              fontSize: 13.2,
              marginBottom: 3
            }}>{item.quantity}</div>
            <p style={{
              color: "#c0cbe4",
              fontSize: 12.2,
              marginBottom: 3
            }}>{item.desc}</p>
            <div style={{
              fontSize: 11.3,
              color: "#7ebfff"
            }}>
              Контакты: {item.contact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketBuy;
