import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "sell",
    title: "Борт полный",
    description: "Свежие предложения: икра, рыба, морепродукты, краб",
    image: "/images/kamc.webp"
  },
  {
    id: "buy",
    title: "Забирай!",
    description: "Куплю: ищу улов, продукты, готов забрать",
    image: "/images/kam.webp"
  }
];

const CARD_SIZE = 320;
const CARD_RADIUS = 19;

const Market = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "12px 0 80px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: '"Inter","SF Pro","Segoe UI",Arial,sans-serif'
      }}
    >
      {/* Кнопка назад */}
      <div style={{ width: "100%", maxWidth: 420, marginBottom: 8, paddingLeft: 5 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            color: '#357cff',
            fontWeight: 500,
            fontSize: 16,
            padding: '6px 13px 6px 7px',
            borderRadius: 11,
            border: 'none',
            cursor: 'pointer',
            boxShadow: 'none',
            transition: 'color .15s',
            outline: 'none'
          }}
        >
          <svg width="20" height="20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад
        </button>
      </div>
      {/* Надпись сверху */}
      <div
        style={{
          color: "#e5e8ee",
          fontWeight: 500,
          fontSize: 21,
          marginBottom: 22,
          letterSpacing: 0.08,
          width: '100%',
          textAlign: 'center'
        }}
      >
        Объявления
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 370,
          display: "flex",
          flexDirection: "column",
          gap: 21,
          alignItems: "center"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/market/${cat.id}`)}
            style={{
              borderRadius: CARD_RADIUS,
              background: "none",
              border: "none",
              overflow: "hidden",
              width: "100%",
              aspectRatio: "1 / 1",
              maxWidth: CARD_SIZE,
              minWidth: 0,
              boxShadow: "0 5px 20px #10152a16",
              position: "relative",
              margin: 0,
              cursor: "pointer",
              padding: 0,
              transition: 'transform .12s, box-shadow .14s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: "stretch"
            }}
          >
            {/* Фото 76% */}
            <div style={{
              width: '100%',
              height: '76%',
              background: "#15181d",
              position: "relative",
              display: "flex",
              alignItems: "stretch",
              justifyContent: "stretch"
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Теперь cover — фото реально на всю карточку!
                  display: "block"
                }}
                onError={e => {
                  e.target.src = "/images/no-image.webp";
                }}
              />
              {/* Лёгкий градиент вниз для читаемости */}
              <div style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "38%",
                background: "linear-gradient(0deg, #15181d 93%, rgba(19,21,37,0.0) 100%)",
                zIndex: 2,
                pointerEvents: "none"
              }}/>
            </div>
            {/* Текст 24% */}
            <div style={{
              width: "100%",
              height: "24%",
              background: "rgba(14,17,24,0.98)",
              borderBottomLeftRadius: CARD_RADIUS,
              borderBottomRightRadius: CARD_RADIUS,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3,
              padding: "0 0 3px 0"
            }}>
              <span
                style={{
                  fontWeight: 600,
                  color: "#f6f7fa",
                  fontSize: 14.5,
                  marginBottom: 0,
                  lineHeight: 1.08,
                  fontFamily: '"Inter","SF Pro","Segoe UI",Arial,sans-serif'
                }}
              >
                {cat.title}
              </span>
              <span
                style={{
                  fontWeight: 400,
                  color: "#b8c7df",
                  fontSize: 9.1,
                  lineHeight: 1.13,
                  maxWidth: "95%",
                  textAlign: "center",
                  padding: "1.5px 8px 0 8px",
                  background: "none"
                }}
              >
                {cat.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Market;
