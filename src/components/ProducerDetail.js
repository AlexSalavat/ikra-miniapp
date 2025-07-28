import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const label = (txt) => <span style={{ color: '#21ff8a', fontSize: 14, fontWeight: 600 }}>{txt}</span>;

const COLORS = {
  addr: "#fff",
  phone: "#30bcbc",
  email: "#8cc8ff",
  contactTitle: "#93ffc0",
  region: "#37e08a",
  prod: "#52ff8d",
  site: "#6edfff"
};

const ICON_PHONE = (
  <svg width="17" height="17" style={{marginRight:4,marginBottom:-2}} viewBox="0 0 20 20"><path d="M3.3 2.7a2.4 2.4 0 0 1 3.2 0l1.7 1.7a2.4 2.4 0 0 1 0 3.3l-.7.7a12.4 12.4 0 0 0 5.3 5.3l.7-.7a2.4 2.4 0 0 1 3.3 0l1.7 1.7a2.4 2.4 0 0 1 0 3.2l-1 1a2.4 2.4 0 0 1-2.6.5c-2.2-.8-4.2-2-6-3.7-1.7-1.8-2.9-3.8-3.7-6A2.4 2.4 0 0 1 2.3 3.7l1-1z" fill="#30bcbc"/></svg>
);

const ICON_EMAIL = (
  <svg width="16" height="16" style={{marginRight:5,marginBottom:-2}} viewBox="0 0 20 20"><path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5v.3l6 4.7 6-4.7v-.3H4zm12 2.2-6 4.7-6-4.7V16h12V5.7z" fill="#8cc8ff"/></svg>
);

const ProducerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const producer = producers.find(p => String(p.id) === id || Number(p.id) === Number(id));
  if (!producer) return (
    <div style={{ color: '#fff', padding: 30 }}>Завод не найден</div>
  );

  // ==== УБИРАЕМ ДУБЛЬ ОПИСАНИЯ ДЛЯ ЖУПАНОВА ====
  const { name, region, description, fullDescription, address, contacts, categories, site, gallery } = producer;

  // Если Жупанова — используем только fullDescription для описания, остальные детали — отдельными секциями
  const isZhupanova = /жупанова/i.test(name);

  // РАЗБИРАЕМ КОНТАКТЫ
  let phones = [], emails = [];
  if (contacts) {
    Object.values(contacts).forEach(val => {
      if (typeof val === "string") {
        if (/^[-+()\d\s]{7,}$/.test(val)) phones.push(val);
        else if (/@/.test(val)) emails.push(val);
      }
    });
  }

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'inherit',
      maxWidth: 440,
      margin: '0 auto',
      padding: 0
    }}>
      {/* Кнопка назад */}
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
          padding: '15px 0 8px 10px',
          cursor: 'pointer',
          gap: 6
        }}
      >
        <svg width="22" height="22" style={{ display: 'block', marginRight: 1 }} viewBox="0 0 22 22">
          <path d="M14 5.5L8.7 11L14 16.5" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Назад
      </button>

      {/* Шапка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 13, marginTop: 8, paddingLeft: 20 }}>
        <div style={{
          width: 62,
          height: 62,
          background: '#23232a',
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {producer.logo
            ? <img src={producer.logo} alt={producer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ color: "#bdbdbd", fontWeight: 600, fontSize: 15 }}>Нет<br />лого</span>
          }
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 19, lineHeight: 1.13, marginBottom: 2 }}>{name}</div>
          <div style={{ color: COLORS.region, fontSize: 14, fontWeight: 600 }}>{region}</div>
        </div>
      </div>

      {/* Описание (без адреса) */}
      <div style={{ color: "#eee", fontSize: 15.2, margin: "8px 0 12px 20px", lineHeight: 1.47 }}>
        {isZhupanova ? (
          <>
            <span>{fullDescription?.split("Юридический адрес")[0]?.trim()}</span>
          </>
        ) : (
          <>{fullDescription || description}</>
        )}
      </div>

      {/* Адрес */}
      {address && (
        <div style={{ color: COLORS.addr, fontWeight: 600, fontSize: 14.5, marginLeft: 20, marginBottom: 5 }}>
          <span style={{ color: COLORS.addr }}>Адрес:</span>
          <span style={{ color: COLORS.addr, fontWeight: 400, marginLeft: 7 }}>{address}</span>
        </div>
      )}

      {/* Контакты */}
      {(phones.length > 0 || emails.length > 0) && (
        <div style={{ marginLeft: 20, marginBottom: 3 }}>
          <div style={{ color: COLORS.contactTitle, fontWeight: 600, fontSize: 14 }}>Контакты:</div>
          <div>
            {phones.map((phone, i) => (
              <div key={i} style={{ color: COLORS.phone, fontWeight: 600, marginBottom: 1 }}>
                {ICON_PHONE}{phone}
              </div>
            ))}
            {emails.map((mail, i) => (
              <div key={i} style={{ color: COLORS.email, fontWeight: 600, marginBottom: 1 }}>
                {ICON_EMAIL}{mail}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Продукция */}
      {categories && categories.length > 0 && (
        <div style={{ color: COLORS.prod, fontSize: 14, marginLeft: 20, marginBottom: 6, fontWeight: 700 }}>
          Продукция:{" "}
          <span style={{ color: "#fff", fontWeight: 500 }}>{categories.join(', ')}</span>
        </div>
      )}

      {/* Сайт */}
      {site && (
        <a href={site.startsWith('http') ? site : `https://${site}`} target="_blank" rel="noopener noreferrer"
          style={{
            color: COLORS.site,
            fontSize: 14,
            fontWeight: 600,
            marginLeft: 20,
            marginBottom: 9,
            display: 'inline-block',
            textDecoration: 'underline'
          }}>
          {site.replace(/^https?:\/\//, '')}
        </a>
      )}

      {/* Галерея */}
      {gallery && gallery.length > 0 && (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
          <div style={{ color: '#bbb', fontSize: 13, marginBottom: 3 }}>Фото</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {gallery.map((img, i) => (
              <img key={i} src={img} alt="фото" style={{
                width: 95, height: 65, objectFit: 'cover', borderRadius: 11, border: '1px solid #23232a'
              }} />
            ))}
          </div>
        </div>
      )}
      <div style={{ height: 30 }} />
    </div>
  );
};

export default ProducerDetail;
