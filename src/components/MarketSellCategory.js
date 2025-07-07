import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const offers = [
  {
    id: 1,
    category: 'икра',
    img: '/images/more-i-sol-1.webp',
    gallery: ['/images/more-i-sol-1.webp'],
    title: 'Красная икра (горбуша) — 100 кг',
    company: 'ООО "Море и Соль"',
    manufacturer: 'Корякморепродукт',
    sklad: 'Москва',
    price: '6 500 ₽/кг',
    volume: '100 кг',
    phone: '+7 985 550-57-47',
    desc: 'Свежая красная икра Горбуши с Камчатки. Крупное зерно, без консервантов, все документы. Официальный поставщик.',
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
    <div style={{ padding: 10, background: '#000', minHeight: '100vh' }}>
      <button
        style={{
          marginBottom: 10,
          padding: '5px 14px',
          borderRadius: 9,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 13,
          cursor: 'pointer'
        }}
        onClick={() => navigate(-1)}
      >
        ← К категориям
      </button>
      <h1 style={{ color: '#fff', marginBottom: 10, fontSize: '1.02rem', fontWeight: 600 }}>
        Объявления: {categoriesMap[category] || category}
      </h1>

      {filtered.length === 0 && (
        <div style={{ color: '#888', textAlign: 'center', marginTop: 35, fontSize: 14 }}>
          Нет объявлений в этой категории.
        </div>
      )}

      {filtered.map(offer => (
        <div
          key={offer.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            background: '#18191d',
            borderRadius: 15,
            boxShadow: '0 2px 14px 0 #000a',
            marginBottom: 13,
            padding: 9,
            gap: 11,
            border: '1.1px solid #222'
          }}
        >
          {/* Фото */}
          <div
            style={{
              flexShrink: 0,
              width: 86,
              height: 86,
              borderRadius: 11,
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
          {/* Основная инфо компактно */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontWeight: 700,
              color: '#fff',
              fontSize: 12.6,
              lineHeight: 1.16,
              marginBottom: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {offer.title}
            </div>
            <div style={{ color: '#bdbdbd', fontSize: 10.3, marginBottom: 1 }}>
              {offer.company}
            </div>
            <div style={{ color: '#c3c3c3', fontSize: 9.5, marginBottom: 2 }}>
              {offer.manufacturer ? `Производитель: ${offer.manufacturer}, ` : ''}
              {offer.sklad ? `Склад: ${offer.sklad}` : ''}
            </div>
            {/* Кнопки */}
            <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
              <a
                href={`tel:${offer.phone.replace(/\s+/g, '')}`}
                style={{
                  background: '#29bf5b',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 11.3,
                  borderRadius: 6,
                  padding: '4px 7px',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  minWidth: 65,
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
                  fontWeight: 500,
                  fontSize: 11.3,
                  borderRadius: 6,
                  padding: '4px 7px',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: 65,
                  textAlign: 'center'
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Модальное окно (подробнее) */}
      {modalOffer && (
        <div
          onClick={() => setModalOffer(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.83)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#18191d',
              borderRadius: 14,
              padding: 18,
              color: '#fff',
              maxWidth: 330,
              width: '94%',
              minHeight: 160,
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 8px 32px #000a'
            }}
          >
            <button
              onClick={() => setModalOffer(null)}
              style={{
                position: 'absolute',
                top: 8,
                right: 12,
                color: '#aaa',
                fontSize: 22,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >×</button>
            <img
              src={modalOffer.img}
              alt={modalOffer.title}
              style={{
                width: '100%',
                height: 110,
                objectFit: 'cover',
                borderRadius: 9,
                marginBottom: 10,
                background: '#23232a'
              }}
            />
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 5 }}>{modalOffer.title}</div>
            <div style={{ color: '#37e08a', fontWeight: 700, marginBottom: 3, fontSize: 13 }}>Цена: {modalOffer.price}</div>
            <div style={{ color: '#aaa', fontSize: 11.7, marginBottom: 2 }}>Компания: {modalOffer.company}</div>
            <div style={{ color: '#ccc', fontSize: 11.5, marginBottom: 4 }}>Производитель: {modalOffer.manufacturer}</div>
            <div style={{ color: '#ccc', fontSize: 11.5, marginBottom: 5 }}>{modalOffer.desc}</div>
            <div style={{ color: '#fff', fontSize: 11, marginBottom: 2 }}>Регион: {modalOffer.region}</div>
            <div style={{ color: '#fff', fontSize: 11, marginBottom: 2 }}>Объем: {modalOffer.volume}</div>
            <div style={{ color: '#fff', fontSize: 11, marginBottom: 2 }}>Документы: {modalOffer.docs}</div>
            <div style={{ color: '#37a0e0', fontSize: 12, marginBottom: 2 }}>
              <a href={`tel:${modalOffer.phone.replace(/\s+/g, '')}`} style={{ color: '#37a0e0', textDecoration: 'none' }}>{modalOffer.phone}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketSellCategory;
