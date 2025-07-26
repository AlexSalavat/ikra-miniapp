import React, { useState } from 'react';
import logistics from '../data/logistics';

const CARDS_PER_PAGE = 10;
const CARDS_PER_ROW = 2;

const cardStyle = {
  background: '#16181e',
  borderRadius: 19,
  overflow: 'hidden',
  minHeight: 135,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  boxShadow: '0 3px 16px 0 #0005',
  cursor: 'pointer',
  aspectRatio: '1/1.07',
  justifyContent: 'flex-end'
};

const logoBoxStyle = {
  width: '100%',
  aspectRatio: '1 / 1',
  background: '#22232a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const nameBoxStyle = {
  width: '100%',
  background: 'linear-gradient(0deg, rgba(22,22,28,0.97) 78%, rgba(22,22,28,0.08) 100%)',
  padding: '12px 7px 8px 9px',
  zIndex: 2,
  display: 'flex',
  alignItems: 'flex-end',
  minHeight: 34,
  justifyContent: 'center'
};

const nameTextStyle = {
  color: '#fff',
  fontWeight: 600,
  fontSize: 15,
  letterSpacing: '-0.2px',
  textShadow: '0 2px 6px #0008',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

function PhotoSlider({ images = [] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  const prev = () => setIdx(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx(i => (i === images.length - 1 ? 0 : i + 1));
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1/1',
      background: '#16181e',
      marginBottom: 15,
      overflow: 'hidden',
      borderRadius: 0
    }}>
      <img
        src={images[idx]}
        alt={`Фото ${idx + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 0,
          display: 'block'
        }}
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(25,25,30,0.7)', color: '#fff', border: 'none',
            fontSize: 23, borderRadius: 50, width: 32, height: 32, cursor: 'pointer', opacity: 0.7
          }}>&#8592;</button>
          <button onClick={next} style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(25,25,30,0.7)', color: '#fff', border: 'none',
            fontSize: 23, borderRadius: 50, width: 32, height: 32, cursor: 'pointer', opacity: 0.7
          }}>&#8594;</button>
          <div style={{
            position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 13, color: '#ccc'
          }}>
            {idx + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

const LogisticsShowcase = () => {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(null);

  const pages = [];
  for (let i = 0; i < logistics.length; i += CARDS_PER_PAGE) {
    pages.push(logistics.slice(i, i + CARDS_PER_PAGE));
  }
  const current = pages[page] || [];

  return (
    <div style={{ padding: 16, background: '#000', minHeight: '100vh' }}>
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: 12,
          padding: '6px 13px',
          borderRadius: 10,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >← Назад</button>
      <h2 style={{
        color: '#fff', fontWeight: 600,
        fontSize: 21, margin: '0 0 18px 6px'
      }}>
        Логистика ДВ
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, 1fr)`,
        gap: 15,
        marginBottom: 18
      }}>
        {current.map(card => (
          <div
            key={card.id}
            onClick={() => setModal(card)}
            style={cardStyle}
          >
            <div style={logoBoxStyle}>
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 0,
                    display: 'block'
                  }}
                />
              ) : (
                <span style={{
                  color: '#bdbdbd',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center',
                  opacity: 0.92,
                  lineHeight: 1.25,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Лого<br />в разработке
                </span>
              )}
            </div>
            <div style={nameBoxStyle}>
              <span style={nameTextStyle}>
                {card.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      {pages.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 17,
          alignItems: 'center',
          marginTop: 15
        }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            style={{
              background: 'none',
              color: page === 0 ? '#666' : '#fff',
              border: 'none',
              fontSize: 30,
              cursor: page === 0 ? 'default' : 'pointer'
            }}
          >&#8592;</button>
          <span style={{ color: '#ccc', fontSize: 16 }}>
            {page + 1} / {pages.length}
          </span>
          <button
            disabled={page === pages.length - 1}
            onClick={() => setPage(p => p + 1)}
            style={{
              background: 'none',
              color: page === pages.length - 1 ? '#666' : '#fff',
              border: 'none',
              fontSize: 30,
              cursor: page === pages.length - 1 ? 'default' : 'pointer'
            }}
          >&#8594;</button>
        </div>
      )}
      {modal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(10,10,15,0.76)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              background: '#23232a',
              borderRadius: 16,
              padding: '23px 0 18px 0',
              boxShadow: '0 8px 32px #000a',
              maxWidth: 350,
              width: '93vw',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              style={{
                position: 'absolute',
                right: 13, top: 9,
                background: 'none', border: 'none',
                color: '#bbb', fontSize: 19, cursor: 'pointer', fontWeight: 600
              }}
              aria-label="Закрыть"
            >×</button>
            {/* Фото-слайдер или просто фото/лого */}
            {modal.gallery && modal.gallery.length > 0 ? (
              <PhotoSlider images={modal.gallery} />
            ) : modal.logo ? (
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                background: '#16181e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 13
              }}>
                <img
                  src={modal.logo}
                  alt={modal.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 0,
                    display: 'block'
                  }}
                />
              </div>
            ) : null}
            <div style={{ padding: '0 20px' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{modal.name}</div>
              <div style={{ fontSize: 14, marginBottom: 7, color: '#e3e3e6' }}>{modal.description}</div>
              <div style={{ fontSize: 13, marginBottom: 7 }}>{modal.address}</div>
              {modal.contacts && (
                <div style={{ fontSize: 13.5, color: '#37e0b0', marginBottom: 3 }}>
                  {modal.contacts.phone}<br />
                  {modal.contacts.phone2 && <>{modal.contacts.phone2}<br /></>}
                  {modal.contacts.dispatcher && <>Диспетчерская: {modal.contacts.dispatcher}<br /></>}
                  {modal.contacts.email && <>Email: {modal.contacts.email}<br /></>}
                  {modal.contacts.telegram && <>Telegram: {modal.contacts.telegram}</>}
                </div>
              )}
              {modal.mapLink && (
                <a href={modal.mapLink} target="_blank" rel="noopener noreferrer" style={{
                  color: '#27a0e0', textDecoration: 'underline', fontSize: 13, marginBottom: 8, display: 'inline-block'
                }}>Открыть на карте</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticsShowcase;
