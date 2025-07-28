import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const accent = "#38d8ff";
const dark = "#191a23";
const shadow = "0 4px 24px #17304155";
const round = 22;

const ICONS = {
  phone: (
    <span style={{
      background: "#182433", borderRadius: "50%", display: "inline-flex", width: 30, height: 30,
      alignItems: "center", justifyContent: "center", marginRight: 10
    }}>
      <svg width="17" height="17" viewBox="0 0 20 20"><path d="M3.3 2.7a2.4 2.4 0 0 1 3.2 0l1.7 1.7a2.4 2.4 0 0 1 0 3.3l-.7.7a12.4 12.4 0 0 0 5.3 5.3l.7-.7a2.4 2.4 0 0 1 3.3 0l1.7 1.7a2.4 2.4 0 0 1 0 3.2l-1 1a2.4 2.4 0 0 1-2.6.5c-2.2-.8-4.2-2-6-3.7-1.7-1.8-2.9-3.8-3.7-6A2.4 2.4 0 0 1 2.3 3.7l1-1z" fill={accent}/></svg>
    </span>
  ),
  email: (
    <span style={{
      background: "#1a3245", borderRadius: "50%", display: "inline-flex", width: 30, height: 30,
      alignItems: "center", justifyContent: "center", marginRight: 10
    }}>
      <svg width="17" height="17" viewBox="0 0 20 20"><path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5v.3l6 4.7 6-4.7v-.3H4zm12 2.2-6 4.7-6-4.7V16h12V5.7z" fill="#88cfff"/></svg>
    </span>
  ),
};

const ProducerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const producer = producers.find(p => String(p.id) === id || Number(p.id) === Number(id));
  if (!producer) return (
    <div style={{ color: '#fff', padding: 30 }}>Завод не найден</div>
  );

  // --- Разделяем контакты ---
  const { name, region, description, fullDescription, address, contacts, categories, site, gallery } = producer;
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
      background: "#11141a",
      minHeight: "100vh",
      paddingBottom: 20,
      fontFamily: "inherit"
    }}>
      {/* BACK */}
      <button onClick={() => navigate(-1)}
        style={{
          margin: "0 0 0 8px",
          background: "none",
          border: "none",
          color: accent,
          display: "flex",
          alignItems: "center",
          fontSize: 18,
          fontWeight: 700,
          gap: 7,
          cursor: "pointer",
          marginTop: 16,
          marginBottom: 10
        }}>
        <svg width="21" height="21"><path d="M13.5 5.5L8.7 11L13.5 16.5" stroke={accent} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Назад
      </button>

      {/* Card */}
      <div style={{
        background: dark,
        borderRadius: round,
        margin: "0 auto",
        boxShadow: shadow,
        maxWidth: 420,
        padding: "22px 22px 17px 22px",
        marginBottom: 24
      }}>
        {/* Лого + имя */}
        <div style={{ display: "flex", alignItems: "center", gap: 17, marginBottom: 12 }}>
          <div style={{
            minWidth: 64, minHeight: 64, maxWidth: 64, maxHeight: 64,
            background: "#22262c", borderRadius: 16, display: "flex",
            alignItems: "center", justifyContent: "center", overflow: "hidden"
          }}>
            {producer.logo
              ? <img src={producer.logo} alt={producer.name}
                  style={{ width: "98%", height: "98%", objectFit: "contain" }} />
              : <span style={{ color: "#bbc7d2", fontWeight: 600, fontSize: 16, textAlign: "center" }}>Нет<br />лого</span>
            }
          </div>
          <div>
            <div style={{
              fontWeight: 900, fontSize: 19.5, color: "#fff",
              marginBottom: 3, letterSpacing: ".01em", lineHeight: "1.12"
            }}>{name}</div>
            <div style={{
              color: accent, fontWeight: 700, fontSize: 15,
              marginBottom: 0, letterSpacing: ".01em"
            }}>{region}</div>
          </div>
        </div>
        {/* Описание */}
        <div style={{
          color: "#e9eefa", fontSize: 15.5, fontWeight: 500,
          marginBottom: 13, marginTop: 4, lineHeight: 1.52
        }}>{fullDescription || description}</div>
        {/* Адрес */}
        {address && (
          <div style={{
            background: "#151e28",
            borderRadius: 13,
            padding: "10px 12px 7px 12px",
            color: "#fff",
            fontWeight: 600,
            marginBottom: 8,
            fontSize: 14.4,
            letterSpacing: "0.01em",
            display: "flex",
            alignItems: "flex-start",
            gap: 7
          }}>
            <span style={{
              background: "#25b1e6", borderRadius: 7,
              color: "#fff", fontSize: 12.2, fontWeight: 700,
              padding: "3px 10px 3px 8px", marginRight: 7
            }}>Адрес</span>
            <span style={{ color: "#fff", fontWeight: 500 }}>{address}</span>
          </div>
        )}
        {/* Контакты */}
        {(phones.length > 0 || emails.length > 0) && (
          <div style={{
            background: "#17202a",
            borderRadius: 13,
            padding: "12px 13px 8px 13px",
            color: "#fff",
            marginBottom: 8,
            fontSize: 14.3,
            boxShadow: "0 1px 5px #182d3855"
          }}>
            <div style={{
              color: "#4be3b5", fontWeight: 700,
              fontSize: 13.8, marginBottom: 7
            }}>Контакты</div>
            {phones.map((phone, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 2, fontWeight: 600 }}>
                {ICONS.phone}<span style={{color: "#b8f7f6"}}>{phone}</span>
              </div>
            ))}
            {emails.map((mail, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 2, fontWeight: 600 }}>
                {ICONS.email}<span style={{color: "#b6c7fa"}}>{mail}</span>
              </div>
            ))}
          </div>
        )}
        {/* Продукция */}
        {categories && categories.length > 0 && (
          <div style={{
            background: "#18262d",
            borderRadius: 11,
            padding: "8px 12px 7px 12px",
            color: "#83ffd8",
            fontWeight: 700,
            marginBottom: 8,
            fontSize: 14.2
          }}>
            Продукция: <span style={{ color: "#fff", fontWeight: 500 }}>{categories.join(', ')}</span>
          </div>
        )}
        {/* Сайт */}
        {site && (
          <a href={site.startsWith('http') ? site : `https://${site}`} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "linear-gradient(92deg,#1d8dff,#23d3ff 95%)",
              color: "#fff", fontWeight: 700, borderRadius: 11,
              padding: "8px 15px 6px 15px", fontSize: 14.7,
              textDecoration: "none", marginBottom: 5, marginTop: 4
            }}>
            {site.replace(/^https?:\/\//, '')}
          </a>
        )}
        {/* Галерея */}
        {gallery && gallery.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ color: "#abb8cc", fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Фото</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
              {gallery.map((img, i) => (
                <img key={i} src={img} alt="фото" style={{
                  width: 98, height: 68, objectFit: 'cover', borderRadius: 12, border: '1px solid #19223a'
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProducerDetail;
