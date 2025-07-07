import React, { useState } from 'react';
import neirobizServices from '../data/neirobizServices';
import services from '../data/neirobiz';

const CARD_HEIGHT = 145;
const CARD_RADIUS = 19;
const TG_LINK = "https://t.me/username"; // <-- потом подставишь свой username

const NeirobizScreen = () => {
  const [modalService, setModalService] = useState(null);

  // Найти полную инфу по id
  const getFullService = (id) => services.find(
    s => s.id.includes(id) || id.includes(s.id)
  );

  return (
    <div className="bg-black min-h-screen py-7 px-1 flex flex-col items-center">
      <h1 style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 15,
        letterSpacing: 0.13
      }}>
        NeiroBiz: AI-сервисы
      </h1>
      <div style={{
        width: '100%',
        maxWidth: 490,
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }}>
        {neirobizServices.map((svc, idx) => {
          const full = getFullService(svc.id) || {};
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#1d1c21',
                borderRadius: CARD_RADIUS,
                boxShadow: '0 2px 10px #16141a44',
                minHeight: CARD_HEIGHT,
                overflow: 'hidden',
                padding: 0,
                position: 'relative',
              }}
            >
              {/* Фото */}
              <div style={{
                flex: '0 0 auto',
                width: CARD_HEIGHT,
                height: CARD_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderTopLeftRadius: CARD_RADIUS,
                borderBottomLeftRadius: CARD_RADIUS,
                background: '#19191d'
              }}>
                <img
                  src={svc.image}
                  alt={svc.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={e => { e.target.src = '/images/no-image.webp'; }}
                />
              </div>
              {/* Контент */}
              <div style={{
                flex: 1,
                minWidth: 0,
                padding: '17px 14px 17px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}>
                <div style={{
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: 14.3,
                  marginBottom: 4,
                  lineHeight: '1.15',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 230,
                }}>
                  {svc.title}
                </div>
                <div style={{
                  color: '#b5b5b5',
                  fontWeight: 400,
                  fontSize: 11.6,
                  lineHeight: '1.19',
                  marginBottom: 8,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxHeight: 34,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {full.short || svc.description}
                </div>
                <div style={{
                  display: 'flex',
                  gap: 6,
                  marginTop: 3
                }}>
                  <button
                    style={{
                      background: '#2678f3',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 11.2,
                      borderRadius: 7,
                      border: 'none',
                      padding: '5px 0',
                      width: 90,
                      cursor: 'pointer'
                    }}
                    onClick={() => setModalService(full)}
                  >
                    Подробнее
                  </button>
                  <a
                    href={TG_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#1db768',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 11.2,
                      borderRadius: 7,
                      border: 'none',
                      padding: '5px 0',
                      width: 124,
                      textAlign: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Консультация
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Модальное окно подробнее */}
      {modalService && (
        <div
          onClick={() => setModalService(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(0,0,0,0.83)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#16161a',
              borderRadius: 18,
              boxShadow: '0 8px 30px #000b',
              padding: '25px 18px 18px 18px',
              maxWidth: 390,
              width: '96%',
              color: '#fff',
              textAlign: 'left',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setModalService(null)}
              style={{
                position: 'absolute',
                top: 11,
                right: 17,
                color: '#aaa',
                background: 'none',
                border: 'none',
                fontSize: 28,
                cursor: 'pointer'
              }}
            >×</button>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 13 }}>
              <span style={{
                fontSize: 26,
                marginRight: 11,
                flexShrink: 0
              }}>{modalService.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 17.3, lineHeight: '1.1' }}>
                {modalService.title}
              </div>
            </div>
            <div style={{ color: '#bbb', fontSize: 13.6, marginBottom: 8 }}>
              {modalService.full ? modalService.full : "Описание скоро появится!"}
            </div>
            {modalService.checklist && modalService.checklist.length > 0 && (
              <ul style={{ color: '#32e0aa', fontSize: 12.9, marginBottom: 12, paddingLeft: 18 }}>
                {modalService.checklist.map((item, i) => (
                  <li key={i} style={{ marginBottom: 2 }}>{item}</li>
                ))}
              </ul>
            )}
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#1db768',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 9,
                border: 'none',
                padding: '9px 0',
                width: '100%',
                marginTop: 2,
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Получить консультацию
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeirobizScreen;
