import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const offers = [
  {
    id: 1,
    category: 'икра',
    img: '/images/more-i-sol-1.webp',
    gallery: [
      '/images/more-i-sol-1.webp',
      '/images/more-i-sol-2.webp'
    ],
    title: 'Икра красная 100 кг (горбуша)',
    company: 'ООО "Море и Соль"',
    sklad: 'Москва',
    price: '10 500 ₽/кг',
    desc: 'Свежайшая красная икра с Камчатки. Доставка по РФ, все документы в наличии.',
    phone: '+7 985 550-57-47',
    volume: '100 кг',
    docs: 'Ветдокументы, декларация, сертификат происхождения',
    region: 'Камчатка',
  },
];

const categoriesMap = {
  икра: 'Икра',
  краб: 'Краб',
  рыба: 'Рыба',
  морепродукты: 'Морепродукты'
};

const MarketSellCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [modalOffer, setModalOffer] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  const filtered = offers.filter(o => o.category === category);

  return (
    <div style={{ padding: 16, background: '#000', minHeight: '100vh' }}>
      <button
        style={{
          marginBottom: 16,
          padding: '7px 18px',
          borderRadius: 10,
          background: '#22242a',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer'
        }}
        onClick={() => navigate(-1)}
      >
        ← К категориям
      </button>
      <h1 style={{ color: '#fff', marginBottom: 13, fontSize: '1.12rem' }}>
        Объявления: {categoriesMap[category] || category}
      </h1>

      {filtered.length === 0 && (
        <div style={{ color: '#888', textAlign: 'center', marginTop: 48, fontSize: 17 }}>
          Нет объявлений в этой категории.
        </div>
      )}

      {filtered.map(offer => (
        <div
          key={offer.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            background: '#17181c',
            borderRadius: 17,
            boxShadow: '0 2px 14px 0 #000a',
            marginBottom: 18,
            padding: 14,
            gap: 16,
            border: '1.2px solid #222'
          }}
        >
          {/* БОЛЬШОЕ фото */}
          <div
            style={{
              flexShrink: 0,
              width: 108,
              height: 108,
              borderRadius: 14,
              background: '#23232a',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={offer.img}
              alt={offer.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
          </div>
          {/* Основная инфо */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontWeight: 700,
              color: '#fff',
              fontSize: 16,
              lineHeight: 1.21,
              marginBottom: 2
            }}>
              {offer.title}
            </div>
            <div style={{ color: '#bdbdbd', fontSize: 13, marginBottom: 2 }}>
              Компания: <span style={{ color: '#fff' }}>{offer.company}</span>
            </div>
            <div style={{ color: '#bdbdbd', fontSize: 13, marginBottom: 6 }}>
              Склад: <span style={{ color: '#fff' }}>{offer.sklad}</span>
            </div>
            {/* Кнопки под текстом */}
            <div style={{ display: 'flex', gap: 9, marginTop: 7 }}>
              <a
                href={`tel:${offer.phone.replace(/\s+/g, '')}`}
                style={{
                  background: '#29bf5b',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: 7,
                  padding: '5px 12px',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  minWidth: 78,
                  textAlign: 'center'
                }}
              >
                Позвонить
              </a>
              <button
                onClick={() => { setModalOffer(offer); setPhotoIdx(0); }}
                style={{
                  background: '#2678f3',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: 7,
                  padding: '5px 12px',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: 78,
                  textAlign: 'center'
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Модальное окно */}
      {modalOffer && (
        <div
          onClick={() => setModalOffer(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.78)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#17181c',
              borderRadius: 17,
              padding: 20,
              color: '#fff',
              maxWidth: 370,
              width: '92%',
              minHeight: 220,
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 8px 32px #000a'
            }}
          >
            <button
              onClick={() => setModalOffer(null)}
              style={{
                position: 'absolute',
                top: 10,
                right: 15,
                color: '#aaa',
                fontSize: 24,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >×</button>
            {/* Галерея фото */}
            {modalOffer.gallery && modalOffer.gallery.length > 1 ? (
              <div style={{ position: 'relative', marginBottom: 13 }}>
                <img
                  src={modalOffer.gallery[photoIdx]}
                  alt={`Фото ${photoIdx + 1}`}
                  style={{
                    width: '100%',
                    height: 144,
                    objectFit: 'cover',
                    borderRadius: 11,
                    background: '#23232a'
                  }}
                />
                {photoIdx > 0 && (
                  <button
                    onClick={() => setPhotoIdx(photoIdx - 1)}
                    style={{
                      position: 'absolute',
                      left: 4,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#000a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      cursor: 'pointer',
                      fontSize: 18,
                    }}
                  >‹</button>
                )}
                {photoIdx < modalOffer.gallery.length - 1 && (
                  <button
                    onClick={() => setPhotoIdx(photoIdx + 1)}
                    style={{
                      position: 'absolute',
                      right: 4,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#000a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      cursor: 'pointer',
                      fontSize: 18,
                    }}
                  >›</button>
                )}
              </div>
            ) : (
              <img
                src={modalOffer.img}
                alt={modalOffer.title}
                style={{
                  width: '100%',
                  height: 144,
                  objectFit: 'cover',
                  borderRadius: 11,
                  marginBottom: 13,
                  background: '#23232a'
                }}
              />
            )}

            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{modalOffer.title}</div>
            <div style={{ color: '#37e08a', fontWeight: 700, marginBottom: 5, fontSize: 16 }}>Цена: {modalOffer.price}</div>
            <div style={{ color: '#aaa', fontSize: 14, marginBottom: 2 }}>Компания: {modalOffer.company}</div>
            <div style={{ color: '#ccc', fontSize: 14, marginBottom: 6 }}>{modalOffer.desc}</div>
            <div style={{ color: '#fff', fontSize: 13, marginBottom: 3 }}>Регион: {modalOffer.region}</div>
            <div style={{ color: '#fff', fontSize: 13, marginBottom: 3 }}>Объем: {modalOffer.volume}</div>
            <div style={{ color: '#fff', fontSize: 13, marginBottom: 3 }}>Документы: {modalOffer.docs}</div>
            <div style={{ color: '#37a0e0', fontSize: 14, marginBottom: 3 }}>
              <a href={`tel:${modalOffer.phone.replace(/\s+/g, '')}`} style={{ color: '#37a0e0', textDecoration: 'none' }}>{modalOffer.phone}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketSellCategory;
