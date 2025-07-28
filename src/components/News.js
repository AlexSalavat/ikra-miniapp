import React from 'react';
import { useNavigate } from "react-router-dom";

const newsSections = [
  {
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: '/images/new.webp',
    link: '/news/coast'
  },
  {
    title: 'Икорные войны',
    description: 'Аналитика, сравнения, закулисье',
    image: '/images/war.webp',
    link: '/news/ikra-wars'
  },
  {
    title: 'ТОП производители',
    description: 'Рейтинги, динамика и доверие рынка',
    image: '/images/pk.webp',
    link: '/news/top-producers'
  },
  {
    title: 'Инсайдерский Доступ',
    description: 'Только для своих: слухи, прогнозы, эксклюзив',
    image: '/images/insider.webp',
    link: '/insider',
    locked: true
  }
];

const CARD_SIZE = 185;

export default function News() {
  const navigate = useNavigate();
  // Можешь заменить isAuthorized на свою логику авторизации
  const isAuthorized = false;

  const handleCardClick = (item) => {
    if (item.locked && !isAuthorized) {
      alert('Доступ только для своих. Войдите или оставьте заявку на доступ!');
    } else if (item.link && item.link !== '#') {
      navigate(item.link);   // ВАЖНО: используем navigate, а не window.location
    }
  };

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      padding: '26px 0 80px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 13,
        marginTop: 2,
        letterSpacing: 0.13
      }}>
        Новости
      </h1>
      <div style={{
        width: '100%',
        maxWidth: 410,
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 15,
        justifyContent: 'center',
      }}>
        {newsSections.map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: 17,
              background: item.locked ? '#232742ee' : '#1d1c21',
              overflow: 'hidden',
              width: CARD_SIZE,
              height: CARD_SIZE,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 10px #16141a44',
              textDecoration: 'none',
              position: 'relative',
              opacity: item.locked ? 0.76 : 1,
              filter: item.locked ? 'grayscale(0.11)' : 'none',
              cursor: 'pointer',
              border: item.locked ? '2px solid #3B82F6' : 'none'
            }}
            onClick={() => handleCardClick(item)}
            title={item.title}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '74%',
                objectFit: 'cover',
                background: '#23232a',
                display: 'block',
                filter: item.locked ? 'blur(0.4px) grayscale(0.15)' : 'none'
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            {item.locked && (
              <div style={{
                position: 'absolute',
                right: 14, top: 13,
                background: 'rgba(14,19,40,0.69)',
                borderRadius: '50%',
                width: 38, height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxShadow: '0 2px 12px #3B82F6a4'
              }}>
                {/* SVG иконка замка */}
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <rect x="4" y="9" width="12" height="7" rx="2" fill="#3B82F6" />
                  <rect x="7" y="6" width="6" height="6" rx="3" stroke="#fff" strokeWidth="1.3"/>
                  <rect x="8.5" y="12" width="3" height="3" rx="1.5" fill="#fff"/>
                </svg>
              </div>
            )}
            <div style={{
              width: '100%',
              padding: '8px 11px 8px 11px',
              background: item.locked ? '#232742ee' : '#19191d',
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
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
