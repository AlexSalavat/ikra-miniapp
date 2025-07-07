import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Борт полный — забирай!',
    desc: 'Размести предложение и найди покупателей на свой улов.',
    img: '/images/kamc.webp',
    link: '/market/sell',
  },
  {
    title: 'На охоте за уловом',
    desc: 'Создай заявку или найди свежие предложения.',
    img: '/images/kam.webp',
    link: '/market/buy',
  },
];

const CARD_SIZE = 185;

const Market = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen pt-12 pb-24 flex flex-col items-center">
      <h1 style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 13,
        letterSpacing: 0.13
      }}>
        Досква объявлений
      </h1>
      <div style={{
        width: '100%',
        maxWidth: 410,
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 15,
        justifyContent: 'center',
      }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.link)}
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
              src={card.img}
              alt={card.title}
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
                marginBottom: 2,
                lineHeight: '1.13',
                maxHeight: 32,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}>
                {card.title}
              </span>
              <span style={{
                fontWeight: 400,
                color: '#b5b5b5',
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
                {card.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
