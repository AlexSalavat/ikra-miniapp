import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const categories = [
  {
    key: 'икра',
    title: 'Икра',
    description: 'Красная, чёрная, фасованная',
    image: '/images/cav.webp',
  },
  {
    key: 'краб',
    title: 'Краб',
    description: 'Живой, мороженый, фаланги',
    image: '/images/krab.webp',
  },
  {
    key: 'рыба',
    title: 'Рыба',
    description: 'Лосось, треска, палтус и другие',
    image: '/images/fish.webp',
  },
  {
    key: 'морепродукты',
    title: 'Морепродукты',
    description: 'Креветки, гребешки, кальмары и пр.',
    image: '/images/mor.webp',
  },
];

const CARD_SIZE = 148;

const MarketSell = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "22px 0 80px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{ width: "100%", maxWidth: 340, marginBottom: 8, paddingLeft: 2 }}>
        <BackButton />
      </div>
      <h1
        style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: 20,
          marginBottom: 16,
          letterSpacing: 0.11
        }}
      >
        Борт полный — забирай!
      </h1>
      <div
        style={{
          width: "100%",
          maxWidth: 340,
          display: "grid",
          gridTemplateColumns: `repeat(2, minmax(0, ${CARD_SIZE}px))`,
          gap: 15,
          justifyContent: "center"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => navigate(`/market/sell/${cat.key}`)}
            style={{
              borderRadius: 17,
              background: "#19191d",
              overflow: "hidden",
              width: CARD_SIZE,
              height: CARD_SIZE,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 10px #16141a44",
              cursor: "pointer",
              border: "none",
              padding: 0,
              position: "relative"
            }}
          >
            <div style={{
              width: "100%",
              height: "74%",
              background: "#23232a",
              position: "relative",
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            <div
              style={{
                width: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#16161a",
                borderBottomLeftRadius: 17,
                borderBottomRightRadius: 17,
                padding: "7px 7px 6px 7px"
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: 12.3,
                  marginBottom: 1,
                  lineHeight: "1.13"
                }}
              >
                {cat.title}
              </span>
              <span
                style={{
                  fontWeight: 400,
                  color: "#b5b5b5",
                  fontSize: 9.1,
                  lineHeight: "1.13",
                  maxHeight: 22,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "normal"
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

export default MarketSell;
