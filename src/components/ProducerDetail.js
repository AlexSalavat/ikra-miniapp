import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const label = (txt) => <span style={{ color: '#37e08a', fontSize: 14, fontWeight: 600 }}>{txt}</span>;

const ProducerDetail = () => {
  const { id } = useParams();
  const producer = producers.find(p => String(p.id) === id || Number(p.id) === Number(id));
  const navigate = useNavigate();

  if (!producer) return (
    <div style={{ color: '#fff', padding: 30 }}>Завод не найден</div>
  );

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      color: '#fff',
      padding: 0,
      fontFamily: 'inherit',
      maxWidth: 430,
      margin: '0 auto'
    }}>
      {/* Красивая кнопка Назад */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '18px 0 7px 0',
        width: '100%',
        maxWidth: 430,
        position: 'sticky',
        top: 0,
        background: '#000',
        zIndex: 100,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            background: 'none',
            color: '#357cff',
            fontWeight: 500,
            fontSize: 16,
            padding: '0 0 0 12px',
            cursor: 'pointer',
            gap: 6
          }}
        >
          <svg width="22" height="22" fill="none" style={{ marginRight: 3 }}>
            <path d="M13.5 6.5L9 11l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, marginTop: 7, paddingLeft: 18 }}>
        <div style={{
          width: 84,
          height: 84,
          background: '#23232a',
          borderRadius: 17,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {producer.logo ? (
            <img src={producer.logo} alt={producer.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : producer.isPlaceholder ? (
            <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 15, textAlign: "center" }}>Место<br />свободно</span>
          ) : (
            <span style={{ color: '#bdbdbd', fontWeight: 700, fontSize: 13 }}>Лого<br />в разработке</span>
          )}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.1, marginBottom: 3 }}>{producer.name}</div>
          <div style={{ color: '#37e08a', fontSize: 13, fontWeight: 600 }}>{producer.region}</div>
        </div>
      </div>
      {!producer.isPlaceholder && (
        <>
          <div style={{ color: '#ccc', fontSize: 15, marginBottom: 14, paddingLeft: 18, paddingRight: 10 }}>{producer.fullDescription || producer.description}</div>
          {producer.address && (
            <div style={{ color: '#a4ffbb', fontSize: 13.5, marginBottom: 10, paddingLeft: 18 }}>
              {label("Адрес")}: {producer.address}
            </div>
          )}
          {producer.contacts && (
            <div style={{ fontSize: 14, color: "#7af19d", marginBottom: 10, paddingLeft: 18 }}>
              {producer.contacts.phone && <>📞 {producer.contacts.phone}<br /></>}
              {producer.contacts.email && <>✉️ {producer.contacts.email}<br /></>}
              {producer.contacts["Петропавловск-Камчатский"] && <>📞 Петропавловск-Камчатский: {producer.contacts["Петропавловск-Камчатский"]}<br /></>}
              {producer.contacts["Владивосток"] && <>📞 Владивосток: {producer.contacts["Владивосток"]}<br /></>}
            </div>
          )}
          {producer.categories && producer.categories.length > 0 && (
            <div style={{ color: "#23df81", fontSize: 13.5, marginBottom: 7, paddingLeft: 18 }}>
              {label("Продукция")}: {producer.categories.join(', ')}
            </div>
          )}
          {producer.site && (
            <a href={producer.site.startsWith('http') ? producer.site : `https://${producer.site}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                color: '#37e08a',
                fontSize: 14,
                textDecoration: 'underline',
                fontWeight: 600,
                marginBottom: 11,
                display: 'inline-block',
                paddingLeft: 18
              }}>{producer.site.replace(/^https?:\/\//, '')}</a>
          )}
          {producer.gallery && producer.gallery.length > 0 && (
            <div style={{ marginTop: 14, paddingLeft: 18 }}>
              <div style={{ color: '#bbb', fontSize: 13, marginBottom: 4 }}>Фото</div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                {producer.gallery.map((img, i) => (
                  <img key={i} src={img} alt="фото" style={{
                    width: 92, height: 64, objectFit: 'cover', borderRadius: 11, border: '1px solid #23232a'
                  }} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProducerDetail;
