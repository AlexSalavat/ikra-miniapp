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
      fontFamily: 'inherit',
      maxWidth: 430,
      margin: '0 auto',
      padding: 0
    }}>
      {/* --- КНОПКА НАЗАД --- */}
      <div style={{
        width: '100%',
        maxWidth: 430,
        padding: 0,
        margin: 0,
        background: 'transparent',
        position: 'relative'
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
            padding: '14px 0 6px 8px', // Минимал отступы
            cursor: 'pointer',
            gap: 5,
            lineHeight: 1,
            boxShadow: 'none'
          }}
        >
          <svg width="21" height="21" fill="none" style={{ marginRight: 2 }}>
            <path d="M14 5.5L8.7 11L14 16.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontSize: 16,
            fontWeight: 500,
            position: 'relative',
            top: 0.5,
            letterSpacing: 0.1
          }}>
            Назад
          </span>
        </button>
      </div>

      {/* --- CARD CONTENT --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, marginTop: 18, paddingLeft: 22 }}>
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
          <div style={{ color: '#ccc', fontSize: 15, marginBottom: 14, paddingLeft: 22, paddingRight: 12 }}>{producer.fullDescription || producer.description}</div>
          {producer.address && (
            <div style={{ color: '#a4ffbb', fontSize: 13.5, marginBottom: 10, paddingLeft: 22 }}>
              {label("Адрес")}: {producer.address}
            </div>
          )}
          {producer.contacts && (
            <div style={{ fontSize: 14, color: "#7af19d", marginBottom: 10, paddingLeft: 22 }}>
              {producer.contacts.phone && <>📞 {producer.contacts.phone}<br /></>}
              {producer.contacts.email && <>✉️ {producer.contacts.email}<br /></>}
              {producer.contacts["Петропавловск-Камчатский"] && <>📞 Петропавловск-Камчатский: {producer.contacts["Петропавловск-Камчатский"]}<br /></>}
              {producer.contacts["Владивосток"] && <>📞 Владивосток: {producer.contacts["Владивосток"]}<br /></>}
            </div>
          )}
          {producer.categories && producer.categories.length > 0 && (
            <div style={{ color: "#23df81", fontSize: 13.5, marginBottom: 7, paddingLeft: 22 }}>
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
                paddingLeft: 22
              }}>{producer.site.replace(/^https?:\/\//, '')}</a>
          )}
          {producer.gallery && producer.gallery.length > 0 && (
            <div style={{ marginTop: 14, paddingLeft: 22 }}>
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
