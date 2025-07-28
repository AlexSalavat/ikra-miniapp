import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const accent = "#38d8ff";
const bgBlock = "#181a23";
const shadow = "0 4px 22px #19283d44";
const round = 22;

// --- SVG Icons ---
const IconPhone = () => (
  <svg width="20" height="20" style={{marginRight:8}} viewBox="0 0 20 20">
    <path d="M3.5 2.8A2.1 2.1 0 0 1 6.5 2l1.6 1.7c.6.6.6 1.5 0 2.1l-.7.7a12 12 0 0 0 5.2 5.2l.7-.7c.6-.6 1.5-.6 2.1 0L18 13.5a2.1 2.1 0 0 1 0 3c-.9.9-2.3 1.1-3.4.7A16.2 16.2 0 0 1 4 7.3c-.4-1.1-.2-2.5.7-3.4z"
      stroke="#61e7ee" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
  </svg>
);
const IconMail = () => (
  <svg width="19" height="19" style={{marginRight:8}} viewBox="0 0 20 20">
    <rect x="2.8" y="4.5" width="14.5" height="10.5" rx="2.2"
      stroke="#82aaff" strokeWidth="1.3" fill="none"/>
    <path d="M4.4 6l5.6 4 5.6-4" stroke="#82aaff" strokeWidth="1.1" fill="none"/>
  </svg>
);

// --- MODAL PREVIEW ---
function GalleryModal({ images, idx, onClose }) {
  const [current, setCurrent] = useState(idx);

  const goLeft = () => setCurrent((current - 1 + images.length) % images.length);
  const goRight = () => setCurrent((current + 1) % images.length);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goLeft();
      if (e.key === "ArrowRight") goRight();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1001,
        background: "rgba(15,17,22,0.98)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn .25s"
      }}
      onClick={onClose}
    >
      {/* Left Arrow */}
      {images.length > 1 && (
        <button onClick={e => {e.stopPropagation(); goLeft();}}
          style={{
            position: "absolute", left: 22, top: "50%", transform: "translateY(-50%)",
            background: "rgba(34,38,52,0.6)", border: "none", borderRadius: "50%",
            width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer"
          }}>
          <svg width="22" height="22"><path d="M14.2 5.7L8.5 11l5.7 5.3" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {/* Image */}
      <img
        src={images[current]}
        alt=""
        style={{
          maxWidth: "96vw", maxHeight: "92vh",
          borderRadius: 22, boxShadow: "0 8px 50px #000c",
          objectFit: "contain", background: "#15181d"
        }}
        onClick={e => e.stopPropagation()}
      />
      {/* Right Arrow */}
      {images.length > 1 && (
        <button onClick={e => {e.stopPropagation(); goRight();}}
          style={{
            position: "absolute", right: 22, top: "50%", transform: "translateY(-50%)",
            background: "rgba(34,38,52,0.6)", border: "none", borderRadius: "50%",
            width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer"
          }}>
          <svg width="22" height="22"><path d="M8.2 5.7L14 11l-5.8 5.3" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {/* Close */}
      <button onClick={onClose}
        style={{
          position: "absolute", top: 36, right: 32,
          background: "rgba(20,22,32,0.72)", border: "none", borderRadius: "50%",
          width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer"
        }}>
        <svg width="19" height="19"><path d="M5 5l9 9m-9 0l9-9" stroke="#fff" strokeWidth="2.1" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

const ProducerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, idx: 0 });
  const producer = producers.find(p => String(p.id) === id || Number(p.id) === Number(id));
  if (!producer) return <div style={{ color: '#fff', padding: 30 }}>Завод не найден</div>;

  // Контакты
  let phones = [], emails = [];
  if (producer.contacts) {
    Object.values(producer.contacts).forEach(val => {
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

      {/* CARD */}
      <div style={{
        background: bgBlock,
        borderRadius: round,
        margin: "0 auto",
        boxShadow: shadow,
        maxWidth: 430,
        padding: "22px 22px 18px 22px",
        marginBottom: 26
      }}>
        {/* Название и регион */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16
        }}>
          <img src={producer.logo} alt="logo"
            style={{
              width: 62, height: 62, borderRadius: 16, background: "#181b20",
              objectFit: "cover", boxShadow: "0 1px 5px #19223b33"
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>{producer.name}</div>
            <div style={{ color: "#1edc80", fontWeight: 500, fontSize: 13 }}>{producer.region}</div>
          </div>
        </div>

        {/* Описание */}
        <div style={{
          color: "#e3e3e3", fontSize: 15.1, marginBottom: 16, fontWeight: 400, lineHeight: 1.45
        }}>{producer.fullDescription || producer.description}</div>

        {/* Адрес */}
        {producer.address && (
          <div style={{
            color: "#e7edff", fontWeight: 600, fontSize: 14.1, marginBottom: 8
          }}>Адрес: <span style={{ color: "#fff", fontWeight: 500 }}>{producer.address}</span></div>
        )}

        {/* Контакты */}
        {phones.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', color: '#79e6e6', fontWeight: 600, marginBottom: 4 }}>
            <IconPhone />
            {phones.join(", ")}
          </div>
        )}
        {emails.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', color: '#97b5f7', fontWeight: 600, marginBottom: 5 }}>
            <IconMail />
            {emails.join(", ")}
          </div>
        )}

        {/* Продукция */}
        {producer.categories && producer.categories.length > 0 && (
          <div style={{ color: "#1edc80", fontWeight: 700, fontSize: 13.7, margin: "10px 0 4px 0" }}>
            Продукция: <span style={{ color: "#e3ffe2" }}>{producer.categories.join(", ")}</span>
          </div>
        )}

        {/* Сайт */}
        {producer.site && (
          <div style={{ fontSize: 14, margin: "5px 0 5px 0" }}>
            <a href={producer.site.startsWith('http') ? producer.site : `https://${producer.site}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                color: "#38d8ff", fontWeight: 700,
                textDecoration: "none", borderBottom: "1.5px dashed #36d8ff", paddingBottom: 1
              }}>
              {producer.site.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {/* Галерея */}
        {producer.gallery && producer.gallery.length > 0 && (
          <div style={{ marginTop: 13 }}>
            <div style={{ color: "#abb8cc", fontSize: 13, marginBottom: 5, fontWeight: 600 }}>Фото</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
              {producer.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="фото"
                  style={{
                    width: 98, height: 68, objectFit: 'cover', borderRadius: 12, border: '1px solid #19223a',
                    cursor: "pointer", transition: "transform .14s", boxShadow: "0 2px 9px #17181f33"
                  }}
                  onClick={() => setModal({ open: true, idx: i })}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {modal.open && (
        <GalleryModal
          images={producer.gallery}
          idx={modal.idx}
          onClose={() => setModal({ open: false, idx: 0 })}
        />
      )}
    </div>
  );
};

export default ProducerDetail;
