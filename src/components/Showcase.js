import React from "react";
import { useNavigate } from "react-router-dom";

const CARD_SIZE = 185;

const showcaseItems = [
  {
    key: "suppliers",
    title: "Поставщики",
    desc: "Проверенные компании — прямые контакты.",
    image: "/images/suppliers.webp",
    to: "/catalog/suppliers",
  },
  {
    key: "logistics",
    title: "Логистика ДВ",
    desc: "Вся информация по логистике Дальнего Востока.",
    image: "/images/logistics.webp",
    to: "/logistics",
  },
  {
    key: "production",
    title: "Производство",
    desc: "Рыбные и икорные производства.",
    image: "/images/production.webp",
    to: "/production",
  },
  {
    key: "neirobiz",
    title: "Neirobiz",
    desc: "AI-сервисы для бизнеса.",
    image: "/images/neirobiz.webp",
    to: "/neirobiz",
  },
];

function Showcase() {
  const navigate = useNavigate();
  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      padding: '26px 0 80px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 13,
        marginTop: 2,
        letterSpacing: 0.13
      }}>
        Категории
      </h2>
      <div style={{
        width: '100%',
        maxWidth: 410,
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 15,
        justifyContent: 'center',
      }}>
        {showcaseItems.map((item, idx) => (
          <div
            key={item.key}
            onClick={() => navigate(item.to)}
            style={{
              borderRadius: 17,
              background: '#1d1c21',
              overflow: 'hidden',
              width: CARD_SIZE,
              height: CARD_SIZE,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 10px #16141a44',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '74%',
                objectFit: 'cover',
                background: '#23232a',
                display: 'block'
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <div style={{
              width: '100%',
              padding: '8px 11px 8px 11px',
              background: '#19191d',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexGrow: 1,
              borderBottomLeftRadius: 17,
              borderBottomRightRadius: 17
            }}>
              <span style={{
                fontWeight: 700,
                color: '#fff',
                fontSize: 12.2,
                marginBottom: 1,
                lineHeight: '1.13',
                maxHeight: 32,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}>
                {item.title}
              </span>
              <span style={{
                fontWeight: 400,
                color: '#b5c4d8',
                fontSize: 9.3,
                lineHeight: '1.13',
                maxHeight: 24,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}>
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showcase;
