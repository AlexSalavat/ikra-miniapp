import React from 'react';
import { useNavigate } from 'react-router-dom';
import neirobizServices from '../data/neirobizServices';
import services from '../data/neirobiz'; // тут путь поправь если у тебя отличается

const CARD_SIZE = 185; // стиль карточек как в marketsell
const CARD_RADIUS = 19;

const NeirobizShowcase = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        padding: '26px 0 80px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: 790, width: '100%', marginBottom: 18 }}>
        <h1 style={{
          color: '#fff',
          fontWeight: 700,
          fontSize: 22,
          marginLeft: 18,
          marginBottom: 6,
          letterSpacing: 0.14
        }}>NeiroBiz</h1>
        <div style={{
          color: '#b5e0fe',
          fontSize: 15.2,
          marginLeft: 18,
          marginBottom: 6,
          fontWeight: 500
        }}>AI-сервисы и генерация упаковки</div>
        <div style={{
          color: '#ccc',
          fontSize: 13,
          marginLeft: 18,
          marginBottom: 8,
          maxWidth: 420
        }}>
          Автоматизируйте бизнес с помощью нейросетей, ботов, дизайна и аналитики.<br />
          <span style={{ color: '#43c57a', fontWeight: 600 }}>
            Оформите заявку — получите результат быстрее конкурентов!
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 15,
          width: '100%',
          maxWidth: 790,
          justifyContent: 'center',
          padding: '0 18px'
        }}
      >
        {neirobizServices.map((svc, idx) => {
          const full = services.find(s =>
            s.id.replace(/-/g, '').includes(svc.id.replace(/-/g, '')) ||
            svc.id.replace(/-/g, '').includes(s.id.replace(/-/g, ''))
          ) || {};
          return (
            <div
              key={svc.id}
              style={{
                borderRadius: CARD_RADIUS,
                backgroundColor: '#191920',
                color: '#fff',
                boxShadow: '0 1.5px 8px #2224',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                minHeight: CARD_SIZE,
                aspectRatio: '1/1',
                maxWidth: CARD_SIZE,
                minWidth: 0,
                transition: 'box-shadow .14s'
              }}
              onClick={() => navigate(`/neirobiz/service/${svc.id}`)}
            >
              <img
                src={svc.image}
                alt={svc.title}
                style={{
                  width: '100%',
                  height: '67%',
                  objectFit: 'cover',
                  borderTopLeftRadius: CARD_RADIUS,
                  borderTopRightRadius: CARD_RADIUS,
                  background: '#222',
                  flexShrink: 0,
                  display: 'block'
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
              <div style={{
                padding: '10px 10px 11px 13px',
                background: '#141417',
                borderBottomLeftRadius: CARD_RADIUS,
                borderBottomRightRadius: CARD_RADIUS,
                minHeight: 54,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: 13.2,
                  marginBottom: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7
                }}>
                  <span style={{ fontSize: 17 }}>{full.icon}</span>
                  {svc.title}
                </div>
                <div style={{
                  color: '#b7e0db',
                  fontWeight: 400,
                  fontSize: 10.2,
                  lineHeight: 1.21,
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginTop: 2,
                  maxHeight: 30
                }}>
                  {full.short || svc.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default NeirobizShowcase;
