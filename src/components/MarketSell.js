import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function MarketSell() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      padding: '16px 0 80px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          color: "#2678f3",
          background: "none",
          border: "none",
          fontWeight: 500,
          fontSize: 18,
          cursor: "pointer",
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 5,
          alignSelf: "flex-start",
          marginLeft: 12,
        }}
      >
        <svg width="18" height="18" fill="none" style={{ verticalAlign: "-3px" }}>
          <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      <h1 style={{
        color: '#fff',
        fontWeight: 600,
        fontSize: 22,
        marginBottom: 15,
        marginTop: 0,
        letterSpacing: 0.13,
        textAlign: 'center'
      }}>
        Борт полный — забирай!
      </h1>
      <div style={{
        width: '100%',
        maxWidth: 420,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 18,
        justifyContent: 'center',
      }}>
        {categories.map((cat, idx) => (
          <div
            key={cat.key}
            onClick={() => navigate(`/market/sell/${cat.key}`)}
            style={{
              borderRadius: 19,
              background: '#18181e',
              overflow: 'hidden',
              width: '100%',
              aspectRatio: '1/1',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 3px 14px #16141a30',
              transition: 'transform 0.14s',
            }}
          >
            <div style={{
              width: "100%",
              height: 0,
              paddingBottom: "72%",
              position: "relative",
              background: "#23232a",
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 19,
                  borderTopRightRadius: 19,
                  display: "block"
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            <div style={{
              width: '100%',
              padding: '13px 6px 13px 6px',
              background: '#1a1a1e',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderBottomLeftRadius: 19,
              borderBottomRightRadius: 19,
              flexGrow: 1,
            }}>
              <span style={{
                fontWeight: 700,
                color: '#fff',
                fontSize: 14,
                marginBottom: 3,
                lineHeight: '1.14',
                maxHeight: 32,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'nowrap'
              }}>
                {cat.title}
              </span>
              <span style={{
                fontWeight: 400,
                color: '#b5b5b5',
                fontSize: 10.5,
                lineHeight: '1.13',
                maxHeight: 21,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}>
                {cat.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
